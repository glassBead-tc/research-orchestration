import { z } from "zod";
import {
  PrimitiveStep,
  PrimitiveStrategy,
  FilterRule,
  QualityCheckpoint,
} from "../types/orchestrationReasoning.js";

/**
 * Result of executing a primitive
 */
export interface PrimitiveResult {
  primitive: "querying" | "filtering" | "aggregation" | "reasoning";
  status: "success" | "partial" | "failed";
  data: unknown;
  quality: {
    relevance: number;
    completeness: number;
    confidence: number;
  };
  metrics: {
    duration_ms: number;
    api_calls: number;
    items_processed: number;
  };
  errors?: string[];
}

/**
 * Input for querying primitive execution
 */
export interface QueryingInput {
  query: string;
  sources: {
    primary: string[];
    secondary?: string[];
  };
  options?: {
    maxResults?: number;
    includeContent?: boolean;
    recencyBias?: boolean;
  };
}

/**
 * Input for filtering primitive execution
 */
export interface FilteringInput {
  data: unknown[];
  rules: FilterRule[];
  options?: {
    keepUnmatched?: boolean;
    maxOutput?: number;
  };
}

/**
 * Input for aggregation primitive execution
 */
export interface AggregationInput {
  datasets: unknown[][];
  operations: Array<{
    type: "merge" | "deduplicate" | "rank" | "group" | "summarize";
    params?: Record<string, unknown>;
  }>;
}

/**
 * Input for reasoning primitive execution
 */
export interface ReasoningInput {
  data: unknown;
  framework: string;
  objectives: string[];
  options?: {
    depth?: "surface" | "moderate" | "deep";
    includeEvidence?: boolean;
  };
}

/**
 * Tool execution function type
 * This would be provided by the MCP tool registry
 */
export type ToolExecutor = (
  toolName: string,
  params: Record<string, unknown>
) => Promise<{ success: boolean; data: unknown; error?: string }>;

/**
 * PrimitiveExecutor - Executes primitive operations in orchestrations
 *
 * This class provides the execution engine for the four core primitives:
 * - Querying: Search across multiple data sources
 * - Filtering: Apply quality control and relevance filtering
 * - Aggregation: Synthesize data from multiple sources
 * - Reasoning: Structured analysis and inference
 */
export class PrimitiveExecutor {
  private toolExecutor: ToolExecutor;
  private agenticLevel: "prescriptive" | "guided" | "autonomous";

  constructor(
    toolExecutor: ToolExecutor,
    agenticLevel: "prescriptive" | "guided" | "autonomous" = "guided"
  ) {
    this.toolExecutor = toolExecutor;
    this.agenticLevel = agenticLevel;
  }

  /**
   * Execute a primitive step
   */
  async execute(step: PrimitiveStep): Promise<PrimitiveResult> {
    const startTime = Date.now();

    try {
      switch (step.primitive) {
        case "querying":
          return await this.executeQuerying(step.strategy, startTime);
        case "filtering":
          return await this.executeFiltering(step.strategy, startTime);
        case "aggregation":
          return await this.executeAggregation(step.strategy, startTime);
        case "reasoning":
          return await this.executeReasoning(step.strategy, startTime);
        default:
          throw new Error(`Unknown primitive: ${step.primitive}`);
      }
    } catch (error) {
      return {
        primitive: step.primitive,
        status: "failed",
        data: null,
        quality: { relevance: 0, completeness: 0, confidence: 0 },
        metrics: {
          duration_ms: Date.now() - startTime,
          api_calls: 0,
          items_processed: 0,
        },
        errors: [error instanceof Error ? error.message : String(error)],
      };
    }
  }

  /**
   * Execute a sequence of primitives
   */
  async executeSequence(
    steps: PrimitiveStep[],
    checkpoints?: QualityCheckpoint[]
  ): Promise<{
    results: PrimitiveResult[];
    overall_status: "success" | "partial" | "failed";
    checkpoint_failures: string[];
  }> {
    const results: PrimitiveResult[] = [];
    const checkpointFailures: string[] = [];
    let previousData: unknown = null;

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];

