#!/usr/bin/env node
import { createServer } from "./server/bootstrap.js";

export default function ({ sessionId }: { sessionId: string; config: Record<string, unknown> }) {
  const server = createServer();
  // The smithery harness will call server.connect(transport) with stdio/shttp
  return server as any;
}