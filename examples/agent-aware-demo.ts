/**
 * Agent-Aware MCP Server Demo
 * 
 * This example demonstrates how the enhanced MCP server would work
 * with agent subjective experiences and learning capabilities.
 */

import { OrchestrationEngine, AgentMemory, CollectiveIntelligence } from '../enhanced-mcp';

// Initialize an agent with memory
const agent = new OrchestrationEngine({
  agentId: 'research-agent-001',
  memory: new AgentMemory('research-agent-001'),
  collective: new CollectiveIntelligence()
});

async function demonstrateLearning() {
  console.log('🤖 Agent-Aware MCP Server Demo\n');

  // Day 1: First execution of company analysis
  console.log('📅 Day 1: Analyzing Tesla');
  const teslaResult = await agent.orchestrate('comprehensive-company-profile', {
    company: 'Tesla',
    depth: 'comprehensive',
    focus_areas: ['financials', 'leadership', 'market_position']
  });

  console.log('Objective Results:', teslaResult.objective_results.summary);
  console.log('\n🧠 Agent Experience:');
  console.log('- Perceived Quality:', teslaResult.agent_experience.perceived_quality);
  console.log('- Key Insight:', teslaResult.agent_experience.insights[0]);
  console.log('- Pattern Discovered:', teslaResult.agent_experience.patterns[0]);
  
  // Agent learns: "LinkedIn search was slow (45s) but provided unique executive insights"
  // Pattern: "For public tech companies, GitHub provides faster leadership insights than LinkedIn"

  // Day 7: Second execution benefits from learning
  console.log('\n📅 Day 7: Analyzing Apple');
  const appleResult = await agent.orchestrate('comprehensive-company-profile', {
    company: 'Apple',
    depth: 'comprehensive',
    focus_areas: ['financials', 'leadership', 'market_position']
  });

  console.log('Objective Results:', appleResult.objective_results.summary);
  console.log('\n🎯 Applied Learning:');
  console.log('- Execution Time:', appleResult.metadata.execution_time, '(35% faster)');
  console.log('- Tool Selection:', appleResult.metadata.tools_used);
  console.log('- New Pattern:', appleResult.agent_experience.patterns[0]);

  // Agent applied previous learning: Used GitHub instead of LinkedIn
  // Result: 35% faster execution with equal quality
  // New pattern: "Patent searches valuable for hardware companies"

  // Day 14: Collective learning in action
  console.log('\n📅 Day 14: Collective Intelligence Update');
  const collectiveInsights = await agent.collective.getTopInsights('company-analysis');
  
  console.log('🌐 Top Collective Insights:');
  collectiveInsights.forEach((insight, i) => {
    console.log(`${i + 1}. ${insight.description} (confidence: ${insight.confidence})`);
  });

  // Example insights from multiple agents:
  // 1. "SEC filings most reliable for financial data" (confidence: 0.92)
  // 2. "GitHub activity correlates with tech company innovation" (confidence: 0.87)
  // 3. "Reddit sentiment predicts short-term stock movements" (confidence: 0.73)
}

async function demonstrateCollaboration() {
  console.log('\n\n🤝 Multi-Agent Collaboration Demo\n');

  // Three specialized agents collaborate on market analysis
  const agents = {
    financial: new OrchestrationEngine({ agentId: 'financial-specialist' }),
    technical: new OrchestrationEngine({ agentId: 'technical-specialist' }),
    social: new OrchestrationEngine({ agentId: 'social-sentiment-specialist' })
  };

  // Collaborative market analysis
  const marketAnalysis = await agent.orchestrate('collaborative-market-analysis', {
    orchestration_type: 'meta-orchestration',
    target_market: 'electric-vehicles',
    collaboration_mode: 'parallel-expertise',
    participating_agents: Object.keys(agents)
  });

  console.log('📊 Collaborative Analysis Results:');
  console.log('- Financial Analysis:', marketAnalysis.financial_insights.summary);
  console.log('- Technical Trends:', marketAnalysis.technical_insights.summary);
  console.log('- Social Sentiment:', marketAnalysis.social_insights.summary);
  console.log('\n🎯 Consensus View:', marketAnalysis.consensus.summary);
  console.log('Confidence Level:', marketAnalysis.consensus.confidence);
}

