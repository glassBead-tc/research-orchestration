# Consumer Feedback Analysis Orchestration

This workflow aggregates customer opinions from forums and reviews to identify common praises and pain points for products or services.

## Overview

Understanding authentic consumer feedback is crucial for product improvement, marketing strategy, and competitive positioning. This orchestration systematically collects and analyzes customer opinions across multiple platforms, identifying patterns in satisfaction, frustration, and unmet needs that can drive business decisions.

## Required Tools

- `reddit_search_exa` - Forum discussions and user communities
- `web_search_exa` - Review sites and consumer feedback
- `youtube_search_exa` - Video reviews and user experiences
- `youtube_video_details_exa` - Detailed engagement metrics
- `tiktok_search_exa` - Short-form user-generated content
- `company_research_exa` - Company context for feedback interpretation

## Workflow Steps

### Phase 1: Feedback Source Mapping

```
1. Product/Service Identification
   - Use `company_research_exa` to understand product portfolio
   - Clarify specific products/services to analyze
   - Identify product variations/versions
   - Note launch dates for temporal context

2. Community Discovery
   - Use `reddit_search_exa` to find relevant subreddits
   - Search patterns:
     - r/[ProductName]
     - r/[CompanyName]
     - r/[ProductCategory]
   - Identify:
     - Official company subreddits
     - Independent user communities
     - General discussion forums
     - Support communities
```

### Phase 2: Review Platform Mining

```
3. Structured Review Collection
   - Use `web_search_exa` for review platforms:
     - "[Product] site:amazon.com reviews"
     - "[Product] site:bestbuy.com reviews"
     - "[Product] site:trustpilot.com"
     - "[Product] site:g2.com" (for B2B)
     - "[Product] site:capterra.com" (for software)
   
4. Review Metrics Extraction
   - Aggregate from each platform:
     - Overall rating distribution
     - Total review count
     - Verified purchase percentage
     - Review velocity (reviews/month)
     - Temporal rating trends

5. Review Content Analysis
   - Extract common themes:
     - Most mentioned features
     - Frequently praised aspects
     - Recurring complaints
     - Feature requests
     - Comparison mentions
```

### Phase 3: Social Forum Deep Dive

```
6. Reddit Discussion Mining
   - Use `reddit_search_exa` with queries:
     - "[Product] review"
     - "[Product] worth it"
     - "[Product] vs [Competitor]"
     - "[Product] problems"
     - "[Product] tips"
   
7. Discussion Pattern Analysis
   - Categorize post types:
     - Purchase decision questions
     - Troubleshooting requests
     - Feature discoveries
     - Complaint threads
     - Praise/recommendation posts
   - Extract:
     - Sentiment by topic
     - Solution effectiveness
     - Community helpfulness
     - Moderator responsiveness

8. Long-form Experience Posts
   - Search for detailed reviews:
     - "[Product] after 6 months"
     - "[Product] long term review"
     - "Switching from [Competitor] to [Product]"
   - Capture:
     - Durability insights
     - Evolving opinions
     - Hidden issues
     - Lifestyle integration
```

### Phase 4: Video Content Analysis

```
9. YouTube Review Mining
   - Use `youtube_search_exa` for:
     - "[Product] review"
     - "[Product] unboxing"
     - "[Product] problems"
     - "[Product] vs [Competitor]"
   
10. Video Engagement Analysis
    - For top videos, use `youtube_video_details_exa`
    - Extract:
      - View counts
      - Like/dislike ratios
      - Comment themes
      - Creator credibility
    - Identify:
      - Most influential reviews
      - Viral complaint videos
      - Tutorial popularity

11. TikTok Sentiment Pulse
    - Use `tiktok_search_exa` for product content
    - Analyze:
      - User-generated demonstrations
      - Comedy/complaint videos
      - Hack/tip videos
      - Trend participation
    - Gauge:
      - Youth market reception
      - Viral potential
      - Cultural integration
```

### Phase 5: Sentiment Quantification

```
12. Sentiment Scoring Framework
    - Positive indicators:
      - "Love", "Perfect", "Amazing"
      - "Recommend", "Worth it"
      - "Better than expected"
      - High ratings (4-5 stars)
    
    - Negative indicators:
      - "Disappointed", "Regret"
      - "Waste", "Broken"
      - "Return", "Refund"
      - Low ratings (1-2 stars)
    
    - Calculate sentiment ratios by source

13. Issue Severity Classification
    - Critical issues:
      - Safety concerns
      - Complete failures
      - False advertising
    - Major issues:
      - Quality problems
      - Missing features
      - Poor support
    - Minor issues:
      - Cosmetic flaws
      - Preference mismatches
      - Learning curve
```

### Phase 6: Competitive Benchmarking

