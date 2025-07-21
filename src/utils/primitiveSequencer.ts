import {
  PrimitiveStep,
  PrimitiveStrategy,
  ReasoningStrategy,
  FilterRule,
  OrchestrationReasoningInput,
  PatternSimilarity,
  MinimaxRegretAnalysis,
  SequenceDesignPhase
} from '../types/orchestrationReasoning.js';
import { OrchestrationGameState } from './orchestrationGameState.js';

/**
 * Primitive sequencer with game-theoretic logic
 * Designs optimal primitive sequences using minimax regret analysis
 */
export class PrimitiveSequencer {
  private gameState: OrchestrationGameState;
  private availableTools: string[];

  constructor(gameState: OrchestrationGameState, availableTools: string[] = []) {
    this.gameState = gameState;
    this.availableTools = availableTools;
  }

  /**
   * Design primitive sequence using game-theoretic evaluation
   */
  public designSequence(
    input: OrchestrationReasoningInput,
    needComponents: string[],
    relevantPatterns: PatternSimilarity[]
  ): SequenceDesignPhase {
    // Run information need auction to prioritize components
    const auctionBids = this.gameState.runInformationAuction(needComponents);
    
    // Generate sequence options using different strategies
    const sequenceOptions = this.generateSequenceOptions(input, auctionBids, relevantPatterns);
    
    // Evaluate options using minimax regret analysis
    const regretAnalysis = this.performMinimaxRegretAnalysis(sequenceOptions, input);
    
    // Select best option based on game-theoretic evaluation
    const bestOption = this.selectBestOption(sequenceOptions, regretAnalysis);
    
    // Calculate integration strategy and quality checkpoints
    const integrationStrategy = this.designIntegrationStrategy(bestOption);
    const qualityCheckpoints = this.calculateQualityCheckpoints(bestOption);
    const estimatedComplexity = this.estimateComplexity(bestOption);

    return {
      primitive_sequence: bestOption,
      integration_strategy: integrationStrategy,
      quality_checkpoints: qualityCheckpoints,
      estimated_complexity: estimatedComplexity
    };
  }

  /**
   * Generate multiple sequence options for evaluation
   */
  private generateSequenceOptions(
    input: OrchestrationReasoningInput,
    auctionBids: any[],
    relevantPatterns: PatternSimilarity[]
  ): PrimitiveStep[][] {
    const options: PrimitiveStep[][] = [];

    // Option 1: Minimal (Quick Wins) - Based on commitment level constraints
    const minimalOption = this.generateMinimalSequence(input, auctionBids);
    options.push(minimalOption);

    // Option 2: Moderate (Balanced) - Standard approach
    const moderateOption = this.generateModerateSequence(input, auctionBids);
    options.push(moderateOption);

    // Option 3: Comprehensive (Full Optimization) - Only if budget allows
    if (!this.gameState.isCommitmentEnforced(3) && input.context.complexity === 'high') {
      const comprehensiveOption = this.generateComprehensiveSequence(input, auctionBids);
      options.push(comprehensiveOption);
    }

    // Option 4: Pattern-Adapted - Based on best matching pattern
    if (relevantPatterns.length > 0) {
      const patternOption = this.generatePatternAdaptedSequence(input, relevantPatterns[0]);
      options.push(patternOption);
    }

    return options;
  }

  private generateMinimalSequence(input: OrchestrationReasoningInput, auctionBids: any[]): PrimitiveStep[] {
    const sequence: PrimitiveStep[] = [];
    
    // Basic querying step
    sequence.push({
      primitive: 'querying',
      purpose: 'basic_information_gathering',
      strategy: {
        target: 'general_search',
        sources: {
          primary: this.selectPrimaryTools(2), // Limit to 2 tools for minimal
          secondary: []
        },
        filters: {
          content_type: 'basic',
          max_results: 10
        }
      },
      expected_output: 'raw_information_set',
      complexity_cost: 15
    });

    // Basic filtering step
    sequence.push({
      primitive: 'filtering',
      purpose: 'quality_baseline',
      strategy: {
        filter_rules: [
          {
            rule_type: 'relevance_threshold',
            field: 'confidence_score',
            operator: '>=',
            value: 0.6
          }
        ]
      },
      expected_output: 'filtered_information',
      complexity_cost: 10
    });

    // Simple aggregation
    sequence.push({
      primitive: 'aggregation',
      purpose: 'basic_synthesis',
      strategy: {
        operations: [
          {
            operation: 'group_by',
            field: 'source_type'
          }
        ]
      },
      expected_output: 'organized_information',
      complexity_cost: 15
    });

    return sequence;
  }

