# Reddit FAQ and Issue Analysis Orchestration

This workflow uses Reddit search to find frequently asked questions and common issues users discuss about the company's product, aggregating top recurring questions and community-provided solutions.

## Overview

Reddit serves as an authentic forum where users freely discuss product experiences, seek help, and share solutions. This orchestration systematically analyzes Reddit discussions to identify frequently asked questions, common issues, and community-generated solutions. The insights enable better customer support, product improvements, and community engagement strategies.

## Required Tools

- `reddit_search_exa` - Search Reddit posts and comments
- `web_search_exa` - Extended Reddit discovery
- `company_research_exa` - Company and product context

## Workflow Steps

### Phase 1: Reddit Landscape Mapping

```
1. Subreddit Discovery
   Identify relevant communities:
   - Official brand subreddit
   - Product-specific subreddits
   - Industry/category subreddits
   - General tech/consumer subreddits
   - Regional/language-specific subs
   - Support/help subreddits

2. Search Query Development
   Create comprehensive query sets:
   - "[Product] help"
   - "[Product] issue"
   - "[Product] problem"
   - "[Product] question"
   - "[Product] how to"
   - "[Product] fix"
   - "[Product] vs"
   - "[Brand] support"

3. Time Frame Definition
   Set analysis parameters:
   - Historical depth (6-12 months)
   - Seasonal considerations
   - Product version timelines
   - Update/release impacts
   - Trend identification needs
```

### Phase 2: Question Pattern Mining

```
4. FAQ Identification
   Use `reddit_search_exa` to find:
   - Repeated question patterns
   - High-engagement help posts
   - Pinned FAQ threads
   - Common search queries
   - Beginner questions
   - Advanced user queries

5. Question Categorization
   Organize by topic:
   - Setup/Installation
   - Features/Functionality
   - Troubleshooting
   - Compatibility
   - Pricing/Billing
   - Comparisons
   - Best practices

6. Frequency Analysis
   Track question patterns:
   - Times asked per month
   - Upvote patterns
   - Response rates
   - Resolution success
   - Escalation frequency
   - Seasonal variations
```

### Phase 3: Issue Deep Dive

```
7. Problem Identification
   Extract common issues:
   - Technical problems
   - User experience friction
   - Feature limitations
   - Performance issues
   - Compatibility problems
   - Account/billing issues
   - Integration challenges

8. Issue Severity Assessment
   Evaluate impact:
   - User frustration level
   - Business impact
   - Frequency of occurrence
   - Workaround availability
   - Official response presence
   - Community solution quality

9. Root Cause Analysis
   Understand issue origins:
   - Product design gaps
   - Documentation unclear
   - Feature missing
   - Bug/defect
   - User error patterns
   - External factors
```

### Phase 4: Solution Mining

```
10. Community Solutions
    Extract user-provided fixes:
    - Step-by-step guides
    - Workarounds
    - Third-party tools
    - Configuration tips
    - Best practices
    - Prevention methods

11. Solution Quality Assessment
    Evaluate community answers:
    - Success rate
    - Upvote validation
    - Mod endorsement
    - Official confirmation
    - Risk assessment
    - Complexity level

12. Knowledge Gaps
    Identify unanswered needs:
    - Questions without solutions
    - Inadequate responses
    - Outdated information
    - Complex issues
    - Feature requests
    - Documentation needs
```

### Phase 5: Community Dynamics

```
13. Helper Identification
    Recognize community experts:
    - Power users
    - Frequent helpers
    - Accurate responders
    - Mod team members
    - Brand representatives
    - Solution quality

14. Response Patterns
    Analyze support dynamics:
    - Average response time
    - Response quality
    - Helper availability
    - Escalation paths
    - Resolution rates
    - Follow-up patterns

15. Sentiment Analysis
    Gauge community health:
    - Frustration levels
    - Satisfaction indicators
    - Brand perception
    - Community cohesion
    - Helper burnout
    - Toxicity levels
```

### Phase 6: Actionable Insights

```
16. Documentation Gaps
    What's missing:
    - Unaddressed FAQs
    - Unclear instructions
    - Missing guides
    - Outdated content
    - Video needs
    - Language gaps

17. Product Improvements
    Feature/fix priorities:
    - High-frequency issues
    - High-impact problems
    - Quick wins available
    - Long-term needs
    - User expectations
    - Competitive gaps

18. Support Strategy
    Optimization opportunities:
    - Self-service content
    - Community engagement
    - Official presence
    - Response protocols
    - Escalation paths
    - Knowledge base updates
```

## Output Format

