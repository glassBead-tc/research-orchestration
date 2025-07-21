# SWOT Analysis Aggregation Orchestration

This workflow automatically performs SWOT analysis by retrieving information on competitors' Strengths/Weaknesses and market Opportunities/Threats, synthesizing a comparative strategic assessment.

## Overview

SWOT analysis remains a fundamental strategic planning tool. This orchestration automates the collection and synthesis of internal (Strengths/Weaknesses) and external (Opportunities/Threats) factors for both your company and competitors. By aggregating data from multiple sources, it provides an objective, comprehensive view of strategic positions and options.

## Required Tools

- `company_research_exa` - Company fundamentals and performance
- `competitor_finder_exa` - Identify companies to analyze  
- `web_search_exa` - News, analysis, and market intelligence
- `reddit_search_exa` - Customer perceptions and pain points
- `research_paper_search_exa` - Industry trends and analysis
- `linkedin_search_exa` - Talent and organizational insights

## Workflow Steps

### Phase 1: Analysis Framework Setup

```
1. Company Identification
   - Target company selection
   - Use `competitor_finder_exa` for peer set
   - Select 3-5 companies for comparison
   - Include:
     - Direct competitors
     - Best-in-class players
     - Emerging disruptors

2. Evaluation Criteria Definition
   - Industry-specific success factors
   - Customer value drivers
   - Financial performance metrics
   - Innovation indicators
   - Operational excellence markers
   - Market position factors
```

### Phase 2: Strengths Discovery

```
3. Core Competency Identification
   For each company, use `company_research_exa` and `web_search_exa`:
   - Unique capabilities
   - Patent portfolios
   - Proprietary technology
   - Market-leading positions
   - Brand value
   - Network effects

4. Performance Excellence Areas
   - Financial strengths:
     - Profitability leaders
     - Growth rates
     - Cash generation
     - Capital efficiency
   - Operational strengths:
     - Efficiency metrics
     - Quality indicators
     - Speed/agility
     - Scale advantages

5. Competitive Advantages
   - Sustainable differentiators
   - Customer loyalty drivers
   - Switching costs created
   - Distribution advantages
   - Regulatory moats
   - Data advantages
```

### Phase 3: Weaknesses Identification

```
6. Performance Gap Analysis
   - Below-market metrics:
     - Growth shortfalls
     - Margin compression
     - Market share losses
     - Customer churn
   - Operational challenges:
     - Quality issues
     - Delivery problems
     - Technology debt
     - Process inefficiencies

7. Customer Pain Point Mining
   Use `reddit_search_exa` and review sites:
   - Common complaints
   - Feature gaps
   - Service failures
   - Pricing concerns
   - Support issues
   - User experience friction

8. Organizational Vulnerabilities  
   Use `linkedin_search_exa` and `web_search_exa`:
   - Talent gaps
   - Leadership turnover
   - Cultural issues
   - Innovation stagnation
   - Execution challenges
   - Strategic confusion
```

### Phase 4: Opportunities Scanning

```
9. Market Growth Opportunities
   Use `web_search_exa` and `research_paper_search_exa`:
   - Emerging market segments
   - Geographic expansion potential
   - Demographic shifts
   - Technology enablers
   - Regulatory changes
   - Economic tailwinds

10. Strategic Opportunities
    - Underserved customer needs
    - Adjacent market entry
    - Partnership possibilities
    - M&A targets
    - Platform opportunities
    - Ecosystem development

11. Innovation Opportunities
    - Technology disruptions
    - Business model innovation
    - Process improvements
    - Customer experience enhancement
    - Digital transformation
    - Sustainability initiatives
```

### Phase 5: Threats Assessment

```
12. Competitive Threats
    - New entrant risks
    - Substitute products
    - Competitive innovations
    - Price pressure
    - Market share erosion
    - Talent competition

13. Market/External Threats
    - Economic downturns
    - Regulatory changes
    - Technology obsolescence
    - Supply chain risks
    - Geopolitical issues
    - Environmental factors

14. Internal Risk Factors
    - Dependency concentrations
    - Technical debt
    - Organizational inertia
    - Resource constraints
    - Succession risks
    - Cultural resistance
```

### Phase 6: Synthesis and Comparison

```
15. SWOT Scoring Framework
    - Weight factors by importance
    - Score each element (1-10)
    - Calculate category scores
    - Create competitive indices

16. Cross-Company Comparison
    - Relative strength positions
    - Common weaknesses
    - Shared opportunities
    - Universal threats
    - Unique positions

17. Strategic Implications
    - Matching strengths to opportunities
    - Converting weaknesses to strengths
    - Defending against threats
    - Competitive positioning options
```

## Output Format

