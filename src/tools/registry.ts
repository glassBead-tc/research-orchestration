import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { registerWebSearchTool } from "./search/webSearch.js";
import { registerResearchPaperSearchTool } from "./search/researchPaperSearch.js";
import { registerCrawlingTool } from "./search/crawling.js";
import { registerCompanyResearchTool } from "./business/companyResearch.js";
import { registerCompetitorFinderTool } from "./business/competitorFinder.js";
import { registerLinkedInSearchTool } from "./social/linkedInSearch.js";
import { registerWikipediaSearchTool } from "./knowledge/wikipediaSearch.js";
import { registerGithubSearchTool } from "./knowledge/githubSearch.js";
import { registerRedditSearchTool } from "./social/redditSearch.js";
import { registerTiktokSearchTool } from "./social/tiktokSearch.js";
import { registerYoutubeSearchTool } from "./social/youtube/youtubeSearch.js";
import { registerYoutubeVideoDetailsTool } from "./social/youtube/youtubeVideoDetails.js";
import { registerScoutSearchTool } from "./search/scoutSearch.js";
import { registerLightResearchTools } from "./orchestration/lightResearch.js";
import { registerPlanningScopingTools } from "./orchestration/planningScoping.js";
import { registerDeepResearchTools } from "./orchestration/deepResearch.js";

export type ToolRegisterFn = (server: McpServer, config?: { exaApiKey?: string; youtubeApiKey?: string; baseUrl?: string }) => void;

export interface ToolRegistryItem {
  id: string; // The tool id as exposed to MCP (e.g., web_search_exa)
  category: "search" | "business" | "social" | "knowledge" | "orchestration" | "internal";
  register: ToolRegisterFn;
  requires?: Array<"EXA_API_KEY" | "YOUTUBE_API_KEY">;
}

export const TOOL_REGISTRY: ToolRegistryItem[] = [
  { id: "web_search_exa", category: "search", register: registerWebSearchTool, requires: ["EXA_API_KEY"] },
  { id: "research_paper_search_exa", category: "search", register: registerResearchPaperSearchTool, requires: ["EXA_API_KEY"] },
  { id: "crawling_exa", category: "search", register: registerCrawlingTool, requires: ["EXA_API_KEY"] },
  { id: "company_research_exa", category: "business", register: registerCompanyResearchTool, requires: ["EXA_API_KEY"] },
  { id: "competitor_finder_exa", category: "business", register: registerCompetitorFinderTool, requires: ["EXA_API_KEY"] },
  { id: "linkedin_search_exa", category: "social", register: registerLinkedInSearchTool, requires: ["EXA_API_KEY"] },
  { id: "wikipedia_search_exa", category: "knowledge", register: registerWikipediaSearchTool, requires: ["EXA_API_KEY"] },
  { id: "github_search_exa", category: "knowledge", register: registerGithubSearchTool, requires: ["EXA_API_KEY"] },
  { id: "scrape_reddit_exa", category: "social", register: registerRedditSearchTool, requires: ["EXA_API_KEY"] },
  { id: "tiktok_search_exa", category: "social", register: registerTiktokSearchTool, requires: ["EXA_API_KEY"] },
  { id: "youtube_search_exa", category: "social", register: registerYoutubeSearchTool, requires: ["EXA_API_KEY"] },
  { id: "youtube_video_details_exa", category: "social", register: registerYoutubeVideoDetailsTool, requires: ["YOUTUBE_API_KEY"] },
  { id: "scout_search", category: "search", register: registerScoutSearchTool, requires: ["EXA_API_KEY"] },
  // Orchestration groups register multiple tools (namespaced). Selection by prefix is supported in bootstrap
  { id: "light_research.*", category: "orchestration", register: registerLightResearchTools },
  { id: "deep_research.*", category: "orchestration", register: registerDeepResearchTools },
  { id: "planning_scoping.*", category: "orchestration", register: registerPlanningScopingTools },
];

export function shouldRegisterToolId(id: string, selected: Set<string>): boolean {
  if (selected.size === 0) return true;
  if (selected.has(id)) return true;
  // support wildcard-like selection by prefix for orchestration groups
  for (const sel of selected) {
    if (sel.endsWith(".*")) {
      const prefix = sel.slice(0, -2);
      if (id.startsWith(prefix)) return true;
    }
  }
  return false;
}