# Investment & Financial Insights Orchestration

This workflow uses web search and company info tools to find financial reports, stock performance, and investor presentations to summarize a company's financial health and investment potential.

## Overview

Financial analysis is critical for investment decisions, credit assessments, and strategic planning. This orchestration gathers financial data from multiple sources including company filings, analyst reports, market data, and investor communications to build a comprehensive picture of financial health, growth trajectory, and investment risks.

## Required Tools

- `web_search_exa` - Financial reports, analyst coverage, market data
- `company_research_exa` - Company fundamentals and metrics
- `crawling_exa` - Extract data from investor relations pages
- `reddit_search_exa` - Retail investor sentiment
- `youtube_search_exa` - Earnings call recordings, analyst presentations

## Workflow Steps

### Phase 1: Financial Foundation

```
1. Company Financial Overview
   - Use `company_research_exa` for basic metrics
   - Extract:
     - Market capitalization
     - Revenue (TTM)
     - Employee count
     - Industry classification
     - Exchange listing
     - Fiscal year end

2. Investor Relations Mining
   - Use `web_search_exa` for "[Company] investor relations"
   - Use `crawling_exa` on IR page to extract:
     - Latest quarterly results
     - Annual reports (10-K/20-F)
     - Investor presentations
     - Earnings call transcripts
     - Guidance updates
     - Dividend history
```

### Phase 2: Financial Performance Analysis

```
3. Income Statement Trends
   - Search for last 12 quarters of data:
     - Revenue growth (YoY and sequential)
     - Gross margin evolution
     - Operating margin trends
     - Net income progression
     - EPS growth
   - Calculate:
     - Revenue CAGR (3 and 5 year)
     - Margin expansion/contraction
     - Earnings quality metrics

4. Balance Sheet Health
   - Extract key metrics:
     - Cash and equivalents
     - Total debt
     - Working capital
     - Shareholders' equity
   - Calculate:
     - Debt-to-equity ratio
     - Current ratio
     - Quick ratio
     - Return on equity (ROE)
     - Return on assets (ROA)

5. Cash Flow Analysis
   - Track quarterly trends in:
     - Operating cash flow
     - Free cash flow
     - Capital expenditures
     - Cash conversion cycle
   - Assess:
     - Cash generation ability
     - Capital intensity
     - Dividend sustainability
```

### Phase 3: Market Performance & Valuation

```
6. Stock Performance Analysis
   - Use `web_search_exa` for stock data:
     - Current price and market cap
     - 52-week high/low
     - YTD, 1Y, 3Y, 5Y returns
     - Beta and volatility
     - Trading volume trends
   
7. Valuation Metrics
   - Calculate/extract:
     - P/E ratio (trailing and forward)
     - EV/EBITDA
     - P/S ratio
     - P/B ratio
     - PEG ratio
   - Compare to:
     - Historical averages
     - Industry peers
     - Market benchmarks

8. Analyst Coverage
   - Search for analyst reports:
     - Consensus estimates
     - Price targets
     - Buy/Hold/Sell ratings
     - Recent upgrades/downgrades
   - Track:
     - Estimate revisions
     - Surprise history
     - Analyst sentiment shifts
```

### Phase 4: Strategic Financial Initiatives

```
9. Capital Allocation Analysis
   - Track management's use of capital:
     - Dividend policy and history
     - Share buyback programs
     - M&A activity and spending
     - R&D investment levels
     - CapEx priorities
   
10. Debt & Financing Structure
    - Analyze debt composition:
      - Short vs. long-term debt
      - Interest rates
      - Maturity schedule
      - Credit ratings
      - Recent refinancing
    - Assess:
      - Leverage appropriateness
      - Refinancing risks
      - Interest coverage

11. Growth Investment Tracking
    - R&D spending (% of revenue)
    - Sales & marketing efficiency
    - Geographic expansion costs
    - Digital transformation investments
    - Strategic partnerships/JVs
```

### Phase 5: Forward-Looking Analysis

