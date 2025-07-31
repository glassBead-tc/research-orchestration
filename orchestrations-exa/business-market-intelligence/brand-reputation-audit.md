# Brand Reputation Audit Orchestration

This workflow combines social media and web data to gauge public sentiment and brand reputation, highlighting positive buzz versus prevalent criticisms in the market.

## Overview

Brand reputation directly impacts customer acquisition, retention, talent attraction, and market value. This orchestration provides a comprehensive assessment of brand perception across multiple channels, identifying reputation drivers, vulnerabilities, and opportunities for enhancement. It delivers actionable insights for brand management, crisis prevention, and strategic positioning.

## Required Tools

- `web_search_exa` - News mentions, reviews, brand discussions
- `reddit_search_exa` - Community sentiment and discussions
- `youtube_search_exa` - Brand-related video content
- `tiktok_search_exa` - Viral content and youth perception
- `company_research_exa` - Company baseline for context
- `linkedin_search_exa` - Professional/B2B reputation

## Workflow Steps

### Phase 1: Brand Baseline Establishment

```
1. Brand Asset Identification
   - Use `company_research_exa` for company overview
   - Identify:
     - Primary brand name(s)
     - Sub-brands and product lines
     - Brand taglines/slogans
     - Brand ambassadors/spokespeople
     - Key brand moments/campaigns

2. Reputation Benchmark Setting
   - Historical reputation markers:
     - Past awards/recognitions
     - Previous crises/controversies
     - Brand value estimates
     - NPS scores (if available)
     - Industry reputation ranking
```

### Phase 2: Traditional Media Sentiment

```
3. News Media Brand Mentions
   - Use `web_search_exa` with queries:
     - "[Brand]" + "reputation"
     - "[Brand]" + "scandal|controversy"
     - "[Brand]" + "award|recognition"
     - "[Brand]" + "customer service"
     - "[Brand]" + "quality|reliable"
   
4. Sentiment Classification
   - Positive mentions:
     - Innovation recognition
     - Quality awards
     - Social responsibility
     - Customer satisfaction
   - Negative mentions:
     - Product failures
     - Service complaints  
     - Ethical concerns
     - Legal issues

5. Media Narrative Analysis
   - Dominant storylines
   - Narrative persistence
   - Source credibility
   - Geographic variations
   - Temporal patterns
```

### Phase 3: Social Media Reputation

```
6. Reddit Community Sentiment
   - Use `reddit_search_exa` across:
     - Brand-specific subreddits
     - Industry subreddits
     - General consumer subs
   - Analyze:
     - Recommendation frequency
     - Complaint patterns
     - Brand loyalty indicators
     - Comparison discussions
     - Meme/viral content

7. YouTube Brand Presence
   - Use `youtube_search_exa` for:
     - "[Brand] review"
     - "[Brand] unboxing"
     - "[Brand] vs [competitor]"
     - "[Brand] exposed|truth"
   - Assess:
     - Content sentiment ratio
     - View engagement levels
     - Influencer opinions
     - Comment sentiment

8. TikTok Cultural Relevance
   - Use `tiktok_search_exa` for brand content
   - Evaluate:
     - User-generated content volume
     - Trend participation
     - Parody/criticism ratio
     - Viral moment potential
     - Youth perception
```

### Phase 4: Professional Reputation

```
9. LinkedIn B2B Perception
   - Use `linkedin_search_exa` for:
     - Company page engagement
     - Employee advocacy
     - Thought leadership
     - Partnership announcements
   - Track:
     - Employer brand strength
     - Industry influence
     - Professional credibility

10. Industry Recognition
    - Search for:
      - Industry awards
      - Ranking placements
      - Certification achievements
      - Partnership quality
    - Assess peer respect level
```

### Phase 5: Customer Experience Signals

```
11. Review Platform Mining
    - Aggregate review data:
      - Average ratings
      - Review volume
      - Response rates
      - Resolution effectiveness
    - Identify:
      - Consistent praise points
      - Recurring pain points
      - Service quality indicators
      - Product quality markers

12. Customer Service Reputation
    - Search for:
      - "[Brand] customer service"
      - "[Brand] support experience"
      - "[Brand] complaint resolution"
    - Analyze:
      - Response time perception
      - Resolution satisfaction
      - Support channel effectiveness
      - Escalation patterns
```

