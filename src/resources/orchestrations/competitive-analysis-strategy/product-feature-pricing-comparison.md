# Product Feature & Pricing Comparison Orchestration

This workflow gathers data on competitors' product features and pricing strategies, creating side-by-side comparisons to identify competitive advantages and gaps.

## Overview

Product features and pricing are central to competitive positioning. This orchestration systematically collects, analyzes, and compares product capabilities and pricing models across competitors. It reveals feature gaps, overserving, pricing opportunities, and helps optimize product-market fit while maximizing value capture.

## Required Tools

- `competitor_finder_exa` - Identify competitors to analyze
- `web_search_exa` - Product pages, pricing information, reviews
- `crawling_exa` - Extract detailed product specifications
- `reddit_search_exa` - User discussions about features and value
- `youtube_search_exa` - Product demos and comparisons
- `company_research_exa` - Business model context

## Workflow Steps

### Phase 1: Product Landscape Mapping

```
1. Product Category Definition
   - Define product boundaries
   - Identify core vs. adjacent features
   - Map use cases served
   - Segment by customer type
   - Note platform vs. point solutions

2. Competitor Product Identification
   - Use `competitor_finder_exa` for primary competitors
   - For each competitor:
     - Product names and tiers
     - Product lines/families
     - Target segments
     - Market positioning
   - Include:
     - Direct alternatives
     - Partial substitutes
     - Emerging solutions

3. Feature Taxonomy Creation
   - Core features (must-have)
   - Differentiating features (competitive advantage)
   - Delighter features (exceed expectations)
   - Table stakes (expected by all)
   - Emerging features (future standard)
```

### Phase 2: Feature Discovery & Documentation

```
4. Official Feature Documentation
   - Use `web_search_exa` and `crawling_exa` on:
     - Product pages
     - Documentation sites
     - Comparison pages
     - Spec sheets
   - Extract:
     - Complete feature lists
     - Technical specifications
     - Integration capabilities
     - Platform compatibility
     - Limits and constraints

5. Hidden Feature Discovery
   - Use `reddit_search_exa` for:
     - "Hidden features [product]"
     - "Tips and tricks [product]"
     - "[Product] vs [competitor]"
   - Use `youtube_search_exa` for:
     - Product tutorials
     - Power user videos
     - Comparison reviews
   - Discover:
     - Undocumented capabilities
     - Workflow advantages
     - Integration possibilities

6. Feature Depth Analysis
   For each major feature:
   - Implementation quality
   - Ease of use
   - Performance metrics
   - Reliability indicators
   - Customization options
   - Scalability limits
```

### Phase 3: Pricing Intelligence Gathering

```
7. Pricing Model Discovery
   - Pricing structure types:
     - Subscription tiers
     - Usage-based pricing
     - Per-user pricing
     - Feature-based tiers
     - Freemium models
     - One-time purchase
     - Custom/enterprise pricing

8. Price Point Documentation
   - For each competitor:
     - Entry-level pricing
     - Mid-tier pricing
     - Premium/enterprise pricing
     - Add-on costs
     - Hidden fees
     - Discount policies
     - Contract terms

9. Total Cost of Ownership (TCO)
   - Implementation costs
   - Training requirements
   - Integration expenses
   - Maintenance fees
   - Upgrade paths
   - Switching costs
   - Hidden operational costs
```

### Phase 4: Value Proposition Analysis

```
10. Feature-Value Mapping
    - Which features drive purchasing
    - Price sensitivity by feature
    - Must-have vs. nice-to-have
    - Feature usage statistics
    - ROI justifications

11. Pricing Psychology Analysis
    - Anchor pricing strategies
    - Decoy effects in tiers
    - Bundle compositions
    - Discount strategies
    - Free trial approaches
    - Upgrade triggers

12. Customer Perception Mining
    - Use `reddit_search_exa` for:
      - "Is [product] worth it"
      - "[Product] pricing too expensive"
      - "Alternatives to [product]"
    - Extract:
      - Price-value perception
      - Feature importance ranking
      - Switching triggers
      - Budget constraints
```

### Phase 5: Competitive Positioning

