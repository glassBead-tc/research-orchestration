import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from 'zod';

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
      thought: z.string().describe("The thought content"),
      thoughtNumber: z.number().int().min(1).describe("Current thought number in sequence"),
      totalThoughts: z.number().int().min(1).describe("Total expected thoughts in sequence"),
      nextThoughtNeeded: z.boolean().describe("Whether the next thought is needed"),
      isRevision: z.boolean().optional().describe("Whether this is a revision of a previous thought"),
      revisesThought: z.number().int().min(1).optional().describe("Which thought number this revises"),
      branchFromThought: z.number().int().min(1).optional().describe("Which thought this branches from"),
      branchId: z.string().optional().describe("Unique identifier for this branch"),
      needsMoreThoughts: z.boolean().optional().describe("Whether more thoughts are needed"),
    },
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