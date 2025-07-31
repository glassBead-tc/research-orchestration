# Cross-Platform Social Audit Orchestration

This workflow orchestrates a comprehensive survey of a company's presence across LinkedIn, YouTube, TikTok, and Reddit, compiling metrics like follower counts, video views, and community size.

## Overview

A comprehensive social media audit reveals the true scope of a brand's digital influence and community engagement. This orchestration systematically analyzes presence across major platforms, providing quantitative metrics and qualitative insights about social media performance, audience composition, and engagement patterns that inform strategic social media optimization.

## Required Tools

- `linkedin_search_exa` - Professional network presence
- `youtube_search_exa` - Video platform analysis
- `youtube_video_details_exa` - Detailed video metrics
- `tiktok_search_exa` - Short-form video presence
- `reddit_search_exa` - Community discussions
- `company_research_exa` - Company baseline information
- `web_search_exa` - Additional platform discovery

## Workflow Steps

### Phase 1: Social Media Discovery

```
1. Company Profile Baseline
   Use `company_research_exa`:
   - Official company name variations
   - Brand names and sub-brands
   - Common abbreviations
   - Industry and category
   - Target audience profile

2. Platform Account Discovery
   For each platform, search for:
   - Official company accounts
   - Brand-specific accounts
   - Regional accounts
   - Product-specific accounts
   - Executive accounts
   - Employee advocacy presence

3. Account Verification
   Verify official status:
   - Verification badges
   - Website linkbacks
   - Consistent branding
   - Account age
   - Official announcements
   - Contact information
```

### Phase 2: LinkedIn Analysis

```
4. Company Page Metrics
   Use `linkedin_search_exa`:
   - Follower count
   - Employee count
   - Page completeness
   - Industry classification
   - Headquarters location
   - Specialties listed

5. Content Performance
   Analyze recent posts:
   - Post frequency
   - Content types
   - Engagement rates
   - Best performing posts
   - Hashtag usage
   - Employee amplification

6. LinkedIn Insights
   - Follower demographics
   - Follower growth trend
   - Employee advocacy level
   - Thought leadership presence
   - Event participation
   - LinkedIn Live usage
```

### Phase 3: YouTube Channel Audit

```
7. Channel Overview
   Use `youtube_search_exa`:
   - Channel URL and handle
   - Subscriber count
   - Total video count
   - Channel creation date
   - Channel description
   - Featured content

8. Video Performance Analysis
   Use `youtube_video_details_exa` for top videos:
   - View counts
   - Like/dislike ratios
   - Comment counts
   - Average view duration
   - Click-through rates
   - Subscriber conversion

9. Content Strategy Assessment
   - Upload frequency
   - Video categories
   - Average video length
   - Series/playlist usage
   - Thumbnail consistency
   - SEO optimization
```

### Phase 4: TikTok Presence

```
10. Account Discovery
    Use `tiktok_search_exa`:
    - Official account search
    - Follower count
    - Total likes
    - Video count
    - Bio optimization
    - Link usage

11. Content Performance
    Analyze top content:
    - View counts
    - Engagement rates
    - Share counts
    - Comment sentiment
    - Trending participation
    - Sound usage

12. TikTok Strategy
    - Posting frequency
    - Content themes
    - Hashtag strategy
    - Trend participation
    - Creator collaborations
    - Live streaming usage
```

### Phase 5: Reddit Ecosystem

```
13. Reddit Presence Mapping
    Use `reddit_search_exa`:
    - Official subreddit existence
    - Community-run subreddits
    - Brand mention frequency
    - Discussion sentiment
    - Active communities
    - Moderator presence

14. Community Health
    For relevant subreddits:
    - Subscriber counts
    - Daily active users
    - Post frequency
    - Engagement quality
    - Moderator activity
    - Community rules

15. Brand Participation
    - Official account activity
    - Employee participation
    - AMA (Ask Me Anything) history
    - Response quality
    - Community management
    - Crisis handling
```

### Phase 6: Cross-Platform Analysis

