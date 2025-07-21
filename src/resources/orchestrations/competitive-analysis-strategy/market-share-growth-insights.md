# Market Share & Growth Insights Orchestration

This workflow retrieves market share statistics and growth metrics from business reports and news articles, compiling data to show who is leading or lagging in the market.

## Overview

Market share and growth rates are fundamental indicators of competitive success. This orchestration systematically gathers market share data, growth metrics, and competitive dynamics from multiple sources. It reveals market leaders, fast-growing challengers, and declining players while identifying the drivers behind market share shifts.

## Required Tools

- `web_search_exa` - Market reports, news, analyst data
- `company_research_exa` - Company performance metrics
- `competitor_finder_exa` - Market participant identification
- `research_paper_search_exa` - Academic market studies
- `crawling_exa` - Extract data from report pages

## Workflow Steps

### Phase 1: Market Definition & Sizing

```
1. Market Boundary Setting
   - Product/service categories included
   - Geographic scope definition
   - Customer segment delineation
   - Time period for analysis
   - Currency standardization
   
2. Total Market Size Establishment
   Use `web_search_exa` for:
   - "[Market] size [Year]"
   - "[Market] TAM billion"
   - Industry association reports
   - Government statistics
   - Analyst firm estimates
   
3. Market Participant Identification
   Use `competitor_finder_exa` and research:
   - Top 10-20 players
   - Regional leaders
   - Niche specialists
   - New entrants
   - Exiting players
```

### Phase 2: Market Share Data Collection

```
4. Direct Market Share Sources
   Search patterns:
   - "[Company] market share [Market]"
   - "[Market] market share breakdown"
   - "Leading companies [Market]"
   - Industry reports with share data
   - Investor presentations
   
5. Revenue-Based Calculations
   Use `company_research_exa`:
   - Company revenues in market
   - Segment-specific revenues
   - Geographic revenue splits
   - Product line revenues
   Calculate: Company Revenue / Total Market
   
6. Alternative Share Metrics
   Depending on industry:
   - Unit sales share
   - User/subscriber share
   - Transaction volume share
   - Capacity share
   - Geographic coverage share
```

### Phase 3: Growth Rate Analysis

```
7. Historical Growth Tracking
   Time series data collection:
   - Annual growth rates (3-5 years)
   - Quarterly growth (if available)
   - CAGR calculations
   - Growth acceleration/deceleration
   - Cyclical patterns
   
8. Growth Driver Identification
   For each company's growth:
   - Organic vs. inorganic growth
   - Market expansion vs. share gain
   - Price vs. volume growth
   - New product contribution
   - Geographic expansion impact
   
9. Relative Growth Performance
   - Company growth vs. market growth
   - Share gainers and losers
   - Growth momentum shifts
   - Sustainable vs. temporary growth
   - Quality of growth metrics
```

### Phase 4: Competitive Dynamics

```
10. Share Movement Analysis
    Track over time:
    - Share gains/losses by player
    - Share volatility
    - Concentration changes
    - New entrant impact
    - M&A effects on share
    
11. Market Position Changes
    - Leaders strengthening/weakening
    - Challengers rising/falling
    - Niche players expanding
    - Consolidation patterns
    - Disruption indicators
    
12. Share Shift Attribution
    Why share changed:
    - Product innovation
    - Pricing strategies
    - Distribution expansion
    - Marketing effectiveness
    - Operational excellence
    - M&A activity
```

### Phase 5: Segment Analysis

```
13. Sub-Market Breakdown
    If available:
    - Product segment shares
    - Geographic market shares
    - Customer segment shares
    - Channel shares
    - Price tier shares
    
14. Segment Growth Rates
    - Fast-growing segments
    - Declining segments
    - Emerging segments
    - Segment size evolution
    - Player focus areas
    
15. Segment Competitive Intensity
    - Number of players per segment
    - Share concentration by segment
    - Profitability by segment
    - Entry barriers by segment
    - Innovation rates by segment
```

