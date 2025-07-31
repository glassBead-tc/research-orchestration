# Digital Presence Audit Orchestration

This workflow examines competitors' digital footprint by analyzing their websites, SEO performance, online advertising presence, and engagement in online communities to assess digital strategy effectiveness.

## Overview

Digital presence directly impacts customer acquisition, brand perception, and competitive positioning. This orchestration comprehensively audits competitors' digital strategies across owned, earned, and paid channels. It reveals digital marketing effectiveness, online visibility gaps, and opportunities for digital competitive advantage.

## Required Tools

- `web_search_exa` - SEO data, ads, and digital footprint
- `crawling_exa` - Website analysis and content extraction
- `reddit_search_exa` - Community presence and engagement
- `youtube_search_exa` - Video content strategy
- `linkedin_search_exa` - B2B digital presence
- `company_research_exa` - Company context

## Workflow Steps

### Phase 1: Digital Asset Inventory

```
1. Owned Digital Properties
   For each competitor:
   - Primary website(s)
   - Subdomain structure
   - Microsites/campaign sites
   - Blog platforms
   - Mobile apps
   - Developer portals
   - Support sites
   - Regional sites

2. Domain Authority Assessment
   Use `web_search_exa` for:
   - Domain authority scores
   - Page authority metrics
   - Backlink profiles
   - Domain age
   - Technical SEO health
   - Site performance

3. Website Architecture Analysis
   Use `crawling_exa` to analyze:
   - Site structure/navigation
   - Page count and depth
   - Content organization
   - Technical implementation
   - Mobile optimization
   - Page speed metrics
```

### Phase 2: SEO Performance Analysis

```
4. Organic Search Visibility
   Search for SEO metrics:
   - Ranking keywords count
   - Top ranking positions
   - Featured snippets owned
   - SERP features captured
   - Organic traffic estimates
   - Keyword difficulty levels

5. Content SEO Strategy
   Analyze content approach:
   - Target keyword themes
   - Content depth/quality
   - Publishing frequency
   - Content types ranking
   - Internal linking
   - Content gaps

6. Technical SEO Audit
   Website technical factors:
   - Site speed scores
   - Mobile-friendliness
   - Core Web Vitals
   - Schema implementation
   - XML sitemaps
   - Crawlability
```

### Phase 3: Paid Digital Presence

```
7. Search Advertising Footprint
   Use `web_search_exa` to find:
   - Active ad campaigns
   - Ad copy variations
   - Landing page strategies
   - Keyword targeting
   - Ad extensions used
   - Budget indicators

8. Display & Social Advertising
   Identify presence in:
   - Display networks
   - Social media ads
   - Retargeting campaigns
   - Video advertising
   - Native advertising
   - Programmatic presence

9. Digital Ad Strategy Analysis
   Assess approach:
   - Messaging consistency
   - Offer strategies
   - Creative approaches
   - Targeting sophistication
   - Multi-channel coordination
```

### Phase 4: Content & Engagement Strategy

```
10. Content Marketing Audit
    Analyze content strategy:
    - Content types/formats
    - Topic coverage
    - Content quality scores
    - Engagement metrics
    - Distribution channels
    - Content velocity

11. Community Engagement
    Use `reddit_search_exa` and forums:
    - Active community participation
    - Official presence
    - Employee engagement
    - Response quality
    - Community building
    - Reputation management

12. Video Content Strategy
    Use `youtube_search_exa`:
    - Channel optimization
    - Content categories
    - Upload frequency
    - View performance
    - SEO optimization
    - Engagement rates
```

### Phase 5: User Experience Analysis

```
13. Website UX Assessment
    Evaluate user experience:
    - Navigation clarity
    - Conversion paths
    - Form optimization
    - CTA effectiveness
    - Trust signals
    - Social proof

14. Conversion Optimization
    Analyze CRO elements:
    - Landing page quality
    - A/B testing signals
    - Personalization
    - Chat/support options
    - Lead capture methods
    - Checkout process

15. Customer Journey Mapping
    Digital touchpoint analysis:
    - Awareness stage assets
    - Consideration content
    - Decision tools
    - Retention strategies
    - Cross-channel consistency
```

### Phase 6: Digital Performance Metrics

