import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { loadOrchestrations, OrchestrationMetadata } from "./orchestrationDiscovery.js";

// Intent keywords mapped to domains and orchestrations
const INTENT_KEYWORDS: Record<string, { domains: string[]; orchestrations: string[]; weight: number }> = {
  // Business & Market Intelligence
  company: { domains: ["business-market-intelligence"], orchestrations: ["comprehensive-company-profile"], weight: 0.9 },
  profile: { domains: ["business-market-intelligence"], orchestrations: ["comprehensive-company-profile", "executive-background-research"], weight: 0.8 },
  market: { domains: ["business-market-intelligence"], orchestrations: ["market-overview-sizing", "industry-trend-report"], weight: 0.85 },
  industry: { domains: ["business-market-intelligence"], orchestrations: ["industry-trend-report"], weight: 0.8 },
  executive: { domains: ["business-market-intelligence"], orchestrations: ["executive-background-research"], weight: 0.9 },
  financial: { domains: ["business-market-intelligence"], orchestrations: ["investment-financial-insights"], weight: 0.85 },
  investment: { domains: ["business-market-intelligence"], orchestrations: ["investment-financial-insights"], weight: 0.9 },
  brand: { domains: ["business-market-intelligence"], orchestrations: ["brand-reputation-audit"], weight: 0.85 },
  reputation: { domains: ["business-market-intelligence"], orchestrations: ["brand-reputation-audit"], weight: 0.9 },
  regulatory: { domains: ["business-market-intelligence"], orchestrations: ["regulatory-impact-assessment"], weight: 0.9 },
  regulation: { domains: ["business-market-intelligence"], orchestrations: ["regulatory-impact-assessment"], weight: 0.85 },
  launch: { domains: ["business-market-intelligence"], orchestrations: ["product-launch-analysis"], weight: 0.8 },
  news: { domains: ["business-market-intelligence"], orchestrations: ["news-coverage-summaries"], weight: 0.7 },
  consumer: { domains: ["business-market-intelligence"], orchestrations: ["consumer-feedback-analysis"], weight: 0.8 },

  // Competitive Analysis
  competitor: { domains: ["competitive-analysis-strategy"], orchestrations: ["competitor-identification-profiling"], weight: 0.95 },
  competitive: { domains: ["competitive-analysis-strategy"], orchestrations: ["competitor-identification-profiling", "market-share-growth-insights"], weight: 0.9 },
  swot: { domains: ["competitive-analysis-strategy"], orchestrations: ["swot-analysis-aggregation"], weight: 1.0 },
  pricing: { domains: ["competitive-analysis-strategy"], orchestrations: ["product-feature-pricing-comparison"], weight: 0.9 },
  feature: { domains: ["competitive-analysis-strategy"], orchestrations: ["product-feature-pricing-comparison"], weight: 0.7 },
  comparison: { domains: ["competitive-analysis-strategy"], orchestrations: ["product-feature-pricing-comparison", "framework-tool-comparison"], weight: 0.8 },
  benchmark: { domains: ["competitive-analysis-strategy", "technical-developer-research"], orchestrations: ["content-marketing-benchmark", "social-engagement-benchmarking"], weight: 0.85 },
  partnership: { domains: ["competitive-analysis-strategy"], orchestrations: ["partnerships-alliances-research"], weight: 0.9 },
  alliance: { domains: ["competitive-analysis-strategy"], orchestrations: ["partnerships-alliances-research"], weight: 0.9 },
  patent: { domains: ["competitive-analysis-strategy"], orchestrations: ["innovation-ip-scan"], weight: 0.85 },
  innovation: { domains: ["competitive-analysis-strategy", "technical-developer-research"], orchestrations: ["innovation-ip-scan", "research-innovation-tracking"], weight: 0.8 },
  review: { domains: ["competitive-analysis-strategy"], orchestrations: ["customer-review-sentiment"], weight: 0.7 },

  // Knowledge & Academic
  research: { domains: ["knowledge-academic-research", "technical-developer-research"], orchestrations: ["topic-literature-review"], weight: 0.7 },
  academic: { domains: ["knowledge-academic-research"], orchestrations: ["topic-literature-review"], weight: 0.95 },
  paper: { domains: ["knowledge-academic-research"], orchestrations: ["topic-literature-review"], weight: 0.9 },
  literature: { domains: ["knowledge-academic-research"], orchestrations: ["topic-literature-review"], weight: 0.95 },
  factcheck: { domains: ["knowledge-academic-research"], orchestrations: ["fact-checking-workflow"], weight: 1.0 },
  verify: { domains: ["knowledge-academic-research"], orchestrations: ["fact-checking-workflow"], weight: 0.8 },
  fact: { domains: ["knowledge-academic-research"], orchestrations: ["fact-checking-workflow"], weight: 0.75 },
  history: { domains: ["knowledge-academic-research"], orchestrations: ["historical-event-timeline"], weight: 0.9 },
  timeline: { domains: ["knowledge-academic-research"], orchestrations: ["historical-event-timeline"], weight: 0.85 },
  educational: { domains: ["knowledge-academic-research"], orchestrations: ["educational-resource-aggregation"], weight: 0.9 },
  learn: { domains: ["knowledge-academic-research"], orchestrations: ["educational-resource-aggregation", "comprehensive-qa-resolution"], weight: 0.7 },
  question: { domains: ["knowledge-academic-research"], orchestrations: ["comprehensive-qa-resolution"], weight: 0.6 },

  // Social Media & Community
  social: { domains: ["social-media-community-insights"], orchestrations: ["cross-platform-social-audit"], weight: 0.8 },
  sentiment: { domains: ["social-media-community-insights", "competitive-analysis-strategy"], orchestrations: ["sentiment-analysis-across-platforms", "customer-review-sentiment"], weight: 0.9 },
  trend: { domains: ["social-media-community-insights"], orchestrations: ["tiktok-trend-analysis", "youtube-content-trends"], weight: 0.85 },
  trending: { domains: ["social-media-community-insights"], orchestrations: ["tiktok-trend-analysis", "viral-content-monitoring"], weight: 0.9 },
  viral: { domains: ["social-media-community-insights"], orchestrations: ["viral-content-monitoring"], weight: 0.95 },
  influencer: { domains: ["social-media-community-insights"], orchestrations: ["influencer-identification"], weight: 0.95 },
  youtube: { domains: ["social-media-community-insights"], orchestrations: ["youtube-content-trends"], weight: 0.9 },
  tiktok: { domains: ["social-media-community-insights"], orchestrations: ["tiktok-trend-analysis"], weight: 0.9 },
  reddit: { domains: ["social-media-community-insights"], orchestrations: ["reddit-faq-issue-analysis"], weight: 0.9 },
  community: { domains: ["social-media-community-insights"], orchestrations: ["reddit-faq-issue-analysis"], weight: 0.75 },
  campaign: { domains: ["social-media-community-insights"], orchestrations: ["campaign-impact-evaluation"], weight: 0.9 },
  crisis: { domains: ["social-media-community-insights"], orchestrations: ["crisis-monitoring-social"], weight: 0.95 },
  engagement: { domains: ["social-media-community-insights"], orchestrations: ["social-engagement-benchmarking"], weight: 0.85 },

  // Technical & Developer
  api: { domains: ["technical-developer-research"], orchestrations: ["api-documentation-discovery"], weight: 0.9 },
  documentation: { domains: ["technical-developer-research"], orchestrations: ["api-documentation-discovery"], weight: 0.8 },
  framework: { domains: ["technical-developer-research"], orchestrations: ["framework-tool-comparison"], weight: 0.9 },
  library: { domains: ["technical-developer-research"], orchestrations: ["framework-tool-comparison"], weight: 0.8 },
  security: { domains: ["technical-developer-research"], orchestrations: ["security-vulnerability-research"], weight: 0.95 },
  vulnerability: { domains: ["technical-developer-research"], orchestrations: ["security-vulnerability-research"], weight: 0.95 },
  opensource: { domains: ["technical-developer-research"], orchestrations: ["open-source-activity-scan"], weight: 0.9 },
  github: { domains: ["technical-developer-research"], orchestrations: ["open-source-activity-scan"], weight: 0.85 },
  developer: { domains: ["technical-developer-research"], orchestrations: ["developer-hiring-trends"], weight: 0.7 },
  hiring: { domains: ["technical-developer-research"], orchestrations: ["developer-hiring-trends"], weight: 0.85 },
  technical: { domains: ["technical-developer-research"], orchestrations: ["technical-feature-benchmarking"], weight: 0.75 },

  // Meta orchestrations
  workflow: { domains: ["meta"], orchestrations: ["workflow-design-research-engine"], weight: 0.8 },
  idea: { domains: ["meta"], orchestrations: ["yc-idea-validator-refinement-engine"], weight: 0.7 },
  startup: { domains: ["meta"], orchestrations: ["yc-idea-validator-refinement-engine"], weight: 0.85 },
  validate: { domains: ["meta"], orchestrations: ["yc-idea-validator-refinement-engine"], weight: 0.7 },
  architecture: { domains: ["meta"], orchestrations: ["technology-architecture-decision-engine"], weight: 0.9 },
  decision: { domains: ["meta"], orchestrations: ["technology-architecture-decision-engine"], weight: 0.6 },
};

