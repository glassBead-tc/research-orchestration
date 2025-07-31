#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test the enhanced orchestration reasoning with sequential thinking
const testRequest = {
  method: 'tools/call',
  params: {
    name: 'orchestration_reasoning',
    arguments: {
      information_need: 'Conduct comprehensive market research for a new AI-powered healthcare startup, including competitor analysis, technology landscape assessment, regulatory considerations, customer sentiment analysis, and investment trends',
      context: {
        domain: 'business-intelligence',
        complexity: 'high',
        time_constraint: '2-3 hours for comprehensive analysis',
        quality_requirements: 'Investment-grade analysis with cross-validated data from multiple sources',
        available_tools: [
          'web_search_exa',
          'research_paper_search_exa',
          'company_research_exa',
          'competitor_finder_exa',
          'linkedin_search_exa',
          'github_search_exa',
          'scrape_reddit_exa'
        ]
      },
      reasoning_depth: 'deep',
      reference_patterns: true,
      agentic_level: 'guided'
    }
  }
};

console.log('🧪 Testing Enhanced Orchestration Reasoning with Sequential Thinking\n');
console.log('📋 Request:', JSON.stringify(testRequest.params.arguments, null, 2));
console.log('\n' + '='.repeat(80) + '\n');

// Run the server and send the test request
const serverPath = path.join(__dirname, '.smithery', 'index.cjs');
const server = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env: { ...process.env, NODE_ENV: 'development' }
});

let output = '';
let errorOutput = '';

server.stdout.on('data', (data) => {
  const text = data.toString();
  output += text;
  
  // Try to parse and display structured output
  try {
    const lines = text.split('\n').filter(line => line.trim());
    for (const line of lines) {
      if (line.startsWith('{')) {
        const parsed = JSON.parse(line);
        if (parsed.sequential_reasoning) {
          console.log('\n🎯 Sequential Reasoning Output:\n');
          
          // Display thinking steps
          if (parsed.sequential_reasoning.thinking_steps) {
            console.log('💭 Thinking Process:');
            parsed.sequential_reasoning.thinking_steps.forEach((step, idx) => {
              console.log(`\n  Step ${step.thoughtNumber}: ${step.thought}`);
              console.log(`  Type: ${step.thoughtType}`);
              console.log(`  Confidence: ${step.confidence}`);
              if (step.keyInsights.length > 0) {
                console.log(`  Insights: ${step.keyInsights.join(', ')}`);
              }
            });
          }
          
          // Display dependency analysis
          if (parsed.sequential_reasoning.dependency_analysis) {
            const deps = parsed.sequential_reasoning.dependency_analysis;
            console.log('\n🔗 Dependency Analysis:');
            console.log(`  Nodes: ${deps.nodes.length}`);
            console.log(`  Critical Path: ${deps.critical_path.join(' → ')}`);
            console.log(`  Parallel Groups: ${deps.parallel_opportunities.length}`);
          }
          
          // Display execution plan
          if (parsed.sequential_reasoning.execution_plan) {
            const plan = parsed.sequential_reasoning.execution_plan;
            console.log('\n📋 Execution Plan:');
            console.log(`  Type: ${plan.plan_type}`);
            console.log(`  Stages: ${plan.stages.length}`);
            console.log(`  Total Duration: ${plan.total_duration_estimate}s`);
            console.log(`  Critical Path Duration: ${plan.critical_path_duration}s`);
          }
        } else {
          console.log(JSON.stringify(parsed, null, 2));
        }
      } else if (line.includes('Phase') || line.includes('🔧') || line.includes('💭')) {
        console.log(line);
      }
    }
  } catch (e) {
    // If not JSON, just print the line
    if (text.trim()) console.log(text.trim());
  }
});

server.stderr.on('data', (data) => {
  errorOutput += data.toString();
});

// Send the test request after a short delay
setTimeout(() => {
  const request = JSON.stringify(testRequest) + '\n';
  server.stdin.write(request);
}, 1000);

// Close after receiving response
setTimeout(() => {
  server.kill();
  
  if (errorOutput) {
    console.error('\n❌ Errors:', errorOutput);
  }
  
  console.log('\n✅ Test completed');
}, 5000);

server.on('close', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`\n❌ Server exited with code ${code}`);
  }
});