```markdown
# Reddit FAQ & Issue Analysis: [Product/Brand]
## Analysis Period: [Date Range]
## Subreddits Analyzed: [List]

### Executive Summary
- **Total Posts Analyzed**: [X,XXX]
- **Unique Questions Identified**: [XXX]
- **Common Issues Found**: [XX]
- **Community Solution Rate**: [X]%
- **Official Response Rate**: [X]%
- **Key Finding**: [Most significant insight]

### Top Frequently Asked Questions

#### 1. [Question Category]: "[Most Common Question Variant]"
- **Frequency**: Asked [X] times/month
- **Variations**: [X] different phrasings
- **Typical Context**: [When/why users ask]
- **Current Answer Quality**: [Poor/Good/Excellent]

**Common Phrasings**:
- "[Question variant 1]" - [X] instances
- "[Question variant 2]" - [X] instances
- "[Question variant 3]" - [X] instances

**Best Community Answer**:
> [Quote actual helpful response]
> - Posted by: u/[username]
> - Upvotes: [X]
> - Success confirmations: [X]

**Official Response**: [Available/Missing]
**Documentation Status**: [Covered/Gap]
**Recommendation**: [Specific action]

#### 2. [Second FAQ Category]
[Similar structure continues for top 10-15 FAQs]

### Common Issues Analysis

#### Critical Issues (High Impact, High Frequency)

##### Issue #1: [Issue Description]
- **Frequency**: [X] reports/month
- **Affected Users**: ~[X]% based on mentions
- **Severity**: [Critical/High/Medium]
- **Business Impact**: [Revenue/Churn risk]

**Typical User Report**:
> "[Representative quote describing the issue]"
> - u/[username] in r/[subreddit]

**Community Solutions**:
1. **Workaround**: [Description] - Success rate: [X]%
2. **Prevention**: [Method] - Recommended by [X] users
3. **Alternative**: [Approach] - Complexity: [Low/Medium/High]

**Root Cause**: [Analysis]
**Official Fix Status**: [In progress/Planned/Unknown]
**Priority Recommendation**: [HIGH - Specific action]

##### Issue #2: [Second Critical Issue]
[Similar detailed breakdown]

#### Major Issues (Medium Impact or Frequency)
| Issue | Reports/Mo | Impact | Community Solution | Status |
|-------|------------|---------|-------------------|---------|
| [Issue] | [X] | [Impact] | [Available/Partial/None] | [Status] |
| [Issue] | [X] | [Impact] | [Available/Partial/None] | [Status] |
| [Issue] | [X] | [Impact] | [Available/Partial/None] | [Status] |

#### Minor Issues (Low Impact, Worth Monitoring)
- [Issue]: [Brief description] - [X] mentions
- [Issue]: [Brief description] - [X] mentions
- [Issue]: [Brief description] - [X] mentions

### FAQ Categories Breakdown

#### Setup & Installation ([X]% of questions)
**Most Common Questions**:
1. "How do I [setup task]?" - [X] times
2. "Why won't it [install action]?" - [X] times
3. "Compatible with [system]?" - [X] times

**Success Rate**: [X]% get working solution
**Documentation Gap**: [Specific missing guides]

#### Features & How-To ([X]% of questions)
**Trending Questions**:
1. "How to [feature action]?" - Growing [X]%/month
2. "Can it do [capability]?" - [X] times
3. "Where is [feature]?" - [X] times

**Feature Request Patterns**:
- [Feature]: Requested [X] times
- [Feature]: Requested [X] times
- [Integration]: Requested [X] times

#### Troubleshooting ([X]% of questions)
**Persistent Problems**:
1. [Problem]: "Try [solution]" - [X]% success
2. [Problem]: "Check [setting]" - [X]% success
3. [Problem]: No reliable solution - Needs fix

#### Pricing & Account ([X]% of questions)
**Common Concerns**:
1. "Why was I charged [amount]?" - [X] times
2. "How to cancel?" - [X] times
3. "Upgrade/downgrade?" - [X] times

**Confusion Sources**: [List main issues]

### Community Dynamics

#### Top Helpers
| Username | Helpful Posts | Accuracy | Specialization |
|----------|--------------|----------|----------------|
| u/[name] | [X] | [X]% | [Topic area] |
| u/[name] | [X] | [X]% | [Topic area] |
| u/[name] | [X] | [X]% | [Topic area] |

**Recognition Opportunity**: These users deserve acknowledgment

#### Response Quality Metrics
- **Average First Response**: [X] hours
- **Helpful Response Rate**: [X]%
- **Official Response Rate**: [X]%
- **Resolution Rate**: [X]%
- **Follow-up Rate**: [X]%

#### Community Sentiment
```
Helpful & Positive  ████████████░░░░ 72%
Neutral            ████░░░░░░░░░░░░ 18%
Frustrated         ██░░░░░░░░░░░░░░ 8%
Toxic/Negative     ░░░░░░░░░░░░░░░░ 2%
```

### Knowledge Base Gaps

#### Missing Documentation
1. **[Topic]**: No official guide exists
   - Community demand: High ([X] requests)
   - Current solution: Community-created
   - Priority: HIGH

2. **[Topic]**: Outdated documentation
   - Last updated: [Date]
   - Confusion caused: [X] posts/month
   - Priority: MEDIUM

3. **[Topic]**: Too technical/unclear
   - Clarification requests: [X]/month
   - Priority: MEDIUM

#### Video Tutorial Needs
Based on "video tutorial" requests:
1. [Topic] - [X] requests
2. [Topic] - [X] requests
3. [Topic] - [X] requests

### Competitive Insights from Discussions

#### Feature Comparisons Mentioned
| Our Product | Competitor | Feature Gap | Mentions |
|-------------|------------|-------------|----------|
| [Feature] | [Competitor] | [What they have] | [X] |
| [Feature] | [Competitor] | [What they have] | [X] |

#### Switching Discussions
- To us from [Competitor]: [X] posts - Reasons: [List]
- From us to [Competitor]: [X] posts - Reasons: [List]

### Actionable Recommendations

#### Immediate Actions (This Week)
1. **Create FAQ Document**
   - Address top 20 questions
   - Use community language
   - Include proven solutions
   - Publish in subreddit wiki

2. **Address Critical Issue #1**
   - Acknowledge in subreddit
   - Provide timeline
   - Offer workaround
   - Pin update post

3. **Engage Top Helpers**
   - Thank publicly
   - Offer insider access
   - Create helper program

#### Short-term Improvements (Month)
1. **Documentation Overhaul**
   - Fill identified gaps
   - Simplify technical guides
   - Add video content
   - Update outdated sections

2. **Official Reddit Presence**
   - Daily monitoring
   - Response SLA: 4 hours
   - Weekly community posts
   - AMA scheduling

3. **Product Fixes**
   - Prioritize by frequency
   - Communicate progress
   - Beta test with Reddit users

#### Long-term Strategy (Quarter)
1. **Community Program**
   - Helper recognition system
   - Beta testing group
   - Feedback pipeline
   - Community events

2. **Proactive Support**
   - Predictive FAQ updates
   - Feature launch guides
   - Video tutorial series
   - Multilingual support

3. **Product Roadmap Alignment**
   - Reddit feedback integration
   - Community feature voting
   - Transparent roadmap
   - Regular updates

### Monitoring & Metrics

#### KPIs to Track
- FAQ resolution rate
- Issue report frequency
- Community sentiment score
- Official response time
- Helper retention rate

#### Monthly Reddit Report Should Include
- New FAQ trends
- Issue frequency changes
- Solution effectiveness
- Community health metrics
- Competitive mentions

#### Success Metrics
- [ ] 90% FAQ coverage achieved
- [ ] <4 hour response time
- [ ] 80% issue resolution rate
- [ ] 85% positive sentiment
- [ ] 10+ active helpers

---

**Analysis Date**: [Date]
**Data Sources**: [X] Reddit posts, [Y] comments analyzed
**Confidence Level**: High (large sample size)
**Next Analysis**: [Recommended monthly]
```