```markdown
# Comparative SWOT Analysis
## Companies Analyzed: [List]
## Analysis Date: [Date]

### Executive Summary
| Company | Strength Score | Weakness Score | Opportunity Score | Threat Score | Overall Position |
|---------|---------------|----------------|-------------------|--------------|------------------|
| [Company A] | [8.2/10] | [3.5/10] | [7.8/10] | [4.2/10] | Strong |
| [Company B] | [6.5/10] | [5.8/10] | [6.2/10] | [6.5/10] | Moderate |
| [Company C] | [7.1/10] | [4.2/10] | [8.5/10] | [3.8/10] | Strong |

**Key Insight**: [Most important strategic finding]

### Detailed SWOT Analysis

## [Company A] SWOT Profile

### Strengths (Score: 8.2/10)
| Strength | Impact | Evidence | Sustainability |
|----------|--------|----------|----------------|
| **Market Leadership** | High | #1 position with 35% share | Strong moat |
| **Technology Platform** | High | Proprietary tech, 50+ patents | 3-5 years |
| **Brand Recognition** | High | 85% unaided awareness | Very strong |
| **Financial Resources** | Medium | $2B cash, 40% margins | Sustainable |
| **Talent Density** | Medium | 500+ engineers from top schools | Competitive |

**Core Competitive Advantages**:
1. Network effects from [X] million users
2. Switching costs of $[Y] per customer
3. Data advantage with [Z] unique datasets

### Weaknesses (Score: 3.5/10)
| Weakness | Severity | Evidence | Improvement Path |
|----------|----------|----------|------------------|
| **Geographic Concentration** | Medium | 70% revenue from one market | International expansion |
| **Legacy Systems** | Medium | 40% on outdated infrastructure | $50M modernization |
| **Customer Service** | Low | 3.2/5 satisfaction score | Training + tools |
| **Innovation Speed** | Medium | 18-month product cycles | Agile transformation |

**Critical Gaps to Address**:
1. International presence significantly below competitors
2. Technical debt limiting feature velocity
3. Customer experience lagging best-in-class by 20%

### Opportunities (Score: 7.8/10)
| Opportunity | Potential | Timeframe | Investment Required |
|-------------|-----------|-----------|-------------------|
| **Emerging Markets** | $2B TAM | 2-3 years | $100M |
| **Platform Economy** | $500M revenue | 1-2 years | $50M |
| **AI Integration** | 30% efficiency gain | 1 year | $25M |
| **Sustainability** | Brand value + cost | 2 years | $30M |
| **B2B Expansion** | $1B TAM | 2-3 years | $75M |

**Strategic Priorities**:
1. Geographic expansion could double addressable market
2. Platform strategy could create new revenue streams
3. AI could provide sustainable cost advantage

### Threats (Score: 4.2/10)
| Threat | Probability | Impact | Mitigation Strategy |
|--------|-------------|---------|-------------------|
| **New Regulations** | High | -10% margin | Compliance investment |
| **Tech Disruption** | Medium | Market shift | Innovation focus |
| **Economic Downturn** | Medium | -20% revenue | Diversification |
| **Cyber Risks** | Medium | Brand damage | Security upgrade |
| **Talent War** | High | Cost increase | Culture + comp |

**Risk Management Priorities**:
1. Regulatory compliance program needed by Q2
2. Innovation investment must increase 50%
3. Geographic diversification critical for resilience

## [Company B] SWOT Profile
[Similar detailed structure for each company]

### Comparative Analysis

#### Strength Comparison
| Strength Factor | Company A | Company B | Company C | Industry Best |
|-----------------|-----------|-----------|-----------|---------------|
| Market Position | 9/10 | 6/10 | 7/10 | Company A |
| Financial Health | 8/10 | 7/10 | 6/10 | Company A |
| Innovation | 7/10 | 9/10 | 8/10 | Company B |
| Operations | 8/10 | 7/10 | 9/10 | Company C |
| Brand Value | 9/10 | 6/10 | 7/10 | Company A |
| Talent | 7/10 | 8/10 | 8/10 | Company B/C |

#### Weakness Patterns
**Common Weaknesses Across Industry**:
1. **Digital Transformation Lag**: All players behind tech natives
2. **Customer Experience**: Industry average NPS of 25 vs 50+ best-in-class
3. **Agility**: 12-18 month cycles vs 3-6 months in tech

**Unique Weaknesses by Company**:
- Company A: International expansion weakness
- Company B: Profitability challenges  
- Company C: Brand awareness gaps

#### Opportunity Landscape
| Opportunity | Company A Fit | Company B Fit | Company C Fit |
|-------------|--------------|--------------|--------------|
| Geographic Expansion | High need, High capability | Medium/Medium | High/Medium |
| Digital Platforms | Medium/High | High/High | Medium/Medium |
| Sustainability | High/High | Medium/Medium | High/High |
| M&A Consolidation | High/High | Low/Medium | Medium/High |

#### Threat Exposure Matrix
| Threat Type | Company A | Company B | Company C | Mitigation Leader |
|-------------|-----------|-----------|-----------|-------------------|
| Regulatory | High | Medium | Medium | Company C |
| Disruption | Medium | Low | Medium | Company B |
| Economic | Low | High | Medium | Company A |
| Competition | Medium | High | High | Company A |

### Strategic Recommendations

#### For Company A
**Strategic Priorities** (Leverage Strengths → Opportunities):
1. Use market leadership to drive platform strategy
2. Deploy financial resources for international expansion
3. Leverage brand for sustainability leadership

**Defensive Moves** (Address Weaknesses + Threats):
1. Accelerate international expansion to reduce concentration
2. Modernize tech stack to maintain innovation edge
3. Prepare for regulatory changes with compliance investment

#### For Company B
[Similar strategic recommendations structure]

#### For Company C
[Similar strategic recommendations structure]

### SWOT-Based Strategic Options

#### Option 1: Strength-Opportunity Strategies (Offensive)
- **Company A**: Platform dominance play
- **Company B**: Innovation disruption strategy
- **Company C**: Operational excellence expansion

#### Option 2: Weakness-Opportunity Strategies (Corrective)
- **Company A**: International partnership strategy
- **Company B**: Profitability transformation
- **Company C**: Brand building campaign

#### Option 3: Strength-Threat Strategies (Defensive)
- **Company A**: Regulatory moat building
- **Company B**: Innovation barriers
- **Company C**: Efficiency-based competition

#### Option 4: Weakness-Threat Strategies (Survival)
- **Company A**: Geographic hedging
- **Company B**: Niche focus
- **Company C**: Partnership/M&A

### Dynamic SWOT Tracking

#### Leading Indicators to Monitor
1. **Strength Erosion Signals**:
   - Market share trends
   - Relative NPS movement
   - Talent retention rates

2. **Weakness Improvement Tracking**:
   - Digital transformation metrics
   - Customer satisfaction trends
   - Operational KPIs

3. **Opportunity Capture Metrics**:
   - New market revenue
   - Platform adoption
   - Innovation pipeline value

4. **Threat Materialization Warnings**:
   - Regulatory consultation papers
   - Competitor investment patterns
   - Technology adoption curves

### Next Steps & Action Items

#### Immediate (30 days)
1. Validate SWOT findings with internal data
2. Prioritize top 3 strategic initiatives
3. Assign executive sponsors
4. Define success metrics

#### Short-term (90 days)
1. Develop detailed action plans
2. Allocate resources
3. Launch quick wins
4. Establish monitoring dashboard

#### Long-term (Annual)
1. Quarterly SWOT updates
2. Strategy adjustment based on results
3. Competitive response planning
4. Annual strategic review

---

**Methodology**: [Data sources and approach]
**Confidence Level**: [High/Medium/Low by section]
**Next Update**: [Recommended timing]
```

