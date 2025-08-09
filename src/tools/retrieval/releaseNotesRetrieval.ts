import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import axios from "axios";
import { API_CONFIG } from "../config.js";
import { createRequestLogger } from "../../utils/logger.js";

export function registerReleaseNotesRetrievalTool(server: McpServer, config?: { exaApiKey?: string }): void {
  server.tool(
    "release_notes_retrieval_search",
    "Retrieve release notes and changelogs via Exa across GitHub releases and docs sites.",
    {
      projectNames: z.array(z.string()).describe("Project names or repos, e.g., 'react', 'vercel/next.js'"),
      versions: z.array(z.string()).optional().describe("Version tags to target, e.g., v18, 14.0.0"),
      numResults: z.number().optional().describe("Number of results (default 20)")
    },
    async ({ projectNames, versions, numResults }) => {
      const requestId = `release_notes_retrieval_search-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
      const logger = createRequestLogger(requestId, 'release_notes_retrieval_search');

      const projPart = projectNames.map(p => `"${p}"`).join(' ');
      const versionPart = versions && versions.length ? ' ' + versions.map(v => `"${v}"`).join(' ') : '';
      const domainBias = ` site:github.com */releases OR site:github.com */releases/tag OR site:github.com */blob */CHANGELOG.md OR site:docs.*`;
      const fullQuery = `${projPart}${versionPart} release notes OR changelog ${domainBias}`.trim();

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
        return { content: [{ type: 'text', text: `Release notes retrieval error: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
      }
    }
  );
}