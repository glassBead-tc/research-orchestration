# Crisis Monitoring on Social Orchestration

This workflow monitors social channels for spikes in negative discussion during PR crises, tracking evolving sentiments and key discussion points as situations unfold in real-time.

## Overview

Social media crises can escalate rapidly and cause lasting reputational damage. This orchestration provides real-time monitoring across platforms to detect crisis signals early, track sentiment evolution, identify influencers shaping the narrative, and guide strategic response decisions. It enables rapid, data-driven crisis management to minimize impact and accelerate recovery.

## Required Tools

- `reddit_search_exa` - Monitor Reddit discussions
- `youtube_search_exa` - Track video responses
- `youtube_video_details_exa` - Analyze video impact
- `tiktok_search_exa` - Monitor viral crisis content
- `web_search_exa` - Track news and blog coverage
- `linkedin_search_exa` - Professional community reaction

## Workflow Steps

### Phase 1: Crisis Detection & Alert Setup

```
1. Crisis Trigger Definition
   Early warning signals:
   - Sentiment drops >20% in 4 hours
   - Negative mentions spike >300%
   - Viral negative content >100K views
   - Media pickup of negative story
   - Coordinated complaint campaigns
   - Executive/employee incidents
   - Product safety concerns
   - Data breach indicators

2. Monitoring Parameters
   Real-time tracking setup:
   - Platform coverage priorities
   - Keyword variations
   - Hashtag monitoring
   - @mention tracking
   - Related brand terms
   - Executive names
   - Product identifiers
   - Crisis-specific terms

3. Alert Escalation Framework
   Response levels:
   - Level 1: Monitor (low risk)
   - Level 2: Alert team (medium)
   - Level 3: Activate response (high)
   - Level 4: Executive escalation
   - Level 5: Full crisis mode
```

### Phase 2: Real-Time Platform Monitoring

```
4. Reddit Crisis Tracking
   Use `reddit_search_exa`:
   - Hot posts about brand
   - Rising negative threads
   - Subreddit brigading
   - Mod actions/statements
   - Cross-posting patterns
   - Comment velocity
   - Award accumulation
   - Media bot pickups

5. YouTube Response Videos
   Use `youtube_search_exa`:
   - "brand + controversy"
   - "brand + exposed"
   - "brand + truth"
   - "brand + boycott"
   - News channel coverage
   - Influencer responses
   - Parody/criticism videos

6. TikTok Viral Monitoring
   Use `tiktok_search_exa`:
   - Complaint videos
   - Viral callouts
   - Hashtag campaigns
   - Duet responses
   - Trend hijacking
   - Meme creation
   - Creator pile-ons
```

### Phase 3: Sentiment Velocity Analysis

```
7. Sentiment Tracking
   Measure in real-time:
   - Overall sentiment ratio
   - Sentiment change velocity
   - Platform-specific sentiment
   - Geographic sentiment
   - Demographic sentiment
   - Topic-specific sentiment

8. Volume & Reach Metrics
   Track escalation:
   - Mention frequency/hour
   - Unique authors
   - Potential reach
   - Engagement rates
   - Share velocity
   - Cross-platform spread

9. Narrative Evolution
   Monitor story development:
   - Original complaint
   - Story mutations
   - New allegations
   - Fact vs. fiction
   - Conspiracy theories
   - Solution discussions
```

### Phase 4: Influencer & Media Tracking

```
10. Key Voice Identification
    Track influential accounts:
    - First movers
    - Amplifiers
    - Media personalities
    - Industry experts
    - Customer advocates
    - Brand critics
    - Neutral observers

11. Media Coverage Monitoring
    Use `web_search_exa`:
    - News article pickup
    - Blog coverage
    - Trade publication
    - International media
    - Broadcast mentions
    - Podcast discussions

12. Stakeholder Reactions
    Monitor key groups:
    - Customer responses
    - Employee sentiment
    - Investor concerns
    - Partner statements
    - Competitor actions
    - Regulator interest
```

### Phase 5: Crisis Intelligence Analysis

