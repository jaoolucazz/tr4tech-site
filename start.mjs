// Entry point used in production. dist/server/server.js only exports a
// web-standard `fetch` handler (no listener) — this file wraps it with
// srvx's Node adapter so it becomes an actual HTTP server that binds to
// process.env.PORT, which is what a plain Node host (e.g. this VPS via
// EasyPanel) needs.
import { serve } from "srvx/node";
import handler from "./dist/server/server.js";

const port = Number(process.env.PORT) || 3000;

serve({
  fetch: handler.fetch,
  port,
  hostname: "0.0.0.0",
});

console.log(`Server listening on port ${port}`);
