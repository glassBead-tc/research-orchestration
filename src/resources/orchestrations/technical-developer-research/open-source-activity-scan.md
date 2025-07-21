# Open Source Activity Scan Orchestration

This workflow uses GitHub search to find open source projects or repositories maintained by the company or its competitors, tracking development activity, issue resolution, and community engagement.

## Overview

Open source activity provides transparent insights into a company's technical capabilities, development practices, and community engagement. This orchestration systematically analyzes GitHub repositories to assess code quality, development velocity, community health, and strategic technical directions through public development activity.

## Required Tools

- `github_search_exa` - Repository and code discovery
- `web_search_exa` - Extended GitHub information
- `reddit_search_exa` - Developer community opinions
- `company_research_exa` - Company technical context

## Workflow Steps

### Phase 1: Repository Discovery

```
1. Company Repository Identification
   Search strategies:
   - Official organization accounts
   - Employee personal projects
   - Sponsored projects
   - Forked repositories
   - Archive repositories
   - Related organizations
   
2. Project Categorization
   Repository types:
   - Core products (open source)
   - Developer tools/SDKs
   - Internal tools made public
   - Documentation/examples
   - Research/experimental
   - Community contributions
   - Educational resources

3. Competitive Landscape Mapping
   Competitor repositories:
   - Direct competitor projects
   - Alternative solutions
   - Industry standard tools
   - Framework comparisons
   - Market positioning
   - Technology choices
```

### Phase 2: Development Activity Analysis

```
4. Commit Pattern Analysis
   Use `github_search_exa`:
   - Commit frequency
   - Code volume changes
   - Active contributors
   - Time zone distribution
   - Weekend/holiday activity
   - Release cycles
   - Branch strategies

5. Contributor Ecosystem
   Developer community health:
   - Core maintainer count
   - External contributors
   - First-time contributors
   - Contributor retention
   - Geographic distribution
   - Company vs community ratio
   - Notable contributors

6. Code Quality Indicators
   Development practices:
   - Code review processes
   - Test coverage trends
   - Documentation updates
   - Refactoring patterns
   - Technical debt management
   - Security patch frequency
   - Breaking change handling
```

### Phase 3: Issue & PR Management

```
7. Issue Tracking Analysis
   Community responsiveness:
   - Open issue count
   - Issue resolution time
   - Bug vs feature ratio
   - Labeling practices
   - Priority distribution
   - Stale issue handling
   - Community issue quality

8. Pull Request Patterns
   Contribution workflow:
   - PR acceptance rate
   - Review turnaround time
   - External PR handling
   - Code review quality
   - Merge strategies
   - Contribution guidelines
   - Automated checks

9. Community Engagement Metrics
   Interaction quality:
   - Response time to issues
   - Maintainer availability
   - Community discussions
   - Help/support quality
   - Contributor recognition
   - Communication tone
   - Conflict resolution
```

### Phase 4: Technology Stack Analysis

```
10. Language & Framework Choices
    Technical decisions:
    - Primary languages used
    - Framework adoption
    - Dependency management
    - Technology migrations
    - Modern vs legacy code
    - Performance focus areas
    - Architecture patterns

11. Development Tool Integration
    DevOps practices:
    - CI/CD pipelines
    - Testing frameworks
    - Code quality tools
    - Security scanners
    - Documentation generators
    - Deployment automation
    - Monitoring integration

12. Innovation Indicators
    Technical leadership:
    - Cutting-edge technology use
    - Custom tool development
    - Algorithm innovations
    - Performance optimizations
    - Security innovations
    - Architecture decisions
    - Research integration
```

### Phase 5: Strategic Technical Insights

```
13. Product Roadmap Signals
    Future direction indicators:
    - Feature branch activity
    - Experimental features
    - Deprecated functionality
    - Architecture changes
    - Technology migrations
    - Integration priorities
    - Platform expansions

14. Technical Debt Assessment
    Code health indicators:
    - Refactoring frequency
    - Legacy code handling
    - Bug density trends
    - Performance issues
    - Security vulnerabilities
    - Documentation gaps
    - Test coverage

15. Competitive Technical Position
    Market comparison:
    - Feature parity analysis
    - Performance benchmarks
    - Innovation comparison
    - Community size/activity
    - Adoption metrics
    - Technology leadership
    - Market influence
```