```
13. Root Cause Assessment
    Understand crisis origin:
    - Initial trigger event
    - Underlying issues
    - Amplification factors
    - Stakeholder concerns
    - Historical context
    - Preventable factors

14. Crisis Typology
    Categorize for response:
    - Product/service failure
    - Executive misconduct
    - Employee incident
    - Data/privacy breach
    - Social/political issue
    - Environmental concern
    - Financial irregularity

15. Impact Projection
    Assess potential damage:
    - Reputation impact
    - Financial exposure
    - Customer churn risk
    - Legal implications
    - Regulatory scrutiny
    - Long-term effects
```

### Phase 6: Response Strategy Support

```
16. Response Effectiveness Tracking
    Monitor interventions:
    - Official statement impact
    - CEO response reception
    - Corrective action feedback
    - Media interview results
    - Social media responses
    - Customer communications

17. Recovery Indicators
    Track improvement:
    - Sentiment recovery rate
    - Volume decline
    - Positive story emergence
    - Advocate activation
    - Media tone shift
    - Crisis fatigue onset

18. Lessons Learned Capture
    Document for future:
    - Effective responses
    - Failed tactics
    - Platform differences
    - Timing insights
    - Message effectiveness
    - Stakeholder priorities
```

## Output Format

```markdown
# Crisis Monitoring Report: [Crisis Name]
## Report Time: [Timestamp]
## Crisis Level: [1-5]
## Status: [Emerging/Escalating/Peak/Declining/Resolved]

### CRISIS DASHBOARD

#### Current Threat Level: 🔴 CRITICAL
- **Sentiment**: 72% negative (↓ 45% in 6 hours)
- **Volume**: 45K mentions/hour (↑ 2,400%)
- **Reach**: 12.5M potential impressions
- **Media**: 8 major outlets covering
- **Trending**: #3 on Twitter, Reddit front page

### Crisis Timeline

#### Hour 0: Initial Trigger
- **Time**: [Timestamp]
- **Platform**: Reddit r/[subreddit]
- **Event**: [Description of triggering post/event]
- **Initial Reach**: 5K views

#### Hour 2: Viral Acceleration
- **Platforms**: Reddit → Twitter → TikTok
- **Key Amplifier**: @[influencer] (2.5M followers)
- **Sentiment Shift**: 45% → 68% negative
- **Volume**: 2K → 15K mentions/hour

#### Hour 4: Media Pickup
- **First Article**: [Publication] at [time]
- **Headline**: "[Article title]"
- **Additional Coverage**: 5 outlets following

#### Hour 6: Current State
- **Status**: Continuing escalation
- **New Developments**: [List any new angles]

### Platform-Specific Analysis

#### Reddit Crisis Center
**Active Threads**: 12 (5 on r/all)
**Combined Upvotes**: 125K
**Key Thread**: "[Post title]" - 45K upvotes, 5.2K comments

**Sentiment Breakdown**:
- Angry: 45%
- Disappointed: 28%
- Supportive: 12%
- Neutral/Questioning: 15%

**Main Complaints**:
1. [Issue 1] - 38% of comments
2. [Issue 2] - 27% of comments
3. [Issue 3] - 21% of comments

**Notable Comments**:
> "Most upvoted comment expressing main concern"
> - u/[user] (8.5K upvotes)

> "Comment showing support or balance"
> - u/[user] (2.1K upvotes)

#### YouTube Response Videos
**Crisis Videos**: 28 in last 6 hours
**Combined Views**: 2.8M
**Growing Fastest**: "[Video title]" - 450K views in 2 hours

| Video Title | Creator | Views | Sentiment | Threat |
|-------------|---------|-------|-----------|---------|
| "[Title]" | [Channel] (2.5M) | 850K | Negative | High |
| "[Title]" | [Channel] (890K) | 425K | Critical | High |
| "[Title]" | [Channel] (450K) | 275K | Balanced | Medium |

**Key Narratives**:
- "Company greed" narrative: 45% of videos
- "Pattern of behavior" angle: 32%
- "Calls for boycott": 23%

#### TikTok Viral Spread
**Hashtag**: #[CompanyCrisis] - 5.2M views
**Videos**: 1,250 and growing
**Top Video**: 1.8M views, 245K likes

**Content Types**:
- Complaint stories: 40%
- Meme/humor: 35%
- Calls to action: 15%
- Support/balance: 10%

**Demographic Skew**: 
- 68% age 16-24
- High emotional intensity
- Boycott momentum building

### Influencer & Media Tracking

#### Crisis Influencers
| Influencer | Platform | Followers | Stance | Impact |
|------------|----------|-----------|---------|---------|
| [Name] | Twitter | 2.5M | Critical | Started trend |
| [Name] | YouTube | 1.8M | Negative | Video viral |
| [Name] | TikTok | 950K | Neutral | Fact-checking |
| [Name] | LinkedIn | 125K | Supportive | Industry context |

#### Media Coverage Analysis
**Total Articles**: 23
**Headline Sentiment**: 78% negative
**Key Publications**:
- [Major Outlet]: "Scathing critique" angle
- [Trade Pub]: "Industry implications" focus
- [Tech Blog]: "Technical analysis" approach

**International Spread**:
- US Media: 12 outlets
- UK Media: 5 outlets
- Other: 6 outlets

### Sentiment Evolution

#### Hourly Sentiment Trend
```
Hour 0:  ████████████░░░░ 70% neutral
Hour 2:  ████████░░░░░░░░ 45% negative
Hour 4:  ██████░░░░░░░░░░ 65% negative
Hour 6:  ████░░░░░░░░░░░░ 72% negative
```

#### Platform Sentiment Comparison
| Platform | Negative | Neutral | Positive |
|----------|----------|---------|----------|
| Reddit | 75% | 18% | 7% |
| YouTube | 68% | 22% | 10% |
| TikTok | 82% | 13% | 5% |
| Twitter | 71% | 20% | 9% |
| LinkedIn | 45% | 35% | 20% |

### Key Themes & Narratives

#### Primary Narratives (by volume)
1. **"Betrayal of Trust"** - 35% of discussions
   - Long-time customers feeling deceived
   - Promises broken repeatedly
   - Pattern of similar incidents

2. **"Corporate Greed"** - 28% of discussions
   - Profit over people messaging
   - Executive compensation mentioned
   - Comparison to competitors

3. **"Poor Response"** - 22% of discussions
   - Initial statement criticized
   - Lack of empathy noted
   - Demands for CEO response

#### Emerging Sub-Narratives
- Class action discussion: Growing
- Employee whistleblowers: 2 claimed
- Environmental angle: Starting
- Political polarization: Minimal so far

### Stakeholder Impact Assessment

#### Customer Sentiment
- Current customers: 65% considering leaving
- Prospects: 78% negative impression
- Advocates: 45% gone silent
- Detractors: Highly activated

#### Employee Morale
- LinkedIn posts: 12 employees distancing
- Glassdoor: 15 new negative reviews
- Internal leaks: 2 suspected
- Recruitment impact: Immediate

#### Business Impact Indicators
- App uninstalls: +340% (if applicable)
- Website traffic: -25%
- Support tickets: +450%
- Sales inquiries: -60%

### Crisis Response Effectiveness

#### Official Responses So Far
1. **Initial Statement** (Hour 3)
   - Platform: Twitter
   - Reception: 78% negative
   - Main criticism: "Tone deaf"

2. **CEO Video** (Hour 5)
   - Platform: YouTube/LinkedIn
   - Views: 125K
   - Reception: Mixed (55% negative)
   - Improvement from initial

#### What's Working
- Factual corrections gaining traction
- Employee advocates helping
- Some media providing balance

#### What's Not Working
- Generic corporate speak
- Delayed response time
- No concrete actions yet

### Predictive Analysis

#### Next 6 Hours (High Confidence)
- Media coverage will double
- TikTok activism will intensify
- Calls for executive action
- Competitor exploitation likely

#### Next 24 Hours (Medium Confidence)
- Regulatory interest possible
- Organized boycott campaigns
- Counter-narrative emergence
- Crisis fatigue beginning

#### Next 72 Hours (Lower Confidence)
- Settlement demands
- Executive changes possible
- Market impact stabilizing
- Recovery phase potential

### Recommended Actions

#### IMMEDIATE (Next Hour)
1. **CEO Personal Response**
   - Authentic, empathetic tone
   - Acknowledge specific concerns
   - Announce concrete actions
   - Go live if possible

2. **Customer Outreach**
   - Direct email to customers
   - Clear action plan
   - Compensation/remedies
   - Personal touch

3. **Employee Communications**
   - All-hands meeting
   - Clear talking points
   - Empower advocates
   - Address concerns

#### SHORT-TERM (Next 6 Hours)
1. **Media Strategy**
   - Exclusive with sympathetic outlet
   - Expert third-party support
   - Customer testimonials
   - Data-driven response

2. **Platform-Specific Responses**
   - Reddit: Direct engagement
   - YouTube: Response video
   - TikTok: Authentic content
   - LinkedIn: Industry context

#### MEDIUM-TERM (Next 24-72 Hours)
1. **Systemic Changes**
   - Policy modifications
   - Process improvements
   - Oversight additions
   - Transparency increases

2. **Stakeholder Engagement**
   - Investor communications
   - Partner reassurance
   - Regulatory proactive
   - Community investment

### Monitoring Priorities

#### Watch Closely
- [Influencer] next video
- Reddit mod decisions
- Hashtag evolution
- Media narrative shifts
- Employee leaks

#### Early Warning Signals
- Regulatory mentions
- Boycott organization
- Competitor statements
- Legal action threats
- Platform policy violations

---

**Report Generated**: [Timestamp]
**Next Update**: In 2 hours (or sooner if escalation)
**Crisis Team Contacts**: [Listed separately]
**Escalation Triggers**: Defined separately
```

