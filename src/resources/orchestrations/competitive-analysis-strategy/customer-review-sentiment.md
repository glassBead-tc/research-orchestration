# Customer Review Sentiment Competitive Analysis Orchestration

This workflow collects user reviews and discussions about competitors' products to gauge relative customer satisfaction, identifying common complaints and praises for each brand.

## Overview

Customer reviews provide unfiltered insights into product performance, service quality, and competitive positioning. This orchestration systematically analyzes customer feedback across competitors to reveal satisfaction patterns, pain points, and competitive advantages. The intelligence gathered enables product improvements, marketing refinements, and competitive differentiation strategies.

## Required Tools

- `reddit_search_exa` - User discussions and comparisons
- `web_search_exa` - Review sites and testimonials
- `youtube_search_exa` - Video reviews and testimonials
- `company_research_exa` - Company context
- `competitor_finder_exa` - Identify competitors to analyze

## Workflow Steps

### Phase 1: Review Source Identification

```
1. Review Platform Mapping
   For each competitor, identify presence on:
   - General review platforms
     - Google Reviews
     - Trustpilot
     - Better Business Bureau
   - Industry-specific platforms
     - G2 (B2B software)
     - Capterra (software)
     - Consumer Reports
   - E-commerce platforms
     - Amazon reviews
     - App store reviews
   - Community platforms
     - Reddit discussions
     - Forum reviews

2. Review Volume Assessment
   - Total reviews per platform
   - Review velocity (reviews/month)
   - Review recency
   - Verified purchase percentage
   - Platform importance ranking

3. Competitor Set Definition
   Use `competitor_finder_exa`:
   - Direct competitors (same category)
   - Alternative solutions
   - Premium/budget alternatives
   - Legacy vs. modern options
```

### Phase 2: Quantitative Metrics Collection

```
4. Rating Aggregation
   For each competitor:
   - Overall rating average
   - Rating distribution (1-5 stars)
   - Platform-specific ratings
   - Temporal rating trends
   - Category-specific ratings
   
5. Review Volume Analysis
   - Total review count
   - Reviews per time period
   - Response rates
   - Helpful vote ratios
   - Verified vs. unverified

6. Comparative Scoring
   Create normalized scores:
   - Weighted average rating
   - Volume-adjusted scores
   - Recency-weighted ratings
   - Platform importance weighting
   - Category comparisons
```

### Phase 3: Qualitative Content Analysis

```
7. Review Text Mining
   Use `web_search_exa` and `reddit_search_exa`:
   Common praise themes:
   - Product quality
   - Customer service
   - Value for money
   - Ease of use
   - Reliability
   - Features
   
8. Complaint Pattern Analysis
   Common complaint categories:
   - Product issues
   - Service failures  
   - Pricing concerns
   - Technical problems
   - Delivery/fulfillment
   - Support quality

9. Feature-Specific Feedback
   - Most loved features
   - Missing features
   - Feature quality
   - Feature requests
   - Feature comparisons
   - Use case fits
```

### Phase 4: Sentiment Deep Dive

```
10. Emotional Tone Analysis
    Categorize reviews by emotion:
    - Delighted (advocates)
    - Satisfied (supporters)
    - Neutral (functional)
    - Frustrated (at-risk)
    - Angry (detractors)
    
11. Customer Journey Mapping
    Review stages mentioned:
    - Purchase decision
    - Onboarding experience
    - Daily usage
    - Support interactions
    - Renewal/repurchase
    - Recommendation likelihood

12. Switching Behavior Analysis
    Use Reddit for switching stories:
    - From which competitors
    - To which competitors
    - Switching triggers
    - Switching barriers
    - Regret/satisfaction
```

### Phase 5: Competitive Comparison

```
13. Head-to-Head Analysis
    Search for direct comparisons:
    - "[Product A] vs [Product B]"
    - "Switching from [A] to [B]"
    - "[Category] comparison"
    - "Best [category] 2024"
    Extract:
    - Win/loss reasons
    - Feature comparisons
    - Value perceptions
    - Experience differences

14. Review Response Analysis
    Company engagement quality:
    - Response rate
    - Response time
    - Response quality
    - Problem resolution
    - Follow-up effectiveness

15. Trend Identification
    - Improving vs. declining sentiment
    - Emerging issues
    - Resolved problems
    - Seasonal patterns
    - Version-specific feedback
```

