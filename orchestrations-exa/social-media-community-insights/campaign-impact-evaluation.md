# Campaign Impact Evaluation Orchestration

This workflow evaluates marketing campaign effectiveness by searching YouTube, TikTok, and Reddit to measure buzz generation, sentiment shifts, and organic user engagement post-campaign.

## Overview

After investing in marketing campaigns or events, understanding the true impact requires analyzing organic social media reactions and user-generated content. This orchestration systematically measures campaign reach, engagement quality, and lasting impact across social platforms to evaluate ROI and inform future marketing strategies.

## Required Tools

- `youtube_search_exa` - YouTube campaign content analysis
- `youtube_video_details_exa` - Video performance metrics
- `tiktok_search_exa` - TikTok campaign virality
- `reddit_search_exa` - Reddit discussion analysis
- `web_search_exa` - Extended campaign coverage

## Workflow Steps

### Phase 1: Campaign Baseline & Setup

```
1. Pre-Campaign Baseline
   Establish metrics before launch:
   - Social mention volume
   - Sentiment distribution
   - Engagement rates
   - Share of voice
   - Content volume
   - Influencer activity
   - Competitor activity
   - Trend participation

2. Campaign Parameters Definition
   Document campaign details:
   - Campaign name/hashtags
   - Launch date/time
   - Target platforms
   - Key messages
   - Creative assets
   - Influencer partners
   - Paid promotion
   - Success metrics

3. Monitoring Framework
   Set measurement parameters:
   - Time windows (24h, 7d, 30d, 90d)
   - Platform priorities
   - Metric weighting
   - Attribution methods
   - Control groups
   - Competitor tracking
```

### Phase 2: YouTube Impact Analysis

```
4. YouTube Content Discovery
   Use `youtube_search_exa`:
   - Campaign hashtag videos
   - Brand mention increases
   - Influencer campaign content
   - User-generated videos
   - Reaction/review videos
   - Parody/remix content
   - News coverage
   - Competitor responses

5. Video Performance Metrics
   Use `youtube_video_details_exa`:
   - View count velocity
   - Engagement rates
   - Comment sentiment
   - Like/dislike ratios
   - Share indicators
   - Subscriber impact
   - Watch time
   - Click-through rates

6. Content Quality Assessment
   Analyze video types:
   - Official campaign videos
   - Influencer interpretations
   - Organic user content
   - Media coverage
   - Critical responses
   - Tutorial/how-to
   - Comparison content
   - Long-term reviews
```

### Phase 3: TikTok Virality Measurement

```
7. TikTok Campaign Tracking
   Use `tiktok_search_exa`:
   - Hashtag campaign reach
   - Challenge participation
   - Sound usage metrics
   - Effect adoption
   - Creator involvement
   - Viral moment tracking
   - Trend creation
   - Cross-trend pollution

8. Engagement Pattern Analysis
   Track viral mechanics:
   - Duet/stitch chains
   - Remix creativity
   - Meme evolution
   - Geographic spread
   - Demographic reach
   - Platform spillover
   - Longevity metrics

9. Creator Ecosystem Impact
   Measure influencer effect:
   - Paid creator performance
   - Organic creator adoption
   - Micro-influencer spread
   - Content quality range
   - Message consistency
   - Creative interpretation
```

### Phase 4: Reddit Community Response

```
10. Reddit Discussion Mining
    Use `reddit_search_exa`:
    - Campaign mention threads
    - Community reactions
    - Skepticism levels
    - Authentic endorsements
    - Criticism patterns
    - Meme creation
    - Cross-subreddit spread
    - Mod responses

11. Sentiment Deep Dive
    Analyze discussion quality:
    - Initial reactions
    - Sentiment evolution
    - Debate intensity
    - Community division
    - Influencer callouts
    - Authenticity perception
    - Value discussions
    - Long-term opinions

12. Community Behavior Changes
    Track engagement shifts:
    - Subreddit growth
    - Post frequency changes
    - New user influx
    - Discussion quality
    - Support requests
    - Purchase indicators
    - Recommendation rates
```

### Phase 5: Cross-Platform Synthesis

