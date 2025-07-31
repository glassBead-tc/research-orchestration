# Product Launch Analysis Orchestration

This workflow gathers press releases, news coverage, and initial customer reactions to evaluate the impact and public reception of new product launches.

## Overview

Product launches are critical moments that can define a company's trajectory. This orchestration provides real-time intelligence on launch effectiveness by analyzing media coverage, customer sentiment, competitive responses, and market indicators. It helps stakeholders understand launch success factors and make rapid adjustments.

## Required Tools

- `web_search_exa` - Press releases, news coverage, reviews
- `reddit_search_exa` - User discussions and first impressions
- `youtube_search_exa` - Review videos, unboxings, demos
- `tiktok_search_exa` - Viral moments and user-generated content
- `crawling_exa` - Official product pages and specifications
- `competitor_finder_exa` - Competitive response monitoring

## Workflow Steps

### Phase 1: Launch Event Documentation

```
1. Official Launch Information
   - Use `web_search_exa` for "[Product Name] launch announcement"
   - Use `crawling_exa` on official product page
   - Extract:
     - Launch date and markets
     - Key features and positioning
     - Pricing and availability
     - Target audience
     - Marketing messages

2. Press Release Analysis
   - Search for official press releases
   - Extract:
     - Key claims and differentiators
     - Executive quotes
     - Performance metrics cited
     - Partnership announcements
     - Future roadmap hints
```

### Phase 2: Media Coverage Assessment (Parallel)

```
3. News Coverage Volume & Sentiment
   - Use `web_search_exa` with date filters from launch date
   - Queries:
     - "[Product Name] launch"
     - "[Product Name] review"
     - "[Company] announces [Product]"
   - Metrics:
     - Number of articles per day
     - Tier of publications covering
     - Headline sentiment analysis
     - Geographic coverage spread

4. Tech Media Deep Dive
   - Target specific sites:
     - "site:techcrunch.com [Product]"
     - "site:theverge.com [Product]"
     - "site:arstechnica.com [Product]"
   - Extract:
     - Reviewer opinions
     - Pros/cons mentioned
     - Comparisons made
     - Verdict/recommendations

5. Industry Analyst Commentary
   - Search for analyst quotes and reports
   - Look for Gartner, Forrester, IDC mentions
   - Extract:
     - Market impact assessments
     - Competitive positioning
     - Innovation ratings
     - Adoption predictions
```

### Phase 3: Customer Reaction Mining

```
6. Reddit Community Response
   - Use `reddit_search_exa` for product name
   - Target relevant subreddits:
     - Product category subs
     - Company-specific subs
     - General tech subs
   - Analyze:
     - Excitement vs. skepticism ratio
     - Common questions/concerns
     - Feature requests
     - Bug reports
     - Comparison discussions

7. Early Adopter Reviews
   - Use `web_search_exa` for "[Product] user review"
   - Check review platforms:
     - Amazon reviews (if applicable)
     - App store reviews (if applicable)
     - Specialized review sites
   - Track:
     - Rating distributions
     - Most praised features
     - Most common complaints
     - User demographics

8. Social Media Buzz Analysis
   - Use `youtube_search_exa` for:
     - Unboxing videos
     - First impression videos
     - Review videos
   - Use `tiktok_search_exa` for:
     - Product-related content
     - Viral moments
     - User demonstrations
   - Metrics:
     - View counts
     - Engagement rates
     - Sentiment in comments
     - Influencer participation
```

### Phase 4: Competitive Response Tracking

```
9. Competitor Monitoring
   - Use `competitor_finder_exa` to identify key competitors
   - Use `web_search_exa` for competitor responses:
     - Price changes
     - Feature announcements
     - Marketing campaigns
     - Executive comments
   - Timeline competitor actions

10. Market Positioning Shifts
    - Search for market share predictions
    - Look for switching intent surveys
    - Find early sales indicators
    - Track stock price movements (if public)
```

### Phase 5: Performance Indicators

