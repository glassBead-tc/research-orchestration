import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  OrchestrationReasoningInputSchema,
  OrchestrationReasoningInput,
  OrchestrationPlan,
  ReasoningChain,
  NeedAnalysisPhase,
  ContextAssessmentPhase,
  PatternAnalysisPhase,
  SequenceDesignPhase,
  ValidationPhase,
  ExecutionMetadata,
  OrchestrationSpecification,
  GameStateMetrics,
  OrchestrationError,
  ValidationResult,
  SequentialReasoningChain,
  ThoughtStep,
  DependencyGraph,
  ExecutionPlan,
  ToolExecutionGuide
} from '../../types/orchestrationReasoning.js';
import { OrchestrationGameState } from '../../utils/orchestrationGameState.js';
import { PatternAnalyzer } from '../../utils/patternAnalyzer.js';
import { PrimitiveSequencer } from '../../utils/primitiveSequencer.js';

/**
 * Main orchestration reasoning MCP tool
 * Implements the 5-phase reasoning process with game-theoretic anti-spiral mechanisms
 */
export function registerOrchestrationReasoning(
  server: McpServer,
  options: {
    orchestrationPath?: string;
    primitivePath?: string;
    enablePatternAnalysis?: boolean;
    defaultAgenticLevel?: 'prescriptive' | 'guided' | 'autonomous';
  } = {}
) {
  server.tool(
    'orchestration_reasoning',
    'Design custom retrieval orchestrations by combining primitives with structured reasoning',
    {
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
    },
    async (args: OrchestrationReasoningInput) => {
      try {
        // Initialize orchestration reasoning engine
        const reasoningEngine = new OrchestrationReasoningEngine(options);
        
        // Execute the 5-phase reasoning process
        const orchestrationPlan = await reasoningEngine.executeReasoningProcess(args);
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(orchestrationPlan, null, 2)
          }]
        };
      } catch (error) {
        console.error('Orchestration reasoning failed:', error);
        
        // Return error response
        const errorResponse = {
          error: {
            type: 'critical',
            code: 'REASONING_FAILURE',
            message: error instanceof Error ? error.message : 'Unknown error occurred',
            phase: 'initialization',
            recovery_suggestions: [
              'Check input parameters for validity',
              'Verify orchestration pattern availability',
              'Ensure sufficient system resources'
            ]
          }
        };
        
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(errorResponse, null, 2)
          }]
        };
      }
    }
  );
}

/**
 * Core orchestration reasoning engine
 * Implements the game-theoretic framework with anti-spiral mechanisms
 */
class OrchestrationReasoningEngine {
  private gameState!: OrchestrationGameState;
  private patternAnalyzer!: PatternAnalyzer;
  private primitiveSequencer!: PrimitiveSequencer;
  private options: any;

  constructor(options: any = {}) {
    this.options = {
      orchestrationPath: './src/resources/orchestrations',
      enablePatternAnalysis: true,
      defaultAgenticLevel: 'guided',
      ...options
    };
  }