```
13. Reach & Frequency Analysis
    Aggregate platform metrics:
    - Total impressions
    - Unique creators
    - Content volume
    - Platform distribution
    - Audience overlap
    - Message consistency
    - Creative diversity

14. Engagement Quality Scoring
    Evaluate interaction depth:
    - Passive views vs active engagement
    - Positive vs negative engagement
    - Organic vs paid signals
    - Sustained vs spike interest
    - Conversion indicators
    - Brand lift signals

15. Message Penetration Assessment
    Track campaign themes:
    - Key message adoption
    - Message distortion
    - Creative interpretation
    - Meme evolution
    - Cultural integration
    - Longevity potential
```

### Phase 6: Impact Attribution & ROI

```
16. Attribution Modeling
    Connect social to business:
    - Direct mention attribution
    - Hashtag participation
    - Temporal correlation
    - Sentiment impact
    - Competitor comparison
    - Control group analysis

17. Business Impact Correlation
    Link to KPIs:
    - Website traffic spikes
    - Search volume increases
    - Sales correlation
    - App downloads
    - Sign-up rates
    - Support inquiries
    - Brand metrics

18. ROI Calculation Framework
    Measure campaign value:
    - Earned media value
    - Engagement value
    - Reach efficiency
    - Cost per engagement
    - Lifetime value impact
    - Competitive gains
    - Long-term effects
```

## Output Format

