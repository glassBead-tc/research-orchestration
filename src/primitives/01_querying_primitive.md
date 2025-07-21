# Querying Primitive: Strategy-Based Exa Search Orchestration

## YAML Frontmatter
```yaml
---
primitive_type: "querying"
version: "1.0.0"
description: "Orchestrates Exa searches with varying levels of autonomy and strategy optimization"
composable: true
agentic_levels: ["prescriptive", "guided", "autonomous"]
required_tools: ["web_search_exa", "company_research_exa", "wikipedia_search_exa", "linkedin_search_exa"]
optional_tools: ["reddit_search_exa", "github_search_exa", "news_search_exa"]
---
```

## Overview

The Querying Primitive orchestrates multiple Exa MCP tools to gather comprehensive information based on strategic search objectives. It adapts execution based on agentic level and provides structured output for downstream processing.

## Input Parameters

### Required Parameters
- `query_objective`: String describing the information goal
- `search_context`: Object defining scope and constraints
- `agentic_level`: One of ["prescriptive", "guided", "autonomous"]

### Optional Parameters
- `max_results`: Integer (default: 50)
- `time_range`: Object with start/end dates
- `source_preferences`: Array of preferred source types
- `quality_threshold`: Float between 0.0-1.0 (default: 0.7)

### Strategy Object Structure
```json
{
  "query_objective": "Research comprehensive company profile for strategic analysis",
  "search_context": {
    "domain": "business_intelligence",
    "geographic_scope": "global",
    "temporal_focus": "recent_12_months",
    "depth_level": "comprehensive"
  },
  "agentic_level": "guided",
  "max_results": 75,
  "source_preferences": ["company_databases", "news", "social_media", "financial_reports"],
  "quality_threshold": 0.8
}
```

## Execution by Agentic Level

### Prescriptive Level (Sequential Execution)
```
Phase 1: Foundation Research
1. Execute web_search_exa with exact query terms
2. Execute company_research_exa for business data
3. Execute wikipedia_search_exa for background
4. Execute linkedin_search_exa for professional context

Phase 2: Source Validation
5. Cross-reference findings across sources
6. Verify factual consistency
7. Calculate confidence scores

Phase 3: Output Preparation
8. Structure results for downstream processing
9. Generate source attribution
10. Apply quality filtering
```

### Guided Level (Adaptive Execution)
```
Phase 1: Strategic Assessment
1. Analyze query objective for optimal tool selection
2. Determine search strategy based on context
3. Prioritize sources by relevance and reliability

Phase 2: Dynamic Tool Orchestration
4. Execute primary tools based on strategy
5. Adapt search parameters based on initial results
6. Expand to secondary tools as needed
7. Apply intelligent result filtering

Phase 3: Quality Optimization
8. Evaluate result quality and completeness
9. Perform targeted searches to fill gaps
10. Optimize output for downstream primitives
```

### Autonomous Level (Creative Execution)
```
Phase 1: Objective Interpretation
1. Deconstruct query into sub-objectives
2. Identify implicit information needs
3. Design custom search strategy

Phase 2: Creative Tool Usage
4. Experiment with novel search approaches
5. Leverage tool synergies creatively
6. Generate insights beyond explicit requirements
7. Create comprehensive knowledge graph

Phase 3: Advanced Processing
8. Synthesize cross-source insights
9. Identify patterns and relationships
10. Generate strategic recommendations
```

## Tool Execution Patterns

### Web Search Strategy
```
Tool: web_search_exa
Parameters:
  - query: [contextualized search terms]
  - max_results: [based on agentic level]
  - time_range: [from search_context]
  - domains: [source_preferences]

Expected Output:
  - News articles and recent developments
  - Industry analysis and reports
  - Expert opinions and commentary
  - Market data and trends
```

### Company Research Strategy
```
Tool: company_research_exa
Parameters:
  - company_name: [from query_objective]
  - data_types: ["financial", "leadership", "products", "market_position"]
  - depth: [based on depth_level]

Expected Output:
  - Financial performance metrics
  - Leadership team profiles
  - Product/service portfolio
  - Market positioning data
```

### Wikipedia Research Strategy
```
Tool: wikipedia_search_exa
Parameters:
  - search_term: [company/entity name]
  - extract_sections: ["history", "operations", "controversies", "achievements"]

Expected Output:
  - Historical background
  - Foundational information
  - Key milestones and events
  - Factual baseline data
```

