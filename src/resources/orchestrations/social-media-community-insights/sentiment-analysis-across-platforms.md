# Sentiment Analysis Across Platforms Orchestration

This workflow collects and summarizes audience sentiment by extracting comments and discussions from YouTube, Reddit, and TikTok to identify positive themes and frequent complaints.

## Overview

Understanding audience sentiment across social platforms provides critical insights into brand perception, product satisfaction, and customer experience. This orchestration systematically analyzes comments, discussions, and user-generated content across platforms to reveal sentiment patterns, emotional drivers, and actionable feedback for brand improvement.

## Required Tools

- `youtube_search_exa` - Find relevant videos
- `youtube_video_details_exa` - Extract video comments and metrics
- `reddit_search_exa` - Mine discussion threads
- `tiktok_search_exa` - Analyze short-form content
- `web_search_exa` - Additional sentiment sources

## Workflow Steps

### Phase 1: Content Discovery & Collection

```
1. Brand Mention Mapping
   Identify content to analyze:
   - Brand name mentions
   - Product name discussions
   - Campaign hashtags
   - CEO/executive mentions
   - Competitor comparisons
   - Industry discussions

2. Time Period Definition
   Set analysis parameters:
   - Historical depth (30/60/90 days)
   - Seasonal considerations
   - Campaign periods
   - Product launch windows
   - Crisis timeframes
   - Trend identification needs

3. Content Volume Assessment
   Quantify available data:
   - YouTube videos mentioning brand
   - Reddit threads and comments
   - TikTok videos and comments
   - Mention frequency
   - Engagement levels
   - Viral content identification
```

### Phase 2: YouTube Sentiment Mining

```
4. Video Content Discovery
   Use `youtube_search_exa`:
   - "[Brand] review"
   - "[Brand] experience"
   - "[Brand] problem"
   - "[Brand] vs [competitor]"
   - "[Product] unboxing"
   - "[Brand] [year]"

5. Comment Extraction & Analysis
   Use `youtube_video_details_exa`:
   - Top comments by likes
   - Recent comments
   - Reply threads
   - Creator responses
   - Comment sentiment
   - Recurring themes

6. Video Creator Sentiment
   Analyze video content:
   - Creator opinion (positive/negative)
   - Recommendation status
   - Criticism points
   - Praise elements
   - Influence level
   - Audience alignment
```

### Phase 3: Reddit Deep Dive

```
7. Subreddit Identification
   Use `reddit_search_exa`:
   - Brand-specific subreddits
   - Industry subreddits
   - Product category subs
   - General discussion subs
   - Support communities
   - Competitor subreddits

8. Thread Sentiment Analysis
   For each relevant thread:
   - Original post sentiment
   - Top comment sentiment
   - Comment consensus
   - Controversial opinions
   - Moderator stance
   - Resolution status

9. Discussion Theme Extraction
   Common discussion topics:
   - Product quality
   - Customer service
   - Pricing/value
   - Feature requests
   - Technical issues
   - Company policies
   - Competitive comparisons
```

### Phase 4: TikTok Sentiment Capture

```
10. TikTok Content Analysis
    Use `tiktok_search_exa`:
    - Brand-related videos
    - Hashtag campaigns
    - User testimonials
    - Complaint videos
    - Parody/humor content
    - Trend participation

11. Engagement Sentiment
    Analyze engagement signals:
    - Like ratios
    - Comment tone
    - Share patterns
    - Duet responses
    - Sound usage
    - Creator sentiment

12. Viral Sentiment Moments
    Track viral content:
    - Positive viral stories
    - Negative incidents
    - Meme creation
    - Trend hijacking
    - Community responses
    - Brand reaction
```

### Phase 5: Sentiment Classification & Scoring

```
13. Sentiment Categorization
    Classify all content:
    - Strongly Positive (advocates)
    - Positive (satisfied)
    - Neutral (factual)
    - Negative (dissatisfied)
    - Strongly Negative (detractors)
    - Mixed (complex opinions)

14. Emotion Mapping
    Identify emotional drivers:
    - Joy/Delight
    - Trust/Confidence
    - Frustration/Anger
    - Disappointment
    - Surprise
    - Fear/Concern

15. Topic Sentiment Matrix
    Map sentiment by topic:
    - Product features
    - Customer service
    - Pricing/value
    - Brand values
    - User experience
    - Innovation
```

### Phase 6: Insight Synthesis

```
16. Sentiment Trend Analysis
    Track over time:
    - Overall sentiment trajectory
    - Platform-specific trends
    - Topic sentiment evolution
    - Seasonal patterns
    - Event impact
    - Recovery patterns

17. Driver Identification
    Key sentiment drivers:
    - Positive catalysts
    - Negative triggers
    - Neutral factors
    - Sentiment shifters
    - Influence patterns
    - Resolution impact

18. Actionable Insights
    Strategic recommendations:
    - Address pain points
    - Amplify positives
    - Engage advocates
    - Convert neutrals
    - Mitigate negatives
    - Monitor emerging issues
```

