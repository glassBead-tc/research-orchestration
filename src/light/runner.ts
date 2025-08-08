import * as Effect from "effect/Effect";
import * as Schedule from "effect/Schedule";
import * as Fiber from "effect/Fiber";
import * as Duration from "effect/Duration";
import * as Context from "effect/Context";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import axios from "axios";
import { LightPlan } from "./plan.js";

export interface RunnerMetrics {
  startedAt: number;
  finishedAt?: number;
  timeToSignalMs?: number;
  searchCallCount: number;
  uniqueDomains: number;
  estimatedCostUsd: number;
  logs: string[];
}

export interface SearchResultLite {
  id: string;
  title: string;
  url: string;
  text?: string;
  publishedDate?: string;
  score?: number;
}

export interface RunnerEnv {
  exaApiKey: string;
  baseUrl: string;
}

export const RunnerEnv = Context.Tag<RunnerEnv>("RunnerEnv");

const log = (metrics: RunnerMetrics, msg: string) => {
  metrics.logs.push(msg);
};

const exaSearch = (q: string, kind: "fast" | "auto", limit: number) =>
  Effect.gen(function* () {
    const env = yield* RunnerEnv;
    const client = axios.create({
      baseURL: env.baseUrl,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key": env.exaApiKey,
      },
      timeout: 15000,
    });

    const body = {
      query: q,
      type: kind,
      numResults: limit,
      contents: {
        text: { maxCharacters: 1200 },
        livecrawl: "fallback" as const,
      },
    };

    const resp = yield* Effect.tryPromise({
      try: () => client.post("/search", body),
      catch: (e) => e as Error,
    });

    const results: SearchResultLite[] = (resp.data?.results ?? []).map((r: any) => ({
      id: r.id,
      title: r.title,
      url: r.url,
      text: r.text,
      publishedDate: r.publishedDate,
      score: r.score,
    }));

    return results;
  });

const retryPolicy = Schedule.exponential(Duration.millis(200)).pipe(
  Schedule.compose(Schedule.recurs(2))
);

export interface RunOutput {
  mode: "light";
  query: string;
  links: Array<Pick<SearchResultLite, "title" | "url" | "publishedDate">>;
  summary?: string;
  metrics: RunnerMetrics;
}

export function runLightPlan(plan: LightPlan): Effect.Effect<RunOutput, Error, RunnerEnv> {
  return Effect.gen(function* () {
    const metrics: RunnerMetrics = {
      startedAt: Date.now(),
      searchCallCount: 0,
      uniqueDomains: 0,
      estimatedCostUsd: 0,
      logs: [],
    };

    const concurrency = Math.max(1, plan.budgets.concurrency);

    log(metrics, `Plan ${plan.id} started with concurrency ${concurrency}`);

    // 1) generate queries (simple heuristic for now)
    const queries = [plan.query].concat(plan.query.length > 40 ? [] : [
      `${plan.query} overview`,
      `${plan.query} latest news`,
    ]).slice(0, plan.budgets.maxSearchCalls);

    // 2) search concurrently with bounded concurrency
    const searchEffects = queries.map((q) =>
      Effect.withLogSpan(`search:${q}`)(
        Effect.retry(exaSearch(q, (plan.steps.find(s => s.type === "search" && s.params?.kind === "auto") ? "auto" : "fast"), 5), retryPolicy).pipe(
          Effect.map((res) => {
            metrics.searchCallCount += 1;
            return res;
          })
        )
      )
    );

    const allResults = yield* Effect.all(searchEffects, {
      concurrency,
      mode: "either",
    });

    // accumulate successes
    const flattened = allResults.flatMap((e) => ("_tag" in e && e._tag === "Left") ? [] : (e as any).right);

    // 3) dedup by URL
    const seen = new Set<string>();
    const deduped = flattened.filter((r) => {
      if (seen.has(r.url)) return false;
      seen.add(r.url);
      return true;
    });

    // 4) compute TTS (first signal when we have any result)
    metrics.timeToSignalMs = Date.now() - metrics.startedAt;

    // 5) simple summary placeholder (LLM can be integrated later)
    const links = deduped.slice(0, 8).map((r) => ({
      title: r.title,
      url: r.url,
      publishedDate: r.publishedDate,
    }));

    // compute unique domains
    const domains = new Set<string>();
    for (const l of links) {
      try {
        const u = new URL(l.url);
        domains.add(u.hostname.replace(/^www\./, ""));
      } catch {}
    }
    metrics.uniqueDomains = domains.size;

    metrics.finishedAt = Date.now();

    return {
      mode: "light" as const,
      query: plan.query,
      links,
      summary: undefined,
      metrics,
    };
  }).pipe(
    Effect.timeoutFail({ onTimeout: () => new Error("Light plan timed out") }, plan.budgets.maxLatencyMs)
  );
}