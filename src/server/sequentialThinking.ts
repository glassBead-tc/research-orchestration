import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import chalk from "chalk";

interface ThoughtData {
  thought: string;
  thoughtNumber: number;
  totalThoughts: number;
  isRevision?: boolean;
  revisesThought?: number;
  branchFromThought?: number;
  branchId?: string;
  needsMoreThoughts?: boolean;
  nextThoughtNeeded: boolean;
}

class SequentialThinkingServer {
  private thoughtHistory: ThoughtData[] = [];
  private branches: Record<string, ThoughtData[]> = {};
  private disableThoughtLogging: boolean;

  constructor(disableThoughtLogging: boolean) {
    this.disableThoughtLogging = disableThoughtLogging;
  }

  private validateThoughtData(input: unknown): ThoughtData {
    const data = input as Record<string, unknown>;

    if (!data.thought || typeof data.thought !== "string") {
      throw new Error("Invalid thought: must be a string");
    }
    if (!data.thoughtNumber || typeof data.thoughtNumber !== "number") {
      throw new Error("Invalid thoughtNumber: must be a number");
    }
    if (!data.totalThoughts || typeof data.totalThoughts !== "number") {
      throw new Error("Invalid totalThoughts: must be a number");
    }
    if (typeof data.nextThoughtNeeded !== "boolean") {
      throw new Error("Invalid nextThoughtNeeded: must be a boolean");
    }

    return {
      thought: data.thought,
      thoughtNumber: data.thoughtNumber,
      totalThoughts: data.totalThoughts,
      nextThoughtNeeded: data.nextThoughtNeeded,
      isRevision: data.isRevision as boolean | undefined,
      revisesThought: data.revisesThought as number | undefined,
      branchFromThought: data.branchFromThought as number | undefined,
      branchId: data.branchId as string | undefined,
      needsMoreThoughts: data.needsMoreThoughts as boolean | undefined,
    };
  }

  private formatThought(thoughtData: ThoughtData): string {
    const { thoughtNumber, totalThoughts, thought, isRevision, revisesThought, branchFromThought, branchId } = thoughtData;

    let prefix = "";
    let context = "";

    if (isRevision) {
      prefix = chalk.yellow("🔄 Revision");
      context = ` (revising thought ${revisesThought})`;
    } else if (branchFromThought) {
      prefix = chalk.green("🌿 Branch");
      context = ` (from thought ${branchFromThought}, ID: ${branchId})`;
    } else {
      prefix = chalk.blue("💭 Thought");
      context = "";
    }

    const header = `${prefix} ${thoughtNumber}/${totalThoughts}${context}`;
    const border = "─".repeat(Math.max(header.length, thought.length) + 4);

    return `
┌${border}┐
│ ${header} │
├${border}┤
│ ${thought.padEnd(border.length - 2)} │
└${border}┘`;
  }

  public processThought(input: unknown): { content: Array<{ type: string; text: string }>; isError?: boolean } {
    try {
      const validatedInput = this.validateThoughtData(input);

      if (validatedInput.thoughtNumber > validatedInput.totalThoughts) {
        validatedInput.totalThoughts = validatedInput.thoughtNumber;
      }

      this.thoughtHistory.push(validatedInput);

      if (validatedInput.branchFromThought && validatedInput.branchId) {
        if (!this.branches[validatedInput.branchId]) {
          this.branches[validatedInput.branchId] = [];
        }
        this.branches[validatedInput.branchId].push(validatedInput);
      }

      if (!this.disableThoughtLogging) {
        const formattedThought = this.formatThought(validatedInput);
        console.error(formattedThought);
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                thoughtNumber: validatedInput.thoughtNumber,
                totalThoughts: validatedInput.totalThoughts,
                nextThoughtNeeded: validatedInput.nextThoughtNeeded,
                branches: Object.keys(this.branches),
                thoughtHistoryLength: this.thoughtHistory.length,
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                error: error instanceof Error ? error.message : String(error),
                status: "failed",
              },
              null,
              2
            ),
          },
        ],
        isError: true,
      };
    }
  }
}

const SequentialThinkingInput = z.object({
  thought: z.string().describe("Your current thinking step"),
  nextThoughtNeeded: z.boolean().describe("Whether another thought step is needed"),
  thoughtNumber: z.number().int().min(1).describe("Current thought number"),
  totalThoughts: z.number().int().min(1).describe("Estimated total thoughts needed"),
  isRevision: z.boolean().optional().describe("Whether this revises previous thinking"),
  revisesThought: z.number().int().min(1).optional().describe("Which thought is being reconsidered"),
  branchFromThought: z.number().int().min(1).optional().describe("Branching point thought number"),
  branchId: z.string().optional().describe("Branch identifier"),
  needsMoreThoughts: z.boolean().optional().describe("If more thoughts are needed"),
});

export function registerSequentialThinkingTool(server: McpServer, disableThoughtLogging: boolean): void {
  const thinkingServer = new SequentialThinkingServer(disableThoughtLogging);

  server.tool(
    "sequentialthinking",
    "Dynamic and reflective problem-solving through a sequence of thoughts.",
    {
      thought: SequentialThinkingInput.shape.thought,
      nextThoughtNeeded: SequentialThinkingInput.shape.nextThoughtNeeded,
      thoughtNumber: SequentialThinkingInput.shape.thoughtNumber,
      totalThoughts: SequentialThinkingInput.shape.totalThoughts,
      isRevision: SequentialThinkingInput.shape.isRevision,
      revisesThought: SequentialThinkingInput.shape.revisesThought,
      branchFromThought: SequentialThinkingInput.shape.branchFromThought,
      branchId: SequentialThinkingInput.shape.branchId,
      needsMoreThoughts: SequentialThinkingInput.shape.needsMoreThoughts,
    },
    async (args, _extra) => {
      return thinkingServer.processThought(args) as any;
    }
  );
}