## Output Format

```markdown
# Cross-Platform Sentiment Analysis: [Brand Name]
## Analysis Period: [Start Date] - [End Date]
## Platforms: YouTube, Reddit, TikTok

### Executive Summary
- **Overall Sentiment Score**: [X.X]/5.0 ([Descriptor])
- **Sentiment Trend**: [Improving/Stable/Declining] [↑→↓]
- **Positive Ratio**: [X]% Positive | [Y]% Neutral | [Z]% Negative
- **Key Strength**: [Most praised aspect]
- **Primary Concern**: [Most common complaint]
- **Urgent Action**: [Most critical issue to address]

### Platform Sentiment Overview

| Platform | Sentiment Score | Positive % | Neutral % | Negative % | Sample Size |
|----------|----------------|------------|-----------|------------|-------------|
| YouTube | [X.X]/5.0 | [A]% | [B]% | [C]% | [N] comments |
| Reddit | [X.X]/5.0 | [A]% | [B]% | [C]% | [N] posts/comments |
| TikTok | [X.X]/5.0 | [A]% | [B]% | [C]% | [N] videos |
| **Overall** | **[X.X]/5.0** | **[A]%** | **[B]%** | **[C]%** | **[Total]** |

### Sentiment Distribution Visualization
```
Strongly Positive  ████████████░░░░░░░░ 35%
Positive          ████████░░░░░░░░░░░░ 28%
Neutral           █████░░░░░░░░░░░░░░░ 18%
Negative          ████░░░░░░░░░░░░░░░░ 14%
Strongly Negative ██░░░░░░░░░░░░░░░░░░  5%
```

### YouTube Sentiment Analysis

#### Overall YouTube Sentiment
- **Videos Analyzed**: [N] videos
- **Total Comments Reviewed**: [N] comments
- **Average Sentiment**: [X.X]/5.0
- **Engagement Quality**: [High/Medium/Low]

#### Top Positive Themes
1. **[Theme 1]** - [X]% of positive comments
   - Example: "[Representative comment]"
   - Common phrases: [List]
   - Creator influence: [High/Medium/Low]

2. **[Theme 2]** - [X]% of positive comments
   - Example: "[Representative comment]"
   - Impact on purchases: [Notable/Some/Minimal]

3. **[Theme 3]** - [X]% of positive comments
   - Demographic: [Primary audience mentioning]

#### Top Negative Themes
1. **[Issue 1]** - [X]% of negative comments
   - Example: "[Representative complaint]"
   - Severity: [High/Medium/Low]
   - Company response rate: [X]%

2. **[Issue 2]** - [X]% of negative comments
   - Suggested solutions from users: [List]
   - Comparison to competitors: [Mentioned brands]

#### Influential Videos Impact
| Video Title | Creator | Views | Sentiment | Impact |
|-------------|---------|-------|-----------|---------|
| [Title] | [Channel] | [X]M | Positive | High - drove sales |
| [Title] | [Channel] | [X]K | Negative | Medium - PR response needed |
| [Title] | [Channel] | [X]K | Mixed | Low - balanced view |

### Reddit Sentiment Deep Dive

#### Subreddit Sentiment Breakdown
| Subreddit | Posts Analyzed | Overall Sentiment | Trend | Key Topics |
|-----------|----------------|-------------------|--------|------------|
| r/[brand] | [N] | [Positive/Mixed/Negative] | ↑ | Support, Features |
| r/[industry] | [N] | [Positive/Mixed/Negative] | → | Comparisons |
| r/[general] | [N] | [Positive/Mixed/Negative] | ↓ | Complaints |

#### Reddit Sentiment Themes

**Positive Discussions** ([X]% of total)
1. **Customer Success Stories**
   - "Changed my workflow completely"
   - "Best purchase this year"
   - "Support team went above and beyond"
   - Upvote ratio: [X]%

2. **Feature Appreciation**
   - [Feature 1]: "Game changer"
   - [Feature 2]: "Finally someone got it right"
   - [Feature 3]: "Worth the price alone"

3. **Community Support**
   - Users helping users: [X]% of threads
   - Unofficial guides created: [N]
   - Brand advocacy strength: [High/Medium/Low]

**Negative Discussions** ([X]% of total)
1. **Recurring Complaints**
   - [Issue 1]: [N] mentions - "Still not fixed after months"
   - [Issue 2]: [N] mentions - "Deal breaker for many"
   - [Issue 3]: [N] mentions - "Considering alternatives"

2. **Comparison Criticisms**
   - Versus [Competitor A]: "They have X, why don't we?"
   - Versus [Competitor B]: "Better value for money"
   - Feature gaps highlighted: [List]

#### Reddit Community Sentiment Evolution
```
Month-over-Month Sentiment Trend:
Month 1: ████████░░ 78% positive
Month 2: ███████░░░ 72% positive  
Month 3: ██████░░░░ 65% positive ⚠️ Declining
```

### TikTok Sentiment Insights

#### TikTok Content Sentiment
- **Videos Analyzed**: [N]
- **Total Engagement**: [X]M views, [Y]K comments
- **Sentiment Score**: [X.X]/5.0
- **Viral Sentiment Events**: [N] videos >1M views

#### TikTok Sentiment Patterns

**Positive Content** ([X]% of videos)
1. **User Testimonials**
   - Authentic experiences: [N] videos
   - Average views: [X]K
   - Key message: "Life-changing"

2. **Creative Uses**
   - Unexpected applications: [N] videos
   - Trend creation: [Yes/No]
   - Brand benefit: [Description]

3. **Humor/Entertainment**
   - Brand-positive humor: [N] videos
   - Meme potential: [High/Medium/Low]
   - Engagement quality: [Positive reinforcement]

**Negative Content** ([X]% of videos)
1. **Complaint Videos**
   - "Storytime" format: [N] videos
   - Average reach: [X]K views
   - Resolution rate: [X]%

2. **Comparison Videos**
   - Unfavorable comparisons: [N]
   - Competitor mentioned most: [Brand]
   - Key disadvantage shown: [Issue]

### Cross-Platform Sentiment Themes

#### Universal Positive Themes
1. **[Theme 1]** - Mentioned across all platforms
   - YouTube: [X]% positive mentions
   - Reddit: [Y]% positive mentions
   - TikTok: [Z]% positive mentions
   - Strategic importance: [High/Medium/Low]

2. **[Theme 2]** - Strong multi-platform presence
   - Consistency score: [X]/10
   - Demographic appeal: [Description]
   - Growth potential: [Assessment]

#### Universal Pain Points
1. **[Issue 1]** - Criticized on all platforms
   - Severity by platform: YT [High], Reddit [High], TikTok [Medium]
   - Estimated affected users: [X]%
   - Business impact: $[Estimate]
   - **Priority**: URGENT

2. **[Issue 2]** - Growing concern
   - First mentioned: [Date/Platform]
   - Spread rate: [X] platforms in [Y] weeks
   - Current status: [Escalating/Stable]
   - **Action needed**: [Recommendation]

### Sentiment Drivers Analysis

#### Positive Sentiment Catalysts
| Driver | Impact | Platforms | Sustainability |
|--------|---------|-----------|----------------|
| [New feature launch] | +15% positive | All | High - ongoing |
| [CEO response video] | +8% positive | YouTube, Reddit | Medium - temporary |
| [Price reduction] | +12% positive | Reddit, TikTok | High - structural |
| [Support improvement] | +10% positive | Reddit | High - systematic |

#### Negative Sentiment Triggers
| Trigger | Impact | Platforms | Mitigation Status |
|---------|---------|-----------|-------------------|
| [Outage incident] | -20% positive | All | Resolved, recovering |
| [Competitor launch] | -8% positive | Reddit, YouTube | Ongoing challenge |
| [Policy change] | -15% positive | Reddit | Under review |
| [Quality issues] | -12% positive | All | Fix in progress |

### Influencer & Advocate Analysis

#### Brand Advocates (High Positive Influence)
| Platform | Influencer/User | Reach | Sentiment Impact |
|----------|----------------|-------|------------------|
| YouTube | [Channel Name] | 500K subs | +5% platform sentiment |
| Reddit | u/[username] | Top contributor | Community moderator |
| TikTok | @[handle] | 1M followers | 3 viral positive videos |

#### Brand Detractors (High Negative Influence)
| Platform | Influencer/User | Reach | Issues Raised |
|----------|----------------|-------|---------------|
| YouTube | [Channel Name] | 200K subs | Quality, support |
| Reddit | u/[username] | Power user | Pricing, features |
| TikTok | @[handle] | 500K followers | Customer service |

### Competitive Sentiment Comparison

| Aspect | Our Brand | Competitor A | Competitor B | Market Leader |
|--------|-----------|--------------|--------------|---------------|
| Overall Sentiment | 68% positive | 72% positive | 65% positive | 78% positive |
| Customer Service | 62% positive | 70% positive | 58% positive | 82% positive |
| Product Quality | 75% positive | 73% positive | 71% positive | 80% positive |
| Value for Money | 70% positive | 65% positive | 78% positive | 68% positive |
| Innovation | 72% positive | 78% positive | 60% positive | 85% positive |

### Actionable Recommendations

#### Immediate Actions (This Week)
1. **Address [Critical Issue]**
   - Platforms affected: All
   - Sentiment impact: -15%
   - Action: Public acknowledgment and fix timeline
   - Owner: Customer Success Team

2. **Amplify [Positive Theme]**
   - Opportunity: +10% sentiment possible
   - Action: Create content series highlighting this
   - Platforms: YouTube, TikTok priority

#### Short-term Improvements (30 Days)
1. **Enhance Customer Support Response**
   - Current: 48-hour average
   - Target: 12-hour average
   - Expected impact: +8% sentiment

2. **Launch "We're Listening" Campaign**
   - Address top 5 user concerns publicly
   - Show progress on improvements
   - Engage directly with critics

#### Strategic Initiatives (90 Days)
1. **Product Improvement Roadmap**
   - Fix top 3 complained features
   - Communicate progress monthly
   - Beta test with vocal critics

2. **Advocate Program Launch**
   - Identify and engage top 50 advocates
   - Exclusive access and recognition
   - Amplify positive voices

### Sentiment Monitoring Plan

#### Key Metrics to Track
- Daily sentiment score by platform
- Issue mention frequency
- Advocate/detractor ratio
- Response effectiveness
- Sentiment recovery rate

#### Alert Thresholds
- Sentiment drop >10% in 24 hours
- Negative viral content >100K views
- New issue mentioned >50 times
- Advocate churn >5% monthly

#### Reporting Schedule
- Daily: Executive sentiment dashboard
- Weekly: Platform deep dives
- Monthly: Comprehensive analysis
- Quarterly: Strategic review

---

**Analysis Methodology**: Natural language processing, manual verification
**Confidence Level**: High (large sample size)
**Data Limitations**: Public content only, English language
**Next Analysis**: [Date - recommend monthly]
```

