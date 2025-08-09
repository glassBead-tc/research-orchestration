#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
// Fixed chalk import for ESM
import chalk from 'chalk';

// Import all tool registration functions
import { registerWebSearchTool } from './tools/search/webSearch.js';
import { registerResearchPaperSearchTool } from './tools/search/researchPaperSearch.js';
import { registerCrawlingTool } from './tools/search/crawling.js';
import { registerCompanyResearchTool } from './tools/business/companyResearch.js';
import { registerCompetitorFinderTool } from './tools/business/competitorFinder.js';
import { registerLinkedInSearchTool } from './tools/social/linkedInSearch.js';
import { registerWikipediaSearchTool } from './tools/knowledge/wikipediaSearch.js';
import { registerGithubSearchTool } from './tools/knowledge/githubSearch.js';
import { registerRedditSearchTool } from './tools/social/redditSearch.js';
import { registerTiktokSearchTool } from './tools/social/tiktokSearch.js';
import { registerYoutubeSearchTool } from './tools/social/youtube/youtubeSearch.js';
import { registerYoutubeVideoDetailsTool } from './tools/social/youtube/youtubeVideoDetails.js';
import { z } from 'zod';
import { registerOrchestrationReasoningTool } from './tools/orchestration/registerOrchestrationReasoning.js';
import { registerSecRegulatoryRetrievalTool } from './tools/retrieval/secRegulatoryRetrieval.js';
import { registerPatentRetrievalTool } from './tools/retrieval/patentRetrieval.js';
import { registerGrantsRetrievalTool } from './tools/retrieval/grantsRetrieval.js';
import { registerDatasetRetrievalTool } from './tools/retrieval/datasetRetrieval.js';
import { registerSecurityAdvisoryRetrievalTool } from './tools/retrieval/securityAdvisoryRetrieval.js';
import { registerReleaseNotesRetrievalTool } from './tools/retrieval/releaseNotesRetrieval.js';
import { registerOpenApiDiscoveryTool } from './tools/retrieval/openApiDiscovery.js';

interface ThoughtData {
  thought: string;
  thoughtNumber: number;
  totalThoughts: number;
  isRevision?: boolean;
  revisesThought?: number;
  branchFromThought?: number;
  branchId?: string;
  needsMoreThoughts?: boolean;
  nextThoughtNeeded: boolean;
}

class SequentialThinkingServer {
  private thoughtHistory: ThoughtData[] = [];
  private branches: Record<string, ThoughtData[]> = {};
  private disableThoughtLogging: boolean;

  constructor() {
    this.disableThoughtLogging = (process.env.DISABLE_THOUGHT_LOGGING || "").toLowerCase() === "true";
  }

  private validateThoughtData(input: unknown): ThoughtData {
    const data = input as Record<string, unknown>;

    if (!data.thought || typeof data.thought !== 'string') {
      throw new Error('Invalid thought: must be a string');
    }
    if (!data.thoughtNumber || typeof data.thoughtNumber !== 'number') {
      throw new Error('Invalid thoughtNumber: must be a number');
    }
    if (!data.totalThoughts || typeof data.totalThoughts !== 'number') {
      throw new Error('Invalid totalThoughts: must be a number');
    }
    if (typeof data.nextThoughtNeeded !== 'boolean') {
      throw new Error('Invalid nextThoughtNeeded: must be a boolean');
    }

    return {
      thought: data.thought,
      thoughtNumber: data.thoughtNumber,
      totalThoughts: data.totalThoughts,
      nextThoughtNeeded: data.nextThoughtNeeded,
      isRevision: data.isRevision as boolean | undefined,
      revisesThought: data.revisesThought as number | undefined,
      branchFromThought: data.branchFromThought as number | undefined,
      branchId: data.branchId as string | undefined,
      needsMoreThoughts: data.needsMoreThoughts as boolean | undefined,
    };
  }