  /**
   * Execute the complete 5-phase reasoning process
   */
  public async executeReasoningProcess(input: OrchestrationReasoningInput): Promise<OrchestrationPlan & {
    sequential_reasoning?: {
      thinking_steps: ThoughtStep[];
      dependency_analysis: DependencyGraph;
      execution_plan: ExecutionPlan;
    };
  }> {
    // Phase 0: Initialize game state and components
    await this.initializeComponents(input);
    
    const reasoningChain: ReasoningChain = {
      phase_1_need_analysis: {} as NeedAnalysisPhase,
      phase_2_context_assessment: {} as ContextAssessmentPhase,
      phase_3_pattern_analysis: {} as PatternAnalysisPhase,
      phase_4_sequence_design: {} as SequenceDesignPhase,
      phase_5_validation: {} as ValidationPhase
    };
    
    // Store enhanced sequence design data
    let enhancedSequenceData: {
      thinking_steps?: ThoughtStep[];
      dependency_graph?: DependencyGraph;
      execution_plan?: ExecutionPlan;
    } = {};

    // Execute reasoning phases with anti-spiral detection
    let shouldContinue = true;
    let currentPhase = 1;

    while (shouldContinue && currentPhase <= 5 && !this.gameState.shouldForceShip()) {
      console.log(`🎲 Executing Phase ${currentPhase} | Round ${this.gameState.getState().reasoning_round}`);
      
      // Detect spirals before each phase
      const spiralDetections = this.gameState.detectSpirals();
      if (spiralDetections.length > 0) {
        console.log(`🌀 Spiral detections: ${spiralDetections.map(s => s.type).join(', ')}`);
      }

      // Execute current phase
      switch (currentPhase) {
        case 1:
          reasoningChain.phase_1_need_analysis = await this.executePhase1NeedAnalysis(input);
          break;
        case 2:
          reasoningChain.phase_2_context_assessment = await this.executePhase2ContextAssessment(input, reasoningChain.phase_1_need_analysis);
          break;
        case 3:
          reasoningChain.phase_3_pattern_analysis = await this.executePhase3PatternAnalysis(input, reasoningChain.phase_1_need_analysis);
          break;
        case 4:
          const enhancedDesign = await this.executePhase4SequenceDesign(input, reasoningChain);
          reasoningChain.phase_4_sequence_design = enhancedDesign;
          // Store enhanced data separately
          enhancedSequenceData = {
            thinking_steps: enhancedDesign.thinking_steps,
            dependency_graph: enhancedDesign.dependency_graph,
            execution_plan: enhancedDesign.execution_plan
          };
          break;
        case 5:
          reasoningChain.phase_5_validation = await this.executePhase5Validation(input, reasoningChain);
          break;
      }

      // Update game state
      this.gameState.incrementRound();
      this.gameState.addImprovement({
        phase: currentPhase,
        value: this.calculatePhaseValue(currentPhase),
        primitive_count: this.getCurrentPrimitiveCount(reasoningChain)
      });

      // Check if we should continue to next phase
      currentPhase++;
      
      // Force ship if commitment level is too high
      if (this.gameState.shouldForceShip()) {
        console.log('🚢 FORCED SHIP: Commitment level reached maximum');
        break;
      }
    }

    // Generate final orchestration plan with enhanced data
    const basePlan = this.generateOrchestrationPlan(input, reasoningChain);
    
    // Add sequential reasoning data if available
    if (enhancedSequenceData.thinking_steps && 
        enhancedSequenceData.dependency_graph && 
        enhancedSequenceData.execution_plan) {
      return {
        ...basePlan,
        sequential_reasoning: {
          thinking_steps: enhancedSequenceData.thinking_steps,
          dependency_analysis: enhancedSequenceData.dependency_graph,
          execution_plan: enhancedSequenceData.execution_plan
        }
      };
    }
    
    return basePlan;
  }

  private async initializeComponents(input: OrchestrationReasoningInput): Promise<void> {
    // Initialize game state
    this.gameState = new OrchestrationGameState(input);
    
    // Initialize pattern analyzer
    this.patternAnalyzer = new PatternAnalyzer(this.options.orchestrationPath);
    if (this.options.enablePatternAnalysis) {
      await this.patternAnalyzer.initialize();
    }
    
    // Initialize primitive sequencer
    this.primitiveSequencer = new PrimitiveSequencer(
      this.gameState,
      input.context.available_tools || []
    );
  }

