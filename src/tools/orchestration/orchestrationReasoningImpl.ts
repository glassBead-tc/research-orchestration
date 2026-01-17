import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { loadOrchestrations, OrchestrationMetadata } from "./orchestrationDiscovery.js";
import {
  OrchestrationReasoningInputSchema,
  ReasoningChain,
  NeedAnalysisPhase,
  ContextAssessmentPhase,
  PatternAnalysisPhase,
  SequenceDesignPhase,
  ValidationPhase,
  PrimitiveStep,
  OrchestrationPlan,
  PatternScore,
  ConsensusVotes,
} from "../../types/orchestrationReasoning.js";

// Tool mapping for information types
const INFO_TYPE_TOOL_MAP: Record<string, string[]> = {
  factual: ["wikipedia_search_exa", "web_search_exa"],
  news: ["web_search_exa"],
  academic: ["research_paper_search_exa"],
  company: ["company_research_exa", "web_search_exa"],
  competitor: ["competitor_finder_exa", "company_research_exa"],
  professional: ["linkedin_search_exa"],
  technical: ["github_search_exa", "web_search_exa"],
  opinion: ["scrape_reddit_exa", "web_search_exa"],
  video: ["youtube_search_exa", "youtube_video_details_exa"],
  trending: ["tiktok_search_exa", "youtube_search_exa"],
  url: ["crawling_exa"],
};

// Keywords that indicate information types
const INFO_TYPE_KEYWORDS: Record<string, string[]> = {
  factual: ["what is", "define", "explain", "history", "background", "facts"],
  news: ["recent", "latest", "news", "announcement", "update", "happening"],
  academic: ["research", "study", "paper", "scientific", "academic", "literature"],
  company: ["company", "business", "organization", "startup", "enterprise", "firm"],
  competitor: ["competitor", "competition", "rival", "alternative", "versus", "vs"],
  professional: ["executive", "ceo", "founder", "team", "leadership", "employee"],
  technical: ["api", "code", "library", "framework", "github", "documentation"],
  opinion: ["opinion", "review", "feedback", "sentiment", "community", "discussion"],
  video: ["video", "youtube", "watch", "tutorial", "demo"],
  trending: ["trend", "viral", "popular", "tiktok", "trending"],
};

/**
 * Phase 1: Analyze the information need
 */
function analyzeNeed(informationNeed: string): NeedAnalysisPhase {
  const needLower = informationNeed.toLowerCase();
  const components: string[] = [];
  const informationTypes: Array<"factual" | "analytical" | "comparative" | "predictive"> = [];

  // Detect question components
  if (needLower.includes("what") || needLower.includes("who") || needLower.includes("where")) {
    components.push("factual_query");
    informationTypes.push("factual");
  }
  if (needLower.includes("why") || needLower.includes("how")) {
    components.push("explanatory_query");
    informationTypes.push("analytical");
  }
  if (needLower.includes("compare") || needLower.includes("versus") || needLower.includes("vs") || needLower.includes("difference")) {
    components.push("comparison_query");
    informationTypes.push("comparative");
  }
  if (needLower.includes("will") || needLower.includes("future") || needLower.includes("predict") || needLower.includes("forecast")) {
    components.push("predictive_query");
    informationTypes.push("predictive");
  }

  // Detect entity types
  const entityPatterns = [
    { pattern: /company|business|startup|organization/i, component: "company_entity" },
    { pattern: /person|executive|founder|ceo|leader/i, component: "person_entity" },
    { pattern: /product|service|tool|software/i, component: "product_entity" },
    { pattern: /market|industry|sector/i, component: "market_entity" },
    { pattern: /technology|framework|api|library/i, component: "technology_entity" },
  ];

  for (const { pattern, component } of entityPatterns) {
    if (pattern.test(needLower) && !components.includes(component)) {
      components.push(component);
    }
  }

  // Ensure at least one component
  if (components.length === 0) {
    components.push("general_query");
    informationTypes.push("factual");
  }

  // Estimate complexity based on components
  const complexityEstimate = Math.min(1, components.length * 0.2 + informationTypes.length * 0.15);

  // Define scope
  const scopeParts: string[] = [];
  if (components.some((c) => c.includes("company"))) scopeParts.push("business information");
  if (components.some((c) => c.includes("person"))) scopeParts.push("professional profiles");
  if (components.some((c) => c.includes("technology"))) scopeParts.push("technical documentation");
  if (components.some((c) => c.includes("market"))) scopeParts.push("market data");
  if (informationTypes.includes("comparative")) scopeParts.push("comparative analysis");

  return {
    components,
    information_types: informationTypes.length > 0 ? informationTypes : ["factual"],
    scope: scopeParts.length > 0 ? scopeParts.join(", ") : "general research",
    success_criteria: `Deliver comprehensive ${informationTypes.join(" and ")} information addressing: ${informationNeed.slice(0, 100)}`,
    complexity_estimate: complexityEstimate,
  };
}