### Phase 6: Developer Community Insights

```
16. External Adoption Metrics
    Usage indicators:
    - Fork count trends
    - Star growth rate
    - Watch/subscription rates
    - Package downloads
    - Integration mentions
    - Production usage signals
    - Enterprise adoption

17. Developer Sentiment Analysis
    Use `reddit_search_exa`:
    - Reddit discussions
    - Developer opinions
    - Common complaints
    - Feature requests
    - Success stories
    - Migration experiences
    - Alternative preferences

18. Ecosystem Impact Assessment
    Broader influence:
    - Dependent projects
    - Industry standards influence
    - Educational usage
    - Conference mentions
    - Blog post coverage
    - Tutorial creation
    - Community events
```

## Output Format

```markdown
# Open Source Activity Scan: [Company Name]
## Analysis Period: [Date Range]
## Repositories Analyzed: [X]

### Executive Summary
- **Total Public Repositories**: [X] active, [Y] archived
- **Monthly Active Contributors**: [X] ([Y]% external)
- **Code Velocity**: [X] commits/month across all repos
- **Community Health Score**: [X]/100
- **Top Project**: [Name] - [Stars] stars, [Contributors] contributors
- **Key Finding**: [Most significant insight]

### Repository Portfolio Overview

#### Active Projects by Category
| Category | Count | Total Stars | Contributors | Activity Level |
|----------|-------|-------------|--------------|----------------|
| Core Products | [X] | [X]K | [X] | High |
| Developer Tools | [X] | [X]K | [X] | Medium |
| Libraries/SDKs | [X] | [X]K | [X] | High |
| Documentation | [X] | [X]K | [X] | Low |
| Experimental | [X] | [X]K | [X] | Variable |

#### Top 5 Repositories
1. **[Repository Name]** ([URL])
   - Stars: [X]K (↑[Y]% this month)
   - Forks: [X]K
   - Contributors: [X] total, [Y] active
   - Language: [Primary Language]
   - Purpose: [Brief description]
   - Activity: [Commits/month]

2. **[Repository Name]** ([URL])
   [Similar details...]

### Development Activity Analysis

#### Commit Patterns
```
Monthly Commit Volume (6-month trend):
[Month-6]: ████████████ [X]K commits
[Month-5]: ██████████ [X]K commits
[Month-4]: ████████████████ [X]K commits
[Month-3]: ██████████████ [X]K commits
[Month-2]: ████████████ [X]K commits
[Month-1]: ██████████████████ [X]K commits
```

#### Development Velocity Metrics
| Metric | Company | Industry Avg | Percentile |
|--------|---------|--------------|------------|
| Commits/Day | [X] | [Y] | [Z]th |
| Active Days/Month | [X] | [Y] | [Z]th |
| Release Frequency | [X]/mo | [Y]/mo | [Z]th |
| PR Merge Time | [X]h | [Y]h | [Z]th |

#### Contributor Demographics
- **Core Team**: [X] developers ([Y]% of commits)
- **Regular Contributors**: [X] ([Y]% of commits)
- **Occasional Contributors**: [X] ([Y]% of commits)
- **One-time Contributors**: [X] ([Y]% of commits)

Geographic Distribution:
```
North America  ████████████ 45%
Europe        ████████ 30%
Asia          ████ 15%
Other         ██ 10%
```

### Issue & PR Management Quality

#### Issue Resolution Metrics
| Metric | Value | Industry Benchmark | Rating |
|--------|-------|-------------------|---------|
| Avg Resolution Time | [X] days | [Y] days | [Good/Fair/Poor] |
| Open/Closed Ratio | [X]:[Y] | [A]:[B] | [Good/Fair/Poor] |
| First Response Time | [X] hours | [Y] hours | [Good/Fair/Poor] |
| Stale Issue % | [X]% | [Y]% | [Good/Fair/Poor] |

#### Pull Request Handling
```
External PR Acceptance Rate: [X]%
Average Review Time: [X] hours
Average Reviews per PR: [X]
Automated Testing: [Yes/No/Partial]
```

#### Community Engagement Examples
**Excellent Response**:
> "[Quote from maintainer showing great community engagement]"
> - Issue #[X] in [Repository]

**Areas for Improvement**:
- Long response times on [Repository]
- Lack of contribution guidelines in [X] repos
- Inconsistent labeling practices

### Technology Stack Analysis

#### Language Distribution
```
JavaScript/TS  ████████████████ 35%
Python        ████████████ 25%
Go            ████████ 18%
Java          ████ 12%
Other         ████ 10%
```

#### Framework & Tool Adoption
| Technology | Projects Using | Trend | Strategic Importance |
|------------|----------------|-------|---------------------|
| [Framework] | [X] | Rising | High |
| [Tool] | [X] | Stable | Medium |
| [Library] | [X] | Declining | Low |

#### Innovation Indicators
1. **Early Adoption**: Using [Technology] before mainstream
2. **Custom Solutions**: Developed [Tool] for [Purpose]
3. **Performance Focus**: Optimized [Component] by [X]%
4. **Security Leadership**: Implemented [Security Feature]

### Strategic Technical Insights

#### Product Roadmap Signals
Based on recent commit activity:
1. **Mobile Focus**: [X]% increase in mobile-related commits
2. **AI/ML Integration**: New ML pipelines in [Repository]
3. **API Expansion**: [X] new endpoints added
4. **Performance**: Major refactoring in [Component]

#### Technical Debt Indicators
| Repository | Code Smells | Test Coverage | Documentation | Overall Health |
|------------|-------------|---------------|---------------|----------------|
| [Repo 1] | Low | 85% | Good | Healthy |
| [Repo 2] | Medium | 67% | Fair | Needs Attention |
| [Repo 3] | High | 45% | Poor | Critical |

#### Competitive Comparison
| Aspect | Company | Competitor A | Competitor B | Leader |
|--------|---------|--------------|--------------|---------|
| Repository Count | [X] | [Y] | [Z] | [Who] |
| Total Stars | [X]K | [Y]K | [Z]K | [Who] |
| Contributors | [X] | [Y] | [Z] | [Who] |
| Commit Velocity | [X]/mo | [Y]/mo | [Z]/mo | [Who] |
| Innovation Score | [X]/10 | [Y]/10 | [Z]/10 | [Who] |

### Developer Community Insights

#### Adoption Metrics
```
Growth Trends (Monthly):
Stars:    +[X]% average
Forks:    +[Y]% average
Users:    +[Z]% estimated
```

#### Developer Sentiment (Reddit Analysis)
**Positive Themes** ([X]% of mentions):
- "Great documentation"
- "Active community"
- "Fast performance"
- "Clean API design"

**Negative Themes** ([Y]% of mentions):
- "Breaking changes"
- "Limited features"
- "Steep learning curve"

**Feature Requests** (by frequency):
1. [Feature] - [X] requests
2. [Feature] - [Y] requests
3. [Feature] - [Z] requests

#### Production Usage Signals
- **Enterprise Mentions**: [X] companies confirmed
- **Case Studies**: [Y] published
- **Integration Partners**: [Z] identified
- **Job Market**: [A] job postings mentioning

### Key Technical Differentiators

#### Strengths
1. **[Technical Strength]**
   - Evidence: [Specific examples]
   - Impact: [Business value]

2. **[Technical Strength]**
   - Evidence: [Specific examples]
   - Impact: [Business value]

#### Weaknesses
1. **[Technical Weakness]**
   - Evidence: [Specific indicators]
   - Risk: [Potential impact]

2. **[Technical Weakness]**
   - Evidence: [Specific indicators]
   - Risk: [Potential impact]

### Recommendations

#### For Competitive Intelligence
1. **Monitor [Repository]** - Indicates future product direction
2. **Track [Technology] adoption** - Strategic technology bet
3. **Watch contributor from [Company]** - Potential talent/partnership

#### For Technical Strategy
1. **Adopt [Practice]** - Demonstrated effectiveness
2. **Avoid [Technology]** - Being deprecated/problematic
3. **Consider [Approach]** - Innovative solution to common problem

#### For Developer Relations
1. **Engage with [Project]** - Strategic partnership opportunity
2. **Contribute to [Repository]** - Industry standard influence
3. **Recruit from [Community]** - Skilled contributor pool

### Risk Assessment

#### Technical Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|---------|------------|
| [Risk description] | High | High | [Action] |
| [Risk description] | Medium | High | [Action] |
| [Risk description] | Low | Medium | [Monitor] |

#### Open Source Risks
- **License Changes**: [Assessment]
- **Abandonment Risk**: [Assessment]
- **Security Vulnerabilities**: [Assessment]
- **Community Fork Risk**: [Assessment]

---

**Report Generated**: [Date]
**Data Sources**: GitHub API, Reddit discussions, Web searches
**Repositories Analyzed**: [X] repositories, [Y] commits, [Z] issues
**Confidence Level**: [High/Medium/Low] based on data completeness
```

