import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { loadOrchestrations } from "./orchestrationDiscovery.js";

// Intent keywords for complexity estimation
const COMPLEXITY_INDICATORS = {
  high: [
    "comprehensive",
    "in-depth",
    "detailed",
    "thorough",
    "complete",
    "full",
    "analyze",
    "compare",
    "versus",
    "multiple",
    "all",
    "everything",
  ],
  medium: ["overview", "summary", "main", "key", "important", "significant", "recent"],
  low: ["quick", "brief", "simple", "basic", "just", "only", "single", "one"],
};

// Estimate query complexity
function estimateComplexity(prompt: string): { score: number; level: "low" | "medium" | "high"; reasons: string[] } {
  const promptLower = prompt.toLowerCase();
  const reasons: string[] = [];
  let score = 0.5; // Start at medium

  // Check for complexity indicators
  for (const [level, keywords] of Object.entries(COMPLEXITY_INDICATORS)) {
    for (const keyword of keywords) {
      if (promptLower.includes(keyword)) {
        if (level === "high") {
          score += 0.1;
          reasons.push(`Contains high-complexity indicator: '${keyword}'`);
        } else if (level === "low") {
          score -= 0.1;
          reasons.push(`Contains low-complexity indicator: '${keyword}'`);
        }
      }
    }
  }

  // Check for multiple entities (suggests comparison/complexity)
  const andCount = (promptLower.match(/\band\b/g) || []).length;
  const vsCount = (promptLower.match(/\bvs\.?\b|\bversus\b/g) || []).length;
  if (andCount >= 2 || vsCount >= 1) {
    score += 0.15;
    reasons.push("Multiple entities or comparison detected");
  }

  // Check for question words that suggest analytical needs
  if (/\bwhy\b|\bhow\b/.test(promptLower)) {
    score += 0.1;
    reasons.push("Analytical question type detected");
  }

  // Check prompt length (longer = more complex usually)
  if (prompt.length > 200) {
    score += 0.1;
    reasons.push("Long query suggests complex requirements");
  } else if (prompt.length < 50) {
    score -= 0.1;
    reasons.push("Short query suggests simple requirements");
  }

  // Normalize score
  score = Math.max(0, Math.min(1, score));

  // Determine level
  let level: "low" | "medium" | "high";
  if (score < 0.35) level = "low";
  else if (score < 0.65) level = "medium";
  else level = "high";

  return { score, level, reasons };
}

// Quick match against orchestrations for routing
function quickMatch(
  prompt: string
): { matched: boolean; orchestration_id?: string; confidence: number; domain?: string } {
  const orchestrations = loadOrchestrations();
  const promptLower = prompt.toLowerCase();

  // Direct keyword matching for quick routing
  const directMatches: Record<string, { pattern: RegExp; orchestration: string }[]> = {
    "business-market-intelligence": [
      { pattern: /company\s+profile|about\s+company|company\s+research/i, orchestration: "comprehensive-company-profile" },
      { pattern: /market\s+size|tam|sam|som/i, orchestration: "market-overview-sizing" },
      { pattern: /executive|ceo|founder|leadership/i, orchestration: "executive-background-research" },
      { pattern: /brand\s+reputation|brand\s+audit/i, orchestration: "brand-reputation-audit" },
      { pattern: /regulatory|regulation|compliance/i, orchestration: "regulatory-impact-assessment" },
    ],
    "competitive-analysis-strategy": [
      { pattern: /competitor|competitive\s+landscape|rivals/i, orchestration: "competitor-identification-profiling" },
      { pattern: /swot/i, orchestration: "swot-analysis-aggregation" },
      { pattern: /pricing\s+comparison|price\s+compare/i, orchestration: "product-feature-pricing-comparison" },
      { pattern: /market\s+share/i, orchestration: "market-share-growth-insights" },
    ],
    "knowledge-academic-research": [
      { pattern: /literature\s+review|research\s+paper|academic/i, orchestration: "topic-literature-review" },
      { pattern: /fact\s*check|verify\s+claim/i, orchestration: "fact-checking-workflow" },
      { pattern: /history|historical|timeline/i, orchestration: "historical-event-timeline" },
    ],
    "social-media-community-insights": [
      { pattern: /sentiment|opinion|how\s+people\s+feel/i, orchestration: "sentiment-analysis-across-platforms" },
      { pattern: /influencer/i, orchestration: "influencer-identification" },
      { pattern: /tiktok\s+trend|trending\s+on\s+tiktok/i, orchestration: "tiktok-trend-analysis" },
      { pattern: /youtube\s+trend|trending\s+on\s+youtube/i, orchestration: "youtube-content-trends" },
      { pattern: /viral|going\s+viral/i, orchestration: "viral-content-monitoring" },
      { pattern: /reddit|community\s+discussion/i, orchestration: "reddit-faq-issue-analysis" },
    ],
    "technical-developer-research": [
      { pattern: /api\s+documentation|api\s+docs/i, orchestration: "api-documentation-discovery" },
      { pattern: /framework\s+comparison|compare\s+frameworks/i, orchestration: "framework-tool-comparison" },
      { pattern: /security\s+vulnerabilit|cve|security\s+research/i, orchestration: "security-vulnerability-research" },
      { pattern: /github|open\s*source/i, orchestration: "open-source-activity-scan" },
    ],
  };

  // Check for direct matches
  for (const [domain, matches] of Object.entries(directMatches)) {
    for (const { pattern, orchestration } of matches) {
      if (pattern.test(promptLower)) {
        return {
          matched: true,
          orchestration_id: orchestration,
          confidence: 0.85,
          domain,
        };
      }
    }
  }

  // No strong match found
  return { matched: false, confidence: 0 };
}