## Best Practices

1. **Context Matters**: Understand why sentiment exists, not just what it is
2. **Weight by Influence**: High-reach content impacts more than low
3. **Track Velocity**: Sentiment change rate matters more than absolute
4. **Segment Analysis**: Different user groups have different sentiments
5. **Action Orientation**: Every insight should drive specific actions

## Advanced Techniques

### Sentiment Velocity Tracking
- Measure sentiment change rate
- Identify acceleration points
- Predict sentiment trajectories
- Model intervention impacts
- Set velocity-based alerts

### Influencer-Weighted Sentiment
- Weight comments by user influence
- Track influencer sentiment separately
- Model sentiment cascade effects
- Identify sentiment leaders
- Predict viral sentiment risks

### Topic-Specific Sentiment Evolution
- Track sentiment by feature/topic
- Map sentiment journey over time
- Identify sentiment lifecycle patterns
- Predict topic sentiment maturity
- Guide product/messaging priorities

### Competitive Sentiment Benchmarking
- Compare sentiment across competitors
- Identify relative strengths/weaknesses
- Track competitive sentiment gaps
- Monitor sentiment share shifts
- Find differentiation opportunities

## Common Pitfalls to Avoid

1. **Sampling Bias**: Ensure representative sample across platforms
2. **Vocal Minority**: Don't let loud voices skew perception
3. **Platform Bias**: Each platform has different user demographics
4. **Temporal Bias**: Recent events can skew historical view
5. **Language Limitations**: Consider non-English sentiment

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Sentiment-Analysis-Specialist
motivation: Extract actionable sentiment insights across platforms to guide brand strategy and improvement
constraints: Analyze sufficient sample size, account for platform differences, focus on actionable insights
output_format: Comprehensive sentiment report with platform breakdowns, themes, and recommendations
-->

When deploying task agents for sentiment analysis:
1. Collect statistically significant samples
2. Verify sentiment classification accuracy
3. Extract specific examples for each theme
4. Weight by engagement and influence
5. Connect sentiment to business outcomes

## Customization Options

### Analysis Depth
- **Quick Pulse**: Top-line sentiment only (4 hours)
- **Standard Analysis**: Full theme extraction (1-2 days)
- **Deep Dive**: Include influencer analysis (3 days)
- **Continuous Monitoring**: Real-time sentiment tracking

### Platform Focus
- **Core Platforms**: YouTube, Reddit, TikTok
- **Extended**: Add Twitter, Instagram, Facebook
- **B2B Focus**: LinkedIn, industry forums
- **International**: Multi-language analysis
- **Niche**: Platform-specific deep dives

### Output Variations
- **Executive Dashboard**: Visual sentiment summary
- **Detailed Report**: Full analysis with examples
- **Alert System**: Real-time sentiment warnings
- **Competitive View**: Relative sentiment analysis
- **Topic Focus**: Sentiment by product/feature