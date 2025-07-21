# Reasoning Primitive: Structured Analysis and Inference

## YAML Frontmatter
```yaml
---
primitive_type: "reasoning"
version: "1.0.0"
description: "Structured reasoning and inference generation using aggregated data"
composable: true
agentic_levels: ["prescriptive", "guided", "autonomous"]
required_tools: ["web_search_exa", "company_research_exa"]
optional_tools: ["wikipedia_search_exa", "linkedin_search_exa"]
---
```

## Overview

The Reasoning Primitive applies structured reasoning frameworks to aggregated data, generating insights, recommendations, and strategic analysis based on the synthesized information.

## Input Parameters

### Required Parameters
- `input_data`: Aggregated data from the aggregation primitive
- `reasoning_objective`: Specific goal for the reasoning process
- `reasoning_framework`: Structured approach for analysis (e.g., "swot_analysis", "investment_analysis")
- `agentic_level`: One of ["prescriptive", "guided", "autonomous"]

### Optional Parameters
- `context_hints`: Additional context for reasoning (domain, focus areas, constraints)
- `confidence_threshold`: Minimum confidence for accepting reasoning conclusions
- `output_format`: Desired format for reasoning results

## Reasoning Frameworks

### 1. SWOT Analysis
```json
{
  "reasoning_framework": "swot_analysis",
  "reasoning_objective": "Evaluate strategic position for investment decision",
  "context_hints": {
    "domain": "investment_strategy",
    "focus_areas": ["financial_health", "competitive_position", "growth_potential"]
  }
}
```

### 2. Investment Analysis
```json
{
  "reasoning_framework": "investment_analysis",
  "reasoning_objective": "Generate buy/sell/hold recommendation",
  "context_hints": {
    "investment_horizon": "long_term",
    "risk_tolerance": "moderate",
    "portfolio_context": "growth_focused"
  }
}
```

### 3. Competitive Analysis
```json
{
  "reasoning_framework": "competitive_analysis",
  "reasoning_objective": "Assess competitive positioning and market opportunities",
  "context_hints": {
    "market_scope": "global",
    "competitive_set": ["Company A", "Company B", "Company C"],
    "analysis_depth": "strategic"
  }
}
```

### 4. Risk Assessment
```json
{
  "reasoning_framework": "risk_assessment",
  "reasoning_objective": "Identify and quantify key risks",
  "context_hints": {
    "risk_categories": ["financial", "operational", "market", "regulatory"],
    "time_horizon": "12_months"
  }
}
```

## Execution by Agentic Level

### Prescriptive Level (Rule-Based Reasoning)
```
Phase 1: Framework Application
1. Apply predefined reasoning rules
2. Calculate framework-specific metrics
3. Generate structured conclusions
4. Provide confidence scores

Phase 2: Validation
5. Cross-check against established criteria
6. Validate logical consistency
7. Ensure evidence alignment
8. Generate final recommendations
```

### Guided Level (Balanced Reasoning)
```
Phase 1: Intelligent Analysis
1. Adapt reasoning approach based on data characteristics
2. Balance multiple analytical perspectives
3. Identify key insights and patterns
4. Generate nuanced conclusions

Phase 2: Comprehensive Evaluation
5. Consider edge cases and exceptions
6. Provide balanced recommendations
7. Highlight areas of uncertainty
8. Suggest follow-up analysis
```

### Autonomous Level (Advanced Reasoning)
```
Phase 1: Strategic Reasoning
1. Apply advanced analytical techniques
2. Generate novel insights and connections
3. Create predictive models
4. Develop strategic scenarios

Phase 2: Advanced Synthesis
5. Design comprehensive reasoning frameworks
6. Apply statistical and ML techniques
7. Generate strategic recommendations
8. Create implementation roadmaps
```

## Output Format

