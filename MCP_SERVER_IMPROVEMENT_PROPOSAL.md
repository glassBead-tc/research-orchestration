# MCP Server Improvement Proposal

## Research Orchestration System: Alignment with MCP 2025-11-25 Specification

**Date:** December 31, 2025
**Version:** 1.0

---

## Executive Summary

This report analyzes the Research Orchestration MCP Server against the newly released **MCP 2025-11-25 specification** and proposes improvements to better enable AI agents to:

1. Review existing research process templates
2. Match user prompts to appropriate research processes
3. Design and execute custom research workflows when no template applies

The current implementation has strong conceptual foundations (primitives, orchestrations, game-theoretic reasoning) but lacks the execution engine and spec-aligned features that would tie everything together into a cohesive agent-driven research system.

---

## Part 1: MCP 2025-11-25 Specification Overview

### Key New Features Relevant to This Server

| Feature | SEP | Description | Relevance |
|---------|-----|-------------|-----------|
| **Tasks (Async Operations)** | SEP-1686 | Any request can return a task handle with states: `working`, `input_required`, `completed`, `failed`, `cancelled` | High - Deep research already uses async patterns |
| **Sampling with Tools** | SEP-1577 | Servers can run agentic loops using client's tokens, with tool definitions in sampling requests | Critical - Enables server-side orchestration execution |
| **Standardized Tool Names** | SEP-986 | Canonical format for tool naming (lowercase, underscores) | Medium - Current naming partially compliant |
| **Enhanced Authorization** | SEP-1046, SEP-990 | Client ID Metadata Documents, mandatory PKCE, enterprise SSO | Low - Not immediately critical |

### Tasks Primitive Details

The Tasks feature is particularly relevant for this server's deep research patterns:

```typescript
// Task states from MCP 2025-11-25
type TaskState = 'working' | 'input_required' | 'completed' | 'failed' | 'cancelled';

// Tasks allow:
// - Returning task handles immediately
// - Polling for status updates
// - Retrieving results after completion
// - Cancellation support
```

### Sampling with Tools Details

This feature enables **server-side agent loops** - exactly what the orchestration reasoning system needs:

```typescript
// Servers can now:
// - Include tool definitions in sampling requests
// - Orchestrate multi-step reasoning internally
// - Execute parallel tool calls
// - Coordinate results without additional scaffolding
```

