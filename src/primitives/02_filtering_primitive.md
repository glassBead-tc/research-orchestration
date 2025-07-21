# Filtering Primitive: Flexible Rule-Based Data Filtering Workflow

## YAML Frontmatter
```yaml
---
primitive_type: "filtering"
version: "1.0.0"
description: "General data filtering with flexible rule application and quality optimization"
composable: true
agentic_levels: ["prescriptive", "guided", "autonomous"]
required_tools: []
optional_tools: ["web_search_exa", "wikipedia_search_exa", "linkedin_search_exa"]
---
```

## Overview

The Filtering Primitive applies sophisticated filtering logic to datasets, with rule interpretation varying by agentic level. It provides flexible, rule-based data filtering that adapts to different quality thresholds and processing requirements.

## Input Parameters

### Required Parameters
- `input_data`: JSON object containing data to be filtered
- `filter_rules`: Array of filtering rules to apply
- `agentic_level`: One of ["prescriptive", "guided", "autonomous"]

### Optional Parameters
- `quality_threshold`: Float between 0.0-1.0 (default: 0.7)
- `deduplication_threshold`: Float between 0.0-1.0 (default: 0.85)
- `max_filtered_items`: Integer limit (default: unlimited)
- `context_hints`: Object with domain-specific filtering guidance

### Filter Rules Structure
```json
[
  {
    "rule_type": "relevance_threshold",
    "field": "confidence_score",
    "operator": ">=",
    "value": 0.8,
    "priority": "high"
  },
  {
    "rule_type": "content_quality",
    "criteria": ["has_author", "recent_date", "credible_source"],
    "logic": "any",
    "priority": "medium"
  },
  {
    "rule_type": "deduplication",
    "method": "semantic_similarity",
    "threshold": 0.85,
    "priority": "high"
  },
  {
    "rule_type": "temporal_filter",
    "field": "published_date",
    "operator": "within",
    "value": {"start": "2024-01-01", "end": "2025-01-16"}
  }
]
```

## Execution by Agentic Level

### Prescriptive Level (Strict Rule Application)
```
Phase 1: Rule Application
1. Apply filter rules exactly as specified
2. Use strict boolean logic for all conditions
3. Execute rules in priority order
4. No interpretation or adaptation

Phase 2: Quality Filtering
5. Apply quality threshold strictly
6. Remove items below threshold
7. Generate filtered dataset
8. Provide filtered count and quality metrics
```

### Guided Level (Adaptive Filtering)
```
Phase 1: Contextual Assessment
1. Analyze data characteristics for optimal filtering
2. Adapt rule thresholds based on data patterns
3. Balance competing rule priorities
4. Apply contextual understanding to criteria

Phase 2: Intelligent Filtering
5. Adjust thresholds based on data quality
6. Apply domain-specific filtering rules
7. Balance completeness vs quality
8. Provide reasoning for filtering decisions
```

### Autonomous Level (Creative Filtering)
```
Phase 1: Pattern Recognition
1. Identify data patterns for optimal filtering
2. Create custom filtering strategies
3. Apply advanced ML-based techniques
4. Generate insights beyond explicit rules

Phase 2: Advanced Processing
5. Design custom aggregation approaches
6. Apply advanced analytical techniques
7. Generate insights beyond explicit rules
8. Create comprehensive filtering reports
```

## Tool Execution Patterns

### Data Source Filtering
```
Tool: filtering_primitive
Parameters:
  - input_data: [data_from_previous_primitive]
  - filter_rules: [configured_rules]
  - quality_threshold: 0.8
  - deduplication_threshold: 0.85

Expected Output:
  - Filtered dataset with quality scores
  - Source attribution for each item
  - Confidence levels for filtered results
  - Filtering rationale and metadata
```

### Quality Enhancement
```
Tool: quality_filter
Parameters:
  - input_data: [raw_data]
  - quality_threshold: 0.75
  - context_hints: {"domain": "business_intelligence"}

Expected Output:
  - High-quality filtered dataset
  - Quality scores for each item
  - Source reliability indicators
  - Processing metadata
```

## Output Format

### Standard Output Structure
```json
{
  "primitive_type": "filtering",
  "execution_id": "filter_2025_01_16_002",
  "input_summary": {
    "total_items": 156,
    "data_types": ["search_results", "company_data", "social_media"],
    "source_primitives": ["querying"]
  },
  "results": {
    "filtered_data": [
      {
        "item": { /* original data */ },
        "confidence": 0.89,
        "source": "web_search_exa",
        "quality_score": 0.92
      }
    ],
    "items_retained": 89,
    "items_removed": 67,
    "quality_score": 0.91
  },
  "metadata": {
    "execution_time_ms": 1200,
    "next_recommended_primitive": "aggregation"
  }
}
```

### Quality Metrics
- **Confidence Score**: 0.0-1.0 based on source reliability
- **Completeness Score**: 0.0-1.0 based on coverage of objectives
- **Source Diversity**: Count of unique source types
- **Temporal Relevance**: Recency of filtered data

## Error Handling

### Tool Failure Recovery
```
1. Primary Tool Failure
   - Retry with exponential backoff
   - Switch to alternative filtering methods
   - Adjust parameters for compatibility
   - Continue with partial results when acceptable

2. Data Quality Issues
   - Lower quality thresholds when necessary
   - Apply additional verification steps
   - Flag questionable data for manual review
   - Provide uncertainty indicators
```

### Validation Checks
```
1. Input Validation
   - Verify required parameters
   - Validate rule formats and values
   - Check data structure compatibility
   - Ensure agentic_level is valid

2. Output Validation
   - Verify JSON structure compliance
   - Check confidence scores are within bounds
   - Ensure source attribution is complete
   - Validate next_primitive recommendation
```

## Usage Examples

### Basic Data Filtering
```json
{
  "input_data": [
    {"title": "Company A Report", "confidence": 0.9, "source": "news"},
    {"title": "Company B Report", "confidence": 0.6, "source": "blog"}
  ],
  "filter_rules": [
    {"rule_type": "relevance_threshold", "field": "confidence", "operator": ">=", "value": 0.8}
  ],
  "agentic_level": "prescriptive"
}
```

### Advanced Quality Filtering
```json
{
  "input_data": [/* large dataset */],
  "filter_rules": [
    {"rule_type": "content_quality", "criteria": ["has_author", "recent_date"], "logic": "all"},
    {"rule_type": "deduplication", "method": "semantic_similarity", "threshold": 0.85}
  ],
  "agentic_level": "guided",
  "quality_threshold": 0.8
}
```

## Performance Optimization

### Caching Strategy
- Cache filtered results for 24 hours
- Cache quality scores for 12 hours
- Cache source reliability ratings for 48 hours
- Implement intelligent cache invalidation

### Rate Limiting
- Respect MCP server rate limits
- Implement exponential backoff for retries
- Use parallel processing where appropriate
- Monitor and optimize tool usage patterns

## Testing Guidelines

### Unit Tests
- Test parameter validation for all agentic levels
- Verify rule application accuracy
- Test error handling and recovery mechanisms
- Validate output format compliance

### Integration Tests
- Test complete workflow with real MCP tools
- Verify primitive chaining compatibility
- Test performance under load
- Validate quality scoring accuracy

<!--TASK_AGENT_CONTEXT
role: Data-Filtering-Specialist
motivation: Execute sophisticated data filtering with quality optimization and flexible rule application
constraints: Maintain high data quality, ensure source reliability, provide transparent filtering rationale
output_format: Structured JSON with quality scores, source attribution, and optimization hints for downstream processing
-->