```
13. Feature Parity Analysis
    - Features we match
    - Features we lead
    - Features we lack
    - Features unique to us
    - Features becoming commoditized

14. Pricing Position Mapping
    - Our position in market
    - Price leadership opportunities
    - Value perception gaps
    - Pricing power indicators
    - Elasticity insights

15. Differentiation Opportunities
    - Underserved feature areas
    - Overpriced feature sets
    - Bundle opportunities
    - New pricing models
    - Value innovation options
```

### Phase 6: Strategic Synthesis

```
16. Competitive Response Options
    - Feature development priorities
    - Pricing adjustments needed
    - Bundle reconfigurations
    - Positioning changes
    - Go-to-market updates

17. Market Evolution Prediction
    - Features becoming standard
    - Pricing model trends
    - Value migration patterns
    - Disruption indicators
    - Innovation directions

18. Action Planning
    - Quick wins available
    - Strategic investments needed
    - Defensive moves required
    - Partnership opportunities
    - Communication strategies
```

## Output Format

```markdown
# Product Feature & Pricing Competitive Analysis
## Market: [Product Category]
## Date: [Analysis Date]

### Executive Summary
- **Products Analyzed**: [Number] products across [Number] competitors
- **Our Competitive Position**: [Leader/Parity/Laggard]
- **Key Advantage**: [Our biggest differentiator]
- **Critical Gap**: [Most important missing feature]
- **Pricing Position**: [Premium/Competitive/Value]

### Market Overview

#### Product Landscape
| Company | Product Name | Positioning | Target Market | Maturity |
|---------|-------------|-------------|---------------|----------|
| [Us] | [Product] | [Position] | [Segment] | [Stage] |
| [Competitor A] | [Product] | [Position] | [Segment] | [Stage] |
| [Competitor B] | [Product] | [Position] | [Segment] | [Stage] |
| [Competitor C] | [Product] | [Position] | [Segment] | [Stage] |

#### Pricing Model Distribution
- Subscription: [X]% of competitors
- Usage-based: [Y]% of competitors
- Per-user: [Z]% of competitors
- Hybrid models: [A]% of competitors

### Detailed Feature Comparison

#### Core Features Matrix
| Feature | Us | Comp A | Comp B | Comp C | Market Standard |
|---------|-----|---------|---------|---------|-----------------|
| **Feature Category 1** |
| Feature 1.1 | ✓ Full | ✓ Full | ✓ Basic | ✗ | Expected |
| Feature 1.2 | ✓ Advanced | ✓ Basic | ✓ Full | ✓ Basic | Growing |
| Feature 1.3 | ✗ | ✓ Full | ✓ Full | ✓ Full | **Gap** |
| **Feature Category 2** |
| Feature 2.1 | ✓ Unique | ✗ | ✗ | ✗ | **Advantage** |
| Feature 2.2 | ✓ Full | ✓ Full | ✓ Full | ✓ Full | Table Stakes |

Legend: ✓ Full (Complete implementation) | ✓ Basic (Limited implementation) | ✓ Advanced (Superior implementation) | ✗ (Not available)

#### Differentiating Features

##### Our Unique Advantages
1. **[Unique Feature 1]**
   - Description: [What it does]
   - Value Prop: [Why customers care]
   - Usage: [X]% of customers actively use
   - Competitor Gap: [Why others don't have it]

2. **[Unique Feature 2]**
   - Technical Moat: [Why hard to copy]
   - Customer Impact: [Measurable benefit]

##### Competitor Unique Features
**[Competitor A] Advantages**:
- [Feature X]: [Impact on competition]
- [Feature Y]: [Customer attraction power]

**[Competitor B] Advantages**:
- [Feature Z]: [Market differentiation]

#### Feature Depth Analysis

##### Implementation Quality Scores (1-10)
| Feature Area | Us | Comp A | Comp B | Comp C |
|--------------|-----|---------|---------|---------|
| User Experience | 8.5 | 7.0 | 9.0 | 6.5 |
| Performance | 9.0 | 8.0 | 7.5 | 8.5 |
| Reliability | 8.0 | 9.0 | 8.5 | 7.0 |
| Flexibility | 7.5 | 6.5 | 8.0 | 9.0 |
| Scalability | 9.0 | 8.5 | 7.0 | 8.0 |

### Pricing Analysis

#### Pricing Structure Comparison
| Company | Entry Price | Mid-Tier | Enterprise | Pricing Model |
|---------|-------------|----------|------------|---------------|
| [Us] | $[X]/mo | $[Y]/mo | Custom | Per user + features |
| [Comp A] | $[X]/mo | $[Y]/mo | $[Z]/mo | Flat rate |
| [Comp B] | Free | $[Y]/mo | Custom | Freemium |
| [Comp C] | $[X]/mo | $[Y]/mo | Custom | Usage-based |

#### Feature-Tier Mapping
| Feature | Us Basic | Us Pro | Comp A Starter | Comp A Pro |
|---------|----------|---------|----------------|------------|
| Users | 5 | Unlimited | 10 | 100 |
| Storage | 10GB | 100GB | 5GB | 50GB |
| [Feature X] | ✗ | ✓ | ✓ | ✓ |
| [Feature Y] | Basic | Full | ✗ | Full |
| Support | Email | 24/7 | Email | Priority |

#### Total Cost of Ownership (Annual)
| Scenario | Us | Comp A | Comp B | Comp C |
|----------|-----|---------|---------|---------|
| Small Team (5 users) | $[X] | $[Y] | $[Z] | $[A] |
| Mid-Size (50 users) | $[X] | $[Y] | $[Z] | $[A] |
| Enterprise (500 users) | $[X] | $[Y] | $[Z] | $[A] |

*Includes: License fees, typical add-ons, implementation, training*

### Value Analysis

#### Price-Performance Matrix
```
High Performance ↑
    │ [Competitor B]        [Us]
    │    ♦ Premium          ♦ Premium
    │    Good Value      Best Value
    │            
    │ [Competitor C]    [Competitor A]
    │    ♦ Budget          ♦ Overpriced
    │   Best Price         Poor Value
    │
    └──────────────────────────→
      Low Price         High Price
