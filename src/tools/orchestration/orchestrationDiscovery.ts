import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Types for orchestration metadata
export interface OrchestrationMetadata {
  id: string;
  name: string;
  domain: string;
  complexity: "low" | "medium" | "high";
  description: string;
  requiredTools: string[];
  tags: string[];
  estimatedDuration: string;
  filePath: string;
}

// Cache for orchestration metadata
let orchestrationCache: OrchestrationMetadata[] | null = null;

/**
 * Parse orchestration file to extract metadata
 */
function parseOrchestrationFile(filePath: string, domain: string): OrchestrationMetadata | null {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const fileName = path.basename(filePath, ".md");

    // Try to parse YAML frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    let metadata: Partial<OrchestrationMetadata> = {};

    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      // Simple YAML parsing for key fields
      const idMatch = frontmatter.match(/id:\s*"?([^"\n]+)"?/);
      const nameMatch = frontmatter.match(/name:\s*"?([^"\n]+)"?/);
      const complexityMatch = frontmatter.match(/complexity:\s*"?([^"\n]+)"?/);
      const tagsMatch = frontmatter.match(/tags:\s*\[([^\]]+)\]/);
      const durationMatch = frontmatter.match(/estimated_duration:\s*"?([^"\n]+)"?/);
      const depsMatch = frontmatter.match(/dependencies:\s*\n((?:\s+-\s+[^\n]+\n?)+)/);

      if (idMatch) metadata.id = idMatch[1].trim();
      if (nameMatch) metadata.name = nameMatch[1].trim();
      if (complexityMatch) {
        const c = complexityMatch[1].trim().toLowerCase();
        if (c === "low" || c === "medium" || c === "high") {
          metadata.complexity = c;
        }
      }
      if (tagsMatch) {
        metadata.tags = tagsMatch[1].split(",").map((t) => t.trim().replace(/"/g, ""));
      }
      if (durationMatch) metadata.estimatedDuration = durationMatch[1].trim();
      if (depsMatch) {
        metadata.requiredTools = depsMatch[1]
          .split("\n")
          .map((line) => line.replace(/^\s+-\s+"?/, "").replace(/"?\s*$/, ""))
          .filter((t) => t.length > 0);
      }
    }

    // Extract description from first paragraph after title
    const titleMatch = content.match(/^#\s+(.+)/m);
    const descMatch = content.match(/^#[^\n]+\n+([^\n#]+)/m);

    // Extract required tools from "Required Tools" section
    const toolsSection = content.match(/##\s*Required Tools\s*\n([\s\S]*?)(?=\n##|\n$)/i);
    if (toolsSection && !metadata.requiredTools) {
      const toolMatches = toolsSection[1].matchAll(/`([a-z_]+)`/g);
      metadata.requiredTools = Array.from(toolMatches).map((m) => m[1]);
    }

    // Estimate complexity from content if not in frontmatter
    if (!metadata.complexity) {
      const phaseCount = (content.match(/###\s*Phase/gi) || []).length;
      const stepCount = (content.match(/^\d+\.\s/gm) || []).length;
      if (phaseCount >= 4 || stepCount >= 10) metadata.complexity = "high";
      else if (phaseCount >= 2 || stepCount >= 5) metadata.complexity = "medium";
      else metadata.complexity = "low";
    }

    return {
      id: metadata.id || fileName,
      name: metadata.name || (titleMatch ? titleMatch[1].replace(/\s*Orchestration\s*/i, "") : fileName),
      domain,
      complexity: metadata.complexity || "medium",
      description: descMatch ? descMatch[1].trim().slice(0, 200) : "",
      requiredTools: metadata.requiredTools || [],
      tags: metadata.tags || [],
      estimatedDuration: metadata.estimatedDuration || "varies",
      filePath,
    };
  } catch {
    return null;
  }
}

/**
 * Load all orchestrations from the resources directory
 */
function loadOrchestrations(): OrchestrationMetadata[] {
  if (orchestrationCache) return orchestrationCache;

  const orchestrations: OrchestrationMetadata[] = [];

  // Get the path to orchestrations directory
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const orchestrationsDir = path.resolve(currentDir, "../../resources/orchestrations");

  if (!fs.existsSync(orchestrationsDir)) {
    console.error(`[orchestrationDiscovery] Orchestrations directory not found: ${orchestrationsDir}`);
    return orchestrations;
  }

  const domains = fs.readdirSync(orchestrationsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const domain of domains) {
    const domainPath = path.join(orchestrationsDir, domain);
    const files = fs.readdirSync(domainPath)
      .filter((f) => f.endsWith(".md") && !f.startsWith("_"));

    for (const file of files) {
      const filePath = path.join(domainPath, file);
      const metadata = parseOrchestrationFile(filePath, domain);
      if (metadata) {
        orchestrations.push(metadata);
      }
    }
  }

  orchestrationCache = orchestrations;
  return orchestrations;
}

/**
 * Get orchestration content by ID
 */
export function getOrchestrationContent(id: string): string | null {
  const orchestrations = loadOrchestrations();
  const orch = orchestrations.find((o) => o.id === id);
  if (!orch) return null;

  try {
    return fs.readFileSync(orch.filePath, "utf-8");
  } catch {
    return null;
  }
}

/**
 * Register orchestration discovery tools
 */
export function registerOrchestrationDiscoveryTools(server: McpServer) {
  // Tool 1: List and search orchestrations
  server.tool(
    "orchestration_discovery",
    `List and search available research orchestration templates.

Use this tool to:
- Browse all available orchestrations by domain
- Search for orchestrations by keyword
- Filter by complexity level
- Find orchestrations that use specific tools

Returns metadata about each orchestration including required tools, complexity, and description.`,
    {
      domain: z
        .enum([
          "business-market-intelligence",
          "competitive-analysis-strategy",
          "knowledge-academic-research",
          "social-media-community-insights",
          "technical-developer-research",
          "meta",
          "all",
        ])
        .default("all")
        .describe("Filter by domain category"),
      search_query: z
        .string()
        .optional()
        .describe("Search term to filter orchestrations by name, description, or tags"),
      complexity: z
        .enum(["low", "medium", "high"])
        .optional()
        .describe("Filter by complexity level"),
      required_tool: z
        .string()
        .optional()
        .describe("Filter to orchestrations that use a specific tool"),
      limit: z
        .number()
        .default(20)
        .describe("Maximum number of results to return"),
    },
    async ({ domain, search_query, complexity, required_tool, limit }) => {
      let orchestrations = loadOrchestrations();

      // Filter by domain
      if (domain && domain !== "all") {
        orchestrations = orchestrations.filter((o) => o.domain === domain);
      }

      // Filter by complexity
      if (complexity) {
        orchestrations = orchestrations.filter((o) => o.complexity === complexity);
      }

      // Filter by required tool
      if (required_tool) {
        orchestrations = orchestrations.filter((o) =>
          o.requiredTools.some((t) => t.includes(required_tool))
        );
      }

      // Search filter
      if (search_query) {
        const query = search_query.toLowerCase();
        orchestrations = orchestrations.filter(
          (o) =>
            o.name.toLowerCase().includes(query) ||
            o.description.toLowerCase().includes(query) ||
            o.tags.some((t) => t.toLowerCase().includes(query)) ||
            o.id.toLowerCase().includes(query)
        );
      }

      // Limit results
      const results = orchestrations.slice(0, limit);

      // Get domain summary
      const domainCounts: Record<string, number> = {};
      for (const o of loadOrchestrations()) {
        domainCounts[o.domain] = (domainCounts[o.domain] || 0) + 1;
      }

      const response = {
        total_available: loadOrchestrations().length,
        returned: results.length,
        filters_applied: {
          domain: domain !== "all" ? domain : null,
          complexity: complexity || null,
          search_query: search_query || null,
          required_tool: required_tool || null,
        },
        domain_summary: domainCounts,
        orchestrations: results.map((o) => ({
          id: o.id,
          name: o.name,
          domain: o.domain,
          complexity: o.complexity,
          description: o.description,
          required_tools: o.requiredTools,
          tags: o.tags,
          estimated_duration: o.estimatedDuration,
        })),
      };

      return {
        content: [{ type: "text" as const, text: JSON.stringify(response, null, 2) }],
      };
    }
  );

  // Tool 2: Get full orchestration details
  server.tool(
    "orchestration_details",
    `Get the full content and details of a specific orchestration template.

Use this after discovering orchestrations to get the complete workflow steps,
output format, best practices, and execution guidance.`,
    {
      orchestration_id: z.string().describe("The ID of the orchestration to retrieve"),
      section: z
        .enum(["full", "workflow", "output", "examples", "tips"])
        .default("full")
        .describe("Which section to retrieve (full returns everything)"),
    },
    async ({ orchestration_id, section }) => {
      const content = getOrchestrationContent(orchestration_id);

      if (!content) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  error: "Orchestration not found",
                  orchestration_id,
                  suggestion: "Use orchestration_discovery to find available orchestrations",
                },
                null,
                2
              ),
            },
          ],
          isError: true,
        };
      }

      // Parse sections if requested
      if (section !== "full") {
        const sectionPatterns: Record<string, RegExp> = {
          workflow: /## (?:Workflow Steps|Process Flow|Detailed Process)([\s\S]*?)(?=\n## [A-Z]|\n---|\$)/i,
          output: /## (?:Output Format|Expected Output)([\s\S]*?)(?=\n## [A-Z]|\n---|\$)/i,
          examples: /## (?:Usage Examples|Examples)([\s\S]*?)(?=\n## [A-Z]|\n---|\$)/i,
          tips: /## (?:Tips|Best Practices|Advanced Techniques)([\s\S]*?)(?=\n## [A-Z]|\n---|\$)/i,
        };

        const pattern = sectionPatterns[section];
        if (pattern) {
          const match = content.match(pattern);
          if (match) {
            return {
              content: [
                {
                  type: "text" as const,
                  text: `## ${section.charAt(0).toUpperCase() + section.slice(1)}\n${match[1].trim()}`,
                },
              ],
            };
          }
        }
      }

      return {
        content: [{ type: "text" as const, text: content }],
      };
    }
  );

  // Tool 3: List available domains
  server.tool(
    "orchestration_domains",
    `List all available orchestration domains with descriptions and counts.

Use this to understand the high-level categories of research workflows available.`,
    {},
    async () => {
      const orchestrations = loadOrchestrations();

      const domains: Record<string, { count: number; orchestrations: string[]; description: string }> = {};

      const domainDescriptions: Record<string, string> = {
        "business-market-intelligence":
          "Company profiles, market sizing, industry trends, financial insights",
        "competitive-analysis-strategy":
          "SWOT analysis, competitor profiling, pricing strategy, market positioning",
        "knowledge-academic-research":
          "Literature reviews, fact-checking, educational resources, historical research",
        "social-media-community-insights":
          "Sentiment analysis, trend tracking, influencer identification, viral content",
        "technical-developer-research":
          "API comparison, framework evaluation, security research, hiring trends",
        meta: "Higher-order orchestrations that compose other workflows",
      };

      for (const o of orchestrations) {
        if (!domains[o.domain]) {
          domains[o.domain] = {
            count: 0,
            orchestrations: [],
            description: domainDescriptions[o.domain] || "",
          };
        }
        domains[o.domain].count++;
        domains[o.domain].orchestrations.push(o.id);
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                total_orchestrations: orchestrations.length,
                domains: Object.entries(domains).map(([name, data]) => ({
                  domain: name,
                  description: data.description,
                  orchestration_count: data.count,
                  orchestrations: data.orchestrations,
                })),
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );
}

// Export for use by other modules
export { loadOrchestrations };
