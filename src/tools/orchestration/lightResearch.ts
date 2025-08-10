import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { designBalancedSnapshotPlan, LightPlanSchema } from "../../light/plan.js";

export function registerLightResearchTools(server: McpServer, _config?: { exaApiKey?: string; baseUrl?: string }) {
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

  // run_plan (temporarily stubbed pending Effect typing integration)
  server.tool(
    "light_research.run_plan",
    "Run a Light Research plan (stubbed: returns the plan).",
    { plan: z.any() },
    async ({ plan }) => {
      const parsed = LightPlanSchema.parse(plan);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ status: "not_implemented", plan: parsed }, null, 2),
          },
        ],
      };
    }
  );
}