### Phase 6: Future Projections

```
16. Growth Trajectory Analysis
    - Historical trend extrapolation
    - Market driver assessment
    - Competitive response modeling
    - Disruption scenario planning
    - Share projection ranges
    
17. Leading Indicators
    - Investment levels
    - Innovation pipelines
    - Capacity additions
    - Partnership announcements
    - Talent acquisition
    
18. Market Evolution Scenarios
    - Consolidation likelihood
    - New entrant threats
    - Technology disruption
    - Regulatory impacts
    - Economic sensitivity
```

## Output Format

```markdown
# Market Share & Growth Analysis: [Market Name]
## Analysis Period: [Start Year] - [End Year]
## Market Scope: [Geographic/Product Definition]

### Executive Summary
- **Market Size**: $[X.X]B (growing at [Y]% CAGR)
- **Market Leader**: [Company] with [X]% share
- **Fastest Growing**: [Company] at [Y]% CAGR
- **Key Trend**: [Most important market dynamic]
- **Outlook**: [Market concentration/fragmentation trend]

### Market Overview

#### Total Market Evolution
| Year | Market Size | YoY Growth | Key Events |
|------|-------------|------------|------------|
| 2021 | $45.2B | +8.5% | Post-pandemic recovery |
| 2022 | $49.8B | +10.2% | Supply chain normalization |
| 2023 | $54.3B | +9.0% | Technology adoption surge |
| 2024E | $59.2B | +9.0% | Market maturation |
| 2025E | $64.1B | +8.3% | Projected steady growth |

#### Market Concentration
- **Top 3 Players**: [X]% combined share
- **Top 5 Players**: [Y]% combined share
- **Top 10 Players**: [Z]% combined share
- **HHI Index**: [Score] ([Concentrated/Moderate/Fragmented])
- **Trend**: [Consolidating/Stable/Fragmenting]

### Market Share Analysis

#### Current Market Share (2024)
| Rank | Company | Market Share | Share Change (YoY) | Revenue |
|------|---------|--------------|-------------------|---------|
| 1 | [Company A] | 22.5% | +1.2pp | $13.3B |
| 2 | [Company B] | 18.3% | -0.5pp | $10.8B |
| 3 | [Company C] | 15.7% | +2.1pp | $9.3B |
| 4 | [Us] | 12.2% | +0.3pp | $7.2B |
| 5 | [Company E] | 9.8% | -0.8pp | $5.8B |
| 6-10 | Others | 14.5% | -1.3pp | $8.6B |
| 11+ | Long Tail | 7.0% | -1.0pp | $4.2B |

#### Market Share Evolution
```
25% |    A═══════════════════════
    |  ╱ B───────────────╲
20% | ╱                   ╲─────
    |╱    C═══════╱═══════════
15% |         ╱═══ 
    |    ╱═══  Us────────────
10% | ══╱                E╲
    |                      ╲───
5%  |________________________
    2019  2020  2021  2022  2023