```markdown
# Campaign Impact Evaluation: [Campaign Name]
## Campaign Period: [Start Date] - [End Date]
## Evaluation Date: [Current Date]

### Executive Dashboard

#### Campaign Performance Summary
- **Total Reach**: [X.X]M unique users
- **Engagement Volume**: [X.X]M interactions
- **Sentiment Score**: [X]% positive (↑[Y]% from baseline)
- **Viral Moments**: [X] significant peaks
- **ROI Estimate**: [X.X]x campaign spend
- **Versus Goal**: [Over/Under] by [X]%

#### Platform Performance
| Platform | Reach | Engagement | Sentiment | Viral Score | ROI |
|----------|-------|------------|-----------|-------------|-----|
| YouTube | [X]M | [X]% | [X]% pos | [Score] | [X]x |
| TikTok | [X]M | [X]% | [X]% pos | [Score] | [X]x |
| Reddit | [X]K | [X]% | [X]% pos | [Score] | [X]x |

### Pre-Campaign Baseline

#### 30-Day Pre-Campaign Metrics
- **Daily Mentions**: [X] average
- **Sentiment**: [X]% positive, [Y]% neutral, [Z]% negative
- **Share of Voice**: [X]% vs competitors
- **Engagement Rate**: [X]% average
- **Content Volume**: [X] pieces/day

#### Competitive Baseline
| Competitor | Mentions | Sentiment | Engagement | Active Campaigns |
|------------|----------|-----------|------------|------------------|
| [Brand A] | [X]/day | [X]% pos | [X]% | [Yes/No] |
| [Brand B] | [X]/day | [X]% pos | [X]% | [Yes/No] |
| [Brand C] | [X]/day | [X]% pos | [X]% | [Yes/No] |

### Campaign Timeline & Milestones

#### Launch Day (Day 0)
- **Time**: [Launch time]
- **Initial Response**: [X] mentions in first hour
- **Sentiment**: [X]% positive
- **Key Influencers**: [List early adopters]
- **Platform Leader**: [Platform] with [X]% of activity

#### 24-Hour Checkpoint
- **Total Reach**: [X]M
- **Viral Peaks**: [X] trending moments
- **Top Content**: "[Content piece]" - [X]M views
- **Sentiment Shift**: [+/-X]% from baseline

#### 7-Day Performance
- **Cumulative Reach**: [X]M
- **Engagement Rate**: [X]% (vs [Y]% goal)
- **User-Generated Content**: [X] pieces
- **Media Coverage**: [X] articles

#### 30-Day Analysis
- **Sustained Interest**: [X]% of peak
- **Long-tail Content**: [X] new pieces/day
- **Community Growth**: +[X]% followers
- **Business Impact**: [Metrics achieved]

### YouTube Campaign Analysis

#### Content Volume & Reach
| Content Type | Videos | Views | Avg Engagement | Sentiment |
|--------------|--------|-------|----------------|-----------|
| Official Campaign | [X] | [X]M | [X]% | [X]% pos |
| Influencer Content | [X] | [X]M | [X]% | [X]% pos |
| User-Generated | [X] | [X]K | [X]% | [X]% pos |
| Media Coverage | [X] | [X]K | [X]% | [X]% pos |
| Reaction/Review | [X] | [X]K | [X]% | Mixed |

#### Top Performing Videos
1. **"[Video Title]"** - [Creator]
   - Views: [X]M
   - Engagement: [X]%
   - Comments: [X]K
   - Impact: [Description]

2. **"[Video Title]"** - [Creator]
   - Views: [X]K
   - Engagement: [X]%
   - Comments: [X]K
   - Impact: [Description]

#### YouTube Success Factors
- **Influencer Amplification**: [X]x reach multiplier
- **Content Longevity**: [X]% still gaining views
- **Community Response**: [X]% positive discussion
- **Competitive Advantage**: +[X]% vs competitor campaigns

### TikTok Viral Analysis

#### Campaign Hashtag Performance
- **#[CampaignHashtag]**: [X]M views
- **Videos Created**: [X]K
- **Unique Creators**: [X]K
- **Peak Day**: [Date] - [X]M views
- **Viral Coefficient**: [X.X]

#### Content Evolution
```
Day 1-3: Official content dominates
Day 4-7: Creator interpretation phase
Day 8-14: Meme evolution peak
Day 15-30: Long-tail creativity
Day 30+: Sustained community usage
```

#### Viral Moments
| Date | Trigger | Views | Engagement | Lasting Impact |
|------|---------|-------|------------|----------------|
| [Date] | [Original post] | [X]M | [X]% | Trend created |
| [Date] | [Celebrity participation] | [X]M | [X]% | Mainstream reach |
| [Date] | [Meme evolution] | [X]M | [X]% | Cultural integration |

#### TikTok ROI Metrics
- **Earned Media Value**: $[X]M
- **Cost Per View**: $[X.XX]
- **Engagement Cost**: $[X.XX]
- **Viral Multiplier**: [X]x paid reach

### Reddit Community Impact

#### Subreddit Coverage
| Subreddit | Posts | Comments | Upvotes | Sentiment | Organic % |
|-----------|-------|----------|---------|-----------|-----------|
| r/[relevant] | [X] | [X]K | [X]K | [X]% pos | [X]% |
| r/[industry] | [X] | [X]K | [X]K | [X]% pos | [X]% |
| r/[general] | [X] | [X]K | [X]K | Mixed | [X]% |

#### Discussion Themes
1. **Campaign Authenticity** - [X]% of discussions
   - Positive: "Finally, a brand that gets it"
   - Negative: "Feels forced and cringe"
   - Neutral: "Better than most campaigns"

2. **Value Perception** - [X]% of discussions
   - ROI discussions
   - Comparison shopping
   - Deal seeking

3. **Creative Execution** - [X]% of discussions
   - Meme potential
   - Entertainment value
   - Production quality

#### Reddit Sentiment Evolution
```
Week 1: ████████░░ 78% positive (honeymoon)
Week 2: ██████░░░░ 65% positive (scrutiny)
Week 3: ███████░░░ 71% positive (acceptance)
Week 4: ███████░░░ 72% positive (integration)
```

### Cross-Platform Insights

#### Message Consistency Analysis
| Platform | Core Message Retention | Creative Interpretation | Distortion Level |
|----------|------------------------|------------------------|------------------|
| YouTube | 85% accurate | Professional | Low |
| TikTok | 65% accurate | Highly creative | Medium |
| Reddit | 70% accurate | Analytical | Low |

#### Audience Journey Mapping
```
Awareness (YouTube): [X]M reached → 
Interest (TikTok): [X]% engaged → 
Consideration (Reddit): [X]K discussing → 
Action (All): [X]% conversion indicators
```

#### Platform Synergies
- **YouTube → TikTok**: [X]% of creators referenced YouTube content
- **TikTok → Reddit**: [X] TikToks shared on Reddit
- **Reddit → YouTube**: [X] "Reddit reacts" videos created
- **Circular Amplification**: [X.X]x total reach multiplier

### Business Impact Correlation

#### Direct Attribution Metrics
| Metric | Pre-Campaign | During | Post-30 Days | Lift % |
|--------|--------------|---------|--------------|--------|
| Website Traffic | [X]K/day | [X]K/day | [X]K/day | +[X]% |
| Search Volume | [X]K/mo | [X]K/mo | [X]K/mo | +[X]% |
| Sales/Conversions | [X]/day | [X]/day | [X]/day | +[X]% |
| App Downloads | [X]/day | [X]/day | [X]/day | +[X]% |
| Email Signups | [X]/day | [X]/day | [X]/day | +[X]% |

#### Indirect Impact Indicators
- **Brand Sentiment**: +[X]% improvement
- **Consideration Set**: +[X]% inclusion
- **Share of Voice**: +[X]% vs competitors
- **Customer Lifetime Value**: +[X]% projected
- **Word-of-Mouth**: [X]x increase in recommendations

### Campaign ROI Analysis

#### Investment Breakdown
| Category | Spend | % of Total |
|----------|--------|------------|
| Creative Development | $[X]K | [X]% |
| Influencer Fees | $[X]K | [X]% |
| Paid Promotion | $[X]K | [X]% |
| Platform Fees | $[X]K | [X]% |
| Management | $[X]K | [X]% |
| **Total Investment** | **$[X]K** | **100%** |

#### Value Generated
| Value Type | Amount | Calculation Method |
|------------|--------|-------------------|
| Earned Media | $[X]M | [X]M impressions × CPM |
| Engagement Value | $[X]K | [X]K engagements × value |
| Direct Sales Lift | $[X]K | Attributed conversions |
| Brand Value Lift | $[X]K | Sentiment improvement |
| Long-term Impact | $[X]K | Projected CLV increase |
| **Total Value** | **$[X]M** | **[X.X]x ROI** |

### Competitive Campaign Comparison

#### Campaign Performance vs Industry
| Metric | Our Campaign | Industry Avg | Best in Class | Rank |
|--------|--------------|--------------|---------------|------|
| Reach | [X]M | [X]M | [X]M | #[X] |
| Engagement | [X]% | [X]% | [X]% | #[X] |
| Sentiment | [X]% | [X]% | [X]% | #[X] |
| ROI | [X]x | [X]x | [X]x | #[X] |

#### Competitive Response Analysis
- **[Competitor A]**: Launched counter-campaign on Day [X]
- **[Competitor B]**: Increased social spending [X]%
- **[Competitor C]**: No significant response

### Key Learnings & Insights

#### What Worked Well
1. **[Specific Element]**: Drove [X]% of engagement
2. **[Platform Strategy]**: Exceeded goals by [X]%
3. **[Creative Approach]**: Resonated with [audience]
4. **[Timing]**: Capitalized on [trend/moment]
5. **[Partnership]**: Amplified reach by [X]x

#### Areas for Improvement
1. **[Challenge]**: Resulted in [impact]
   - Learning: [Insight]
   - Future approach: [Recommendation]

2. **[Missed Opportunity]**: Could have added [X]% reach
   - Learning: [Insight]
   - Future approach: [Recommendation]

#### Unexpected Outcomes
1. **[Surprise Success]**: [Description and impact]
2. **[Unplanned Virality]**: [How it happened]
3. **[Community Creation]**: [User innovation]

### Recommendations for Future Campaigns

#### Strategic Recommendations
1. **Platform Prioritization**
   - Lead with: [Platform] for [reason]
   - Support with: [Platforms] for amplification
   - Test on: [Platform] for [objective]

2. **Content Strategy**
   - More: [Content type] - drove [X]% engagement
   - Less: [Content type] - underperformed
   - New: [Content opportunity] based on gaps

3. **Influencer Strategy**
   - Tier 1: [X] macro influencers for reach
   - Tier 2: [X] micro influencers for authenticity
   - Tier 3: Employee/customer creators

4. **Timing Optimization**
   - Launch: [Day/time] for maximum impact
   - Duration: [X] weeks optimal
   - Follow-up: [Strategy] for longevity

#### Tactical Improvements
1. **Pre-Launch**
   - Seed content [X] days early
   - Brief creators more thoroughly
   - Prepare crisis scenarios

2. **During Campaign**
   - Respond within [X] hours
   - Amplify UGC immediately
   - Monitor sentiment hourly

3. **Post-Campaign**
   - Maintain engagement for [X] weeks
   - Convert participants to community
   - Document all learnings

### Long-Term Impact Projection

#### 90-Day Outlook
- **Content Longevity**: [X]% still generating views
- **Community Growth**: +[X]% sustained increase
- **Sentiment Maintenance**: [X]% positive holding
- **Business Impact**: [X]% sales lift continuing

#### Annual Impact Estimate
- **Brand Equity Gain**: +[X]% awareness
- **Customer Acquisition**: [X]K new customers
- **Lifetime Value**: $[X]M projected
- **Competitive Position**: +[X] rank positions

---

**Report Generated**: [Date]
**Data Coverage**: [X] platforms, [Y]M social interactions
**Confidence Level**: [High/Medium] based on attribution model
**Next Campaign Planning**: [Date]
```

