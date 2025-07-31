import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createRequestLogger } from '../utils/logger.js';

// Import all tool handlers
import { registerWebSearchTool } from './webSearch.js';
import { registerCompanyResearchTool } from './companyResearch.js';
import { registerResearchPaperSearchTool } from './researchPaperSearch.js';
import { registerCrawlingTool } from './crawling.js';
import { registerCompetitorFinderTool } from './competitorFinder.js';
import { registerLinkedInSearchTool } from './linkedInSearch.js';
import { registerWikipediaSearchTool } from './wikipediaSearch.js';
import { registerGithubSearchTool } from './githubSearch.js';
import { registerRedditSearchTool } from './redditSearch.js';
import { registerYoutubeSearchTool } from './youtubeSearch.js';
import { registerTiktokSearchTool } from './tiktokSearch.js';
import { registerYoutubeVideoDetailsTool } from './youtubeVideoDetails.js';

// Base operation schema
const BaseOperationSchema = z.object({
  operation: z.enum([
    'web_search',
    'company_research',
    'research_paper_search',
    'crawl_url',
    'find_competitors',
    'linkedin_search',
    'wikipedia_search',
    'github_search',
    'reddit_search',
    'youtube_search',
    'tiktok_search',
    'youtube_video_details'
  ]).describe('Type of research operation to perform')
});

// Parameter schemas for each operation
const WebSearchParamsSchema = z.object({
  query: z.string().describe('Search query'),
  numResults: z.number().optional().describe('Number of results to return')
}).optional();

const CompanyResearchParamsSchema = z.object({
  companyName: z.string().describe('Name of the company to research'),
  numResults: z.number().optional().describe('Number of results to return')
}).optional();

const ResearchPaperParamsSchema = z.object({
  query: z.string().describe('Research paper search query'),
  numResults: z.number().optional().describe('Number of results to return')
}).optional();

const CrawlingParamsSchema = z.object({
  url: z.string().describe('URL to crawl and extract content from'),
  maxCharacters: z.number().optional().describe('Maximum characters to extract')
}).optional();

const CompetitorFinderParamsSchema = z.object({
  companyName: z.string().describe('Name of the company to find competitors for'),
  industry: z.string().optional().describe('Industry sector (optional)'),
  numResults: z.number().optional().describe('Number of competitors to find')
}).optional();

const LinkedInSearchParamsSchema = z.object({
  query: z.string().describe('LinkedIn search query'),
  searchType: z.enum(['profiles', 'companies', 'all']).optional().describe('Type of content to search'),
  numResults: z.number().optional().describe('Number of results to return')
}).optional();

const WikipediaSearchParamsSchema = z.object({
  query: z.string().describe('Wikipedia search query'),
  numResults: z.number().optional().describe('Number of results to return')
}).optional();

const GithubSearchParamsSchema = z.object({
  query: z.string().describe('GitHub search query'),
  searchType: z.enum(['repositories', 'code', 'users', 'all']).optional().describe('Type of content to search'),
  numResults: z.number().optional().describe('Number of results to return')
}).optional();

const RedditSearchParamsSchema = z.object({
  query: z.string().describe('Reddit search query'),
  searchType: z.enum(['discussions', 'posts', 'comments', 'subreddits']).optional().describe('Type of content to search'),
  subreddit: z.string().optional().describe('Specific subreddit to search within'),
  numResults: z.number().optional().describe('Number of results to return')
}).optional();

const YoutubeSearchParamsSchema = z.object({
  query: z.string().describe('YouTube search query'),
  searchType: z.enum(['videos', 'channels', 'playlists', 'all']).optional().describe('Type of content to search'),
  numResults: z.number().optional().describe('Number of results to return')
}).optional();

const TiktokSearchParamsSchema = z.object({
  query: z.string().describe('TikTok search query'),
  numResults: z.number().optional().describe('Number of results to return')
}).optional();

const YoutubeVideoDetailsParamsSchema = z.object({
  videoIds: z.string().describe('Comma-separated list of YouTube video IDs')
}).optional();