  private generateModerateSequence(input: OrchestrationReasoningInput, auctionBids: any[]): PrimitiveStep[] {
    const sequence: PrimitiveStep[] = [];
    
    // Enhanced querying
    sequence.push({
      primitive: 'querying',
      purpose: 'comprehensive_information_gathering',
      strategy: {
        target: 'multi_source_analysis',
        sources: {
          primary: this.selectPrimaryTools(3),
          secondary: this.selectSecondaryTools(2)
        },
        filters: {
          date_range: this.inferDateRange(input),
          domains: this.inferDomains(input),
          content_type: 'comprehensive'
        }
      },
      expected_output: 'comprehensive_information_set',
      complexity_cost: 25
    });

    // Quality filtering
    sequence.push({
      primitive: 'filtering',
      purpose: 'quality_refinement',
      strategy: {
        filter_rules: [
          {
            rule_type: 'relevance_threshold',
            field: 'confidence_score',
            operator: '>=',
            value: 0.8
          },
          {
            rule_type: 'content_quality',
            criteria: ['has_source', 'recent_content', 'credible_author'],
            logic: 'any'
          }
        ]
      },
      expected_output: 'high_quality_information',
      complexity_cost: 20
    });

    // Advanced aggregation
    sequence.push({
      primitive: 'aggregation',
      purpose: 'intelligent_synthesis',
      strategy: {
        operations: [
          {
            operation: 'group_by',
            field: 'topic_category',
            sub_operations: ['count', 'trend_analysis']
          },
          {
            operation: 'synthesize',
            method: 'thematic_analysis',
            output_format: 'structured_report'
          }
        ]
      },
      expected_output: 'synthesized_insights',
      complexity_cost: 30
    });

    // Analytical reasoning
    sequence.push({
      primitive: 'reasoning',
      purpose: 'insight_generation',
      strategy: {
        reasoning_strategy: {
          framework: 'analytical_reasoning',
          clear_thought_pattern: {
            observation: 'data_pattern_identification',
            hypothesis: 'trend_hypothesis_formation',
            prediction: 'outcome_prediction',
            verification: 'evidence_validation'
          },
          reasoning_objectives: [
            'identify_key_patterns',
            'generate_actionable_insights',
            'assess_confidence_levels'
          ]
        }
      },
      expected_output: 'analytical_insights',
      complexity_cost: 35
    });

    return sequence;
  }

  private generateComprehensiveSequence(input: OrchestrationReasoningInput, auctionBids: any[]): PrimitiveStep[] {
    const sequence: PrimitiveStep[] = [];
    
    // Multi-stage querying
    sequence.push({
      primitive: 'querying',
      purpose: 'exhaustive_information_discovery',
      strategy: {
        target: 'comprehensive_multi_stage',
        sources: {
          primary: this.selectPrimaryTools(4),
          secondary: this.selectSecondaryTools(3)
        },
        filters: {
          date_range: 'comprehensive',
          domains: this.inferDomains(input),
          content_type: 'all_types',
          depth: 'deep_crawl'
        }
      },
      expected_output: 'exhaustive_information_set',
      complexity_cost: 40
    });

    // Multi-layer filtering
    sequence.push({
      primitive: 'filtering',
      purpose: 'rigorous_quality_control',
      strategy: {
        filter_rules: [
          {
            rule_type: 'relevance_threshold',
            field: 'confidence_score',
            operator: '>=',
            value: 0.85
          },
          {
            rule_type: 'content_quality',
            criteria: ['has_source', 'recent_content', 'credible_author', 'peer_reviewed'],
            logic: 'all'
          },
          {
            rule_type: 'domain_expertise',
            field: 'author_credentials',
            operator: 'verified'
          }
        ]
      },
      expected_output: 'premium_quality_information',
      complexity_cost: 35
    });

    // Advanced multi-dimensional aggregation
    sequence.push({
      primitive: 'aggregation',
      purpose: 'sophisticated_synthesis',
      strategy: {
        operations: [
          {
            operation: 'multi_dimensional_grouping',
            fields: ['topic', 'source_type', 'temporal'],
            sub_operations: ['statistical_analysis', 'trend_detection', 'correlation_analysis']
          },
          {
            operation: 'cross_reference_synthesis',
            method: 'knowledge_graph_construction',
            output_format: 'comprehensive_knowledge_base'
          },
          {
            operation: 'meta_analysis',
            method: 'evidence_synthesis',
            confidence_weighting: true
          }
        ]
      },
      expected_output: 'comprehensive_knowledge_synthesis',
      complexity_cost: 50
    });

    // Advanced reasoning with multiple frameworks
    sequence.push({
      primitive: 'reasoning',
      purpose: 'multi_framework_analysis',
      strategy: {
        reasoning_strategy: {
          framework: 'multi_framework_reasoning',
          clear_thought_pattern: {
            observation: 'comprehensive_data_analysis',
            hypothesis: 'multi_hypothesis_generation',
            prediction: 'scenario_modeling',
            verification: 'cross_validation_analysis'
          },
          reasoning_objectives: [
            'generate_strategic_insights',
            'identify_hidden_patterns',
            'assess_risk_factors',
            'provide_actionable_recommendations',
            'quantify_confidence_intervals'
          ]
        }
      },
      expected_output: 'strategic_intelligence_report',
      complexity_cost: 60
    });

    return sequence;
  }