## Best Practices

1. **Comprehensive Search**: Look beyond official organization accounts
2. **Activity Over Size**: Prioritize active projects over star counts
3. **Pattern Recognition**: Identify trends across multiple repositories
4. **Community Context**: Understand developer discussions and opinions
5. **Competitive Benchmarking**: Always compare to industry standards

## Advanced Techniques

### Contribution Pattern Analysis
- Map contributor networks
- Identify key developers
- Track talent movement
- Predict project health
- Assess bus factor risks

### Code Evolution Tracking
- Monitor architecture changes
- Track technical debt
- Identify refactoring patterns
- Predict breaking changes
- Assess code quality trends

### Technology Adoption Curves
- Identify early technology adoption
- Track framework migrations
- Predict technology choices
- Assess innovation appetite
- Map competitive advantages

### Community Health Modeling
- Calculate engagement scores
- Predict contributor retention
- Identify community leaders
- Assess toxicity levels
- Model growth trajectories

## Common Pitfalls to Avoid

1. **Star Count Obsession**: Activity matters more than vanity metrics
2. **Ignoring Archives**: Historical repos reveal technical evolution
3. **Corporate Bias**: Personal developer projects provide insights too
4. **Surface Analysis**: Dig into commit messages and PR discussions
5. **Static Analysis**: Trends matter more than snapshots

