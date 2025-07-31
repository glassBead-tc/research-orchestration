import { z } from "zod";
import { toolRegistry, ToolCategory, ServiceType } from "./config.js";
import { createServices } from "../services/index.js";
import { createRequestLogger } from "../utils/logger.js";
import { withKeepAlive } from "../utils/keepAlive.js";
import { PAGINATION_DEFAULTS, autoPaginate, createPaginatedResponse } from "../utils/pagination.js";
import { pollOperation, pollWithRetry, POLLING_DEFAULTS, createProgressLogger } from "../utils/polling.js";

// Store mappings for searches and enrichments to their websets
const searchToWebsetMap = new Map<string, string>();
const enrichmentToWebsetMap = new Map<string, string>();

/**
 * Unified Websets Manager Tool
 * 
 * A single tool that handles all websets operations with natural language descriptions
 * and simplified parameter structure. This reduces cognitive load compared to having
 * 20+ separate tools.
 */

// Operation schemas with progressive disclosure
const BaseOperationSchema = z.object({
  operation: z.enum([
    // Content Webset Operations
    "create_webset",
    "list_websets", 
    "get_webset_status",
    "update_webset",
    "delete_webset",
    "cancel_webset",
    
    // Content Search Operations
    "search_webset",
    "get_search_results",
    "cancel_search",
    
    // Data Enhancement Operations
    "enhance_content",
    "get_enhancement_results",
    "delete_enhancement",
    "cancel_enhancement",
    
    // Notification Operations
    "setup_notifications",
    "list_notifications",
    "get_notification_details",
    "remove_notifications",
    
    // Activity Monitoring
    "list_activities",
    "get_activity_details",
    
    // Content Management
    "list_content_items"
  ]).describe("What you want to do"),
  
  // Target resource ID (when working with existing resources)
  resourceId: z.string().optional().describe("ID of the webset, search, or enhancement to work with")
});

// Content Webset Parameters
const WebsetParamsSchema = z.object({
  searchQuery: z.string().describe("What you want to find (required for new websets)"),
  description: z.string().optional().describe("Human-readable description of this webset"),
  
  advanced: z.object({
    resultCount: z.number().min(1).max(1000).default(10).describe("How many items to find"),
    focusArea: z.enum(["company"]).optional().describe("What type of entities to focus on"),
    criteria: z.array(z.object({
      description: z.string().describe("Specific requirement or filter")
    })).optional().describe("Additional requirements for filtering results"),
    externalReference: z.string().optional().describe("Your own reference ID for tracking"),
    tags: z.record(z.string().max(1000)).optional().describe("Custom labels for organization")
  }).optional().describe("Advanced webset settings")
}).optional();

// Search Parameters  
const SearchParamsSchema = z.object({
  query: z.string().describe("What to search for within the webset"),
  maxResults: z.number().min(1).max(100).default(10).describe("Maximum number of results to return"),
  
  advanced: z.object({
    focusArea: z.object({
      type: z.literal("company").describe("Currently supports companies only")
    }).optional().describe("What type of entities to focus search on"),
    requirements: z.array(z.object({
      description: z.string().describe("Specific requirement for search results")
    })).optional().describe("Additional search requirements"),
    tags: z.record(z.string().max(1000)).optional().describe("Custom labels for this search"),
    waitForResults: z.boolean().optional().describe("Automatically poll until search completes (max 1 minute)")
  }).optional().describe("Advanced search settings")
}).optional();

// Enhancement Parameters
const EnhancementParamsSchema = z.object({
  task: z.string().describe("What kind of additional data you want to extract or analyze"),
  
  advanced: z.object({
    outputFormat: z.enum(["text", "date", "number", "options", "email", "phone"]).default("text").describe("Expected format of the results"),
    waitForResults: z.boolean().optional().describe("Automatically poll until enhancement completes (max 2 minutes)"),
    choices: z.array(z.object({
      label: z.string().describe("Possible answer option")
    })).optional().describe("Predefined answer choices (only for 'options' format)"),
    tags: z.record(z.string().max(1000)).optional().describe("Custom labels for this enhancement")
  }).optional().describe("Advanced enhancement settings")
}).optional();

// Notification Parameters
const NotificationParamsSchema = z.object({
  webhookUrl: z.string().url().describe("URL where notifications should be sent"),
  events: z.array(z.enum([
    "webset.created", "webset.deleted", "webset.paused", "webset.idle",
    "webset.search.created", "webset.search.completed", "webset.search.updated", "webset.search.canceled",
    "webset.export.created", "webset.export.completed",
    "webset.item.created", "webset.item.enriched"
  ])).describe("Which events you want to be notified about"),
  
  advanced: z.object({
    tags: z.record(z.string().max(1000)).optional().describe("Custom labels for this notification setup")
  }).optional().describe("Advanced notification settings")
}).optional();

// Update Parameters
const UpdateParamsSchema = z.object({
  description: z.string().optional().describe("New description for the webset"),
  tags: z.record(z.string().max(1000)).optional().describe("Updated custom labels")
}).optional();