## Best Practices

1. **Respect Community**: Engage authentically, not corporately
2. **Credit Solutions**: Acknowledge community contributors
3. **Act on Feedback**: Show that Reddit input drives changes
4. **Be Transparent**: Admit issues and share fix timelines
5. **Maintain Presence**: Consistent engagement builds trust

## Advanced Techniques

### Temporal Pattern Analysis
- Track question frequency over time
- Identify seasonal patterns
- Correlate with product releases
- Predict support volume
- Plan resource allocation

### Solution Effectiveness Tracking
- Monitor solution success rates
- Track workaround longevity
- Measure fix implementation impact
- Validate community solutions
- Build verified solution database

### Sentiment Flow Analysis
- Track issue sentiment evolution
- Identify frustration escalation points
- Measure intervention effectiveness
- Predict community mood shifts
- Optimize response timing

### Cross-Platform Issue Correlation
- Compare Reddit issues with support tickets
- Validate issue severity
- Identify underreported problems
- Find platform-specific issues
- Build comprehensive issue map

## Common Pitfalls to Avoid

1. **Corporate Speak**: Reddit users value authenticity
2. **Selective Response**: Address negative feedback too
3. **Over-promising**: Only commit to what you can deliver
4. **Ignoring Patterns**: Individual complaints may indicate trends
5. **Solution Validation**: Test community fixes before endorsing

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Reddit-Community-Analyst
motivation: Extract actionable insights from Reddit discussions to improve support and product experience
constraints: Respect community norms, verify solution effectiveness, maintain objectivity
output_format: Structured FAQ and issue analysis with community solutions and recommendations
-->

When deploying task agents for Reddit analysis:
1. Cast a wide net across relevant subreddits
2. Look for patterns not just individual posts
3. Validate solutions through upvotes and confirmations
4. Consider temporal context of posts
5. Extract actionable insights for each finding

## Customization Options

### Analysis Depth
- **Quick Scan**: Top 10 FAQs only (2 hours)
- **Standard Analysis**: Full FAQ and issues (1 day)
- **Deep Dive**: Include sentiment and solutions (2 days)
- **Ongoing Monitoring**: Weekly updates

### Focus Areas
- **Technical Issues**: Bug and troubleshooting focus
- **User Experience**: Feature and usability focus
- **Business Issues**: Pricing and account focus
- **Competitive**: Comparison discussions focus
- **Comprehensive**: All areas covered

### Output Formats
- **FAQ Document**: Ready-to-publish format
- **Issue Tracker**: Development team format
- **Executive Summary**: High-level insights
- **Community Guide**: Helper resource
- **Knowledge Base**: Support team integration