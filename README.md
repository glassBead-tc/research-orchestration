# Research Orchestration System 🔍🧩
[![npm version](https://badge.fury.io/js/exa-mcp-server.svg)](https://www.npmjs.com/package/exa-mcp-server)
[![smithery badge](https://smithery.ai/badge/exa)](https://smithery.ai/server/exa)

A sophisticated Model Context Protocol (MCP) server that evolved from the Exa AI Search API integration into a comprehensive research orchestration framework. This system enables AI assistants to compose complex information retrieval and analysis workflows using a primitive-based architecture with game-theoretic reasoning.

## Remote Exa MCP 🌐

Connect directly to Exa's hosted MCP server (instead of running it locally).

### Remote Exa MCP URL

```
https://mcp.exa.ai/mcp?exaApiKey=your-exa-api-key
```

Replace `your-api-key-here` with your actual Exa API key from [dashboard.exa.ai/api-keys](https://dashboard.exa.ai/api-keys).

### Claude Desktop Configuration for Remote MCP

Add this to your Claude Desktop configuration file:

```json
{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.exa.ai/mcp?exaApiKey=your-exa-api-key"
      ]
    }
  }
}
```

### NPM Installation

```bash
npm install -g exa-mcp-server
```

### Using Smithery

To install the Exa MCP server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/exa):

```bash
npx -y @smithery/cli install exa --client claude
```

## Primitive-Based Architecture 🧩

The Research Orchestration System introduces a revolutionary approach to information retrieval through four composable primitives:

### Core Primitives

1. **Querying Primitive** - Strategic search orchestration across multiple data sources
2. **Filtering Primitive** - Rule-based data filtering with quality optimization
3. **Aggregation Primitive** - Evidence-weighted synthesis of information
4. **Reasoning Primitive** - Structured analysis and inference generation

### Orchestration Layers

```
MCP Tools → Primitives → Orchestrations → Agent Commands → Meta-Orchestrations
```

Each layer builds upon the previous, creating increasingly sophisticated capabilities for research and analysis.

### Available Orchestration Domains

- **Business & Market Intelligence** - Company profiles, market analysis, competitor research
- **Academic & Knowledge Research** - Literature reviews, fact-checking, evidence synthesis
- **Social Media & Community Insights** - Trend analysis, sentiment tracking, viral content
- **Technical & Developer Research** - API discovery, framework comparison, code patterns
- **Meta-Orchestrations** - Workflows that compose other workflows for complex tasks

## Configuration ⚙️

### 1. Configure Claude Desktop to recognize the Exa MCP server

You can find claude_desktop_config.json inside the settings of Claude Desktop app:

Open the Claude Desktop app and enable Developer Mode from the top-left menu bar. 

Once enabled, open Settings (also from the top-left menu bar) and navigate to the Developer Option, where you'll find the Edit Config button. Clicking it will open the claude_desktop_config.json file, allowing you to make the necessary edits. 

OR (if you want to open claude_desktop_config.json from terminal)

#### For macOS:

1. Open your Claude Desktop configuration:

```bash
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

#### For Windows:

1. Open your Claude Desktop configuration:

```powershell
code %APPDATA%\Claude\claude_desktop_config.json
```

### 2. Add the Exa server configuration:

```json
{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": ["-y", "exa-mcp-server"],
      "env": {
        "EXA_API_KEY": "your-api-key-here",
        "YOUTUBE_API_KEY": "your-youtube-api-key-here"
      }
    }
  }
}
```

Replace `your-api-key-here` with your actual Exa API key from [dashboard.exa.ai/api-keys](https://dashboard.exa.ai/api-keys).

Note: The `youtube_video_details_exa` tool requires a YouTube Data API v3 key. You can obtain one from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials). This is optional and only needed if you plan to use the YouTube video details tool.

### 3. Available Tools & Tool Selection

The Research Orchestration System includes the following tools:

#### Search & Data Retrieval Tools
- **web_search_exa**: Performs real-time web searches with optimized results and content extraction.
- **research_paper_search**: Specialized search focused on academic papers and research content.
- **company_research**: Comprehensive company research tool that crawls company websites to gather detailed information about businesses.
- **crawling**: Extracts content from specific URLs, useful for reading articles, PDFs, or any web page when you have the exact URL.
- **competitor_finder**: Identifies competitors of a company by searching for businesses offering similar products or services.
- **linkedin_search**: Search LinkedIn for companies and people using Exa AI. Simply include company names, person names, or specific LinkedIn URLs in your query.
- **wikipedia_search_exa**: Search and retrieve information from Wikipedia articles on specific topics, giving you accurate, structured knowledge from the world's largest encyclopedia.
- **github_search**: Search GitHub repositories using Exa AI - performs real-time searches on GitHub.com to find relevant repositories, issues, and GitHub accounts.

#### Social Media Tools
- **scrape_reddit_exa**: Search Reddit discussions using Exa AI - finds threads, comments, and community discussions across Reddit. Ideal for sentiment analysis, product research, community feedback, and trending topics.
- **youtube_search_exa**: Search YouTube videos, channels, and playlists using Exa AI - finds video content, creator channels, and curated playlists on YouTube. Ideal for discovering educational content, tutorials, entertainment, and trending videos.
- **tiktok_search_exa**: Search TikTok for videos using Exa AI - returns video titles, URLs, and metadata for TikTok content matching your search query.
- **youtube_video_details_exa**: Get detailed information about YouTube videos by their IDs - returns video titles, view counts, publish dates, and channel information. Requires YouTube Data API v3 key.

#### Orchestration & Reasoning Tools
- **orchestrationReasoning**: 🧠 Game-theoretic reasoning engine that designs optimal information retrieval workflows. This tool analyzes your research needs and creates custom orchestrations by composing primitives (Query → Filter → Aggregate → Reason) into sophisticated workflows. Features include:
  - 5-phase reasoning process (Need Analysis → Context Assessment → Pattern Analysis → Sequence Design → Validation)
  - Anti-spiral mechanisms to prevent over-optimization
  - Multi-agent consensus voting for quality assurance
  - Pattern matching against 50+ pre-built orchestrations
  - Support for prescriptive, guided, and autonomous agent levels

You can choose which tools to enable by adding the `--tools` parameter to your Claude Desktop configuration:

#### Specify which tools to enable:

```json
{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": [
        "-y",
        "exa-mcp-server",
        "--tools=web_search_exa,research_paper_search,company_research,crawling,competitor_finder,linkedin_search,wikipedia_search_exa,github_search,scrape_reddit_exa,youtube_search_exa,tiktok_search_exa,youtube_video_details_exa,orchestrationReasoning"
      ],
      "env": {
        "EXA_API_KEY": "your-api-key-here",
        "YOUTUBE_API_KEY": "your-youtube-api-key-here"
      }
    }
  }
}
```

For enabling multiple tools, use a comma-separated list:

```json
{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": [
        "-y",
        "exa-mcp-server",
        "--tools=web_search_exa,research_paper_search,company_research,crawling,competitor_finder,linkedin_search,wikipedia_search_exa,github_search,scrape_reddit_exa,youtube_search_exa,tiktok_search_exa,youtube_video_details_exa,orchestrationReasoning"
      ],
      "env": {
        "EXA_API_KEY": "your-api-key-here",
        "YOUTUBE_API_KEY": "your-youtube-api-key-here"
      }
    }
  }
}
```

If you don't specify any tools, all tools enabled by default will be used.

### 4. Restart Claude Desktop

For the changes to take effect:

1. Completely quit Claude Desktop (not just close the window)
2. Start Claude Desktop again
3. Look for the icon to verify the Exa server is connected

## Using via NPX

If you prefer to run the server directly, you can use npx:

```bash
# Run with all tools enabled by default
npx exa-mcp-server