// Query Parameters (for listing operations)
const QueryParamsSchema = z.object({
  limit: z.number().min(1).max(100).default(25).describe("Maximum number of items to return"),
  offset: z.number().min(0).default(0).describe("Number of items to skip"),
  status: z.enum(["pending", "processing", "completed", "failed", "cancelled"]).optional().describe("Filter by status")
}).optional();

// Combined schema
const WebsetsManagerSchema = BaseOperationSchema.extend({
  // Operation-specific parameters
  webset: WebsetParamsSchema,
  search: SearchParamsSchema,
  enhancement: EnhancementParamsSchema,
  notification: NotificationParamsSchema,
  update: UpdateParamsSchema,
  query: QueryParamsSchema
});

// Register the unified tool
toolRegistry["websets_manager"] = {
  name: "websets_manager",
  description: "Manage content websets, searches, and data enhancements using Exa's platform. This single tool handles creating websets of web content, searching within them, enhancing data with AI, and setting up notifications. Much simpler than using separate tools for each operation.",
  schema: WebsetsManagerSchema.shape,
  category: ToolCategory.WEBSETS,
  service: ServiceType.WEBSETS,
  handler: async (args) => {
    const { operation, resourceId, webset, search, enhancement, notification, update, query: params } = args;
    
    const requestId = `websets_manager-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const logger = createRequestLogger(requestId, 'websets_manager');
    
    logger.start(`${operation} operation`);
    
    try {
      // Get API key from environment (no more repetition in parameters!)
      const apiKey = process.env.EXA_API_KEY;
      if (!apiKey) {
        throw new Error("EXA_API_KEY environment variable is required");
      }
      
      const services = createServices(apiKey);
      
      // Route to appropriate operation handler
      switch (operation) {
        case "create_webset":
          return await handleCreateWebset(services, webset, logger);
        
        case "list_websets":
          return await handleListWebsets(services, params, logger);
          
        case "get_webset_status":
          return await handleGetWebsetStatus(services, resourceId, logger);
          
        case "update_webset":
          return await handleUpdateWebset(services, resourceId, update, logger);
          
        case "delete_webset":
          return await handleDeleteWebset(services, resourceId, logger);
          
        case "cancel_webset":
          return await handleCancelWebset(services, resourceId, logger);
          
        case "search_webset":
          return await handleSearchWebset(services, resourceId, search, logger);
          
        case "get_search_results":
          return await handleGetSearchResults(services, resourceId, logger);
          
        case "cancel_search":
          return await handleCancelSearch(services, resourceId, logger);
          
        case "enhance_content":
          return await handleEnhanceContent(services, resourceId, enhancement, logger);
          
        case "get_enhancement_results":
          return await handleGetEnhancementResults(services, resourceId, logger);
          
        case "delete_enhancement":
          return await handleDeleteEnhancement(services, resourceId, logger);
          
        case "cancel_enhancement":
          return await handleCancelEnhancement(services, resourceId, logger);
          
        case "setup_notifications":
          return await handleSetupNotifications(services, notification, logger);
          
        case "list_notifications":
          return await handleListNotifications(services, params, logger);
          
        case "get_notification_details":
          return await handleGetNotificationDetails(services, resourceId, logger);
          
        case "remove_notifications":
          return await handleRemoveNotifications(services, resourceId, logger);
          
        case "list_activities":
          return await handleListActivities(services, params, logger);
          
        case "get_activity_details":
          return await handleGetActivityDetails(services, resourceId, logger);
          
        case "list_content_items":
          return await handleListContentItems(services, resourceId, params, logger);
          
        default:
          throw new Error(`Unknown operation: ${operation}`);
      }
      
    } catch (error) {
      logger.error(error);
      
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null) {
        // Try to extract meaningful information from the error object
        errorMessage = JSON.stringify(error, null, 2);
      } else if (error === undefined) {
        errorMessage = 'An unknown error occurred';
      } else {
        errorMessage = String(error);
      }
      
      logger.log(`Operation failed: ${errorMessage}`);
      
      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            success: false,
            operation,
            error: errorMessage,
            help: getOperationHelp(operation)
          }, null, 2)
        }],
        isError: true
      };
    }
  },
  enabled: true
};

// Operation handlers with user-friendly responses
async function handleCreateWebset(services: any, params: any, logger: any) {
  if (!params?.searchQuery) {
    throw new Error("searchQuery is required to create a webset");
  }
  
  const request = {
    search: {
      query: params.searchQuery,
      count: params.advanced?.resultCount || 10,
      ...(params.advanced?.focusArea && { entity: { type: params.advanced.focusArea } }),
      ...(params.advanced?.criteria && { criteria: params.advanced.criteria })
    },
    ...(params.advanced?.externalReference && { externalId: params.advanced.externalReference }),
    ...(params.advanced?.tags && { metadata: params.advanced.tags })
  };
  
  logger.log(`Creating webset for: "${params.searchQuery}"`);
  
  // Use keep-alive for long-running operation
  const result = await withKeepAlive(
    'Creating webset',
    async (keepAlive) => {
      keepAlive.sendProgress('Initializing webset creation', 10);
      const webset = await services.websetService.createWebset(request);
      keepAlive.sendProgress('Webset created, processing will continue in background', 100);
      return webset;
    },
    {
      interval: 5000,
      enableLogging: true
    }
  );
  
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        success: true,
        message: "Content webset created successfully! This will take 10-15 minutes to process.",
        websetId: result.id,
        status: result.status,
        searchQuery: params.searchQuery,
        expectedResults: params.advanced?.resultCount || 10,
        nextSteps: [
          `Check progress: use operation "get_webset_status" with resourceId "${result.id}"`,
          `When complete: use operation "list_content_items" with resourceId "${result.id}" to see results`
        ]
      }, null, 2)
    }]
  };
}

async function handleListWebsets(services: any, params: any, logger: any) {
  logger.log("Listing all websets");
  const result = await services.websetService.listWebsets(
    undefined, // cursor not supported yet
    params?.limit || 25
  );
  
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        success: true,
        message: `Found ${result.data.length} content websets`,
        websets: result.data.map((ws: any) => ({
          id: ws.id,
          status: ws.status,
          description: ws.description || "No description",
          itemCount: ws.searches?.[0]?.progress?.found || 0,
          createdAt: ws.createdAt,
          searchQuery: ws.searches?.[0]?.query || "Unknown query"
        })),
        pagination: {
          limit: params?.limit || 25,
          offset: params?.offset || 0,
          hasMore: result.data.length === (params?.limit || 25)
        }
      }, null, 2)
    }]
  };
}

async function handleGetWebsetStatus(services: any, resourceId: string | undefined, logger: any) {
  if (!resourceId) {
    throw new Error("resourceId is required to check webset status");
  }
  
  logger.log(`Getting status for webset: ${resourceId}`);
  const result = await services.websetService.getWebsetStatus(resourceId);
  
  const statusMessages = {
    pending: "Webset is queued for processing",
    processing: "Webset is being built (this takes 10-15 minutes)",
    completed: "Webset is ready! You can now search and enhance the content.",
    failed: "Webset creation failed. Please try again or contact support.",
    cancelled: "Webset creation was cancelled"
  };
  
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        success: true,
        websetId: resourceId,
        status: result.status,
        message: statusMessages[result.status as keyof typeof statusMessages] || `Status: ${result.status}`,
        details: {
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
          itemCount: result.searches?.[0]?.progress?.found || 0,
          searchQuery: result.searches?.[0]?.query,
          ...(result.error && { error: result.error })
        },
        ...(result.status === "completed" && {
          nextSteps: [
            `Search within webset: use operation "search_webset" with resourceId "${resourceId}"`,
            `View content: use operation "list_content_items" with resourceId "${resourceId}"`,
            `Enhance data: use operation "enhance_content" with resourceId "${resourceId}"`
          ]
        })
      }, null, 2)
    }]
  };
}

async function handleSearchWebset(services: any, resourceId: string | undefined, params: any, logger: any) {
  if (!resourceId) {
    throw new Error("resourceId is required to search within a webset");
  }
  if (!params?.query) {
    throw new Error("query is required to search within a webset");
  }
  
  const request = {
    websetId: resourceId,
    query: params.query,
    count: params.maxResults || 10,
    ...(params.advanced?.focusArea && { entity: params.advanced.focusArea }),
    ...(params.advanced?.requirements && { criteria: params.advanced.requirements }),
    ...(params.advanced?.tags && { metadata: params.advanced.tags })
  };
  
  logger.log(`Searching webset ${resourceId} for: "${params.query}"`);
  const result = await services.searchService.createSearch(request);
  
  // Store the mapping for later retrieval
  searchToWebsetMap.set(result.id, resourceId);
  
  // Check if auto-polling is requested
  if (params.advanced?.waitForResults) {
    logger.log("Auto-polling enabled for search results");
    
    const pollingResult = await pollWithRetry(
      async () => {
        const searchResult = await services.searchService.getSearch(resourceId, result.id);
        return {
          status: searchResult.status,
          data: searchResult
        };
      },
      {
        ...POLLING_DEFAULTS.SEARCH,
        onProgress: createProgressLogger("Search")
      }
    );
    
    if (pollingResult.success && pollingResult.data) {
      // Get the actual search result items if completed
      let searchResultsItems = null;
      if (pollingResult.data.status === "completed") {
        try {
          searchResultsItems = await services.itemService.getItemsBySearchId(resourceId, result.id);
        } catch (error) {
          logger.log(`Warning: Could not retrieve search result items: ${error}`);
        }
      }
      
      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            success: true,
            message: `Search completed after ${pollingResult.attempts} checks (${Math.round(pollingResult.duration / 1000)}s)`,
            searchId: result.id,
            websetId: resourceId,
            query: params.query,
            status: pollingResult.data.status,
            progress: {
              found: pollingResult.data.progress?.found || 0,
              completion: pollingResult.data.progress?.completion || 0
            },
            ...(searchResultsItems && {
              results: searchResultsItems.slice(0, 10).map((item: any) => ({
                id: item.id,
                title: item.title,
                url: item.url,
                snippet: item.content ? item.content.substring(0, 200) + "..." : "No content preview"
              })),
              totalResults: searchResultsItems.length,
              note: searchResultsItems.length > 10 ? `Showing first 10 of ${searchResultsItems.length} results` : undefined
            })
          }, null, 2)
        }]
      };
    } else {
      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            success: false,
            message: `Search polling failed: ${pollingResult.error}`,
            searchId: result.id,
            websetId: resourceId,
            query: params.query,
            attempts: pollingResult.attempts
          }, null, 2)
        }]
      };
    }
  }
  
  // Default behavior - return immediately
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        success: true,
        message: "Search started successfully!",
        searchId: result.id,
        websetId: resourceId,
        query: params.query,
        status: result.status,
        nextSteps: [
          `Check results: use operation "get_search_results" with resourceId "${result.id}"`,
          `Or search with waitForResults in advanced settings to auto-poll for results`
        ]
      }, null, 2)
    }]
  };
}

// Helper function to provide operation-specific help
function getOperationHelp(operation: string): string[] {
  const helpMap: Record<string, string[]> = {
    "create_webset": [
      "Provide a searchQuery describing what content you want to collect",
      "Optionally specify resultCount in advanced settings",
      "Webset creation takes 10-15 minutes to complete"
    ],
    "search_webset": [
      "Provide resourceId of the webset to search within",
      "Provide query describing what to find in the webset"
    ],
    "enhance_content": [
      "Provide resourceId of the webset to enhance",
      "Provide task describing what additional data you want to extract"
    ]
  };
  
  return helpMap[operation] || [
    "Check the operation name and required parameters",
    "Ensure resourceId is provided when working with existing resources"
  ];
}

async function handleUpdateWebset(services: any, resourceId: string | undefined, params: any, logger: any) {
  if (!resourceId) {
    throw new Error("resourceId is required to update a collection");
  }
  
  const updateData: any = {};
  
  // The API only accepts metadata for updates
  if (params?.tags) {
    updateData.metadata = params.tags;
  }
  
  // If description is provided, we can store it in metadata
  if (params?.description) {
    if (!updateData.metadata) {
      updateData.metadata = {};
    }
    updateData.metadata.description = params.description;
  }
  
  if (Object.keys(updateData).length === 0) {
    throw new Error("At least one field (description or tags) must be provided for update");
  }
  
  logger.log(`Updating webset: ${resourceId}`);
  await services.websetService.updateWebset(resourceId, updateData);
  
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        success: true,
        message: "Webset updated successfully",
        websetId: resourceId,
        updatedMetadata: updateData.metadata
      }, null, 2)
    }]
  };
}

async function handleDeleteWebset(services: any, resourceId: string | undefined, logger: any) {
  if (!resourceId) {
    throw new Error("resourceId is required to delete a webset");
  }
  
  logger.log(`Deleting webset: ${resourceId}`);
  await services.websetService.deleteWebset(resourceId);
  
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        success: true,
        message: "Webset deleted successfully",
        deletedWebsetId: resourceId
      }, null, 2)
    }]
  };
}

async function handleCancelWebset(services: any, resourceId: string | undefined, logger: any) {
  if (!resourceId) {
    throw new Error("resourceId is required to cancel a webset");
  }
  
  logger.log(`Cancelling webset: ${resourceId}`);
  const result = await services.websetService.cancelWebset(resourceId);
  
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        success: true,
        message: "Webset creation cancelled",
        websetId: resourceId,
        status: result.status
      }, null, 2)
    }]
  };
}

async function handleGetSearchResults(services: any, resourceId: string | undefined, logger: any) {
  if (!resourceId) {
    throw new Error("resourceId is required to get search results");
  }
  
  logger.log(`Getting search results for search ID: ${resourceId}`);
  
  // Get the websetId from our mapping first
  let websetId: string | undefined = searchToWebsetMap.get(resourceId);
  
  // If not found in mapping, try to find it by searching through websets
  if (!websetId) {
    logger.log(`Search ${resourceId} not found in mapping, searching through all websets...`);
    
    try {
      // Get list of websets and search through them
      const websetsResponse = await services.websetService.listWebsets(undefined, 100);
      const websets = websetsResponse.data || [];
      
      for (const webset of websets) {
        try {
          // Try to get the search from this webset
          await services.searchService.getSearch(webset.id, resourceId);
          websetId = webset.id;
          logger.log(`Found search ${resourceId} in webset ${webset.id}`);
          // Update our mapping for future use
          searchToWebsetMap.set(resourceId, webset.id);
          break;
        } catch (error) {
          // Search not found in this webset, continue
          continue;
        }
      }
      
      if (!websetId) {
        throw new Error(`Search ${resourceId} not found in any webset. The search may not exist or may have been deleted.`);
      }
      
    } catch (error) {
      throw new Error(`Failed to locate search ${resourceId}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  // At this point websetId is guaranteed to be defined
  if (!websetId) {
    throw new Error(`Unable to determine webset ID for search ${resourceId}`);
  }
  
  // Get the search details
  logger.log(`Getting search details: ${resourceId} from webset: ${websetId}`);
  const searchResult = await services.searchService.getSearch(websetId, resourceId);
  
  // If the search is completed, get the actual search results (items)
  let searchResultsItems = null;
  if (searchResult.status === "completed") {
    try {
      logger.log(`Search completed, retrieving result items from webset: ${websetId}`);
      // Get items that were found by this specific search
      const itemsResponse = await services.itemService.getItemsBySearchId(websetId, resourceId);
      searchResultsItems = itemsResponse;
      logger.log(`Found ${itemsResponse.length} items for search ${resourceId}`);
    } catch (error) {
      logger.log(`Warning: Could not retrieve search result items: ${error instanceof Error ? error.message : String(error)}`);
      // Don't fail the whole operation if we can't get items
    }
  }
  
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        success: true,
        searchId: resourceId,
        websetId: websetId,
        status: searchResult.status,
        query: searchResult.query,
        progress: {
          found: searchResult.progress?.found || 0,
          completion: searchResult.progress?.completion || 0
        },
        ...(searchResult.entity && { entityType: searchResult.entity.type }),
        ...(searchResult.criteria && searchResult.criteria.length > 0 && { criteria: searchResult.criteria }),
        createdAt: searchResult.createdAt,
        updatedAt: searchResult.updatedAt,
        ...(searchResult.status === "completed" && searchResultsItems && {
          results: searchResultsItems.map((item: any) => ({
            id: item.id,
            title: item.title,
            url: item.url,
            snippet: item.content ? item.content.substring(0, 200) + "..." : "No content preview",
            entityType: item.entity?.type,
            verification: item.verification?.status,
            createdAt: item.createdAt
          })),
          totalResults: searchResultsItems.length
        }),
        ...(searchResult.status === "running" && {
          message: "Search is still running. Check back later for results."
        }),
        ...(searchResult.status === "created" && {
          message: "Search has been created and will start processing soon."
        }),
        ...(searchResult.status === "canceled" && {
          message: "Search was cancelled.",
          canceledAt: searchResult.canceledAt,
          canceledReason: searchResult.canceledReason
        })
      }, null, 2)
    }]
  };
}