  /**
   * Phase 1: Information Need Analysis
   */
  private async executePhase1NeedAnalysis(input: OrchestrationReasoningInput): Promise<NeedAnalysisPhase> {
    console.log('📋 Phase 1: Information Need Analysis');
    
    // Decompose information need into components
    const components = this.decomposeInformationNeed(input.information_need);
    
    // Classify information types
    const informationTypes = this.classifyInformationTypes(input.information_need);
    
    // Define scope
    const scope = this.defineScope(input);
    
    // Define success criteria
    const successCriteria = this.defineSuccessCriteria(input);
    
    // Estimate complexity
    const complexityEstimate = this.estimateComplexity(components, input.context.complexity);

    return {
      components,
      information_types: informationTypes,
      scope,
      success_criteria: successCriteria,
      complexity_estimate: complexityEstimate
    };
  }

  /**
   * Phase 2: Context Assessment
   */
  private async executePhase2ContextAssessment(
    input: OrchestrationReasoningInput,
    needAnalysis: NeedAnalysisPhase
  ): Promise<ContextAssessmentPhase> {
    console.log('🔍 Phase 2: Context Assessment');
    
    // Analyze domain patterns
    const domainPatterns = this.analyzeDomainPatterns(input.context.domain);
    
    // Map constraints
    const constraints = this.mapConstraints(input.context);
    
    // Assess risks
    const risks = this.assessRisks(input, needAnalysis);
    
    // Perform minimax regret analysis
    const minimaxRegretAnalysis = this.performMinimaxRegretAnalysis(input, needAnalysis);

    return {
      domain_patterns: domainPatterns,
      constraints,
      risks,
      minimax_regret_analysis: minimaxRegretAnalysis
    };
  }

  /**
   * Phase 3: Pattern Reference Analysis
   */
  private async executePhase3PatternAnalysis(
    input: OrchestrationReasoningInput,
    needAnalysis: NeedAnalysisPhase
  ): Promise<PatternAnalysisPhase> {
    console.log('🔗 Phase 3: Pattern Reference Analysis');
    
    if (!this.options.enablePatternAnalysis) {
      return {
        relevant_orchestrations: [],
        extracted_patterns: [],
        adaptations: [],
        pattern_scores: []
      };
    }

    // Find similar patterns
    const similarPatterns = this.patternAnalyzer.findSimilarPatterns(input);
    
    // Extract relevant orchestrations
    const relevantOrchestrations = similarPatterns.slice(0, 5).map(p => p.pattern.name);
    
    // Extract patterns
    const extractedPatterns = this.extractPatterns(similarPatterns);
    
    // Plan adaptations
    const adaptations = this.planAdaptations(similarPatterns, input);
    
    // Score patterns
    const patternScores = this.patternAnalyzer.scorePatterns(similarPatterns.slice(0, 5));

    return {
      relevant_orchestrations: relevantOrchestrations,
      extracted_patterns: extractedPatterns,
      adaptations,
      pattern_scores: patternScores
    };
  }

