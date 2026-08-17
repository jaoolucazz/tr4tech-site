import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart({
      // Redirects TanStack Start's bundled server entry to src/server.ts
      // (our SSR error wrapper). Without an explicit Nitro preset, the
      // build targets a plain Node server — the right default for
      // self-hosting on a VPS (e.g. behind EasyPanel).
      server: { entry: "server" },
    }),
    viteReact(),
  ],
});
