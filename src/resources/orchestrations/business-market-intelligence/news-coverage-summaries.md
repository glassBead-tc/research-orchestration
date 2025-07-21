# News Coverage Summaries Orchestration

This workflow continuously monitors company news coverage and produces weekly summaries of major announcements, controversies, and market-impacting developments.

## Overview

In today's fast-paced business environment, staying current with news flow is critical for stakeholders. This orchestration systematically tracks, filters, and synthesizes news coverage to identify material developments, sentiment shifts, and emerging narratives that could impact business strategy, investment decisions, or reputation management.

## Required Tools

- `web_search_exa` - News articles from multiple sources
- `company_research_exa` - Company context and baseline
- `reddit_search_exa` - Community discussion of news
- `crawling_exa` - Full article extraction when needed
- `competitor_finder_exa` - Competitive news context

## Workflow Steps

### Phase 1: Coverage Baseline & Setup

```
1. Company News Profile Setup
   - Use `company_research_exa` for company basics
   - Identify:
     - Official company name variations
     - Stock ticker (if public)
     - Key brands/products
     - CEO and key executive names
     - Major subsidiaries
   
2. News Source Prioritization
   - Tier 1 Sources (highest credibility):
     - Wall Street Journal
     - Financial Times  
     - Bloomberg
     - Reuters
     - Industry-specific leaders
   - Tier 2 Sources (good coverage):
     - CNBC, Forbes, Fortune
     - Regional business press
     - Trade publications
   - Tier 3 Sources (broad coverage):
     - General news outlets
     - Press release wires
```

### Phase 2: Systematic News Collection

```
3. Time-Bounded News Retrieval
   - Use `web_search_exa` with date ranges:
     - "[Company Name]" + "past week"
     - "[CEO Name]" + "announces|says"
     - "[Company] lawsuit|investigation|fine"
     - "[Company] partnership|acquisition|investment"
   - Separate searches for each brand/product
   
4. Categorized Search Queries
   - Financial Performance:
     - "[Company] earnings|revenue|profit"
     - "[Company] guidance|forecast"
   - Strategic Moves:
     - "[Company] acquires|merges|partners"
     - "[Company] launches|unveils|introduces"
   - Leadership & Governance:
     - "[Company] appoints|hires|promotes"
     - "[Company] CEO|CFO|board"
   - Challenges & Controversies:
     - "[Company] lawsuit|investigation"
     - "[Company] recall|breach|scandal"

5. Volume & Velocity Tracking
   - Count articles per day
   - Track publication tier distribution
   - Note geographic coverage
   - Identify news velocity spikes
```

### Phase 3: Content Analysis & Prioritization

```
6. Article Relevance Scoring
   - High Priority (material impact):
     - Earnings announcements
     - Major M&A activity
     - Leadership changes
     - Regulatory actions
     - Strategic pivots
   - Medium Priority (notable):
     - Product launches
     - Partnership announcements
     - Market expansion
     - Analyst actions
   - Low Priority (routine):
     - Minor PR releases
     - Event participation
     - Award recognition

7. Sentiment Classification
   - For each article, assess:
     - Positive/Neutral/Negative tone
     - Factual vs. opinion content
     - Source credibility weight
   - Track sentiment momentum:
     - Improving/Stable/Deteriorating
     - Sentiment by topic category

8. Narrative Theme Extraction
   - Identify recurring themes:
     - Growth story elements
     - Challenge narratives
     - Transformation angles
     - Competitive positioning
   - Track theme evolution over time
```

### Phase 4: Deep Dive on Major Stories

```
9. High-Impact Story Analysis
   - For material news, use `crawling_exa`:
     - Extract full article content
     - Identify key facts and figures
     - Note sources quoted
     - Assess likely impact
   
10. Cross-Source Verification
    - Find multiple sources for major news
    - Compare fact consistency
    - Identify unique angles
    - Note any contradictions
    
11. Community Reaction Assessment
    - Use `reddit_search_exa` for discussions
    - Gauge investor/customer reactions
    - Identify concerns or enthusiasm
    - Note viral potential
```

### Phase 5: Competitive Context

