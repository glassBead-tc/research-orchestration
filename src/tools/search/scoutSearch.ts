import { z } from "zod";
import axios from "axios";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { API_CONFIG } from "../config.js";
import { createRequestLogger } from "../../utils/logger.js";

export function registerScoutSearchTool(server: McpServer, config?: { exaApiKey?: string }): void {
  server.tool(
    "scout_search",
    "Right-Depth Scout – one-shot fast search (5–8 links, highlights only). Returns minimal fields for speed.",
    {
      query: z.string().describe("Search query"),
      maxLinks: z.number().optional().describe("Max links to return (default: 6)"),
    },
    async ({ query, maxLinks }) => {
      const requestId = `scout_search-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const logger = createRequestLogger(requestId, "scout_search");
      logger.start(query);

      const axiosInstance = axios.create({
        baseURL: API_CONFIG.BASE_URL,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "x-api-key": config?.exaApiKey || process.env.EXA_API_KEY || "",
        },
        timeout: 15000,
      });

      const limit = Math.min(Math.max((maxLinks ?? 6), 3), 10);

      try {
        const response = await axiosInstance.post(
          API_CONFIG.ENDPOINTS.SEARCH,
          {
            query,
            type: "fast",
            numResults: limit,
            contents: {
              text: { maxCharacters: 800 },
              livecrawl: "fallback",
            },
          },
          { timeout: 15000 }
        );

        const results = (response.data?.results ?? []).map((r: any) => ({
          id: r.id,
          title: r.title,
          url: r.url,
          snippet: (r.text || "").slice(0, 240),
          publishedDate: r.publishedDate,
          score: r.score,
        }));

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  mode: "scout",
                  query,
                  links: results,
                  metrics: { count: results.length },
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        logger.error(error);
        return {
          content: [
            {
              type: "text" as const,
              text: `Scout search error: ${axios.isAxiosError(error) ? (error.response?.data?.message || error.message) : (error as Error)?.message || String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}