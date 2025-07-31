# Viral Content Monitoring Orchestration

This workflow regularly queries social platforms for viral posts, memes, or trending videos involving the company or industry, summarizing their impact and identifying response opportunities.

## Overview

Viral content can rapidly shape brand perception, create opportunities, or pose reputation risks. This orchestration continuously monitors social platforms for viral moments related to your brand, products, or industry. It tracks velocity, reach, sentiment, and provides real-time alerts and strategic response recommendations for viral events.

## Required Tools

- `reddit_search_exa` - Viral Reddit posts and discussions
- `youtube_search_exa` - Trending YouTube videos
- `youtube_video_details_exa` - Viral video metrics
- `tiktok_search_exa` - TikTok trends and viral content
- `web_search_exa` - Cross-platform viral tracking

## Workflow Steps

### Phase 1: Viral Content Parameters

```
1. Virality Threshold Definition
   Platform-specific thresholds:
   - YouTube: >100K views in 48 hours
   - TikTok: >500K views in 24 hours
   - Reddit: >5K upvotes in 12 hours
   - Cross-platform: Mentioned on 3+ platforms
   - News pickup: Featured in media
   - Velocity: 10x normal engagement rate

2. Monitoring Scope Setup
   What to track:
   - Direct brand mentions
   - Product references
   - Industry trends
   - Competitor viral content
   - Adjacent market virality
   - Cultural moments
   - Meme potential content

3. Alert Priority Levels
   Response urgency:
   - Critical: Negative viral >1M reach
   - High: Any viral >500K reach
   - Medium: Positive viral >100K
   - Low: Industry viral relevance
   - Monitor: Competitor viral activity
```

### Phase 2: Reddit Viral Detection

```
4. Subreddit Monitoring
   Use `reddit_search_exa` on:
   - r/all (top posts)
   - Brand-specific subreddits
   - Industry subreddits
   - Meme subreddits
   - Regional subreddits
   - Trending communities

5. Viral Post Analysis
   For high-velocity posts:
   - Upvote velocity
   - Comment growth rate
   - Cross-posting frequency
   - Award accumulation
   - Sentiment direction
   - Mod intervention

6. Reddit Viral Patterns
   Track propagation:
   - Origin subreddit
   - Spread pattern
   - Peak timing
   - Engagement quality
   - Media pickup
   - Resolution/outcome
```

### Phase 3: YouTube Viral Tracking

```
7. Trending Video Discovery
   Use `youtube_search_exa`:
   - Sort by upload date + views
   - Monitor trending tabs
   - Track velocity signals
   - Check related videos
   - Monitor comments growth
   - Track share velocity

8. Viral Video Deep Dive
   Use `youtube_video_details_exa`:
   - View count progression
   - Like/dislike momentum
   - Comment sentiment
   - Share statistics
   - Traffic sources
   - Audience retention

9. Creator Analysis
   For viral content creators:
   - Previous viral history
   - Audience influence
   - Content patterns
   - Brand relationship
   - Response likelihood
   - Collaboration potential
```

### Phase 4: TikTok Trend Monitoring

```
10. TikTok Viral Detection
    Use `tiktok_search_exa`:
    - Trending hashtags
    - Sound usage spikes
    - View velocity tracking
    - Duet/stitch chains
    - Challenge participation
    - FYP penetration

11. Trend Participation Analysis
    Track trend elements:
    - Original creator
    - Trend mutation
    - Brand integration
    - User participation
    - Geographic spread
    - Lifecycle stage

12. TikTok Viral Impact
    Measure influence:
    - Total trend views
    - Creation velocity
    - Sentiment evolution
    - Brand association
    - Conversion potential
    - Longevity prediction
```

### Phase 5: Cross-Platform Amplification

```
13. Multi-Platform Spread
    Track viral bridges:
    - Platform origin
    - Cross-posting patterns
    - Adaptation changes
    - Audience overlap
    - Amplification nodes
    - Peak platform timing

14. Media Coverage Tracking
    Use `web_search_exa`:
    - News article pickup
    - Blog coverage
    - Influencer shares
    - Brand mentions
    - Traffic impact
    - SEO implications

15. Viral Lifecycle Mapping
    Document progression:
    - Origin point
    - Growth phase
    - Peak moment
    - Decline rate
    - Long tail
    - Revival potential
```

### Phase 6: Impact Assessment & Response