async function handleCancelSearch(services: any, resourceId: string | undefined, logger: any) {
  if (!resourceId) {
    throw new Error("resourceId is required to cancel a search");
  }
  
  logger.log(`Attempting to cancel search: ${resourceId}`);
  logger.log(`Current search mappings: ${JSON.stringify(Array.from(searchToWebsetMap.entries()))}`);
  
  // Get the websetId from our mapping first
  let websetId = searchToWebsetMap.get(resourceId);
  
  // If not found in mapping, try to find it by searching through websets
  if (!websetId) {
    logger.log(`Search ${resourceId} not found in mapping, searching through all websets...`);
    
    try {
      // Get list of websets and search through them
      const websetsResponse = await services.websetService.listWebsets(undefined, 100);
      const websets = websetsResponse.data || [];
      
      for (const webset of websets) {
        try {
          // Try to get the search from this webset
          await services.searchService.getSearch(webset.id, resourceId);
          websetId = webset.id;
          logger.log(`Found search ${resourceId} in webset ${websetId}`);
          break;
        } catch (error) {
          // Search not found in this webset, continue
          continue;
        }
      }
      
      if (!websetId) {
        throw new Error(`Search ${resourceId} not found in any webset. The search may not exist or may have been deleted.`);
      }
      
    } catch (error) {
      throw new Error(`Failed to locate search ${resourceId}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  logger.log(`Cancelling search: ${resourceId} from webset: ${websetId}`);
  
  try {
    // First, let's check if the search still exists and is cancellable
    const searchStatus = await services.searchService.getSearch(websetId, resourceId);
    logger.log(`Search ${resourceId} current status: ${searchStatus.status}`);
    
    if (searchStatus.status === 'completed' || searchStatus.status === 'canceled') {
      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            success: false,
            message: `Search cannot be cancelled because it is already ${searchStatus.status}`,
            searchId: resourceId,
            websetId: websetId,
            status: searchStatus.status
          }, null, 2)
        }]
      };
    }
    
    const result = await services.searchService.cancelSearch(websetId, resourceId);
    
    // Remove from mapping after cancellation
    searchToWebsetMap.delete(resourceId);
    
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          success: true,
          message: "Search cancelled successfully",
          searchId: resourceId,
          websetId: websetId,
          status: result.status,
          cancelledAt: result.canceledAt
        }, null, 2)
      }]
    };
    
  } catch (error: any) {
    logger.log(`Error during search cancellation: ${error}`);
    
    // Check for specific error types
    if (error?.response?.status === 400) {
      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            success: false,
            message: "Cannot cancel search",
            error: error?.response?.data?.message || "Search may have already completed or been cancelled",
            searchId: resourceId,
            websetId: websetId,
            suggestions: [
              "Check search status with get_search_results",
              "Searches complete quickly and may finish before cancellation",
              "Only 'running' searches can be cancelled"
            ]
          }, null, 2)
        }]
      };
    }
    
    throw new Error(`Failed to cancel search ${resourceId}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function handleEnhanceContent(services: any, resourceId: string | undefined, params: any, logger: any) {
  if (!resourceId) {
    throw new Error("resourceId is required to enhance content");
  }
  if (!params?.task) {
    throw new Error("task is required to specify what enhancement you want");
  }
  
  const request = {
    websetId: resourceId,
    description: params.task,
    format: params.advanced?.outputFormat || "text", // format is required, default to "text"
    ...(params.advanced?.choices && { options: params.advanced.choices }),
    ...(params.advanced?.tags && { metadata: params.advanced.tags })
  };
  
  logger.log(`Creating enhancement for collection ${resourceId}: "${params.task}"`);
  const result = await services.enrichmentService.createEnrichment(request);
  
  // Store the mapping for later retrieval
  enrichmentToWebsetMap.set(result.id, resourceId);
  
  // Check if auto-polling is requested
  if (params.advanced?.waitForResults) {
    logger.log("Auto-polling enabled for enhancement results");
    
    const pollingResult = await pollWithRetry(
      async () => {
        const enhancementResult = await services.enrichmentService.getEnrichment(resourceId, result.id);
        return {
          status: enhancementResult.status,
          data: enhancementResult
        };
      },
      {
        ...POLLING_DEFAULTS.ENHANCEMENT,
        onProgress: createProgressLogger("Enhancement")
      }
    );
    
    if (pollingResult.success && pollingResult.data) {
      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            success: true,
            message: `Enhancement completed after ${pollingResult.attempts} checks (${Math.round(pollingResult.duration / 1000)}s)`,
            enhancementId: result.id,
            websetId: resourceId,
            task: params.task,
            status: pollingResult.data.status,
            createdAt: pollingResult.data.createdAt,
            ...(pollingResult.data.status === "completed" && pollingResult.data.results && {
              results: pollingResult.data.results,
              resultCount: Array.isArray(pollingResult.data.results) ? pollingResult.data.results.length : 1
            })
          }, null, 2)
        }]
      };
    } else {
      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            success: false,
            message: `Enhancement polling failed: ${pollingResult.error}`,
            enhancementId: result.id,
            websetId: resourceId,
            task: params.task,
            attempts: pollingResult.attempts
          }, null, 2)
        }]
      };
    }
  }
  
  // Default behavior - return immediately
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        success: true,
        message: "Content enhancement started successfully!",
        enhancementId: result.id,
        websetId: resourceId,
        task: params.task,
        status: result.status,
        nextSteps: [
          `Check results: use operation "get_enhancement_results" with resourceId "${result.id}"`,
          `Or enhance with waitForResults in advanced settings to auto-poll for results`
        ]
      }, null, 2)
    }]
  };
}