```

#### Customer Value Perception
Based on analysis of [N] reviews and discussions:

**Perceived Strengths**:
- [Us]: [What customers value most]
- [Comp A]: [Their value perception]
- [Comp B]: [Their value perception]

**Price Sensitivity Insights**:
- Features worth premium: [List]
- Price-sensitive features: [List]
- Commoditized features: [List]

### Competitive Gaps & Opportunities

#### Critical Feature Gaps
1. **[Missing Feature 1]**
   - Competitor Implementation: [Who has it]
   - Customer Demand: [High/Medium/Low]
   - Revenue Impact: $[Estimated]
   - Development Effort: [High/Medium/Low]
   - **Recommendation**: [Build/Partner/Ignore]

2. **[Missing Feature 2]**
   - Market Expectation: [Timeline]
   - Competitive Disadvantage: [Impact]
   - **Recommendation**: [Action plan]

#### Pricing Opportunities
1. **Value Pricing Opportunity**
   - Current Position: [Underpriced by X%]
   - Evidence: [Superior features, customer willingness]
   - Revenue Impact: $[Estimated increase]
   - Risk: [Customer reaction]

2. **New Tier Opportunity**
   - Gap in Market: [Between tiers X and Y]
   - Target Segment: [Customer profile]
   - Feature Set: [Proposed features]
   - Price Point: $[Suggested]

### Strategic Recommendations

#### Immediate Actions (30 days)
1. **Pricing Adjustment**: [Specific changes]
   - Rationale: [Why now]
   - Expected Impact: [Metrics]

2. **Feature Communication**: [What to highlight]
   - Underutilized Advantages: [List]
   - Messaging Updates: [Key points]

#### Short-term Roadmap (90 days)
1. **Feature Parity**: Close gap on [Critical feature]
   - Resource Requirement: [Team/time]
   - Competitive Impact: [Neutralize disadvantage]

2. **Bundle Optimization**: [New package structure]
   - Target: [Customer segment]
   - Value Prop: [Why better]

#### Long-term Strategy (6-12 months)
1. **Differentiation Investment**: [Unique feature development]
   - Moat Building: [How it creates advantage]
   - Resource Allocation: [Investment needed]

2. **Pricing Model Evolution**: [Structural changes]
   - Market Trend Alignment: [Why necessary]
   - Migration Plan: [How to transition]

### Monitoring Framework

#### Feature Tracking
- Competitor release cycles
- Feature adoption rates
- Customer request patterns
- Technology enablers

#### Pricing Intelligence
- Price change alerts
- Promotional patterns
- Contract terms evolution
- Win/loss price factors

#### Early Warning Indicators
- [Indicator 1]: Signal of [change type]
- [Indicator 2]: Signal of [change type]
- [Indicator 3]: Signal of [change type]

### Appendices

#### A. Feature Definition Glossary
[Detailed descriptions of all features analyzed]

#### B. Pricing History Timeline
[Historical pricing changes by competitor]

#### C. Customer Quote Library
[Relevant quotes about features and pricing]

#### D. Technical Specification Details
[Detailed specs where relevant]

---

**Methodology**: [Data collection approach]
**Confidence Level**: High (pricing) / Medium (features)
**Sources**: [Number] product pages, [Number] reviews, [Number] discussions
**Next Update**: [Recommended date]
```

