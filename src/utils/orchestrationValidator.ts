import {
  OrchestrationReasoningInput,
  OrchestrationPlan,
  ReasoningChain,
  OrchestrationError,
  ValidationResult,
  PrimitiveStep
} from '../types/orchestrationReasoning.js';

/**
 * Comprehensive validation and error handling for orchestration reasoning
 * Implements validation framework from the specification
 */
export class OrchestrationValidator {
  
  /**
   * Validate input parameters before processing
   */
  public validateInput(input: OrchestrationReasoningInput): ValidationResult {
    const errors: OrchestrationError[] = [];
    const warnings: OrchestrationError[] = [];

    // Critical validation checks
    this.validateInformationNeed(input.information_need, errors);
    this.validateContext(input.context, errors, warnings);
    this.validateParameters(input, errors, warnings);

    const valid = errors.length === 0;
    const confidence = this.calculateValidationConfidence(errors, warnings);

    return {
      valid,
      errors,
      warnings,
      confidence
    };
  }

  /**
   * Validate orchestration plan completeness and feasibility
   */
  public validateOrchestrationPlan(plan: OrchestrationPlan): ValidationResult {
    const errors: OrchestrationError[] = [];
    const warnings: OrchestrationError[] = [];

    // Validate plan structure
    this.validatePlanStructure(plan, errors);
    
    // Validate reasoning chain
    this.validateReasoningChain(plan.reasoning_chain, errors, warnings);
    
    // Validate primitive sequence
    this.validatePrimitiveSequence(plan.reasoning_chain.phase_4_sequence_design, errors, warnings);
    
    // Validate execution metadata
    this.validateExecutionMetadata(plan.execution_metadata, errors, warnings);

    const valid = errors.length === 0;
    const confidence = this.calculateValidationConfidence(errors, warnings);

    return {
      valid,
      errors,
      warnings,
      confidence
    };
  }

  /**
   * Validate information need clarity and specificity
   */
  private validateInformationNeed(informationNeed: string, errors: OrchestrationError[]): void {
    if (!informationNeed || informationNeed.trim().length === 0) {
      errors.push({
        type: 'critical',
        code: 'EMPTY_INFORMATION_NEED',
        message: 'Information need cannot be empty',
        phase: 'input_validation',
        recovery_suggestions: [
          'Provide a clear description of what information is needed',
          'Include specific requirements and context'
        ]
      });
      return;
    }

    if (informationNeed.length < 10) {
      errors.push({
        type: 'critical',
        code: 'INSUFFICIENT_INFORMATION_NEED',
        message: 'Information need is too vague or brief',
        phase: 'input_validation',
        recovery_suggestions: [
          'Provide more detailed description of information requirements',
          'Include context about how the information will be used'
        ]
      });
    }

    if (informationNeed.length > 1000) {
      errors.push({
        type: 'recoverable',
        code: 'OVERLY_COMPLEX_INFORMATION_NEED',
        message: 'Information need is extremely detailed and may be too complex',
        phase: 'input_validation',
        recovery_suggestions: [
          'Consider breaking down into smaller, focused information needs',
          'Prioritize the most critical information requirements'
        ]
      });
    }

    // Check for actionable keywords
    const actionableKeywords = ['analyze', 'compare', 'evaluate', 'assess', 'identify', 'research'];
    const hasActionableKeyword = actionableKeywords.some(keyword => 
      informationNeed.toLowerCase().includes(keyword)
    );

    if (!hasActionableKeyword) {
      errors.push({
        type: 'recoverable',
        code: 'VAGUE_INFORMATION_NEED',
        message: 'Information need lacks clear actionable requirements',
        phase: 'input_validation',
        recovery_suggestions: [
          'Include specific action words (analyze, compare, evaluate, etc.)',
          'Clarify what type of analysis or processing is needed'
        ]
      });
    }
  }

