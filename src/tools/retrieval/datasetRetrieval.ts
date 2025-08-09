import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import axios from "axios";
import { API_CONFIG } from "../config.js";
import { createRequestLogger } from "../../utils/logger.js";

export function registerDatasetRetrievalTool(server: McpServer, config?: { exaApiKey?: string }): void {
  server.tool(
    "dataset_retrieval_search",
    "Discover datasets via Exa across public portals (HuggingFace, Kaggle, data.gov, Zenodo).",
    {
      query: z.string().describe("Dataset topic, e.g., 'satellite building footprints'"),
      sources: z.array(z.string()).optional().describe("Preferred sources e.g., huggingface, kaggle, data.gov, zenodo"),
      license: z.array(z.string()).optional().describe("License filters e.g., mit, cc-by-4.0"),
      minRecords: z.number().optional().describe("Minimum record count (best-effort)"),
      numResults: z.number().optional().describe("Number of results (default 20)")
    },
    async ({ query, sources, license, minRecords, numResults }) => {
      const requestId = `dataset_retrieval_search-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
      const logger = createRequestLogger(requestId, 'dataset_retrieval_search');

      const sourceDomains: Record<string, string> = {
        huggingface: 'site:huggingface.co',
        kaggle: 'site:kaggle.com',
        'data.gov': 'site:data.gov',
        zenodo: 'site:zenodo.org'
      };
      const sourcePart = sources && sources.length ? ' ' + sources.map(s => sourceDomains[s.toLowerCase()] || '').filter(Boolean).join(' OR ') : ' site:huggingface.co OR site:kaggle.com OR site:data.gov OR site:zenodo.org';
      const licensePart = license && license.length ? ' ' + license.map(l => `license:"${l}"`).join(' ') : '';
      const sizePart = minRecords ? ` records:>=${minRecords}` : '';
      const fullQuery = `${query}${licensePart}${sizePart}${sourcePart}`.trim();

      try {
        const axiosInstance = axios.create({
          baseURL: API_CONFIG.BASE_URL,
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'x-api-key': config?.exaApiKey || process.env.EXA_API_KEY || ''
          },
          timeout: 25000
        });

        logger.start(fullQuery);
        const resp = await axiosInstance.post(
          API_CONFIG.ENDPOINTS.SEARCH,
          {
            query: fullQuery,
            type: 'auto',
            numResults: numResults || 20,
            contents: { text: { maxCharacters: API_CONFIG.DEFAULT_MAX_CHARACTERS }, livecrawl: 'fallback' }
          },
          { timeout: 25000 }
        );
        logger.complete();

        return {
          content: [{ type: 'text', text: JSON.stringify({ query: fullQuery, results: resp.data?.results || [] }, null, 2) }]
        };
      } catch (error) {
        logger.error(error);
        return { content: [{ type: 'text', text: `Dataset retrieval error: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
      }
    }
  );
}