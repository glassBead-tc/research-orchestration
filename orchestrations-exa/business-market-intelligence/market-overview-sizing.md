# Market Overview & Sizing Orchestration

This workflow retrieves market research data through web searches and targeted site crawling to estimate market size, growth rates, and identify major players in any sector.

## Overview

Market sizing is fundamental to strategic decision-making, whether for investment, market entry, or competitive positioning. This orchestration systematically gathers market data from research firms, industry associations, financial reports, and news sources to build a comprehensive market overview with quantitative estimates and qualitative insights.

## Required Tools

- `web_search_exa` - Market reports, analyst estimates, news articles
- `crawling_exa` - Extract specific data from report pages
- `company_research_exa` - Revenue data from major players
- `wikipedia_search_exa` - Industry classifications and definitions
- `research_paper_search_exa` - Academic market studies

## Workflow Steps

### Phase 1: Market Definition & Segmentation

```
1. Market Boundary Definition
   - Use `wikipedia_search_exa` for "[Market/Product] market"
   - Use `web_search_exa` for "[Market] definition scope"
   - Clarify:
     - What products/services are included?
     - What geographies are covered?
     - What customer segments exist?
     - What adjacent markets exist?

2. Industry Classification Mapping
   - Search for NAICS, SIC, or industry-specific codes
   - Use `web_search_exa` for "[Market] industry classification"
   - Map to standard taxonomies for comparable data
   - Identify parent and sub-markets
```

### Phase 2: Top-Down Market Sizing

```
3. Analyst Report Mining
   - Use `web_search_exa` with queries:
     - "[Market] size billion"
     - "[Market] TAM" (Total Addressable Market)
     - "[Market] market value [Current Year]"
     - "site:grandviewresearch.com [Market]"
     - "site:marketsandmarkets.com [Market]"
     - "site:mordorintelligence.com [Market]"
   
4. Financial Report Extraction
   - For identified reports, use `crawling_exa` on URLs
   - Extract:
     - Base year market size
     - CAGR (Compound Annual Growth Rate)
     - Forecast period and end-year projections
     - Regional breakdowns
     - Segment breakdowns

5. Multiple Source Triangulation
   - Collect 5-10 different market size estimates
   - Note methodology differences:
     - Revenue vs. volume based
     - Geographic scope variations
     - Segment inclusion/exclusion
   - Calculate median and range of estimates
```

### Phase 3: Bottom-Up Validation

```
6. Major Player Revenue Analysis
   - Use `company_research_exa` for top 10 companies
   - Extract revenue for relevant product lines
   - Calculate combined market share
   - Estimate total market from share percentages

7. Market Share Distribution
   - Use `web_search_exa` for "[Company] market share [Market]"
   - Build market share pie chart:
     - Top 3 players: X%
     - Top 10 players: Y%
     - Long tail: Z%
   - Assess market concentration (fragmented vs. consolidated)

8. Unit Economics Research
   - Search for:
     - Average selling prices
     - Volume/unit sales data
     - Customer counts
     - Transaction frequencies
   - Calculate market size from bottom up
```

### Phase 4: Growth Driver Analysis

```
9. Historical Growth Patterns
   - Use `web_search_exa` for "[Market] growth history"
   - Find historical data points (5-10 years)
   - Calculate historical CAGR
   - Identify growth inflection points

10. Growth Factor Assessment
    - Demand drivers:
      - Demographic trends
      - Technology adoption
      - Regulatory changes
      - Economic factors
    - Supply factors:
      - Innovation pipeline
      - Capacity expansion
      - New entrant activity
    - Score each factor's impact on growth

11. Regional & Segment Dynamics
    - Use `web_search_exa` for regional market data
    - Compare growth rates by:
      - Geography (NA, EMEA, APAC, etc.)
      - Customer segment (enterprise, SMB, consumer)
      - Product category
      - Distribution channel
```

### Phase 5: Competitive Landscape Mapping

