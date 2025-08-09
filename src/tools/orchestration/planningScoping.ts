import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SessionManager, SessionStore } from "../../memory/sessionStore.js";
import { ScopingDocSchema, ScopingDoc, scopingDocToLightPlan } from "../../light/models.js";
import { LightPlanSchema } from "../../light/plan.js";

const sessionManager = new SessionManager();

const ScopingDocInput = ScopingDocSchema.partial({
  sessionId: true,
  agentId: true,
})
  .extend({
    sessionId: z.string(),
    agentId: z.string(),
  })
  .strict();

export function registerPlanningScopingTools(server: McpServer) {
  server.tool(
    "planning_scoping.start_session",
    "Start a planning/scoping session and create an empty ScopingDoc.",
    {
      agentId: z.string(),
      context: z.string().default("general").optional(),
      query: z.string().default("").optional(),
    },
    async ({ agentId, context, query }) => {
      const session = sessionManager.createSession(agentId);
      const scoping: ScopingDoc = ScopingDocSchema.parse({
        sessionId: (session as any)["sessionId"],
        agentId,
        context: context ?? "general",
        query: query ?? "",
      });
      // Record as planning experience
      session.recordExperience({
        primitive: "planning",
        input: { action: "start_session", context, query },
        output: { scoping },
        quality: { relevance: 1, completeness: 0.2, confidence: 0.5, efficiency: 1 },
        insights: ["Scoping session initialized"],
        patterns: [],
        duration_ms: 0,
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(scoping, null, 2) }] };
    }
  );

  server.tool(
    "planning_scoping.define_objectives",
    "Define objectives, scope in/out, stakeholders, and timeframe.",
    {
      sessionId: z.string(),
      objectives: z.array(z.string()).default([]).optional(),
      scopeIn: z.array(z.string()).default([]).optional(),
      scopeOut: z.array(z.string()).default([]).optional(),
      stakeholders: z.array(z.string()).default([]).optional(),
      timeframe: z.string().default("").optional(),
    },
    async (args) => {
      const session = sessionManager.getSession(args.sessionId);
      if (!session) throw new Error("Session not found");
      const prev = session.exportSession();
      const existing = (prev.experiences.find((e: any) => e.primitive === "planning" && e.output?.scoping)?.output?.scoping) as ScopingDoc | undefined;
      const scoping: ScopingDoc = ScopingDocSchema.parse({
        ...(existing ?? {
          sessionId: args.sessionId,
          agentId: prev.metadata.agentId,
        }),
        objectives: args.objectives ?? existing?.objectives ?? [],
        scopeIn: args.scopeIn ?? existing?.scopeIn ?? [],
        scopeOut: args.scopeOut ?? existing?.scopeOut ?? [],
        stakeholders: args.stakeholders ?? existing?.stakeholders ?? [],
        timeframe: args.timeframe ?? existing?.timeframe ?? "",
      });
      session.recordExperience({
        primitive: "planning",
        input: { action: "define_objectives", ...args },
        output: { scoping },
        quality: { relevance: 1, completeness: 0.6, confidence: 0.7, efficiency: 0.9 },
        insights: ["Objectives captured"],
        patterns: [],
        duration_ms: 0,
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(scoping, null, 2) }] };
    }
  );

  server.tool(
    "planning_scoping.capture_constraints",
    "Capture budgets, allowed/blocked tools, and compliance notes.",
    {
      sessionId: z.string(),
      budgets: z
        .object({
          maxLatencyMs: z.number().optional(),
          maxCostUsd: z.number().optional(),
          maxSearchCalls: z.number().optional(),
          concurrency: z.number().optional(),
        })
        .optional(),
      allowedTools: z.array(z.string()).optional(),
      blockedTools: z.array(z.string()).optional(),
      complianceNotes: z.array(z.string()).optional(),
    },
    async (args) => {
      const session = sessionManager.getSession(args.sessionId);
      if (!session) throw new Error("Session not found");
      const prev = session.exportSession();
      const existing = (prev.experiences.find((e: any) => e.primitive === "planning" && e.output?.scoping)?.output?.scoping) as ScopingDoc | undefined;
      const scoping: ScopingDoc = ScopingDocSchema.parse({
        ...(existing ?? { sessionId: args.sessionId, agentId: prev.metadata.agentId }),
        constraints: {
          budgets: { ...existing?.constraints?.budgets, ...(args.budgets ?? {}) },
          allowedTools: args.allowedTools ?? existing?.constraints?.allowedTools ?? [],
          blockedTools: args.blockedTools ?? existing?.constraints?.blockedTools ?? [],
          complianceNotes: args.complianceNotes ?? existing?.constraints?.complianceNotes ?? [],
        },
      });
      session.recordExperience({
        primitive: "planning",
        input: { action: "capture_constraints", ...args },
        output: { scoping },
        quality: { relevance: 1, completeness: 0.7, confidence: 0.7, efficiency: 0.9 },
        insights: ["Constraints captured"],
        patterns: [],
        duration_ms: 0,
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(scoping, null, 2) }] };
    }
  );

  server.tool(
    "planning_scoping.list_unknowns_and_assumptions",
    "Record unknowns and assumptions for the scoping document.",
    {
      sessionId: z.string(),
      unknowns: z.array(z.string()).default([]).optional(),
      assumptions: z.array(z.string()).default([]).optional(),
    },
    async (args) => {
      const session = sessionManager.getSession(args.sessionId);
      if (!session) throw new Error("Session not found");
      const prev = session.exportSession();
      const existing = (prev.experiences.find((e: any) => e.primitive === "planning" && e.output?.scoping)?.output?.scoping) as ScopingDoc | undefined;
      const scoping: ScopingDoc = ScopingDocSchema.parse({
        ...(existing ?? { sessionId: args.sessionId, agentId: prev.metadata.agentId }),
        unknowns: args.unknowns ?? existing?.unknowns ?? [],
        assumptions: args.assumptions ?? existing?.assumptions ?? [],
      });
      session.recordExperience({
        primitive: "planning",
        input: { action: "list_unknowns_and_assumptions", ...args },
        output: { scoping },
        quality: { relevance: 1, completeness: 0.7, confidence: 0.7, efficiency: 0.95 },
        insights: ["Unknowns and assumptions captured"],
        patterns: [],
        duration_ms: 0,
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(scoping, null, 2) }] };
    }
  );

  server.tool(
    "planning_scoping.success_criteria",
    "Define success criteria and verification steps.",
    {
      sessionId: z.string(),
      metrics: z.array(z.string()).default([]).optional(),
      acceptanceCriteria: z.array(z.string()).default([]).optional(),
      verificationSteps: z.array(z.string()).default([]).optional(),
    },
    async (args) => {
      const session = sessionManager.getSession(args.sessionId);
      if (!session) throw new Error("Session not found");
      const prev = session.exportSession();
      const existing = (prev.experiences.find((e: any) => e.primitive === "planning" && e.output?.scoping)?.output?.scoping) as ScopingDoc | undefined;
      const scoping: ScopingDoc = ScopingDocSchema.parse({
        ...(existing ?? { sessionId: args.sessionId, agentId: prev.metadata.agentId }),
        success: {
          metrics: args.metrics ?? existing?.success?.metrics ?? [],
          acceptanceCriteria: args.acceptanceCriteria ?? existing?.success?.acceptanceCriteria ?? [],
          verificationSteps: args.verificationSteps ?? existing?.success?.verificationSteps ?? [],
        },
      });
      session.recordExperience({
        primitive: "planning",
        input: { action: "success_criteria", ...args },
        output: { scoping },
        quality: { relevance: 1, completeness: 0.8, confidence: 0.8, efficiency: 0.95 },
        insights: ["Success criteria defined"],
        patterns: [],
        duration_ms: 0,
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(scoping, null, 2) }] };
    }
  );

  server.tool(
    "planning_scoping.tool_selection",
    "Recommend tools based on info types and prior effectiveness in this context.",
    {
      sessionId: z.string(),
      infoTypes: z.array(z.string()),
      context: z.string().default("general").optional(),
    },
    async ({ sessionId, infoTypes, context }) => {
      const session = sessionManager.getSession(sessionId);
      if (!session) throw new Error("Session not found");
      const prefs = session.getToolPreferences(context ?? "general");
      const recommended = infoTypes.map((type) => {
        // Simple mapping leveraging existing guide (static hints) + preferences weighting
        const defaults: Record<string, string[]> = {
          news: ["web_search_exa"],
          academic: ["research_paper_search_exa"],
          company: ["company_research_exa"],
          competition: ["competitor_finder_exa"],
          professional: ["linkedin_search_exa"],
          facts: ["wikipedia_search_exa"],
          technical: ["github_search_exa"],
          opinion: ["scrape_reddit_exa"],
          video: ["youtube_search_exa"],
          trending: ["tiktok_search_exa"],
          url: ["crawling_exa"],
        };
        const base = defaults[type] ?? ["web_search_exa"];
        // Sort by effectiveness if present
        const sorted = base.sort((a, b) => {
          const pa = prefs.find((p) => p.tool === a)?.effectiveness ?? 0;
          const pb = prefs.find((p) => p.tool === b)?.effectiveness ?? 0;
          return pb - pa;
        });
        return { type, tools: sorted };
      });
      // Store as planning experience
      session.recordExperience({
        primitive: "planning",
        input: { action: "tool_selection", infoTypes, context },
        output: { recommended },
        quality: { relevance: 1, completeness: 0.6, confidence: 0.7, efficiency: 1 },
        insights: ["Tool recommendations prepared"],
        patterns: [],
        duration_ms: 0,
      });
      return { content: [{ type: "text" as const, text: JSON.stringify({ recommended }, null, 2) }] };
    }
  );

  server.tool(
    "planning_scoping.plan_outline",
    "Draft an orchestration outline and convert to a LightPlan candidate.",
    {
      sessionId: z.string(),
      decomposition: z.array(z.string()).default([]).optional(),
    },
    async ({ sessionId, decomposition }) => {
      const session = sessionManager.getSession(sessionId);
      if (!session) throw new Error("Session not found");
      const prev = session.exportSession();
      const existing = (prev.experiences.find((e: any) => e.primitive === "planning" && e.output?.scoping)?.output?.scoping) as ScopingDoc | undefined;
      if (!existing) throw new Error("No scoping document found. Start session first.");
      const scoping: ScopingDoc = { ...existing, decomposition: { subQuestions: decomposition ?? existing.decomposition.subQuestions } };
      const lightPlan = scopingDocToLightPlan(scoping);
      session.recordExperience({
        primitive: "planning",
        input: { action: "plan_outline", decomposition },
        output: { scoping, lightPlan },
        quality: { relevance: 1, completeness: 0.8, confidence: 0.8, efficiency: 0.9 },
        insights: ["Plan outline generated"],
        patterns: [],
        duration_ms: 0,
      });
      return { content: [{ type: "text" as const, text: JSON.stringify({ scoping, lightPlan }, null, 2) }] };
    }
  );

  server.tool(
    "planning_scoping.critique_plan",
    "Critique a plan against scoping constraints and success criteria.",
    { sessionId: z.string(), plan: z.any() },
    async ({ sessionId, plan }) => {
      const session = sessionManager.getSession(sessionId);
      if (!session) throw new Error("Session not found");
      const prev = session.exportSession();
      const scoping = (prev.experiences.find((e: any) => e.primitive === "planning" && e.output?.scoping)?.output?.scoping) as ScopingDoc | undefined;
      if (!scoping) throw new Error("No scoping document found");

      // Lightweight static critique (no LLM): check budgets alignment and presence of objectives
      const parsed = LightPlanSchema.safeParse(plan);
      const isLightPlan = parsed.success;
      const budgets = isLightPlan ? parsed.data.budgets : undefined;

      const issues: string[] = [];
      if (scoping.objectives.length === 0) issues.push("No objectives defined");
      if (isLightPlan && scoping.constraints?.budgets?.maxLatencyMs && budgets!.maxLatencyMs > scoping.constraints.budgets.maxLatencyMs!) {
        issues.push("Plan latency exceeds scoping budget");
      }
      if (isLightPlan && scoping.constraints?.budgets?.maxSearchCalls && budgets!.maxSearchCalls > scoping.constraints.budgets.maxSearchCalls!) {
        issues.push("Plan search calls exceed scoping limit");
      }

      const score = Math.max(0, 1 - issues.length * 0.2);
      const decision = score >= 0.6 && issues.length === 0 ? "go" : "revise";

      const critique = { score, issues, decision } as const;
      session.recordExperience({
        primitive: "planning",
        input: { action: "critique_plan", plan },
        output: { critique },
        quality: { relevance: 1, completeness: 0.5, confidence: 0.6, efficiency: 1 },
        insights: [decision === "go" ? "Plan acceptable" : "Plan needs revision"],
        patterns: [],
        duration_ms: 0,
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(critique, null, 2) }] };
    }
  );

  server.tool(
    "planning_scoping.scoping_brief",
    "Generate a Markdown scoping brief from the current scoping doc and critiques.",
    { sessionId: z.string() },
    async ({ sessionId }) => {
      const session = sessionManager.getSession(sessionId);
      if (!session) throw new Error("Session not found");
      const exported = session.exportSession();
      const scoping = (exported.experiences.find((e: any) => e.primitive === "planning" && e.output?.scoping)?.output?.scoping) as ScopingDoc | undefined;
      const critique = exported.experiences.find((e: any) => e.primitive === "planning" && e.output?.critique)?.output?.critique;
      if (!scoping) throw new Error("No scoping document found");

      const md = [`# Scoping Brief (${sessionId})`,
        `- Agent: ${exported.metadata.agentId}`,
        scoping.query ? `- Query: ${scoping.query}` : undefined,
        `\n## Objectives`, ...scoping.objectives.map((o) => `- ${o}`),
        `\n## Scope`, `- In: ${scoping.scopeIn.join(", ")}`, `- Out: ${scoping.scopeOut.join(", ")}`,
        `\n## Constraints`, `- Budgets: ${JSON.stringify(scoping.constraints.budgets)}`,
        scoping.constraints.allowedTools.length ? `- Allowed Tools: ${scoping.constraints.allowedTools.join(", ")}` : undefined,
        scoping.constraints.blockedTools.length ? `- Blocked Tools: ${scoping.constraints.blockedTools.join(", ")}` : undefined,
        `\n## Unknowns & Assumptions`,
        scoping.unknowns.length ? `- Unknowns: ${scoping.unknowns.join(", ")}` : "- Unknowns: none",
        scoping.assumptions.length ? `- Assumptions: ${scoping.assumptions.join(", ")}` : "- Assumptions: none",
        `\n## Success Criteria`, `- Metrics: ${scoping.success.metrics.join(", ")}`,
        `- Acceptance: ${scoping.success.acceptanceCriteria.join(", ")}`,
        `- Verification: ${scoping.success.verificationSteps.join(", ")}`,
        `\n## Risks`, ...(scoping.risks.length ? scoping.risks.map((r) => `- ${r.description} (${r.likelihood}/${r.impact})`) : ["- none"]),
        `\n## Decomposition`, ...(scoping.decomposition.subQuestions.length ? scoping.decomposition.subQuestions.map((q) => `- ${q}`) : ["- none"]),
        critique ? `\n## Critique\n- Score: ${critique.score}\n- Decision: ${critique.decision}\n- Issues: ${critique.issues.join(", ") || "none"}` : undefined,
      ].filter(Boolean).join("\n");

      session.recordExperience({
        primitive: "planning",
        input: { action: "scoping_brief" },
        output: { brief: md },
        quality: { relevance: 1, completeness: 0.9, confidence: 0.8, efficiency: 1 },
        insights: ["Scoping brief generated"],
        patterns: [],
        duration_ms: 0,
      });
      return { content: [{ type: "text" as const, text: md }] };
    }
  );
}