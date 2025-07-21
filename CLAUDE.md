# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Research Orchestration System** - an evolved MCP server that transcends simple tool wrapping to provide a sophisticated primitive-based orchestration framework. Originally the Exa MCP Server for search API access, it now implements a game-theoretic reasoning engine for composing complex information retrieval and analysis workflows.

## Key Commands

### Development
- `npm run dev` - Run Smithery CLI in development mode (interactive development)
- `npm run watch` - Run TypeScript compiler in watch mode for continuous compilation
- `npm run inspector` - Run MCP inspector on the built output to test tools (requires building first)

### Building
- `npm run build` - Build for SHTTP transport (default)
- `npm run build:stdio` - Build for STDIO transport (used by Claude Desktop) - adds shebang and makes executable
- `npm run build:shttp` - Build for SHTTP transport explicitly

### Installation & Publishing
- `npm install` - Install dependencies and automatically run stdio build via prepare script
- `npm publish` - Publish to npm (runs prepublishOnly script which builds stdio version)

### Testing Tools
- `npx exa-mcp-server --list-tools` - List all available tools
- `npx exa-mcp-server --tools=web_search_exa` - Run with specific tools enabled
- `node test-orchestration-reasoning.js` - Test the orchestration reasoning engine

## Architecture Overview

### Layered Architecture: From Tools to Orchestrations

The system implements a sophisticated layered architecture that builds from simple MCP tools up to complex orchestrated workflows:

```
MCP Tools (base layer) → Primitives → Orchestrations → Agent Commands → Meta-Orchestrations
```

1. **MCP Tool Layer** (`src/tools/`): Individual tool implementations for search and data retrieval
2. **Primitive Layer** (`src/primitives/`): Four core composable operations (Query, Filter, Aggregate, Reason)
3. **Orchestration Layer** (`src/resources/orchestrations/`): Pre-built domain-specific workflows
4. **Agent Command Layer** (`agent-commands/`): High-level capabilities for AI agents
5. **Reasoning Engine** (`src/tools/orchestrationReasoning.ts`): Game-theoretic workflow composition

### Directory Structure
- `src/tools/` - MCP tool implementations and orchestration reasoning engine
- `src/types/` - TypeScript interfaces for API requests/responses and primitives
- `src/utils/` - Utilities including logger, game state, pattern analyzer, validators
- `src/resources/` - User guides, orchestrations, and workflows
- `src/primitives/` - Core primitive operations (Query, Filter, Aggregate, Reason)
- `agent-commands/` - High-level AI agent command specifications
- `specs/` - Formal specifications for primitives and architecture
- `pseudocode/` - Implementation guidance for each primitive
- `docs/` - Framework documentation
- `examples/` - Example implementations and usage patterns

### Tool Implementation Pattern
Every tool follows this consistent pattern:
```typescript
export function registerXxxTool(server: McpServer, config?: { exaApiKey?: string }): void {
  server.tool({
    name: "tool_name_exa",
    description: "...",
    inputSchema: zodSchema,
    handler: async ({ arguments: args }) => {
      // 1. Create request-scoped logger
      // 2. Validate inputs
      // 3. Make Exa API request
      // 4. Transform and return response
    }
  });
}
```

### Available Tools

**Original Exa Tools:**
- `web_search_exa` - Real-time web search
- `research_paper_search_exa` - Academic paper search  
- `company_research_exa` - Company information
- `crawling_exa` - URL content extraction
- `competitor_finder_exa` - Business competitor identification
- `linkedin_search_exa` - LinkedIn search
- `wikipedia_search_exa` - Wikipedia search
- `github_search_exa` - GitHub repository search

**New Tools:**
- `orchestrationReasoning` - Game-theoretic reasoning engine for workflow composition
- `redditSearch` - Reddit search integration
- `tiktokSearch` - TikTok search integration
- `youtubeSearch` - YouTube search integration
- `youtubeVideoDetails` - YouTube video metadata retrieval

