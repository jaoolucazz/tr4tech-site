// Entry point used in production. dist/server/server.js only exports a
// web-standard `fetch` handler for SSR (no listener, no static file
// serving). This file wraps it with srvx's Node adapter to get an actual
// HTTP server bound to process.env.PORT, AND serves the built static
// assets (JS/CSS/images) from dist/client before falling back to SSR —
// both are needed for a plain Node host (e.g. this VPS via EasyPanel).
import { serve } from "srvx/node";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import handler from "./dist/server/server.js";

const CLIENT_DIR = fileURLToPath(new URL("./dist/client", import.meta.url));

const MIME = {
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function tryServeStatic(pathname) {
  if (pathname === "/" || pathname.endsWith("/")) return null;
  const filePath = join(CLIENT_DIR, decodeURIComponent(pathname));
  if (!filePath.startsWith(CLIENT_DIR)) return null; // path traversal guard
  if (!existsSync(filePath)) return null;
  if (!statSync(filePath).isFile()) return null;

  const ext = extname(filePath);
  const headers = {
    "content-type": MIME[ext] || "application/octet-stream",
  };
  if (pathname.startsWith("/assets/")) {
    headers["cache-control"] = "public, max-age=31536000, immutable";
  }
  return new Response(readFileSync(filePath), { headers });
}

const port = Number(process.env.PORT) || 3000;

serve({
  port,
  hostname: "0.0.0.0",
  async fetch(request) {
    const url = new URL(request.url);
    return tryServeStatic(url.pathname) ?? (await handler.fetch(request));
  },
});

console.log(`Server listening on port ${port}`);