```
14. Competitor Comparison Mining
    - Search for direct comparisons
    - Extract:
      - Win/loss reasons
      - Switching drivers
      - Feature gaps
      - Price/value perceptions
    
15. Net Promoter Indicators
    - Count recommendations vs warnings
    - Track referral language
    - Identify brand advocates
    - Spot detractors and their reasons
```

### Phase 7: Insight Synthesis

```
16. Pattern Recognition
    - Group feedback by:
      - Customer segment
      - Use case
      - Geography
      - Purchase timeframe
    - Identify correlations

17. Actionable Intelligence
    - Product improvements
    - Marketing message adjustments
    - Support documentation needs
    - Competitive positioning
    - Customer segment opportunities
```

## Output Format

```markdown
# Consumer Feedback Analysis: [Product/Service Name]

## Executive Summary
- **Overall Sentiment**: [Positive/Mixed/Negative] ([X]% positive)
- **Total Feedback Analyzed**: [N] reviews, [N] discussions, [N] videos
- **Key Strength**: [Most praised aspect]
- **Primary Concern**: [Most common complaint]
- **Recommendation Rate**: [X]% would recommend

## Feedback Overview

### Volume & Distribution
| Platform | Volume | Avg Rating | Sentiment |
|----------|--------|------------|-----------|
| Amazon | [N] reviews | [X.X]/5 | [Pos/Mix/Neg] |
| Reddit | [N] posts | N/A | [Pos/Mix/Neg] |
| YouTube | [N] videos | [X]% positive | [Pos/Mix/Neg] |
| TikTok | [N] videos | N/A | [Pos/Mix/Neg] |

### Temporal Trends
- **Launch Period**: [Initial reception]
- **3-Month Mark**: [Evolving opinions]
- **Current State**: [Latest sentiment]
- **Trajectory**: [Improving/Stable/Declining]

## What Customers Love

### Top Praised Features/Aspects
1. **[Feature/Aspect]** - [X]% mention rate
   - *"[Representative quote]"*
   - Why it matters: [Business implication]

2. **[Feature/Aspect]** - [X]% mention rate
   - *"[Representative quote]"*
   - Why it matters: [Business implication]

3. **[Feature/Aspect]** - [X]% mention rate
   - *"[Representative quote]"*
   - Why it matters: [Business implication]

### Delighter Discoveries
- [Unexpected positive finding]
- [Feature users love more than expected]
- [Use case company didn't anticipate]

## Pain Points & Frustrations

### Critical Issues ([X]% of negative feedback)
1. **[Issue]** - Frequency: [N] mentions
   - Severity: [High/Medium/Low]
   - Customer Impact: [Description]
   - Typical Journey: [When/how encountered]
   - **Recommended Action**: [Specific fix]

### Major Issues ([X]% of negative feedback)
1. **[Issue]** - Frequency: [N] mentions
   - Examples: *"[Quote]"*
   - Workarounds: [What users do]
   - **Recommended Action**: [Improvement]

### Minor Annoyances ([X]% of negative feedback)
- [List of smaller issues]
- [Aggregate impact assessment]

## Customer Segments Analysis

### Enthusiasts ([X]% of base)
- Profile: [Who they are]
- What they value: [Key drivers]
- Use cases: [How they use product]
- Loyalty indicators: [Behaviors]

### Satisfied Users ([X]% of base)
- Profile: [Who they are]
- Satisfaction drivers: [What works]
- Improvement wishes: [What they want]

### Detractors ([X]% of base)
- Profile: [Who they are]
- Frustration sources: [Main issues]
- Switching risks: [Likelihood to leave]
- Win-back opportunities: [What would help]

## Competitive Positioning

### Versus [Main Competitor]
| Aspect | [Product] | [Competitor] | Winner |
|--------|-----------|--------------|---------|
| [Feature 1] | [Rating] | [Rating] | [Product] |
| [Feature 2] | [Rating] | [Rating] | [Competitor] |
| Price/Value | [Rating] | [Rating] | [Winner] |
| Support | [Rating] | [Rating] | [Winner] |

### Switching Analysis
- **To [Product]**: [X]% - Main reasons: [List]
- **From [Product]**: [X]% - Main reasons: [List]
- **Net Switching**: [Positive/Negative]

## User-Generated Content Insights

### YouTube Review Themes
- Most viewed positive: [Video title] ([X]M views)
- Most viewed negative: [Video title] ([X]K views)
- Tutorial demand: [Topics users want help with]

### Reddit Community Insights
- Most upvoted praise: [Topic/post]
- Most discussed issue: [Topic/post]
- Community solutions: [User innovations]
- Mod team effectiveness: [Assessment]

### TikTok Virality
- Trending content type: [Description]
- Brand perception: [How portrayed]
- Youth market signal: [Positive/Negative]

## Feature Request Analysis

### Most Requested Additions
1. **[Feature]** - [N] requests
   - Use case: [Why users want it]
   - Competitive gap: [Who has it]
   
2. **[Feature]** - [N] requests
   - Feasibility: [Assessment]
   - Impact potential: [If delivered]

### Integration Wishes
- [Platform/service] integration
- [Ecosystem] compatibility
- [Standard/protocol] support

## Support & Documentation Gaps

### Common Confusion Points
1. [Topic] - [How often arises]
2. [Topic] - [User workarounds]

### Documentation Needs
- Missing guides: [Topics]
- Video tutorial requests: [Topics]
- FAQ additions: [Questions]

## Recommendations

### Immediate Actions
1. **Fix [Critical Issue]** - Impact: [N] customers
2. **Clarify [Confusion Point]** - Via: [Method]
3. **Acknowledge [Common Request]** - Message: [Approach]

### Product Roadmap Input
1. **High Priority**: [Feature] - addresses [X]% of complaints
2. **Medium Priority**: [Feature] - delights [segment]
3. **Low Priority**: [Feature] - nice to have

### Marketing Adjustments
1. **Emphasize**: [Loved feature] in messaging
2. **Address**: [Common concern] in FAQs
3. **Target**: [Enthusiast segment] for advocacy

### Support Improvements
1. **Create**: [Resource type] for [issue]
2. **Train**: Support team on [topic]
3. **Monitor**: [Platform] more actively

## Methodology & Confidence

### Data Sources
- Reviews analyzed: [N] across [N] platforms
- Date range: [Start] to [End]
- Geographic coverage: [Markets included]

### Confidence Levels
- **High confidence**: Patterns seen across multiple sources
- **Medium confidence**: Strong signal from single source
- **Low confidence**: Anecdotal or limited data

### Limitations
- [Any biases in data]
- [Gaps in coverage]
- [Caveats about findings]

Generated: [Date]
Next Review Recommended: [Timeframe]
```

