import { z } from 'zod';

// Core orchestration reasoning types based on the framework specification

export interface OrchestrationReasoningState {
  reasoning_round: number;
  complexity_budget: number;
  time_constraint: string;
  quality_threshold: number;
  spiral_detections: SpiralDetection[];
  commitment_level: number;
  reasoning_players: ReasoningPlayers;
  session_id: string;
  created_at: string;
}

export interface ReasoningPlayers {
  efficiency_advocate: {
    urgency: number;
    weight: number;
  };
  quality_guardian: {
    standards: number;
    weight: number;
  };
  complexity_manager: {
    simplicity_bias: number;
    weight: number;
  };
  user_representative: {
    satisfaction: number;
    weight: number;
  };
}

export interface SpiralDetection {
  type: 'oscillation' | 'scope_creep' | 'diminishing_returns';
  detected_at: number;
  description: string;
  severity: number;
}

// Input/Output types for the MCP tool
export const OrchestrationReasoningInputSchema = z.object({
  information_need: z.string().describe('Description of the information requirement to fulfill'),
  context: z.object({
    domain: z.string().describe('Domain or subject area (e.g., "business-intelligence", "academic-research")'),
    complexity: z.enum(['low', 'medium', 'high']).describe('Expected complexity level'),
    time_constraint: z.string().optional().describe('Time constraints for execution'),
    quality_requirements: z.string().optional().describe('Quality and accuracy requirements'),
    available_tools: z.array(z.string()).optional().describe('Available MCP tools for execution')
  }).describe('Context and constraints for orchestration design'),
  reasoning_depth: z.enum(['surface', 'moderate', 'deep']).default('moderate').describe('Depth of reasoning analysis'),
  reference_patterns: z.boolean().default(true).describe('Whether to analyze existing orchestration patterns'),
  agentic_level: z.enum(['prescriptive', 'guided', 'autonomous']).default('guided').describe('Agentic level for primitive execution')
});

export type OrchestrationReasoningInput = z.infer<typeof OrchestrationReasoningInputSchema>;

// Reasoning chain types for each phase
export interface ReasoningChain {
  phase_1_need_analysis: NeedAnalysisPhase;
  phase_2_context_assessment: ContextAssessmentPhase;
  phase_3_pattern_analysis: PatternAnalysisPhase;
  phase_4_sequence_design: SequenceDesignPhase;
  phase_5_validation: ValidationPhase;
}

export interface NeedAnalysisPhase {
  components: string[];
  information_types: ('factual' | 'analytical' | 'comparative' | 'predictive')[];
  scope: string;
  success_criteria: string;
  complexity_estimate: number;
}

export interface ContextAssessmentPhase {
  domain_patterns: string[];
  constraints: {
    time?: string;
    quality?: string;
    tools?: number;
    budget?: number;
  };
  risks: string[];
  minimax_regret_analysis: MinimaxRegretAnalysis;
}

export interface MinimaxRegretAnalysis {
  scenarios: Record<string, Record<string, number>>;
  best_option: string;
  max_regret: number;
}

export interface PatternAnalysisPhase {
  relevant_orchestrations: string[];
  extracted_patterns: string[];
  adaptations: string[];
  pattern_scores: PatternScore[];
}

export interface PatternScore {
  pattern_name: string;
  similarity: number;
  success_rate: number;
  simplicity: number;
  adaptability: number;
  total_score: number;
}

export interface SequenceDesignPhase {
  primitive_sequence: PrimitiveStep[];
  integration_strategy: string;
  quality_checkpoints: number;
  estimated_complexity: number;
}

export interface PrimitiveStep {
  primitive: 'querying' | 'filtering' | 'aggregation' | 'reasoning';
  purpose: string;
  strategy: PrimitiveStrategy;
  expected_output: string;
  complexity_cost: number;
}

export interface PrimitiveStrategy {
  target?: string;
  sources?: {
    primary: string[];
    secondary?: string[];
  };
  filters?: Record<string, any>;
  operations?: any[];
  reasoning_strategy?: ReasoningStrategy;
  filter_rules?: FilterRule[];
}

export interface ReasoningStrategy {
  framework: string;
  clear_thought_pattern: {
    observation: string;
    hypothesis: string;
    prediction: string;
    verification: string;
  };
  reasoning_objectives: string[];
}

