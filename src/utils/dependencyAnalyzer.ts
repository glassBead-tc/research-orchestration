import type {
  DependencyGraph,
  DependencyNode,
  DependencyEdge,
  DataRequirement,
  DataProduct,
  ParallelExecutionGroup,
  PrimitiveStep,
  ResourceConstraint
} from '../types/orchestrationReasoning.js';

export class DependencyAnalyzer {
  private nodeCounter: number = 0;
  private nodes: Map<string, DependencyNode> = new Map();
  private edges: DependencyEdge[] = [];

  constructor(private readonly resourceConstraints: ResourceConstraint[] = []) {
    // Default resource constraints
    if (this.resourceConstraints.length === 0) {
      this.resourceConstraints = [
        {
          type: 'api_rate_limit',
          limit: 60,
          unit: 'calls/minute',
          affects: ['querying']
        },
        {
          type: 'memory',
          limit: 512,
          unit: 'MB',
          affects: ['aggregation', 'reasoning']
        }
      ];
    }
  }

  analyzePrimitiveSequence(steps: PrimitiveStep[]): DependencyGraph {
    // Clear previous analysis
    this.nodes.clear();
    this.edges = [];
    this.nodeCounter = 0;

    // Create nodes for each primitive step
    steps.forEach((step, index) => {
      const node = this.createDependencyNode(step, index);
      this.nodes.set(node.id, node);
    });

    // Analyze dependencies between nodes
    this.identifyDataDependencies();
    this.identifyTemporalDependencies();
    this.identifyResourceDependencies();

    // Find critical path and parallel opportunities
    const criticalPath = this.findCriticalPath();
    const parallelGroups = this.identifyParallelGroups();

    return {
      nodes: Array.from(this.nodes.values()),
      edges: this.edges,
      critical_path: criticalPath,
      parallel_opportunities: parallelGroups
    };
  }

  private createDependencyNode(step: PrimitiveStep, index: number): DependencyNode {
    const nodeId = `${step.primitive}_${++this.nodeCounter}`;
    
    // Define inputs and outputs based on primitive type
    const { inputs, outputs } = this.defineDataFlow(step);
    
    // Estimate duration based on primitive type and strategy
    const duration = this.estimateDuration(step);
    
    return {
      id: nodeId,
      primitive: step.primitive,
      purpose: step.purpose,
      inputs,
      outputs,
      estimated_duration: duration,
      can_fail: this.assessFailureRisk(step),
      fallback_strategy: this.determineFallbackStrategy(step)
    };
  }

  private defineDataFlow(step: PrimitiveStep): {
    inputs: DataRequirement[];
    outputs: DataProduct[];
  } {
    const inputs: DataRequirement[] = [];
    const outputs: DataProduct[] = [];

    switch (step.primitive) {
      case 'querying':
        inputs.push({
          name: 'search_parameters',
          type: 'SearchConfig',
          source: 'user_input',
          is_optional: false
        });
        
        if (step.strategy.sources?.secondary?.length) {
          inputs.push({
            name: 'primary_results',
            type: 'SearchResults',
            source: 'previous_query',
            is_optional: true
          });
        }
        
        outputs.push({
          name: 'raw_search_results',
          type: 'SearchResults',
          schema: {
            results: 'array',
            total_count: 'number',
            sources: 'array'
          },
          quality_metrics: ['relevance_score', 'source_diversity', 'freshness']
        });
        break;

      case 'filtering':
        inputs.push({
          name: 'unfiltered_data',
          type: 'SearchResults',
          source: 'querying',
          is_optional: false
        });
        
        outputs.push({
          name: 'filtered_results',
          type: 'FilteredResults',
          schema: {
            results: 'array',
            filter_stats: 'object',
            removed_count: 'number'
          },
          quality_metrics: ['precision', 'quality_score']
        });
        break;

      case 'aggregation':
        inputs.push({
          name: 'filtered_data',
          type: 'FilteredResults',
          source: 'filtering',
          is_optional: false
        });
        
        outputs.push({
          name: 'aggregated_insights',
          type: 'AggregatedData',
          schema: {
            summaries: 'array',
            statistics: 'object',
            patterns: 'array'
          },
          quality_metrics: ['completeness', 'coherence']
        });
        break;

      case 'reasoning':
        inputs.push({
          name: 'aggregated_data',
          type: 'AggregatedData',
          source: 'aggregation',
          is_optional: false,
          freshness_requirement: '30 minutes'
        });
        
        outputs.push({
          name: 'reasoned_analysis',
          type: 'Analysis',
          schema: {
            insights: 'array',
            recommendations: 'array',
            confidence_scores: 'object'
          },
          quality_metrics: ['accuracy', 'depth', 'actionability']
        });
        break;
    }

    return { inputs, outputs };
  }