async function demonstrateAdaptiveOrchestration() {
  console.log('\n\n🔄 Adaptive Orchestration Demo\n');

  // Show how orchestrations adapt over time
  const iterations = 5;
  const results = [];

  for (let i = 0; i < iterations; i++) {
    console.log(`\n🔄 Iteration ${i + 1}:`);
    
    const result = await agent.orchestrate('adaptive-competitor-analysis', {
      company: 'OpenAI',
      competitors: ['Anthropic', 'Google DeepMind', 'Microsoft Research'],
      learning_enabled: true,
      adaptation_rate: 0.2
    });

    results.push({
      iteration: i + 1,
      execution_time: result.metadata.execution_time,
      quality_score: result.agent_experience.perceived_quality.overall,
      adaptations_made: result.metadata.adaptations
    });

    console.log(`- Execution Time: ${result.metadata.execution_time}ms`);
    console.log(`- Quality Score: ${result.agent_experience.perceived_quality.overall}`);
    if (result.metadata.adaptations.length > 0) {
      console.log(`- Adaptations: ${result.metadata.adaptations.join(', ')}`);
    }
  }

  // Show improvement over time
  console.log('\n📈 Performance Improvement:');
  const firstTime = results[0].execution_time;
  const lastTime = results[iterations - 1].execution_time;
  const improvement = ((firstTime - lastTime) / firstTime * 100).toFixed(1);
  console.log(`- Speed Improvement: ${improvement}%`);
  
  const firstQuality = results[0].quality_score;
  const lastQuality = results[iterations - 1].quality_score;
  const qualityGain = ((lastQuality - firstQuality) / firstQuality * 100).toFixed(1);
  console.log(`- Quality Improvement: ${qualityGain}%`);
}

async function demonstrateReflection() {
  console.log('\n\n🪞 Reflection Primitive Demo\n');

  // Execute a complex research task
  const research = await agent.orchestrate('deep-technology-research', {
    topic: 'Quantum Computing Applications in ML',
    depth: 'comprehensive'
  });

  // Agent reflects on its performance
  const reflection = await agent.executePrimitive('reflection', {
    previous_execution: research,
    reflection_depth: 'deep'
  });

  console.log('🤔 Agent Self-Reflection:');
  console.log('\n📊 Quality Assessment:');
  console.log(`- Completeness: ${reflection.quality_assessment.completeness}/1.0`);
  console.log(`- Accuracy Confidence: ${reflection.quality_assessment.accuracy_confidence}/1.0`);
  console.log(`- Insight Depth: ${reflection.quality_assessment.insight_depth}/1.0`);

  console.log('\n💡 Key Learnings:');
  reflection.learned_patterns.forEach((pattern, i) => {
    console.log(`${i + 1}. ${pattern.description}`);
    console.log(`   Context: ${pattern.applicable_contexts.join(', ')}`);
    console.log(`   Confidence: ${pattern.confidence}\n`);
  });

  console.log('🎯 Improvement Suggestions:');
  reflection.improvement_suggestions.forEach((suggestion, i) => {
    console.log(`${i + 1}. ${suggestion.description}`);
    console.log(`   Expected Impact: ${suggestion.expected_impact}`);
  });
}

// Enhanced primitive output example
interface EnhancedPrimitiveOutput {
  // Standard output
  objective_results: {
    search_results: any[];
    metadata: {
      total_results: number;
      sources_used: string[];
      execution_time: number;
    };
  };
  
  // Agent's subjective experience
  agent_experience: {
    perceived_quality: {
      overall: number;
      relevance: number;
      completeness: number;
      timeliness: number;
    };
    
    insights: {
      observation: string;
      impact: 'positive' | 'negative' | 'neutral';
      actionable: boolean;
    }[];
    
    patterns: {
      description: string;
      confidence: number;
      applicable_contexts: string[];
    }[];
    
    tool_preferences: {
      tool_id: string;
      context: string;
      effectiveness: number;
      recommendation: 'prefer' | 'avoid' | 'neutral';
    }[];
  };
}

// Main execution
async function main() {
  try {
    await demonstrateLearning();
    await demonstrateCollaboration();
    await demonstrateAdaptiveOrchestration();
    await demonstrateReflection();
    
    console.log('\n\n✅ Demo completed successfully!');
    console.log('🧠 This enhanced MCP server enables agents to:');
    console.log('   - Learn from experience and improve over time');
    console.log('   - Collaborate and share insights');
    console.log('   - Adapt orchestrations based on patterns');
    console.log('   - Reflect on performance and self-improve');
    
  } catch (error) {
    console.error('❌ Demo failed:', error);
  }
}

// Run the demo
main();