  private generatePatternAdaptedSequence(
    input: OrchestrationReasoningInput,
    bestPattern: PatternSimilarity
  ): PrimitiveStep[] {
    const baseSequence = bestPattern.pattern.primitive_sequence;
    const adaptedSequence: PrimitiveStep[] = [];

    for (let i = 0; i < baseSequence.length; i++) {
      const primitive = baseSequence[i] as 'querying' | 'filtering' | 'aggregation' | 'reasoning';
      const step = this.adaptPrimitiveStep(primitive, input, bestPattern, i);
      adaptedSequence.push(step);
    }

    return adaptedSequence;
  }

  private adaptPrimitiveStep(
    primitive: 'querying' | 'filtering' | 'aggregation' | 'reasoning',
    input: OrchestrationReasoningInput,
    pattern: PatternSimilarity,
    stepIndex: number
  ): PrimitiveStep {
    const baseComplexity = this.getBaseComplexity(primitive);
    const adaptationComplexity = this.calculateAdaptationComplexity(pattern, input);

    switch (primitive) {
      case 'querying':
        return {
          primitive: 'querying',
          purpose: `adapted_${pattern.pattern.name}_querying`,
          strategy: {
            target: this.adaptQueryTarget(input, pattern),
            sources: {
              primary: this.selectToolsForPattern(pattern),
              secondary: this.selectSecondaryTools(1)
            },
            filters: this.adaptQueryFilters(input, pattern)
          },
          expected_output: 'pattern_adapted_information',
          complexity_cost: baseComplexity + adaptationComplexity
        };

      case 'filtering':
        return {
          primitive: 'filtering',
          purpose: `adapted_${pattern.pattern.name}_filtering`,
          strategy: {
            filter_rules: this.adaptFilterRules(input, pattern)
          },
          expected_output: 'pattern_filtered_information',
          complexity_cost: baseComplexity + adaptationComplexity
        };

      case 'aggregation':
        return {
          primitive: 'aggregation',
          purpose: `adapted_${pattern.pattern.name}_aggregation`,
          strategy: {
            operations: this.adaptAggregationOperations(input, pattern)
          },
          expected_output: 'pattern_aggregated_insights',
          complexity_cost: baseComplexity + adaptationComplexity
        };

      case 'reasoning':
        return {
          primitive: 'reasoning',
          purpose: `adapted_${pattern.pattern.name}_reasoning`,
          strategy: {
            reasoning_strategy: this.adaptReasoningStrategy(input, pattern)
          },
          expected_output: 'pattern_reasoned_conclusions',
          complexity_cost: baseComplexity + adaptationComplexity
        };

      default:
        throw new Error(`Unknown primitive: ${primitive}`);
    }
  }