export interface FilterRule {
  rule_type: string;
  field?: string;
  operator?: string;
  value?: any;
  criteria?: string[];
  logic?: 'all' | 'any';
}

export interface ValidationPhase {
  completeness_score: number;
  feasibility_assessment: 'low' | 'medium' | 'high';
  quality_prediction: number;
  execution_confidence: number;
  refinement_suggestions: string[];
  consensus_votes: ConsensusVotes;
}

export interface ConsensusVotes {
  efficiency_vote: boolean;
  quality_vote: boolean;
  complexity_vote: boolean;
  user_vote: boolean;
  consensus_score: number;
}

// Output type for the orchestration plan
export interface OrchestrationPlan {
  plan_id: string;
  information_need: string;
  reasoning_chain: ReasoningChain;
  execution_metadata: ExecutionMetadata;
  orchestration_specification: OrchestrationSpecification;
  game_state_metrics: GameStateMetrics;
  tool_execution_guide?: ToolExecutionGuide;
}

// Tool execution guide types
export interface ToolExecutionGuide {
  tool_selection_reference: string;
  quick_reference: {
    description: string;
    general_search: string;
    academic_search: string;
    company_data: string;
    competitors: string;
    professional_profiles: string;
    factual_info: string;
    code_examples: string;
    community_sentiment: string;
    video_content: string;
    trending_topics: string;
    url_extraction: string;
  };
  execution_reminder: string;
}

export interface ExecutionMetadata {
  estimated_duration: string;
  resource_requirements: {
    api_calls: number;
    processing_complexity: 'low' | 'medium' | 'high';
  };
  quality_indicators: {
    confidence_threshold: number;
    validation_checkpoints: number;
    error_recovery_points: number;
  };
}

export interface OrchestrationSpecification {
  name: string;
  version: string;
  category: string;
  complexity: 'low' | 'medium' | 'high';
  agentic_level: 'prescriptive' | 'guided' | 'autonomous';
  primitive_chain: string[];
  success_metrics: string[];
}

export interface GameStateMetrics {
  rounds_played: number;
  budget_used: number;
  spiral_detections: number;
  commitment_level: number;
  player_satisfaction: Record<string, number>;
}

// Anti-spiral mechanism types
export interface CommitmentDevice {
  level: number;
  description: string;
  constraints: string[];
  enforced: boolean;
}

export interface AuctionBid {
  component: string;
  urgency: number;
  impact: number;
  complexity: number;
  confidence: number;
  bid_score: number;
}

// Pattern reference system types
export interface OrchestrationPattern {
  name: string;
  category: string;
  complexity: 'low' | 'medium' | 'high';
  success_rate: number;
  primitive_sequence: string[];
  adaptability_score: number;
  metadata: Record<string, any>;
}

export interface PatternSimilarity {
  pattern: OrchestrationPattern;
  semantic_similarity: number;
  structural_similarity: number;
  context_similarity: number;
  success_correlation: number;
  overall_similarity: number;
}

// Error handling types
export interface OrchestrationError {
  type: 'critical' | 'recoverable' | 'warning';
  code: string;
  message: string;
  phase: string;
  recovery_suggestions: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors: OrchestrationError[];
  warnings: OrchestrationError[];
  confidence: number;
}

// Sequential Thinking Enhancement Types
export interface ThoughtStep {
  thoughtNumber: number;
  totalThoughts: number;
  thought: string;
  thoughtType: 'analysis' | 'planning' | 'evaluation' | 'synthesis' | 'revision';
  internalMonologue: string;
  keyInsights: string[];
  decisionPoints: DecisionPoint[];
  confidence: number;
  nextThoughtNeeded: boolean;
  isRevision?: boolean;
  revisesThought?: number;
  branchFromThought?: number;
  branchId?: string;
  dependencies?: string[];
  timestamp: string;
}

export interface DecisionPoint {
  question: string;
  options: string[];
  selected: string;
  rationale: string;
  impact: 'high' | 'medium' | 'low';
}

export interface SequentialReasoningChain extends ReasoningChain {
  thinking_chain: ThoughtStep[];
  reasoning_trajectory: ReasoningTrajectory;
  dependency_graph: DependencyGraph;
  execution_plan: ExecutionPlan;
}

