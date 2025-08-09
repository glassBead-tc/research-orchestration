import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import axios from "axios";
import { API_CONFIG } from "../config.js";
import { createRequestLogger } from "../../utils/logger.js";

export function registerSecurityAdvisoryRetrievalTool(server: McpServer, config?: { exaApiKey?: string }): void {
  server.tool(
    "cve_retrieval_search",
    "Retrieve CVEs and security advisories via Exa across NVD, OSV, and GitHub Advisory pages.",
    {
      products: z.array(z.string()).describe("Product names, packages, or components e.g., openssl, nginx, lodash"),
      versions: z.array(z.string()).optional().describe("Version hints e.g., 1.1.1, 1.25"),
      severityMin: z.string().optional().describe("Min severity keyword e.g., HIGH, CRITICAL"),
      from: z.string().optional().describe("Start date YYYY-MM-DD"),
      numResults: z.number().optional().describe("Number of results (default 20)")
    },
    async ({ products, versions, severityMin, from, numResults }) => {
      const requestId = `cve_retrieval_search-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
      const logger = createRequestLogger(requestId, 'cve_retrieval_search');

      const productPart = products.map(p => `"${p}"`).join(' ');
      const versionPart = versions && versions.length ? ' ' + versions.map(v => `"${v}"`).join(' ') : '';
      const severityPart = severityMin ? ` severity:${severityMin}` : '';
      const datePart = from ? ` published:${from}..*` : '';
      const domainBias = ` site:nvd.nist.gov OR site:osv.dev OR site:github.com/advisories`;
      const fullQuery = `${productPart}${versionPart}${severityPart}${datePart} ${domainBias}`.trim();

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
        return { content: [{ type: 'text', text: `Security advisory retrieval error: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
      }
    }
  );
}