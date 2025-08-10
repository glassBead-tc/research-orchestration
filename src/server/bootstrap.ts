#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { loadConfig } from "../config/index.js";
import { registerSequentialThinkingTool } from "./sequentialThinking.js";
import { TOOL_REGISTRY, shouldRegisterToolId } from "../tools/registry.js";
import { registerScopingResources } from "../resources/registerScopingResources.js";

export async function bootstrapAndRun(): Promise<void> {
  const appConfig = loadConfig();

  const server = new Server(
    { name: "research-orchestrator", version: "1.0.0" },
    { capabilities: { tools: {} } }
  );

  // Always register sequential thinking tool
  registerSequentialThinkingTool(server as any, appConfig.disableThoughtLogging);

  // Register resource endpoints (reads from docs/src/.smithery locations)
  registerScopingResources(server as any);

  const commonConfig = {
    exaApiKey: appConfig.exaApiKey,
    youtubeApiKey: appConfig.youtubeApiKey,
    baseUrl: "https://api.exa.ai",
  } as const;

  for (const item of TOOL_REGISTRY) {
    // For grouped orchestration registrations, selection is by wildcard prefix
    const candidates: string[] = item.id.endsWith(".*") ? [item.id] : [item.id];
    const should = candidates.some((id) => shouldRegisterToolId(id, appConfig.selectedTools));
    if (!should) continue;

    // Validate required envs if specified
    if (item.requires) {
      for (const req of item.requires) {
        if (req === "EXA_API_KEY" && !appConfig.exaApiKey) continue; // allow, tool will error nicely if missing
        if (req === "YOUTUBE_API_KEY" && !appConfig.youtubeApiKey) continue;
      }
    }

    try {
      item.register(server as any, commonConfig);
    } catch (err) {
      console.error(`[bootstrap] Failed to register ${item.id}:`, err);
    }
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Research Orchestrator MCP Server running on stdio");
}