```

### Growth Analysis

#### Company Growth Rates (CAGR 2019-2024)
| Company | Revenue CAGR | Market CAGR | Outperformance | Growth Type |
|---------|--------------|-------------|----------------|-------------|
| [Company C] | 18.5% | 9.0% | +9.5pp | Share Gainer |
| [Company A] | 11.2% | 9.0% | +2.2pp | Steady Leader |
| [Us] | 9.8% | 9.0% | +0.8pp | Market Pace |
| [Company B] | 6.5% | 9.0% | -2.5pp | Share Loser |
| [Company E] | 4.2% | 9.0% | -4.8pp | Declining |

#### Growth Driver Analysis
**Company C (Fastest Growing)**:
- Product Innovation: 40% of growth
- Geographic Expansion: 30% of growth
- M&A Activity: 20% of growth
- Market Share Gains: 10% of growth

**Company B (Losing Share)**:
- Legacy Product Decline: -3% drag
- Competitive Losses: -2% impact
- Geographic Gaps: -1.5% impact
- Offset by Price Increases: +4%

### Segment Analysis

#### Market Share by Product Segment
| Segment | Size | Growth | Leader | Leader Share | Our Share |
|---------|------|--------|--------|--------------|-----------|
| Enterprise | $28.4B | 12% | Company A | 28% | 15% |
| Mid-Market | $18.2B | 8% | Company C | 22% | 18% |
| SMB | $12.6B | 5% | Company B | 19% | 8% |

#### Geographic Market Share
| Region | Size | Growth | Leader | Leader Share | Our Share |
|--------|------|--------|--------|--------------|-----------|
| N. America | $23.7B | 7% | Company A | 25% | 16% |
| Europe | $17.8B | 8% | Company B | 22% | 14% |
| APAC | $14.2B | 15% | Company C | 18% | 6% |
| Other | $3.5B | 12% | Regional | Various | 3% |

### Competitive Dynamics

#### Share Movement Matrix (2019-2024)
| Company | 2019 Share | 2024 Share | Change | Status |
|---------|------------|------------|---------|---------|
| Winners |
| Company C | 8.2% | 15.7% | +7.5pp | Rising Star |
| Company A | 20.1% | 22.5% | +2.4pp | Strengthening |
| Company F | 2.1% | 4.2% | +2.1pp | Emerging |
| Losers |
| Company B | 21.5% | 18.3% | -3.2pp | Declining Leader |
| Company E | 12.8% | 9.8% | -3.0pp | Struggling |
| Others | 10.3% | 7.0% | -3.3pp | Consolidating Out |

#### Market Entry & Exit
**New Entrants (Last 3 Years)**:
- [Company X]: Entered 2022, 1.2% share
- [Company Y]: Entered 2023, 0.8% share

**Exits/Acquisitions**:
- [Company Z]: Acquired by Company A (2023)
- [Company W]: Exited market (2022)

### Growth Quality Assessment

#### Sustainable Growth Indicators
| Company | Organic Growth | Pricing Power | Innovation Rate | Customer Retention |
|---------|----------------|---------------|-----------------|-------------------|
| Company A | 75% | High | Moderate | 92% |
| Company C | 80% | Moderate | High | 88% |
| Us | 90% | Moderate | Moderate | 90% |
| Company B | 60% | Low | Low | 85% |

#### Investment & Innovation Metrics
| Company | R&D/Revenue | CapEx/Revenue | New Products/Year | Patent Filings |
|---------|-------------|---------------|-------------------|----------------|
| Company C | 12% | 8% | 15 | 234 |
| Company A | 9% | 10% | 8 | 156 |
| Us | 10% | 7% | 10 | 189 |
| Company B | 7% | 6% | 5 | 87 |

### Future Outlook

#### Market Share Projections (2025-2027)
| Company | Current | 2025E | 2026E | 2027E | Scenario |
|---------|---------|--------|--------|--------|----------|
| Company A | 22.5% | 23.0% | 23.5% | 24.0% | Steady growth |
| Company C | 15.7% | 17.5% | 19.0% | 20.5% | Continued gains |
| Us | 12.2% | 12.5% | 13.0% | 13.5% | Modest growth |
| Company B | 18.3% | 17.0% | 16.0% | 15.0% | Further decline |

#### Key Market Dynamics to Watch
1. **Consolidation Wave**: 3-4 major M&A deals expected
2. **Technology Disruption**: AI/ML adoption accelerating
3. **Geographic Shifts**: APAC becoming largest market by 2027
4. **Business Model Evolution**: Subscription transition ongoing
5. **Regulatory Changes**: Data privacy impacting growth

### Strategic Implications

#### For Market Leaders
- Defend share through innovation
- Acquire emerging threats
- Expand in high-growth segments
- Build switching barriers

#### For Challengers (Including Us)
- Focus on high-growth segments
- Differentiate vs. leaders
- Consider strategic partnerships
- Invest ahead of market

#### For Struggling Players
- Niche focus strategy
- Cost optimization
- Consider exit/merger
- Pivot business model

### Key Takeaways

1. **Market Consolidating**: Top 5 gaining share from long tail
2. **Growth Diverging**: Leaders growing faster than laggards
3. **Geographic Arbitrage**: APAC growth offsetting mature markets
4. **Innovation Imperative**: R&D investment correlates with share gains
5. **M&A Accelerating**: Scale becoming more important

### Monitoring Framework

#### Leading Indicators to Track
- Quarterly revenue reports
- Customer win/loss data
- Product launch cadence
- Investment announcements
- M&A activity

#### Key Metrics Dashboard
- Market share (quarterly)
- Growth rate vs. market
- Share momentum (3-month rolling)
- Segment performance
- Geographic mix evolution

---

**Data Sources**: [List of reports, databases used]
**Confidence Level**: High (historical) / Medium (projections)
**Data Limitations**: [Any gaps or caveats]
**Next Update**: [Quarterly recommended]
```

