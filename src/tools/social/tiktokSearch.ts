import { z } from "zod";
import axios from "axios";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { API_CONFIG } from "../config.js";
import { ExaSearchRequest, ExaSearchResponse } from "../../types.js";
import { createRequestLogger } from "../../utils/logger.js";

export function registerTiktokSearchTool(server: McpServer, config?: { exaApiKey?: string }): void {
  server.tool(
    "tiktok_search_exa",
    "Search TikTok for videos using Exa AI. Returns video titles, URLs, and metadata for TikTok content matching your search query.",
    {
      query: z.string().describe("TikTok search query"),
      numResults: z.number().optional().describe("Number of TikTok results to return (default: 5)")
    },
    async ({ query, numResults }) => {
      const requestId = `tiktok_search_exa-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const logger = createRequestLogger(requestId, 'tiktok_search_exa');
      
      logger.start(query);
      
      try {
        // Create a fresh axios instance for each request
        const axiosInstance = axios.create({
          baseURL: API_CONFIG.BASE_URL,
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'x-api-key': config?.exaApiKey || process.env.EXA_API_KEY || ''
          },
          timeout: 25000
        });

        const searchRequest: ExaSearchRequest = {
          query: query,
          type: "neural",
          includeDomains: ["tiktok.com"],
          numResults: numResults || API_CONFIG.DEFAULT_NUM_RESULTS,
          contents: {
            text: {
              maxCharacters: API_CONFIG.DEFAULT_MAX_CHARACTERS
            },
            livecrawl: 'preferred'
          }
        };
        
        logger.log("Sending request to Exa API for TikTok search");
        
        const response = await axiosInstance.post<ExaSearchResponse>(
          API_CONFIG.ENDPOINTS.SEARCH,
          searchRequest,
          { timeout: 25000 }
        );
        
        logger.log("Received response from Exa API");

        if (!response.data || !response.data.results) {
          logger.log("Warning: Empty or invalid response from Exa API");
          return {
            content: [{
              type: "text" as const,
              text: "No TikTok videos found. Please try a different query."
            }]
          };
        }

        logger.log(`Found ${response.data.results.length} TikTok results`);
        
        const result = {
          content: [{
            type: "text" as const,
            text: JSON.stringify(response.data, null, 2)
          }]
        };
        
        logger.complete();
        return result;
      } catch (error) {
        logger.error(error);
        
        if (axios.isAxiosError(error)) {
          // Handle Axios errors specifically
          const statusCode = error.response?.status || 'unknown';
          const errorMessage = error.response?.data?.message || error.message;
          
          logger.log(`Axios error (${statusCode}): ${errorMessage}`);
          return {
            content: [{
              type: "text" as const,
              text: `TikTok search error (${statusCode}): ${errorMessage}`
            }],
            isError: true,
          };
        }
        
        // Handle generic errors
        return {
          content: [{
            type: "text" as const,
            text: `TikTok search error: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true,
        };
      }
    }
  );
}