async function handleGetEnhancementResults(services: any, resourceId: string | undefined, logger: any) {
  if (!resourceId) {
    throw new Error("resourceId is required to get enhancement results");
  }
  
  // Get the websetId from our mapping
  const websetId = enrichmentToWebsetMap.get(resourceId);
  if (!websetId) {
    throw new Error(`No webset found for enhancement ${resourceId}. The enhancement may have been created in a previous session.`);
  }
  
  logger.log(`Getting enhancement results: ${resourceId} from webset: ${websetId}`);
  const result = await services.enrichmentService.getEnrichment(websetId, resourceId);
  
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        success: true,
        enhancementId: resourceId,
        status: result.status,
        task: result.description,
        websetId: websetId,
        createdAt: result.createdAt,
        ...(result.status === "completed" && result.results && {
          results: result.results
        })
      }, null, 2)
    }]
  };
}

async function handleDeleteEnhancement(services: any, resourceId: string | undefined, logger: any) {
  if (!resourceId) {
    throw new Error("resourceId is required to delete an enhancement");
  }
  
  // Get the websetId from our mapping
  const websetId = enrichmentToWebsetMap.get(resourceId);
  if (!websetId) {
    throw new Error(`No webset found for enhancement ${resourceId}. The enhancement may have been created in a previous session.`);
  }
  
  logger.log(`Deleting enhancement: ${resourceId} from webset: ${websetId}`);
  await services.enrichmentService.deleteEnrichment(websetId, resourceId);
  
  // Remove from mapping after deletion
  enrichmentToWebsetMap.delete(resourceId);
  
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        success: true,
        message: "Enhancement deleted successfully",
        deletedEnhancementId: resourceId
      }, null, 2)
    }]
  };
}

