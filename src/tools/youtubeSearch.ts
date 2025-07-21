import { z } from "zod";
import axios from "axios";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { API_CONFIG } from "./config.js";
import { ExaSearchRequest, ExaSearchResponse } from "../types.js";
import { createRequestLogger } from "../utils/logger.js";

export function registerYoutubeSearchTool(server: McpServer, config?: { exaApiKey?: string }): void {
  server.tool(
    "youtube_search_exa",
    "Search YouTube videos, channels, and playlists using Exa AI - finds video content, creator channels, and curated playlists on YouTube. Ideal for discovering educational content, tutorials, entertainment, and trending videos.",
    {
      query: z.string().describe("YouTube search query (topic, video title, channel name, or any search term)"),
      searchType: z.enum(["videos", "channels", "playlists", "all"]).optional().describe("Type of YouTube content to search for (default: videos)"),
      numResults: z.number().optional().describe("Number of YouTube results to return (default: 10)")
    },
    async ({ query, searchType, numResults }) => {
      const requestId = `youtube_search_exa-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const logger = createRequestLogger(requestId, 'youtube_search_exa');
      
      logger.start(`${query} (${searchType || 'videos'})`);
      
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

        // Build search query based on search type
        let searchQuery = query;
        if (searchType === "channels") {
          searchQuery = `${query} YouTube channel`;
        } else if (searchType === "playlists") {
          searchQuery = `${query} YouTube playlist`;
        } else if (searchType === "all") {
          searchQuery = `${query} YouTube`;
        } else {
          // Default to videos
          searchQuery = `${query} YouTube video`;
        }

        const searchRequest: ExaSearchRequest = {
          query: searchQuery,
          type: "neural",
          numResults: numResults || 10,
          contents: {
            text: {
              maxCharacters: API_CONFIG.DEFAULT_MAX_CHARACTERS
            },
            livecrawl: 'preferred'
          },
          includeDomains: ["youtube.com"]
        };
        
        logger.log("Sending request to Exa API for YouTube search");
        
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
              text: "No YouTube content found. Please try a different query."
            }]
          };
        }

        logger.log(`Found ${response.data.results.length} YouTube results`);
        
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
              text: `YouTube search error (${statusCode}): ${errorMessage}`
            }],
            isError: true,
          };
        }
        
        // Handle generic errors
        return {
          content: [{
            type: "text" as const,
            text: `YouTube search error: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true,
        };
      }
    }
  );
}