# Enable specific tools only
npx exa-mcp-server --tools=web_search_exa

# Enable multiple tools
npx exa-mcp-server --tools=web_search_exa,research_paper_search

# List all available tools
npx exa-mcp-server --list-tools
```

## Using the Orchestration System 🎯

### Quick Start with Orchestration Reasoning

1. **Simple Research Request**
   ```
   "Find comprehensive information about sustainable agriculture practices"
   ```
   The orchestrationReasoning tool will design a workflow that searches multiple sources, filters for quality, aggregates findings, and provides structured analysis.

2. **Complex Multi-Domain Analysis**
   ```
   "Analyze the competitive landscape for AI coding assistants, including market trends, key players, and future opportunities"
   ```
   The system will create a sophisticated orchestration combining business intelligence, technical research, and market analysis primitives.

3. **Social Media Sentiment Analysis**
   ```
   "What are people saying about remote work on Reddit and Twitter in 2024?"
   ```
   Leverages social media tools with filtering and aggregation primitives to synthesize community insights.

### Pre-Built Orchestrations

The system includes 50+ pre-built orchestrations across domains:
- **Business**: Company profiles, SWOT analysis, market sizing
- **Academic**: Literature reviews, fact-checking, citation networks
- **Technical**: API comparison, framework evaluation, best practices
- **Social**: Trend analysis, viral content tracking, sentiment monitoring
- **Meta**: Orchestrations that compose other orchestrations for complex tasks

### Agent-Readable Design

All orchestrations are written in Markdown and designed to be read and executed by AI agents. This enables:
- Dynamic adaptation based on context
- Three levels of agent autonomy (prescriptive, guided, autonomous)
- Standardized JSON outputs for seamless data flow
- Self-documenting workflows with embedded examples

## Troubleshooting 🔧

### Common Issues

1. **Server Not Found**
   * Verify the npm link is correctly set up
   * Check Claude Desktop configuration syntax (json file)

2. **API Key Issues**
   * Confirm your EXA_API_KEY is valid
   * Check the EXA_API_KEY is correctly set in the Claude Desktop config
   * Verify no spaces or quotes around the API key

3. **Connection Issues**
   * Restart Claude Desktop completely
   * Check Claude Desktop logs:

<br>

---

Built with ❤️ by team Exa