```
11. Sales and Adoption Signals
    - Search for:
      - "Sold out" mentions
      - Waitlist announcements  
      - Retail availability
      - Shipping delays
      - Production increases
    - Third-party data:
      - App download ranks
      - Website traffic estimates
      - Search trend data

12. Technical Performance
    - Aggregate bug reports
    - Track firmware/software updates
    - Monitor support forums
    - Identify common issues
    - Assess response speed
```

### Phase 6: Synthesis and Insights

```
13. Launch Success Scoring
    - Media coverage reach
    - Sentiment positivity
    - Customer satisfaction
    - Competitive differentiation
    - Market momentum indicators

14. Key Learning Extraction
    - What resonated most?
    - What fell flat?
    - Unexpected reactions?
    - Competitive vulnerabilities?
    - Follow-up opportunities?
```

## Output Format

```markdown
# [Product Name] Launch Analysis Report

## Executive Summary
- **Launch Date**: [Date]
- **Overall Reception**: [Positive/Mixed/Negative]
- **Launch Success Score**: [X/10]
- **Key Takeaway**: [One-line summary]

## Launch Overview
### Product Positioning
- **Target Market**: [Description]
- **Key Features**: [Top 3-5 features]
- **Pricing**: [Price points and models]
- **Availability**: [Markets and channels]

### Marketing Strategy
- **Core Message**: [Main value proposition]
- **Campaign Themes**: [List]
- **Launch Channels**: [Events, digital, retail, etc.]

## Media Coverage Analysis

### Coverage Metrics
- **Total Articles**: [Count] in first [X] days
- **Reach Estimate**: [Millions] potential readers
- **Geographic Spread**: [Countries/regions]
- **Publication Tiers**:
  - Tier 1 (Major): [Count]
  - Tier 2 (Specialist): [Count]  
  - Tier 3 (Other): [Count]

### Sentiment Analysis
- **Positive**: [%] - Key themes: [List]
- **Neutral**: [%] - Key themes: [List]
- **Negative**: [%] - Key themes: [List]

### Notable Coverage
1. **[Publication]**: "[Headline]"
   - Verdict: [Summary]
   - Key Points: [List]

2. **[Publication]**: "[Headline]"
   - Verdict: [Summary]
   - Key Points: [List]

## Customer Reception

### Early Adopter Feedback
**Overall Satisfaction**: [X.X/5.0] based on [N] reviews

**Most Praised Aspects**:
1. [Feature/aspect] - [% mentioning]
2. [Feature/aspect] - [% mentioning]
3. [Feature/aspect] - [% mentioning]

**Common Criticisms**:
1. [Issue] - [% mentioning] - [Company response if any]
2. [Issue] - [% mentioning] - [Company response if any]
3. [Issue] - [% mentioning] - [Company response if any]

### Community Discussions

**Reddit Sentiment** ([N] posts analyzed)
- Excitement Level: [High/Medium/Low]
- Key Topics:
  - [Topic 1]: [Summary of discussion]
  - [Topic 2]: [Summary of discussion]
- Notable Concerns: [List]

**Social Media Engagement**
- YouTube Videos: [Count] with [Total] views
- Average Sentiment: [Positive/Mixed/Negative]
- Viral Moments: [Description if any]
- Influencer Coverage: [Notable names and reach]

## Competitive Impact

### Immediate Competitor Responses
| Competitor | Response Type | Details | Timing |
|------------|--------------|---------|---------|
| [Company A] | Price cut | [Details] | [Days after] |
| [Company B] | Feature announcement | [Details] | [Days after] |

### Market Positioning Changes
- **Before Launch**: [Product's position]
- **After Launch**: [New position]
- **Key Differentiators**: [What's working]
- **Vulnerabilities**: [Where competitors attack]

## Performance Indicators

### Commercial Signals
- **Availability Status**: [In stock/Sold out/Limited]
- **Production Adjustments**: [Increased/Stable/Issues]
- **Channel Feedback**: [Retailer reception]
- **Early Sales Indicators**: [If available]

### Technical Performance
- **Major Issues Identified**: [List with frequency]
- **Update Frequency**: [How quickly addressing issues]
- **Support Volume**: [High/Normal/Low]
- **Resolution Speed**: [Fast/Normal/Slow]

## Launch Effectiveness Assessment

### Strengths
1. **[Strength 1]**: [Evidence and impact]
2. **[Strength 2]**: [Evidence and impact]
3. **[Strength 3]**: [Evidence and impact]

### Weaknesses
1. **[Weakness 1]**: [Evidence and recommendation]
2. **[Weakness 2]**: [Evidence and recommendation]
3. **[Weakness 3]**: [Evidence and recommendation]

### Opportunities
1. **[Opportunity 1]**: [How to capitalize]
2. **[Opportunity 2]**: [How to capitalize]

### Threats
1. **[Threat 1]**: [Mitigation strategy]
2. **[Threat 2]**: [Mitigation strategy]

## Recommendations

### Immediate Actions (Week 1-2)
1. [Specific action based on findings]
2. [Specific action based on findings]
3. [Specific action based on findings]

### Short-term Adjustments (Month 1)
1. [Strategic adjustment]
2. [Strategic adjustment]

### Long-term Considerations
1. [Strategic implication]
2. [Strategic implication]

## Appendix

### Data Sources
- News Articles Analyzed: [Count]
- Social Posts Reviewed: [Count]
- Videos Assessed: [Count]
- Time Period: [Date range]

### Methodology Notes
[Any limitations or caveats about the analysis]

Generated: [Date]
Next Update Recommended: [Timeframe]
```

