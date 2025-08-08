import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { designBalancedSnapshotPlan, LightPlanSchema } from "../../light/plan.js";
import * as Effect from "effect/Effect";
import { runLightPlan, RunnerEnv } from "../../light/runner.js";

export function registerLightResearchTools(server: McpServer, config?: { exaApiKey?: string; baseUrl?: string }) {
  // design_plan
  server.tool(
    "light_research.design_plan",
    "Design a Light Research plan (balanced snapshot).",
    {
      query: z.string(),
      quality: z.enum(["scout", "balanced", "high"]).default("balanced"),
      budgets: z
        .object({
          maxLatencyMs: z.number().optional(),
          maxCostUsd: z.number().optional(),
          maxSearchCalls: z.number().optional(),
          concurrency: z.number().optional(),
        })
        .optional(),
    },
    async ({ query, quality, budgets }) => {
      const plan = designBalancedSnapshotPlan({ query, quality, budgets });
      const parsed = LightPlanSchema.parse(plan);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(parsed, null, 2),
          },
        ],
      };
    }
  );

  // run_plan
  server.tool(
    "light_research.run_plan",
    "Run a Light Research plan using Effect-TS runner.",
    {
      plan: z.any(),
    },
    async ({ plan }) => {
      const parsed = LightPlanSchema.parse(plan);
      const env: RunnerEnv = {
        exaApiKey: config?.exaApiKey || process.env.EXA_API_KEY || "",
        baseUrl: config?.baseUrl || "https://api.exa.ai",
      };
      const effect = runLightPlan(parsed).pipe(Effect.provideService(RunnerEnv, env));
      const result = await Effect.runPromise(effect);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );
}