## Best Practices

1. **Multiple Source Validation**: Never rely on single market share source
2. **Consistent Definitions**: Ensure market boundaries are consistent
3. **Time Period Alignment**: Compare same periods across companies
4. **Growth Quality**: Distinguish organic from inorganic growth
5. **Segment Insights**: Look beyond total market to segment dynamics

## Advanced Techniques

### Share Momentum Analysis
- Calculate rolling share changes
- Identify inflection points
- Predict share trajectories
- Model competitive responses
- Find stability patterns

### Market Share Attribution
- Decompose share changes
- Link to specific actions
- Identify success factors
- Quantify initiative impacts
- Build causal models

### Competitive Response Modeling
- Predict retaliation patterns
- Model share equilibrium
- Simulate market scenarios
- Identify tipping points
- Plan optimal moves

### Adjacent Market Analysis
- Track related market shares
- Identify convergence patterns
- Spot expansion opportunities
- Assess threat vectors
- Model TAM evolution

## Common Pitfalls to Avoid

1. **Definition Inconsistency**: Different sources defining market differently
2. **Time Lag Issues**: Using outdated share data for decisions
3. **Geographic Blindness**: Missing important regional variations
4. **Survivor Bias**: Not accounting for exited players
5. **Share Fixation**: Focusing on share over profitability

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Market-Intelligence-Analyst
motivation: Provide accurate market share analysis that reveals competitive dynamics and growth opportunities
constraints: Validate data across sources, ensure consistent definitions, focus on actionable insights
output_format: Comprehensive market share analysis with historical trends, growth drivers, and strategic implications
-->

When deploying task agents for market share analysis:
1. Cross-reference multiple sources for share data
2. Always specify market definition clearly
3. Calculate shares multiple ways for validation
4. Include context for share changes
5. Connect share trends to strategic actions

## Customization Options

### Analysis Depth Levels
- **Quick View**: Current shares and growth rates (2 hours)
- **Standard Analysis**: 3-year trends and drivers (1 day)
- **Deep Dive**: Segment analysis and projections (2-3 days)
- **Continuous Tracking**: Monthly share updates

### Industry Variations
- **Software**: User/seat share, ARR share
- **Retail**: Store count share, e-commerce share
- **Manufacturing**: Capacity share, unit share
- **Services**: Client share, contract value share
- **Platforms**: Developer share, transaction share

### Geographic Scope
- **Global**: Aggregate worldwide data
- **Regional**: Focus on specific markets
- **Country**: Deep dive single market
- **City/Metro**: Local market shares

### Output Formats
- **Executive Dashboard**: Visual KPIs only
- **Detailed Tables**: Full data transparency
- **Trend Analysis**: Focus on changes
- **Competitive Brief**: Strategic implications
- **Board Presentation**: Investment narrative