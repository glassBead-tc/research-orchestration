import { z } from "zod";
import axios from "axios";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { API_CONFIG } from "./config.js";
import { ExaSearchRequest, ExaSearchResponse } from "../types.js";
import { createRequestLogger } from "../utils/logger.js";

export function registerRedditSearchTool(server: McpServer, config?: { exaApiKey?: string }): void {
  server.tool(
    "scrape_reddit_exa",
    "Search Reddit discussions using Exa AI - finds threads, comments, and community discussions across Reddit. Ideal for sentiment analysis, product research, community feedback, and trending topics.",
    {
      query: z.string().describe("Reddit search query (topic, product, question, or any search term)"),
      searchType: z.enum(["discussions", "posts", "comments", "subreddits"]).optional().describe("Type of Reddit content to search for (default: discussions)"),
      numResults: z.number().optional().describe("Number of Reddit results to return (default: 5)"),
      subreddit: z.string().optional().describe("Specific subreddit to search within (e.g., 'technology', 'science')")
    },
    async ({ query, searchType, numResults, subreddit }) => {
      const requestId = `scrape_reddit_exa-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const logger = createRequestLogger(requestId, 'scrape_reddit_exa');
      
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

        // Build search query based on search type
        let searchQuery = query;
        if (searchType === "posts") {
          searchQuery = `${query} Reddit post`;
        } else if (searchType === "comments") {
          searchQuery = `${query} Reddit comment discussion`;
        } else if (searchType === "subreddits") {
          searchQuery = `${query} subreddit`;
        }

        // Build domain filter
        const includeDomains = subreddit 
          ? [`reddit.com/r/${subreddit}`] 
          : ["reddit.com"];

        const searchRequest: ExaSearchRequest = {
          query: searchQuery,
          type: "neural",
          numResults: numResults || API_CONFIG.DEFAULT_NUM_RESULTS,
          contents: {
            text: {
              maxCharacters: API_CONFIG.DEFAULT_MAX_CHARACTERS
            },
            livecrawl: 'preferred'
          },
          includeDomains: includeDomains
        };
        
        logger.log(`Sending request to Exa API for Reddit search${subreddit ? ` in r/${subreddit}` : ''}`);
        
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
              text: "No Reddit results found. Please try a different query or subreddit."
            }]
          };
        }

        logger.log(`Found ${response.data.results.length} Reddit results`);
        
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
              text: `Reddit search error (${statusCode}): ${errorMessage}`
            }],
            isError: true,
          };
        }
        
        // Handle generic errors
        return {
          content: [{
            type: "text" as const,
            text: `Reddit search error: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true,
        };
      }
    }
  );
}