  /**
   * Perform minimax regret analysis on sequence options
   */
  private performMinimaxRegretAnalysis(
    options: PrimitiveStep[][],
    input: OrchestrationReasoningInput
  ): MinimaxRegretAnalysis {
    const scenarios = this.defineScenarios(input);
    const regretMatrix: Record<string, Record<string, number>> = {};

    // Calculate regret for each option in each scenario
    for (const [scenarioName, scenario] of Object.entries(scenarios)) {
      regretMatrix[scenarioName] = {};
      
      for (let i = 0; i < options.length; i++) {
        const optionName = this.getOptionName(options[i], i);
        const regret = this.calculateRegret(options[i], scenario, input);
        regretMatrix[scenarioName][optionName] = regret;
      }
    }

    // Find option with minimum maximum regret
    const maxRegrets: Record<string, number> = {};
    for (let i = 0; i < options.length; i++) {
      const optionName = this.getOptionName(options[i], i);
      const regrets = Object.values(regretMatrix).map(scenario => scenario[optionName]);
      maxRegrets[optionName] = Math.max(...regrets);
    }

    const bestOption = Object.entries(maxRegrets).reduce((best, [option, regret]) => 
      regret < best.regret ? { option, regret } : best
    , { option: '', regret: Infinity });

    return {
      scenarios: regretMatrix,
      best_option: bestOption.option,
      max_regret: bestOption.regret
    };
  }

  private defineScenarios(input: OrchestrationReasoningInput): Record<string, any> {
    return {
      tight_deadline: {
        time_pressure: 0.9,
        quality_tolerance: 0.6,
        resource_constraint: 0.8
      },
      high_quality_need: {
        time_pressure: 0.3,
        quality_tolerance: 0.95,
        resource_constraint: 0.4
      },
      limited_tools: {
        time_pressure: 0.6,
        quality_tolerance: 0.7,
        resource_constraint: 0.9
      },
      uncertain_domain: {
        time_pressure: 0.5,
        quality_tolerance: 0.8,
        resource_constraint: 0.6
      }
    };
  }

  private calculateRegret(sequence: PrimitiveStep[], scenario: any, input: OrchestrationReasoningInput): number {
    const totalComplexity = sequence.reduce((sum, step) => sum + step.complexity_cost, 0);
    const estimatedTime = totalComplexity * 2; // 2 minutes per complexity unit
    const estimatedQuality = this.estimateQualityScore(sequence);

    let regret = 0;

    // Time regret
    if (estimatedTime > scenario.time_pressure * 120) { // 120 minutes max
      regret += (estimatedTime - scenario.time_pressure * 120) / 120;
    }

    // Quality regret
    if (estimatedQuality < scenario.quality_tolerance) {
      regret += (scenario.quality_tolerance - estimatedQuality);
    }

    // Resource regret
    const resourceUsage = totalComplexity / this.gameState.getState().complexity_budget;
    if (resourceUsage > scenario.resource_constraint) {
      regret += (resourceUsage - scenario.resource_constraint);
    }

    return Math.min(1.0, regret); // Cap regret at 1.0
  }

  private estimateQualityScore(sequence: PrimitiveStep[]): number {
    let qualityScore = 0.5; // Base quality

    // Quality increases with more sophisticated primitives
    const primitiveQuality = {
      querying: 0.1,
      filtering: 0.15,
      aggregation: 0.2,
      reasoning: 0.25
    };

    for (const step of sequence) {
      qualityScore += primitiveQuality[step.primitive];
    }

    // Bonus for comprehensive sequences
    if (sequence.length >= 4) qualityScore += 0.1;

    return Math.min(0.95, qualityScore);
  }

  private selectBestOption(options: PrimitiveStep[][], regretAnalysis: MinimaxRegretAnalysis): PrimitiveStep[] {
    const bestOptionName = regretAnalysis.best_option;
    const optionIndex = this.parseOptionIndex(bestOptionName);
    return options[optionIndex] || options[0]; // Fallback to first option
  }

  private parseOptionIndex(optionName: string): number {
    if (optionName.includes('minimal')) return 0;
    if (optionName.includes('moderate')) return 1;
    if (optionName.includes('comprehensive')) return 2;
    if (optionName.includes('pattern')) return 3;
    return 0;
  }

  private getOptionName(sequence: PrimitiveStep[], index: number): string {
    const names = ['minimal', 'moderate', 'comprehensive', 'pattern_adapted'];
    return names[index] || `option_${index}`;
  }

  // Helper methods for tool selection and adaptation
  private selectPrimaryTools(count: number): string[] {
    const preferredTools = ['web_search_exa', 'company_research_exa', 'research_paper_search_exa'];
    return this.availableTools.filter(tool => preferredTools.includes(tool)).slice(0, count);
  }