## Best Practices

1. **Speed Matters**: Every hour counts in crisis response
2. **Authenticity Crucial**: Corporate speak worsens crises
3. **Platform Priorities**: Focus where your audience is
4. **Fact-Based**: Counter misinformation quickly
5. **Human Touch**: Show genuine concern and action

## Advanced Techniques

### Sentiment Velocity Modeling
- Calculate sentiment change rates
- Predict trajectory inflection points
- Model intervention impacts
- Optimize response timing
- Track recovery patterns

### Influencer Impact Weighting
- Weight voices by reach and credibility
- Track influence cascade effects
- Identify potential advocates
- Model narrative spread
- Prioritize engagement targets

### Crisis Typology Matching
- Compare to historical crisis patterns
- Predict likely evolution path
- Identify effective response templates
- Avoid previous mistakes
- Accelerate resolution

### Multi-Platform Correlation
- Track cross-platform narrative flow
- Identify amplification nodes
- Predict platform migration
- Optimize platform-specific responses
- Coordinate unified strategy

## Common Pitfalls to Avoid

1. **Slow Response**: Silence implies guilt online
2. **Over-Corporate**: Humanity beats legal language
3. **Deflection**: Address issues directly
4. **Partial Truth**: Full transparency or silence
5. **Platform Ignorance**: Each platform has different norms

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Crisis-Monitoring-Specialist
motivation: Provide real-time crisis intelligence to guide rapid, effective response strategies
constraints: Monitor continuously, report accurately, focus on actionable intelligence, maintain objectivity
output_format: Real-time crisis dashboard with sentiment tracking, narrative analysis, and response recommendations
-->

When deploying task agents for crisis monitoring:
1. Set up continuous monitoring with minute-level updates
2. Track sentiment velocity not just absolute sentiment
3. Identify key influencers and narrative drivers
4. Provide specific response recommendations
5. Include predictive analysis for planning

## Customization Options

### Monitoring Intensity
- **Standard**: Hourly updates
- **Elevated**: 30-minute updates
- **Critical**: 15-minute updates
- **Emergency**: Real-time stream
- **Recovery**: 2-hour updates

### Crisis Types
- **Product Crisis**: Quality/safety focus
- **Executive Crisis**: Leadership issues
- **Data Crisis**: Privacy/security breach
- **Social Crisis**: Cultural/political issues
- **Financial Crisis**: Market/investor focus

### Output Formats
- **Executive Dashboard**: Visual crisis status
- **Detailed Report**: Full analysis
- **Action Brief**: Just recommendations
- **Media Kit**: PR-ready materials
- **Internal Comms**: Employee updates