async function handleCancelEnhancement(services: any, resourceId: string | undefined, logger: any) {
  if (!resourceId) {
    throw new Error("resourceId is required to cancel an enhancement");
  }
  
  // Get the websetId from our mapping
  const websetId = enrichmentToWebsetMap.get(resourceId);
  if (!websetId) {
    throw new Error(`No webset found for enhancement ${resourceId}. The enhancement may have been created in a previous session.`);
  }
  
  logger.log(`Cancelling enhancement: ${resourceId} from webset: ${websetId}`);
  const result = await services.enrichmentService.cancelEnrichment(websetId, resourceId);
  
  // Remove from mapping after cancellation
  enrichmentToWebsetMap.delete(resourceId);
  
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        success: true,
        message: "Enhancement cancelled",
        enhancementId: resourceId,
        status: result.status
      }, null, 2)
    }]
  };
}

async function handleSetupNotifications(services: any, params: any, logger: any) {
  if (!params?.webhookUrl) {
    throw new Error("webhookUrl is required to setup notifications");
  }
  if (!params?.events || params.events.length === 0) {
    throw new Error("At least one event must be specified for notifications");
  }
  
  const request = {
    url: params.webhookUrl,
    events: params.events,
    ...(params.advanced?.tags && { metadata: params.advanced.tags })
  };
  
  logger.log(`Setting up notifications for ${params.events.length} event types`);
  const result = await services.webhookService.createWebhook(request);
  
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        success: true,
        message: "Notifications setup successfully!",
        notificationId: result.id,
        webhookUrl: params.webhookUrl,
        events: params.events,
        createdAt: result.createdAt
      }, null, 2)
    }]
  };
}