## Best Practices

1. **Baseline First**: Always establish pre-campaign metrics
2. **Real-Time Monitoring**: Adjust tactics during campaign
3. **Authentic Metrics**: Distinguish organic from paid
4. **Long-Term View**: Measure beyond campaign period
5. **Competitive Context**: Compare to industry benchmarks

## Advanced Techniques

### Multi-Touch Attribution Modeling
- Track user journey across platforms
- Weight touchpoint influence
- Identify conversion paths
- Optimize channel mix
- Predict attribution patterns

### Sentiment Velocity Tracking
- Monitor sentiment changes hourly
- Identify inflection points
- Correlate with campaign events
- Predict sentiment trajectories
- Optimize response timing

### Viral Prediction Algorithms
- Identify early viral signals
- Calculate spread probability
- Optimize amplification timing
- Predict peak and decline
- Maximize viral potential

### ROI Optimization Framework
- Real-time ROI calculation
- Dynamic budget reallocation
- Performance prediction models
- Efficiency optimization
- Long-term value projection

## Common Pitfalls to Avoid

1. **Vanity Metrics**: Focus on business impact not just reach
2. **Attribution Errors**: Account for organic growth
3. **Platform Silos**: Measure cross-platform effects
4. **Short-Term Focus**: Track long-tail impact
5. **Competitor Ignorance**: Monitor competitive responses

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Campaign-Impact-Analyst
motivation: Comprehensively evaluate marketing campaign effectiveness across social platforms
constraints: Use consistent measurement periods, distinguish paid from organic, focus on business impact
output_format: Detailed campaign performance report with ROI analysis and future recommendations
-->

When deploying task agents for campaign evaluation:
1. Establish clear pre-campaign baselines
2. Track both quantitative metrics and qualitative insights
3. Monitor competitor responses and market changes
4. Connect social metrics to business outcomes
5. Provide actionable recommendations for future campaigns

## Customization Options

### Evaluation Depth
- **Quick Assessment**: 24-hour impact snapshot
- **Standard Evaluation**: 30-day comprehensive analysis
- **Deep Analysis**: 90-day with predictive modeling
- **Continuous Tracking**: Ongoing campaign monitoring

### Focus Areas
- **ROI Focus**: Financial impact emphasis
- **Engagement Focus**: Community building metrics
- **Viral Focus**: Trend and spread analysis
- **Competitive Focus**: Market share impact
- **Brand Focus**: Sentiment and perception shifts

### Output Formats
- **Executive Summary**: C-suite presentation
- **Marketing Report**: Detailed team analysis
- **Finance Report**: ROI and attribution focus
- **Creative Brief**: Learnings for next campaign
- **Data Export**: Raw metrics for analysis