// Combined schema
const ResearchManagerSchema = BaseOperationSchema.extend({
  webSearch: WebSearchParamsSchema,
  companyResearch: CompanyResearchParamsSchema,
  researchPaper: ResearchPaperParamsSchema,
  crawling: CrawlingParamsSchema,
  competitorFinder: CompetitorFinderParamsSchema,
  linkedIn: LinkedInSearchParamsSchema,
  wikipedia: WikipediaSearchParamsSchema,
  github: GithubSearchParamsSchema,
  reddit: RedditSearchParamsSchema,
  youtube: YoutubeSearchParamsSchema,
  tiktok: TiktokSearchParamsSchema,
  youtubeVideoDetails: YoutubeVideoDetailsParamsSchema
});

export function registerResearchManagerTool(
  server: McpServer, 
  config?: { exaApiKey?: string; youtubeApiKey?: string }
): void {
  server.tool(
    'research_manager',
    'Unified research tool for all search and retrieval operations. Select an operation and provide the required parameters for that operation.',
    ResearchManagerSchema,
    async ({ 
      operation, 
      webSearch,
      companyResearch,
      researchPaper,
      crawling,
      competitorFinder,
      linkedIn,
      wikipedia,
      github,
      reddit,
      youtube,
      tiktok,
      youtubeVideoDetails
    }) => {
      const requestId = `research_manager-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const logger = createRequestLogger(requestId, 'research_manager');
      
      logger.start(`${operation} operation`);
      
      try {
        // Route to appropriate operation handler
        switch (operation) {
          case 'web_search':
            return await handleWebSearch(webSearch, config, logger);
            
          case 'company_research':
            return await handleCompanyResearch(companyResearch, config, logger);
            
          case 'research_paper_search':
            return await handleResearchPaperSearch(researchPaper, config, logger);
            
          case 'crawl_url':
            return await handleCrawling(crawling, config, logger);
            
          case 'find_competitors':
            return await handleCompetitorFinder(competitorFinder, config, logger);
            
          case 'linkedin_search':
            return await handleLinkedInSearch(linkedIn, config, logger);
            
          case 'wikipedia_search':
            return await handleWikipediaSearch(wikipedia, config, logger);
            
          case 'github_search':
            return await handleGithubSearch(github, config, logger);
            
          case 'reddit_search':
            return await handleRedditSearch(reddit, config, logger);
            
          case 'youtube_search':
            return await handleYoutubeSearch(youtube, config, logger);
            
          case 'tiktok_search':
            return await handleTiktokSearch(tiktok, config, logger);
            
          case 'youtube_video_details':
            return await handleYoutubeVideoDetails(youtubeVideoDetails, config, logger);
            
          default:
            throw new Error(`Unknown operation: ${operation}`);
        }
        
      } catch (error) {
        logger.error(error);
        
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({
              success: false,
              operation,
              error: error instanceof Error ? error.message : String(error),
              help: getOperationHelp(operation)
            }, null, 2)
          }],
          isError: true
        };
      }
    }
  );
}

// Operation handlers - these directly call the existing tool handlers
async function handleWebSearch(params: any, config: any, logger: any) {
  if (!params?.query) {
    throw new Error("query is required for web search");
  }
  
  // Import the actual handler from the webSearch tool
  const { webSearchHandler } = await import('./webSearch.js');
  return await webSearchHandler({ query: params.query, numResults: params.numResults }, config, logger);
}

async function handleCompanyResearch(params: any, config: any, logger: any) {
  if (!params?.companyName) {
    throw new Error("companyName is required for company research");
  }
  
  const { companyResearchHandler } = await import('./companyResearch.js');
  return await companyResearchHandler({ companyName: params.companyName, numResults: params.numResults }, config, logger);
}

async function handleResearchPaperSearch(params: any, config: any, logger: any) {
  if (!params?.query) {
    throw new Error("query is required for research paper search");
  }
  
  const { researchPaperSearchHandler } = await import('./researchPaperSearch.js');
  return await researchPaperSearchHandler({ query: params.query, numResults: params.numResults }, config, logger);
}

async function handleCrawling(params: any, config: any, logger: any) {
  if (!params?.url) {
    throw new Error("url is required for crawling");
  }
  
  const { crawlingHandler } = await import('./crawling.js');
  return await crawlingHandler({ url: params.url, maxCharacters: params.maxCharacters }, config, logger);
}

async function handleCompetitorFinder(params: any, config: any, logger: any) {
  if (!params?.companyName) {
    throw new Error("companyName is required for competitor finder");
  }
  
  const { competitorFinderHandler } = await import('./competitorFinder.js');
  return await competitorFinderHandler({ 
    companyName: params.companyName, 
    industry: params.industry,
    numResults: params.numResults 
  }, config, logger);
}

async function handleLinkedInSearch(params: any, config: any, logger: any) {
  if (!params?.query) {
    throw new Error("query is required for LinkedIn search");
  }
  
  const { linkedInSearchHandler } = await import('./linkedInSearch.js');
  return await linkedInSearchHandler({ 
    query: params.query, 
    searchType: params.searchType,
    numResults: params.numResults 
  }, config, logger);
}

async function handleWikipediaSearch(params: any, config: any, logger: any) {
  if (!params?.query) {
    throw new Error("query is required for Wikipedia search");
  }
  
  const { wikipediaSearchHandler } = await import('./wikipediaSearch.js');
  return await wikipediaSearchHandler({ query: params.query, numResults: params.numResults }, config, logger);
}

async function handleGithubSearch(params: any, config: any, logger: any) {
  if (!params?.query) {
    throw new Error("query is required for GitHub search");
  }
  
  const { githubSearchHandler } = await import('./githubSearch.js');
  return await githubSearchHandler({ 
    query: params.query, 
    searchType: params.searchType,
    numResults: params.numResults 
  }, config, logger);
}

async function handleRedditSearch(params: any, config: any, logger: any) {
  if (!params?.query) {
    throw new Error("query is required for Reddit search");
  }
  
  const { redditSearchHandler } = await import('./redditSearch.js');
  return await redditSearchHandler({ 
    query: params.query, 
    searchType: params.searchType,
    subreddit: params.subreddit,
    numResults: params.numResults 
  }, config, logger);
}

async function handleYoutubeSearch(params: any, config: any, logger: any) {
  if (!params?.query) {
    throw new Error("query is required for YouTube search");
  }
  
  const { youtubeSearchHandler } = await import('./youtubeSearch.js');
  return await youtubeSearchHandler({ 
    query: params.query, 
    searchType: params.searchType,
    numResults: params.numResults 
  }, config, logger);
}

async function handleTiktokSearch(params: any, config: any, logger: any) {
  if (!params?.query) {
    throw new Error("query is required for TikTok search");
  }
  
  const { tiktokSearchHandler } = await import('./tiktokSearch.js');
  return await tiktokSearchHandler({ query: params.query, numResults: params.numResults }, config, logger);
}

async function handleYoutubeVideoDetails(params: any, config: any, logger: any) {
  if (!params?.videoIds) {
    throw new Error("videoIds is required for YouTube video details");
  }
  
  const { youtubeVideoDetailsHandler } = await import('./youtubeVideoDetails.js');
  return await youtubeVideoDetailsHandler({ videoIds: params.videoIds }, config, logger);
}

// Helper function to provide operation-specific help
function getOperationHelp(operation: string): string[] {
  const helpMap: Record<string, string[]> = {
    'web_search': ['Provide query for web search', 'Optionally specify numResults'],
    'company_research': ['Provide companyName to research', 'Optionally specify numResults'],
    'research_paper_search': ['Provide query for academic papers', 'Optionally specify numResults'],
    'crawl_url': ['Provide url to crawl', 'Optionally specify maxCharacters'],
    'find_competitors': ['Provide companyName', 'Optionally specify industry and numResults'],
    'linkedin_search': ['Provide query', 'Optionally specify searchType and numResults'],
    'wikipedia_search': ['Provide query', 'Optionally specify numResults'],
    'github_search': ['Provide query', 'Optionally specify searchType and numResults'],
    'reddit_search': ['Provide query', 'Optionally specify searchType, subreddit, and numResults'],
    'youtube_search': ['Provide query', 'Optionally specify searchType and numResults'],
    'tiktok_search': ['Provide query', 'Optionally specify numResults'],
    'youtube_video_details': ['Provide videoIds as comma-separated string']
  };
  
  return helpMap[operation] || ['Check the operation name and required parameters'];
}