```
12. Industry News Scanning
    - Monitor sector-wide developments
    - Track competitive announcements
    - Identify industry trends affecting company
    
13. Relative Coverage Analysis
    - Compare news volume to competitors
    - Assess share of voice
    - Identify coverage gaps
    - Note competitive positioning
```

### Phase 6: Synthesis & Reporting

```
14. Executive Summary Creation
    - Top 3-5 developments
    - Net sentiment assessment
    - Key risks and opportunities
    - Recommended actions

15. Detailed Category Summaries
    - Financial updates
    - Strategic initiatives
    - Operational developments
    - Leadership changes
    - Challenges faced

16. Forward-Looking Indicators
    - Emerging narratives
    - Upcoming catalysts
    - Monitoring priorities
    - Early warning signals
```

## Output Format

```markdown
# [Company Name] Weekly News Summary
## Week of [Start Date] - [End Date]

### Executive Summary
**Overall Sentiment**: [Positive/Neutral/Negative] trending [Up/Stable/Down]
**News Volume**: [X] articles ([+/-Y]% vs prior week)
**Key Development**: [Most important story in one line]

### Top Stories This Week

#### 1. [Headline of Most Important Story]
**Source**: [Publication] | **Date**: [Date] | **Impact**: [High/Medium]
- **Summary**: [2-3 sentence summary]
- **Key Facts**: 
  - [Fact 1]
  - [Fact 2]
- **Implications**: [What this means for stakeholders]
- **Market Reaction**: [Stock movement, analyst comments]

#### 2. [Second Most Important Story]
[Similar format]

#### 3. [Third Most Important Story]
[Similar format]

### News by Category

#### Financial Performance
- **[Date]**: [Company] reports Q[X] earnings of $[X] per share, beating estimates ([Source])
  - Revenue: $[X]B ([+/-Y]% YoY)
  - Key Driver: [What drove results]
  - Guidance: [Any updates]

#### Strategic Initiatives  
- **[Date]**: [Company] announces [strategic move] ([Source])
  - Details: [Key points]
  - Investment: $[Amount]
  - Timeline: [When happening]
  - Strategic Rationale: [Why doing this]

#### Product & Innovation
- **[Date]**: [Company] launches [product/service] ([Source])
  - Target Market: [Who for]
  - Key Features: [What's new]
  - Competitive Position: [How compares]

#### Leadership & Governance
- **[Date]**: [Company] appoints [Name] as [Position] ([Source])
  - Background: [Previous role]
  - Mandate: [What they'll focus on]
  - Market Reception: [How received]

#### Challenges & Controversies
- **[Date]**: [Company] faces [challenge type] ([Source])
  - Issue: [What happened]
  - Company Response: [Official statement]
  - Potential Impact: [Financial/operational]
  - Resolution Timeline: [When resolved]

### Sentiment Analysis

#### Coverage Sentiment Distribution
- Positive: [X]% ([# articles])
- Neutral: [Y]% ([# articles])  
- Negative: [Z]% ([# articles])

#### Sentiment by Topic
| Topic | Positive | Neutral | Negative | Trend |
|-------|----------|---------|----------|--------|
| Financial Performance | [%] | [%] | [%] | ↑/→/↓ |
| Products/Services | [%] | [%] | [%] | ↑/→/↓ |
| Leadership | [%] | [%] | [%] | ↑/→/↓ |
| Strategy | [%] | [%] | [%] | ↑/→/↓ |

### Media Coverage Metrics

#### Volume Trends
- This Week: [X] articles
- Last Week: [Y] articles  
- 4-Week Average: [Z] articles
- YoY Comparison: [+/-]%

#### Top Sources
1. [Source 1]: [X] articles
2. [Source 2]: [Y] articles
3. [Source 3]: [Z] articles

#### Geographic Distribution
- North America: [X]%
- Europe: [Y]%
- Asia: [Z]%
- Other: [A]%

### Competitive Context

#### Industry News Impacting [Company]
- [Industry development 1 and relevance]
- [Industry development 2 and relevance]

#### Competitor Developments
- **[Competitor 1]**: [Key news and implications]
- **[Competitor 2]**: [Key news and implications]

#### Share of Voice
- [Company]: [X]% of industry coverage
- [Competitor 1]: [Y]%
- [Competitor 2]: [Z]%

### Community & Social Sentiment

#### Reddit Discussions
- Most discussed topic: [Topic]
- Sentiment: [Positive/Mixed/Negative]
- Key concerns: [List]
- Notable thread: "[Thread title]" ([X] upvotes)

#### Analyst Actions
- **[Date]**: [Firm] [upgrades/downgrades] to [rating]
  - Price Target: $[X] (was $[Y])
  - Rationale: [Brief reason]

### Looking Ahead

#### Upcoming Catalysts
- [Date]: [Event/Announcement]
- [Date]: [Event/Announcement]
- [Date]: [Event/Announcement]

#### Narratives to Monitor
1. **[Emerging Theme 1]**: [Why important]
2. **[Emerging Theme 2]**: [Why important]

#### Recommended Actions
- **For Investors**: [Specific recommendation]
- **For Management**: [Specific recommendation]
- **For Partners**: [Specific recommendation]

### Appendix

#### Full Story List
[Complete list of all articles with links, organized by date]

#### Methodology
- Sources Monitored: [X] publications
- Articles Analyzed: [Y] total
- Time Period: [Exact dates]
- Filters Applied: [Any exclusions]

---
**Report Generated**: [Date/Time]
**Next Update**: [Date]
**Confidence Level**: [High/Medium/Low] based on source quality
```