/**
 * Phase 2: Assess context and constraints
 */
function assessContext(
  context: { domain: string; complexity: string; time_constraint?: string; quality_requirements?: string; available_tools?: string[] },
  needAnalysis: NeedAnalysisPhase
): ContextAssessmentPhase {
  // Identify domain patterns
  const domainPatterns: string[] = [];
  const domainMap: Record<string, string[]> = {
    "business-intelligence": ["company", "market", "financial"],
    "academic-research": ["research", "study", "literature"],
    "competitive-analysis": ["competitor", "comparison", "market"],
    "technical-research": ["api", "framework", "documentation"],
    "social-analysis": ["sentiment", "opinion", "community"],
  };

  for (const [domain, keywords] of Object.entries(domainMap)) {
    if (keywords.some((k) => context.domain.toLowerCase().includes(k))) {
      domainPatterns.push(domain);
    }
  }
  if (domainPatterns.length === 0) domainPatterns.push("general-research");

  // Identify risks
  const risks: string[] = [];
  if (context.complexity === "high") {
    risks.push("High complexity may require multiple iterations");
  }
  if (context.time_constraint && context.time_constraint.includes("quick")) {
    risks.push("Time constraint may limit depth of research");
  }
  if (!context.available_tools || context.available_tools.length < 3) {
    risks.push("Limited tool availability may affect coverage");
  }

  // Minimax regret analysis for approach selection
  const scenarios: Record<string, Record<string, number>> = {
    "broad_shallow": {
      "info_complete": 0.7,
      "info_partial": 0.8,
      "info_missing": 0.5,
    },
    "deep_narrow": {
      "info_complete": 0.9,
      "info_partial": 0.6,
      "info_missing": 0.3,
    },
    "balanced": {
      "info_complete": 0.8,
      "info_partial": 0.75,
      "info_missing": 0.6,
    },
  };

  // Calculate regret for each option
  const regrets: Record<string, number> = {};
  for (const option of Object.keys(scenarios)) {
    const optionPayoffs = scenarios[option];
    let maxRegret = 0;
    for (const scenario of Object.keys(optionPayoffs)) {
      const bestPayoff = Math.max(...Object.values(scenarios).map((s) => s[scenario]));
      const regret = bestPayoff - optionPayoffs[scenario];
      maxRegret = Math.max(maxRegret, regret);
    }
    regrets[option] = maxRegret;
  }

  const bestOption = Object.entries(regrets).reduce((a, b) => (a[1] < b[1] ? a : b))[0];

  return {
    domain_patterns: domainPatterns,
    constraints: {
      time: context.time_constraint,
      quality: context.quality_requirements,
      tools: context.available_tools?.length,
    },
    risks,
    minimax_regret_analysis: {
      scenarios,
      best_option: bestOption,
      max_regret: regrets[bestOption],
    },
  };
}

/**
 * Phase 3: Analyze existing patterns
 */