```
16. Traffic & Engagement Metrics
    Estimate/analyze:
    - Total website traffic
    - Traffic sources mix
    - Engagement rates
    - Bounce rates
    - Page views per session
    - Geographic distribution

17. Digital Share of Voice
    Calculate presence:
    - Organic SERP coverage
    - Paid ad impression share
    - Social media reach
    - Content amplification
    - Brand mention frequency

18. Digital ROI Indicators
    Performance signals:
    - Lead generation effectiveness
    - Cost per acquisition
    - Conversion rates
    - Customer lifetime value
    - Digital revenue attribution
```

## Output Format

```markdown
# Digital Presence Competitive Audit
## Analysis Date: [Date]
## Competitors Analyzed: [List]

### Executive Summary
- **Digital Leader**: [Company] - [Key strength]
- **Our Digital Position**: [Rank] of [Total]
- **Strongest Channel**: [Channel] - [Metrics]
- **Biggest Gap**: [Area] - [Impact]
- **Key Opportunity**: [Specific action]

### Website & Domain Authority

#### Domain Strength Comparison
| Company | Domain Authority | Page Authority | Backlinks | Referring Domains | Domain Age |
|---------|-----------------|----------------|-----------|-------------------|------------|
| [Comp A] | 78 | 72 | 1.2M | 15K | 15 years |
| [Comp B] | 72 | 68 | 890K | 12K | 12 years |
| [Us] | 65 | 61 | 450K | 8K | 8 years |
| [Comp D] | 58 | 54 | 234K | 5K | 10 years |

#### Website Performance Metrics
| Company | Pages Indexed | Load Speed | Mobile Score | Core Web Vitals |
|---------|---------------|------------|--------------|-----------------|
| [Comp A] | 125K | 2.3s | 95/100 | Pass |
| [Us] | 45K | 3.1s | 88/100 | Pass |
| [Comp B] | 89K | 2.8s | 91/100 | Pass |
| [Comp D] | 23K | 4.2s | 78/100 | Fail |

### SEO Performance Analysis

#### Organic Search Visibility
| Company | Ranking Keywords | Top 3 Rankings | Featured Snippets | Est. Traffic |
|---------|------------------|----------------|-------------------|--------------|
| [Comp A] | 45,000 | 2,100 | 125 | 1.2M/mo |
| [Comp B] | 34,000 | 1,800 | 89 | 890K/mo |
| [Us] | 23,000 | 1,200 | 45 | 560K/mo |
| [Comp D] | 12,000 | 600 | 23 | 234K/mo |

#### Keyword Strategy Analysis
**[Company A] - SEO Leader**:
- **Focus**: Long-tail, high-intent keywords
- **Content Depth**: 2,500+ word average
- **Topic Clusters**: 25 major clusters
- **Success Factor**: Comprehensive coverage

**[Us] - Current Strategy**:
- **Focus**: Mixed head/long-tail
- **Content Depth**: 1,500 word average
- **Topic Clusters**: 12 clusters
- **Gap**: Missing 40% of category keywords

#### Content SEO Performance
| Content Type | Comp A | Comp B | Us | Best Performer |
|--------------|---------|---------|-----|----------------|
| Blog Posts | 2,500 | 1,800 | 1,200 | Comp A |
| Landing Pages | 450 | 380 | 245 | Comp A |
| Resources | 125 | 89 | 56 | Comp A |
| Tools/Calculators | 23 | 15 | 8 | Comp A |

### Paid Digital Presence

#### Search Advertising Footprint
| Company | Est. Keywords | Ad Variations | Landing Pages | Est. Spend/Mo |
|---------|---------------|----------------|---------------|---------------|
| [Comp A] | 15,000 | 450 | 125 | $450K |
| [Comp B] | 12,000 | 380 | 89 | $340K |
| [Us] | 8,000 | 234 | 56 | $180K |
| [Comp D] | 3,000 | 125 | 34 | $89K |

#### Ad Messaging Analysis
**Common Ad Themes**:
1. Free trial offers (65% of ads)
2. Feature differentiation (45%)
3. Price competitiveness (38%)
4. Customer success (32%)
5. Integration capabilities (28%)

**Unique Positioning**:
- [Comp A]: "Enterprise-grade security"
- [Comp B]: "Fastest implementation"
- [Us]: "Best value for teams"
- [Comp D]: "Simple and affordable"

### Content Marketing Effectiveness

#### Content Production & Engagement
| Company | Posts/Month | Avg. Shares | Avg. Engagement | Content ROI |
|---------|-------------|-------------|-----------------|-------------|
| [Comp A] | 45 | 234 | 4.5% | High |
| [Comp B] | 32 | 156 | 3.8% | Medium |
| [Us] | 28 | 189 | 4.2% | Medium |
| [Comp D] | 15 | 67 | 2.1% | Low |

#### Content Distribution Strategy
```
Channel Mix Analysis:
         Comp A  Comp B   Us   Comp D
