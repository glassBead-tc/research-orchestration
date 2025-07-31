import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the built server module
async function testEnhancedOrchestration() {
  try {
    console.log('🧪 Testing Enhanced Orchestration Reasoning\n');
    
    // Import the built module
    const serverModule = await import(join(__dirname, '.smithery', 'index.cjs'));
    
    // Create a mock MCP server
    const mockServer = {
      tools: new Map(),
      tool: function(name, description, schema, handler) {
        this.tools.set(name, { name, description, schema, handler });
      }
    };
    
    // Register the orchestration reasoning tool
    if (serverModule.registerOrchestrationReasoning) {
      serverModule.registerOrchestrationReasoning(mockServer);
    } else {
      // Try default export
      const server = serverModule.default || serverModule;
      if (server.registerOrchestrationReasoning) {
        server.registerOrchestrationReasoning(mockServer);
      }
    }
    
    // Get the orchestration reasoning tool
    const orchestrationTool = mockServer.tools.get('orchestration_reasoning');
    if (!orchestrationTool) {
      console.error('❌ Orchestration reasoning tool not found');
      return;
    }
    
    // Test input
    const testInput = {
      information_need: 'Analyze the competitive landscape for AI-powered code analysis tools, including market leaders, emerging startups, technology differentiation, and customer adoption patterns',
      context: {
        domain: 'business-intelligence',
        complexity: 'high',
        time_constraint: '1-2 hours',
        quality_requirements: 'Comprehensive analysis with technology deep-dive',
        available_tools: [
          'web_search_exa',
          'company_research_exa',
          'github_search_exa',
          'competitor_finder_exa'
        ]
      },
      reasoning_depth: 'deep',
      reference_patterns: true,
      agentic_level: 'autonomous'
    };
    
    console.log('📋 Test Input:', JSON.stringify(testInput, null, 2));
    console.log('\n' + '='.repeat(80) + '\n');
    
    // Execute the tool
    console.log('🚀 Executing orchestration reasoning...\n');
    const result = await orchestrationTool.handler(testInput);
    
    // Parse and display the result
    if (result && result.content && result.content[0]) {
      const output = JSON.parse(result.content[0].text);
      
      console.log('📊 Orchestration Plan Generated:\n');
      console.log(`Plan ID: ${output.plan_id}`);
      console.log(`Information Need: ${output.information_need}`);
      
      // Display reasoning chain summary
      if (output.reasoning_chain) {
        console.log('\n🔄 Reasoning Chain:');
        const chain = output.reasoning_chain;
        
        if (chain.phase_1_need_analysis) {
          console.log('\n  Phase 1 - Need Analysis:');
          console.log(`    Components: ${chain.phase_1_need_analysis.components.join(', ')}`);
          console.log(`    Scope: ${chain.phase_1_need_analysis.scope}`);
        }
        
        if (chain.phase_4_sequence_design) {
          console.log('\n  Phase 4 - Sequence Design:');
          console.log(`    Primitives: ${chain.phase_4_sequence_design.primitive_sequence.length}`);
          console.log(`    Integration: ${chain.phase_4_sequence_design.integration_strategy}`);
          console.log(`    Complexity: ${chain.phase_4_sequence_design.estimated_complexity}`);
        }
      }
      
      // Display sequential reasoning if available
      if (output.sequential_reasoning) {
        console.log('\n✨ Enhanced Sequential Reasoning:');
        
        // Thinking steps
        if (output.sequential_reasoning.thinking_steps) {
          console.log('\n  💭 Thinking Process:');
          const steps = output.sequential_reasoning.thinking_steps;
          console.log(`    Total thoughts: ${steps.length}`);
          
          // Show first few thoughts
          steps.slice(0, 3).forEach(step => {
            console.log(`\n    Thought ${step.thoughtNumber} (${step.thoughtType}):`);
            console.log(`      "${step.thought}"`);
            console.log(`      Confidence: ${step.confidence}`);
            if (step.keyInsights.length > 0) {
              console.log(`      Insights: ${step.keyInsights.join('; ')}`);
            }
          });
          
          if (steps.length > 3) {
            console.log(`\n    ... and ${steps.length - 3} more thoughts`);
          }
        }
        
        // Dependency analysis
        if (output.sequential_reasoning.dependency_analysis) {
          const deps = output.sequential_reasoning.dependency_analysis;
          console.log('\n  🔗 Dependency Analysis:');
          console.log(`    Nodes: ${deps.nodes.length}`);
          console.log(`    Edges: ${deps.edges.length}`);
          console.log(`    Critical Path: ${deps.critical_path.join(' → ')}`);
          
          if (deps.parallel_opportunities.length > 0) {
            console.log(`    Parallel Opportunities: ${deps.parallel_opportunities.length} groups`);
            deps.parallel_opportunities.forEach((group, idx) => {
              console.log(`      Group ${idx + 1}: ${group.primitives.join(', ')} (max parallelism: ${group.max_parallelism})`);
            });
          }
        }
        
        // Execution plan
        if (output.sequential_reasoning.execution_plan) {
          const plan = output.sequential_reasoning.execution_plan;
          console.log('\n  📋 Execution Plan:');
          console.log(`    Type: ${plan.plan_type}`);
          console.log(`    Stages: ${plan.stages.length}`);
          console.log(`    Total Duration: ${plan.total_duration_estimate}s`);
          console.log(`    Critical Path Duration: ${plan.critical_path_duration}s`);
          
          console.log('\n    Stage Details:');
          plan.stages.forEach(stage => {
            console.log(`      Stage ${stage.stage_number + 1}: ${stage.stage_name}`);
            console.log(`        Duration: ${stage.estimated_duration}s`);
            console.log(`        Checkpoint: ${stage.checkpoint.checkpoint_id}`);
          });
        }
      }
      
      // Display execution metadata
      if (output.execution_metadata) {
        console.log('\n⚙️  Execution Metadata:');
        console.log(`  Estimated Duration: ${output.execution_metadata.estimated_duration}`);
        console.log(`  API Calls: ${output.execution_metadata.resource_requirements.api_calls}`);
        console.log(`  Complexity: ${output.execution_metadata.resource_requirements.processing_complexity}`);
      }
      
      console.log('\n✅ Test completed successfully!');
    }
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testEnhancedOrchestration();