```
16. Unified Metrics
    Aggregate across platforms:
    - Total follower count
    - Total engagement rate
    - Content frequency
    - Platform prioritization
    - Cross-promotion strategy
    - Consistent messaging

17. Audience Analysis
    - Platform audience overlap
    - Demographic differences
    - Engagement patterns
    - Content preferences
    - Peak activity times
    - Geographic distribution

18. Content Ecosystem
    - Content repurposing
    - Platform-specific adaptation
    - Campaign coordination
    - Brand consistency
    - Resource allocation
    - ROI by platform
```

## Output Format

```markdown
# Cross-Platform Social Media Audit: [Company Name]
## Audit Date: [Date]
## Platforms Analyzed: LinkedIn, YouTube, TikTok, Reddit

### Executive Summary
- **Total Social Reach**: [X.X]M followers across platforms
- **Most Successful Platform**: [Platform] - [Key metric]
- **Highest Engagement**: [Platform] - [Engagement rate]
- **Biggest Opportunity**: [Platform/Strategy]
- **Overall Social Health Score**: [X]/10

### Platform Overview Dashboard

| Platform | Followers/Subs | Engagement Rate | Post Frequency | Growth Trend | Health Score |
|----------|----------------|-----------------|----------------|--------------|--------------|
| LinkedIn | [X]K | [Y]% | [Z]/week | ↑ +[A]% | [B]/10 |
| YouTube | [X]K | [Y]% | [Z]/month | ↑ +[A]% | [B]/10 |
| TikTok | [X]K | [Y]% | [Z]/week | ↑ +[A]% | [B]/10 |
| Reddit | [X]K members | [Y]% | Community-driven | → [A]% | [B]/10 |
| **Total** | **[X]M** | **[Avg Y]%** | - | **↑ +[A]%** | **[B]/10** |

### LinkedIn Deep Dive

#### Account Information
- **Company Page**: [URL]
- **Followers**: [X,XXX]
- **Employees on LinkedIn**: [X,XXX]
- **Founded**: [Year]
- **Industry**: [Category]
- **Verification Status**: ✓ Verified

#### Content Performance (Last 30 Days)
| Metric | Value | Benchmark | Status |
|--------|-------|-----------|---------|
| Posts Published | [X] | 12-16 | [On track/Below/Above] |
| Avg. Engagement Rate | [X]% | 2-4% | [Good/Needs improvement] |
| Best Post Engagement | [X]% | - | [Post topic] |
| Follower Growth | +[X]% | +2-3% | [Strong/Average/Weak] |
| Employee Advocacy | [X]% | 10-15% | [Status] |

#### Top Performing Content
1. **[Post Type]** - [Date]
   - Engagement: [X]%
   - Reactions: [X] | Comments: [Y] | Shares: [Z]
   - Key Success Factor: [Insight]

2. **[Post Type]** - [Date]
   - Engagement: [X]%
   - Key Success Factor: [Insight]

#### LinkedIn Strategy Insights
- **Strengths**: [List key strengths]
- **Weaknesses**: [List areas for improvement]
- **Opportunities**: [List growth opportunities]
- **Content Gaps**: [Missing content types]

### YouTube Channel Analysis

#### Channel Overview
- **Channel URL**: [URL]
- **Subscribers**: [X,XXX]
- **Total Views**: [X.X]M
- **Videos Published**: [X]
- **Channel Age**: [X] years
- **Verification**: ✓ Verified

#### Channel Performance Metrics
| Metric | Value | Industry Avg | Performance |
|--------|-------|--------------|-------------|
| Avg. Views per Video | [X]K | [Y]K | [Above/Below] |
| Engagement Rate | [X]% | [Y]% | [Above/Below] |
| Upload Frequency | [X]/month | [Y]/month | [Consistent/Irregular] |
| Subscriber Growth | +[X]%/mo | +[Y]%/mo | [Above/Below] |
| Watch Time | [X] hrs | - | - |

#### Top Videos Analysis
| Video Title | Views | Engagement | Published | Success Factors |
|-------------|-------|------------|-----------|-----------------|
| [Title 1] | [X]K | [Y]% | [Date] | [Factors] |
| [Title 2] | [X]K | [Y]% | [Date] | [Factors] |
| [Title 3] | [X]K | [Y]% | [Date] | [Factors] |

#### Content Strategy Assessment
- **Primary Content Types**: [List]
- **Average Video Length**: [X:XX]
- **Publishing Schedule**: [Pattern]
- **SEO Optimization**: [Score/10]
- **Thumbnail Strategy**: [Consistent/Inconsistent]

### TikTok Presence

#### Account Status
- **Handle**: @[username] [or "No official presence"]
- **Followers**: [X]K
- **Total Likes**: [X]K
- **Videos Posted**: [X]
- **Account Age**: [X] months
- **Verification**: [Status]

#### Content Performance
| Metric | Value | Platform Avg | Status |
|--------|-------|--------------|---------|
| Avg. Views | [X]K | [Y]K | [Above/Below] |
| Engagement Rate | [X]% | 5-10% | [Status] |
| Viral Videos (>1M) | [X] | - | - |
| Post Frequency | [X]/week | 3-7/week | [Status] |

#### TikTok Strategy
- **Content Themes**: [List main themes]
- **Trend Participation**: [High/Medium/Low]
- **Original Audio**: [Yes/No]
- **Hashtag Strategy**: [Assessment]
- **Creator Collabs**: [Number/None]

### Reddit Ecosystem

#### Community Presence
| Community | Type | Members | Activity | Brand Presence |
|-----------|------|---------|----------|----------------|
| r/[company] | Official | [X]K | [High/Med/Low] | Verified Mod |
| r/[product] | Community | [X]K | [High/Med/Low] | Occasional |
| r/[industry] | Industry | [X]K | [High/Med/Low] | Regular |

#### Reddit Metrics
- **Total Community Reach**: [X]K members
- **Monthly Brand Mentions**: [X]
- **Sentiment Score**: [X]% positive
- **Official Participation**: [Frequency]
- **AMA History**: [Number] AMAs

#### Community Insights
- **Hot Topics**: [List main discussion themes]
- **Common Questions**: [List FAQs]
- **Pain Points**: [List complaints]
- **Brand Advocates**: [Estimate %]

### Cross-Platform Analysis

#### Audience Distribution
```
Platform Share of Total Followers:
LinkedIn: ████████████ 45%
YouTube:  ████████ 30%
TikTok:   ████ 15%
Reddit:   ███ 10%
```

#### Engagement Rate Comparison
```
Platform Engagement Rates:
TikTok:   ████████████████ 8.5%
Reddit:   ████████████ 6.2%
LinkedIn: ██████ 3.1%
YouTube:  █████ 2.8%
```

#### Content Strategy Alignment
| Platform | Content Focus | Frequency | Resource % | ROI Rank |
|----------|--------------|-----------|------------|----------|
| LinkedIn | B2B thought leadership | Daily | 35% | 1 |
| YouTube | Product demos, tutorials | Weekly | 40% | 2 |
| TikTok | Behind-scenes, trends | 3x/week | 15% | 3 |
| Reddit | Community support | As needed | 10% | 4 |

### Platform-Specific Recommendations

#### LinkedIn
**Immediate Actions**:
1. Increase posting frequency to daily
2. Implement employee advocacy program
3. Start LinkedIn Live series

**Growth Strategy**:
- Target: +50% followers in 6 months
- Focus: Industry thought leadership
- Investment: $[X]K in sponsored content

#### YouTube
**Immediate Actions**:
1. Optimize video SEO
2. Create consistent thumbnails
3. Develop series content

**Growth Strategy**:
- Target: 2x subscribers in 12 months
- Focus: Educational content
- Investment: $[X]K in production

#### TikTok
**Immediate Actions**:
1. [If no presence] Launch official account
2. Partner with creators
3. Participate in trends weekly

**Growth Strategy**:
- Target: 100K followers in 6 months
- Focus: Authentic, fun content
- Investment: $[X]K in creator partnerships

#### Reddit
**Immediate Actions**:
1. Assign community manager
2. Host quarterly AMAs
3. Create official subreddit

**Growth Strategy**:
- Target: Active daily participation
- Focus: Helpful, authentic engagement
- Investment: Dedicated team member

### Competitive Benchmarking

| Metric | Us | Competitor Avg | Leader | Gap |
|--------|-----|----------------|--------|-----|
| Total Followers | [X]M | [Y]M | [Z]M | -[A]% |
| Engagement Rate | [X]% | [Y]% | [Z]% | -[A]pp |
| Post Frequency | [X]/mo | [Y]/mo | [Z]/mo | -[A] |
| Platform Coverage | 3/4 | 4/4 | 4/4 | -1 |

### Strategic Priorities

#### Quick Wins (30 days)
1. Optimize all profile bios with clear CTAs
2. Implement consistent posting schedule
3. Launch employee advocacy on LinkedIn
4. Start responding to Reddit mentions

#### Short-term Goals (90 days)
1. Launch TikTok presence
2. Double YouTube upload frequency
3. Host first Reddit AMA
4. Create cross-platform content series

#### Long-term Vision (12 months)
1. Achieve top 3 industry position on LinkedIn
2. Build 100K+ YouTube subscriber base
3. Establish TikTok thought leadership
4. Become most-loved brand on Reddit

### Measurement Framework

#### Key Performance Indicators
- Total follower growth rate: [Target]%/month
- Average engagement rate: [Target]%
- Share of voice: [Target]%
- Community sentiment: [Target]% positive
- Social-driven conversions: [Target]/month

#### Reporting Cadence
- Weekly: Engagement metrics
- Monthly: Growth and reach
- Quarterly: Strategic review
- Annually: Platform ROI analysis

---

**Data Collection Date**: [Date]
**Data Sources**: Platform APIs, public metrics
**Confidence Level**: High (verified accounts)
**Next Audit**: [Recommended in 3 months]
```