### Phase 6: Competitive Reputation Analysis

```
13. Relative Brand Standing
    - Compare to top 3 competitors:
      - Sentiment ratios
      - Media coverage tone
      - Social engagement
      - Crisis frequency
    - Calculate reputation gap

14. Differentiation Analysis
    - Unique reputation assets
    - Distinctive brand attributes
    - Competitive vulnerabilities
    - Switching driver analysis
```

### Phase 7: Risk and Opportunity Assessment

```
15. Reputation Risk Mapping
    - Active threats:
      - Unresolved issues
      - Emerging controversies
      - Competitive attacks
      - Systemic problems
    - Vulnerability assessment:
      - Crisis probability
      - Impact severity
      - Spread potential

16. Enhancement Opportunities
    - Underleveraged strengths
    - Addressable weaknesses
    - Quick wins available
    - Strategic improvements
```

## Output Format

```markdown
# Brand Reputation Audit: [Brand Name]

## Executive Summary
- **Overall Reputation Score**: [X/10]
- **Sentiment Balance**: [X]% Positive | [Y]% Neutral | [Z]% Negative  
- **Reputation Trend**: [Improving/Stable/Declining]
- **Key Strength**: [Primary reputation asset]
- **Main Vulnerability**: [Primary reputation risk]

## Reputation Scorecard

### Overall Brand Health
| Dimension | Score | Trend | vs. Industry |
|-----------|-------|--------|--------------|
| Trust | [X/10] | ↑/→/↓ | +[Y] |
| Quality | [X/10] | ↑/→/↓ | +[Y] |
| Innovation | [X/10] | ↑/→/↓ | +[Y] |
| Service | [X/10] | ↑/→/↓ | +[Y] |
| Value | [X/10] | ↑/→/↓ | +[Y] |
| Ethics | [X/10] | ↑/→/↓ | +[Y] |

### Channel-Specific Sentiment
| Channel | Positive | Neutral | Negative | Volume |
|---------|----------|---------|----------|---------|
| News Media | [X]% | [Y]% | [Z]% | [N] mentions |
| Reddit | [X]% | [Y]% | [Z]% | [N] posts |
| YouTube | [X]% | [Y]% | [Z]% | [N] videos |
| TikTok | [X]% | [Y]% | [Z]% | [N] videos |
| Reviews | [X]% | [Y]% | [Z]% | [N] reviews |

## Reputation Drivers

### Positive Reputation Assets
1. **[Strength 1]** - [Impact: High/Medium]
   - Evidence: [Specific examples]
   - Frequency: [How often mentioned]
   - Authenticity: [Genuine vs. marketed]
   - Recommendation: [How to leverage]

2. **[Strength 2]** - [Impact: High/Medium]
   - Evidence: [Specific examples]
   - Market Advantage: [Competitive edge]

3. **[Strength 3]** - [Impact: High/Medium]
   - Stakeholder Value: [Who cares most]

### Reputation Detractors
1. **[Weakness 1]** - [Severity: High/Medium/Low]
   - Examples: "[Representative complaint]"
   - Frequency: [X]% of negative mentions
   - Root Cause: [Underlying issue]
   - **Action Required**: [Specific remedy]

2. **[Weakness 2]** - [Severity: High/Medium/Low]
   - Impact: [Business consequence]
   - Comparison: [How competitors handle]
   - **Action Required**: [Improvement plan]

## Media Narrative Analysis

### Dominant Media Themes
1. **[Theme 1]**: [X]% of coverage
   - Tone: [Positive/Neutral/Negative]
   - Key Messages: [What's being said]
   - Source Types: [Who's saying it]

2. **[Theme 2]**: [Y]% of coverage
   - Evolution: [How narrative changing]
   - Geographic Variance: [Regional differences]

### Recent Coverage Highlights
- **Positive**: "[Headline]" - [Source], [Date]
  - Impact: [Business benefit]
- **Negative**: "[Headline]" - [Source], [Date]
  - Response: [Company action taken]

## Social Media Insights

### Reddit Community Perception
- **Subreddit Sentiment**: r/[relevant] is [positive/mixed/negative]
- **Common Discussions**:
  - Recommendations: [Frequency and context]
  - Complaints: [Main issues raised]
  - Comparisons: [How fares vs. competitors]
- **Viral Moments**: [Any memes or viral posts]

### YouTube Influence Analysis
- **Top Positive Video**: "[Title]" - [Views]
- **Top Critical Video**: "[Title]" - [Views]
- **Influencer Sentiment**: [Overall tone from key voices]
- **Comment Themes**: [What viewers discuss]

### TikTok Cultural Temperature
- **Brand Relevance**: [High/Medium/Low]
- **Content Types**: [How brand is portrayed]
- **Engagement Style**: [Positive/Neutral/Mockery]
- **Youth Perception**: [Cool/Neutral/Outdated]

## Customer Experience Indicators

### Review Analysis Summary
| Platform | Avg Rating | Total Reviews | Response Rate |
|----------|------------|---------------|---------------|
| Google | [X.X]/5 | [N] | [X]% |
| Trustpilot | [X.X]/5 | [N] | [X]% |
| [Industry Specific] | [X.X]/5 | [N] | [X]% |

### Service Reputation
- **Positive Experiences**: [What customers love]
- **Pain Points**: [What frustrates customers]
- **Resolution Effectiveness**: [How well problems solved]
- **Loyalty Indicators**: [Repeat purchase mentions]

## Competitive Reputation Position

### Brand Reputation Index
| Brand | Overall Score | Sentiment | Key Advantage |
|-------|---------------|-----------|---------------|
| [Your Brand] | [X.X] | [+X%] | [Strength] |
| [Competitor 1] | [X.X] | [+Y%] | [Their strength] |
| [Competitor 2] | [X.X] | [+Z%] | [Their strength] |
| [Competitor 3] | [X.X] | [+A%] | [Their strength] |

### Reputation Gap Analysis
- **Leading in**: [Where you excel]
- **Lagging in**: [Where competitors lead]
- **Parity Areas**: [No clear winner]
- **Opportunity Spaces**: [Unclaimed territory]

## Risk Assessment

### Active Reputation Threats
1. **[Threat 1]** - Risk Level: [High/Medium/Low]
   - Current Status: [Contained/Growing/Unknown]
   - Potential Impact: [If escalates]
   - Mitigation Strategy: [Recommended action]

2. **[Threat 2]** - Risk Level: [High/Medium/Low]
   - Early Warning Signs: [What to monitor]
   - Preventive Measures: [Proactive steps]

### Crisis Probability Matrix
| Scenario | Probability | Impact | Preparedness |
|----------|-------------|---------|--------------|
| [Scenario 1] | [H/M/L] | [H/M/L] | [Ready/Partial/None] |
| [Scenario 2] | [H/M/L] | [H/M/L] | [Ready/Partial/None] |

## Strategic Recommendations

### Immediate Actions (0-30 days)
1. **Address**: [Most pressing issue]
   - Tactic: [Specific action]
   - Message: [What to communicate]
   - Channel: [Where to communicate]

2. **Amplify**: [Underutilized strength]
   - Method: [How to highlight]
   - Audience: [Who to target]

### Short-term Initiatives (1-6 months)
1. **Improve**: [Service/product aspect]
   - Investment: [Resource requirement]
   - Expected Impact: [Reputation improvement]

2. **Build**: [New reputation asset]
   - Strategy: [Development approach]
   - Measurement: [Success metrics]

### Long-term Transformation (6+ months)
1. **Reposition**: [Brand perception shift needed]
   - From: [Current perception]
   - To: [Desired perception]
   - Path: [Key milestones]

## Monitoring Framework

### Key Reputation Indicators (KRIs)
1. Media Sentiment Ratio: [Current] → [Target]
2. Social Mention Sentiment: [Current] → [Target]
3. Review Average: [Current] → [Target]
4. NPS Score: [Current] → [Target]

### Early Warning Signals
- [Metric 1]: Alert if [condition]
- [Metric 2]: Alert if [condition]
- [Metric 3]: Alert if [condition]

### Review Cadence
- Daily: [Crisis monitoring if active]
- Weekly: [Sentiment tracking]
- Monthly: [Full reputation review]
- Quarterly: [Strategic assessment]

---

**Analysis Date**: [Date]
**Data Coverage**: [Date range]
**Next Full Audit**: [Date]
**Confidence Level**: [High/Medium/Low]

### Methodology Notes
- Sources Analyzed: [N] total
- Geographic Coverage: [Markets included]
- Limitations: [Any data gaps]
```