## Best Practices

1. **Temporal Context**: Always note when feedback was given relative to product updates
2. **Segmentation**: Don't average all feedback - segment by user type
3. **Verification**: Cross-reference extreme opinions with broader patterns
4. **Competitive Context**: Compare feedback quality to competitor products
5. **Action Orientation**: Every insight should lead to a recommendation

## Advanced Techniques

### Sentiment Evolution Tracking
- Map how opinions change over ownership duration
- Identify honeymoon period vs. long-term satisfaction
- Track impact of updates on sentiment
- Predict future satisfaction trajectories

### Influencer Impact Assessment
- Identify reviews that drive purchase decisions
- Weight feedback by reviewer influence
- Track sentiment cascade effects
- Measure review authenticity

### Cultural and Regional Analysis
- Compare feedback across different markets
- Identify cultural preference patterns
- Spot localization opportunities
- Understand regional competitive dynamics

### Lifecycle Stage Analysis
- Separate new buyer from repeat customer feedback
- Track satisfaction through customer lifecycle
- Identify retention risk points
- Find upsell opportunities in feedback

## Common Pitfalls to Avoid

1. **Review Bombing**: Detect and filter coordinated negative campaigns
2. **Selection Bias**: Account for who writes reviews vs. silent majority
3. **Recency Bias**: Don't overweight latest feedback
4. **Platform Bias**: Different platforms attract different user types
5. **Incentivized Reviews**: Identify and discount non-authentic feedback

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Consumer-Insight-Analyst
motivation: Extract actionable intelligence from authentic consumer feedback to drive product and business improvements
constraints: Balance statistical significance with anecdotal insights, maintain objectivity while capturing emotion
output_format: Structured analysis with clear segments, quantified findings, and specific recommendations
-->

When deploying task agents for feedback analysis:
1. Emphasize pattern recognition over individual complaints
2. Require quantification of frequency and severity
3. Demand specific quotes to illustrate findings
4. Focus on actionable insights not just observations
5. Ensure temporal context for all feedback

## Customization Options

### Industry Adaptations
- **B2C Products**: Heavy emphasis on reviews and social media
- **B2B Software**: Focus on G2, Capterra, implementation stories
- **Services**: Emphasize experience narratives and support interactions
- **Luxury Goods**: Weight authentic ownership verification
- **Digital Products**: Include app store reviews, update reactions

### Analysis Depth Levels
- **Quick Pulse**: Top-line sentiment and major issues (2 hours)
- **Standard Analysis**: Full methodology implementation (1 day)
- **Deep Dive**: Include customer interviews, survey data (3-5 days)
- **Continuous Monitoring**: Ongoing tracking with alerts (subscription)

### Stakeholder Versions
- **C-Suite**: Strategic implications and competitive position
- **Product Team**: Feature-specific feedback and roadmap input
- **Marketing**: Messaging insights and segment opportunities  
- **Support Team**: Common issues and documentation gaps
- **QA Team**: Bug reports and quality concerns