```
16. Business Impact Analysis
    Quantify effects:
    - Website traffic spikes
    - Search volume changes
    - Mention frequency
    - Sentiment shifts
    - Sales correlation
    - Support inquiries

17. Response Strategy Development
    Action planning:
    - Response necessity
    - Timing optimization
    - Channel selection
    - Message crafting
    - Stakeholder alerts
    - Outcome tracking

18. Opportunity Identification
    Leverage potential:
    - Trend participation
    - Content creation
    - Community engagement
    - Influencer activation
    - Campaign integration
    - PR amplification
```

## Output Format

```markdown
# Viral Content Monitoring Report
## Monitoring Period: [Date Range]
## Alert Status: [Normal/Elevated/Critical]

### Executive Summary
- **Active Viral Content**: [X] pieces above threshold
- **Total Viral Reach**: [X.X]M views/impressions
- **Sentiment Balance**: [X]% Positive | [Y]% Negative
- **Urgent Response Needed**: [Yes/No] - [Reason]
- **Top Opportunity**: [Description]
- **Key Risk**: [Description]

### Viral Content Dashboard

| Platform | Content Type | Reach | Velocity | Sentiment | Status |
|----------|--------------|-------|----------|-----------|---------|
| TikTok | Brand trend | 2.5M views | ↑ 500K/hr | Positive | Growing |
| Reddit | Complaint post | 15K upvotes | ↑ 2K/hr | Negative | Peak |
| YouTube | Review video | 450K views | ↑ 50K/hr | Mixed | Growing |
| Twitter | Meme | 25K RT | ↑ 5K/hr | Humorous | Peak |

### Critical Viral Content Details

#### 1. [Platform]: "[Content Title/Description]"
**Status**: 🔴 Critical - Negative Viral
**Metrics**:
- Current Reach: [X]M views/impressions
- Growth Rate: +[Y]K per hour
- Engagement: [Z]K comments/reactions
- Sentiment: [X]% negative

**Content Analysis**:
- Origin: [Creator/User] at [Time]
- Core Message: [What it says]
- Trigger Point: [What caused virality]
- Spread Pattern: [How it's spreading]

**Impact Assessment**:
- Brand Perception: High negative impact
- Business Risk: [Specific risks]
- Customer Impact: [Estimated affected]
- Media Interest: [High/Medium/Low]

**Recommended Response**:
- Priority: IMMEDIATE
- Channel: [Official statement via X]
- Message: [Key points to address]
- Actions: [Specific steps]
- Timeline: Within [X] hours

#### 2. [Platform]: "[Content Title/Description]"
**Status**: 🟡 Monitor - Positive Viral
**Metrics**:
- Current Reach: [X]K views
- Growth Rate: +[Y]K per hour
- Engagement: [Z]K positive

**Opportunity Analysis**:
- Amplification Potential: High
- Brand Benefit: [Specific benefits]
- Action: Engage and amplify

[Continue for all significant viral content]

### Platform-Specific Viral Activity

#### Reddit Viral Tracking
**Active Viral Posts**: [X]
**Combined Upvotes**: [X]K
**Top Subreddits**: r/[sub1], r/[sub2], r/[sub3]

| Post Title | Subreddit | Upvotes | Comments | Sentiment | Trend |
|------------|-----------|---------|----------|-----------|--------|
| [Title] | r/[sub] | 12.5K | 1.2K | Negative | ↑ Rising |
| [Title] | r/[sub] | 8.3K | 856 | Positive | → Stable |
| [Title] | r/[sub] | 5.1K | 423 | Mixed | ↓ Declining |

**Key Themes**:
1. Customer service issues (45% of viral posts)
2. Product innovation praise (30%)
3. Price comparisons (25%)

#### YouTube Viral Videos
**Viral Videos Detected**: [X]
**Combined Views**: [X.X]M
**Average Growth**: [Y]K views/hour

| Video Title | Channel | Views | Velocity | Sentiment | Action |
|-------------|---------|-------|----------|-----------|---------|
| [Title] | [Channel] | 850K | ↑ 75K/hr | Positive | Engage |
| [Title] | [Channel] | 425K | ↑ 40K/hr | Negative | Monitor |
| [Title] | [Channel] | 275K | ↑ 25K/hr | Neutral | Watch |

**Content Categories**:
- Reviews: 40% of viral videos
- Comparisons: 30%
- Tutorials: 20%
- Entertainment: 10%

#### TikTok Viral Trends
**Active Trends**: [X]
**Trend Participation**: [X]K videos
**Combined Views**: [X]M

| Trend/Hashtag | Videos | Views | Growth | Brand Impact | Status |
|---------------|--------|-------|---------|--------------|---------|
| #[trend] | 2.5K | 8.5M | ↑ 200% | Positive | Join |
| #[trend] | 1.2K | 4.2M | ↑ 150% | Neutral | Monitor |
| #[trend] | 850 | 2.1M | ↑ 100% | Risk | Address |

**Trend Analysis**:
- User-generated content quality: High
- Brand integration natural: Yes
- Participation opportunity: Strong

### Cross-Platform Viral Patterns

#### Multi-Platform Viral Content
| Origin | Content | Platform Spread | Total Reach | Status |
|--------|---------|-----------------|-------------|---------|
| TikTok | [Description] | TT → IG → TW → Reddit | 5.2M | Growing |
| Reddit | [Description] | Reddit → Twitter → News | 2.8M | Peak |
| YouTube | [Description] | YT → TikTok → IG | 1.5M | Declining |

#### Viral Velocity Comparison
```
Hour 1:   TikTok ████████ 100K
Hour 6:   TikTok ████████████████ 800K
Hour 12:  TikTok ████████████████████ 1.5M
Hour 24:  TikTok ████████████████████████ 2.5M