  private estimateDuration(step: PrimitiveStep): number {
    // Base duration in seconds
    const baseDurations: Record<typeof step.primitive, number> = {
      querying: 5,
      filtering: 2,
      aggregation: 10,
      reasoning: 15
    };

    let duration = baseDurations[step.primitive];

    // Adjust based on complexity
    duration *= (step.complexity_cost / 15); // Normalize around 15

    // Adjust based on strategy specifics
    if (step.strategy.sources?.primary && step.strategy.sources.primary.length > 3) {
      duration *= 1.5; // Multiple sources take longer
    }

    return Math.ceil(duration);
  }

  private assessFailureRisk(step: PrimitiveStep): boolean {
    // Querying and reasoning have higher failure risk
    return ['querying', 'reasoning'].includes(step.primitive);
  }

  private determineFallbackStrategy(step: PrimitiveStep): string | undefined {
    const fallbacks: Record<typeof step.primitive, string> = {
      querying: 'Retry with broader search terms or use cached results',
      filtering: 'Relax filter criteria progressively',
      aggregation: 'Use partial aggregation with available data',
      reasoning: 'Switch to simpler reasoning framework or rule-based analysis'
    };

    return this.assessFailureRisk(step) ? fallbacks[step.primitive] : undefined;
  }

  private identifyDataDependencies(): void {
    const nodeArray = Array.from(this.nodes.values());
    
    for (let i = 0; i < nodeArray.length; i++) {
      for (let j = i + 1; j < nodeArray.length; j++) {
        const node1 = nodeArray[i];
        const node2 = nodeArray[j];
        
        // Check if node2 needs outputs from node1
        for (const input of node2.inputs) {
          for (const output of node1.outputs) {
            if (this.isCompatibleDataType(output.type, input.type)) {
              this.edges.push({
                from: node1.id,
                to: node2.id,
                dependency_type: 'data',
                is_critical: !input.is_optional,
                can_be_relaxed: input.is_optional
              });
            }
          }
        }
      }
    }
  }

  private isCompatibleDataType(outputType: string, inputType: string): boolean {
    // Define type compatibility rules
    const compatibilities: Record<string, string[]> = {
      'SearchResults': ['SearchResults', 'FilteredResults'],
      'FilteredResults': ['FilteredResults', 'AggregatedData'],
      'AggregatedData': ['AggregatedData', 'Analysis'],
      'Analysis': ['Analysis']
    };

    return compatibilities[outputType]?.includes(inputType) || false;
  }

  private identifyTemporalDependencies(): void {
    const nodeArray = Array.from(this.nodes.values());
    
    // Add temporal dependencies for nodes with freshness requirements
    for (const node of nodeArray) {
      for (const input of node.inputs) {
        if (input.freshness_requirement) {
          // Find nodes that provide this input
          const providers = nodeArray.filter(n => 
            n.outputs.some(o => o.type === input.type)
          );
          
          for (const provider of providers) {
            if (provider.id !== node.id) {
              this.edges.push({
                from: provider.id,
                to: node.id,
                dependency_type: 'temporal',
                is_critical: true,
                can_be_relaxed: false
              });
            }
          }
        }
      }
    }
  }