## Best Practices

1. **Consistent Identity**: Maintain unified branding across platforms
2. **Platform-Native Content**: Adapt content to platform cultures
3. **Engagement Over Broadcasting**: Focus on conversations
4. **Data-Driven Decisions**: Let metrics guide strategy
5. **Cross-Promotion**: Leverage each platform's strengths

## Advanced Techniques

### Audience Journey Mapping
- Track users across platforms
- Identify platform preferences by segment
- Map content consumption patterns
- Optimize cross-platform funnels
- Measure platform attribution

### Engagement Quality Scoring
- Weight engagement by value
- Track sentiment alongside metrics
- Measure conversation depth
- Identify brand advocates
- Calculate true engagement value

### Content Efficiency Analysis
- Measure content repurposing ROI
- Track production time vs. performance
- Identify high-efficiency content types
- Optimize resource allocation
- Build content multiplication strategies

### Community Health Monitoring
- Track community growth quality
- Measure member engagement depth
- Monitor community sentiment
- Identify community leaders
- Predict community trends

## Common Pitfalls to Avoid

1. **Vanity Metrics Focus**: Followers don't equal business value
2. **Platform Neglect**: Inconsistent presence hurts credibility
3. **One-Size-Fits-All**: Each platform needs unique strategy
4. **Broadcast Mentality**: Social media is conversational
5. **ROI Ignorance**: Track business impact, not just engagement

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Social-Media-Auditor
motivation: Provide comprehensive cross-platform social media analysis to optimize presence and engagement
constraints: Use only public data, respect platform rate limits, focus on actionable insights
output_format: Detailed platform-by-platform audit with metrics, insights, and strategic recommendations
-->

When deploying task agents for social audit:
1. Verify official accounts carefully
2. Use consistent time periods for comparison
3. Account for platform algorithm differences
4. Focus on engagement quality over quantity
5. Connect social metrics to business goals

## Customization Options

### Audit Depth Levels
- **Quick Scan**: Basic metrics only (2 hours)
- **Standard Audit**: Full analysis (1 day)
- **Deep Dive**: Include competitor comparison (2 days)
- **Ongoing Monitoring**: Monthly updates

### Platform Variations
- **B2B Focus**: LinkedIn, Twitter, YouTube
- **B2C Focus**: Instagram, TikTok, Facebook
- **Tech Focus**: GitHub, Stack Overflow, Reddit
- **Local Business**: Facebook, Instagram, Google
- **Enterprise**: LinkedIn, Twitter, YouTube

### Output Formats
- **Executive Summary**: 1-page key findings
- **Detailed Report**: Full platform analysis
- **Comparison Matrix**: Competitor benchmarking
- **Action Plan**: Prioritized recommendations
- **Dashboard**: Visual KPI tracking