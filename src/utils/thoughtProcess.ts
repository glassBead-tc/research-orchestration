import type { 
  ThoughtStep, 
  DecisionPoint, 
  ReasoningTrajectory, 
  CriticalInsight,
  ThinkingProcessMetadata 
} from '../types/orchestrationReasoning.js';

export class ThoughtProcess {
  private thoughts: ThoughtStep[] = [];
  private currentThoughtNumber: number = 0;
  private branchCounter: number = 0;
  private startTime: number = Date.now();
  private trajectory: ReasoningTrajectory = {
    initial_hypothesis: '',
    evolving_understanding: [],
    critical_insights: [],
    final_synthesis: '',
    confidence_progression: []
  };

  constructor(private readonly maxThoughts: number = 50) {}

  addThought(params: {
    thought: string;
    thoughtType: ThoughtStep['thoughtType'];
    internalMonologue: string;
    keyInsights?: string[];
    decisionPoints?: DecisionPoint[];
    confidence?: number;
    isRevision?: boolean;
    revisesThought?: number;
    branchFromThought?: number;
  }): ThoughtStep {
    this.currentThoughtNumber++;
    
    const thoughtStep: ThoughtStep = {
      thoughtNumber: this.currentThoughtNumber,
      totalThoughts: this.maxThoughts,
      thought: params.thought,
      thoughtType: params.thoughtType,
      internalMonologue: params.internalMonologue,
      keyInsights: params.keyInsights || [],
      decisionPoints: params.decisionPoints || [],
      confidence: params.confidence || 0.5,
      nextThoughtNeeded: this.currentThoughtNumber < this.maxThoughts,
      isRevision: params.isRevision,
      revisesThought: params.revisesThought,
      branchFromThought: params.branchFromThought,
      branchId: params.branchFromThought ? `branch_${++this.branchCounter}` : undefined,
      timestamp: new Date().toISOString()
    };

    this.thoughts.push(thoughtStep);
    this.updateTrajectory(thoughtStep);
    
    return thoughtStep;
  }

  private updateTrajectory(thought: ThoughtStep): void {
    // Update confidence progression
    this.trajectory.confidence_progression.push(thought.confidence);
    
    // Set initial hypothesis from first thought
    if (thought.thoughtNumber === 1 && thought.thoughtType === 'analysis') {
      this.trajectory.initial_hypothesis = thought.thought;
    }
    
    // Track evolving understanding
    if (thought.keyInsights.length > 0) {
      this.trajectory.evolving_understanding.push(
        `Thought ${thought.thoughtNumber}: ${thought.keyInsights.join('; ')}`
      );
    }
    
    // Identify critical insights
    if (thought.confidence > 0.8 || thought.isRevision) {
      this.trajectory.critical_insights.push({
        insight: thought.thought,
        discovered_at_thought: thought.thoughtNumber,
        impact_on_plan: thought.internalMonologue,
        led_to_revision: thought.isRevision || false
      });
    }
  }

  analyzeInformationNeed(need: string): ThoughtStep {
    return this.addThought({
      thought: `Breaking down the information need: "${need}"`,
      thoughtType: 'analysis',
      internalMonologue: 'I need to understand what components this request involves...',
      keyInsights: this.decomposeNeed(need),
      confidence: 0.7
    });
  }

  private decomposeNeed(need: string): string[] {
    const components: string[] = [];
    
    // Extract key components based on common patterns
    if (need.toLowerCase().includes('market')) components.push('market_analysis');
    if (need.toLowerCase().includes('competitor')) components.push('competitor_research');
    if (need.toLowerCase().includes('technology')) components.push('technology_assessment');
    if (need.toLowerCase().includes('sentiment')) components.push('sentiment_analysis');
    if (need.toLowerCase().includes('regulatory')) components.push('regulatory_compliance');
    if (need.toLowerCase().includes('trend')) components.push('trend_identification');
    if (need.toLowerCase().includes('customer')) components.push('customer_insights');
    if (need.toLowerCase().includes('financial')) components.push('financial_analysis');
    
    return components.length > 0 ? components : ['general_research'];
  }

