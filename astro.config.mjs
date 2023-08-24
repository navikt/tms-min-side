import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";
import { rollupImportMapPlugin } from "rollup-plugin-import-map";
import importmap from "./importmap.json";

export default defineConfig({
  base: "/minside",
  build: {
    assetsPrefix: "https://cdn.nav.no/min-side/tms-min-side",
  },
  integrations: [
    react(),
    {
      name: "importmap",
      hooks: {
        "astro:build:setup": ({ vite, target }) => {
          if (target === "client") {
            vite.plugins.push({
              ...rollupImportMapPlugin(importmap),
              enforce: "pre",
              apply: "build",
            });
          }
        },
      },
    },
  ],
  compressHTML: true,
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