function analyzePatterns(
  needAnalysis: NeedAnalysisPhase,
  contextAssessment: ContextAssessmentPhase
): PatternAnalysisPhase {
  const orchestrations = loadOrchestrations();

  // Score each orchestration for relevance
  const scores: PatternScore[] = [];

  for (const orch of orchestrations) {
    // Calculate similarity score
    let similarity = 0;
    let successRate = 0.7; // Base success rate assumption

    // Domain match
    for (const pattern of contextAssessment.domain_patterns) {
      if (orch.domain.includes(pattern.split("-")[0])) {
        similarity += 0.3;
      }
    }

    // Complexity match
    const complexityScore =
      orch.complexity === "low" ? 0.3 : orch.complexity === "medium" ? 0.5 : 0.7;
    if (Math.abs(complexityScore - needAnalysis.complexity_estimate) < 0.3) {
      similarity += 0.2;
    }

    // Information type match
    for (const infoType of needAnalysis.information_types) {
      if (orch.description.toLowerCase().includes(infoType)) {
        similarity += 0.15;
      }
    }

    // Component match
    for (const component of needAnalysis.components) {
      const componentKeywords = component.replace("_", " ").split(" ");
      for (const keyword of componentKeywords) {
        if (orch.name.toLowerCase().includes(keyword) || orch.description.toLowerCase().includes(keyword)) {
          similarity += 0.1;
        }
      }
    }

    // Normalize similarity
    similarity = Math.min(1, similarity);

    if (similarity > 0.2) {
      scores.push({
        pattern_name: orch.id,
        similarity,
        success_rate: successRate,
        simplicity: orch.complexity === "low" ? 0.9 : orch.complexity === "medium" ? 0.6 : 0.3,
        adaptability: 0.7, // Base adaptability
        total_score: similarity * 0.4 + successRate * 0.3 + 0.3,
      });
    }
  }

  // Sort by total score
  scores.sort((a, b) => b.total_score - a.total_score);
  const topScores = scores.slice(0, 5);

  // Extract patterns from top matches
  const extractedPatterns: string[] = [];
  const adaptations: string[] = [];

  if (topScores.length > 0) {
    extractedPatterns.push(`Multi-phase workflow from '${topScores[0].pattern_name}'`);
    adaptations.push("Customize tool selection based on specific query");
  }
  if (needAnalysis.information_types.includes("comparative")) {
    extractedPatterns.push("Parallel data collection pattern");
    adaptations.push("Add comparison phase after data collection");
  }
  if (needAnalysis.information_types.includes("predictive")) {
    extractedPatterns.push("Trend analysis pattern");
    adaptations.push("Include recent news and historical data phases");
  }

  return {
    relevant_orchestrations: topScores.map((s) => s.pattern_name),
    extracted_patterns: extractedPatterns,
    adaptations,
    pattern_scores: topScores,
  };
}

/**
 * Phase 4: Design primitive sequence
 */
function designSequence(
  needAnalysis: NeedAnalysisPhase,
  patternAnalysis: PatternAnalysisPhase,
  agenticLevel: "prescriptive" | "guided" | "autonomous"
): SequenceDesignPhase {
  const primitiveSequence: PrimitiveStep[] = [];
  const needLower = needAnalysis.scope.toLowerCase();

  // Detect required information types from need analysis
  const detectedInfoTypes: string[] = [];
  for (const [infoType, keywords] of Object.entries(INFO_TYPE_KEYWORDS)) {
    for (const keyword of keywords) {
      if (needLower.includes(keyword)) {
        if (!detectedInfoTypes.includes(infoType)) {
          detectedInfoTypes.push(infoType);
        }
      }
    }
  }

  // Ensure at least one info type
  if (detectedInfoTypes.length === 0) {
    detectedInfoTypes.push("factual");
  }

  // Build querying primitive
  const querySources: string[] = [];
  for (const infoType of detectedInfoTypes) {
    const tools = INFO_TYPE_TOOL_MAP[infoType] || [];
    for (const tool of tools) {
      if (!querySources.includes(tool)) {
        querySources.push(tool);
      }
    }
  }

  primitiveSequence.push({
    primitive: "querying",
    purpose: `Gather ${detectedInfoTypes.join(", ")} information`,
    strategy: {
      sources: {
        primary: querySources.slice(0, 3),
        secondary: querySources.slice(3),
      },
    },
    expected_output: "Raw search results from multiple sources",
    complexity_cost: 0.3,
  });

  // Add filtering primitive if multiple sources
  if (querySources.length > 2) {
    primitiveSequence.push({
      primitive: "filtering",
      purpose: "Filter and deduplicate results",
      strategy: {
        filter_rules: [
          { rule_type: "relevance", criteria: ["query_match", "recency"], logic: "all" },
          { rule_type: "quality", criteria: ["source_authority", "content_depth"], logic: "any" },
        ],
      },
      expected_output: "Filtered, high-quality results",
      complexity_cost: 0.15,
    });
  }

  // Add aggregation primitive for synthesis
  if (needAnalysis.information_types.includes("comparative") || detectedInfoTypes.length > 1) {
    primitiveSequence.push({
      primitive: "aggregation",
      purpose: "Synthesize data from multiple sources",
      strategy: {
        operations: [
          { type: "merge", sources: querySources },
          { type: "deduplicate", key: "content_hash" },
          { type: "rank", criteria: ["relevance", "recency", "authority"] },
        ],
      },
      expected_output: "Unified, ranked dataset",
      complexity_cost: 0.2,
    });
  }

  // Add reasoning primitive for analysis
  if (needAnalysis.information_types.some((t) => t === "analytical" || t === "predictive")) {
    primitiveSequence.push({
      primitive: "reasoning",
      purpose: "Analyze and draw conclusions",
      strategy: {
        reasoning_strategy: {
          framework: needAnalysis.information_types.includes("predictive") ? "trend_analysis" : "comparative_analysis",
          clear_thought_pattern: {
            observation: "Identify key patterns in the data",
            hypothesis: "Form preliminary conclusions",
            prediction: "Project implications",
            verification: "Cross-check against multiple sources",
          },
          reasoning_objectives: [needAnalysis.success_criteria],
        },
      },
      expected_output: "Analytical insights and conclusions",
      complexity_cost: 0.35,
    });
  }

  // Calculate total complexity
  const estimatedComplexity = primitiveSequence.reduce((sum, step) => sum + step.complexity_cost, 0);

  // Determine integration strategy based on agentic level
  let integrationStrategy: string;
  switch (agenticLevel) {
    case "prescriptive":
      integrationStrategy = "Sequential execution with fixed parameters";
      break;
    case "guided":
      integrationStrategy = "Adaptive execution with decision points between phases";
      break;
    case "autonomous":
      integrationStrategy = "Dynamic execution with real-time optimization";
      break;
  }

  return {
    primitive_sequence: primitiveSequence,
    integration_strategy: integrationStrategy,
    quality_checkpoints: primitiveSequence.length,
    estimated_complexity: estimatedComplexity,
  };
}

