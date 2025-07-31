# Comprehensive Company Profile Orchestration

This workflow orchestrates multiple Exa MCP tools to build an in-depth company profile including history, leadership, products, financials, and culture.

## Overview

The Comprehensive Company Profile workflow combines data from multiple sources to create a complete picture of a company's operations, market position, and strategic direction. This orchestration leverages business databases, public records, social media, and news sources to compile actionable intelligence.

## Required Tools

- `company_research_exa` - Core business information and financial data
- `wikipedia_search_exa` - Historical background and factual information
- `linkedin_search_exa` - Leadership profiles and company culture insights
- `web_search_exa` - Recent news, press releases, and market updates
- `competitor_finder_exa` - Market positioning context

## Workflow Steps

### Phase 1: Foundation Research (Parallel Execution)

```
1. Core Business Data Collection
   - Use `company_research_exa` with company name
   - Extract: revenue, employee count, headquarters, industry classification
   - Capture: business model, key products/services, target markets

2. Historical Context Gathering
   - Use `wikipedia_search_exa` for company history
   - Extract: founding date, founders, major milestones
   - Capture: pivotal moments, acquisitions, expansions

3. Leadership & Culture Analysis
   - Use `linkedin_search_exa` for "[Company Name] executives"
   - Extract: C-suite profiles, board members, key department heads
   - Capture: leadership tenure, backgrounds, company culture posts
```

### Phase 2: Current State Analysis

```
4. Recent Developments Research
   - Use `web_search_exa` with "[Company Name] news" + date filters
   - Focus on: last 6 months of announcements
   - Extract: product launches, partnerships, financial results
   - Capture: strategic initiatives, market expansions, challenges

5. Market Position Assessment
   - Use `competitor_finder_exa` to identify top 5 competitors
   - Quick `company_research_exa` scan of each competitor
   - Extract: relative market share, competitive advantages
   - Capture: unique value propositions, market differentiation
```

### Phase 3: Deep Dive Areas (Selective Based on Phase 1)

```
6. Financial Health Analysis (if public company)
   - Enhanced `web_search_exa` for quarterly earnings
   - Look for: investor presentations, analyst reports
   - Extract: revenue trends, profitability, growth metrics
   - Capture: financial risks, investment priorities

7. Innovation & R&D Focus (if technology company)
   - Use `web_search_exa` for patents, research initiatives
   - Check for: innovation labs, R&D investments
   - Extract: technology focus areas, innovation pipeline
   - Capture: future product directions, tech partnerships

8. Cultural & Social Impact
   - Use `linkedin_search_exa` for employee posts about culture
   - Search for: diversity initiatives, social responsibility
   - Extract: employee satisfaction indicators, values alignment
   - Capture: workplace culture, social impact programs
```

### Phase 4: Synthesis & Report Generation

```
9. Data Aggregation & Analysis
   - Compile all extracted information
   - Cross-reference facts across sources
   - Identify patterns and insights
   - Flag any contradictions or gaps

10. Structured Report Creation
    - Executive Summary (key findings in 3-5 bullets)
    - Company Overview (history, structure, operations)
    - Leadership & Culture Profile
    - Financial Performance & Health
    - Market Position & Competition
    - Recent Developments & Strategic Direction
    - Opportunities & Risks Assessment
    - Data Sources & Confidence Levels
```

## Output Format

```markdown
# [Company Name] Comprehensive Profile

## Executive Summary
- Key Finding 1
- Key Finding 2
- Key Finding 3
- Overall Assessment

## Company Overview
### Basic Information
- Founded: [Year]
- Headquarters: [Location]
- Industry: [Classification]
- Employees: [Count]
- Revenue: [Latest figures]

### Business Model
[Description of how the company makes money]

### Products & Services
[List and description of main offerings]

## Leadership & Organization
### Executive Team
- CEO: [Name] - [Background/Tenure]
- CFO: [Name] - [Background/Tenure]
- [Other key executives]

### Board of Directors
[Key board members and their backgrounds]

### Organizational Culture
[Insights from employee posts and company communications]

## Financial Performance
### Revenue Trends
[Last 3 years of revenue data with growth rates]

### Profitability
[Margins, earnings, cash flow highlights]

### Financial Health Indicators
[Debt levels, liquidity, investment capacity]

## Market Position
### Competitive Landscape
- Main Competitors: [List]
- Market Share: [Estimated position]
- Competitive Advantages: [Key differentiators]

### Industry Trends
[How the company is positioned for industry changes]

## Recent Developments
### Last 6 Months
- [Major announcement 1]
- [Major announcement 2]
- [Strategic initiative]

### Future Outlook
[Based on stated strategies and market conditions]

## Opportunities & Risks
### Growth Opportunities
- [Opportunity 1]
- [Opportunity 2]

### Key Risks
- [Risk 1]
- [Risk 2]

## Data Sources & Reliability
- High Confidence: [Sources with verified data]
- Medium Confidence: [Sources with partial verification]
- Low Confidence: [Speculative or single-source items]

Generated: [Date]
```

## Best Practices

1. **Parallel Processing**: Execute Phase 1 tools simultaneously for efficiency
2. **Source Verification**: Cross-reference critical facts across multiple sources
3. **Recency Bias**: Prioritize recent information but maintain historical context
4. **Confidence Scoring**: Always indicate data reliability levels
5. **Adaptive Depth**: Spend more time on areas most relevant to the company type

## Advanced Techniques

### Dynamic Tool Selection
Based on initial findings, adaptively select additional tools:
- If B2B company → Deep dive on LinkedIn for client relationships
- If consumer brand → Add social media sentiment analysis
- If public company → Enhanced financial data gathering
- If tech company → Include patent and GitHub searches

### Information Gaps Handling
When encountering missing data:
1. Note the gap explicitly in the report
2. Suggest alternative sources or methods to fill the gap
3. Provide confidence levels for any inferences made

### Quality Assurance Checks
- Verify current CEO and key facts against multiple sources
- Check for recent major events that might not be reflected in all sources
- Validate financial figures against official reports when available
- Ensure no outdated information is presented as current

## Common Pitfalls to Avoid

1. **Over-reliance on Single Sources**: Always triangulate important facts
2. **Missing Recent Changes**: Companies change quickly; prioritize recent data
3. **Ignoring Context**: Industry and economic factors affect interpretation
4. **Surface-Level Analysis**: Go beyond basic facts to insights and implications
5. **Unverified Claims**: Distinguish between facts and speculation

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Company-Intelligence-Gatherer
motivation: Build comprehensive, accurate company profiles that provide actionable business intelligence
constraints: Verify facts across sources, maintain objectivity, highlight both strengths and weaknesses
output_format: Structured markdown report with clear sections and confidence indicators
-->

When spawning task agents for this orchestration:
1. Emphasize fact verification and source citation
2. Request specific data points rather than general information
3. Ask for confidence levels on all findings
4. Require distinction between facts and analysis
5. Set clear boundaries on research scope to prevent drift

## Customization Options

This workflow can be customized based on specific needs:
- **Quick Profile**: Skip Phase 3 for a faster, high-level overview
- **Financial Focus**: Expand financial analysis for investment decisions
- **Competitive Deep Dive**: Expand Phase 2 with detailed competitor analysis
- **Cultural Assessment**: Expand leadership and culture research for M&A
- **Risk Assessment**: Add dedicated risk analysis phase for due diligence

The key is maintaining systematic coverage while adapting depth based on the specific intelligence requirements.