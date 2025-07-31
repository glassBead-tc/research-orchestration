#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Import tool implementations
import { registerWebSearchTool } from "./tools/webSearch.js";
import { registerResearchPaperSearchTool } from "./tools/researchPaperSearch.js";
import { registerCompanyResearchTool } from "./tools/companyResearch.js";
import { registerCrawlingTool } from "./tools/crawling.js";
import { registerCompetitorFinderTool } from "./tools/competitorFinder.js";
import { registerLinkedInSearchTool } from "./tools/linkedInSearch.js";
import { registerWikipediaSearchTool } from "./tools/wikipediaSearch.js";
import { registerGithubSearchTool } from "./tools/githubSearch.js";
import { registerRedditSearchTool } from "./tools/redditSearch.js";
import { registerYoutubeSearchTool } from "./tools/youtubeSearch.js";
import { registerTiktokSearchTool } from "./tools/tiktokSearch.js";
import { registerYoutubeVideoDetailsTool } from "./tools/youtubeVideoDetails.js";
import { registerOrchestrationReasoning } from "./tools/orchestrationReasoning.js";
import { registerUserGuideResources } from "./resources/userGuides.js";
import { log } from "./utils/logger.js";

// Configuration schema for the EXA API key and tool selection
export const configSchema = z.object({
  exaApiKey: z.string().optional().describe("Exa AI API key for search operations"),
  youtubeApiKey: z.string().optional().describe("YouTube Data API v3 key for video details operations"),
  enabledTools: z.array(z.string()).optional().describe("List of tools to enable (if not specified, all tools are enabled)"),
  debug: z.boolean().default(false).describe("Enable debug logging")
});

// Tool registry for managing available tools
const availableTools = {
  'web_search_exa': { name: 'Web Search (Exa)', description: 'Real-time web search using Exa AI', enabled: true },
  'research_paper_search_exa': { name: 'Research Paper Search', description: 'Search academic papers and research', enabled: true },
  'company_research_exa': { name: 'Company Research', description: 'Research companies and organizations', enabled: true },
  'crawling_exa': { name: 'Web Crawling', description: 'Extract content from specific URLs', enabled: true },
  'competitor_finder_exa': { name: 'Competitor Finder', description: 'Find business competitors', enabled: true },
  'linkedin_search_exa': { name: 'LinkedIn Search', description: 'Search LinkedIn profiles and companies', enabled: true },
  'wikipedia_search_exa': { name: 'Wikipedia Search', description: 'Search Wikipedia articles', enabled: true },
  'github_search_exa': { name: 'GitHub Search', description: 'Search GitHub repositories and code', enabled: true },
  'reddit_search_exa': { name: 'Reddit Search', description: 'Search Reddit for discussions about websites or topics', enabled: true },
  'youtube_search_exa': { name: 'YouTube Search', description: 'Search YouTube videos, channels, and playlists', enabled: true },
  'tiktok_search_exa': { name: 'TikTok Search', description: 'Search TikTok for videos', enabled: true },
  'youtube_video_details_exa': { name: 'YouTube Video Details', description: 'Get detailed information about YouTube videos', enabled: true },
  'orchestration_reasoning': { name: 'Orchestration Reasoning', description: 'Design custom retrieval orchestrations using game-theoretic reasoning', enabled: true }
};

/**
 * Retrieval Orchestrations MCP Server (Exa AI)
 * 
 * This MCP server integrates Exa AI's search capabilities with Claude and other MCP-compatible clients.
 * Exa is a search engine and API specifically designed for up-to-date web searching and retrieval,
 * offering more recent and comprehensive results than what might be available in an LLM's training data.
 * 
 * The server provides tools that enable:
 * - Real-time web searching with configurable parameters
 * - Research paper searches
 * - Company research and analysis
 * - Competitive intelligence
 * - And more!
 */

export default function ({ config }: { config: z.infer<typeof configSchema> }) {
  try {
    // Set the API key in environment for tool functions to use
    // process.env.EXA_API_KEY = config.exaApiKey;
    
    if (config.debug) {
      log("Starting Exa MCP Server in debug mode");
    }

    // Create MCP server
    const server = new McpServer({
      name: "retrieval-orchestrations-server",
      version: "1.0.0"
    });
    
    log("Server initialized with modern MCP SDK and Smithery CLI support");

    // Helper function to check if a tool should be registered
    const shouldRegisterTool = (toolId: string): boolean => {
      if (config.enabledTools && config.enabledTools.length > 0) {
        return config.enabledTools.includes(toolId);
      }
      return availableTools[toolId as keyof typeof availableTools]?.enabled ?? false;
    };

    // Register tools based on configuration
    const registeredTools: string[] = [];
    
    if (shouldRegisterTool('web_search_exa')) {
      registerWebSearchTool(server, config);
      registeredTools.push('web_search_exa');
    }
    
    if (shouldRegisterTool('research_paper_search_exa')) {
      registerResearchPaperSearchTool(server, config);
      registeredTools.push('research_paper_search_exa');
    }
    
    if (shouldRegisterTool('company_research_exa')) {
      registerCompanyResearchTool(server, config);
      registeredTools.push('company_research_exa');
    }
    
    if (shouldRegisterTool('crawling_exa')) {
      registerCrawlingTool(server, config);
      registeredTools.push('crawling_exa');
    }
    
    if (shouldRegisterTool('competitor_finder_exa')) {
      registerCompetitorFinderTool(server, config);
      registeredTools.push('competitor_finder_exa');
    }
    
    if (shouldRegisterTool('linkedin_search_exa')) {
      registerLinkedInSearchTool(server, config);
      registeredTools.push('linkedin_search_exa');
    }
    
    if (shouldRegisterTool('wikipedia_search_exa')) {
      registerWikipediaSearchTool(server, config);
      registeredTools.push('wikipedia_search_exa');
    }
    
    if (shouldRegisterTool('github_search_exa')) {
      registerGithubSearchTool(server, config);
      registeredTools.push('github_search_exa');
    }
    
    if (shouldRegisterTool('reddit_search_exa')) {
      registerRedditSearchTool(server, config);
      registeredTools.push('reddit_search_exa');
    }
    
    if (shouldRegisterTool('youtube_search_exa')) {
      registerYoutubeSearchTool(server, config);
      registeredTools.push('youtube_search_exa');
    }
    
    if (shouldRegisterTool('tiktok_search_exa')) {
      registerTiktokSearchTool(server, config);
      registeredTools.push('tiktok_search_exa');
    }
    
    if (shouldRegisterTool('youtube_video_details_exa')) {
      registerYoutubeVideoDetailsTool(server, config);
      registeredTools.push('youtube_video_details_exa');
    }
    
    if (shouldRegisterTool('orchestration_reasoning')) {
      registerOrchestrationReasoning(server, {
        orchestrationPath: './src/resources/orchestrations',
        enablePatternAnalysis: true,
        defaultAgenticLevel: 'guided'
      });
      registeredTools.push('orchestration_reasoning');
    }
    
    if (config.debug) {
      log(`Registered ${registeredTools.length} tools: ${registeredTools.join(', ')}`);
    }
    
    // Register user guide resources
    registerUserGuideResources(server);
    
    // Return the server object (Smithery CLI handles transport)
    return server.server;
    
  } catch (error) {
    log(`Server initialization error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}