### Configuration
The server accepts configuration via:
1. `exaApiKey` - API key for Exa AI (can also use `EXA_API_KEY` env var)
2. `enabledTools` - Array of tool IDs to enable (defaults to all)
3. `debug` - Enable debug logging

### Logging
Uses a custom logger (`src/utils/logger.ts`) that:
- Logs to stderr with `[EXA-MCP-DEBUG]` prefix
- Creates request-scoped loggers with unique IDs
- Tracks request lifecycle (start → log → complete/error)

## Primitive System Architecture

### Core Primitives
The system is built on four composable primitives, each with three agentic levels:

1. **Querying Primitive** (`src/primitives/querying/`): Orchestrates search across multiple tools
2. **Filtering Primitive** (`src/primitives/filtering/`): Rule-based data filtering and quality control
3. **Aggregation Primitive** (`src/primitives/aggregation/`): Synthesizes data from multiple sources
4. **Reasoning Primitive** (`src/primitives/reasoning/`): Structured analysis and inference

### Agentic Levels
Each primitive supports three levels of agent autonomy:
- **Prescriptive**: Fully specified parameters and execution
- **Guided**: Agent makes decisions within constraints
- **Autonomous**: Agent determines optimal approach

### Orchestration Domains
Pre-built workflows organized by domain in `src/resources/orchestrations/`:
- `business-market-intelligence/` - Company profiles, market analysis
- `competitive-analysis-strategy/` - SWOT analysis, competitor research
- `knowledge-academic-research/` - Literature reviews, fact-checking
- `social-media-community-insights/` - Platform-specific trend analysis
- `technical-developer-research/` - API discovery, framework comparison
- `meta/` - Meta-workflows that orchestrate other workflows

## Important Notes

- The project uses **Smithery CLI** for building MCP servers
- TypeScript target is ES2022 with Node16 module system
- No test suite exists - be careful when making changes
- No linting configuration - maintain existing code style
- Built files go to `.smithery/` directory (gitignored)
- The server supports both STDIO and SHTTP transports
- API key can be provided via `exaApiKey` config option or `EXA_API_KEY` environment variable
- Node.js version requirement: >=18.0.0
- Main entry point: `.smithery/index.cjs` (built artifact)
- The system is designed to be **agent-readable** with Markdown specifications
- All primitives output standardized JSON for seamless composition

## Development Workflow

1. Make changes to TypeScript source files in `src/`
2. Run `npm run build:stdio` to build for local testing
3. Test using `npm run inspector` or integrate with Claude Desktop
4. Use `npm run dev` for interactive development with hot reload
5. Ensure all tools follow the consistent registration pattern

## Adding New Tools

To add a new tool:
1. Create a new file in `src/tools/` following the naming convention
2. Export a `registerXxxTool()` function following the established pattern
3. Import and register in `src/index.ts`
4. Add the tool ID to the `AVAILABLE_TOOLS` array in index.ts
5. Update README.md with tool documentation

## Working with Orchestrations

### Creating New Orchestrations
1. Choose appropriate domain directory in `src/resources/orchestrations/`
2. Create a Markdown file following the naming pattern
3. Define the primitive sequence using the standard format
4. Include examples and expected outputs
5. Test using the orchestration reasoning tool

### Orchestration Reasoning Process
The `orchestrationReasoning` tool follows a 5-phase process:
1. **Need Analysis**: Decompose user requirements
2. **Context Assessment**: Evaluate constraints and trade-offs
3. **Pattern Analysis**: Find similar existing orchestrations
4. **Sequence Design**: Create optimal primitive chains
5. **Validation**: Quality prediction and consensus

### Game-Theoretic Features
- Anti-spiral mechanisms prevent over-optimization
- Minimax regret analysis for decision making
- Multi-agent consensus voting for quality assurance
- Commitment tracking to ensure shipping