  /**
   * Phase 4: Enhanced Primitive Sequence Design with Sequential Thinking
   */
  private async executePhase4SequenceDesign(
    input: OrchestrationReasoningInput,
    reasoningChain: Partial<ReasoningChain>
  ): Promise<SequenceDesignPhase & {
    thinking_steps?: ThoughtStep[];
    dependency_graph?: DependencyGraph;
    execution_plan?: ExecutionPlan;
  }> {
    console.log('🔧 Phase 4: Primitive Sequence Design with Sequential Thinking');
    
    const needAnalysis = reasoningChain.phase_1_need_analysis!;
    const patternAnalysis = reasoningChain.phase_3_pattern_analysis!;
    
    // Get similar patterns for sequence design
    const relevantPatterns = this.patternAnalyzer.findSimilarPatterns(input).slice(0, 3);
    
    // Design sequence using enhanced game-theoretic evaluation with sequential thinking
    const enhancedSequenceDesign = this.primitiveSequencer.designSequence(
      input,
      needAnalysis.components,
      relevantPatterns
    );

    // Log thinking process if available
    if (enhancedSequenceDesign.thinking_steps) {
      console.log(`💭 Sequential thinking process: ${enhancedSequenceDesign.thinking_steps.length} thoughts`);
      
      // Log key insights from thinking process
      const keyInsights = enhancedSequenceDesign.thinking_steps
        .flatMap(t => t.keyInsights)
        .filter(i => i.length > 0);
      
      if (keyInsights.length > 0) {
        console.log('💡 Key insights:', keyInsights.slice(0, 3).join('; '));
      }
    }

    // Log dependency analysis if available
    if (enhancedSequenceDesign.dependency_graph) {
      const graph = enhancedSequenceDesign.dependency_graph;
      console.log(`🔗 Dependency graph: ${graph.nodes.length} nodes, ${graph.edges.length} edges`);
      console.log(`🎯 Critical path: ${graph.critical_path.join(' → ')}`);
      
      if (graph.parallel_opportunities.length > 0) {
        console.log(`⚡ Parallel opportunities: ${graph.parallel_opportunities.length} groups`);
      }
    }

    // Log execution plan if available
    if (enhancedSequenceDesign.execution_plan) {
      const plan = enhancedSequenceDesign.execution_plan;
      console.log(`📋 Execution plan: ${plan.plan_type} with ${plan.stages.length} stages`);
      console.log(`⏱️  Estimated duration: ${plan.total_duration_estimate}s (critical path: ${plan.critical_path_duration}s)`);
    }

    return enhancedSequenceDesign;
  }

  /**
   * Phase 5: Orchestration Validation
   */
  private async executePhase5Validation(
    input: OrchestrationReasoningInput,
    reasoningChain: ReasoningChain
  ): Promise<ValidationPhase> {
    console.log('✅ Phase 5: Orchestration Validation');
    
    // Calculate completeness score
    const completenessScore = this.calculateCompletenessScore(reasoningChain);
    
    // Assess feasibility
    const feasibilityAssessment = this.assessFeasibility(input, reasoningChain);
    
    // Predict quality
    const qualityPrediction = this.predictQuality(reasoningChain);
    
    // Calculate execution confidence
    const executionConfidence = this.calculateExecutionConfidence(reasoningChain);
    
    // Generate refinement suggestions
    const refinementSuggestions = this.generateRefinementSuggestions(reasoningChain);
    
    // Calculate multi-agent consensus
    const consensusVotes = this.gameState.calculateConsensus(
      this.estimateExecutionTime(reasoningChain.phase_4_sequence_design),
      qualityPrediction,
      reasoningChain.phase_4_sequence_design.primitive_sequence.length,
      completenessScore > 0.8
    );

    return {
      completeness_score: completenessScore,
      feasibility_assessment: feasibilityAssessment,
      quality_prediction: qualityPrediction,
      execution_confidence: executionConfidence,
      refinement_suggestions: refinementSuggestions,
      consensus_votes: consensusVotes
    };
  }

