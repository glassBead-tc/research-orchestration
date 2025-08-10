#!/usr/bin/env node
import { bootstrapAndRun } from "./server/bootstrap.js";

bootstrapAndRun().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});