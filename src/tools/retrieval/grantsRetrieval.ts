import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import axios from "axios";
import { API_CONFIG } from "../config.js";
import { createRequestLogger } from "../../utils/logger.js";

export function registerGrantsRetrievalTool(server: McpServer, config?: { exaApiKey?: string }): void {
  server.tool(
    "grants_retrieval_search",
    "Discover grants and RFPs via Exa by searching public portals (grants.gov, europa.eu, foundation sites).",
    {
      query: z.string().describe("Topic or purpose, e.g., 'climate adaptation pilot projects'"),
      regions: z.array(z.string()).optional().describe("Region hints e.g., US, EU, UK"),
      agencies: z.array(z.string()).optional().describe("Agency/domain hints e.g., NSF, DOE"),
      deadlineBefore: z.string().optional().describe("Filter for deadlines before YYYY-MM-DD (best effort)"),
      numResults: z.number().optional().describe("Number of results (default 20)")
    },
    async ({ query, regions, agencies, deadlineBefore, numResults }) => {
      const requestId = `grants_retrieval_search-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
      const logger = createRequestLogger(requestId, 'grants_retrieval_search');

      const regionPart = regions && regions.length ? ` ${regions.join(' ')}` : '';
      const agencyPart = agencies && agencies.length ? ` ${agencies.join(' ')}` : '';
      const deadlinePart = deadlineBefore ? ` deadline:"< ${deadlineBefore}"` : '';
      const domainBias = ` site:grants.gov OR site:ec.europa.eu OR site:horizon-europe.ec.europa.eu OR site:nih.gov OR site:nsf.gov OR site:foundationcenter.org`;
      const fullQuery = `${query}${regionPart}${agencyPart}${deadlinePart} RFP OR grant ${domainBias}`.trim();

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
        return { content: [{ type: 'text', text: `Grants retrieval error: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
      }
    }
  );
}