### Standard Reasoning Output
```json
{
  "primitive_type": "reasoning",
  "execution_id": "reason_2025_01_16_004",
  "reasoning_framework": "swot_analysis",
  "reasoning_objective": "Evaluate Tesla's strategic investment potential",
  "results": {
    "analysis": {
      "executive_summary": "Tesla presents a strong investment opportunity with solid fundamentals and growth potential, balanced against execution risks and market volatility.",
      "strengths": [
        {
          "factor": "Market Leadership",
          "description": "Dominant position in EV market with 23% global market share",
          "evidence": [
            {
              "source": "Q3 2024 market analysis",
              "data_point": "23% global EV market share",
              "confidence": 0.92
            }
          ],
          "impact_score": 0.9,
          "confidence": 0.89
        },
        {
          "factor": "Financial Performance",
          "description": "Strong revenue growth and improving margins",
          "evidence": [
            {
              "source": "Q3 2024 earnings",
              "data_point": "15% YoY revenue growth",
              "confidence": 0.95
            },
            {
              "source": "Margin analysis",
              "data_point": "Gross margin improved to 19.3%",
              "confidence": 0.91
            }
          ],
          "impact_score": 0.85,
          "confidence": 0.93
        }
      ],
      "weaknesses": [
        {
          "factor": "Execution Risk",
          "description": "History of production delays and quality issues",
          "evidence": [
            {
              "source": "Production reports",
              "data_point": "Cybertruck production 6 months behind schedule",
              "confidence": 0.88
            }
          ],
          "impact_score": 0.7,
          "confidence": 0.85
        }
      ],
      "opportunities": [
        {
          "factor": "AI and Autonomy",
          "description": "Significant upside from Full Self-Driving technology",
          "evidence": [
            {
              "source": "Technology analysis",
              "data_point": "FSD revenue potential $50B by 2030",
              "confidence": 0.75
            }
          ],
          "impact_score": 0.95,
          "confidence": 0.72
        }
      ],
      "threats": [
        {
          "factor": "Competition",
          "description": "Increasing competition from traditional automakers",
          "evidence": [
            {
              "source": "Competitive analysis",
              "data_point": "Ford, GM, VW ramping EV production",
              "confidence": 0.9
            }
          ],
          "impact_score": 0.8,
          "confidence": 0.88
        }
      ]
    },
    "recommendations": [
      {
        "recommendation": "BUY",
        "rationale": "Strong fundamentals, market leadership, and significant growth opportunities outweigh execution risks",
        "confidence": 0.87,
        "time_horizon": "12-18 months",
        "risk_level": "moderate",
        "price_target": {
          "base_case": 280,
          "bull_case": 350,
          "bear_case": 200
        }
      }
    ],
    "risk_assessment": {
      "overall_risk": "moderate",
      "risk_factors": [
        {
          "factor": "Execution Risk",
          "probability": 0.4,
          "impact": "high",
          "mitigation": "Monitor production milestones"
        },
        {
          "factor": "Market Volatility",
          "probability": 0.6,
          "impact": "medium",
          "mitigation": "Diversified portfolio approach"
        }
      ]
    },
    "confidence_metrics": {
      "overall_confidence": 0.87,
      "data_quality": 0.91,
      "analysis_completeness": 0.89,
      "evidence_strength": 0.85
    }
  },
  "metadata": {
    "execution_time_ms": 3800,
    "sources_analyzed": 12,
    "framework_applied": "swot_analysis",
    "next_recommended_action": "monitor_quarterly_results"
  }
}
```

## Advanced Reasoning Features

### 1. Scenario Analysis
```json
{
  "reasoning_framework": "scenario_analysis",
  "reasoning_objective": "Evaluate potential outcomes under different market conditions",
  "context_hints": {
    "scenarios": ["bull_market", "bear_market", "recession", "regulatory_change"],
    "time_horizon": "24_months"
  }
}
```

### 2. Sensitivity Analysis
```json
{
  "reasoning_framework": "sensitivity_analysis",
  "reasoning_objective": "Identify key value drivers and their impact",
  "context_hints": {
    "variables": ["revenue_growth", "margin_expansion", "market_share"],
    "sensitivity_range": [-20%, +20%]
  }
}
```

### 3. Monte Carlo Simulation
```json
{
  "reasoning_framework": "monte_carlo",
  "reasoning_objective": "Generate probabilistic outcomes for investment returns",
  "context_hints": {
    "simulations": 10000,
    "variables": ["stock_price", "earnings", "market_conditions"],
    "confidence_intervals": [5, 95]
  }
}
```

## Error Handling and Validation

### Input Validation
```javascript
const validateReasoningInput = (input) => {
  const errors = [];
  
  if (!input.reasoning_framework || !validFrameworks.includes(input.reasoning_framework)) {
    errors.push(`Invalid reasoning framework. Must be one of: ${validFrameworks.join(', ')}`);
  }
  
  if (!input.reasoning_objective || input.reasoning_objective.length < 10) {
    errors.push('Reasoning objective must be at least 10 characters');
  }
  
  if (!input.input_data || input.input_data.length === 0) {
    errors.push('Input data is required for reasoning');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
```