// Calculate similarity score between query and orchestration
function calculateMatchScore(
  query: string,
  orchestration: OrchestrationMetadata,
  context?: { domain_hints?: string[]; quality_preference?: string }
): { score: number; reasons: string[] } {
  const queryLower = query.toLowerCase();
  const words = queryLower.split(/\s+/);
  let score = 0;
  const reasons: string[] = [];

  // Check intent keywords
  for (const word of words) {
    const intent = INTENT_KEYWORDS[word];
    if (intent) {
      // Check if orchestration matches this intent
      if (intent.orchestrations.includes(orchestration.id)) {
        score += intent.weight * 0.4;
        reasons.push(`Keyword '${word}' directly matches orchestration`);
      } else if (intent.domains.includes(orchestration.domain)) {
        score += intent.weight * 0.2;
        reasons.push(`Keyword '${word}' matches domain '${orchestration.domain}'`);
      }
    }
  }

  // Check name similarity
  const nameLower = orchestration.name.toLowerCase();
  for (const word of words) {
    if (word.length > 3 && nameLower.includes(word)) {
      score += 0.15;
      reasons.push(`Query term '${word}' found in orchestration name`);
    }
  }

  // Check description similarity
  const descLower = orchestration.description.toLowerCase();
  for (const word of words) {
    if (word.length > 3 && descLower.includes(word)) {
      score += 0.1;
      reasons.push(`Query term '${word}' found in description`);
    }
  }

  // Check tags
  for (const tag of orchestration.tags) {
    const tagLower = tag.toLowerCase();
    for (const word of words) {
      if (tagLower.includes(word) || word.includes(tagLower)) {
        score += 0.1;
        reasons.push(`Tag '${tag}' matches query`);
      }
    }
  }

  // Apply domain hints boost
  if (context?.domain_hints) {
    for (const hint of context.domain_hints) {
      if (orchestration.domain.includes(hint.toLowerCase())) {
        score += 0.15;
        reasons.push(`Domain matches hint '${hint}'`);
      }
    }
  }

  // Adjust for complexity preference
  if (context?.quality_preference) {
    const complexityMap: Record<string, string[]> = {
      fast: ["low"],
      balanced: ["low", "medium"],
      thorough: ["medium", "high"],
    };
    const preferred = complexityMap[context.quality_preference] || [];
    if (preferred.includes(orchestration.complexity)) {
      score += 0.05;
      reasons.push(`Complexity '${orchestration.complexity}' matches preference`);
    }
  }

  // Normalize score to 0-1 range
  score = Math.min(1, score);

  return { score, reasons };
}