  /**
   * Validate context parameters
   */
  private validateContext(context: any, errors: OrchestrationError[], warnings: OrchestrationError[]): void {
    // Validate domain
    if (!context.domain || context.domain.trim().length === 0) {
      errors.push({
        type: 'critical',
        code: 'MISSING_DOMAIN',
        message: 'Domain is required for orchestration design',
        phase: 'input_validation',
        recovery_suggestions: [
          'Specify the domain (e.g., business-intelligence, academic-research)',
          'Choose from available domain categories'
        ]
      });
    }

    // Validate complexity
    const validComplexities = ['low', 'medium', 'high'];
    if (!validComplexities.includes(context.complexity)) {
      errors.push({
        type: 'critical',
        code: 'INVALID_COMPLEXITY',
        message: `Complexity must be one of: ${validComplexities.join(', ')}`,
        phase: 'input_validation',
        recovery_suggestions: [
          'Set complexity to low, medium, or high',
          'Consider the scope and depth of analysis required'
        ]
      });
    }

    // Validate time constraints
    if (context.time_constraint) {
      const timePattern = /(\d+)\s*(hour|minute|day)s?/i;
      if (!timePattern.test(context.time_constraint)) {
        warnings.push({
          type: 'warning',
          code: 'UNCLEAR_TIME_CONSTRAINT',
          message: 'Time constraint format is unclear',
          phase: 'input_validation',
          recovery_suggestions: [
            'Use format like "2 hours", "30 minutes", "1 day"',
            'Provide specific time limits for better planning'
          ]
        });
      }
    }

    // Validate available tools
    if (context.available_tools && context.available_tools.length === 0) {
      warnings.push({
        type: 'warning',
        code: 'NO_TOOLS_AVAILABLE',
        message: 'No tools specified - may limit orchestration capabilities',
        phase: 'input_validation',
        recovery_suggestions: [
          'Specify available MCP tools for execution',
          'Ensure at least basic search tools are available'
        ]
      });
    }

    // Check for tool-complexity mismatch
    if (context.available_tools && context.complexity === 'high' && context.available_tools.length < 3) {
      warnings.push({
        type: 'warning',
        code: 'INSUFFICIENT_TOOLS_FOR_COMPLEXITY',
        message: 'High complexity orchestration may require more tools',
        phase: 'input_validation',
        recovery_suggestions: [
          'Consider adding more specialized tools',
          'Reduce complexity level if tools are limited'
        ]
      });
    }
  }

  /**
   * Validate input parameters
   */
  private validateParameters(input: OrchestrationReasoningInput, errors: OrchestrationError[], warnings: OrchestrationError[]): void {
    // Validate reasoning depth
    const validDepths = ['surface', 'moderate', 'deep'];
    if (!validDepths.includes(input.reasoning_depth)) {
      errors.push({
        type: 'critical',
        code: 'INVALID_REASONING_DEPTH',
        message: `Reasoning depth must be one of: ${validDepths.join(', ')}`,
        phase: 'input_validation',
        recovery_suggestions: [
          'Set reasoning_depth to surface, moderate, or deep',
          'Consider the analysis requirements when choosing depth'
        ]
      });
    }

    // Validate agentic level
    const validAgenticLevels = ['prescriptive', 'guided', 'autonomous'];
    if (!validAgenticLevels.includes(input.agentic_level)) {
      errors.push({
        type: 'critical',
        code: 'INVALID_AGENTIC_LEVEL',
        message: `Agentic level must be one of: ${validAgenticLevels.join(', ')}`,
        phase: 'input_validation',
        recovery_suggestions: [
          'Set agentic_level to prescriptive, guided, or autonomous',
          'Choose based on desired level of automation'
        ]
      });
    }

    // Check for parameter consistency
    if (input.reasoning_depth === 'deep' && input.context.complexity === 'low') {
      warnings.push({
        type: 'warning',
        code: 'PARAMETER_MISMATCH',
        message: 'Deep reasoning with low complexity may be unnecessary',
        phase: 'input_validation',
        recovery_suggestions: [
          'Consider using moderate reasoning depth for low complexity',
          'Align reasoning depth with complexity requirements'
        ]
      });
    }
  }