Hour 1:   Reddit ██ 5K
Hour 6:   Reddit ████████ 35K
Hour 12:  Reddit ████████████ 75K
Hour 24:  Reddit ████████████████ 125K
```

### Sentiment Analysis of Viral Content

#### Overall Viral Sentiment Distribution
```
Positive       ████████████ 45%
Neutral        ████████ 30%
Negative       █████ 20%
Mixed          ██ 5%
```

#### Sentiment by Platform
| Platform | Positive | Neutral | Negative | Dominant Theme |
|----------|----------|---------|----------|----------------|
| TikTok | 65% | 25% | 10% | Entertainment, appreciation |
| YouTube | 40% | 35% | 25% | Balanced reviews |
| Reddit | 30% | 30% | 40% | Critical discussions |
| Twitter | 45% | 40% | 15% | News, reactions |

### Business Impact Metrics

#### Traffic & Engagement Spikes
| Metric | Baseline | During Viral | Change | Attribution |
|--------|----------|--------------|---------|-------------|
| Website Traffic | 50K/day | 125K/day | +150% | Reddit post |
| Search Volume | 10K/day | 45K/day | +350% | TikTok trend |
| Support Tickets | 200/day | 450/day | +125% | YouTube video |
| Social Mentions | 1K/day | 8.5K/day | +750% | Multi-platform |

#### Conversion Impact
- App Downloads: +280% during TikTok trend
- Sign-ups: +125% from YouTube viral
- Sales: +45% product mentioned in viral
- Cancellations: +15% from negative Reddit

### Response Strategies Executed

#### Successful Responses
1. **TikTok Trend Participation**
   - Action: Created official response video
   - Result: 500K views, 95% positive
   - ROI: $125K in attributed sales

2. **Reddit AMA**
   - Action: CEO addressed concerns
   - Result: Sentiment shift +25%
   - Outcome: Issue resolved

#### Missed Opportunities
1. **YouTube Review Response**
   - Opportunity: Creator collaboration
   - Miss: Delayed response 48 hours
   - Impact: -50K potential views

### Competitive Viral Landscape

#### Competitor Viral Activity
| Competitor | Viral Count | Avg Reach | Sentiment | Top Platform |
|------------|-------------|-----------|-----------|--------------|
| Competitor A | 8 | 250K | Mixed | YouTube |
| Competitor B | 5 | 500K | Positive | TikTok |
| Competitor C | 3 | 150K | Negative | Reddit |

#### Industry Viral Trends
- Sustainability focus: 3 viral campaigns
- Innovation highlights: 5 viral videos
- Customer service: 2 viral complaints
- Price comparisons: 4 viral posts

### Alert History & Response Times

| Date | Platform | Content | Alert Time | Response Time | Outcome |
|------|----------|---------|------------|---------------|----------|
| [Date] | Reddit | Complaint | 2 hrs | 4 hrs | Resolved |
| [Date] | TikTok | Trend | 30 min | 2 hrs | Amplified |
| [Date] | YouTube | Review | 1 hr | 24 hrs | Engaged |

### Predictive Viral Indicators

#### High Viral Probability Content
1. **Reddit Post**: "[Title]" in r/[subreddit]
   - Current: 2.5K upvotes (4 hrs)
   - Projection: 15K+ in 24 hrs
   - Action: Prepare response

2. **TikTok Video**: @[creator]
   - Current: 50K views (2 hrs)
   - Projection: 500K+ in 24 hrs
   - Action: Monitor closely

### Strategic Recommendations

#### Immediate Actions (Next 24 Hours)
1. **Address Negative Reddit Viral**
   - Craft official response
   - Engage in comments
   - Provide resolution timeline

2. **Amplify Positive TikTok Trend**
   - Create official content
   - Engage with creators
   - Boost with paid promotion

#### Viral Preparedness Improvements
1. **Response Time Optimization**
   - Target: <2 hour detection
   - Automated alerts setup
   - Response team on-call

2. **Content Creation Readiness**
   - Pre-approved responses
   - Rapid video creation
   - Influencer quick-deploy

#### Long-term Viral Strategy
1. **Viral Content Creation**
   - Monthly viral attempts
   - Trend participation SOP
   - Creator partnerships

2. **Crisis Prevention**
   - Proactive issue resolution
   - Community management
   - Sentiment monitoring

### Monitoring Configuration

#### Alert Thresholds (Recommended Adjustments)
- YouTube: Lower to 75K in 48 hrs
- TikTok: Maintain 500K in 24 hrs
- Reddit: Lower to 3K in 12 hrs
- News: Any brand mention

#### Reporting Schedule
- Real-time: Critical alerts only
- 2x Daily: Viral summary
- Weekly: Trend analysis
- Monthly: Strategic review

---

**Report Generated**: [Timestamp]
**Data Sources**: Platform APIs, web monitoring
**Next Update**: [In 12 hours]
**Alert Status**: [Active monitoring]
```