/**
 * Phase 5: Validate the design
 */
function validateDesign(
  sequenceDesign: SequenceDesignPhase,
  needAnalysis: NeedAnalysisPhase
): ValidationPhase {
  // Simulate multi-agent consensus voting
  const hasQuerying = sequenceDesign.primitive_sequence.some((p) => p.primitive === "querying");
  const hasFiltering = sequenceDesign.primitive_sequence.some((p) => p.primitive === "filtering");
  const hasAggregation = sequenceDesign.primitive_sequence.some((p) => p.primitive === "aggregation");
  const hasReasoning = sequenceDesign.primitive_sequence.some((p) => p.primitive === "reasoning");

  // Efficiency advocate: prefers simpler sequences
  const efficiencyVote = sequenceDesign.primitive_sequence.length <= 3;

  // Quality guardian: prefers comprehensive coverage
  const qualityVote = hasQuerying && (hasFiltering || hasAggregation);

  // Complexity manager: prefers balanced complexity
  const complexityVote = sequenceDesign.estimated_complexity >= 0.3 && sequenceDesign.estimated_complexity <= 0.8;

  // User representative: checks if success criteria can be met
  const userVote = hasQuerying && (needAnalysis.information_types.includes("analytical") ? hasReasoning : true);

  const consensusScore = [efficiencyVote, qualityVote, complexityVote, userVote].filter(Boolean).length / 4;

  const consensusVotes: ConsensusVotes = {
    efficiency_vote: efficiencyVote,
    quality_vote: qualityVote,
    complexity_vote: complexityVote,
    user_vote: userVote,
    consensus_score: consensusScore,
  };

  // Calculate quality metrics
  const completenessScore = [hasQuerying, hasFiltering || hasAggregation, hasReasoning].filter(Boolean).length / 3;

  // Determine feasibility
  let feasibilityAssessment: "low" | "medium" | "high";
  if (sequenceDesign.estimated_complexity < 0.4) feasibilityAssessment = "high";
  else if (sequenceDesign.estimated_complexity < 0.7) feasibilityAssessment = "medium";
  else feasibilityAssessment = "low";

  // Generate refinement suggestions
  const refinementSuggestions: string[] = [];
  if (!efficiencyVote) {
    refinementSuggestions.push("Consider simplifying the sequence by combining steps");
  }
  if (!qualityVote) {
    refinementSuggestions.push("Add filtering or aggregation step to improve data quality");
  }
  if (!hasReasoning && needAnalysis.information_types.includes("analytical")) {
    refinementSuggestions.push("Add reasoning primitive for analytical insights");
  }
  if (sequenceDesign.estimated_complexity > 0.8) {
    refinementSuggestions.push("Consider breaking into multiple smaller orchestrations");
  }

  return {
    completeness_score: completenessScore,
    feasibility_assessment: feasibilityAssessment,
    quality_prediction: consensusScore * 0.7 + completenessScore * 0.3,
    execution_confidence: Math.min(0.95, consensusScore * 0.8 + feasibilityAssessment === "high" ? 0.2 : 0),
    refinement_suggestions: refinementSuggestions,
    consensus_votes: consensusVotes,
  };
}