  /**
   * Validate plan structure
   */
  private validatePlanStructure(plan: OrchestrationPlan, errors: OrchestrationError[]): void {
    if (!plan.plan_id || plan.plan_id.trim().length === 0) {
      errors.push({
        type: 'critical',
        code: 'MISSING_PLAN_ID',
        message: 'Orchestration plan must have a unique identifier',
        phase: 'plan_validation',
        recovery_suggestions: ['Generate a unique plan ID']
      });
    }

    if (!plan.reasoning_chain) {
      errors.push({
        type: 'critical',
        code: 'MISSING_REASONING_CHAIN',
        message: 'Orchestration plan must include reasoning chain',
        phase: 'plan_validation',
        recovery_suggestions: ['Execute complete reasoning process']
      });
    }

    if (!plan.execution_metadata) {
      errors.push({
        type: 'critical',
        code: 'MISSING_EXECUTION_METADATA',
        message: 'Orchestration plan must include execution metadata',
        phase: 'plan_validation',
        recovery_suggestions: ['Generate execution metadata with time and resource estimates']
      });
    }

    if (!plan.orchestration_specification) {
      errors.push({
        type: 'critical',
        code: 'MISSING_ORCHESTRATION_SPEC',
        message: 'Orchestration plan must include specification',
        phase: 'plan_validation',
        recovery_suggestions: ['Generate orchestration specification']
      });
    }
  }

  /**
   * Validate reasoning chain completeness
   */
  private validateReasoningChain(chain: ReasoningChain, errors: OrchestrationError[], warnings: OrchestrationError[]): void {
    // Check phase completeness
    const requiredPhases = [
      'phase_1_need_analysis',
      'phase_2_context_assessment',
      'phase_3_pattern_analysis',
      'phase_4_sequence_design',
      'phase_5_validation'
    ];

    for (const phase of requiredPhases) {
      if (!chain[phase as keyof ReasoningChain]) {
        errors.push({
          type: 'critical',
          code: 'INCOMPLETE_REASONING_CHAIN',
          message: `Missing ${phase.replace(/_/g, ' ')}`,
          phase: 'reasoning_validation',
          recovery_suggestions: [`Complete ${phase.replace(/_/g, ' ')}`]
        });
      }
    }

    // Validate phase 1 - Need Analysis
    if (chain.phase_1_need_analysis) {
      if (!chain.phase_1_need_analysis.components || chain.phase_1_need_analysis.components.length === 0) {
        errors.push({
          type: 'critical',
          code: 'MISSING_NEED_COMPONENTS',
          message: 'Need analysis must identify information components',
          phase: 'need_analysis_validation',
          recovery_suggestions: ['Decompose information need into specific components']
        });
      }

      if (chain.phase_1_need_analysis.complexity_estimate <= 0) {
        warnings.push({
          type: 'warning',
          code: 'INVALID_COMPLEXITY_ESTIMATE',
          message: 'Complexity estimate should be positive',
          phase: 'need_analysis_validation',
          recovery_suggestions: ['Recalculate complexity estimate based on requirements']
        });
      }
    }

    // Validate phase 4 - Sequence Design
    if (chain.phase_4_sequence_design) {
      if (!chain.phase_4_sequence_design.primitive_sequence || chain.phase_4_sequence_design.primitive_sequence.length === 0) {
        errors.push({
          type: 'critical',
          code: 'MISSING_PRIMITIVE_SEQUENCE',
          message: 'Sequence design must include primitive sequence',
          phase: 'sequence_validation',
          recovery_suggestions: ['Design primitive sequence with at least one primitive']
        });
      }
    }

    // Validate phase 5 - Validation
    if (chain.phase_5_validation) {
      if (chain.phase_5_validation.execution_confidence < 0.5) {
        warnings.push({
          type: 'warning',
          code: 'LOW_EXECUTION_CONFIDENCE',
          message: 'Execution confidence is below recommended threshold',
          phase: 'validation_phase',
          recovery_suggestions: [
            'Review and improve orchestration design',
            'Consider simplifying the approach',
            'Add more validation checkpoints'
          ]
        });
      }
    }
  }