## Best Practices

1. **Real-time Monitoring**: Begin tracking 24 hours before launch
2. **Sentiment Calibration**: Establish baseline sentiment for comparison
3. **Source Diversity**: Balance professional reviews with user feedback
4. **Temporal Analysis**: Track how reception evolves over time
5. **Competitive Context**: Always assess relative to competitor launches

## Advanced Techniques

### Pre-Launch Baseline
- Track buzz and expectations before launch
- Monitor leaked information and rumors
- Assess pre-order numbers if available
- Gauge anticipation levels
- Identify potential concerns early

### Influencer Impact Tracking
- Identify key influencers in the space
- Track their pre and post-launch coverage
- Measure follower engagement
- Assess authenticity of endorsements
- Calculate influence-adjusted reach

### Geographic Reception Variations
- Compare reception across different markets
- Identify cultural factors affecting reception
- Track localization effectiveness
- Spot regional competitive differences
- Find expansion opportunities

### Feature-Specific Analysis
- Break down reception by individual features
- Identify "killer features" vs. "nice to haves"
- Track feature-specific complaints
- Compare feature importance across segments
- Guide product roadmap priorities

## Common Pitfalls to Avoid

1. **Echo Chamber Effects**: Don't over-weight tech enthusiast opinions
2. **Early Adopter Bias**: Remember early users aren't representative
3. **Astroturfing Detection**: Watch for fake reviews and comments
4. **Competitor FUD**: Filter out competitor-driven negativity
5. **Launch Day Anomalies**: Don't overreact to day-one issues

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Product-Launch-Intelligence-Analyst
motivation: Provide rapid, actionable intelligence on product launch effectiveness and market reception
constraints: Balance speed with accuracy, separate signal from noise, focus on actionable insights
output_format: Time-sensitive analysis with clear success metrics and recommendations
-->

When deploying task agents for launch analysis:
1. Emphasize time sensitivity - launches have momentum windows
2. Require source links for all claims about reception
3. Separate anecdotal from statistical evidence
4. Focus on actionable insights over mere observation
5. Track both immediate and evolving reactions

## Customization Options

### Launch Types
- **Consumer Product**: Heavy social media and review focus
- **B2B Software**: Analyst and industry media emphasis
- **Hardware Launch**: Technical performance and availability tracking
- **Service Launch**: User experience and onboarding focus
- **Platform Launch**: Developer and partner ecosystem reception

### Analysis Depth
- **Flash Report** (Day 1): Immediate reception snapshot
- **Week 1 Analysis**: Initial momentum assessment
- **Month 1 Report**: Comprehensive impact analysis
- **Quarterly Review**: Long-term success evaluation

### Stakeholder Versions
- **Executive Summary**: High-level success metrics
- **Marketing Team**: Detailed message effectiveness
- **Product Team**: Feature-specific feedback
- **Sales Team**: Competitive positioning insights
- **PR Team**: Media coverage analysis