async function handleListNotifications(services: any, params: any, logger: any) {
  logger.log("Listing all notifications");
  const result = await services.webhookService.listWebhooks({
    limit: params?.limit || 25,
    cursor: undefined // cursor-based pagination, no offset
  });
  
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        success: true,
        message: `Found ${result.data.length} notification setups`,
        notifications: result.data.map((webhook: any) => ({
          id: webhook.id,
          url: webhook.url,
          events: webhook.events,
          createdAt: webhook.createdAt
        }))
      }, null, 2)
    }]
  };
}

async function handleGetNotificationDetails(services: any, resourceId: string | undefined, logger: any) {
  if (!resourceId) {
    throw new Error("resourceId is required to get notification details");
  }
  
  logger.log(`Getting notification details: ${resourceId}`);
  const result = await services.webhookService.getWebhook(resourceId);
  
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        success: true,
        notificationId: resourceId,
        url: result.url,
        events: result.events,
        createdAt: result.createdAt,
        ...(result.metadata && { tags: result.metadata })
      }, null, 2)
    }]
  };
}

async function handleRemoveNotifications(services: any, resourceId: string | undefined, logger: any) {
  if (!resourceId) {
    throw new Error("resourceId is required to remove notifications");
  }
  
  logger.log(`Removing notifications: ${resourceId}`);
  await services.webhookService.deleteWebhook(resourceId);
  
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        success: true,
        message: "Notifications removed successfully",
        removedNotificationId: resourceId
      }, null, 2)
    }]
  };
}