  considerDependencies(components: string[]): ThoughtStep {
    const dependencies = this.analyzeDependencies(components);
    
    return this.addThought({
      thought: 'Analyzing dependencies between information components',
      thoughtType: 'planning',
      internalMonologue: 'Some pieces of information depend on others...',
      keyInsights: dependencies.insights,
      decisionPoints: [{
        question: 'What order should we gather information?',
        options: dependencies.orderOptions,
        selected: dependencies.optimalOrder[0],
        rationale: 'This order respects data dependencies and maximizes efficiency',
        impact: 'high'
      }],
      confidence: 0.75
    });
  }

  private analyzeDependencies(components: string[]): {
    insights: string[];
    orderOptions: string[];
    optimalOrder: string[];
  } {
    const insights: string[] = [];
    const dependencies: Record<string, string[]> = {
      'competitor_research': ['market_analysis'],
      'sentiment_analysis': ['customer_insights'],
      'financial_analysis': ['market_analysis', 'competitor_research'],
      'technology_assessment': [],
      'regulatory_compliance': [],
      'market_analysis': [],
      'trend_identification': ['market_analysis'],
      'customer_insights': []
    };
    
    // Find dependencies
    for (const component of components) {
      const deps = dependencies[component] || [];
      if (deps.length > 0) {
        insights.push(`${component} depends on: ${deps.join(', ')}`);
      }
    }
    
    // Topological sort for optimal order
    const optimalOrder = this.topologicalSort(components, dependencies);
    const orderOptions = [
      optimalOrder.join(' → '),
      components.join(' → '),
      [...components].reverse().join(' → ')
    ];
    
    return { insights, orderOptions, optimalOrder };
  }

  private topologicalSort(nodes: string[], dependencies: Record<string, string[]>): string[] {
    const visited = new Set<string>();
    const result: string[] = [];
    
    const visit = (node: string) => {
      if (visited.has(node)) return;
      visited.add(node);
      
      const deps = dependencies[node] || [];
      for (const dep of deps) {
        if (nodes.includes(dep)) {
          visit(dep);
        }
      }
      
      result.push(node);
    };
    
    for (const node of nodes) {
      visit(node);
    }
    
    return result;
  }

  designPrimitiveSequence(components: string[]): ThoughtStep {
    const sequences = this.generateSequenceOptions(components);
    
    return this.addThought({
      thought: 'Designing primitive sequences for each component',
      thoughtType: 'planning',
      internalMonologue: 'Each component needs specific primitives in the right order...',
      keyInsights: sequences.insights,
      decisionPoints: [{
        question: 'Which primitive pattern should we use?',
        options: sequences.patterns,
        selected: sequences.selectedPattern,
        rationale: 'This pattern balances thoroughness with efficiency',
        impact: 'high'
      }],
      confidence: 0.8
    });
  }

  private generateSequenceOptions(components: string[]): {
    insights: string[];
    patterns: string[];
    selectedPattern: string;
  } {
    const insights: string[] = [];
    const patterns: string[] = [];
    
    // Define primitive patterns for different component types
    const componentPatterns: Record<string, string> = {
      'market_analysis': 'query → filter → aggregate → reason',
      'competitor_research': 'query → query(targeted) → filter → aggregate',
      'technology_assessment': 'query(papers) → filter → reason',
      'sentiment_analysis': 'query(social) → filter → aggregate',
      'regulatory_compliance': 'query(official) → filter → reason',
      'trend_identification': 'query → aggregate → reason',
      'customer_insights': 'query → filter → aggregate → reason',
      'financial_analysis': 'query → filter → aggregate → reason'
    };
    
    for (const component of components) {
      const pattern = componentPatterns[component] || 'query → filter → aggregate';
      insights.push(`${component}: ${pattern}`);
      patterns.push(pattern);
    }
    
    // Select most comprehensive pattern
    const selectedPattern = patterns.find(p => p.includes('reason')) || patterns[0];
    
    return { insights, patterns, selectedPattern };
  }