## Best Practices

1. **Multi-Channel Balance**: Weight channels by stakeholder importance
2. **Temporal Context**: Compare reputation to historical baseline
3. **Authenticity Detection**: Distinguish organic from orchestrated sentiment
4. **Action Orientation**: Every finding should drive specific actions
5. **Continuous Monitoring**: Reputation is dynamic, not static

## Advanced Techniques

### Reputation Momentum Modeling
- Calculate reputation velocity (rate of change)
- Identify momentum inflection points
- Project future reputation trajectory
- Model intervention impacts
- Optimize timing for reputation initiatives

### Stakeholder-Specific Analysis
- Segment reputation by audience:
  - Customers vs. prospects
  - Employees vs. candidates
  - Investors vs. analysts
  - Partners vs. competitors
  - Media vs. influencers
- Tailor strategies by segment

### Cultural Reputation Mapping
- Analyze reputation across cultures
- Identify market-specific issues
- Track localization effectiveness
- Find universal brand truths
- Develop market-specific strategies

### Reputation Attribution Analysis
- Link reputation to business outcomes:
  - Sales impact
  - Talent attraction
  - Stock price correlation
  - Customer lifetime value
  - Partnership opportunities
- Calculate reputation ROI

## Common Pitfalls to Avoid

1. **Vocal Minority Bias**: Don't let loud critics overshadow silent majority
2. **Channel Weighting Errors**: B2B brands shouldn't overweight TikTok
3. **Temporal Misalignment**: Ensure all data from same time period
4. **Self-Selection Bias**: Review writers aren't representative
5. **Geographic Myopia**: Global brands need global reputation views

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Brand-Reputation-Analyst
motivation: Provide comprehensive brand health assessment with actionable insights for reputation management
constraints: Balance quantitative metrics with qualitative insights, consider all stakeholders, focus on business impact
output_format: Executive dashboard with reputation scores, risk assessment, and strategic recommendations
-->