  /**
   * Validate primitive sequence logic and feasibility
   */
  private validatePrimitiveSequence(sequenceDesign: any, errors: OrchestrationError[], warnings: OrchestrationError[]): void {
    if (!sequenceDesign || !sequenceDesign.primitive_sequence) {
      return; // Already handled in reasoning chain validation
    }

    const sequence = sequenceDesign.primitive_sequence;
    const validPrimitives = ['querying', 'filtering', 'aggregation', 'reasoning'];

    // Validate primitive types
    for (let i = 0; i < sequence.length; i++) {
      const step = sequence[i];
      if (!validPrimitives.includes(step.primitive)) {
        errors.push({
          type: 'critical',
          code: 'INVALID_PRIMITIVE_TYPE',
          message: `Invalid primitive type: ${step.primitive}`,
          phase: 'sequence_validation',
          recovery_suggestions: [`Use valid primitive types: ${validPrimitives.join(', ')}`]
        });
      }

      // Validate step structure
      if (!step.purpose || step.purpose.trim().length === 0) {
        warnings.push({
          type: 'warning',
          code: 'MISSING_STEP_PURPOSE',
          message: `Step ${i + 1} lacks clear purpose`,
          phase: 'sequence_validation',
          recovery_suggestions: ['Define clear purpose for each primitive step']
        });
      }

      if (!step.expected_output || step.expected_output.trim().length === 0) {
        warnings.push({
          type: 'warning',
          code: 'MISSING_EXPECTED_OUTPUT',
          message: `Step ${i + 1} lacks expected output definition`,
          phase: 'sequence_validation',
          recovery_suggestions: ['Define expected output for each primitive step']
        });
      }
    }

    // Validate sequence logic
    this.validateSequenceLogic(sequence, warnings);

    // Validate complexity budget
    const totalComplexity = sequence.reduce((sum: number, step: PrimitiveStep) => sum + step.complexity_cost, 0);
    if (totalComplexity > 200) { // Reasonable upper limit
      warnings.push({
        type: 'warning',
        code: 'HIGH_COMPLEXITY_SEQUENCE',
        message: 'Primitive sequence has very high complexity cost',
        phase: 'sequence_validation',
        recovery_suggestions: [
          'Consider simplifying the sequence',
          'Remove non-essential primitives',
          'Optimize primitive configurations'
        ]
      });
    }
  }

  /**
   * Validate sequence logic and flow
   */
  private validateSequenceLogic(sequence: PrimitiveStep[], warnings: OrchestrationError[]): void {
    // Check for logical flow
    const primitiveOrder = sequence.map(step => step.primitive);
    
    // Querying should typically come first
    if (primitiveOrder.length > 0 && primitiveOrder[0] !== 'querying') {
      warnings.push({
        type: 'warning',
        code: 'UNUSUAL_SEQUENCE_START',
        message: 'Sequence does not start with querying primitive',
        phase: 'sequence_logic_validation',
        recovery_suggestions: [
          'Consider starting with querying to gather information',
          'Ensure the sequence logic is intentional'
        ]
      });
    }

    // Reasoning should typically come last
    const lastPrimitive = primitiveOrder[primitiveOrder.length - 1];
    if (primitiveOrder.includes('reasoning') && lastPrimitive !== 'reasoning') {
      warnings.push({
        type: 'warning',
        code: 'REASONING_NOT_FINAL',
        message: 'Reasoning primitive is not the final step',
        phase: 'sequence_logic_validation',
        recovery_suggestions: [
          'Consider placing reasoning as the final step',
          'Ensure the sequence logic serves the analysis goals'
        ]
      });
    }

    // Check for missing filtering after querying
    if (primitiveOrder.includes('querying') && !primitiveOrder.includes('filtering')) {
      warnings.push({
        type: 'warning',
        code: 'MISSING_FILTERING',
        message: 'Sequence includes querying but no filtering',
        phase: 'sequence_logic_validation',
        recovery_suggestions: [
          'Consider adding filtering to improve data quality',
          'Ensure raw data quality is acceptable'
        ]
      });
    }
  }