async function handleListActivities(services: any, params: any, logger: any) {
  logger.log("Listing recent activities");
  
  try {
    // If limit is specified, use it directly (user knows what they want)
    if (params?.limit) {
      const result = await services.eventService.listEvents({
        limit: params.limit,
        cursor: params?.cursor
      });
      
      const events = result.events || result.data || [];
      
      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            success: true,
            message: `Found ${events.length} recent activities`,
            total: events.length,
            nextCursor: result.nextCursor,
            activities: events.map((event: any) => ({
              id: event.id,
              type: event.type,
              timestamp: event.createdAt,
              object: event.object,
              summary: `${event.type} event occurred`,
              ...(event.data && { data: event.data })
            }))
          }, null, 2)
        }]
      };
    }
    
    // Otherwise, use automatic pagination to prevent token overflow
    logger.log("Using automatic pagination for activities");
    
    const allEvents = await autoPaginate(async ({ limit, offset }) => {
      const result = await services.eventService.listEvents({
        limit: limit || PAGINATION_DEFAULTS.ACTIVITIES,
        cursor: params?.cursor // TODO: offset-based pagination if API supports it
      });
      
      const events = result.events || result.data || [];
      
      return createPaginatedResponse(
        events,
        { limit, offset },
        undefined // Total count not available from API
      );
    });
    
    logger.log(`Auto-paginated ${allEvents.length} events`);
    
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          success: true,
          message: `Found ${allEvents.length} recent activities (auto-paginated to prevent token overflow)`,
          total: allEvents.length,
          pagination: {
            note: "Results were automatically paginated to fit within token limits",
            actualCount: allEvents.length
          },
          activities: allEvents.map((event: any) => ({
            id: event.id,
            type: event.type,
            timestamp: event.createdAt,
            object: event.object,
            summary: `${event.type} event occurred`,
            ...(event.data && { data: event.data })
          }))
        }, null, 2)
      }]
    };
    
  } catch (error: any) {
    logger.log(`Error listing activities: ${error}`);
    
    // Enhanced error detection for Events API unavailability
    const isEventsApiUnavailable = (
      error?.response?.status === 500 ||
      error?.response?.status === 501 ||
      error?.response?.status === 502 ||
      error?.response?.status === 503 ||
      error?.code === 'ECONNREFUSED' ||
      error?.code === 'network_error' ||
      (error?.message && error.message.toLowerCase().includes('events api')) ||
      (error?.response?.data?.message && error.response.data.message.toLowerCase().includes('unavailable'))
    );
    
    if (isEventsApiUnavailable) {
      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            success: false,
            message: "Events API is currently unavailable",
            error: "The /v0/events endpoint is not yet implemented or is temporarily unavailable (HTTP 500). This is a known limitation.",
            details: {
              endpoint: "/v0/events",
              expectedStatus: "The Events API is defined in the OpenAPI specification but not yet implemented on the server",
              httpStatus: error?.response?.status || "Network Error"
            },
            alternatives: [
              {
                action: "setup_notifications",
                description: "Configure webhooks to receive real-time event notifications instead of polling"
              },
              {
                action: "get_webset_status", 
                description: "Monitor individual webset status and progress directly"
              },
              {
                action: "get_search_results",
                description: "Check search completion status and results"
              },
              {
                action: "list_websets",
                description: "List all websets to see their current states"
              }
            ],
            recommendations: [
              "Consider setting up webhooks for event-driven workflows",
              "Use webset status monitoring for progress tracking",
              "Check back later as the Events API may be implemented in future updates"
            ]
          }, null, 2)
        }]
      };
    }
    
    // For other errors, provide generic error handling
    throw new Error(`Failed to list activities: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function handleGetActivityDetails(services: any, resourceId: string | undefined, logger: any) {
  if (!resourceId) {
    throw new Error("resourceId is required to get activity details");
  }
  
  logger.log(`Getting activity details: ${resourceId}`);
  
  try {
    const result = await services.eventService.getEvent(resourceId);
    
    logger.log(`Activity details retrieved: ${JSON.stringify(result, null, 2)}`);
    
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          success: true,
          activityId: resourceId,
          type: result.type,
          object: result.object,
          createdAt: result.createdAt,
          eventData: result.data || {},
          // Extract relevant info from the event data
          ...(result.data && {
            resourceInfo: {
              id: result.data.id,
              status: result.data.status
            }
          })
        }, null, 2)
      }]
    };
    
  } catch (error: any) {
    logger.log(`Error getting activity details: ${error}`);
    
    // Enhanced error detection for Events API unavailability
    const isEventsApiUnavailable = (
      error?.response?.status === 500 ||
      error?.response?.status === 501 ||
      error?.response?.status === 502 ||
      error?.response?.status === 503 ||
      error?.code === 'ECONNREFUSED' ||
      error?.code === 'network_error' ||
      (error?.message && error.message.toLowerCase().includes('events api')) ||
      (error?.response?.data?.message && error.response.data.message.toLowerCase().includes('unavailable'))
    );
    
    if (isEventsApiUnavailable) {
      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            success: false,
            message: "Events API is currently unavailable", 
            error: "The /v0/events endpoint is not yet implemented or is temporarily unavailable (HTTP 500). This is a known limitation.",
            details: {
              endpoint: `/v0/events/${resourceId}`,
              expectedStatus: "The Events API is defined in the OpenAPI specification but not yet implemented on the server",
              httpStatus: error?.response?.status || "Network Error",
              eventId: resourceId
            },
            alternatives: [
              {
                action: "setup_notifications",
                description: "Configure webhooks to receive event notifications automatically"
              },
              {
                action: "list_notifications", 
                description: "Check if webhook notifications are already configured"
              },
              {
                action: "get_webset_status",
                description: "Monitor webset status changes for activity tracking" 
              }
            ],
            recommendations: [
              "Events are automatically sent to configured webhook URLs",
              "Set up webhooks for real-time event notifications",
              "Check webhook delivery logs for event details"
            ]
          }, null, 2)
        }]
      };
    }
    
    // Check if this is a 404 error (event not found)
    if (error?.response?.status === 404) {
      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            success: false,
            message: "Event not found",
            error: `No event found with ID: ${resourceId}`,
            details: {
              eventId: resourceId,
              httpStatus: 404
            },
            suggestions: [
              "Verify the event ID is correct",
              "Events may expire after a certain time",
              "Use list_activities to see available events",
              "Event IDs from webhook notifications may not be queryable via API"
            ]
          }, null, 2)
        }]
      };
    }
    
    throw new Error(`Failed to get activity details for ${resourceId}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function handleListContentItems(services: any, resourceId: string | undefined, params: any, logger: any) {
  if (!resourceId) {
    throw new Error("resourceId is required to list content items");
  }
  
  logger.log(`Listing content items for webset: ${resourceId}`);
  const result = await services.itemService.listItems(
    resourceId,
    undefined, // cursor not supported yet
    params?.limit || 25
  );
  
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        success: true,
        websetId: resourceId,
        message: `Found ${result.data.length} content items`,
        items: result.data.map((item: any) => ({
          id: item.id,
          title: item.title || "No title",
          url: item.url,
          snippet: item.text ? item.text.substring(0, 200) + "..." : "No content preview",
          createdAt: item.createdAt
        })),
        pagination: {
          limit: params?.limit || 25,
          offset: params?.offset || 0,
          hasMore: result.data.length === (params?.limit || 25)
        }
      }, null, 2)
    }]
  };
}

export default toolRegistry["websets_manager"];