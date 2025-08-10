import axios from "axios";

export interface DeepBudgets {
  maxLatencyMs?: number;
  maxCostUsd?: number;
  maxSearchCalls?: number;
  concurrency?: number;
}

export interface DeepTask {
  id: string;
  query: string;
  status: "pending" | "running" | "complete" | "failed";
  startedAt: number;
  finishedAt?: number;
  answer?: string;
  citations?: Array<{ title: string; url: string; publishedDate?: string; weight?: number }>;
  metrics?: {
    searchCallCount: number;
    uniqueDomains: number;
    estimatedCostUsd?: number;
    logs: string[];
  };
  error?: string;
}

interface StartArgs {
  query: string;
  budgets: DeepBudgets;
}

const tasks = new Map<string, DeepTask>();

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function runDeep(task: DeepTask, budgets: DeepBudgets) {
  task.status = "running";
  const logs: string[] = [];
  const started = Date.now();

  const axiosInstance = axios.create({
    baseURL: "https://api.exa.ai",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-api-key": process.env.EXA_API_KEY || "",
    },
    timeout: Math.min(60000, budgets.maxLatencyMs ?? 60000),
  });

  try {
    const queries: string[] = [task.query, `${task.query} overview`, `${task.query} recent developments`].slice(
      0,
      Math.max(1, Math.min(5, budgets.maxSearchCalls ?? 5))
    );

    logs.push(`Deep: starting ${queries.length} searches`);

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

    const citations = dedup.slice(0, 12).map((r, idx) => ({
      title: r.title,
      url: r.url,
      publishedDate: r.publishedDate,
      weight:
        typeof r.score === "number" && Number.isFinite(r.score)
          ? Math.max(0.1, Math.min(1, r.score / 10))
          : Math.max(0.1, 1 - idx * 0.05),
    }));

    // Simple stub answer leveraging citations
    const answer = [
      `# Deep Research Result`,
      `Query: ${task.query}`,
      `\nKey sources:`,
    ]
      .concat(citations.slice(0, 5).map((c, i) => `- [${i + 1}] ${c.title} (${c.url})`))
      .concat(["\nNote: This is a stub synthesis. A full multi-pass reasoning loop will be added in a later sprint."]) // placeholder per spec
      .join("\n");

    task.answer = answer;
    task.citations = citations;
    task.metrics = {
      searchCallCount: queries.length,
      uniqueDomains: domains.size,
      estimatedCostUsd: 0,
      logs,
    };
    task.status = "complete";
    task.finishedAt = Date.now();
  } catch (err) {
    task.status = "failed";
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
    startedAt: Date.now(),
  };
  tasks.set(id, task);
  // Fire-and-forget
  runDeep(task, args.budgets).catch(() => void 0);
  return task;
}

export function getDeepTask(id: string): DeepTask | undefined {
  return tasks.get(id);
}