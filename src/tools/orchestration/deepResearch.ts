import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { startDeepTask, getDeepTask } from "../../deep/taskManager.js";

export function registerDeepResearchTools(server: McpServer, _config?: { exaApiKey?: string; baseUrl?: string }) {
  // Start a deep research task (asynchronous)
  server.tool(
    "deep_research.start",
    "Start an asynchronous Deep Research task. Returns a task_id to poll.",
    {
      query: z.string(),
      schema: z.string().optional().describe("Reserved for future structured objectives"),
      budgets: z
        .object({
          maxLatencyMs: z.number().default(60000).optional(),
          maxCostUsd: z.number().default(0.5).optional(),
          maxSearchCalls: z.number().default(50).optional(),
          concurrency: z.number().default(5).optional(),
        })
        .optional(),
    },
    async ({ query, budgets }) => {
      const task = startDeepTask({ query, budgets: budgets ?? {} });
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ task_id: task.id, status: task.status }, null, 2),
          },
        ],
      };
    }
  );

  // Poll a deep research task
  server.tool(
    "deep_research.check",
    "Check the status of a Deep Research task by id.",
    {
      task_id: z.string(),
    },
    async ({ task_id }) => {
      const task = getDeepTask(task_id);
      if (!task) {
        return {
          content: [
            { type: "text" as const, text: `Task not found: ${task_id}` },
          ],
          isError: true,
        };
      }
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(task, null, 2),
          },
        ],
      };
    }
  );
}