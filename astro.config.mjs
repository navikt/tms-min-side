import { defineConfig, envField } from "astro/config";
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
  env: {
    schema: {
      AKTUELT_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:3000/aktuelt"
      }),
      UTKAST_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:3000/minside/utkast"
      }),
      UTKAST_API_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:3000/utkast"
      }),
      VARSLER_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:3000/minside/varsler"
      }),
      VARSEL_API_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:3000/varsler"
      }),
      DIN_OVERSIKT_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:3000/selector/din-oversikt"
      }),
      MELDEKORT_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:3000/meldekort"
      }),
      DOKUMENTARKIV_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:3000/dokumentarkiv"
      }),
      DOKUMENTER_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:3000/journalposter"
      }),
      INNBOKS_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:3000/innboks"
      }),
      NAVN_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:3000/navn"
      }),
      UTBETALINGSOVERSIKT_API_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:3000/utbetalinger/siste"
      }),
      UTBETALINGSOVERSIKT_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:3000/utbetalingsoversikt"
      }),
      REDIRECT_URI: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:4321/minside"
      }),
      PUBLIC_TELEMETRY_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:3000/collect"
      }),
      PUBLIC_LEGACY_SELECTOR_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:3000/selector/din-oversikt"
      }),
    },
  },
});
