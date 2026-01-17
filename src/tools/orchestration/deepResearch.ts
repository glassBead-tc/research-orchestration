import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { startDeepTask, getDeepTask, cancelDeepTask } from "../../deep/taskManager.js";

export function registerDeepResearchTools(server: McpServer, config?: { exaApiKey?: string; baseUrl?: string }) {
  // Start a deep research task (asynchronous)
  // MCP 2025-11-25 Tasks compliant
  server.tool(
    "deep_research.start",
    `Start an asynchronous Deep Research task.

Returns a task_id for polling with deep_research.check.
This tool is MCP 2025-11-25 Tasks compliant with states: working, completed, failed, cancelled.

Use this for complex research queries that require:
- Multiple search passes
- Cross-referencing sources
- Synthesis and analysis`,
    {
      query: z.string().describe("The research query or question to investigate"),
      schema: z.string().optional().describe("Reserved for future structured objectives"),
      budgets: z
        .object({
          maxLatencyMs: z.number().default(60000).optional().describe("Maximum time in milliseconds"),
          maxCostUsd: z.number().default(0.5).optional().describe("Maximum cost in USD"),
          maxSearchCalls: z.number().default(50).optional().describe("Maximum number of search API calls"),
          concurrency: z.number().default(5).optional().describe("Maximum concurrent requests"),
        })
        .optional()
        .describe("Budget constraints for the research task"),
    },
    async ({ query, budgets }) => {
      const task = startDeepTask({
        query,
        budgets: budgets ?? {},
        exaApiKey: config?.exaApiKey,
        baseUrl: config?.baseUrl,
      });

      // MCP 2025-11-25 compliant response with task metadata
      const response = {
        task_id: task.id,
        status: task.status,
        mcp_task: {
          id: task.id,
          state: task.mcpState,
          progress: task.progress,
          cancelable: task.cancelable,
        },
        message: "Deep research task started. Poll with deep_research.check to get results.",
      };

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(response, null, 2),
          },
        ],
      };
    }
  );

  // Poll a deep research task
  server.tool(
    "deep_research.check",
    `Check the status of a Deep Research task.

Returns:
- Task state (working, completed, failed, cancelled)
- Progress information (current step, total steps, message)
- Results when completed (answer, citations, metrics)

Poll this endpoint until mcpState is 'completed' or 'failed'.`,
    {
      task_id: z.string().describe("The task ID returned by deep_research.start"),
    },
    async ({ task_id }) => {
      const task = getDeepTask(task_id);
      if (!task) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify({
                error: "Task not found",
                task_id,
                suggestion: "The task may have expired or the ID is incorrect",
              }, null, 2),
            },
          ],
          isError: true,
        };
      }

      // MCP 2025-11-25 compliant response
      const response = {
        task_id: task.id,
        query: task.query,
        mcp_task: {
          state: task.mcpState,
          progress: task.progress,
          cancelable: task.cancelable && task.mcpState === "working",
        },
        timing: {
          started_at: new Date(task.startedAt).toISOString(),
          finished_at: task.finishedAt ? new Date(task.finishedAt).toISOString() : null,
          duration_ms: task.finishedAt ? task.finishedAt - task.startedAt : Date.now() - task.startedAt,
        },
        // Include results only when completed
        ...(task.mcpState === "completed" && {
          result: {
            answer: task.answer,
            citations: task.citations,
            metrics: task.metrics,
          },
        }),
        // Include error only when failed
        ...(task.mcpState === "failed" && {
          error: task.error,
        }),
        // Legacy status for backwards compatibility
        legacy_status: task.status,
      };

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(response, null, 2),
          },
        ],
      };
    }
  );

  // Cancel a deep research task
  server.tool(
    "deep_research.cancel",
    `Cancel a running Deep Research task.

Only tasks in 'working' state can be cancelled.
Returns success status and final task state.`,
    {
      task_id: z.string().describe("The task ID to cancel"),
    },
    async ({ task_id }) => {
      const success = cancelDeepTask(task_id);
      const task = getDeepTask(task_id);

      if (!task) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify({
                success: false,
                error: "Task not found",
                task_id,
              }, null, 2),
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({
              success,
              task_id: task.id,
              mcp_task: {
                state: task.mcpState,
                message: success ? "Task cancelled successfully" : "Task could not be cancelled (already completed or failed)",
              },
            }, null, 2),
          },
        ],
      };
    }
  );
}