```
12. Player Categorization
    - Incumbents/Leaders
    - Challengers/Fast followers  
    - Niche players
    - New entrants/Disruptors
    
13. M&A and Investment Activity
    - Use `web_search_exa` for "[Market] acquisitions"
    - Track:
      - Major deals and valuations
      - Strategic vs. financial buyers
      - Cross-border activity
      - Implications for market structure

14. Venture and Growth Investment
    - Search for "[Market] funding rounds"
    - Identify:
      - Hot segments attracting capital
      - Notable investors
      - Investment thesis themes
      - Unicorns or potential unicorns
```

### Phase 6: Market Projection & Scenarios

```
15. Baseline Projection Model
    - Start with median current market size
    - Apply consensus CAGR
    - Project 5-year outlook
    - Adjust for known disruptions

16. Scenario Development
    - Bull case: Accelerated adoption
    - Base case: Consensus growth
    - Bear case: Headwinds materialize
    - Disruption case: New technology/model

17. Sensitivity Analysis
    - Key variables impacting size:
      - Penetration rates
      - Price evolution  
      - Technology substitution
      - Regulatory changes
    - Show impact of ±20% changes
```

## Output Format

```markdown
# [Market Name] - Market Overview & Sizing Analysis

## Executive Summary
- **Current Market Size (2024)**: $[X.X] billion
- **Projected Size (2029)**: $[Y.Y] billion  
- **5-Year CAGR**: [Z.Z]%
- **Key Finding**: [Most important insight]

## Market Definition & Scope
### What's Included
- Products/Services: [List]
- Geographies: [List]
- Customer Types: [List]

### What's Excluded
- Adjacent Markets: [List]
- Clarifications: [Any boundary issues]

## Market Size Analysis

### Current Market Size Estimates
| Source | 2024 Size | CAGR | 2029 Projection | Methodology |
|--------|-----------|------|-----------------|-------------|
| Source 1 | $X.XB | X% | $Y.YB | Revenue-based |
| Source 2 | $X.XB | X% | $Y.YB | Volume × ASP |
| Source 3 | $X.XB | X% | $Y.YB | Survey-based |

**Consensus Range**: $[Low] - $[High] billion
**Median Estimate**: $[Median] billion

### Bottom-Up Validation
Top 10 Players Combined Revenue: $[Amount]
Estimated Market Share: [%]
Implied Total Market: $[Calculation]
Variance from Top-Down: [%]

## Market Segmentation

### By Geography
- North America: $[Size] ([%])
- Europe: $[Size] ([%])  
- Asia-Pacific: $[Size] ([%])
- Rest of World: $[Size] ([%])

### By Customer Segment
- Enterprise: $[Size] ([%])
- Mid-Market: $[Size] ([%])
- SMB: $[Size] ([%])
- Consumer: $[Size] ([%])

### By Product Category
- Category A: $[Size] ([%])
- Category B: $[Size] ([%])
- Category C: $[Size] ([%])

## Competitive Landscape

### Market Concentration
- Top 3 Players: [Combined %]
- Top 10 Players: [Combined %]
- HHI Index: [Score] ([Fragmented/Moderate/Concentrated])

### Major Players
1. **[Company 1]** - Market Share: [%]
   - Revenue: $[Amount]
   - Key Strengths: [List]

2. **[Company 2]** - Market Share: [%]
   - Revenue: $[Amount]
   - Key Strengths: [List]

[Continue for top 5-10]

### Emerging Players to Watch
- [Company A]: [Why notable]
- [Company B]: [Why notable]

## Growth Analysis

### Historical Growth
- 2019-2024 CAGR: [%]
- Key Inflection Points: [List with explanations]

### Growth Drivers (Ranked by Impact)
1. **[Driver 1]**: [Description and quantified impact]
2. **[Driver 2]**: [Description and quantified impact]
3. **[Driver 3]**: [Description and quantified impact]

### Growth Inhibitors
- [Inhibitor 1]: [Impact assessment]
- [Inhibitor 2]: [Impact assessment]

## Market Projections

### Base Case Scenario (60% probability)
- 2029 Market Size: $[Amount]
- 5-Year CAGR: [%]
- Key Assumptions: [List]

### Bull Case Scenario (25% probability)
- 2029 Market Size: $[Amount]
- 5-Year CAGR: [%]
- Catalysts: [What needs to happen]

### Bear Case Scenario (15% probability)
- 2029 Market Size: $[Amount]
- 5-Year CAGR: [%]
- Risk Factors: [What could go wrong]

## Investment & M&A Activity

### Recent Major Deals
| Date | Acquirer | Target | Value | Strategic Rationale |
|------|----------|--------|-------|-------------------|
| [Date] | [Company] | [Company] | $[Amount] | [Reason] |

### Venture Investment Trends
- Total VC Investment (Last 12 months): $[Amount]
- Number of Deals: [Count]
- Average Deal Size: $[Amount]
- Hot Segments: [List]

## Key Insights & Implications

### For Strategic Planning
1. [Insight 1 with implication]
2. [Insight 2 with implication]
3. [Insight 3 with implication]

### For Investment Decisions
1. [Insight 1 with implication]
2. [Insight 2 with implication]

### For Market Entry
1. [Insight 1 with implication]
2. [Insight 2 with implication]

## Data Quality & Confidence

### High Confidence Elements
- [What we're sure about]

### Medium Confidence Elements  
- [What we're reasonably confident in]

### Low Confidence / Gaps
- [What needs more research]

Generated: [Date]
Data Vintage: [Most recent data points from]
```