When deploying task agents for reputation audit:
1. Require sentiment justification with examples
2. Demand competitive context for all metrics
3. Weight sources by credibility and reach
4. Focus on actionable insights over observations
5. Include both risks and opportunities

## Customization Options

### Industry Variations
- **B2C Brands**: Heavy social media and review focus
- **B2B Brands**: LinkedIn and industry publication emphasis
- **Luxury Brands**: Exclusivity and aspiration metrics
- **Tech Brands**: Innovation and reliability balance
- **Service Brands**: Customer experience centricity

### Audit Depth Levels
- **Pulse Check**: Quick sentiment snapshot (2 hours)
- **Standard Audit**: Full methodology (1-2 days)
- **Deep Dive**: Include focus groups and surveys (1 week)
- **Continuous Monitoring**: Real-time reputation tracking

### Crisis vs. Routine Modes
- **Crisis Mode**: Hourly monitoring, threat focus
- **Growth Mode**: Opportunity identification emphasis
- **Maintenance Mode**: Baseline tracking and trends
- **Transformation Mode**: Perception shift measurement

### Stakeholder Reports
- **Board Level**: Strategic risks and value impact
- **Marketing Team**: Message effectiveness and gaps
- **PR Team**: Media narrative and influencer insights
- **Customer Service**: Experience improvement priorities
- **Product Team**: Quality and innovation perception