  private identifyResourceDependencies(): void {
    const nodeArray = Array.from(this.nodes.values());
    
    // Group nodes by resource usage
    const resourceGroups: Map<string, DependencyNode[]> = new Map();
    
    for (const constraint of this.resourceConstraints) {
      const affectedNodes = nodeArray.filter(node => 
        constraint.affects.includes(node.primitive)
      );
      
      if (affectedNodes.length > 1) {
        resourceGroups.set(constraint.type, affectedNodes);
      }
    }
    
    // Add resource dependencies for nodes that can't run in parallel
    for (const [resourceType, nodes] of resourceGroups) {
      if (resourceType === 'api_rate_limit') {
        // Create sequential dependencies for API-limited operations
        for (let i = 0; i < nodes.length - 1; i++) {
          this.edges.push({
            from: nodes[i].id,
            to: nodes[i + 1].id,
            dependency_type: 'resource',
            is_critical: false,
            can_be_relaxed: true
          });
        }
      }
    }
  }

  private findCriticalPath(): string[] {
    // Implement critical path method (CPM)
    const nodeArray = Array.from(this.nodes.values());
    const earliestStart: Map<string, number> = new Map();
    const latestStart: Map<string, number> = new Map();
    
    // Forward pass - calculate earliest start times
    const visited: Set<string> = new Set();
    const visit = (nodeId: string): number => {
      if (visited.has(nodeId)) return earliestStart.get(nodeId) || 0;
      visited.add(nodeId);
      
      const node = this.nodes.get(nodeId)!;
      const dependencies = this.edges
        .filter(e => e.to === nodeId && e.is_critical)
        .map(e => e.from);
      
      if (dependencies.length === 0) {
        earliestStart.set(nodeId, 0);
        return 0;
      }
      
      const maxPredecessor = Math.max(
        ...dependencies.map(depId => {
          const depNode = this.nodes.get(depId)!;
          return visit(depId) + depNode.estimated_duration;
        })
      );
      
      earliestStart.set(nodeId, maxPredecessor);
      return maxPredecessor;
    };
    
    // Calculate earliest start for all nodes
    for (const node of nodeArray) {
      visit(node.id);
    }
    
    // Find the critical path
    const endNodes = nodeArray.filter(node => 
      !this.edges.some(e => e.from === node.id && e.is_critical)
    );
    
    const totalDuration = Math.max(
      ...endNodes.map(node => 
        (earliestStart.get(node.id) || 0) + node.estimated_duration
      )
    );
    
    // Backward pass to find critical path
    const criticalPath: string[] = [];
    const findCriticalNodes = (nodeId: string, currentTime: number) => {
      const node = this.nodes.get(nodeId)!;
      const nodeStart = earliestStart.get(nodeId) || 0;
      
      if (nodeStart + node.estimated_duration === currentTime) {
        criticalPath.unshift(nodeId);
        
        const predecessors = this.edges
          .filter(e => e.to === nodeId && e.is_critical)
          .map(e => e.from);
        
        for (const predId of predecessors) {
          findCriticalNodes(predId, nodeStart);
        }
      }
    };
    
    // Start from end nodes on critical path
    for (const endNode of endNodes) {
      const endTime = (earliestStart.get(endNode.id) || 0) + endNode.estimated_duration;
      if (endTime === totalDuration) {
        findCriticalNodes(endNode.id, totalDuration);
      }
    }
    
    return criticalPath;
  }