```
12. Management Guidance Assessment
    - Extract latest guidance:
      - Revenue projections
      - Margin expectations
      - EPS guidance
      - CapEx plans
      - Strategic priorities
    - Track guidance history:
      - Achievement rate
      - Revision patterns
      - Credibility score

13. Growth Driver Analysis
    - Identify key growth levers:
      - Product pipeline
      - Market expansion
      - Pricing power
      - Market share gains
      - Operational efficiency
    - Quantify impact potential

14. Risk Factor Assessment
    - From 10-K risk sections
    - Analyst concern mentions
    - Market-specific risks:
      - Competitive threats
      - Regulatory changes
      - Technology disruption
      - Macro dependencies
      - Customer concentration
```

### Phase 6: Investor Sentiment & Momentum

```
15. Institutional Investor Activity
    - Use `web_search_exa` for 13F filings:
      - Major holders
      - Recent buyer/sellers
      - Hedge fund interest
      - Index inclusion
    
16. Retail Investor Sentiment
    - Use `reddit_search_exa` on investing subs:
      - r/wallstreetbets mentions
      - r/stocks discussions
      - r/investing analysis
    - Gauge:
      - Sentiment direction
      - Common concerns
      - Thesis quality

17. Options Market Signals
    - Search for unusual options activity
    - Put/call ratios
    - Implied volatility
    - Major expiration concentrations
```

### Phase 7: Comprehensive Assessment

```
18. Financial Strength Scoring
    - Profitability score
    - Growth score
    - Efficiency score
    - Balance sheet score
    - Cash flow score

19. Investment Thesis Development
    - Bull case construction
    - Bear case construction
    - Base case probability
    - Catalyst identification
    - Time horizon assessment
```

## Output Format