## Best Practices

1. **Speed Matters**: Viral content has short response windows
2. **Authenticity Wins**: Genuine responses outperform corporate
3. **Ride the Wave**: Amplify positive, address negative quickly
4. **Learn Patterns**: Study what goes viral for your brand
5. **Prepare Templates**: Have response frameworks ready

## Advanced Techniques

### Viral Prediction Modeling
- Analyze early engagement signals
- Track creator viral history
- Monitor trending topics
- Calculate viral probability
- Set predictive alerts

### Sentiment Velocity Tracking
- Measure sentiment change rate
- Identify turning points
- Predict sentiment trajectories
- Model intervention impact
- Optimize response timing

### Cross-Platform Viral Mapping
- Track content adaptation
- Monitor platform bridges
- Identify amplification nodes
- Predict spread patterns
- Optimize multi-platform response

### Viral ROI Calculation
- Track traffic attribution
- Measure conversion impact
- Calculate earned media value
- Assess brand lift
- Quantify viral marketing value

## Common Pitfalls to Avoid

1. **Slow Response**: Missing the viral window
2. **Tone Deafness**: Misreading viral sentiment
3. **Over-Reaction**: Making small viral content bigger
4. **Under-Preparation**: No response plan ready
5. **Platform Ignorance**: Using wrong platform language

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Viral-Content-Monitor
motivation: Track and analyze viral content for rapid response and opportunity capitalization
constraints: Monitor continuously, alert quickly, assess impact accurately, recommend clear actions
output_format: Real-time alerts with impact assessment and response recommendations
-->

When deploying task agents for viral monitoring:
1. Set up continuous monitoring across platforms
2. Use velocity metrics not just absolute numbers
3. Assess sentiment and business impact together
4. Provide specific response recommendations
5. Track outcomes for pattern learning

## Customization Options

### Monitoring Intensity
- **Basic**: Daily viral summary (1x/day)
- **Standard**: 12-hour updates (2x/day)
- **Intensive**: 4-hour cycles (6x/day)
- **Real-time**: Continuous monitoring
- **Crisis Mode**: Minute-by-minute tracking

### Platform Coverage
- **Core**: YouTube, TikTok, Reddit
- **Extended**: Add Twitter, Instagram
- **Comprehensive**: All social platforms
- **Niche**: Industry-specific platforms
- **Global**: Multi-language monitoring

### Alert Configurations
- **Executive Alerts**: Critical only
- **Marketing Team**: All brand viral
- **PR Team**: Media pickup focus
- **Customer Service**: Complaint viral
- **Product Team**: Feature viral content