  private identifyParallelGroups(): ParallelExecutionGroup[] {
    const groups: ParallelExecutionGroup[] = [];
    const nodeArray = Array.from(this.nodes.values());
    const processed: Set<string> = new Set();
    
    // Find nodes with no dependencies on each other
    for (let i = 0; i < nodeArray.length; i++) {
      if (processed.has(nodeArray[i].id)) continue;
      
      const group: string[] = [nodeArray[i].id];
      processed.add(nodeArray[i].id);
      
      for (let j = i + 1; j < nodeArray.length; j++) {
        if (processed.has(nodeArray[j].id)) continue;
        
        // Check if nodes can run in parallel
        const hasDirectDependency = this.edges.some(e => 
          (e.from === nodeArray[i].id && e.to === nodeArray[j].id) ||
          (e.from === nodeArray[j].id && e.to === nodeArray[i].id)
        );
        
        if (!hasDirectDependency && this.canRunInParallel(nodeArray[i], nodeArray[j])) {
          group.push(nodeArray[j].id);
          processed.add(nodeArray[j].id);
        }
      }
      
      if (group.length > 1) {
        groups.push({
          group_id: `parallel_group_${groups.length + 1}`,
          primitives: group,
          max_parallelism: this.calculateMaxParallelism(group),
          resource_constraints: this.getGroupConstraints(group)
        });
      }
    }
    
    return groups;
  }

  private canRunInParallel(node1: DependencyNode, node2: DependencyNode): boolean {
    // Check resource constraints
    for (const constraint of this.resourceConstraints) {
      if (constraint.affects.includes(node1.primitive) && 
          constraint.affects.includes(node2.primitive)) {
        // Check if combined resource usage exceeds limit
        if (constraint.type === 'api_rate_limit') {
          return false; // Can't parallelize API calls
        }
      }
    }
    
    return true;
  }

  private calculateMaxParallelism(nodeIds: string[]): number {
    // Calculate based on resource constraints
    let maxParallel = nodeIds.length;
    
    for (const constraint of this.resourceConstraints) {
      if (constraint.type === 'api_rate_limit') {
        const apiNodes = nodeIds.filter(id => {
          const node = this.nodes.get(id)!;
          return constraint.affects.includes(node.primitive);
        });
        
        if (apiNodes.length > 0) {
          // Limit parallelism based on rate limit
          maxParallel = Math.min(maxParallel, Math.floor(constraint.limit / 10));
        }
      }
    }
    
    return Math.max(1, maxParallel);
  }

  private getGroupConstraints(nodeIds: string[]): ResourceConstraint[] {
    const relevantConstraints: ResourceConstraint[] = [];
    
    for (const constraint of this.resourceConstraints) {
      const affectedNodes = nodeIds.filter(id => {
        const node = this.nodes.get(id)!;
        return constraint.affects.includes(node.primitive);
      });
      
      if (affectedNodes.length > 0) {
        relevantConstraints.push(constraint);
      }
    }
    
    return relevantConstraints;
  }

  // Utility method to visualize the dependency graph
  visualizeDependencyGraph(): string {
    const lines: string[] = ['Dependency Graph:'];
    
    // Show nodes
    lines.push('\nNodes:');
    for (const node of this.nodes.values()) {
      lines.push(`  ${node.id} (${node.primitive}): ${node.purpose}`);
      lines.push(`    Duration: ${node.estimated_duration}s`);
      if (node.can_fail) {
        lines.push(`    Fallback: ${node.fallback_strategy}`);
      }
    }
    
    // Show edges
    lines.push('\nDependencies:');
    for (const edge of this.edges) {
      const critical = edge.is_critical ? '[CRITICAL]' : '';
      lines.push(`  ${edge.from} → ${edge.to} (${edge.dependency_type}) ${critical}`);
    }
    
    // Show critical path
    const criticalPath = this.findCriticalPath();
    lines.push(`\nCritical Path: ${criticalPath.join(' → ')}`);
    
    // Show parallel groups
    const parallelGroups = this.identifyParallelGroups();
    lines.push('\nParallel Execution Groups:');
    for (const group of parallelGroups) {
      lines.push(`  ${group.group_id}: [${group.primitives.join(', ')}]`);
      lines.push(`    Max parallelism: ${group.max_parallelism}`);
    }
    
    return lines.join('\n');
  }
}