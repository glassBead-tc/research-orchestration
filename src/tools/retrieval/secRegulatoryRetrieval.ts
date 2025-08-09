import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import axios from "axios";
import { API_CONFIG } from "../config.js";
import { createRequestLogger } from "../../utils/logger.js";

export function registerSecRegulatoryRetrievalTool(server: McpServer, config?: { exaApiKey?: string }): void {
  server.tool(
    "sec_regulatory_retrieval",
    "Search SEC EDGAR filings and regulatory sources via Exa. Inputs: ticker/CIK, form types, date range, topics. Returns structured results with URLs and highlighted snippets.",
    {
      tickerOrCik: z.string().describe("Ticker symbol or CIK"),
      forms: z.array(z.string()).optional().describe("Form types e.g., 10-K, 8-K, 10-Q"),
      from: z.string().optional().describe("Start date YYYY-MM-DD"),
      to: z.string().optional().describe("End date YYYY-MM-DD"),
      topics: z.array(z.string()).optional().describe("Keywords to target within filings"),
      numResults: z.number().optional().describe("Number of results (default 10)")
    },
    async ({ tickerOrCik, forms, from, to, topics, numResults }) => {
      const requestId = `sec_regulatory_retrieval-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
      const logger = createRequestLogger(requestId, 'sec_regulatory_retrieval');

      const formPart = forms && forms.length ? ` ${forms.join(" OR ")}` : "";
      const datePart = from || to ? ` published:${from || "*"}..${to || "*"}` : "";
      const topicPart = topics && topics.length ? ` ${topics.map(t => `"${t}"`).join(' ')}` : "";

      // Prioritize SEC EDGAR and reputable mirrors, but allow broader context
      const domainBias = ` site:sec.gov OR site:investors.sec.gov OR site:beta.sec.gov`;
      const query = `${tickerOrCik}${formPart}${topicPart}${datePart} ${domainBias}`.trim();

      try {
        const axiosInstance = axios.create({
          baseURL: API_CONFIG.BASE_URL,
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'x-api-key': config?.exaApiKey || process.env.EXA_API_KEY || ''
          },
          timeout: 25000
        });

        const body = {
          query,
          type: "auto",
          numResults: numResults || 10,
          contents: {
            text: { maxCharacters: API_CONFIG.DEFAULT_MAX_CHARACTERS },
            livecrawl: 'fallback'
          }
        };

        logger.start(query);
        const resp = await axiosInstance.post('/search', body, { timeout: 25000 });
        logger.complete();

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ query, results: resp.data?.results || [] }, null, 2)
          }]
        };
      } catch (error) {
        logger.error(error);
        return {
          content: [{ type: 'text', text: `SEC retrieval error: ${error instanceof Error ? error.message : String(error)}` }],
          isError: true
        };
      }
    }
  );
}