export interface ReasoningTrajectory {
  initial_hypothesis: string;
  evolving_understanding: string[];
  critical_insights: CriticalInsight[];
  final_synthesis: string;
  confidence_progression: number[];
}

export interface CriticalInsight {
  insight: string;
  discovered_at_thought: number;
  impact_on_plan: string;
  led_to_revision: boolean;
}

export interface DependencyGraph {
  nodes: DependencyNode[];
  edges: DependencyEdge[];
  critical_path: string[];
  parallel_opportunities: ParallelExecutionGroup[];
}

export interface DependencyNode {
  id: string;
  primitive: 'querying' | 'filtering' | 'aggregation' | 'reasoning';
  purpose: string;
  inputs: DataRequirement[];
  outputs: DataProduct[];
  estimated_duration: number;
  can_fail: boolean;
  fallback_strategy?: string;
}

export interface DependencyEdge {
  from: string;
  to: string;
  dependency_type: 'data' | 'temporal' | 'resource' | 'quality';
  is_critical: boolean;
  can_be_relaxed: boolean;
}

export interface DataRequirement {
  name: string;
  type: string;
  source: string;
  is_optional: boolean;
  freshness_requirement?: string;
}

export interface DataProduct {
  name: string;
  type: string;
  schema: Record<string, any>;
  quality_metrics: string[];
}

export interface ParallelExecutionGroup {
  group_id: string;
  primitives: string[];
  max_parallelism: number;
  resource_constraints: ResourceConstraint[];
}

export interface ResourceConstraint {
  type: 'api_rate_limit' | 'memory' | 'cpu' | 'network';
  limit: number;
  unit: string;
  affects: string[];
}

export interface ExecutionPlan {
  plan_type: 'sequential' | 'parallel' | 'hybrid';
  stages: ExecutionStage[];
  critical_path_duration: number;
  total_duration_estimate: number;
  resource_utilization: ResourceUtilization;
  failure_recovery_plan: FailureRecoveryPlan;
}

export interface ExecutionStage {
  stage_number: number;
  stage_name: string;
  parallel_groups: ParallelExecutionGroup[];
  sequential_steps: string[];
  checkpoint: QualityCheckpoint;
  estimated_duration: number;
}

export interface QualityCheckpoint {
  checkpoint_id: string;
  validation_criteria: string[];
  minimum_quality_score: number;
  rollback_on_failure: boolean;
  remediation_actions: string[];
}

export interface ResourceUtilization {
  peak_api_calls_per_minute: number;
  peak_memory_mb: number;
  total_api_calls: number;
  estimated_cost: number;
}

export interface FailureRecoveryPlan {
  retry_strategies: RetryStrategy[];
  fallback_orchestrations: string[];
  partial_result_handling: 'continue' | 'abort' | 'degrade';
  notification_thresholds: NotificationThreshold[];
}

export interface RetryStrategy {
  applies_to: string[];
  max_retries: number;
  backoff_type: 'exponential' | 'linear' | 'fixed';
  backoff_base_ms: number;
  circuit_breaker_threshold: number;
}

export interface NotificationThreshold {
  metric: string;
  threshold: number;
  severity: 'info' | 'warning' | 'critical';
  message_template: string;
}

// Enhanced Primitive Strategy with Sequential Thinking
export interface EnhancedPrimitiveStrategy extends PrimitiveStrategy {
  execution_order?: number;
  depends_on?: string[];
  provides_for?: string[];
  parallel_compatible?: boolean;
  timing_constraints?: TimingConstraint[];
  quality_requirements?: QualityRequirement[];
}

export interface TimingConstraint {
  type: 'start_after' | 'complete_before' | 'duration_limit';
  reference?: string;
  value: number;
  unit: 'seconds' | 'minutes' | 'hours';
}

export interface QualityRequirement {
  metric: string;
  operator: '>=' | '>' | '=' | '<' | '<=';
  value: number;
  action_on_failure: 'retry' | 'fallback' | 'abort' | 'continue_degraded';
}

// Thinking Process Metadata
export interface ThinkingProcessMetadata {
  total_thoughts: number;
  revision_count: number;
  branch_count: number;
  decision_points_evaluated: number;
  confidence_trajectory: number[];
  thinking_duration_ms: number;
  complexity_discovered: number;
  insights_generated: string[];
}