# Social Media Footprint Comparison Orchestration

This workflow evaluates competitors' presence and engagement across LinkedIn, YouTube, TikTok, and Reddit, comparing follower counts, post frequency, video views, and community sentiment.

## Overview

Social media presence directly impacts brand awareness, customer engagement, and market influence. This orchestration systematically analyzes competitors' social media strategies across platforms, revealing engagement patterns, content effectiveness, and community building success. The insights enable strategic social media optimization and competitive differentiation.

## Required Tools

- `linkedin_search_exa` - Professional network analysis
- `youtube_search_exa` - Video content discovery
- `youtube_video_details_exa` - Detailed video metrics
- `tiktok_search_exa` - Short-form video analysis
- `reddit_search_exa` - Community discussions
- `web_search_exa` - Additional platform data
- `company_research_exa` - Company context

## Workflow Steps

### Phase 1: Platform Presence Mapping

```
1. Social Media Account Discovery
   For each competitor, identify:
   - LinkedIn company pages
   - YouTube channels
   - TikTok accounts
   - Reddit presence (official/community)
   - Twitter/X accounts
   - Instagram business accounts
   - Facebook pages
   - Platform-specific (Discord, Slack communities)

2. Account Verification
   - Official vs. unofficial accounts
   - Verified checkmarks
   - Account age/history
   - Brand consistency
   - Link validation
   - Activity status

3. Platform Priority Assessment
   - Primary platforms (most active)
   - Secondary platforms (maintained)
   - Experimental platforms (testing)
   - Abandoned platforms (inactive)
   - Platform-audience fit
```

### Phase 2: Audience Metrics Collection

```
4. Follower/Subscriber Analysis
   LinkedIn:
   - Company page followers
   - Employee count
   - Growth rate tracking
   - Follower demographics
   
   YouTube:
   - Subscriber count
   - Subscriber growth
   - Channel views total
   - Average views per video
   
   TikTok:
   - Follower count
   - Growth velocity
   - Verified status
   - Bio engagement

5. Reach & Impressions
   - Total audience size
   - Cross-platform reach
   - Unique vs. overlapping audiences
   - Geographic distribution
   - Demographic insights
   - B2B vs. B2C split

6. Growth Trajectory
   - Historical follower growth
   - Viral moment impacts
   - Seasonal patterns
   - Campaign effects
   - Organic vs. paid growth
```

### Phase 3: Content Strategy Analysis

```
7. Publishing Frequency
   By platform:
   - Posts per week/month
   - Optimal posting times
   - Consistency scores
   - Content calendars
   - Cross-posting patterns
   
8. Content Type Distribution
   LinkedIn:
   - Articles vs. posts
   - Image vs. video
   - Polls and events
   - Employee advocacy
   
   YouTube:
   - Video categories
   - Series vs. standalone
   - Live streams
   - Shorts vs. long-form
   
   TikTok:
   - Trend participation
   - Original content
   - Educational vs. entertainment
   - Challenge creation

9. Content Themes
   - Brand messaging
   - Product promotion
   - Thought leadership
   - Behind-the-scenes
   - User-generated content
   - Community engagement
```

### Phase 4: Engagement Metrics Deep Dive

```
10. Platform-Specific Engagement
    LinkedIn metrics:
    - Average reactions per post
    - Comment rates
    - Share rates
    - Click-through rates
    
    YouTube metrics:
    - Like/dislike ratios
    - Comment engagement
    - Average view duration
    - Click-through rate
    
    TikTok metrics:
    - Average views
    - Like rates
    - Share rates
    - Comment threads

11. Engagement Quality
    - Comment sentiment
    - Discussion depth
    - Brand advocacy
    - Criticism handling
    - Community building
    - Influencer engagement

12. Viral Content Analysis
    - Top performing posts
    - Viral factors
    - Reach multiplication
    - Engagement spikes
    - Lasting impact
```

### Phase 5: Community & Sentiment Analysis

```
13. Reddit Ecosystem Analysis
    Use `reddit_search_exa`:
    - Brand-specific subreddits
    - Mention frequency
    - Sentiment scoring
    - Discussion topics
    - Community moderation
    - User-generated content

14. Community Health Metrics
    - Active community members
    - Discussion quality
    - Brand advocate ratio
    - Response times
    - Crisis management
    - Community growth

15. Sentiment Comparison
    - Positive mention ratio
    - Negative issue patterns
    - Neutral discussions
    - Sentiment by platform
    - Sentiment evolution
```