Organic   40%    35%    45%    60%
Email     25%    20%    20%    15%
Social    20%    25%    20%    15%
Paid      15%    20%    15%    10%
```

### Digital User Experience

#### Website UX Scores
| Factor | Comp A | Comp B | Us | Comp D |
|--------|---------|---------|-----|---------|
| Navigation | 9/10 | 8/10 | 7/10 | 6/10 |
| Mobile UX | 9/10 | 8/10 | 8/10 | 6/10 |
| Page Speed | 9/10 | 8/10 | 7/10 | 5/10 |
| Conversion Flow | 9/10 | 7/10 | 7/10 | 6/10 |
| Trust Signals | 10/10 | 8/10 | 7/10 | 6/10 |

#### Conversion Optimization Elements
| Element | Comp A | Comp B | Us | Comp D |
|---------|---------|---------|-----|---------|
| Live Chat | ✓ 24/7 | ✓ Business | ✓ Business | ✗ |
| Social Proof | ✓ Dynamic | ✓ Static | ✓ Static | ✓ Basic |
| A/B Testing | ✓ Advanced | ✓ Basic | ✓ Basic | ✗ |
| Personalization | ✓ AI-driven | ✓ Rule-based | ✗ | ✗ |
| Exit Intent | ✓ | ✓ | ✓ | ✗ |

### Community & Engagement

#### Online Community Presence
| Platform | Comp A | Comp B | Us | Comp D |
|----------|---------|---------|-----|---------|
| Reddit Activity | High | Medium | Medium | Low |
| Forum Presence | Official | Community | Community | None |
| Discord/Slack | Yes | Yes | No | No |
| Stack Overflow | Active | Active | Some | None |

#### Engagement Quality Metrics
- **Response Time**: Comp A (2hr) > Us (12hr) > Comp B (24hr) > Comp D (None)
- **Solution Rate**: Comp A (85%) > Comp B (72%) > Us (68%) > Comp D (N/A)
- **Community Sentiment**: Comp B (82%) > Comp A (78%) > Us (72%) > Comp D (61%)

### Digital Performance Summary

#### Traffic & Engagement Overview
| Metric | Comp A | Comp B | Us | Comp D |
|--------|---------|---------|-----|---------|
| Monthly Visits | 4.5M | 3.2M | 2.1M | 890K |
| Avg. Duration | 4:23 | 3:45 | 3:12 | 2:34 |
| Pages/Session | 4.5 | 3.8 | 3.2 | 2.8 |
| Bounce Rate | 35% | 42% | 48% | 58% |
| Mobile Traffic | 45% | 52% | 48% | 38% |

#### Digital ROI Indicators
| Company | Lead Gen Rate | CAC | Conversion Rate | Digital Revenue % |
|---------|---------------|-----|-----------------|-------------------|
| [Comp A] | 4.5% | $125 | 2.8% | 65% |
| [Comp B] | 3.8% | $156 | 2.3% | 58% |
| [Us] | 3.2% | $189 | 2.1% | 52% |
| [Comp D] | 2.1% | $234 | 1.5% | 35% |

### Digital Strategy Insights

#### Competitive Advantages by Company
**[Company A]**:
- Dominant SEO presence
- Sophisticated personalization
- Omnichannel excellence
- Content marketing leadership

**[Company B]**:
- Strong video strategy
- Mobile-first approach
- Community engagement
- Social amplification

**[Us]**:
- Growing organic presence
- Efficient paid campaigns
- Good content quality
- Improving UX

### Digital Gaps & Opportunities

#### Critical Digital Gaps
1. **SEO Coverage**
   - Missing: 40% of target keywords
   - Impact: -600K monthly visits
   - Action: Content expansion program

2. **Technical Performance**
   - Gap: Site speed 25% slower
   - Impact: Higher bounce rates
   - Action: Performance optimization

3. **Conversion Optimization**
   - Missing: Personalization
   - Impact: -0.7% conversion rate
   - Action: Implement testing program

#### Digital Opportunities
1. **Quick Wins**
   - Fix Core Web Vitals
   - Implement schema markup
   - Launch remarketing campaigns

2. **Strategic Initiatives**
   - Build topic authority
   - Develop tools/calculators
   - Create video content

### Recommendations

#### Immediate Actions (30 days)
1. **Technical SEO Sprint**
   - Fix site speed issues
   - Implement schema
   - Optimize Core Web Vitals

2. **Paid Campaign Optimization**
   - Expand keyword coverage
   - Test new ad formats
   - Improve Quality Scores

#### Short-term Roadmap (90 days)
1. **Content Velocity**
   - Double publishing rate
   - Target gap keywords
   - Build topic clusters

2. **Conversion Rate Program**
   - Implement A/B testing
   - Add personalization
   - Optimize forms

#### Long-term Digital Strategy (6-12 months)
1. **SEO Dominance**
   - Build 10 new topic clusters
   - Earn 50+ featured snippets
   - Achieve 75 domain authority

2. **Digital Experience Leadership**
   - AI-powered personalization
   - Omnichannel orchestration
   - Best-in-class performance

### Monitoring Framework

#### Digital KPIs Dashboard
- Organic traffic growth
- Keyword ranking improvements
- Conversion rate optimization
- Digital share of voice
- Customer acquisition cost

#### Competitive Tracking
- Monthly ranking reports
- Ad spend monitoring
- Content gap analysis
- UX benchmark updates
- Technology adoption

---

**Data Sources**: SEO tools, web analytics estimates, crawl data
**Confidence Level**: High (technical data) / Medium (traffic estimates)
**Limitations**: Some metrics are estimates
**Next Update**: Monthly recommended
```

