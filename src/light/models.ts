import { z } from "zod";
import { LightPlan, LightPlanSchema, designBalancedSnapshotPlan } from "./plan.js";

export const RiskSchema = z.object({
  description: z.string(),
  likelihood: z.enum(["low", "medium", "high"]).default("medium"),
  impact: z.enum(["low", "medium", "high"]).default("medium"),
  mitigation: z.string().optional(),
});

export const SuccessCriteriaSchema = z.object({
  metrics: z.array(z.string()).default([]),
  acceptanceCriteria: z.array(z.string()).default([]),
  verificationSteps: z.array(z.string()).default([]),
});

export const ConstraintsSchema = z.object({
  budgets: z
    .object({
      maxLatencyMs: z.number().optional(),
      maxCostUsd: z.number().optional(),
      maxSearchCalls: z.number().optional(),
      concurrency: z.number().optional(),
    })
    .default({}),
  allowedTools: z.array(z.string()).default([]),
  blockedTools: z.array(z.string()).default([]),
  complianceNotes: z.array(z.string()).default([]),
});

export const DecompositionSchema = z.object({
  subQuestions: z.array(z.string()).default([]),
});

export const ScopingDocSchema = z.object({
  sessionId: z.string(),
  agentId: z.string(),
  context: z.string().default("general"),
  query: z.string().default(""),
  objectives: z.array(z.string()).default([]),
  scopeIn: z.array(z.string()).default([]),
  scopeOut: z.array(z.string()).default([]),
  stakeholders: z.array(z.string()).default([]),
  timeframe: z.string().default(""),
  constraints: ConstraintsSchema.default({}),
  assumptions: z.array(z.string()).default([]),
  unknowns: z.array(z.string()).default([]),
  deliverables: z.array(z.string()).default([]),
  success: SuccessCriteriaSchema.default({ metrics: [], acceptanceCriteria: [], verificationSteps: [] }),
  risks: z.array(RiskSchema).default([]),
  decomposition: DecompositionSchema.default({ subQuestions: [] }),
  selectedTools: z.array(z.string()).default([]),
});

export type ScopingDoc = z.infer<typeof ScopingDocSchema>;

export const OrchestrationPlanSchema = z.object({
  id: z.string(),
  sessionId: z.string(),
  summary: z.string().default(""),
  steps: z.array(
    z.object({
      name: z.string(),
      primitive: z.enum(["querying", "filtering", "aggregation", "reasoning"]).or(z.string()),
      tool: z.string().optional(),
      params: z.record(z.any()).optional(),
      dependsOn: z.array(z.string()).default([]),
      canRunInParallel: z.boolean().default(false),
    })
  ),
});

export type OrchestrationPlan = z.infer<typeof OrchestrationPlanSchema>;

export function scopingDocToLightPlan(scoping: ScopingDoc): LightPlan {
  const budgets = {
    maxLatencyMs: scoping.constraints.budgets.maxLatencyMs ?? 12000,
    maxCostUsd: scoping.constraints.budgets.maxCostUsd ?? 0.03,
    maxSearchCalls: scoping.constraints.budgets.maxSearchCalls ?? 3,
    concurrency: scoping.constraints.budgets.concurrency ?? 3,
  } as Partial<LightPlan["budgets"]>;

  const plan = designBalancedSnapshotPlan({
    query: scoping.query || scoping.objectives[0] || "",
    quality: "balanced",
    budgets,
  });

  return LightPlanSchema.parse(plan);
}