```markdown
# Financial Analysis: [Company Name] ([Ticker])

## Executive Summary
- **Recommendation**: [Buy/Hold/Sell]
- **Target Price**: $[X] ([Y]% upside/downside)
- **Investment Horizon**: [Timeframe]
- **Risk Level**: [Low/Medium/High]
- **Key Thesis**: [One-line summary]

## Company Snapshot
- **Market Cap**: $[X]B
- **Enterprise Value**: $[X]B  
- **Revenue (TTM)**: $[X]B
- **Net Income (TTM)**: $[X]M
- **Cash**: $[X]B | **Debt**: $[X]B

## Financial Performance

### Revenue Analysis
| Period | Revenue | YoY Growth | Sequential |
|--------|---------|------------|-----------|
| Q4 2023 | $[X]B | [Y]% | [Z]% |
| Q3 2023 | $[X]B | [Y]% | [Z]% |
| Q2 2023 | $[X]B | [Y]% | [Z]% |
| Q1 2023 | $[X]B | [Y]% | [Z]% |

**Key Insights**:
- 3-Year Revenue CAGR: [X]%
- Growth Trajectory: [Accelerating/Stable/Decelerating]
- Driver Analysis: [What's driving growth]

### Profitability Metrics
| Metric | Current | 1Y Ago | 3Y Ago | Trend |
|--------|---------|---------|---------|--------|
| Gross Margin | [X]% | [Y]% | [Z]% | ↑/↓/→ |
| Operating Margin | [X]% | [Y]% | [Z]% | ↑/↓/→ |
| Net Margin | [X]% | [Y]% | [Z]% | ↑/↓/→ |
| ROE | [X]% | [Y]% | [Z]% | ↑/↓/→ |
| ROIC | [X]% | [Y]% | [Z]% | ↑/↓/→ |

### Cash Flow Health
- **Operating Cash Flow (TTM)**: $[X]B
- **Free Cash Flow (TTM)**: $[X]B
- **FCF Margin**: [X]%
- **FCF Conversion**: [X]% of net income
- **CapEx/Revenue**: [X]%

## Valuation Analysis

### Current Valuation Multiples
| Metric | Company | Industry Avg | Premium/Discount |
|--------|---------|--------------|------------------|
| P/E (TTM) | [X] | [Y] | [+/-Z]% |
| Forward P/E | [X] | [Y] | [+/-Z]% |
| EV/EBITDA | [X] | [Y] | [+/-Z]% |
| P/S | [X] | [Y] | [+/-Z]% |
| PEG | [X] | [Y] | [+/-Z]% |

### Historical Valuation Range
- **5-Year P/E Range**: [Low] - [High]
- **Current Position**: [X] percentile
- **Mean Reversion Target**: $[Price]

## Market Performance

### Stock Price Performance
| Period | Return | vs S&P 500 | vs Industry |
|--------|--------|------------|-------------|
| YTD | [X]% | [+/-Y]% | [+/-Z]% |
| 1 Year | [X]% | [+/-Y]% | [+/-Z]% |
| 3 Year | [X]% | [+/-Y]% | [+/-Z]% |
| 5 Year | [X]% | [+/-Y]% | [+/-Z]% |

### Technical Indicators
- **52-Week Range**: $[Low] - $[High]
- **Current Price**: $[X] ([Y]% from high)
- **50-Day MA**: $[X] ([Above/Below])
- **200-Day MA**: $[X] ([Above/Below])
- **RSI**: [Value] ([Overbought/Neutral/Oversold])

## Analyst Consensus

### Coverage Summary
- **Number of Analysts**: [X]
- **Average Price Target**: $[X] ([Y]% upside)
- **High Target**: $[X] | **Low Target**: $[Y]

### Rating Distribution
- Buy: [X] ([Y]%)
- Hold: [X] ([Y]%)
- Sell: [X] ([Y]%)

### Recent Actions
| Date | Firm | Action | Price Target | Note |
|------|------|--------|--------------|------|
| [Date] | [Firm] | [Upgrade/Downgrade] | $[X] | [Reason] |

## Capital Allocation

### Shareholder Returns
- **Dividend Yield**: [X]%
- **5-Year Dividend CAGR**: [X]%
- **Payout Ratio**: [X]%
- **Buyback (TTM)**: $[X]B
- **Total Return to Shareholders**: $[X]B

### Growth Investments
- **R&D/Revenue**: [X]%
- **M&A Spending (3Y)**: $[X]B
- **CapEx/Revenue**: [X]%
- **Key Initiatives**: [List]

## Financial Health Indicators

### Balance Sheet Strength
- **Debt/Equity**: [X]
- **Net Debt/EBITDA**: [X]
- **Interest Coverage**: [X]x
- **Current Ratio**: [X]
- **Altman Z-Score**: [X] ([Safe/Caution/Distress])

### Credit Profile
- **Credit Rating**: [Agency]: [Rating]
- **Outlook**: [Positive/Stable/Negative]
- **CDS Spread**: [X] bps
- **Next Debt Maturity**: $[X]B in [Year]

## Growth Outlook

### Revenue Projections
| Year | Consensus | Bull Case | Bear Case |
|------|-----------|-----------|-----------|
| 2024 | $[X]B ([Y]%) | $[X]B | $[X]B |
| 2025 | $[X]B ([Y]%) | $[X]B | $[X]B |
| 2026 | $[X]B ([Y]%) | $[X]B | $[X]B |

### Key Growth Drivers
1. **[Driver 1]**: [Impact quantification]
2. **[Driver 2]**: [Impact quantification]
3. **[Driver 3]**: [Impact quantification]

### Management Guidance
- **FY Revenue**: $[X]B - $[Y]B
- **Operating Margin**: [X]% - [Y]%
- **EPS**: $[X] - $[Y]
- **Confidence Level**: [High/Medium/Low]

## Risk Analysis

### Key Investment Risks
1. **[Risk 1]**: [Description and impact]
   - Probability: [High/Medium/Low]
   - Mitigation: [Company strategy]

2. **[Risk 2]**: [Description and impact]
   - Probability: [High/Medium/Low]
   - Mitigation: [Company strategy]

### Scenario Analysis
| Scenario | Probability | Target Price | Return |
|----------|-------------|--------------|---------|
| Bull Case | 25% | $[X] | +[Y]% |
| Base Case | 50% | $[X] | +[Y]% |
| Bear Case | 25% | $[X] | -[Y]% |

## Investment Thesis

### Bull Case ([X]% probability)
- [Key argument 1]
- [Key argument 2]
- [Key argument 3]
- **Target Price**: $[X] ([Y]% upside)

### Base Case ([X]% probability)
- [Key argument 1]
- [Key argument 2]
- **Target Price**: $[X] ([Y]% upside)

### Bear Case ([X]% probability)
- [Key concern 1]
- [Key concern 2]
- **Target Price**: $[X] ([Y]% downside)

## Catalysts & Timeline

### Near-term (0-6 months)
- [Catalyst 1]: [Expected impact]
- [Catalyst 2]: [Expected impact]

### Medium-term (6-18 months)
- [Catalyst 1]: [Expected impact]
- [Catalyst 2]: [Expected impact]

### Long-term (18+ months)
- [Catalyst 1]: [Expected impact]

## Recommendation

**Action**: [Buy/Hold/Sell]
**Conviction Level**: [High/Medium/Low]
**Position Sizing**: [% of portfolio]
**Time Horizon**: [Months/Years]

### Key Reasons
1. [Primary reason with evidence]
2. [Secondary reason with evidence]
3. [Tertiary reason with evidence]

### Key Risks to Monitor
1. [Risk to watch]
2. [Risk to watch]

---

**Analysis Date**: [Date]
**Next Review**: [Date]
**Analyst**: [AI-Generated]

### Data Sources & Confidence
- Company Filings: [Dates]
- Market Data: [Source]
- Analyst Reports: [Count] reports
- Confidence Level: [High/Medium/Low]
```

