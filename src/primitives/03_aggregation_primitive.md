# Aggregation Primitive: Data Combination and Synthesis

## YAML Frontmatter
```yaml
---
primitive_type: "aggregation"
version: "1.0.0"
description: "Data combination and synthesis from multiple sources with evidence weighting"
composable: true
agentic_levels: ["prescriptive", "guided", "autonomous"]
required_tools: ["web_search_exa", "company_research_exa"]
optional_tools: ["wikipedia_search_exa", "linkedin_search_exa"]
---
```

## Overview

The Aggregation Primitive combines and synthesizes filtered data from multiple sources, creating coherent insights while maintaining source attribution and evidence weighting.

## Input Parameters

### Required Parameters
- `input_data`: Array of filtered data objects from filtering primitive
- `aggregation_strategy`: Object defining how to combine and synthesize data
- `agentic_level`: One of ["prescriptive", "guided", "autonomous"]

### Aggregation Strategy Structure
```json
{
  "aggregation_method": "thematic_synthesis",
  "grouping_criteria": ["source_type", "confidence_level", "temporal"],
  "synthesis_approach": "evidence_weighted",
  "output_structure": {
    "sections": ["executive_summary", "detailed_analysis", "source_summary"],
    "format": "structured_report"
  }
}
```

## Aggregation Methods

### 1. Thematic Synthesis
Groups data by themes/topics and synthesizes insights:
```json
{
  "aggregation_method": "thematic_synthesis",
  "grouping_criteria": ["topic", "sentiment", "source_credibility"],
  "synthesis_approach": "weighted_consensus"
}
```

### 2. Temporal Analysis
Organizes data chronologically for trend analysis:
```json
{
  "aggregation_method": "temporal_analysis",
  "grouping_criteria": ["date", "event_type"],
  "synthesis_approach": "timeline_synthesis"
}
```

### 3. Comparative Analysis
Compares entities or metrics across sources:
```json
{
  "aggregation_method": "comparative_analysis",
  "grouping_criteria": ["entity", "metric_type"],
  "synthesis_approach": "normalized_comparison"
}
```

## Execution by Agentic Level

### Prescriptive Level (Structured Synthesis)
```
Phase 1: Data Organization
1. Group data by specified criteria
2. Apply exact aggregation rules
3. Calculate weighted averages
4. Generate structured output

Phase 2: Quality Assurance
5. Validate data completeness
6. Check source attribution
7. Ensure evidence weighting
8. Generate confidence metrics
```

### Guided Level (Adaptive Synthesis)
```
Phase 1: Intelligent Grouping
1. Analyze data patterns for optimal grouping
2. Adapt synthesis approach based on data characteristics
3. Balance multiple perspectives
4. Identify key insights

Phase 2: Comprehensive Synthesis
5. Create coherent narrative
6. Highlight conflicting information
7. Provide evidence weighting
8. Generate actionable insights
```

### Autonomous Level (Creative Synthesis)
```
Phase 1: Strategic Synthesis
1. Identify optimal aggregation strategies
2. Create novel insight combinations
3. Apply advanced analytical techniques
4. Generate strategic implications

Phase 2: Advanced Analysis
5. Design comprehensive synthesis approaches
6. Apply statistical methods
7. Create predictive insights
8. Generate strategic recommendations
```

## Output Format

### Standard Output Structure
```json
{
  "primitive_type": "aggregation",
  "execution_id": "aggregate_2025_01_16_003",
  "aggregation_strategy": {
    "method": "thematic_synthesis",
    "grouping_criteria": ["source_type", "confidence_level"]
  },
  "results": {
    "synthesized_insights": {
      "executive_summary": "Comprehensive analysis reveals strong market position...",
      "key_findings": [
        {
          "theme": "Financial Performance",
          "summary": "Strong revenue growth across all quarters",
          "evidence": [
            {
              "source": "Q3 2024 earnings report",
              "confidence": 0.95,
              "weight": 0.4,
              "key_points": ["15% YoY growth", "Beat analyst expectations"]
            },
            {
              "source": "Market analysis report",
              "confidence": 0.87,
              "weight": 0.3,
              "key_points": ["Market leadership maintained", "Competitive advantages"]
            }
          ],
          "consensus_score": 0.91
        }
      ],
      "conflicting_information": [
        {
          "topic": "Future growth projections",
          "conflicts": [
            {
              "source": "Bullish analyst",
              "position": "20% growth expected",
              "confidence": 0.78
            },
            {
              "source": "Conservative analyst",
              "position": "10% growth expected",
              "confidence": 0.82
            }
          ],
          "resolution": "Average consensus: 15% growth"
        }
      ],
      "data_quality_metrics": {
        "total_sources": 12,
        "high_confidence_sources": 8,
        "medium_confidence_sources": 3,
        "low_confidence_sources": 1,
        "temporal_coverage": "2024-01-01 to 2025-01-15"
      }
    },
    "source_attribution": {
      "primary_sources": [
        {
          "source": "Company financial reports",
          "contribution": 0.35,
          "reliability": 0.95
        },
        {
          "source": "Market research firms",
          "contribution": 0.25,
          "reliability": 0.87
        }
      ]
    }
  },
  "metadata": {
    "execution_time_ms": 2400,
    "items_processed": 67,
    "items_grouped": 5,
    "next_recommended_primitive": "reasoning"
  }
}
```