### Phase 6: Strategic Insights

```
16. Competitive Advantage Mapping
    Where each competitor excels:
    - Product superiority
    - Service excellence
    - Value leadership
    - Innovation edge
    - Reliability champion

17. Vulnerability Identification
    Consistent weaknesses:
    - Product gaps
    - Service failures
    - Quality issues
    - Support problems
    - Value concerns

18. Opportunity Analysis
    - Unmet customer needs
    - Underserved segments
    - Feature opportunities
    - Service improvements
    - Market positioning
```

## Output Format

```markdown
# Customer Review Sentiment Analysis
## Competitive Set: [List of competitors]
## Analysis Period: [Date range]
## Total Reviews Analyzed: [Number]

### Executive Summary
- **Sentiment Leader**: [Company] - [Score/Rating]
- **Our Position**: [Rank] of [Total] with [Rating]
- **Key Strength**: [What customers love about us]
- **Critical Weakness**: [Main complaint about us]
- **Opportunity**: [Biggest competitive opportunity]

### Overall Sentiment Scores

#### Aggregate Ratings Comparison
| Company | Weighted Rating | Total Reviews | Trend | NPS Estimate |
|---------|----------------|---------------|--------|--------------|
| [Company A] | 4.6/5.0 | 12,453 | ↑ +0.2 | 45 |
| [Company B] | 4.4/5.0 | 8,932 | → 0.0 | 38 |
| [Us] | 4.3/5.0 | 6,234 | ↑ +0.1 | 35 |
| [Company D] | 3.9/5.0 | 15,234 | ↓ -0.3 | 18 |
| [Company E] | 3.7/5.0 | 4,521 | ↓ -0.1 | 12 |

#### Rating Distribution Analysis
| Rating | Us | Comp A | Comp B | Comp D | Comp E |
|--------|-----|---------|---------|---------|---------|
| 5 Star | 55% | 68% | 62% | 38% | 32% |
| 4 Star | 23% | 18% | 20% | 25% | 24% |
| 3 Star | 10% | 7% | 8% | 15% | 18% |
| 2 Star | 7% | 4% | 6% | 12% | 14% |
| 1 Star | 5% | 3% | 4% | 10% | 12% |

### What Customers Love (Competitive Advantages)

#### [Company A] - Sentiment Leader
**Top Praise Themes** (% of positive reviews mentioning):
1. **Reliability** (78%): "Never had a single issue in 3 years"
2. **Customer Support** (65%): "Support team goes above and beyond"
3. **Ease of Use** (61%): "Intuitive, no learning curve"
4. **Value** (45%): "Worth every penny"

**Unique Strengths**:
- 24/7 live support consistently praised
- Product stability unmatched
- Onboarding experience seamless

#### [Our Company]
**Top Praise Themes**:
1. **Innovation** (72%): "Always adding features I need"
2. **Flexibility** (68%): "Customizable to our needs"
3. **Performance** (54%): "Fast and responsive"
4. **Price** (48%): "Great value for small teams"

**Competitive Edge**:
- Feature velocity impresses users
- Customization options valued
- Price point attractive for SMBs

### Pain Points Analysis (By Company)

#### Common Complaints Across Market
| Issue Category | Us | Comp A | Comp B | Comp D |
|----------------|-----|---------|---------|---------|
| Pricing/Value | 22% | 12% | 18% | 45% |
| Bugs/Reliability | 18% | 8% | 15% | 28% |
| Customer Support | 15% | 5% | 20% | 35% |
| Missing Features | 20% | 15% | 12% | 10% |
| Learning Curve | 10% | 8% | 18% | 12% |
| Performance | 8% | 3% | 10% | 15% |

#### [Us] - Detailed Pain Points
1. **Pricing Concerns** (22% of negative reviews)
   - "Gets expensive as you scale"
   - "Hidden costs in add-ons"
   - "Annual pricing only"
   - **Impact**: Limiting growth in enterprise

2. **Bug Frequency** (18% of negative reviews)
   - "New features often buggy"
   - "Updates break existing functions"
   - **Impact**: Trust issues with power users

3. **Support Response Time** (15% of negative reviews)
   - "Email only support frustrating"
   - "48-hour response too slow"
   - **Impact**: Losing to competitors with live chat

### Feature-Specific Sentiment

#### Most Loved Features (By Company)
| Company | #1 Feature | #2 Feature | #3 Feature |
|---------|------------|------------|------------|
| Us | Automation (4.7) | Analytics (4.6) | Integrations (4.5) |
| Comp A | Reliability (4.8) | UI/UX (4.7) | Support (4.7) |
| Comp B | Speed (4.6) | Mobile App (4.5) | Collaboration (4.4) |
| Comp D | Price (4.2) | Basic Features (4.0) | Simplicity (3.9) |

#### Missing Feature Requests
**Across All Competitors**:
1. Advanced reporting (38% request rate)
2. API improvements (32%)
3. Mobile enhancements (28%)
4. AI/ML features (25%)
5. Workflow automation (22%)

### Customer Journey Sentiment

#### Satisfaction by Stage
| Stage | Us | Comp A | Comp B | Industry Avg |
|-------|-----|---------|---------|--------------|
| Trial/Demo | 4.5 | 4.7 | 4.3 | 4.4 |
| Onboarding | 4.2 | 4.8 | 4.1 | 4.3 |
| Daily Use | 4.3 | 4.6 | 4.4 | 4.3 |
| Support | 3.8 | 4.7 | 3.9 | 4.1 |
| Renewal | 4.0 | 4.5 | 4.2 | 4.1 |

### Switching Analysis

#### Customer Movement Patterns
**To Us** (Source of switchers):
- From Comp D: 45% (price/feature driven)
- From Comp B: 25% (innovation seeking)
- From Legacy: 20% (modernization)
- From Comp A: 10% (rare, usually price)

**From Us** (Destination of churners):
- To Comp A: 40% (reliability/support)
- To Comp B: 30% (specific features)
- To Nothing: 20% (no longer need)
- To Other: 10% (niche needs)

#### Switching Triggers
**Why Customers Leave Us**:
1. Reliability concerns (35%)
2. Support inadequate (25%)
3. Missing features (20%)
4. Price increases (15%)
5. Other (5%)

**Why Customers Choose Us**:
1. Better value (40%)
2. More features (30%)
3. Easier to use (20%)
4. Better innovation (10%)

### Review Response Analysis

#### Company Response Quality
| Company | Response Rate | Avg Time | Quality Score | Resolution Rate |
|---------|---------------|----------|---------------|-----------------|
| Comp A | 95% | 2 hours | 4.5/5 | 82% |
| Us | 78% | 24 hours | 4.0/5 | 70% |
| Comp B | 82% | 12 hours | 4.2/5 | 75% |
| Comp D | 45% | 72 hours | 3.2/5 | 45% |

**Best Practices Observed** (Comp A):
- Personalized responses
- Clear escalation paths
- Public follow-ups
- Turning critics to advocates

### Trend Analysis

#### Sentiment Evolution (12-Month)
```
5.0 |      A═════════════════
    |    ╱ 