**Sources:**
- [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25)
- [One Year of MCP: November 2025 Spec Release](http://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/)
- [MCP 2025-11-25 Spec Update Analysis (WorkOS)](https://workos.com/blog/mcp-2025-11-25-spec-update)

---

## Part 2: Current Codebase Analysis

### Architecture Summary

The server implements a sophisticated layered architecture:

```
MCP Tools (base) → Primitives → Orchestrations → Agent Commands → Meta-Orchestrations
```

### Existing Tool Categories

| Category | Tools | Status |
|----------|-------|--------|
| **Search** | `web_search_exa`, `research_paper_search_exa`, `crawling_exa`, `scout_search` | Implemented |
| **Business** | `company_research_exa`, `competitor_finder_exa` | Implemented |
| **Social** | `linkedin_search_exa`, `scrape_reddit_exa`, `tiktok_search_exa`, `youtube_search_exa`, `youtube_video_details_exa` | Implemented |
| **Knowledge** | `wikipedia_search_exa`, `github_search_exa` | Implemented |
| **Orchestration** | `light_research.*`, `deep_research.*`, `planning_scoping.*` | Implemented |

### Research Process Workflows

#### Light Research (`light_research.*`)
- `design_plan` - Creates a balanced snapshot plan
- `run_plan` - Executes using Effect-TS with retries, timeouts, concurrency controls

**Current Flow:**
```
query → design_plan → LightPlan → run_plan → results
```

#### Deep Research (`deep_research.*`)
- `start` - Initiates async task, returns task_id
- `check` - Polls task status

**Current Flow:**
```
query → start → task_id → poll(check) → results
```

#### Planning & Scoping (`planning_scoping.*`)
9-step workflow for comprehensive research planning:
1. `start_session` - Initialize ScopingDoc
2. `define_objectives` - Goals, scope, stakeholders
3. `capture_constraints` - Budgets, tool restrictions
4. `list_unknowns_and_assumptions` - Document uncertainties
5. `success_criteria` - Define metrics
6. `tool_selection` - Get recommendations by info type
7. `plan_outline` - Create decomposition, generate LightPlan
8. `critique_plan` - Validate against constraints
9. `scoping_brief` - Generate markdown documentation

### Pre-Built Orchestrations

The server includes **50+ pre-built orchestration templates** in markdown format:

| Domain | Count | Examples |
|--------|-------|----------|
| `business-market-intelligence/` | 10 | Company profiles, market sizing |
| `competitive-analysis-strategy/` | 10 | SWOT analysis, competitor profiling |
| `knowledge-academic-research/` | 5 | Literature reviews, fact-checking |
| `social-media-community-insights/` | 10 | Trend analysis, sentiment analysis |
| `technical-developer-research/` | 7 | API comparison, framework evaluation |
| `meta/` | 4 | Meta-orchestrations composing others |

### Primitive System (Defined but Not Fully Implemented)

Four core primitives with three agentic levels each:

| Primitive | Purpose | Agentic Levels |
|-----------|---------|----------------|
| **Querying** | Search orchestration across sources | Prescriptive, Guided, Autonomous |
| **Filtering** | Quality control and relevance filtering | Prescriptive, Guided, Autonomous |
| **Aggregation** | Synthesize data from multiple sources | Prescriptive, Guided, Autonomous |
| **Reasoning** | Structured analysis and inference | Prescriptive, Guided, Autonomous |

### OrchestrationReasoning Tool (Defined but NOT Registered)

The types define a sophisticated 5-phase reasoning process:

1. **Phase 1: Need Analysis** - Decompose requirements, identify info types
2. **Phase 2: Context Assessment** - Evaluate constraints, minimax regret analysis
3. **Phase 3: Pattern Analysis** - Find similar orchestrations from 50+ templates
4. **Phase 4: Sequence Design** - Create primitive chain with checkpoints
5. **Phase 5: Validation** - Multi-agent consensus voting

**Critical Gap:** This tool is defined (`src/tools/orchestration/orchestrationReasoning.ts`) but never registered in the tool registry or server bootstrap.

---

## Part 3: Gap Analysis

### Critical Gaps

| Gap | Description | Impact |
|-----|-------------|--------|
| **OrchestrationReasoning Not Implemented** | Tool defined but never registered; no execution logic | Agents cannot auto-select or design research processes |
| **No Orchestration Discovery Tool** | No way to list/search available orchestrations | Agents can't review existing research templates |
| **No Pattern Matching Engine** | Types exist but no implementation to match prompts to templates | Agent must manually select orchestrations |
| **Tasks Not MCP-Compliant** | Deep research uses custom task patterns, not MCP Tasks spec | Not interoperable with MCP 2025-11-25 clients |
| **No Sampling with Tools** | Server doesn't utilize new sampling capability | Can't run internal agentic loops |
| **Primitives Not Executable** | Only markdown specifications exist | No actual primitive executor |

### Medium Gaps

| Gap | Description | Impact |
|-----|-------------|--------|
| **Session Persistence** | In-memory only; Supabase code unused | No cross-session learning |
| **Tool Naming** | Inconsistent (some use `.`, some use `_`) | May break interop with strict clients |
| **No Orchestration Execution Engine** | No dynamic primitive chaining | Must manually sequence tool calls |
| **No Quality Checkpoint Enforcement** | Defined but not enforced at runtime | No automatic quality gates |

### Minor Gaps

| Gap | Description | Impact |
|-----|-------------|--------|
| **No Test Suite** | Manual testing only | Risk when making changes |
| **Limited Error Recovery** | Basic retry only | No graceful degradation |
| **No Rate Limiting** | No per-request limits | Risk of API exhaustion |

---

## Part 4: Improvement Proposals

### Proposal 1: Implement Orchestration Discovery Tool

**Priority:** Critical
**Effort:** Medium

Create a tool that allows agents to browse and search available orchestrations.

```typescript
// New tool: orchestration_discovery
server.tool(
  "orchestration_discovery",
  "List and search available research orchestration templates",
  {
    domain: z.enum([
      "business-market-intelligence",
      "competitive-analysis-strategy",
      "knowledge-academic-research",
      "social-media-community-insights",
      "technical-developer-research",
      "meta",
      "all"
    ]).optional(),
    search_query: z.string().optional(),
    complexity: z.enum(["low", "medium", "high"]).optional(),
  },
  async ({ domain, search_query, complexity }) => {
    // Read orchestration files from src/resources/orchestrations/
    // Return filtered list with metadata
  }
);
```

**Expected Output:**
```json
{
  "orchestrations": [
    {
      "id": "comprehensive-company-profile",
      "domain": "business-market-intelligence",
      "complexity": "high",
      "description": "Complete company analysis including financials, leadership, culture",
      "primitives": ["querying", "aggregation", "reasoning"],
      "required_tools": ["company_research_exa", "web_search_exa", "linkedin_search_exa"],
      "estimated_duration": "2-5 minutes"
    }
  ]
}
```

### Proposal 2: Implement Orchestration Matcher Tool

**Priority:** Critical
**Effort:** High

Create a tool that matches user prompts to appropriate orchestration templates.

```typescript
// New tool: orchestration_matcher
server.tool(
  "orchestration_matcher",
  "Match a user prompt to the most appropriate research orchestration(s)",
  {
    user_prompt: z.string().describe("The user's research request"),
    context: z.object({
      domain_hints: z.array(z.string()).optional(),
      time_constraint: z.string().optional(),
      quality_preference: z.enum(["fast", "balanced", "thorough"]).optional(),
    }).optional(),
  },
  async ({ user_prompt, context }) => {
    // 1. Extract intent and entities from prompt
    // 2. Score against orchestration templates
    // 3. Return ranked matches with confidence
  }
);
```

**Expected Output:**
```json
{
  "matches": [
    {
      "orchestration_id": "competitor-landscape-analysis",
      "confidence": 0.87,
      "match_reasons": [
        "Prompt mentions 'competitors'",
        "Asks for comparison",
        "Business domain context"
      ],
      "adaptations_needed": [
        "Focus on SaaS industry specifically"
      ]
    }
  ],
  "recommendation": "Use 'competitor-landscape-analysis' with industry filter",
  "no_match_alternative": "If no match fits, use 'orchestration_designer' to create custom"
}
```

### Proposal 3: Complete OrchestrationReasoning Implementation

**Priority:** Critical
**Effort:** High

Register and implement the orchestration reasoning tool for designing custom research processes.

```typescript
// Register in src/tools/registry.ts
{
  id: "orchestration_reasoning",
  category: "orchestration",
  register: registerOrchestrationReasoningTool,
}

// Implementation with 5-phase reasoning
export function registerOrchestrationReasoningTool(server: McpServer) {
  server.tool(
    "orchestration_reasoning",
    "Design a custom research orchestration through game-theoretic reasoning",
    OrchestrationReasoningInputSchema,
    async (input) => {
      // Phase 1: Need Analysis
      const needAnalysis = analyzeInformationNeed(input.information_need);

      // Phase 2: Context Assessment
      const contextAssessment = assessContext(input.context, needAnalysis);

      // Phase 3: Pattern Analysis
      const patternAnalysis = await analyzePatterns(needAnalysis, contextAssessment);

      // Phase 4: Sequence Design
      const sequenceDesign = designPrimitiveSequence(patternAnalysis, input.agentic_level);

      // Phase 5: Validation
      const validation = validateWithConsensus(sequenceDesign);

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            reasoning_chain: { ... },
            execution_plan: { ... },
            tool_execution_guide: { ... }
          }, null, 2)
        }]
      };
    }
  );
}
```

### Proposal 4: Implement MCP 2025-11-25 Tasks Compliance

**Priority:** High
**Effort:** Medium

Refactor deep research to use MCP-compliant Tasks primitive.

```typescript
// Update deep research to use MCP Tasks
// Before: Custom task_id pattern
// After: MCP Tasks with proper state machine

server.tool(
  "deep_research.start",
  "Start deep research task (MCP Tasks compliant)",
  { ... },
  async ({ query, budgets }) => {
    // Return MCP-compliant task structure
    return {
      content: [...],
      _meta: {
        task: {
          id: taskId,
          state: "working", // MCP TaskState
          progress: { current: 0, total: estimatedSteps },
          cancelable: true,
        }
      }
    };
  }
);

// Add notifications/progress handler
server.setNotificationHandler("tasks/progress", (params) => {
  // Handle progress updates per MCP spec
});
```

### Proposal 5: Implement Unified Research Router

**Priority:** High
**Effort:** Medium

Create a single entry point that routes research requests to appropriate workflows.

```typescript
server.tool(
  "research",
  "Unified research entry point - automatically routes to appropriate workflow",
  {
    prompt: z.string().describe("Your research question or objective"),
    mode: z.enum(["auto", "light", "deep", "custom"]).default("auto"),
    constraints: z.object({
      max_time_seconds: z.number().optional(),
      max_cost_usd: z.number().optional(),
      quality: z.enum(["scout", "balanced", "thorough"]).optional(),
    }).optional(),
  },
  async ({ prompt, mode, constraints }) => {
    if (mode === "auto") {
      // 1. Try to match existing orchestration
      const match = await matchOrchestration(prompt);

      if (match.confidence > 0.8) {
        // Execute matched orchestration
        return executeOrchestration(match.orchestration_id, prompt, constraints);
      }

      // 2. Analyze complexity
      const complexity = analyzeComplexity(prompt);

      if (complexity.score < 0.3) {
        // Simple query → Light research
        return executeLightResearch(prompt, constraints);
      } else if (complexity.score < 0.7) {
        // Moderate → Matched orchestration or light with more depth
        return executeMediumResearch(prompt, match.best_template, constraints);
      } else {
        // Complex → Design custom orchestration or deep research
        return executeDeepResearch(prompt, constraints);
      }
    }

    // Explicit mode handling
    switch (mode) {
      case "light": return executeLightResearch(prompt, constraints);
      case "deep": return executeDeepResearch(prompt, constraints);
      case "custom": return designAndExecuteCustom(prompt, constraints);
    }
  }
);
```

### Proposal 6: Add Sampling with Tools Support

**Priority:** Medium
**Effort:** High

Leverage MCP 2025-11-25 Sampling with Tools for internal agent loops.

```typescript
// Server-side agentic loop using sampling
async function executeOrchestration(orchestrationId: string, prompt: string) {
  const orchestration = loadOrchestration(orchestrationId);

  for (const phase of orchestration.phases) {
    // Use sampling to let client's model decide on details
    const samplingResult = await server.sampling.create({
      messages: [{
        role: "user",
        content: `Execute phase: ${phase.name}\nContext: ${prompt}\nAvailable tools: ${phase.tools.join(", ")}`
      }],
      tools: phase.tools.map(t => getToolDefinition(t)),
      max_tokens: 4096,
    });

    // Process sampling result with tool calls
    await processToolCalls(samplingResult.tool_calls);
  }
}
```

### Proposal 7: Implement Primitive Executor

**Priority:** Medium
**Effort:** High

Create an execution engine for the primitive system.

```typescript
// New: Primitive executor
export class PrimitiveExecutor {
  async execute(
    primitive: 'querying' | 'filtering' | 'aggregation' | 'reasoning',
    strategy: PrimitiveStrategy,
    agenticLevel: 'prescriptive' | 'guided' | 'autonomous'
  ): Promise<PrimitiveResult> {

    switch (primitive) {
      case 'querying':
        return this.executeQuerying(strategy, agenticLevel);
      case 'filtering':
        return this.executeFiltering(strategy, agenticLevel);
      case 'aggregation':
        return this.executeAggregation(strategy, agenticLevel);
      case 'reasoning':
        return this.executeReasoning(strategy, agenticLevel);
    }
  }

  private async executeQuerying(
    strategy: PrimitiveStrategy,
    level: string
  ): Promise<PrimitiveResult> {
    const sources = strategy.sources || { primary: ['web_search_exa'] };

    if (level === 'prescriptive') {
      // Execute all sources in order
      return this.sequentialSearch(sources);
    } else if (level === 'guided') {
      // Execute primary, adapt based on results
      return this.adaptiveSearch(sources);
    } else {
      // Full autonomy - discover implicit needs
      return this.autonomousSearch(strategy);
    }
  }
}
```

### Proposal 8: Standardize Tool Naming (SEP-986 Compliance)

**Priority:** Low
**Effort:** Low

Rename tools to follow MCP canonical format.

```typescript
// Current (inconsistent)
"light_research.design_plan"  // dot notation
"web_search_exa"              // underscore notation

// Proposed (SEP-986 compliant)
// Option A: All underscores
"light_research_design_plan"
"web_search_exa"

// Option B: All dots with namespace prefix
"research.light.design_plan"
"search.web.exa"
```

**Recommendation:** Use Option A (underscores) as it's more widely compatible and closer to current naming.

---

## Part 5: Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
Enable agents to discover and match orchestrations.

| Task | Priority | Effort |
|------|----------|--------|
| Implement `orchestration_discovery` tool | Critical | 3 days |
| Implement `orchestration_matcher` tool | Critical | 5 days |
| Add orchestration metadata parsing | High | 2 days |

### Phase 2: Reasoning Engine (Weeks 3-4)
Complete the orchestration reasoning implementation.

| Task | Priority | Effort |
|------|----------|--------|
| Register `orchestration_reasoning` tool | Critical | 1 day |
| Implement Phase 1-2 (Need/Context Analysis) | High | 3 days |
| Implement Phase 3 (Pattern Analysis) | High | 3 days |
| Implement Phase 4-5 (Sequence/Validation) | High | 3 days |

### Phase 3: MCP Compliance (Weeks 5-6)
Align with MCP 2025-11-25 specification.

| Task | Priority | Effort |
|------|----------|--------|
| Refactor deep research for MCP Tasks | High | 3 days |
| Add sampling with tools support | Medium | 5 days |
| Standardize tool naming | Low | 1 day |

### Phase 4: Execution Engine (Weeks 7-8)
Implement dynamic primitive execution.

| Task | Priority | Effort |
|------|----------|--------|
| Implement PrimitiveExecutor class | Medium | 5 days |
| Add quality checkpoint enforcement | Medium | 3 days |
| Create unified research router | High | 2 days |

---

## Part 6: Proposed Agent Interaction Flow

### Target Experience

```
Agent receives prompt: "Research the competitive landscape for AI code assistants"

1. Agent calls: orchestration_discovery(domain: "all", search_query: "competitive")
   → Returns list of relevant orchestrations

2. Agent calls: orchestration_matcher(user_prompt: "Research competitive landscape...")
   → Returns: { matches: [{ id: "competitor-landscape-analysis", confidence: 0.92 }] }

3. Agent decides to use matched orchestration:
   Agent calls: research(prompt: "...", mode: "auto")
   → Server internally executes competitor-landscape-analysis orchestration
   → Returns comprehensive competitive analysis

OR if no match:

3. Agent calls: orchestration_reasoning(
     information_need: "Competitive landscape for AI code assistants",
     context: { domain: "technology", complexity: "high" }
   )
   → Returns custom orchestration plan with primitive sequence

4. Agent executes returned plan using individual tools or:
   Agent calls: research(prompt: "...", mode: "custom")
   → Server executes designed orchestration
```

### Key Benefits

1. **Self-Service Discovery**: Agents can explore available research templates
2. **Intelligent Matching**: Prompts automatically route to appropriate workflows
3. **Custom Design**: When no template fits, agent can design custom orchestrations
4. **Unified Entry Point**: Single `research` tool handles routing complexity
5. **MCP Compliance**: Works with any MCP 2025-11-25 compliant client

---

## Appendix A: Orchestration Domains Reference

### Business & Market Intelligence
| Orchestration | Use Case |
|--------------|----------|
| comprehensive-company-profile | Full company analysis |
| market-sizing-analysis | TAM/SAM/SOM estimation |
| industry-trend-tracker | Sector trends and forecasts |
| regulatory-impact-assessment | Policy and regulation analysis |

### Competitive Analysis
| Orchestration | Use Case |
|--------------|----------|
| competitor-landscape-analysis | Market positioning |
| swot-analysis | Strengths/Weaknesses/Opportunities/Threats |
| feature-comparison-matrix | Product capability comparison |
| pricing-strategy-analysis | Competitive pricing research |

### Academic & Knowledge
| Orchestration | Use Case |
|--------------|----------|
| literature-review | Academic paper synthesis |
| fact-checking-verification | Claim verification |
| knowledge-gap-analysis | Research opportunity identification |

### Social & Community
| Orchestration | Use Case |
|--------------|----------|
| sentiment-trend-analysis | Public opinion tracking |
| influencer-landscape | Key voices in a topic |
| viral-content-patterns | Content trend analysis |

### Technical Research
| Orchestration | Use Case |
|--------------|----------|
| api-comparison | Technical capability comparison |
| framework-evaluation | Technology selection |
| security-vulnerability-research | Security posture analysis |

---

## Appendix B: MCP 2025-11-25 Specification References

- **Specification Home:** https://modelcontextprotocol.io/specification/2025-11-25
- **Tasks (SEP-1686):** Async operations with state machine
- **Sampling with Tools (SEP-1577):** Server-side agentic loops
- **Tool Naming (SEP-986):** Canonical naming format
- **Authorization (SEP-1046, SEP-990):** Enhanced enterprise auth

---

## Conclusion

The Research Orchestration System has a solid conceptual foundation with 50+ pre-built orchestrations, a well-designed primitive system, and sophisticated type definitions for game-theoretic reasoning. However, several critical components are defined but not implemented:

1. **OrchestrationReasoning** - The brain of the system is defined but not registered
2. **Orchestration Discovery/Matching** - No tools to help agents find or select templates
3. **MCP 2025-11-25 Compliance** - Missing Tasks and Sampling with Tools support
4. **Unified Entry Point** - No router to guide agents to appropriate workflows

Implementing the proposals in this document would transform the server from a collection of search tools into a true **research orchestration platform** that agents can use intelligently to:

- Review available research processes
- Match prompts to appropriate templates
- Design custom processes when needed
- Execute complex multi-step research workflows

The recommended approach is to prioritize **Proposals 1-3** (Discovery, Matcher, OrchestrationReasoning) to enable the core agent interaction pattern, then proceed with MCP compliance and execution engine improvements.