## Quality Metrics

### Data Quality Indicators
- **Source Diversity**: Number of unique source types
- **Confidence Distribution**: Spread of confidence scores
- **Temporal Coverage**: Time span of data
- **Attribution Completeness**: Percentage of sources with proper attribution

### Synthesis Quality
- **Consensus Score**: Agreement between sources (0.0-1.0)
- **Evidence Weighting**: Proper weighting by source quality
- **Completeness**: Coverage of key topics
- **Coherence**: Logical consistency of synthesized insights

## Usage Examples

### Basic Thematic Synthesis
```json
{
  "input_data": [/* filtered data from previous primitive */],
  "aggregation_strategy": {
    "aggregation_method": "thematic_synthesis",
    "grouping_criteria": ["topic", "sentiment"],
    "synthesis_approach": "evidence_weighted"
  },
  "agentic_level": "prescriptive"
}
```

### Advanced Market Analysis
```json
{
  "input_data": [/* comprehensive market data */],
  "aggregation_strategy": {
    "aggregation_method": "comparative_analysis",
    "grouping_criteria": ["company", "metric_type", "time_period"],
    "synthesis_approach": "normalized_comparison",
    "output_structure": {
      "sections": ["market_overview", "competitive_positioning", "trend_analysis"],
      "format": "executive_report"
    }
  },
  "agentic_level": "autonomous"
}
```

## Error Handling

### Data Quality Issues
```javascript
const handleQualityIssues = (input_data) => {
  const quality_issues = [];
  
  if (input_data.length < 3) {
    quality_issues.push("Insufficient data for meaningful synthesis");
  }
  
  const avg_confidence = input_data.reduce((sum, item) => sum + item.confidence, 0) / input_data.length;
  if (avg_confidence < 0.6) {
    quality_issues.push("Low average confidence score");
  }
  
  return {
    can_proceed: quality_issues.length === 0,
    issues: quality_issues,
    recommendations: generateRecommendations(quality_issues)
  };
};
```

### Synthesis Failures
```javascript
const handleSynthesisFailure = (error) => {
  if (error.type === 'insufficient_data') {
    return {
      status: 'partial_synthesis',
      message: 'Synthesis completed with limited data',
      confidence: 0.6,
      recommendations: ['Collect additional sources', 'Reduce filtering strictness']
    };
  }
  
  throw error;
};
```

## Performance Optimization

### Caching Strategy
```javascript
const cacheConfig = {
  aggregation_results: {
    ttl: 21600000, // 6 hours
    key: (strategy, data_hash) => `agg:${strategy.method}:${data_hash}`
  },
  
  source_weights: {
    ttl: 86400000, // 24 hours
    key: (source_type) => `weights:${source_type}`
  }
};
```

### Batch Processing
```javascript
const batchProcessor = {
  max_batch_size: 100,
  
  processBatch: async (data_batches) => {
    const results = await Promise.all(
      data_batches.map(batch => executeAggregation(batch))
    );
    
    return mergeBatchResults(results);
  }
};
```

## Testing Guidelines

### Unit Tests
```javascript
describe('Aggregation Primitive', () => {
  test('should synthesize thematic data correctly', async () => {
    const result = await aggregationPrimitive.execute({
      input_data: mockThematicData,
      aggregation_strategy: { method: 'thematic_synthesis' },
      agentic_level: 'prescriptive'
    });
    
    expect(result.synthesized_insights).toHaveProperty('key_findings');
    expect(result.synthesized_insights.key_findings).toHaveLength(3);
  });
});
```

### Integration Tests
```javascript
describe('Primitive Pipeline', () => {
  test('should complete full workflow', async () => {
    const queryResult = await queryingPrimitive.execute(queryParams);
    const filterResult = await filteringPrimitive.execute({
      input_data: queryResult.results,
      ...filterParams
    });
    const aggregateResult = await aggregationPrimitive.execute({
      input_data: filterResult.filtered_data,
      ...aggregateParams
    });
    
    expect(aggregateResult.synthesized_insights).toBeDefined();
    expect(aggregateResult.metadata.items_processed).toBeGreaterThan(0);
  });
});