  /**
   * Validate execution metadata
   */
  private validateExecutionMetadata(metadata: any, errors: OrchestrationError[], warnings: OrchestrationError[]): void {
    if (!metadata.estimated_duration) {
      warnings.push({
        type: 'warning',
        code: 'MISSING_DURATION_ESTIMATE',
        message: 'Execution metadata lacks duration estimate',
        phase: 'metadata_validation',
        recovery_suggestions: ['Provide estimated execution duration']
      });
    }

    if (!metadata.resource_requirements) {
      warnings.push({
        type: 'warning',
        code: 'MISSING_RESOURCE_REQUIREMENTS',
        message: 'Execution metadata lacks resource requirements',
        phase: 'metadata_validation',
        recovery_suggestions: ['Specify API calls and processing complexity requirements']
      });
    }

    if (metadata.resource_requirements && metadata.resource_requirements.api_calls > 100) {
      warnings.push({
        type: 'warning',
        code: 'HIGH_API_USAGE',
        message: 'Orchestration requires high number of API calls',
        phase: 'metadata_validation',
        recovery_suggestions: [
          'Consider optimizing to reduce API usage',
          'Ensure API rate limits can accommodate the load'
        ]
      });
    }
  }

  /**
   * Calculate validation confidence score
   */
  private calculateValidationConfidence(errors: OrchestrationError[], warnings: OrchestrationError[]): number {
    let confidence = 1.0;
    
    // Reduce confidence for each error
    confidence -= errors.length * 0.2;
    
    // Reduce confidence for warnings (less impact)
    confidence -= warnings.length * 0.05;
    
    // Apply severity weights
    for (const error of errors) {
      if (error.type === 'critical') {
        confidence -= 0.1;
      }
    }
    
    return Math.max(0.0, Math.min(1.0, confidence));
  }

  /**
   * Recovery mechanism for common errors
   */
  public suggestRecovery(error: OrchestrationError): string[] {
    const recoveryStrategies: Record<string, string[]> = {
      'EMPTY_INFORMATION_NEED': [
        'Use a template: "Analyze [subject] to understand [specific aspect]"',
        'Include context about the business or research goal',
        'Specify what decisions the information will support'
      ],
      'INSUFFICIENT_TOOLS_FOR_COMPLEXITY': [
        'Add web_search_exa for general information gathering',
        'Include company_research_exa for business intelligence',
        'Add research_paper_search_exa for academic content'
      ],
      'LOW_EXECUTION_CONFIDENCE': [
        'Simplify the primitive sequence',
        'Add more validation checkpoints',
        'Use proven orchestration patterns',
        'Reduce scope to focus on core requirements'
      ],
      'HIGH_COMPLEXITY_SEQUENCE': [
        'Remove non-essential primitives',
        'Combine similar operations',
        'Use simpler primitive configurations',
        'Break into multiple smaller orchestrations'
      ]
    };

    return recoveryStrategies[error.code] || error.recovery_suggestions;
  }

  /**
   * Auto-fix common validation issues
   */
  public autoFix(input: OrchestrationReasoningInput, errors: OrchestrationError[]): OrchestrationReasoningInput {
    const fixedInput = { ...input };

    for (const error of errors) {
      switch (error.code) {
        case 'MISSING_DOMAIN':
          fixedInput.context.domain = 'general-research';
          break;
        case 'INVALID_COMPLEXITY':
          fixedInput.context.complexity = 'medium';
          break;
        case 'INVALID_REASONING_DEPTH':
          fixedInput.reasoning_depth = 'moderate';
          break;
        case 'INVALID_AGENTIC_LEVEL':
          fixedInput.agentic_level = 'guided';
          break;
      }
    }

    return fixedInput;
  }
}