4.5 |   ╱ B─────────╲────────
    |  ╱ Us━━━━━━━━━━━━━━━━━
4.0 | ╱                      
    |      D╲________________
3.5 |        ╲_______________
    |_________________________
    Q1    Q2    Q3    Q4    Q1
```

#### Emerging Themes
1. **AI/Automation Demand**: Growing 40% QoQ
2. **Mobile Experience**: Critical for 60% of users
3. **Integration Ecosystem**: Becoming table stakes
4. **Real-time Collaboration**: Post-pandemic priority
5. **Security/Compliance**: Enterprise dealbreaker

### Strategic Recommendations

#### Immediate Actions (30 days)
1. **Support Enhancement**
   - Launch live chat support
   - Reduce response time to <4 hours
   - Expected NPS lift: +5-8 points

2. **Bug Fix Sprint**
   - Address top 10 reported bugs
   - Implement better QA process
   - Expected rating improvement: +0.2

#### Short-term Initiatives (90 days)
1. **Review Response Program**
   - Target 95% response rate
   - Implement response templates
   - Train support on public responses

2. **Feature Communication**
   - Better highlight existing features
   - Address "missing" features that exist
   - Create feature discovery campaign

#### Long-term Strategy (6-12 months)
1. **Reliability Investment**
   - Match Comp A's stability
   - Implement redundancy
   - Target 99.9% uptime

2. **Support Transformation**
   - 24/7 coverage
   - Multi-channel support
   - Proactive outreach program

### Monitoring & Action Plan

#### KPIs to Track
- Overall rating (target: 4.5+)
- Review response rate (target: 95%)
- Support satisfaction (target: 4.5+)
- Bug report frequency (target: <10%)
- Feature request patterns

#### Competitive Monitoring
- Weekly sentiment tracking
- Monthly deep dive analysis
- Quarterly strategy review
- Annual positioning assessment

#### Success Metrics
- [ ] Achieve #2 position in 6 months
- [ ] Reach 4.5 overall rating
- [ ] Reduce negative reviews by 30%
- [ ] Increase advocates by 25%

---

**Data Sources**: [Platforms analyzed]
**Review Sample Size**: [Number per company]
**Confidence Level**: High (large sample size)
**Next Analysis**: [Recommended date]
```