  private selectSecondaryTools(count: number): string[] {
    const secondaryTools = ['linkedin_search_exa', 'github_search_exa', 'reddit_search_exa'];
    return this.availableTools.filter(tool => secondaryTools.includes(tool)).slice(0, count);
  }

  private selectToolsForPattern(pattern: PatternSimilarity): string[] {
    const patternTools = pattern.pattern.metadata.mentioned_tools || [];
    return this.availableTools.filter(tool => 
      patternTools.some((patternTool: string) => tool.toLowerCase().includes(patternTool))
    ).slice(0, 3);
  }

  private inferDateRange(input: OrchestrationReasoningInput): string {
    if (input.information_need.toLowerCase().includes('recent') || 
        input.information_need.toLowerCase().includes('latest')) {
      return '6_months';
    }
    if (input.information_need.toLowerCase().includes('historical') ||
        input.information_need.toLowerCase().includes('trend')) {
      return '2_years';
    }
    return '1_year';
  }

  private inferDomains(input: OrchestrationReasoningInput): string[] {
    const domains = [];
    const need = input.information_need.toLowerCase();
    
    if (need.includes('business') || need.includes('company')) domains.push('business');
    if (need.includes('academic') || need.includes('research')) domains.push('academic');
    if (need.includes('technical') || need.includes('technology')) domains.push('technology');
    if (need.includes('market') || need.includes('competitive')) domains.push('market');
    
    return domains.length > 0 ? domains : ['general'];
  }

  // Adaptation helper methods
  private adaptQueryTarget(input: OrchestrationReasoningInput, pattern: PatternSimilarity): string {
    return `${input.context.domain}_${pattern.pattern.category}_analysis`;
  }

  private adaptQueryFilters(input: OrchestrationReasoningInput, pattern: PatternSimilarity): Record<string, any> {
    return {
      domain: input.context.domain,
      complexity: input.context.complexity,
      pattern_category: pattern.pattern.category
    };
  }

  private adaptFilterRules(input: OrchestrationReasoningInput, pattern: PatternSimilarity): FilterRule[] {
    const baseThreshold = pattern.pattern.complexity === 'high' ? 0.85 : 0.75;
    
    return [
      {
        rule_type: 'relevance_threshold',
        field: 'confidence_score',
        operator: '>=',
        value: baseThreshold
      },
      {
        rule_type: 'domain_relevance',
        field: 'domain_match',
        operator: '>=',
        value: 0.7
      }
    ];
  }

  private adaptAggregationOperations(input: OrchestrationReasoningInput, pattern: PatternSimilarity): any[] {
    return [
      {
        operation: 'group_by',
        field: `${input.context.domain}_category`
      },
      {
        operation: 'synthesize',
        method: `${pattern.pattern.category}_synthesis`
      }
    ];
  }

  private adaptReasoningStrategy(input: OrchestrationReasoningInput, pattern: PatternSimilarity): ReasoningStrategy {
    return {
      framework: `${input.context.domain}_reasoning`,
      clear_thought_pattern: {
        observation: `${pattern.pattern.category}_data_analysis`,
        hypothesis: `${input.context.domain}_hypothesis_formation`,
        prediction: 'outcome_prediction',
        verification: 'evidence_validation'
      },
      reasoning_objectives: [
        `generate_${input.context.domain}_insights`,
        'assess_confidence_levels',
        'provide_actionable_recommendations'
      ]
    };
  }

  private getBaseComplexity(primitive: string): number {
    const complexities = {
      querying: 20,
      filtering: 15,
      aggregation: 25,
      reasoning: 30
    };
    return complexities[primitive as keyof typeof complexities] || 20;
  }

  private calculateAdaptationComplexity(pattern: PatternSimilarity, input: OrchestrationReasoningInput): number {
    const adaptationFactor = 1 - pattern.overall_similarity;
    return Math.round(adaptationFactor * 10);
  }

  private designIntegrationStrategy(sequence: PrimitiveStep[]): string {
    if (sequence.length <= 3) return 'sequential_pipeline';
    if (sequence.some(step => step.primitive === 'reasoning')) return 'iterative_refinement';
    return 'parallel_processing';
  }

  private calculateQualityCheckpoints(sequence: PrimitiveStep[]): number {
    return Math.min(sequence.length, 4); // Max 4 checkpoints
  }

  private estimateComplexity(sequence: PrimitiveStep[]): number {
    return sequence.reduce((sum, step) => sum + step.complexity_cost, 0);
  }
}