## Best Practices

1. **Source Diversity**: Always use 5+ independent sources for market size
2. **Methodology Transparency**: Clearly state what's included/excluded
3. **Range Presentation**: Show low/median/high rather than false precision
4. **Bottom-Up Validation**: Always cross-check with company revenue data
5. **Growth Driver Quantification**: Assign impact scores to growth factors

## Advanced Techniques

### Regional Arbitrage Analysis
- Compare market maturity across regions
- Identify markets 2-3 years behind leaders
- Calculate catch-up growth potential
- Factor in local market differences

### Technology Substitution Modeling
- Track technology adoption S-curves
- Identify substitution threats
- Model cannibalization rates
- Project tipping points for market shifts

### Adjacent Market Monitoring
- Map markets that could merge
- Track convergence indicators
- Monitor player movements between markets
- Assess total addressable market expansion

### Regulatory Impact Modeling
- Track pending regulations
- Assess market expansion/contraction potential
- Model compliance cost impacts
- Identify regulatory arbitrage opportunities

## Common Pitfalls to Avoid

1. **Definition Confusion**: Markets defined differently by different sources
2. **Double Counting**: Overlapping segments counted multiple times
3. **Currency/Inflation**: Not adjusting for currency and inflation
4. **Survivor Bias**: Only counting current players, missing exits
5. **Geographic Gaps**: Missing important regions or assuming US = Global

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Market-Intelligence-Analyst
motivation: Provide accurate, actionable market sizing with clear methodology and confidence levels
constraints: Always triangulate data, show ranges not false precision, validate top-down with bottom-up
output_format: Quantitative analysis with sourced data points and strategic implications
-->

When deploying task agents for market sizing:
1. Require specific sources for every data point
2. Demand methodology explanations for estimates
3. Insist on both top-down and bottom-up approaches
4. Request confidence levels for all projections
5. Ensure currency and time period consistency

## Customization Options

### Quick Market Sizing
- Focus on consensus estimates only
- Skip detailed segmentation
- Provide 1-page executive summary
- Time: 30 minutes

### Standard Market Analysis  
- Full methodology as outlined
- Complete competitive landscape
- Growth scenarios
- Time: 2-3 hours

### Deep Market Intelligence
- Add primary research validation
- Include expert interview insights
- Develop investment thesis
- Add acquisition target analysis
- Time: 1-2 days

### Continuous Market Tracking
- Quarterly updates
- Change tracking
- Early warning indicators
- Automated alerts for major changes