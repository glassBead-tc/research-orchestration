import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerOrchestrationReasoningTool(server: McpServer): void {
  server.tool(
    "orchestration_reasoning",
    `Design custom retrieval orchestrations through sequential reasoning.

Available primitives to compose:
- querying: Search and gather information from various sources
- filtering: Apply quality control and relevance filtering
- aggregation: Synthesize and combine data from multiple sources
- reasoning: Perform structured analysis and draw conclusions

Process:
1. Analyze the information need and break it into components
2. Consider available tools and constraints (domain, complexity)
3. Reference existing orchestration patterns in src/resources/orchestrations/
4. Design a sequence of primitives that fulfills the need
5. Consider dependencies and parallelization opportunities

The output should be an orchestration plan that can be executed by calling the individual tools.`,
    {
      thought: { type: "string", description: "The thought content" },
      thoughtNumber: { type: "number", description: "Current thought number in sequence" },
      totalThoughts: { type: "number", description: "Total expected thoughts in sequence" },
      nextThoughtNeeded: { type: "boolean", description: "Whether the next thought is needed" },
      isRevision: { type: "boolean", description: "Whether this is a revision of a previous thought", optional: true },
      revisesThought: { type: "number", description: "Which thought number this revises", optional: true },
      branchFromThought: { type: "number", description: "Which thought this branches from", optional: true },
      branchId: { type: "string", description: "Unique identifier for this branch", optional: true },
      needsMoreThoughts: { type: "boolean", description: "Whether more thoughts are needed", optional: true }
    } as any,
    async (args) => {
      // For now, echo back the plan request. Real reasoning is expected client-side/agent-side.
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            message: "orchestration plan request received",
            planContext: args
          }, null, 2)
        }]
      };
    }
  );
}