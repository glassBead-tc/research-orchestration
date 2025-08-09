import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import axios from "axios";
import { API_CONFIG } from "../config.js";
import { createRequestLogger } from "../../utils/logger.js";

export function registerPatentRetrievalTool(server: McpServer, config?: { exaApiKey?: string }): void {
  server.tool(
    "patent_retrieval_search",
    "Retrieve patent-related documents via Exa (public pages: Google Patents, USPTO mirrors). Filters by assignee/keywords/date.",
    {
      query: z.string().describe("Keyword query, e.g., 'RAG retrieval optimization'"),
      assignees: z.array(z.string()).optional().describe("Assignee/Company filters"),
      from: z.string().optional().describe("Start date YYYY-MM-DD"),
      to: z.string().optional().describe("End date YYYY-MM-DD"),
      jurisdictions: z.array(z.string()).optional().describe("Jurisdiction hints e.g., US, EP"),
      numResults: z.number().optional().describe("Number of results (default 20)")
    },
    async ({ query, assignees, from, to, jurisdictions, numResults }) => {
      const requestId = `patent_retrieval_search-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
      const logger = createRequestLogger(requestId, 'patent_retrieval_search');

      const assigneePart = assignees && assignees.length ? ` ${assignees.map(a => `assignee:"${a}"`).join(' ')}` : '';
      const datePart = from || to ? ` published:${from || "*"}..${to || "*"}` : '';
      const jurisPart = jurisdictions && jurisdictions.length ? ` ${jurisdictions.join(' ')}` : '';
      const domainBias = ` site:patents.google.com OR site:worldwide.espacenet.com OR site:uspto.gov`;
      const fullQuery = `${query}${assigneePart}${jurisPart}${datePart} ${domainBias}`.trim();

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
        return { content: [{ type: 'text', text: `Patent retrieval error: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
      }
    }
  );
}