### LinkedIn Research Strategy
```
Tool: linkedin_search_exa
Parameters:
  - search_query: [company + "executives" OR "leadership"]
  - profile_depth: ["executive", "department_heads", "key_employees"]

Expected Output:
  - Leadership team composition
  - Organizational structure insights
  - Professional backgrounds
  - Recent leadership changes
```

## Output Format

### Standard Output Structure
```json
{
  "primitive_type": "querying",
  "execution_id": "query_2025_01_16_001",
  "query_objective": "Research comprehensive company profile for strategic analysis",
  "agentic_level": "guided",
  "results": {
    "search_results": [
      {
        "source": "web_search_exa",
        "results": [...],
        "confidence": 0.85,
        "timestamp": "2025-01-16T21:30:00Z"
      },
      {
        "source": "company_research_exa",
        "results": [...],
        "confidence": 0.92,
        "timestamp": "2025-01-16T21:31:00Z"
      }
    ],
    "metadata": {
      "total_sources": 4,
      "total_results": 67,
      "average_confidence": 0.78,
      "search_duration_ms": 3400,
      "quality_score": 0.83
    }
  },
  "next_primitive": "filtering",
  "optimization_hints": {
    "filter_rules": ["remove_duplicates", "prioritize_recent", "verify_sources"],
    "aggregation_focus": ["financial_data", "leadership_info", "market_position"]
  }
}
```

### Quality Scoring System
- **Confidence Score**: 0.0-1.0 based on source reliability and cross-verification
- **Completeness Score**: 0.0-1.0 based on coverage of query objectives
- **Recency Score**: 0.0-1.0 based on temporal relevance
- **Source Diversity**: Count of unique source types

## Error Handling

### Tool Failure Recovery
```
1. Primary Tool Failure
   - Retry with exponential backoff (max 3 attempts)
   - Switch to alternative tools with similar capabilities
   - Adjust parameters for compatibility
   - Document failure and recovery actions

2. Partial Results
   - Continue with available data
   - Flag missing information
   - Suggest follow-up searches
   - Adjust confidence scores accordingly

3. Quality Issues
   - Lower confidence scores for questionable sources
   - Apply additional verification steps
   - Provide uncertainty indicators
   - Recommend manual review
```

### Validation Checks
```
1. Input Validation
   - Verify required parameters are present
   - Validate parameter formats and ranges
   - Check agentic_level is valid
   - Ensure query_objective is specific enough

2. Output Validation
   - Verify JSON structure compliance
   - Check confidence scores are within bounds
   - Ensure source attribution is complete
   - Validate next_primitive recommendation
```

## Usage Examples

### Basic Company Research
```json
{
  "query_objective": "Research Tesla's current market position and recent developments",
  "search_context": {
    "domain": "business_intelligence",
    "geographic_scope": "global",
    "temporal_focus": "recent_6_months"
  },
  "agentic_level": "prescriptive"
}
```

### Strategic Competitive Analysis
```json
{
  "query_objective": "Analyze competitive landscape for electric vehicle charging networks",
  "search_context": {
    "domain": "market_analysis",
    "geographic_scope": "north_america",
    "temporal_focus": "recent_12_months",
    "depth_level": "comprehensive"
  },
  "agentic_level": "autonomous",
  "max_results": 100,
  "quality_threshold": 0.85
}
```

## Performance Optimization

### Caching Strategy
- Cache frequently requested company data for 24 hours
- Cache news searches for 6 hours
- Cache LinkedIn profiles for 48 hours
- Implement intelligent cache invalidation

### Rate Limiting
- Respect MCP server rate limits
- Implement exponential backoff for retries
- Use parallel execution where appropriate
- Monitor and optimize tool usage patterns

## Testing Guidelines

### Unit Tests
- Test parameter validation for all agentic levels
- Verify tool execution with mock responses
- Test error handling and recovery mechanisms
- Validate output format compliance

### Integration Tests
- Test complete workflow with real MCP tools
- Verify primitive chaining compatibility
- Test performance under load
- Validate quality scoring accuracy

<!--TASK_AGENT_CONTEXT
role: Query-Orchestration-Specialist
motivation: Execute comprehensive information gathering using optimal search strategies and tool combinations
constraints: Maintain high data quality, respect rate limits, provide source attribution, ensure result accuracy
output_format: Structured JSON with confidence scores, source attribution, and optimization hints for downstream processing
-->