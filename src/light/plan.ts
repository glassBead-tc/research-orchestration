import { z } from "zod";

export const LightPlanSchema = z.object({
  id: z.string(),
  mode: z.literal("light"),
  query: z.string(),
  budgets: z.object({
    maxLatencyMs: z.number().default(12000),
    maxCostUsd: z.number().default(0.03),
    maxSearchCalls: z.number().default(3),
    concurrency: z.number().default(3),
  }),
  steps: z.array(
    z.object({
      name: z.string(),
      type: z.enum(["generate_queries", "search", "dedup", "cluster", "summarise"]),
      params: z.record(z.any()).optional(),
    })
  ),
});

export type LightPlan = z.infer<typeof LightPlanSchema>;

export interface DesignPlanArgs {
  query: string;
  quality: "scout" | "balanced" | "high";
  budgets?: Partial<LightPlan["budgets"]>;
}

export function designBalancedSnapshotPlan(args: DesignPlanArgs): LightPlan {
  const budgets = {
    maxLatencyMs: args.budgets?.maxLatencyMs ?? 12000,
    maxCostUsd: args.budgets?.maxCostUsd ?? 0.03,
    maxSearchCalls: args.budgets?.maxSearchCalls ?? 3,
    concurrency: args.budgets?.concurrency ?? 3,
  };
  return {
    id: `light-${Date.now()}`,
    mode: "light",
    query: args.query,
    budgets,
    steps: [
      { name: "generate_queries", type: "generate_queries" },
      { name: "search", type: "search", params: { kind: "fast" } },
      { name: "dedup", type: "dedup" },
      { name: "summarise", type: "summarise" },
    ],
  };
}