  private formatThought(thoughtData: ThoughtData): string {
    const { thoughtNumber, totalThoughts, thought, isRevision, revisesThought, branchFromThought, branchId } = thoughtData;

    let prefix = '';
    let context = '';

    if (isRevision) {
      prefix = chalk.yellow('🔄 Revision');
      context = ` (revising thought ${revisesThought})`;
    } else if (branchFromThought) {
      prefix = chalk.green('🌿 Branch');
      context = ` (from thought ${branchFromThought}, ID: ${branchId})`;
    } else {
      prefix = chalk.blue('💭 Thought');
      context = '';
    }

    const header = `${prefix} ${thoughtNumber}/${totalThoughts}${context}`;
    const border = '─'.repeat(Math.max(header.length, thought.length) + 4);

    return `
┌${border}┐
│ ${header} │
├${border}┤
│ ${thought.padEnd(border.length - 2)} │
└${border}┘`;
  }

  public processThought(input: unknown): { content: Array<{ type: string; text: string }>; isError?: boolean } {
    try {
      const validatedInput = this.validateThoughtData(input);

      if (validatedInput.thoughtNumber > validatedInput.totalThoughts) {
        validatedInput.totalThoughts = validatedInput.thoughtNumber;
      }

      this.thoughtHistory.push(validatedInput);

      if (validatedInput.branchFromThought && validatedInput.branchId) {
        if (!this.branches[validatedInput.branchId]) {
          this.branches[validatedInput.branchId] = [];
        }
        this.branches[validatedInput.branchId].push(validatedInput);
      }

      if (!this.disableThoughtLogging) {
        const formattedThought = this.formatThought(validatedInput);
        console.error(formattedThought);
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            thoughtNumber: validatedInput.thoughtNumber,
            totalThoughts: validatedInput.totalThoughts,
            nextThoughtNeeded: validatedInput.nextThoughtNeeded,
            branches: Object.keys(this.branches),
            thoughtHistoryLength: this.thoughtHistory.length
          }, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error: error instanceof Error ? error.message : String(error),
            status: 'failed'
          }, null, 2)
        }],
        isError: true
      };
    }
  }
}

const server = new Server(
  {
    name: "research-orchestrator-thinking",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const thinkingServer = new SequentialThinkingServer();

// Register all the search and research tools
const config = { exaApiKey: process.env.EXA_API_KEY, youtubeApiKey: process.env.YOUTUBE_API_KEY };
registerWebSearchTool(server as any, config);
registerResearchPaperSearchTool(server as any, config);
registerCrawlingTool(server as any, config);
registerCompanyResearchTool(server as any, config);
registerCompetitorFinderTool(server as any, config);
registerLinkedInSearchTool(server as any, config);
registerWikipediaSearchTool(server as any, config);
registerGithubSearchTool(server as any, config);
registerRedditSearchTool(server as any, config);
registerTiktokSearchTool(server as any, config);
registerYoutubeSearchTool(server as any, config);
registerYoutubeVideoDetailsTool(server as any, config);

// Register orchestration_reasoning tool
registerOrchestrationReasoningTool(server as any);

// Register sequentialthinking as a normal tool
server.tool(
  "sequentialthinking",
  "A detailed tool for dynamic and reflective problem-solving through thoughts.",
  {
    thought: z.string().describe("Your current thinking step"),
    nextThoughtNeeded: z.boolean().describe("Whether another thought step is needed"),
    thoughtNumber: z.number().int().min(1).describe("Current thought number"),
    totalThoughts: z.number().int().min(1).describe("Estimated total thoughts needed"),
    isRevision: z.boolean().optional().describe("Whether this revises previous thinking"),
    revisesThought: z.number().int().min(1).optional().describe("Which thought is being reconsidered"),
    branchFromThought: z.number().int().min(1).optional().describe("Branching point thought number"),
    branchId: z.string().optional().describe("Branch identifier"),
    needsMoreThoughts: z.boolean().optional().describe("If more thoughts are needed")
  },
  async (args) => {
    return thinkingServer.processThought(args);
  }
);

// Register retrieval-only mechanism-aligned workflow tools (using Exa)
registerSecRegulatoryRetrievalTool(server as any, config);
registerPatentRetrievalTool(server as any, config);
registerGrantsRetrievalTool(server as any, config);
registerDatasetRetrievalTool(server as any, config);
registerSecurityAdvisoryRetrievalTool(server as any, config);
registerReleaseNotesRetrievalTool(server as any, config);
registerOpenApiDiscoveryTool(server as any, config);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Sequential Thinking MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});