// Determine best research mode
function determineMode(
  prompt: string,
  complexity: { score: number; level: "low" | "medium" | "high" },
  quickMatchResult: ReturnType<typeof quickMatch>,
  explicitMode?: string
): { mode: "light" | "deep" | "orchestration" | "custom"; reason: string } {
  // Explicit mode takes precedence
  if (explicitMode && explicitMode !== "auto") {
    return { mode: explicitMode as any, reason: `Explicitly requested '${explicitMode}' mode` };
  }

  // If we have a strong orchestration match, use it
  if (quickMatchResult.matched && quickMatchResult.confidence >= 0.7) {
    return {
      mode: "orchestration",
      reason: `Strong match to '${quickMatchResult.orchestration_id}' orchestration`,
    };
  }

  // Route based on complexity
  if (complexity.level === "low") {
    return { mode: "light", reason: "Low complexity query - light research is sufficient" };
  }

  if (complexity.level === "high") {
    // Check if it needs custom design or deep research
    if (quickMatchResult.matched) {
      return { mode: "orchestration", reason: "High complexity with partial orchestration match" };
    }
    return { mode: "deep", reason: "High complexity query requires deep research" };
  }

  // Medium complexity - check for orchestration match
  if (quickMatchResult.matched) {
    return { mode: "orchestration", reason: "Medium complexity with orchestration match" };
  }

  return { mode: "light", reason: "Medium complexity - starting with light research" };
}

/**
 * Register unified research router tool
 */
