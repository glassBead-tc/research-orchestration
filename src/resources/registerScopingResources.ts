import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { readFileSync } from "fs";
import { join } from "path";

interface ResourceDef {
  uri: string;
  name: string;
  description: string;
  file: string;
}

const RESOURCES: ResourceDef[] = [
  {
    uri: "scoping://checklist",
    name: "Scoping Checklist",
    description: "Checklist to guide pre-orchestration scoping",
    file: "SCOPING_CHECKLIST.md",
  },
  {
    uri: "scoping://quality-rubric",
    name: "Plan Quality Rubric",
    description: "Rubric to assess an orchestration plan before execution",
    file: "PLAN_QUALITY_RUBRIC.md",
  },
  {
    uri: "scoping://deliverable-templates",
    name: "Deliverable Templates",
    description: "Templates for research briefs, evidence tables, and action plans",
    file: "DELIVERABLE_TEMPLATES.md",
  },
];

export function registerScopingResources(server: McpServer): void {
  for (const res of RESOURCES) {
    server.resource(
      res.uri,
      res.name,
      { description: res.description, mimeType: "text/markdown" },
      async () => {
        const fullPath = join(process.cwd(), "src", "resources", "scoping", res.file);
        let content = "";
        try {
          content = readFileSync(fullPath, "utf-8");
        } catch (err) {
          content = `Error loading ${res.file}: ${String(err)}`;
        }
        return { contents: [{ uri: res.uri, mimeType: "text/markdown", text: content }] };
      }
    );
  }
}