### Phase 6: Strategic Effectiveness

```
16. Conversion Indicators
    - Traffic generation
    - Lead capture
    - Sales attribution
    - Event attendance
    - App downloads
    - Email signups

17. Brand Building Impact
    - Awareness metrics
    - Perception shifts
    - Share of voice
    - Thought leadership
    - Cultural relevance
    - Trust indicators

18. ROI Signals
    - Cost per follower
    - Engagement value
    - Conversion rates
    - Customer acquisition
    - Retention impact
    - Lifetime value
```

## Output Format

```markdown
# Social Media Competitive Analysis
## Analysis Date: [Date]
## Competitors Benchmarked: [List]

### Executive Summary
- **Social Media Leader**: [Company] - [Key strength]
- **Our Position**: [Rank] of [Total]
- **Strongest Platform**: [Platform] - [Metrics]
- **Biggest Gap**: [Platform/Metric] - [Delta]
- **Key Opportunity**: [Specific action]

### Platform Presence Overview

#### Multi-Platform Footprint
| Company | LinkedIn | YouTube | TikTok | Reddit | Twitter | Instagram |
|---------|----------|---------|---------|---------|---------|-----------|
| [Us] | ✓ Active | ✓ Active | ✗ | Community | ✓ Active | ✓ Active |
| [Comp A] | ✓ Leader | ✓ Active | ✓ Testing | ✓ Official | ✓ Leader | ✓ Active |
| [Comp B] | ✓ Active | ✓ Leader | ✓ Leader | Community | ✓ Active | ✗ |
| [Comp C] | ✓ Active | ✓ Active | ✗ | ✗ | ✓ Active | ✓ Active |

#### Audience Size Comparison
| Platform | Us | Comp A | Comp B | Comp C | Platform Leader |
|----------|-----|---------|---------|---------|-----------------|
| LinkedIn Followers | 45K | 125K | 78K | 92K | Comp A |
| YouTube Subscribers | 12K | 34K | 89K | 23K | Comp B |
| TikTok Followers | 0 | 5K | 145K | 0 | Comp B |
| Total Reach | 57K | 164K | 312K | 115K | Comp B |

### Platform-Specific Analysis

#### LinkedIn Performance
| Metric | Us | Comp A | Comp B | Comp C | Best Practice |
|--------|-----|---------|---------|---------|---------------|
| Followers | 45K | 125K | 78K | 92K | - |
| Growth Rate (MoM) | 2.5% | 4.2% | 3.1% | 1.8% | 3-5% |
| Posts/Week | 3 | 5 | 4 | 2 | 3-5 |
| Avg Engagement | 2.1% | 3.5% | 2.8% | 1.5% | 2-4% |
| Employee Advocacy | Low | High | Medium | Low | High |

**Top LinkedIn Content Types**:
- [Us]: Product updates, thought leadership
- [Comp A]: Employee stories, industry insights
- [Comp B]: Webinar promotions, case studies
- [Comp C]: Company news, job postings

#### YouTube Channel Analysis
| Metric | Us | Comp A | Comp B | Comp C |
|--------|-----|---------|---------|---------|
| Subscribers | 12K | 34K | 89K | 23K |
| Total Views | 450K | 2.1M | 5.6M | 890K |
| Videos Published | 125 | 340 | 523 | 189 |
| Avg Views/Video | 3.6K | 6.2K | 10.7K | 4.7K |
| Upload Frequency | Monthly | Weekly | 2x/week | Biweekly |
| Avg Video Length | 5:30 | 8:45 | 12:20 | 6:15 |

**YouTube Content Strategy**:
- [Us]: Product demos, customer testimonials
- [Comp A]: Educational series, webinar recordings
- [Comp B]: Original series, expert interviews, tutorials
- [Comp C]: Event coverage, product launches

#### TikTok Presence
| Metric | Us | Comp A | Comp B | Comp C |
|--------|-----|---------|---------|---------|
| Account Status | None | Testing | Leader | None |
| Followers | 0 | 5K | 145K | 0 |
| Avg Views | - | 2K | 45K | - |
| Post Frequency | - | 2/week | Daily | - |
| Content Style | - | Educational | Entertainment | - |

**TikTok Success Factors** (Comp B):
- Trend participation: 40% of content
- Original audio creation
- Employee-generated content
- Behind-the-scenes focus
- Gen Z engagement

### Engagement Quality Analysis

#### Engagement Rate Comparison
| Platform | Us | Comp A | Comp B | Comp C | Industry Avg |
|----------|-----|---------|---------|---------|--------------|
| LinkedIn | 2.1% | 3.5% | 2.8% | 1.5% | 2.3% |
| YouTube | 4.2% | 3.8% | 5.6% | 3.2% | 4.0% |
| TikTok | - | 8.5% | 12.3% | - | 9.5% |
| Twitter | 1.8% | 2.4% | 2.1% | 1.3% | 1.9% |

#### Content Performance Insights
**Highest Performing Content Types**:
1. **Educational Content**: +45% higher engagement
2. **Behind-the-Scenes**: +38% higher engagement
3. **Employee Stories**: +32% higher engagement
4. **User Success Stories**: +28% higher engagement
5. **Industry Insights**: +22% higher engagement

### Community & Sentiment

#### Reddit Presence Analysis
| Aspect | Us | Comp A | Comp B | Comp C |
|--------|-----|---------|---------|---------|
| Official Subreddit | No | Yes (5K) | No | No |
| Community Subreddit | Yes (2K) | Yes (8K) | Yes (12K) | No |
| Monthly Mentions | 45 | 125 | 230 | 28 |
| Sentiment Score | 72% | 68% | 81% | 65% |
| Brand Advocacy | Medium | Medium | High | Low |

**Common Reddit Topics**:
- Feature requests: 35%
- Support questions: 25%
- Comparisons: 20%
- Success stories: 12%
- Complaints: 8%

#### Overall Sentiment Analysis
| Company | Positive | Neutral | Negative | Sentiment Trend |
|---------|----------|---------|----------|-----------------|
| [Us] | 68% | 22% | 10% | Improving ↑ |
| [Comp A] | 65% | 25% | 10% | Stable → |
| [Comp B] | 74% | 19% | 7% | Improving ↑ |
| [Comp C] | 61% | 28% | 11% | Declining ↓ |

### Strategic Effectiveness

#### Social Media ROI Indicators
| Metric | Us | Comp A | Comp B | Comp C |
|--------|-----|---------|---------|---------|
| Website Traffic from Social | 12% | 18% | 22% | 9% |
| Lead Attribution | 8% | 15% | 19% | 6% |
| Customer Acquisition Cost | $125 | $95 | $78 | $145 |
| Brand Mention Growth | +15% | +25% | +45% | +5% |

#### Platform ROI Ranking
1. **LinkedIn**: Highest B2B lead quality
2. **YouTube**: Best for education/nurturing
3. **Twitter**: Real-time engagement
4. **TikTok**: Brand awareness with Gen Z
5. **Reddit**: Authentic community feedback

### Competitive Gaps & Opportunities

#### Platform Gaps
1. **TikTok Absence**
   - Competitors Present: 2 of 4
   - Audience Opportunity: 145K potential
   - Content Strategy: Educational entertainment
   - Investment Required: $50K/year
   - **Recommendation**: Launch pilot program

2. **YouTube Underperformance**
   - Subscriber Gap: -77K vs leader
   - Content Gap: Frequency and variety
   - **Recommendation**: 2x content production

#### Engagement Opportunities
1. **LinkedIn Thought Leadership**
   - Current: Product-focused
   - Opportunity: Industry insights
   - Expected Lift: +40% engagement

2. **Reddit Community Building**
   - Current: Unofficial only
   - Opportunity: Official presence
   - Value: Direct feedback channel

### Strategic Recommendations

#### Immediate Actions (30 days)
1. **LinkedIn Optimization**
   - Increase posting to 5x/week
   - Launch employee advocacy program
   - Test LinkedIn Live events

2. **YouTube Acceleration**
   - Commit to weekly uploads
   - Create content series
   - Invest in production quality

#### Platform Expansion (90 days)
1. **TikTok Launch**
   - Pilot program with 3-month test
   - Focus on educational content
   - Partner with employees for content

2. **Reddit Engagement**
   - Establish official presence
   - Assign community manager
   - Create AMA series

#### Long-term Strategy (6-12 months)
1. **Integrated Campaigns**
   - Cross-platform content series
   - Unified messaging strategy
   - Platform-specific optimization

2. **Community Building**
   - Grow brand advocates
   - User-generated content programs
   - Influencer partnerships

### Monitoring & Optimization

#### Key Metrics to Track
- Follower Growth Rate: [Target by platform]
- Engagement Rate: [Target by platform]
- Share of Voice: [Target %]
- Sentiment Score: [Target %]
- Lead Attribution: [Target %]

#### Competitive Monitoring
- Weekly competitor post analysis
- Monthly follower growth tracking
- Quarterly strategy assessment
- Annual platform evaluation

#### Success Indicators
- [ ] Achieve top 2 position in primary platforms
- [ ] Double engagement rates within 6 months
- [ ] Launch 2 new platform presences
- [ ] Increase social-driven leads by 50%

---

**Data Collection Period**: [Date range]
**Platforms Analyzed**: [Number]
**Confidence Level**: High (public metrics) / Medium (estimates)
**Next Review**: [Monthly/Quarterly]
```

