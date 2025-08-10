import { z } from "zod";

const EnvSchema = z.object({
  EXA_API_KEY: z.string().min(1, "EXA_API_KEY is required").optional(),
  YOUTUBE_API_KEY: z.string().optional(),
  DISABLE_THOUGHT_LOGGING: z.string().optional(),
});

export type AppConfig = {
  exaApiKey?: string;
  youtubeApiKey?: string;
  disableThoughtLogging: boolean;
  selectedTools: Set<string>;
};

function parseSelectedToolsFromArgv(argv: string[]): Set<string> {
  const toolsArg = argv.find((arg) => arg.startsWith("--tools="));
  if (!toolsArg) return new Set();
  const list = toolsArg.split("=", 2)[1] ?? "";
  return new Set(
    list
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
  );
}

export function loadConfig(): AppConfig {
  // Load dotenv in non-production environments if available
  try {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("dotenv").config();
    }
  } catch {
    // dotenv is optional; ignore if not installed
  }

  const env = EnvSchema.parse(process.env);
  const selectedTools = parseSelectedToolsFromArgv(process.argv);

  return {
    exaApiKey: env.EXA_API_KEY,
    youtubeApiKey: env.YOUTUBE_API_KEY,
    disableThoughtLogging: (env.DISABLE_THOUGHT_LOGGING || "").toLowerCase() === "true",
    selectedTools,
  };
}