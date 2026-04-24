import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";

export default defineConfig({
  base: "/minside",
  build: {
    assetsPrefix: "https://cdn.nav.no/min-side/tms-min-side",
  },
  integrations: [
    react(),
    {
      name: "importmap-externals",
      hooks: {
        "astro:build:setup": ({ vite }) => {
          vite.environments.client.build.rollupOptions.external = [
            "react",
            "react/jsx-runtime",
            "react-dom",
            "react-dom/client",
            "scheduler",
          ];
        },
      },
    },
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