  /**
   * Generate final orchestration plan
   */
  private generateOrchestrationPlan(
    input: OrchestrationReasoningInput,
    reasoningChain: ReasoningChain
  ): OrchestrationPlan {
    const planId = `orch_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    
    // Generate execution metadata
    const executionMetadata: ExecutionMetadata = {
      estimated_duration: this.formatDuration(this.estimateExecutionTime(reasoningChain.phase_4_sequence_design)),
      resource_requirements: {
        api_calls: this.estimateApiCalls(reasoningChain.phase_4_sequence_design),
        processing_complexity: input.context.complexity
      },
      quality_indicators: {
        confidence_threshold: this.gameState.getState().quality_threshold,
        validation_checkpoints: reasoningChain.phase_4_sequence_design.quality_checkpoints,
        error_recovery_points: Math.ceil(reasoningChain.phase_4_sequence_design.primitive_sequence.length / 2)
      }
    };

    // Generate orchestration specification
    const orchestrationSpecification: OrchestrationSpecification = {
      name: this.generateOrchestrationName(input),
      version: '1.0.0',
      category: input.context.domain,
      complexity: input.context.complexity,
      agentic_level: input.agentic_level,
      primitive_chain: [reasoningChain.phase_4_sequence_design.primitive_sequence.map(p => p.primitive).join(' → ')],
      success_metrics: this.generateSuccessMetrics(reasoningChain.phase_1_need_analysis)
    };

    // Get game state metrics
    const gameStateMetrics: GameStateMetrics = this.gameState.getGameMetrics();

    // Add tool execution guide
    const toolExecutionGuide = this.generateToolExecutionGuide();

    return {
      plan_id: planId,
      information_need: input.information_need,
      reasoning_chain: reasoningChain,
      execution_metadata: executionMetadata,
      orchestration_specification: orchestrationSpecification,
      game_state_metrics: gameStateMetrics,
      tool_execution_guide: toolExecutionGuide
    };
  }

  // Helper methods for phase implementations
  private decomposeInformationNeed(need: string): string[] {
    // Simple decomposition based on keywords and structure
    const components = [];
    const lowerNeed = need.toLowerCase();
    
    if (lowerNeed.includes('analyze') || lowerNeed.includes('analysis')) {
      components.push('analytical_assessment');
    }
    if (lowerNeed.includes('compare') || lowerNeed.includes('competitive')) {
      components.push('comparative_analysis');
    }
    if (lowerNeed.includes('trend') || lowerNeed.includes('pattern')) {
      components.push('trend_identification');
    }
    if (lowerNeed.includes('data') || lowerNeed.includes('information')) {
      components.push('data_collection');
    }
    if (lowerNeed.includes('insight') || lowerNeed.includes('recommendation')) {
      components.push('insight_generation');
    }
    
    // Default components if none identified
    if (components.length === 0) {
      components.push('information_gathering', 'analysis', 'synthesis');
    }
    
    return components;
  }

  private classifyInformationTypes(need: string): ('factual' | 'analytical' | 'comparative' | 'predictive')[] {
    const types: ('factual' | 'analytical' | 'comparative' | 'predictive')[] = [];
    const lowerNeed = need.toLowerCase();
    
    if (lowerNeed.includes('fact') || lowerNeed.includes('data') || lowerNeed.includes('information')) {
      types.push('factual');
    }
    if (lowerNeed.includes('analyze') || lowerNeed.includes('assess') || lowerNeed.includes('evaluate')) {
      types.push('analytical');
    }
    if (lowerNeed.includes('compare') || lowerNeed.includes('versus') || lowerNeed.includes('competitive')) {
      types.push('comparative');
    }
    if (lowerNeed.includes('predict') || lowerNeed.includes('forecast') || lowerNeed.includes('future')) {
      types.push('predictive');
    }
    
    return types.length > 0 ? types : ['factual', 'analytical'];
  }

  private defineScope(input: OrchestrationReasoningInput): string {
    const complexity = input.context.complexity;
    const timeConstraint = input.context.time_constraint;
    
    if (complexity === 'high' && (!timeConstraint || timeConstraint.includes('hour'))) {
      return 'comprehensive_analysis';
    } else if (complexity === 'medium') {
      return 'focused_analysis';
    } else {
      return 'targeted_analysis';
    }
  }

  private defineSuccessCriteria(input: OrchestrationReasoningInput): string {
    const qualityReq = input.context.quality_requirements?.toLowerCase() || '';
    
    if (qualityReq.includes('investment')) return 'investment_grade_insights';
    if (qualityReq.includes('academic')) return 'academic_rigor_standards';
    if (qualityReq.includes('market')) return 'market_ready_intelligence';
    
    return 'actionable_insights';
  }

  private estimateComplexity(components: string[], contextComplexity: string): number {
    const baseComplexity = {
      low: 30,
      medium: 60,
      high: 100
    };
    
    const componentMultiplier = Math.max(1, components.length * 0.2);
    return Math.round(baseComplexity[contextComplexity as keyof typeof baseComplexity] * componentMultiplier);
  }

  private analyzeDomainPatterns(domain: string): string[] {
    const domainPatterns: Record<string, string[]> = {
      'business-intelligence': ['company-research', 'market-analysis', 'competitive-intelligence'],
      'academic-research': ['literature-review', 'citation-analysis', 'peer-review-synthesis'],
      'competitive-analysis': ['competitor-profiling', 'market-positioning', 'feature-comparison'],
      'technical-research': ['technology-assessment', 'framework-comparison', 'implementation-analysis']
    };
    
    return domainPatterns[domain] || ['general-research'];
  }

  private mapConstraints(context: any): any {
    return {
      time: context.time_constraint,
      quality: context.quality_requirements,
      tools: context.available_tools?.length || 0,
      complexity: context.complexity
    };
  }

  private assessRisks(input: OrchestrationReasoningInput, needAnalysis: NeedAnalysisPhase): string[] {
    const risks = [];
    
    if (input.context.complexity === 'high') {
      risks.push('high_complexity_execution_risk');
    }
    if (needAnalysis.components.length > 5) {
      risks.push('scope_creep_risk');
    }
    if (!input.context.available_tools || input.context.available_tools.length < 3) {
      risks.push('limited_tool_availability');
    }
    if (input.context.time_constraint && input.context.time_constraint.includes('hour')) {
      risks.push('tight_deadline_pressure');
    }
    
    return risks;
  }

  private performMinimaxRegretAnalysis(input: OrchestrationReasoningInput, needAnalysis: NeedAnalysisPhase): any {
    // Simplified minimax regret analysis
    const scenarios = {
      'tight_deadline': { 'simple': 0.2, 'moderate': 0.5, 'complex': 0.9 },
      'high_quality_need': { 'simple': 0.8, 'moderate': 0.3, 'complex': 0.1 },
      'limited_tools': { 'simple': 0.3, 'moderate': 0.6, 'complex': 0.9 }
    };
    
    return {
      scenarios,
      best_option: 'moderate',
      max_regret: 0.5
    };
  }

  private extractPatterns(similarPatterns: any[]): string[] {
    return similarPatterns.slice(0, 3).map(p => p.pattern.name);
  }

  private planAdaptations(similarPatterns: any[], input: OrchestrationReasoningInput): string[] {
    const adaptations = [];
    
    if (input.context.domain !== similarPatterns[0]?.pattern.category) {
      adaptations.push(`domain_adaptation_to_${input.context.domain}`);
    }
    if (input.context.complexity === 'high') {
      adaptations.push('complexity_enhancement');
    }
    
    return adaptations;
  }

  private calculateCompletenessScore(reasoningChain: ReasoningChain): number {
    let score = 0;
    
    // Check if all phases completed
    if (reasoningChain.phase_1_need_analysis) score += 0.2;
    if (reasoningChain.phase_2_context_assessment) score += 0.2;
    if (reasoningChain.phase_3_pattern_analysis) score += 0.2;
    if (reasoningChain.phase_4_sequence_design) score += 0.2;
    if (reasoningChain.phase_5_validation) score += 0.2;
    
    return score;
  }

  private assessFeasibility(input: OrchestrationReasoningInput, reasoningChain: ReasoningChain): 'low' | 'medium' | 'high' {
    const availableTools = input.context.available_tools?.length || 0;
    const requiredComplexity = reasoningChain.phase_4_sequence_design.estimated_complexity;
    const budgetRemaining = this.gameState.getState().complexity_budget;
    
    if (availableTools >= 3 && requiredComplexity <= budgetRemaining) return 'high';
    if (availableTools >= 2 && requiredComplexity <= budgetRemaining * 1.2) return 'medium';
    return 'low';
  }

  private predictQuality(reasoningChain: ReasoningChain): number {
    const sequenceLength = reasoningChain.phase_4_sequence_design.primitive_sequence.length;
    const hasReasoning = reasoningChain.phase_4_sequence_design.primitive_sequence.some(p => p.primitive === 'reasoning');
    
    let quality = 0.6; // Base quality
    quality += sequenceLength * 0.05; // More primitives = higher quality
    if (hasReasoning) quality += 0.2; // Reasoning primitive adds quality
    
    return Math.min(0.95, quality);
  }

  private calculateExecutionConfidence(reasoningChain: ReasoningChain): number {
    const completeness = this.calculateCompletenessScore(reasoningChain);
    const consensusScore = reasoningChain.phase_5_validation?.consensus_votes?.consensus_score || 0.5;
    
    return (completeness + consensusScore) / 2;
  }

  private generateRefinementSuggestions(reasoningChain: ReasoningChain): string[] {
    const suggestions = [];
    
    if (reasoningChain.phase_4_sequence_design.primitive_sequence.length < 3) {
      suggestions.push('consider_adding_more_primitives');
    }
    if (!reasoningChain.phase_4_sequence_design.primitive_sequence.some(p => p.primitive === 'reasoning')) {
      suggestions.push('add_reasoning_primitive');
    }
    if (reasoningChain.phase_4_sequence_design.quality_checkpoints < 2) {
      suggestions.push('increase_quality_checkpoints');
    }
    
    return suggestions;
  }

  private estimateExecutionTime(sequenceDesign: SequenceDesignPhase): number {
    return sequenceDesign.estimated_complexity * 1.5; // 1.5 minutes per complexity unit
  }

  private estimateApiCalls(sequenceDesign: SequenceDesignPhase): number {
    return sequenceDesign.primitive_sequence.length * 8; // Average 8 API calls per primitive
  }

  private formatDuration(minutes: number): string {
    if (minutes < 60) return `${Math.round(minutes)} minutes`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    return `${hours}h ${remainingMinutes}m`;
  }

  private generateOrchestrationName(input: OrchestrationReasoningInput): string {
    const domain = input.context.domain.replace('-', ' ');
    const complexity = input.context.complexity;
    return `${domain} ${complexity} orchestration`.replace(/\b\w/g, l => l.toUpperCase());
  }

  private generateSuccessMetrics(needAnalysis: NeedAnalysisPhase): string[] {
    return [
      'information_completeness',
      'quality_threshold_achievement',
      'execution_efficiency',
      'user_satisfaction'
    ];
  }

  private calculatePhaseValue(phase: number): number {
    // Each phase contributes value
    const phaseValues = [0, 0.2, 0.2, 0.2, 0.3, 0.1]; // Index 0 unused
    return phaseValues[phase] || 0.1;
  }

  private getCurrentPrimitiveCount(reasoningChain: Partial<ReasoningChain>): number {
    return reasoningChain.phase_4_sequence_design?.primitive_sequence?.length || 0;
  }

  /**
   * Generate tool execution guide reference for orchestration implementation
   */
  private generateToolExecutionGuide(): any {
    return {
      tool_selection_reference: "See src/resources/tool-selection-guide.md for comprehensive tool selection guidance",
      quick_reference: {
        description: "Quick tool mapping for common information needs",
        general_search: "web_search_exa",
        academic_search: "research_paper_search_exa", 
        company_data: "company_research_exa",
        competitors: "competitor_finder_exa",
        professional_profiles: "linkedin_search_exa",
        factual_info: "wikipedia_search_exa",
        code_examples: "github_search_exa",
        community_sentiment: "scrape_reddit_exa",
        video_content: "youtube_search_exa",
        trending_topics: "tiktok_search_exa",
        url_extraction: "crawling_exa"
      },
      execution_reminder: "Remember to leverage parallel execution when possible and verify result quality against orchestration requirements"
    };
  }
}