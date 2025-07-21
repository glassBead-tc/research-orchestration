import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { log } from "../utils/logger.js";
import { readFileSync } from "fs";
import { join } from "path";

interface UserGuideResource {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
  contentPath?: string;
  content?: string;
}

// Define available user guide resources
const USER_GUIDE_RESOURCES: UserGuideResource[] = [
  {
    uri: "guide://fact-checking-workflow",
    name: "Fact-Checking Workflow Guide",
    description: "Three-step workflow for detecting and verifying claims using Exa AI search - extract claims, search for evidence, and verify accuracy",
    mimeType: "text/markdown",
    contentPath: "workflows/factCheckingWorkflow.md"
  },
  {
    uri: "guide://company-research-workflow",
    name: "Company Research Workflow Guide",
    description: "Comprehensive workflow for conducting company research using Exa AI - discover companies, gather information, analyze competitors, and synthesize insights",
    mimeType: "text/markdown",
    contentPath: "workflows/companyResearch.md"
  }
];

export function registerUserGuideResources(server: McpServer): void {
  // Register each user guide resource
  USER_GUIDE_RESOURCES.forEach(guide => {
    server.resource(
      guide.uri,
      guide.name,
      {
        description: guide.description,
        mimeType: guide.mimeType
      },
      async () => {
        log(`Serving user guide resource: ${guide.uri}`);
        
        // Load content from file if contentPath is specified
        let content: string;
        if (guide.contentPath) {
          // Use relative path from the built .smithery directory
          const fullPath = join(process.cwd(), 'src', 'resources', guide.contentPath);
          try {
            content = readFileSync(fullPath, 'utf-8');
          } catch (error) {
            log(`Error reading workflow file ${fullPath}: ${error}`);
            content = "Error loading workflow content";
          }
        } else if (guide.content) {
          content = guide.content;
        } else {
          content = "Content not available";
        }
        
        return {
          contents: [{
            uri: guide.uri,
            mimeType: guide.mimeType,
            text: content
          }]
        };
      }
    );
  });
  
  log(`Registered ${USER_GUIDE_RESOURCES.length} user guide resources`);
}