      // Inject previous step's data if needed
      if (previousData && step.strategy.sources) {
        // For guided/autonomous, we can adapt based on previous results
        if (this.agenticLevel !== "prescriptive") {
          step.strategy = this.adaptStrategy(step.strategy, previousData);
        }
      }

      const result = await this.execute(step);
      results.push(result);

      // Check quality checkpoint if defined
      if (checkpoints && checkpoints[i]) {
        const checkpoint = checkpoints[i];
        const qualityScore =
          (result.quality.relevance + result.quality.completeness + result.quality.confidence) / 3;

        if (qualityScore < checkpoint.minimum_quality_score) {
          checkpointFailures.push(
            `Step ${i + 1} (${step.primitive}) failed quality check: ${qualityScore.toFixed(2)} < ${checkpoint.minimum_quality_score}`
          );

          if (checkpoint.rollback_on_failure) {
            // In autonomous mode, try remediation
            if (this.agenticLevel === "autonomous" && checkpoint.remediation_actions.length > 0) {
              // Could implement retry or alternative approach here
            }
          }
        }
      }

      // Store data for next step
      previousData = result.data;

      // Stop on failure unless in autonomous mode
      if (result.status === "failed" && this.agenticLevel === "prescriptive") {
        break;
      }
    }

    // Determine overall status
    const failedCount = results.filter((r) => r.status === "failed").length;
    const successCount = results.filter((r) => r.status === "success").length;

    let overallStatus: "success" | "partial" | "failed";
    if (failedCount === results.length) {
      overallStatus = "failed";
    } else if (successCount === results.length) {
      overallStatus = "success";
    } else {
      overallStatus = "partial";
    }

    return {
      results,
      overall_status: overallStatus,
      checkpoint_failures: checkpointFailures,
    };
  }

  /**
   * Execute querying primitive
   */
  private async executeQuerying(
    strategy: PrimitiveStrategy,
    startTime: number
  ): Promise<PrimitiveResult> {
    const sources = strategy.sources || { primary: ["web_search_exa"] };
    const allSources = [...sources.primary, ...(sources.secondary || [])];
    const results: unknown[] = [];
    const errors: string[] = [];
    let apiCalls = 0;

    // Execute searches based on agentic level
    if (this.agenticLevel === "prescriptive") {
      // Sequential execution of all sources
      for (const source of allSources) {
        apiCalls++;
        const result = await this.toolExecutor(source, {
          query: strategy.target || "",
          numResults: 10,
        });
        if (result.success) {
          results.push(result.data);
        } else if (result.error) {
          errors.push(`${source}: ${result.error}`);
        }
      }
    } else if (this.agenticLevel === "guided") {
      // Execute primary sources first, then secondary if needed
      for (const source of sources.primary) {
        apiCalls++;
        const result = await this.toolExecutor(source, {
          query: strategy.target || "",
          numResults: 10,
        });
        if (result.success) {
          results.push(result.data);
        } else if (result.error) {
          errors.push(`${source}: ${result.error}`);
        }
      }

      // Check if we need secondary sources
      if (results.length < 3 && sources.secondary) {
        for (const source of sources.secondary) {
          apiCalls++;
          const result = await this.toolExecutor(source, {
            query: strategy.target || "",
            numResults: 5,
          });
          if (result.success) {
            results.push(result.data);
          }
          // Stop if we have enough
          if (results.length >= 5) break;
        }
      }
    } else {
      // Autonomous: parallel execution with dynamic adaptation
      const promises = allSources.map(async (source) => {
        apiCalls++;
        return this.toolExecutor(source, {
          query: strategy.target || "",
          numResults: 10,
        });
      });

      const settled = await Promise.allSettled(promises);
      for (const result of settled) {
        if (result.status === "fulfilled" && result.value.success) {
          results.push(result.value.data);
        } else if (result.status === "rejected") {
          errors.push(result.reason);
        }
      }
    }

    // Calculate quality metrics
    const completeness = Math.min(1, results.length / Math.max(1, allSources.length));
    const relevance = results.length > 0 ? 0.7 : 0; // Placeholder - would need actual relevance scoring
    const confidence = completeness * 0.5 + (errors.length === 0 ? 0.5 : 0.25);

    return {
      primitive: "querying",
      status: results.length > 0 ? (errors.length > 0 ? "partial" : "success") : "failed",
      data: results,
      quality: { relevance, completeness, confidence },
      metrics: {
        duration_ms: Date.now() - startTime,
        api_calls: apiCalls,
        items_processed: results.length,
      },
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  /**
   * Execute filtering primitive
   */
  private async executeFiltering(
    strategy: PrimitiveStrategy,
    startTime: number
  ): Promise<PrimitiveResult> {
    const rules = strategy.filter_rules || [];
    const inputData = (strategy as any).inputData || [];
    const filtered: unknown[] = [];
    const errors: string[] = [];

    // Apply filter rules
    for (const item of inputData) {
      let passes = true;

      for (const rule of rules) {
        if (!this.applyFilterRule(item, rule)) {
          passes = false;
          break;
        }
      }

      if (passes) {
        filtered.push(item);
      }
    }

    const completeness = inputData.length > 0 ? filtered.length / inputData.length : 0;

    return {
      primitive: "filtering",
      status: filtered.length > 0 ? "success" : inputData.length === 0 ? "success" : "partial",
      data: filtered,
      quality: {
        relevance: 0.8, // Filtering increases relevance
        completeness,
        confidence: 0.9, // High confidence in filtering logic
      },
      metrics: {
        duration_ms: Date.now() - startTime,
        api_calls: 0,
        items_processed: inputData.length,
      },
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  /**
   * Execute aggregation primitive
   */
  private async executeAggregation(
    strategy: PrimitiveStrategy,
    startTime: number
  ): Promise<PrimitiveResult> {
    const operations = strategy.operations || [];
    const inputData = (strategy as any).inputData || [];
    let result = Array.isArray(inputData) ? [...inputData] : [inputData];

    for (const op of operations) {
      switch (op.type) {
        case "merge":
          // Flatten arrays
          result = result.flat();
          break;
        case "deduplicate":
          // Simple deduplication by JSON stringify
          const seen = new Set<string>();
          result = result.filter((item) => {
            const key = JSON.stringify(item);
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
          break;
        case "rank":
          // Sort by score if available
          result.sort((a: any, b: any) => (b.score || 0) - (a.score || 0));
          break;
        case "group":
          // Group by specified key
          const groupKey = (op as any).key || "category";
          const grouped: Record<string, unknown[]> = {};
          for (const item of result) {
            const key = (item as any)[groupKey] || "other";
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(item);
          }
          result = [grouped] as any;
          break;
        case "summarize":
          // Return count and sample
          result = [
            {
              count: result.length,
              sample: result.slice(0, 5),
            },
          ] as any;
          break;
      }
    }

    return {
      primitive: "aggregation",
      status: "success",
      data: result,
      quality: {
        relevance: 0.85,
        completeness: 1,
        confidence: 0.9,
      },
      metrics: {
        duration_ms: Date.now() - startTime,
        api_calls: 0,
        items_processed: Array.isArray(inputData) ? inputData.length : 1,
      },
    };
  }

  /**
   * Execute reasoning primitive
   */
  private async executeReasoning(
    strategy: PrimitiveStrategy,
    startTime: number
  ): Promise<PrimitiveResult> {
    const reasoningStrategy = strategy.reasoning_strategy;
    const inputData = (strategy as any).inputData;

    if (!reasoningStrategy) {
      return {
        primitive: "reasoning",
        status: "failed",
        data: null,
        quality: { relevance: 0, completeness: 0, confidence: 0 },
        metrics: {
          duration_ms: Date.now() - startTime,
          api_calls: 0,
          items_processed: 0,
        },
        errors: ["No reasoning strategy provided"],
      };
    }

    // Build reasoning output based on framework
    const reasoningOutput = {
      framework: reasoningStrategy.framework,
      analysis: {
        observation: reasoningStrategy.clear_thought_pattern.observation,
        hypothesis: reasoningStrategy.clear_thought_pattern.hypothesis,
        prediction: reasoningStrategy.clear_thought_pattern.prediction,
        verification: reasoningStrategy.clear_thought_pattern.verification,
      },
      objectives_addressed: reasoningStrategy.reasoning_objectives,
      input_summary:
        typeof inputData === "object"
          ? `Analyzed ${Array.isArray(inputData) ? inputData.length : 1} data points`
          : "Analyzed provided input",
      conclusions: [
        "Analysis complete based on provided framework",
        "Further refinement may be needed based on specific domain requirements",
      ],
      confidence_notes: [
        "Reasoning quality depends on input data quality",
        "Verification step should be validated against external sources",
      ],
    };

    return {
      primitive: "reasoning",
      status: "success",
      data: reasoningOutput,
      quality: {
        relevance: 0.8,
        completeness: 0.75,
        confidence: 0.7,
      },
      metrics: {
        duration_ms: Date.now() - startTime,
        api_calls: 0,
        items_processed: 1,
      },
    };
  }

  /**
   * Apply a single filter rule to an item
   */
  private applyFilterRule(item: unknown, rule: FilterRule): boolean {
    if (rule.rule_type === "relevance" || rule.rule_type === "quality") {
      // For relevance/quality rules, check if item has required properties
      if (rule.criteria) {
        for (const criterion of rule.criteria) {
          if (!(item as any)[criterion]) {
            if (rule.logic === "all") return false;
          } else {
            if (rule.logic === "any") return true;
          }
        }
        return rule.logic === "all";
      }
    }

    if (rule.field && rule.operator && rule.value !== undefined) {
      const itemValue = (item as any)[rule.field];
      switch (rule.operator) {
        case "equals":
          return itemValue === rule.value;
        case "contains":
          return String(itemValue).includes(String(rule.value));
        case "gt":
          return itemValue > rule.value;
        case "lt":
          return itemValue < rule.value;
        case "gte":
          return itemValue >= rule.value;
        case "lte":
          return itemValue <= rule.value;
        default:
          return true;
      }
    }

    return true;
  }

  /**
   * Adapt strategy based on previous step results
   */
  private adaptStrategy(strategy: PrimitiveStrategy, previousData: unknown): PrimitiveStrategy {
    // In guided/autonomous mode, we can modify the strategy based on what we learned
    const adapted = { ...strategy };

    // If previous data was sparse, expand sources
    if (Array.isArray(previousData) && previousData.length < 3) {
      if (adapted.sources?.secondary) {
        adapted.sources = {
          primary: [...(adapted.sources.primary || []), ...adapted.sources.secondary],
        };
      }
    }

    return adapted;
  }
}

/**
 * Create a mock tool executor for testing
 */
export function createMockToolExecutor(): ToolExecutor {
  return async (toolName: string, params: Record<string, unknown>) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Return mock data based on tool
    return {
      success: true,
      data: {
        tool: toolName,
        query: params.query,
        results: [
          { title: "Mock Result 1", url: "https://example.com/1", score: 0.9 },
          { title: "Mock Result 2", url: "https://example.com/2", score: 0.8 },
          { title: "Mock Result 3", url: "https://example.com/3", score: 0.7 },
        ],
      },
    };
  };
}