/**
 * Generate tool execution guide
 */
function generateToolExecutionGuide(sequenceDesign: SequenceDesignPhase): string[] {
  const guide: string[] = [];

  for (let i = 0; i < sequenceDesign.primitive_sequence.length; i++) {
    const step = sequenceDesign.primitive_sequence[i];
    guide.push(`Step ${i + 1}: ${step.primitive.toUpperCase()}`);
    guide.push(`  Purpose: ${step.purpose}`);

    if (step.strategy.sources) {
      guide.push(`  Primary tools: ${step.strategy.sources.primary.join(", ")}`);
      if (step.strategy.sources.secondary && step.strategy.sources.secondary.length > 0) {
        guide.push(`  Secondary tools: ${step.strategy.sources.secondary.join(", ")}`);
      }
    }

    if (step.strategy.filter_rules) {
      guide.push(`  Filtering rules: ${step.strategy.filter_rules.map((r) => r.rule_type).join(", ")}`);
    }

    if (step.strategy.reasoning_strategy) {
      guide.push(`  Reasoning framework: ${step.strategy.reasoning_strategy.framework}`);
    }

    guide.push(`  Expected output: ${step.expected_output}`);
    guide.push("");
  }

  return guide;
}

/**
 * Register orchestration reasoning tool
 */