## Best Practices

1. **Temporal Discipline**: Maintain consistent time windows for comparison
2. **Source Weighting**: Give more weight to credible sources
3. **Fact Separation**: Distinguish facts from speculation/opinion
4. **Impact Assessment**: Always evaluate business impact
5. **Trend Recognition**: Look for patterns beyond individual stories

## Advanced Techniques

### Narrative Evolution Tracking
- Map how stories develop over time
- Identify narrative shifts
- Track source origination
- Predict story lifecycle
- Measure narrative stickiness

### Sentiment Momentum Analysis
- Calculate sentiment velocity
- Identify inflection points
- Correlate with stock movements
- Predict sentiment reversals
- Track sentiment persistence

### Media Cycle Optimization
- Identify optimal release windows
- Track journalist focus patterns
- Understand competitive news dynamics
- Predict coverage opportunities
- Optimize announcement timing

### Crisis Detection System
- Define early warning indicators
- Create escalation triggers
- Track crisis evolution patterns
- Measure response effectiveness
- Build crisis probability models

## Common Pitfalls to Avoid

1. **Echo Chamber Amplification**: Same story counted multiple times
2. **False Precision**: Over-interpreting small samples
3. **Recency Bias**: Overweighting latest news
4. **Source Bias**: Skewing toward certain publications
5. **Context Loss**: Missing industry-wide factors

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Media-Intelligence-Analyst
motivation: Provide comprehensive, timely news analysis that identifies material developments and emerging narratives
constraints: Prioritize accuracy over speed, verify major stories, maintain source diversity, focus on business impact
output_format: Weekly executive briefing with categorized stories, sentiment analysis, and forward-looking insights
-->

When deploying task agents for news monitoring:
1. Emphasize material impact over volume
2. Require multi-source verification for major stories
3. Demand both facts and implications
4. Track narrative evolution not just events
5. Provide actionable intelligence not just summaries

## Customization Options

### Frequency Variations
- **Daily Brief**: Key headlines only (15 min)
- **Weekly Summary**: Full analysis (standard)
- **Monthly Strategic**: Deep narrative analysis
- **Real-time Alerts**: Material news only
- **Quarterly Review**: Trend analysis focus

### Stakeholder Versions
- **C-Suite**: Strategic implications focus
- **Investor Relations**: Market impact emphasis
- **PR/Comms**: Reputation and narrative
- **Competitive Intel**: Relative positioning
- **Risk Management**: Threat identification

### Industry Adaptations
- **Tech**: Product launches, partnerships, talent
- **Pharma**: Clinical trials, FDA actions, patents
- **Financial**: Regulatory, market conditions, M&A
- **Retail**: Consumer trends, comps, expansion
- **Energy**: Commodity prices, policy, projects

### Output Formats
- **Email Brief**: HTML formatted highlights
- **Dashboard Feed**: JSON for visualization
- **Slide Deck**: PowerPoint executive summary
- **Audio Brief**: Podcast-style summary
- **SMS Alerts**: Critical news only