## Best Practices

1. **Platform Fit**: Choose platforms based on audience presence, not trends
2. **Consistency Wins**: Regular posting beats sporadic bursts
3. **Engagement > Followers**: Quality interactions matter more than vanity metrics
4. **Authentic Voice**: Maintain genuine brand personality across platforms
5. **Community First**: Build relationships, not just broadcast messages

## Advanced Techniques

### Cross-Platform Synergy Analysis
- Map content performance across platforms
- Identify optimal content paths
- Track cross-platform user journeys
- Optimize platform handoffs
- Measure cumulative impact

### Influencer Ecosystem Mapping
- Identify key influencers by platform
- Track competitor influencer relationships
- Measure influencer impact
- Find partnership opportunities
- Build influencer strategies

### Social Listening Integration
- Monitor brand mentions beyond owned channels
- Track competitor sentiment in real-time
- Identify trending topics early
- Spot crisis situations quickly
- Find user-generated content opportunities

### Paid vs. Organic Analysis
- Separate organic from paid performance
- Calculate true engagement rates
- Identify paid campaign impacts
- Optimize spend allocation
- Balance paid and organic strategies

## Common Pitfalls to Avoid

1. **Vanity Metrics Obsession**: Focusing on followers over engagement
2. **Platform FOMO**: Joining every platform without strategy
3. **Broadcast Mentality**: Not engaging in conversations
4. **Inconsistent Voice**: Different personalities per platform
5. **ROI Ignorance**: Not tracking business impact

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Social-Media-Intelligence-Analyst
motivation: Provide comprehensive competitive social media analysis to guide platform strategy and optimization
constraints: Use public data only, respect platform terms, focus on actionable insights not vanity metrics
output_format: Platform-by-platform analysis with engagement metrics, content insights, and strategic recommendations
-->

When deploying task agents for social analysis:
1. Verify official accounts vs. fan pages
2. Consider platform algorithm changes in analysis
3. Look for engagement quality not just quantity
4. Identify platform-specific best practices
5. Connect social metrics to business outcomes

## Customization Options

### Industry Variations
- **B2B**: Heavy LinkedIn, YouTube for education
- **B2C**: Instagram, TikTok for brand building  
- **SaaS**: Twitter for support, YouTube for tutorials
- **E-commerce**: Instagram shopping, Pinterest
- **Gaming**: Twitch, Discord communities

### Analysis Depth
- **Quick Scan**: Follower counts and engagement rates (2 hours)
- **Standard Analysis**: Full platform comparison (1 day)
- **Deep Dive**: Include content analysis (2-3 days)
- **Ongoing Monitoring**: Weekly competitive tracking

### Stakeholder Versions
- **C-Suite**: ROI focus and strategic implications
- **Marketing Team**: Tactical recommendations
- **Content Team**: Content strategy insights
- **Sales Team**: Lead generation opportunities
- **PR Team**: Brand sentiment and crisis monitoring