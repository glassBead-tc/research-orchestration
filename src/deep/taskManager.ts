import axios from "axios";

export interface DeepBudgets {
  maxLatencyMs?: number;
  maxCostUsd?: number;
  maxSearchCalls?: number;
  concurrency?: number;
}

/**
 * MCP 2025-11-25 Task State
 * @see https://modelcontextprotocol.io/specification/2025-11-25
 */
export type McpTaskState = "working" | "input_required" | "completed" | "failed" | "cancelled";

export interface DeepTask {
  id: string;
  query: string;
  /** @deprecated Use mcpState for MCP 2025-11-25 compliance */
  status: "pending" | "running" | "complete" | "failed";
  /** MCP 2025-11-25 compliant task state */
  mcpState: McpTaskState;
  startedAt: number;
  finishedAt?: number;
  /** Progress tracking for MCP Tasks */
  progress?: {
    current: number;
    total: number;
    message?: string;
  };
  answer?: string;
  citations?: Array<{ title: string; url: string; publishedDate?: string; weight?: number }>;
  metrics?: {
    searchCallCount: number;
    uniqueDomains: number;
    estimatedCostUsd?: number;
    logs: string[];
  };
  error?: string;
  /** Whether this task can be cancelled */
  cancelable: boolean;
}

interface StartArgs {
  query: string;
  budgets: DeepBudgets;
  // Optional configuration to allow server/tool-provided values
  exaApiKey?: string;
  baseUrl?: string;
}

const tasks = new Map<string, DeepTask>();

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function runDeep(
  task: DeepTask,
  budgets: DeepBudgets,
  config?: { exaApiKey?: string; baseUrl?: string }
) {
  task.status = "running";
  task.mcpState = "working";
  task.progress = { current: 0, total: 5, message: "Initializing deep research" };
  const logs: string[] = [];
  const started = Date.now();

  const axiosInstance = axios.create({
    baseURL: config?.baseUrl || process.env.EXA_BASE_URL || "https://api.exa.ai",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-api-key": config?.exaApiKey || process.env.EXA_API_KEY || "",
    },
    timeout: Math.min(60000, budgets.maxLatencyMs ?? 60000),
  });

  try {
    const queries: string[] = [task.query, `${task.query} overview`, `${task.query} recent developments`].slice(
      0,
      Math.max(1, Math.min(5, budgets.maxSearchCalls ?? 5))
    );

    logs.push(`Deep: starting ${queries.length} searches`);
    task.progress = { current: 1, total: 5, message: `Executing ${queries.length} search queries` };

    const doSearch = async (q: string) => {
      const resp = await axiosInstance.post("/search", {
        query: q,
        type: "auto",
        numResults: 6,
        contents: { text: { maxCharacters: 2000 }, livecrawl: "fallback" },
      });
      return (resp.data?.results ?? []).map((r: any) => ({
        title: r.title as string,
        url: r.url as string,
        publishedDate: r.publishedDate as string | undefined,
        score: r.score as number | undefined,
      }));
    };

    const concurrency = Math.max(1, Math.min(5, budgets.concurrency ?? 5));
    const results: Array<Awaited<ReturnType<typeof doSearch>>> = [];
    let successfulSearches = 0;
    const failedReasons: string[] = [];
    for (let i = 0; i < queries.length; i += concurrency) {
      const batch = queries.slice(i, i + concurrency);
      const batchResults = await Promise.allSettled(batch.map((q) => doSearch(q)));
      for (const br of batchResults) {
        if (br.status === "fulfilled") {
          results.push(br.value);
          successfulSearches += 1;
        } else {
          const reason = (br as PromiseRejectedResult).reason;
          const message = typeof reason === "object" && reason && "message" in reason ? String((reason as any).message) : String(reason);
          failedReasons.push(message);
          logs.push(`Deep: search failed: ${message}`);
        }
      }
    }

    if (successfulSearches === 0) {
      const uniqueReasons = Array.from(new Set(failedReasons.filter(Boolean)));
      throw new Error(`All searches failed${uniqueReasons.length ? ": " + uniqueReasons.slice(0, 3).join(" | ") : ""}`);
    }

    task.progress = { current: 2, total: 5, message: "Processing and deduplicating results" };

    const flat = results.flat();
    const dedup = [] as typeof flat;
    const seen = new Set<string>();
    for (const r of flat) {
      if (seen.has(r.url)) continue;
      seen.add(r.url);
      dedup.push(r);
    }

    const domains = new Set<string>();
    for (const r of dedup) {
      try {
        const u = new URL(r.url);
        domains.add(u.hostname.replace(/^www\./, ""));
      } catch {}
    }

    task.progress = { current: 3, total: 5, message: "Extracting and ranking citations" };

    const citations = dedup.slice(0, 12).map((r, idx) => ({
      title: r.title,
      url: r.url,
      publishedDate: r.publishedDate,
      weight:
        typeof r.score === "number" && Number.isFinite(r.score)
          ? Math.max(0.1, Math.min(1, r.score / 10))
          : Math.max(0.1, 1 - idx * 0.05),
    }));

    task.progress = { current: 4, total: 5, message: "Synthesizing answer from sources" };

    // Simple stub answer leveraging citations
    const answer = [
      `# Deep Research Result`,
      `Query: ${task.query}`,
      `\nKey sources:`,
    ]
      .concat(citations.slice(0, 5).map((c, i) => `- [${i + 1}] ${c.title} (${c.url})`))
      .concat(["\nNote: This is a stub synthesis. A full multi-pass reasoning loop will be added in a later sprint."]) // placeholder per spec
      .join("\n");

    task.progress = { current: 5, total: 5, message: "Research complete" };

    task.answer = answer;
    task.citations = citations;
    task.metrics = {
      searchCallCount: queries.length,
      uniqueDomains: domains.size,
      estimatedCostUsd: 0,
      logs,
    };
    task.status = "complete";
    task.mcpState = "completed";
    task.finishedAt = Date.now();
  } catch (err) {
    task.status = "failed";
    task.mcpState = "failed";
    task.error = err instanceof Error ? err.message : String(err);
    task.finishedAt = Date.now();
  } finally {
    const elapsed = Date.now() - started;
    if ((budgets.maxLatencyMs ?? 60000) - elapsed > 0) {
      // small delay to simulate async work and avoid tight loop polling
      await sleep(50);
    }
  }
}

export function startDeepTask(args: StartArgs): DeepTask {
  const id = `deep_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const task: DeepTask = {
    id,
    query: args.query,
    status: "pending",
    mcpState: "working",
    startedAt: Date.now(),
    cancelable: true,
    progress: { current: 0, total: 5, message: "Task queued" },
  };
  tasks.set(id, task);
  // Fire-and-forget
  runDeep(task, args.budgets, { exaApiKey: args.exaApiKey, baseUrl: args.baseUrl }).catch(() => void 0);
  return task;
}

/**
 * Cancel a running deep research task
 * @param id Task ID to cancel
 * @returns true if task was cancelled, false if not found or already completed
 */
export function cancelDeepTask(id: string): boolean {
  const task = tasks.get(id);
  if (!task) return false;
  if (task.mcpState === "completed" || task.mcpState === "failed" || task.mcpState === "cancelled") {
    return false;
  }
  task.status = "failed";
  task.mcpState = "cancelled";
  task.error = "Task cancelled by user";
  task.finishedAt = Date.now();
  return true;
}

export function getDeepTask(id: string): DeepTask | undefined {
  return tasks.get(id);
}