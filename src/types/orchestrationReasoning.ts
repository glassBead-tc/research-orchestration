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