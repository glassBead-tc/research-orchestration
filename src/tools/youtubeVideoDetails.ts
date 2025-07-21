import { z } from "zod";
import axios from "axios";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createRequestLogger } from "../utils/logger.js";

interface YouTubeVideoDetails {
  [videoId: string]: {
    title: string;
    viewCount: string;
    publishedAt: string;
    channelTitle: string;
  };
}

export function registerYoutubeVideoDetailsTool(server: McpServer, config?: { youtubeApiKey?: string }): void {
  server.tool(
    "youtube_video_details_exa",
    "Get detailed information about YouTube videos by their IDs. Returns video titles, view counts, publish dates, and channel information.",
    {
      videoIds: z.string().describe("Comma-separated list of YouTube video IDs"),
    },
    async ({ videoIds }) => {
      const requestId = `youtube_video_details_exa-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const logger = createRequestLogger(requestId, 'youtube_video_details_exa');
      
      logger.start(videoIds);
      
      try {
        const apiKey = config?.youtubeApiKey || process.env.YOUTUBE_API_KEY;
        
        if (!apiKey) {
          logger.log("Warning: YouTube API key not configured");
          return {
            content: [{
              type: "text" as const,
              text: "YouTube API key is not configured. Please set YOUTUBE_API_KEY environment variable."
            }],
            isError: true
          };
        }

        logger.log("Fetching video details from YouTube API");
        
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              part: 'snippet,statistics',
              id: videoIds,
              key: apiKey
            },
            timeout: 25000
          }
        );
        
        logger.log("Received response from YouTube API");

        if (!response.data || !response.data.items) {
          logger.log("Warning: Empty or invalid response from YouTube API");
          return {
            content: [{
              type: "text" as const,
              text: "No video details found. Please check the video IDs."
            }]
          };
        }

        const formattedData: YouTubeVideoDetails = {};
        
        response.data.items.forEach((item: any) => {
          formattedData[item.id] = {
            title: item.snippet.title,
            viewCount: item.statistics.viewCount,
            publishedAt: item.snippet.publishedAt,
            channelTitle: item.snippet.channelTitle,
          };
        });

        logger.log(`Retrieved details for ${response.data.items.length} videos`);
        
        const result = {
          content: [{
            type: "text" as const,
            text: JSON.stringify(formattedData, null, 2)
          }]
        };
        
        logger.complete();
        return result;
      } catch (error) {
        logger.error(error);
        
        if (axios.isAxiosError(error)) {
          // Handle Axios errors specifically
          const statusCode = error.response?.status || 'unknown';
          const errorMessage = error.response?.data?.error?.message || error.message;
          
          logger.log(`YouTube API error (${statusCode}): ${errorMessage}`);
          return {
            content: [{
              type: "text" as const,
              text: `YouTube video details error (${statusCode}): ${errorMessage}`
            }],
            isError: true,
          };
        }
        
        // Handle generic errors
        return {
          content: [{
            type: "text" as const,
            text: `YouTube video details error: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true,
        };
      }
    }
  );
}