## Best Practices

1. **Customer-Centric View**: Focus on value delivered, not feature counts
2. **Dynamic Tracking**: Features and pricing change frequently
3. **Hidden Cost Discovery**: Look beyond sticker price to TCO
4. **Usage Reality**: Differentiate between features available vs. used
5. **Segmented Analysis**: Different segments value different features

## Advanced Techniques

### Feature Value Quantification
- Link features to customer outcomes
- Measure willingness to pay by feature
- Calculate feature ROI for customers
- Track feature usage correlation with retention
- Model price elasticity by feature

### Competitive Response Modeling
- Predict competitor feature roadmaps
- Anticipate pricing moves
- Model market equilibrium
- Identify stable differentiation
- Plan counter-moves

### Bundle Optimization Analytics
- Analyze feature combinations
- Identify natural bundles
- Calculate bundle lift
- Design tier progression
- Optimize feature gates

### Price War Simulation
- Model price reduction impacts
- Calculate break-even points
- Assess competitor sustainability
- Identify price floors
- Plan value-based defense

## Common Pitfalls to Avoid

1. **Feature Arms Race**: Adding features without customer value
2. **Price Matching**: Racing to bottom without differentiation  
3. **Complexity Creep**: Too many options confusing customers
4. **Value Blindness**: Not seeing what customers actually value
5. **Static Analysis**: Not tracking rapid market changes

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Product-Strategy-Analyst
motivation: Provide actionable competitive intelligence on features and pricing to drive product-market fit and value capture
constraints: Verify all features and prices, focus on customer value not feature lists, consider total cost not just price
output_format: Detailed comparison matrices with strategic recommendations and monitoring framework
-->

When deploying task agents for feature/pricing analysis:
1. Verify all features with multiple sources
2. Include implementation quality not just presence
3. Calculate total cost of ownership not list price
4. Link features to customer value and outcomes
5. Provide specific recommendations not just data

## Customization Options

### Industry Variations
- **SaaS**: APIs, integrations, limits, multi-tenancy
- **Hardware**: Specs, compatibility, warranty, support
- **Marketplaces**: Fees, features, reach, tools
- **Services**: Scope, quality, speed, coverage
- **Platforms**: Ecosystem, developers, extensibility

### Analysis Depth
- **Quick Scan**: Top 5 features, list prices (2 hours)
- **Standard Analysis**: Full feature matrix (1 day)
- **Deep Dive**: Include quality and TCO (2-3 days)
- **Continuous Tracking**: Live competitive dashboard

### Output Focus Options
- **Sales Enablement**: Battle cards and talk tracks
- **Product Planning**: Roadmap priorities and gaps
- **Pricing Strategy**: Optimization recommendations
- **Marketing**: Differentiation messaging
- **Executive**: Strategic implications only