export function registerResearchRouterTools(server: McpServer) {
  // Main research entry point
  server.tool(
    "research",
    `Unified research entry point - automatically routes to the optimal research workflow.

This is the recommended starting point for any research task. It will:
1. Analyze your research query for complexity and intent
2. Match against 50+ pre-built orchestration templates
3. Route to the most appropriate workflow:
   - light: Quick, bounded search for simple queries
   - deep: Asynchronous deep dive for complex research
   - orchestration: Execute a matched pre-built workflow
   - custom: Design a custom workflow using orchestration_reasoning

You can also explicitly specify a mode if you know what you want.`,
    {
      prompt: z.string().describe("Your research question or objective"),
      mode: z
        .enum(["auto", "light", "deep", "orchestration", "custom"])
        .default("auto")
        .describe("Research mode (auto will intelligently route)"),
      constraints: z
        .object({
          max_time_seconds: z.number().optional().describe("Maximum time in seconds"),
          max_cost_usd: z.number().optional().describe("Maximum cost in USD"),
          max_sources: z.number().optional().describe("Maximum number of sources to query"),
          quality: z.enum(["scout", "balanced", "thorough"]).optional().describe("Quality preference"),
        })
        .optional()
        .describe("Constraints for the research execution"),
      orchestration_id: z
        .string()
        .optional()
        .describe("Specific orchestration to use (for mode=orchestration)"),
    },
    async ({ prompt, mode, constraints, orchestration_id }) => {
      // Analyze the query
      const complexity = estimateComplexity(prompt);
      const matchResult = quickMatch(prompt);

      // Determine the best mode
      const routingDecision = determineMode(prompt, complexity, matchResult, mode);

      // Build the response with routing recommendation
      const response: Record<string, unknown> = {
        query: prompt,
        analysis: {
          complexity: {
            level: complexity.level,
            score: Math.round(complexity.score * 100) / 100,
            indicators: complexity.reasons,
          },
          orchestration_match: matchResult.matched
            ? {
                matched: true,
                orchestration_id: matchResult.orchestration_id,
                domain: matchResult.domain,
                confidence: Math.round(matchResult.confidence * 100) + "%",
              }
            : { matched: false },
        },
        routing: {
          selected_mode: routingDecision.mode,
          reason: routingDecision.reason,
        },
        constraints_applied: constraints || { quality: "balanced" },
      };

      // Add mode-specific guidance
      switch (routingDecision.mode) {
        case "light":
          response.next_steps = {
            tool_to_call: "light_research.design_plan",
            parameters: {
              query: prompt,
              quality: constraints?.quality || "balanced",
              budgets: {
                maxLatencyMs: constraints?.max_time_seconds ? constraints.max_time_seconds * 1000 : 30000,
                maxSearchCalls: constraints?.max_sources || 10,
              },
            },
            then: "Call light_research.run_plan with the returned plan",
          };
          break;

        case "deep":
          response.next_steps = {
            tool_to_call: "deep_research.start",
            parameters: {
              query: prompt,
              budgets: {
                maxLatencyMs: constraints?.max_time_seconds ? constraints.max_time_seconds * 1000 : 120000,
                maxSearchCalls: constraints?.max_sources || 50,
              },
            },
            then: "Poll with deep_research.check using the returned task_id",
          };
          break;

        case "orchestration":
          const orchId = orchestration_id || matchResult.orchestration_id;
          response.next_steps = {
            tool_to_call: "orchestration_details",
            parameters: {
              orchestration_id: orchId,
              section: "workflow",
            },
            then: `Follow the workflow steps in the '${orchId}' orchestration`,
            alternative: "Use orchestration_matcher for more options",
          };
          response.matched_orchestration = {
            id: orchId,
            domain: matchResult.domain,
            description: `Use orchestration_details to get the full workflow`,
          };
          break;

        case "custom":
          response.next_steps = {
            tool_to_call: "orchestration_reasoning",
            parameters: {
              information_need: prompt,
              context: {
                domain: matchResult.domain || "general",
                complexity: complexity.level,
                time_constraint: constraints?.max_time_seconds ? `${constraints.max_time_seconds} seconds` : undefined,
              },
              agentic_level: "guided",
            },
            then: "Execute the primitive sequence returned by orchestration_reasoning",
          };
          break;
      }

      // Add available tools reference
      response.available_research_tools = {
        discovery: ["orchestration_discovery", "orchestration_domains", "orchestration_details"],
        matching: ["orchestration_matcher"],
        execution: ["light_research.design_plan", "light_research.run_plan", "deep_research.start", "deep_research.check"],
        design: ["orchestration_reasoning"],
        search: [
          "web_search_exa",
          "research_paper_search_exa",
          "company_research_exa",
          "competitor_finder_exa",
          "wikipedia_search_exa",
          "github_search_exa",
          "linkedin_search_exa",
          "scrape_reddit_exa",
          "youtube_search_exa",
          "tiktok_search_exa",
          "crawling_exa",
        ],
      };

      return {
        content: [{ type: "text" as const, text: JSON.stringify(response, null, 2) }],
      };
    }
  );

  // Research recommendations tool
  server.tool(
    "research_recommend",
    `Get recommendations for how to approach a research task.

Unlike the 'research' tool which routes to a specific workflow, this tool provides
detailed recommendations and lets you decide how to proceed.`,
    {
      prompt: z.string().describe("Your research question or objective"),
      priorities: z
        .object({
          speed: z.number().min(1).max(5).optional().describe("Priority for speed (1-5)"),
          depth: z.number().min(1).max(5).optional().describe("Priority for depth (1-5)"),
          breadth: z.number().min(1).max(5).optional().describe("Priority for breadth (1-5)"),
          cost: z.number().min(1).max(5).optional().describe("Priority for cost efficiency (1-5)"),
        })
        .optional()
        .describe("Your priorities (1=low, 5=high)"),
    },
    async ({ prompt, priorities }) => {
      const complexity = estimateComplexity(prompt);
      const matchResult = quickMatch(prompt);
      const orchestrations = loadOrchestrations();

      // Default priorities
      const p = {
        speed: priorities?.speed || 3,
        depth: priorities?.depth || 3,
        breadth: priorities?.breadth || 3,
        cost: priorities?.cost || 3,
      };

      // Generate recommendations based on priorities
      const recommendations: Array<{
        approach: string;
        fit_score: number;
        pros: string[];
        cons: string[];
        tools: string[];
      }> = [];

      // Light research recommendation
      const lightFit = (p.speed * 0.4 + p.cost * 0.3 + (5 - p.depth) * 0.2 + (5 - p.breadth) * 0.1) / 5;
      recommendations.push({
        approach: "Light Research (light_research.*)",
        fit_score: lightFit,
        pros: ["Fast execution", "Lower cost", "Good for quick answers"],
        cons: ["Limited depth", "May miss nuanced information"],
        tools: ["light_research.design_plan", "light_research.run_plan"],
      });

      // Deep research recommendation
      const deepFit = (p.depth * 0.4 + p.breadth * 0.3 + (5 - p.speed) * 0.2 + (5 - p.cost) * 0.1) / 5;
      recommendations.push({
        approach: "Deep Research (deep_research.*)",
        fit_score: deepFit,
        pros: ["Comprehensive coverage", "Multi-step analysis", "High quality"],
        cons: ["Slower execution", "Higher cost", "Asynchronous polling required"],
        tools: ["deep_research.start", "deep_research.check"],
      });

      // Orchestration recommendation (if match found)
      if (matchResult.matched) {
        const orchFit = (p.depth * 0.3 + p.breadth * 0.3 + matchResult.confidence * 0.4) / 1.4;
        recommendations.push({
          approach: `Pre-built Orchestration: ${matchResult.orchestration_id}`,
          fit_score: orchFit,
          pros: ["Domain-specific workflow", "Proven pattern", "Structured output"],
          cons: ["May need adaptation", "Less flexible than custom"],
          tools: ["orchestration_details", "orchestration_matcher"],
        });
      }

      // Custom orchestration recommendation
      const customFit = (p.depth * 0.3 + p.breadth * 0.2 + complexity.score * 0.3 + (matchResult.matched ? 0 : 0.2)) / (matchResult.matched ? 0.8 : 1);
      recommendations.push({
        approach: "Custom Orchestration Design",
        fit_score: Math.min(1, customFit),
        pros: ["Tailored to exact needs", "Optimal tool selection", "Full control"],
        cons: ["Requires more upfront planning", "May be overkill for simple queries"],
        tools: ["orchestration_reasoning", "orchestration_discovery"],
      });

      // Sort by fit score
      recommendations.sort((a, b) => b.fit_score - a.fit_score);

      const response = {
        query: prompt,
        complexity_assessment: complexity,
        priorities_used: p,
        recommendations: recommendations.map((r, i) => ({
          rank: i + 1,
          approach: r.approach,
          fit_score: Math.round(r.fit_score * 100) + "%",
          pros: r.pros,
          cons: r.cons,
          tools_to_use: r.tools,
        })),
        top_recommendation: {
          approach: recommendations[0].approach,
          reason: `Best fit (${Math.round(recommendations[0].fit_score * 100)}%) based on your priorities`,
          start_with: recommendations[0].tools[0],
        },
        orchestration_count: orchestrations.length,
        domains_available: [...new Set(orchestrations.map((o) => o.domain))],
      };

      return {
        content: [{ type: "text" as const, text: JSON.stringify(response, null, 2) }],
      };
    }
  );
}
