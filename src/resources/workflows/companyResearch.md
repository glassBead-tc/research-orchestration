# Company Research Workflow with Exa MCP Server

This workflow leverages the Exa MCP Server tools to conduct comprehensive company research using Claude Code's agentic capabilities.

## Available MCP Tools

The Exa MCP Server provides 12 specialized search tools:

### Core Research Tools
- **`company_research_exa`** - Comprehensive company information from business sources
- **`competitor_finder_exa`** - Identify and analyze competitors
- **`web_search_exa`** - General web search with content extraction
- **`crawling_exa`** - Extract detailed content from specific URLs

### Social Media & Community Tools
- **`linkedin_search_exa`** - Search LinkedIn profiles and company pages
- **`youtube_search_exa`** - Search YouTube for videos
- **`youtube_video_details_exa`** - Get detailed YouTube video information
- **`reddit_search_exa`** - Search Reddit for discussions and posts
- **`tiktok_search_exa`** - Search TikTok for videos

### Reference & Technical Tools
- **`wikipedia_search_exa`** - Search Wikipedia for factual information
- **`github_search_exa`** - Search GitHub repositories and code
- **`research_paper_search_exa`** - Academic papers and research

## Agentic Workflow Patterns

### 1. Comprehensive Company Profile
Build a complete company profile by orchestrating multiple tools:

```
User Goal: "Research [Company Name] comprehensively"

Workflow Steps:
1. Use `company_research_exa` to get core business information
2. Use `wikipedia_search_exa` to get historical and factual data
3. Use `linkedin_search_exa` to find key employees and company culture
4. Use `competitor_finder_exa` to understand market position
5. Use `github_search_exa` to find technical projects (if tech company)
6. Aggregate and synthesize findings into a structured report
```

### 2. Social Media Presence Analysis
Analyze a company's social media footprint:

```
User Goal: "Analyze [Company Name]'s social media presence"

Workflow Steps:
1. Use `youtube_search_exa` to find company videos
2. For each video found, use `youtube_video_details_exa` to get metrics
3. Use `reddit_search_exa` to find community discussions
4. Use `tiktok_search_exa` to find viral content
5. Use `linkedin_search_exa` for professional content
6. Create a social media engagement report with metrics
```

### 3. Competitive Intelligence Gathering
Deep dive into competitive landscape:

```
User Goal: "Analyze competitive landscape for [Company Name]"

Workflow Steps:
1. Use `competitor_finder_exa` with company name
2. For each competitor found:
   - Use `company_research_exa` for business details
   - Use `linkedin_search_exa` for workforce insights
   - Use `web_search_exa` for recent news
3. Compare findings across competitors
4. Generate competitive analysis matrix
```

### 4. Technical Due Diligence
For technology companies:

```
User Goal: "Technical analysis of [Company Name]"

Workflow Steps:
1. Use `github_search_exa` to find open source projects
2. Use `research_paper_search_exa` to find published research
3. Use `linkedin_search_exa` to find technical team members
4. Use `reddit_search_exa` for developer community discussions
5. Synthesize technical capabilities assessment
```

## Best Practices for Agentic Workflows

### 1. Parallel Tool Execution
Claude Code can call multiple tools in parallel for efficiency:
```
// Good - Parallel execution
- Call company_research_exa
- Call wikipedia_search_exa  
- Call linkedin_search_exa
// All execute simultaneously
```

### 2. Dynamic Tool Selection
Let Claude Code decide which tools to use based on context:
```
"Research [Company Name], focusing on whatever aspects seem most relevant"
// Claude will autonomously select appropriate tools
```

### 3. Iterative Refinement
Use findings from one tool to inform queries to others:
```
1. Get company info → Extract key products
2. Search for those products on Reddit/YouTube
3. Find competitor products → Compare discussions
```

### 4. Resource Management
- Use `crawling_exa` sparingly (only for specific URLs)
- Batch video IDs for `youtube_video_details_exa`
- Limit result counts when doing broad searches

## Example Prompts

### Basic Company Research
```
Research Apple Inc. using the MCP tools. Focus on recent developments, 
social media presence, and competitive position.
```

### Targeted Analysis
```
Analyze Microsoft's developer community engagement. Check their GitHub 
presence, Reddit discussions, and YouTube technical content.
```

### Comparative Analysis
```
Compare Tesla and Rivian across multiple dimensions: company fundamentals,
social media engagement, and community sentiment on Reddit.
```

### Trend Analysis
```
Track discussions about OpenAI across Reddit, YouTube, and LinkedIn 
over the past month. Identify key themes and sentiment.
```

## Advanced Workflow: Full Company Report

For a complete company analysis, use this workflow:

```
1. Foundation Research
   - company_research_exa → Business overview
   - wikipedia_search_exa → History and facts
   - crawling_exa → Official website content

2. Market Position
   - competitor_finder_exa → Identify competitors
   - web_search_exa → Recent news and developments
   
3. Social Presence
   - linkedin_search_exa → Professional presence
   - youtube_search_exa + youtube_video_details_exa → Video content
   - reddit_search_exa → Community discussions
   - tiktok_search_exa → Viral content
   
4. Technical Assets (if applicable)
   - github_search_exa → Open source projects
   - research_paper_search_exa → Published research

5. Synthesis
   - Aggregate all findings
   - Identify patterns and insights
   - Generate structured report
```

## Tips for Effective Use

1. **Start Broad, Then Narrow**: Use general searches first, then dive into specifics
2. **Cross-Reference**: Validate findings across multiple sources
3. **Time-Box Searches**: Set limits on how deep to go
4. **Track Sources**: Keep track of which tool provided which insights
5. **Iterate**: Use findings to generate new queries

## Integration with Claude Code Features

- **Subagents**: Deploy subagents for parallel research tracks
- **Memory**: Claude Code maintains context across tool calls
- **Planning**: Use TodoWrite to plan complex research tasks
- **Synthesis**: Leverage Claude's reasoning to connect findings

This workflow enables systematic, comprehensive company research by orchestrating multiple specialized tools through Claude Code's agentic capabilities.