## Best Practices

1. **Evidence-Based Scoring**: Support all assessments with data
2. **Relative Positioning**: Always compare to competitors, not absolute
3. **Dynamic Perspective**: Consider trajectory, not just current state
4. **Actionable Focus**: Link every insight to strategic options
5. **Regular Updates**: SWOT is a living document, not one-time

## Advanced Techniques

### Weighted SWOT Scoring
- Assign importance weights to factors
- Use customer research for weighting
- Calculate weighted scores
- Create strategic indices
- Track score evolution

### SWOT Scenario Planning
- Best case SWOT evolution
- Worst case SWOT evolution
- Most likely progression
- Disruption scenarios
- Strategic option testing

### Dynamic SWOT Modeling
- Link SWOT factors to financials
- Model strategic option impacts
- Simulate competitive responses
- Calculate ROI of improvements
- Optimize resource allocation

### SWOT-Based War Gaming
- Assume competitor perspectives
- Predict competitor moves
- Test strategic options
- Identify stable strategies
- Find win-win opportunities

## Common Pitfalls to Avoid

1. **List Making**: Creating lists without strategic synthesis
2. **Internal Bias**: Over-rating own strengths, under-rating weaknesses
3. **Static Analysis**: Not considering future evolution
4. **Generic Factors**: Using same SWOT for every industry
5. **Analysis Paralysis**: Perfect data vs. actionable insights

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Strategic-Analysis-Expert
motivation: Create actionable SWOT analyses that drive competitive advantage through systematic assessment
constraints: Use verifiable data, maintain objectivity, compare relatively, focus on strategic implications
output_format: Comparative SWOT matrices with scoring, strategic options, and action recommendations
-->

When deploying task agents for SWOT analysis:
1. Require evidence for every strength/weakness claim
2. Demand quantified scoring where possible
3. Always include competitive comparison
4. Focus on relative not absolute positions
5. Ensure every insight links to strategic options

## Customization Options

### Industry Adaptations
- **Technology**: Innovation, talent, platform effects
- **Retail**: Location, brand, supply chain
- **Financial**: Risk management, regulation, trust
- **Healthcare**: Clinical outcomes, access, cost
- **Manufacturing**: Efficiency, quality, flexibility

### Analysis Depth
- **Quick SWOT**: Top 5 factors each (2 hours)
- **Standard SWOT**: Comprehensive analysis (1 day)
- **Strategic SWOT**: With scenarios and modeling (3 days)
- **Continuous SWOT**: Living document with updates

### Output Variations
- **Executive Summary**: 1-page strategic focus
- **Detailed Report**: Full evidence and analysis
- **Workshop Format**: Facilitation materials
- **Dashboard**: Visual KPIs and tracking
- **Strategic Playbook**: Action-oriented plans