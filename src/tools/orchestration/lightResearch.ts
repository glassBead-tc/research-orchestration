import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { designBalancedSnapshotPlan, LightPlanSchema, type LightPlan } from "../../light/plan.js";
import { runLightPlan, RunnerEnvTag } from "../../light/runner.js";
import * as Effect from "effect/Effect";

export function registerLightResearchTools(server: McpServer, config?: { exaApiKey?: string; baseUrl?: string }) {
  // design_plan
  server.tool(
    "light_research.design_plan",
    "Design a Right-Depth Light Research plan (balanced snapshot).",
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

  // run_plan - executes the Effect-TS runner with budgets and concurrency controls
  server.tool(
    "light_research.run_plan",
    "Run a Light Research plan using Effect-TS with retries, timeouts and concurrency caps.",
    {
      plan: z.any().optional(),
      plan_json: z.any().optional(),
    },
    async ({ plan, plan_json }) => {
      const candidate = plan_json ?? plan;
      if (!candidate) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Missing plan. Provide `plan` or `plan_json`.",
            },
          ],
          isError: true,
        };
      }

      let parsedPlan: LightPlan;
      try {
        parsedPlan = LightPlanSchema.parse(candidate);
      } catch (err) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Invalid Light plan: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
          isError: true,
        };
      }

      const exaApiKey = config?.exaApiKey || process.env.EXA_API_KEY || "";
      const baseUrl = config?.baseUrl || "https://api.exa.ai";

      try {
        const program = runLightPlan(parsedPlan).pipe(
          Effect.provideService(RunnerEnvTag, { exaApiKey, baseUrl })
        );
        const result = await Effect.runPromise(program);
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Light plan execution error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}