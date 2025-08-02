import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const orchestrationReasoning: Tool = {
  name: "orchestration_reasoning",
  description: `Design custom retrieval orchestrations through sequential reasoning.
  
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
  inputSchema: {
    type: "object",
    properties: {
      thought: {
        type: "string",
        description: "The thought content"
      },
      thoughtNumber: {
        type: "number",
        description: "Current thought number in sequence"
      },
      totalThoughts: {
        type: "number",
        description: "Total expected thoughts in sequence"
      },
      nextThoughtNeeded: {
        type: "boolean",
        description: "Whether the next thought is needed"
      },
      isRevision: {
        type: "boolean",
        description: "Whether this is a revision of a previous thought"
      },
      revisesThought: {
        type: "number",
        description: "Which thought number this revises"
      },
      branchFromThought: {
        type: "number",
        description: "Which thought this branches from"
      },
      branchId: {
        type: "string",
        description: "Unique identifier for this branch"
      },
      needsMoreThoughts: {
        type: "boolean",
        description: "Whether more thoughts are needed"
      }
    },
    required: ["thought", "thoughtNumber", "totalThoughts", "nextThoughtNeeded"]
  }
};