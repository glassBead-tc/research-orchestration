import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import axios from "axios";
import { API_CONFIG } from "../config.js";
import { createRequestLogger } from "../../utils/logger.js";

export function registerOpenApiDiscoveryTool(server: McpServer, config?: { exaApiKey?: string }): void {
  server.tool(
    "openapi_links_discover",
    "Discover OpenAPI/Swagger specification links and API docs via Exa for given domains.",
    {
      docsUrls: z.array(z.string()).optional().describe("Docs or root domains to focus on"),
      query: z.string().optional().describe("Additional keywords to refine search, e.g., payments, webhook"),
      pagesLimit: z.number().optional().describe("Max number of pages to retrieve (default 20)")
    },
    async ({ docsUrls, query, pagesLimit }) => {
      const requestId = `openapi_links_discover-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
      const logger = createRequestLogger(requestId, 'openapi_links_discover');

      const domainBias = (docsUrls && docsUrls.length)
        ? ' ' + docsUrls.map(u => `site:${new URL(u).hostname}`).join(' OR ')
        : '';
      const keywords = ` ("openapi.yaml" OR "openapi.json" OR "swagger.json" OR "swagger.yaml" OR "OpenAPI 3" OR "Swagger")`;
      const fullQuery = `${query || ''}${keywords}${domainBias}`.trim();

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

        logger.start(fullQuery || '[default openapi discovery query]');
        const resp = await axiosInstance.post(
          API_CONFIG.ENDPOINTS.SEARCH,
          {
            query: fullQuery || 'OpenAPI Swagger specification API docs',
            type: 'auto',
            numResults: pagesLimit || 20,
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
        return { content: [{ type: 'text', text: `OpenAPI discovery error: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
      }
    }
  );
}