  identifyParallelOpportunities(sequences: string[]): ThoughtStep {
    const opportunities = this.findParallelizableGroups(sequences);
    
    return this.addThought({
      thought: 'Identifying opportunities for parallel execution',
      thoughtType: 'evaluation',
      internalMonologue: 'Some operations can run simultaneously without conflicts...',
      keyInsights: opportunities.insights,
      decisionPoints: [{
        question: 'How should we parallelize execution?',
        options: opportunities.strategies,
        selected: opportunities.selectedStrategy,
        rationale: 'This maximizes parallelism while respecting dependencies',
        impact: 'medium'
      }],
      confidence: 0.85
    });
  }

  private findParallelizableGroups(sequences: string[]): {
    insights: string[];
    strategies: string[];
    selectedStrategy: string;
  } {
    const insights: string[] = [];
    
    // Identify independent sequences
    const independentGroups: string[][] = [
      ['technology_assessment', 'regulatory_compliance'],
      ['market_analysis', 'customer_insights'],
      ['sentiment_analysis', 'trend_identification']
    ];
    
    insights.push('Independent components can run in parallel');
    insights.push('Resource-intensive queries should be staggered');
    
    const strategies = [
      'Full parallel: All independent components simultaneously',
      'Staged parallel: Groups of 2-3 components at a time',
      'Sequential with micro-parallelism: Parallel within each component'
    ];
    
    return {
      insights,
      strategies,
      selectedStrategy: strategies[1] // Staged parallel is usually optimal
    };
  }

  reviseApproach(issue: string, originalThought: number): ThoughtStep {
    return this.addThought({
      thought: `Revising approach due to: ${issue}`,
      thoughtType: 'revision',
      internalMonologue: 'The original plan needs adjustment...',
      keyInsights: [`Issue identified: ${issue}`, 'Need to adjust sequence'],
      isRevision: true,
      revisesThought: originalThought,
      confidence: 0.9
    });
  }

  synthesizeFinalPlan(): ThoughtStep {
    const synthesis = this.generateSynthesis();
    
    this.trajectory.final_synthesis = synthesis.summary;
    
    return this.addThought({
      thought: 'Final orchestration plan synthesized',
      thoughtType: 'synthesis',
      internalMonologue: 'Bringing together all insights into a cohesive plan...',
      keyInsights: synthesis.keyElements,
      confidence: synthesis.confidence
    });
  }

  private generateSynthesis(): {
    summary: string;
    keyElements: string[];
    confidence: number;
  } {
    const avgConfidence = this.trajectory.confidence_progression.reduce((a, b) => a + b, 0) 
      / this.trajectory.confidence_progression.length;
    
    const keyElements = [
      `Total thoughts: ${this.thoughts.length}`,
      `Revisions made: ${this.thoughts.filter(t => t.isRevision).length}`,
      `Critical insights: ${this.trajectory.critical_insights.length}`,
      `Average confidence: ${avgConfidence.toFixed(2)}`
    ];
    
    return {
      summary: 'Orchestration plan optimized for parallel execution with dependency management',
      keyElements,
      confidence: avgConfidence
    };
  }

  getThoughts(): ThoughtStep[] {
    return this.thoughts;
  }

  getTrajectory(): ReasoningTrajectory {
    return this.trajectory;
  }

  getMetadata(): ThinkingProcessMetadata {
    const decisionPoints = this.thoughts.flatMap(t => t.decisionPoints);
    
    return {
      total_thoughts: this.thoughts.length,
      revision_count: this.thoughts.filter(t => t.isRevision).length,
      branch_count: this.branchCounter,
      decision_points_evaluated: decisionPoints.length,
      confidence_trajectory: this.trajectory.confidence_progression,
      thinking_duration_ms: Date.now() - this.startTime,
      complexity_discovered: this.estimateComplexity(),
      insights_generated: this.thoughts.flatMap(t => t.keyInsights)
    };
  }

  private estimateComplexity(): number {
    // Estimate based on thoughts, revisions, and branches
    return Math.min(100, 
      this.thoughts.length * 2 + 
      this.thoughts.filter(t => t.isRevision).length * 10 +
      this.branchCounter * 5
    );
  }
}