## Best Practices

1. **Holistic View**: Consider all digital channels together
2. **Quality Focus**: Traffic quality matters more than quantity
3. **User-Centric**: Prioritize user experience over tricks
4. **Mobile-First**: Mobile performance is critical
5. **Continuous Optimization**: Digital requires constant iteration

## Advanced Techniques

### Competitive SEO Gap Analysis
- Identify keyword opportunities
- Find content gaps
- Discover link opportunities
- Analyze SERP features
- Plan content strategy

### Conversion Path Analysis
- Map competitor funnels
- Identify friction points
- Test conversion elements
- Optimize user flows
- Measure incremental gains

### Digital Attribution Modeling
- Track cross-channel impact
- Measure assisted conversions
- Optimize channel mix
- Calculate true ROI
- Allocate budget efficiently

### Technical SEO Competitive Analysis
- Crawl competitor sites
- Analyze site architecture
- Compare technical implementation
- Identify quick wins
- Plan technical roadmap

## Common Pitfalls to Avoid

1. **Vanity Metrics**: Focus on business impact not just traffic
2. **Channel Silos**: Digital channels work together
3. **Static Analysis**: Digital landscape changes daily
4. **Tool Dependence**: Combine tools with human insight
5. **Copycat Strategy**: Find your unique digital angle

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Digital-Marketing-Intelligence-Analyst
motivation: Provide comprehensive digital presence analysis to identify online competitive advantages and gaps
constraints: Use publicly available data, respect crawl limits, focus on actionable insights
output_format: Digital audit report with performance metrics, competitive gaps, and strategic recommendations
-->

When deploying task agents for digital audit:
1. Verify technical metrics with multiple tools
2. Sample sufficient pages for statistical significance
3. Consider seasonal variations in data
4. Link digital metrics to business outcomes
5. Prioritize high-impact improvements

## Customization Options

### Channel Focus
- **SEO Deep Dive**: Comprehensive organic analysis
- **Paid Media Audit**: PPC and display focus
- **Content Analysis**: Content strategy evaluation
- **Technical Audit**: Site performance focus
- **UX Assessment**: Conversion optimization

### Industry Adaptations
- **E-commerce**: Product pages, shopping experience
- **SaaS**: Trial flows, feature pages
- **B2B**: Lead generation, content depth
- **Local**: Local SEO, map presence
- **Enterprise**: Account-based marketing

### Output Variations
- **Executive Dashboard**: Key metrics only
- **Technical Report**: Detailed SEO/technical
- **Marketing Plan**: Tactical recommendations
- **Competitive Matrix**: Side-by-side comparison
- **ROI Analysis**: Performance vs. investment