## Tips for Task Agents

<!--TASK_AGENT_CONTEXT
role: Open-Source-Intelligence-Analyst
motivation: Extract strategic insights from open source development activity
constraints: Respect rate limits, focus on public data only, verify repository ownership
output_format: Comprehensive technical analysis with competitive insights and recommendations
-->

When deploying task agents for repository analysis:
1. Use multiple search strategies to find all relevant repositories
2. Analyze patterns across repositories not just individual projects
3. Correlate GitHub activity with developer community discussions
4. Focus on actionable intelligence not just metrics
5. Provide competitive context for all findings

## Customization Options

### Analysis Depth
- **Quick Scan**: Top 10 repositories only (2 hours)
- **Standard Analysis**: All active repositories (1 day)
- **Deep Dive**: Include commit history analysis (2-3 days)
- **Continuous Monitoring**: Weekly updates on key repos

### Focus Areas
- **Security Focus**: Vulnerability and patch analysis
- **Innovation Focus**: Cutting-edge technology adoption
- **Community Focus**: Contributor and engagement analysis
- **Quality Focus**: Code quality and testing practices
- **Competitive Focus**: Head-to-head comparisons

### Output Formats
- **Executive Brief**: High-level strategic insights
- **Technical Report**: Detailed code analysis
- **Competitive Matrix**: Side-by-side comparisons
- **Trend Report**: Historical pattern analysis
- **Risk Assessment**: Security and sustainability focus