### Reasoning Quality Checks
```javascript
const qualityChecks = {
  evidence_sufficiency: (analysis) => {
    const minEvidence = 3;
    const factors = [...analysis.strengths, ...analysis.weaknesses, ...analysis.opportunities, ...analysis.threats];
    return factors.every(factor => factor.evidence.length >= minEvidence);
  },
  
  confidence_validation: (analysis) => {
    const minConfidence = 0.7;
    return analysis.confidence_metrics.overall_confidence >= minConfidence;
  },
  
  logical_consistency: (analysis) => {
    // Check for contradictions in reasoning
    return !hasContradictions(analysis);
  }
};
```

## Performance Optimization

### Caching Strategy
```javascript
const reasoningCache = {
  cache_key: (framework, objective, data_hash) => 
    `reasoning:${framework}:${objective}:${data_hash}`,
  
  ttl: 3600000, // 1 hour for dynamic reasoning
  
  invalidate_on: ['new_data', 'framework_update', 'market_events']
};
```

### Parallel Processing
```javascript
const parallelReasoning = {
  max_concurrent: 3,
  
  executeMultiple: async (frameworks, data) => {
    const results = await Promise.allSettled(
      frameworks.map(framework => 
        executeReasoning({ framework, input_data: data })
      )
    );
    
    return results.map((result, index) => ({
      framework: frameworks[index],
      success: result.status === 'fulfilled',
      analysis: result.status === 'fulfilled' ? result.value : result.reason
    }));
  }
};
```

## Testing Framework

### Unit Tests
```javascript
describe('Reasoning Primitive', () => {
  test('should generate SWOT analysis correctly', async () => {
    const result = await reasoningPrimitive.execute({
      reasoning_framework: 'swot_analysis',
      reasoning_objective: 'Evaluate investment opportunity',
      input_data: mockAggregatedData,
      agentic_level: 'prescriptive'
    });
    
    expect(result.analysis).toHaveProperty('strengths');
    expect(result.analysis).toHaveProperty('weaknesses');
    expect(result.analysis).toHaveProperty('opportunities');
    expect(result.analysis).toHaveProperty('threats');
    expect(result.recommendations).toHaveLength(1);
  });
});
```

### Integration Tests
```javascript
describe('Full Pipeline Reasoning', () => {
  test('should complete reasoning after aggregation', async () => {
    const queryResult = await queryingPrimitive.execute(queryParams);
    const filterResult = await filteringPrimitive.execute(filterParams);
    const aggregateResult = await aggregationPrimitive.execute(aggregateParams);
    const reasonResult = await reasoningPrimitive.execute({
      input_data: aggregateResult.synthesized_insights,
      reasoning_framework: 'investment_analysis',
      reasoning_objective: 'Generate investment recommendation'
    });
    
    expect(reasonResult.analysis).toBeDefined();
    expect(reasonResult.recommendations).toHaveLength(1);
    expect(reasonResult.confidence_metrics.overall_confidence).toBeGreaterThan(0.7);
  });
});
```

## Usage Examples

### Investment Decision Workflow
```javascript
const investmentReasoning = {
  reasoning_framework: "investment_analysis",
  reasoning_objective: "Generate buy/sell/hold recommendation for Tesla stock",
  input_data: aggregatedTeslaData,
  context_hints: {
    investment_horizon: "long_term",
    risk_tolerance: "moderate",
    portfolio_context: "growth_focused"
  },
  agentic_level: "guided"
};
```

### Strategic Planning Analysis
```javascript
const strategicReasoning = {
  reasoning_framework: "competitive_analysis",
  reasoning_objective: "Assess market entry strategy for new product line",
  input_data: marketResearchData,
  context_hints: {
    market_scope: "global",
    competitive_set: ["Company A", "Company B", "Company C"],
    analysis_depth: "strategic"
  },
  agentic_level: "autonomous"
};
```

### Risk Assessment
```javascript
const riskReasoning = {
  reasoning_framework: "risk_assessment",
  reasoning_objective: "Identify and quantify key risks for business expansion",
  input_data: businessAnalysisData,
  context_hints: {
    risk_categories: ["financial", "operational", "market", "regulatory"],
    time_horizon: "12_months"
  },
  agentic_level: "prescriptive"
};
```

This completes the implementation of all four retrieval-orchestration primitives.