export function registerOrchestrationReasoningTool(server: McpServer) {
  server.tool(
    "orchestration_reasoning",
    `Design a custom research orchestration through game-theoretic reasoning.

This tool implements a 5-phase reasoning process:
1. Need Analysis - Decompose requirements into components and information types
2. Context Assessment - Evaluate constraints, risks, and optimal approach
3. Pattern Analysis - Find similar orchestrations and extract reusable patterns
4. Sequence Design - Create optimal primitive chain (Query → Filter → Aggregate → Reason)
5. Validation - Multi-agent consensus voting and quality prediction

Use this when:
- No existing orchestration matches your research need
- You need a custom workflow for a specific use case
- You want to understand the optimal approach for complex research

The output includes:
- Complete reasoning chain with all 5 phases
- Executable primitive sequence with tool recommendations
- Quality metrics and confidence scores
- Step-by-step execution guide`,
    {
      information_need: z.string().describe("Description of the information requirement to fulfill"),
      context: z
        .object({
          domain: z.string().describe("Domain or subject area (e.g., 'business-intelligence', 'academic-research')"),
          complexity: z.enum(["low", "medium", "high"]).describe("Expected complexity level"),
          time_constraint: z.string().optional().describe("Time constraints for execution"),
          quality_requirements: z.string().optional().describe("Quality and accuracy requirements"),
          available_tools: z.array(z.string()).optional().describe("Available MCP tools for execution"),
        })
        .describe("Context and constraints for orchestration design"),
      reasoning_depth: z
        .enum(["surface", "moderate", "deep"])
        .default("moderate")
        .describe("Depth of reasoning analysis"),
      reference_patterns: z.boolean().default(true).describe("Whether to analyze existing orchestration patterns"),
      agentic_level: z
        .enum(["prescriptive", "guided", "autonomous"])
        .default("guided")
        .describe("Agentic level for primitive execution"),
    },
    async ({ information_need, context, reasoning_depth, reference_patterns, agentic_level }) => {
      // Phase 1: Need Analysis
      const needAnalysis = analyzeNeed(information_need);

      // Phase 2: Context Assessment
      const contextAssessment = assessContext(context, needAnalysis);

      // Phase 3: Pattern Analysis
      const patternAnalysis = reference_patterns
        ? analyzePatterns(needAnalysis, contextAssessment)
        : {
            relevant_orchestrations: [],
            extracted_patterns: [],
            adaptations: [],
            pattern_scores: [],
          };

      // Phase 4: Sequence Design
      const sequenceDesign = designSequence(needAnalysis, patternAnalysis, agentic_level);

      // Phase 5: Validation
      const validation = validateDesign(sequenceDesign, needAnalysis);

      // Generate execution guide
      const executionGuide = generateToolExecutionGuide(sequenceDesign);

      // Compile final plan
      const plan: OrchestrationPlan = {
        plan_id: `orch_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        information_need,
        reasoning_chain: {
          phase_1_need_analysis: needAnalysis,
          phase_2_context_assessment: contextAssessment,
          phase_3_pattern_analysis: patternAnalysis,
          phase_4_sequence_design: sequenceDesign,
          phase_5_validation: validation,
        },
        execution_metadata: {
          estimated_duration: `${Math.ceil(sequenceDesign.estimated_complexity * 10)} minutes`,
          resource_requirements: {
            api_calls: sequenceDesign.primitive_sequence.reduce((sum, p) => {
              const sources = p.strategy.sources;
              return sum + (sources ? sources.primary.length + (sources.secondary?.length || 0) : 1);
            }, 0),
            processing_complexity: context.complexity,
          },
          quality_indicators: {
            confidence_threshold: 0.7,
            validation_checkpoints: validation.completeness_score > 0.5 ? sequenceDesign.quality_checkpoints : 1,
            error_recovery_points: sequenceDesign.primitive_sequence.length,
          },
        },
        orchestration_specification: {
          name: `Custom orchestration for: ${information_need.slice(0, 50)}...`,
          version: "1.0.0",
          category: contextAssessment.domain_patterns[0] || "general",
          complexity: context.complexity,
          agentic_level,
          primitive_chain: sequenceDesign.primitive_sequence.map((p) => p.primitive),
          success_metrics: [needAnalysis.success_criteria],
        },
        game_state_metrics: {
          rounds_played: 5,
          budget_used: sequenceDesign.estimated_complexity,
          spiral_detections: 0,
          commitment_level: validation.execution_confidence,
          player_satisfaction: {
            efficiency_advocate: validation.consensus_votes.efficiency_vote ? 0.9 : 0.4,
            quality_guardian: validation.consensus_votes.quality_vote ? 0.9 : 0.4,
            complexity_manager: validation.consensus_votes.complexity_vote ? 0.9 : 0.4,
            user_representative: validation.consensus_votes.user_vote ? 0.9 : 0.4,
          },
        },
      };

      // Format response
      const response = {
        plan_id: plan.plan_id,
        summary: {
          information_need,
          recommended_approach: contextAssessment.minimax_regret_analysis.best_option,
          primitive_count: sequenceDesign.primitive_sequence.length,
          estimated_duration: plan.execution_metadata.estimated_duration,
          confidence: Math.round(validation.execution_confidence * 100) + "%",
          quality_prediction: Math.round(validation.quality_prediction * 100) + "%",
        },
        reasoning_chain: plan.reasoning_chain,
        primitive_sequence: sequenceDesign.primitive_sequence,
        execution_guide: executionGuide,
        quality_assessment: {
          completeness_score: validation.completeness_score,
          feasibility: validation.feasibility_assessment,
          consensus_votes: validation.consensus_votes,
          refinement_suggestions: validation.refinement_suggestions,
        },
        similar_orchestrations:
          patternAnalysis.relevant_orchestrations.length > 0
            ? {
                top_matches: patternAnalysis.relevant_orchestrations.slice(0, 3),
                adaptations_from_patterns: patternAnalysis.adaptations,
              }
            : undefined,
        next_steps: [
          "Review the primitive sequence and tool recommendations",
          "Execute each step using the corresponding MCP tools",
          "Apply filtering and aggregation as needed between steps",
          "Use the reasoning framework for final analysis",
        ],
      };

      return {
        content: [{ type: "text" as const, text: JSON.stringify(response, null, 2) }],
      };
    }
  );
}
