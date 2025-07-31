import { ThoughtProcess } from '../src/utils/thoughtProcess.js';
import { DependencyAnalyzer } from '../src/utils/dependencyAnalyzer.js';

console.log('🧪 Testing Sequential Thinking Components\n');

// Test 1: ThoughtProcess
console.log('=== Test 1: ThoughtProcess ===\n');

const thoughtProcess = new ThoughtProcess(10);

// Simulate thinking about an information need
const need = 'Analyze competitive landscape for AI code analysis tools including market leaders and emerging startups';
const thought1 = thoughtProcess.analyzeInformationNeed(need);
console.log(`Thought ${thought1.thoughtNumber}: ${thought1.thought}`);
console.log(`Key Insights: ${thought1.keyInsights.join(', ')}\n`);

// Consider dependencies
const components = ['market_analysis', 'competitor_research', 'technology_assessment'];
const thought2 = thoughtProcess.considerDependencies(components);
console.log(`Thought ${thought2.thoughtNumber}: ${thought2.thought}`);
console.log(`Decision: ${thought2.decisionPoints[0].selected}`);
console.log(`Rationale: ${thought2.decisionPoints[0].rationale}\n`);

// Design primitive sequence
const thought3 = thoughtProcess.designPrimitiveSequence(components);
console.log(`Thought ${thought3.thoughtNumber}: ${thought3.thought}`);
console.log(`Selected Pattern: ${thought3.decisionPoints[0].selected}\n`);

// Test 2: DependencyAnalyzer
console.log('=== Test 2: DependencyAnalyzer ===\n');

const analyzer = new DependencyAnalyzer();

// Create sample primitive steps
const primitiveSteps = [
  {
    primitive: 'querying',
    purpose: 'market_data_collection',
    strategy: {
      target: 'market_analysis',
      sources: { primary: ['web_search_exa'], secondary: [] }
    },
    expected_output: 'market_data',
    complexity_cost: 20
  },
  {
    primitive: 'filtering',
    purpose: 'quality_filtering',
    strategy: {
      filter_rules: [{
        rule_type: 'relevance',
        field: 'score',
        operator: '>=',
        value: 0.8
      }]
    },
    expected_output: 'filtered_data',
    complexity_cost: 15
  },
  {
    primitive: 'aggregation',
    purpose: 'market_synthesis',
    strategy: {
      operations: [{ operation: 'group_by', field: 'category' }]
    },
    expected_output: 'market_insights',
    complexity_cost: 25
  },
  {
    primitive: 'reasoning',
    purpose: 'competitive_analysis',
    strategy: {
      reasoning_strategy: {
        framework: 'analytical',
        clear_thought_pattern: {
          observation: 'market_data',
          hypothesis: 'competitive_positioning',
          prediction: 'market_trends',
          verification: 'evidence_validation'
        },
        reasoning_objectives: ['identify_leaders', 'assess_gaps']
      }
    },
    expected_output: 'competitive_insights',
    complexity_cost: 30
  }
];

// Analyze dependencies
const dependencyGraph = analyzer.analyzePrimitiveSequence(primitiveSteps);

console.log('Dependency Analysis Results:');
console.log(`  Nodes: ${dependencyGraph.nodes.length}`);
console.log(`  Edges: ${dependencyGraph.edges.length}`);
console.log(`  Critical Path: ${dependencyGraph.critical_path.join(' → ')}`);
console.log(`  Parallel Opportunities: ${dependencyGraph.parallel_opportunities.length}\n`);

// Visualize the dependency graph
console.log(analyzer.visualizeDependencyGraph());

// Test 3: Integration
console.log('\n=== Test 3: Integration Summary ===\n');

const metadata = thoughtProcess.getMetadata();
console.log('Thinking Process Metadata:');
console.log(`  Total Thoughts: ${metadata.total_thoughts}`);
console.log(`  Revisions: ${metadata.revision_count}`);
console.log(`  Decision Points: ${metadata.decision_points_evaluated}`);
console.log(`  Complexity Discovered: ${metadata.complexity_discovered}`);
console.log(`  Thinking Duration: ${metadata.thinking_duration_ms}ms`);

const trajectory = thoughtProcess.getTrajectory();
console.log('\nReasoning Trajectory:');
console.log(`  Initial Hypothesis: "${trajectory.initial_hypothesis}"`);
console.log(`  Critical Insights: ${trajectory.critical_insights.length}`);
console.log(`  Confidence Progression: ${trajectory.confidence_progression.map(c => c.toFixed(2)).join(' → ')}`);

console.log('\n✅ All tests completed successfully!');