## Best Practices

1. **Balanced Sampling**: Ensure representative review samples across platforms
2. **Recency Weighting**: Recent reviews more indicative of current state
3. **Verified Priority**: Weight verified purchases higher
4. **Context Consideration**: Understand reviewer perspectives and use cases
5. **Response Impact**: Factor in how companies handle negative feedback

## Advanced Techniques

### Sentiment Trajectory Modeling
- Track sentiment velocity over time
- Identify inflection points
- Predict future sentiment trends
- Link to company actions
- Model intervention impacts

### Reviewer Segmentation
- Segment by user type/use case
- Identify power user feedback
- Separate casual from serious users
- Weight by reviewer credibility
- Focus on target segment sentiment

### Competitive Response Analysis
- Track how competitors address issues
- Identify successful resolution patterns
- Model support effectiveness
- Benchmark response quality
- Learn from competitor successes

### Review Authenticity Scoring
- Identify potential fake reviews
- Weight authentic feedback higher
- Track review bombing attempts
- Verify purchase patterns
- Ensure data integrity

## Common Pitfalls to Avoid

1. **Platform Bias**: Different platforms attract different users
2. **Volume Fixation**: Quality matters more than quantity
3. **Extreme Focus**: Don't ignore the middle ratings
4. **Static Analysis**: Sentiment changes rapidly
5. **Action Paralysis**: Analysis without implementation

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Customer-Intelligence-Analyst
motivation: Extract actionable competitive insights from customer feedback to improve products and positioning
constraints: Ensure balanced sampling, verify review authenticity, focus on patterns not anecdotes
output_format: Comprehensive sentiment analysis with competitive comparisons and strategic recommendations
-->

When deploying task agents for review analysis:
1. Sample reviews across multiple platforms
2. Verify patterns with sufficient sample size
3. Extract specific quotes to illustrate findings
4. Connect feedback to business outcomes
5. Prioritize actionable insights

## Customization Options

### Industry Variations
- **B2B Software**: Focus on G2, Capterra, peer reviews
- **E-commerce**: Amazon reviews, shopping comparisons
- **Services**: Google reviews, industry-specific sites
- **Apps**: App store reviews, in-app feedback
- **Hardware**: Retail reviews, YouTube unboxings

### Analysis Depth
- **Quick Pulse**: Rating comparison only (2 hours)
- **Standard Analysis**: Full sentiment analysis (1 day)
- **Deep Dive**: Include response quality analysis (2 days)
- **Continuous Monitoring**: Real-time alerts system

### Output Focus
- **Product Team**: Feature-specific feedback
- **Support Team**: Service improvement areas
- **Marketing**: Positioning opportunities
- **Executive**: Strategic implications
- **Sales**: Competitive battlecards