## Best Practices

1. **Multi-Source Validation**: Cross-check financial data across sources
2. **Temporal Consistency**: Ensure all data uses same time periods
3. **Adjustment Clarity**: Note any non-GAAP adjustments
4. **Peer Comparison**: Always benchmark against relevant peers
5. **Risk-Adjusted Returns**: Consider risk when making recommendations

## Advanced Techniques

### Financial Forensics
- Analyze accounting quality scores
- Detect earnings management signals
- Review auditor changes and concerns
- Track related party transactions
- Monitor off-balance sheet items

### Alternative Data Integration
- Web traffic and app download trends
- Social media sentiment tracking
- Employee review trends (Glassdoor)
- Supply chain signals
- Patent filing activity

### Quantitative Modeling
- Build DCF models from extracted data
- Monte Carlo simulation for scenarios
- Regression analysis on value drivers
- Factor model positioning
- Technical analysis integration

### Event-Driven Analysis
- M&A probability and impact
- Activist investor positioning
- Regulatory decision impacts
- Product launch modeling
- Competitive response scenarios

## Common Pitfalls to Avoid

1. **Accounting Manipulation**: Watch for aggressive accounting
2. **Guidance Games**: Understand management's guidance strategy
3. **One-Time Items**: Properly adjust for non-recurring items
4. **Seasonality**: Account for business seasonality in trends
5. **Currency Effects**: Separate organic from FX-driven growth

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Financial-Research-Analyst
motivation: Provide institutional-quality financial analysis with actionable investment recommendations
constraints: Use only publicly available data, maintain objectivity, quantify all claims, provide clear rationale
output_format: Professional investment research report with data tables, charts concepts, and clear recommendations
-->

When deploying task agents for financial analysis:
1. Require specific data sources for all financial metrics
2. Demand both bull and bear case analysis
3. Insist on peer comparison context
4. Request confidence levels on projections
5. Ensure risk-adjusted recommendation framework

## Customization Options

### Analysis Types
- **Equity Research**: Full fundamental analysis
- **Credit Analysis**: Focus on debt sustainability
- **M&A Target**: Valuation and synergy analysis
- **Turnaround**: Distressed situation analysis
- **Growth Investment**: High-growth metric focus

### Report Depth
- **Flash Note**: 1-page key metrics (1 hour)
- **Initiation Report**: Full analysis (1 day)
- **Deep Dive**: Include modeling (2-3 days)
- **Ongoing Coverage**: Quarterly updates

### Sector Adaptations
- **Technology**: ARR, CAC, churn metrics
- **Retail**: Same-store sales, inventory
- **Banks**: NIM, loan quality, capital ratios
- **REITs**: FFO, occupancy, cap rates
- **Biotech**: Pipeline, cash runway, catalysts