/**
 * Register orchestration matcher tool
 */
export function registerOrchestrationMatcherTool(server: McpServer) {
  server.tool(
    "orchestration_matcher",
    `Match a user's research request to the most appropriate orchestration template(s).

This tool analyzes your research prompt and finds orchestrations that best fit your needs.
It considers:
- Keywords and intent in your prompt
- Domain relevance
- Complexity preferences
- Required tools

Returns ranked matches with confidence scores and reasons for each match.
If no good match is found, it suggests using orchestration_reasoning to design a custom workflow.`,
    {
      user_prompt: z.string().describe("The user's research request or question"),
      context: z
        .object({
          domain_hints: z
            .array(z.string())
            .optional()
            .describe("Domain hints to prioritize (e.g., ['business', 'technical'])"),
          time_constraint: z
            .string()
            .optional()
            .describe("Time constraint (e.g., 'quick', '30 minutes', 'no limit')"),
          quality_preference: z
            .enum(["fast", "balanced", "thorough"])
            .optional()
            .describe("Quality vs speed preference"),
          exclude_orchestrations: z
            .array(z.string())
            .optional()
            .describe("Orchestration IDs to exclude from matching"),
        })
        .optional()
        .describe("Additional context to improve matching"),
      min_confidence: z
        .number()
        .default(0.3)
        .describe("Minimum confidence score to include in results (0-1)"),
      max_results: z.number().default(5).describe("Maximum number of matches to return"),
    },
    async ({ user_prompt, context, min_confidence, max_results }) => {
      const orchestrations = loadOrchestrations();

      // Calculate scores for all orchestrations
      const matches: Array<{
        orchestration: OrchestrationMetadata;
        score: number;
        reasons: string[];
      }> = [];

      for (const orch of orchestrations) {
        // Skip excluded orchestrations
        if (context?.exclude_orchestrations?.includes(orch.id)) continue;

        const { score, reasons } = calculateMatchScore(user_prompt, orch, context);
        if (score >= min_confidence) {
          matches.push({ orchestration: orch, score, reasons });
        }
      }

      // Sort by score descending
      matches.sort((a, b) => b.score - a.score);

      // Take top results
      const topMatches = matches.slice(0, max_results);

      // Determine recommendation
      const hasGoodMatch = topMatches.length > 0 && topMatches[0].score >= 0.5;
      const hasExcellentMatch = topMatches.length > 0 && topMatches[0].score >= 0.7;

      let recommendation: string;
      let suggested_action: string;

      if (hasExcellentMatch) {
        recommendation = `Strong match found: '${topMatches[0].orchestration.name}' (${Math.round(topMatches[0].score * 100)}% confidence)`;
        suggested_action = `execute_orchestration:${topMatches[0].orchestration.id}`;
      } else if (hasGoodMatch) {
        recommendation = `Reasonable match found: '${topMatches[0].orchestration.name}'. Consider reviewing the workflow details.`;
        suggested_action = `review_orchestration:${topMatches[0].orchestration.id}`;
      } else if (topMatches.length > 0) {
        recommendation = `Partial matches found. Consider combining approaches or designing a custom orchestration.`;
        suggested_action = "design_custom_orchestration";
      } else {
        recommendation = `No matching orchestrations found. Use orchestration_reasoning to design a custom workflow.`;
        suggested_action = "design_custom_orchestration";
      }

      // Suggest adaptations for top match
      const adaptations: string[] = [];
      if (hasGoodMatch) {
        const topOrch = topMatches[0].orchestration;
        // Check for missing tools based on query
        if (user_prompt.toLowerCase().includes("recent") || user_prompt.toLowerCase().includes("news")) {
          if (!topOrch.requiredTools.includes("web_search_exa")) {
            adaptations.push("Add web_search_exa for recent news coverage");
          }
        }
        if (user_prompt.toLowerCase().includes("social") || user_prompt.toLowerCase().includes("opinion")) {
          if (!topOrch.requiredTools.includes("scrape_reddit_exa")) {
            adaptations.push("Add scrape_reddit_exa for community opinions");
          }
        }
        if (user_prompt.toLowerCase().includes("video") || user_prompt.toLowerCase().includes("youtube")) {
          if (!topOrch.requiredTools.includes("youtube_search_exa")) {
            adaptations.push("Add youtube_search_exa for video content");
          }
        }
      }

      const response = {
        query_analyzed: user_prompt,
        total_orchestrations_checked: orchestrations.length,
        matches_found: topMatches.length,
        recommendation,
        suggested_action,
        adaptations_suggested: adaptations.length > 0 ? adaptations : undefined,
        matches: topMatches.map((m) => ({
          orchestration_id: m.orchestration.id,
          name: m.orchestration.name,
          domain: m.orchestration.domain,
          confidence: Math.round(m.score * 100) / 100,
          confidence_percent: `${Math.round(m.score * 100)}%`,
          complexity: m.orchestration.complexity,
          required_tools: m.orchestration.requiredTools,
          match_reasons: m.reasons,
          estimated_duration: m.orchestration.estimatedDuration,
        })),
        no_match_guidance:
          topMatches.length === 0
            ? {
                suggestion: "Use orchestration_reasoning tool to design a custom research workflow",
                alternative: "Try broadening your search terms or check available domains with orchestration_domains",
              }
            : undefined,
      };

      return {
        content: [{ type: "text" as const, text: JSON.stringify(response, null, 2) }],
      };
    }
  );
}
