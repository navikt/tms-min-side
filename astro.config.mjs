import node from "@astrojs/node";
import react from "@astrojs/react";
import mockServer from "@navikt/astro-mocks";
import { defineConfig, envField } from "astro/config";
import aktuelt from "./src/mocks/aktuelt.json" with { type: "json" };
import dinOversikt from "./src/mocks/din-oversikt.json" with { type: "json" };
import dokumenter from "./src/mocks/dokumenter.json" with { type: "json" };
import innboks from "./src/mocks/innboks.json" with { type: "json" };
import { microfrontendMocks } from "./src/mocks/microfrontends.ts";
import misc from "./src/mocks/misc.json" with { type: "json" };
import navn from "./src/mocks/navn.json" with { type: "json" };
import utbetalinger from "./src/mocks/utbetalinger.json" with { type: "json" };
import utkast from "./src/mocks/utkast.json" with { type: "json" };
import varsler from "./src/mocks/varsler.json" with { type: "json" };

export default defineConfig({
  base: "/minside",
  compressHTML: true,
  build: {
    assetsPrefix: "https://cdn.nav.no/min-side/tms-min-side",
  },
  vite: {
    build: {
      sourcemap: true,
    },
  },
  integrations: [
    react(),
    mockServer({
      mocks: [
        ...aktuelt,
        ...dinOversikt,
        ...dokumenter,
        ...innboks,
        ...misc,
        ...navn,
        ...utbetalinger,
        ...utkast,
        ...varsler,
        ...microfrontendMocks,
      ],
    }),
    {
      name: "importmap-externals",
      hooks: {
        "astro:build:setup": ({ vite }) => {
          vite.build.rolldownOptions.external = [
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
  logger: {
    entrypoint: "@navikt/astro-logger",
  },
  i18n: {
    defaultLocale: "nb",
    locales: ["nb", "nn", "en"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  env: {
    schema: {
      AKTUELT_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:4321/aktuelt",
      }),
      UTKAST_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:4321/minside/utkast",
      }),
      UTKAST_API_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:4321/utkast",
      }),
      VARSLER_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:4321/minside/varsler",
      }),
      VARSEL_API_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:4321/varsler",
      }),
      DIN_OVERSIKT_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:4321/selector/din-oversikt",
      }),
      MELDEKORT_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:4321/meldekort",
      }),
      MIN_SIDE_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:4321/minside",
      }),
      DOKUMENTARKIV_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:4321/dokumentarkiv",
      }),
      DOKUMENTER_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:4321/journalposter",
      }),
      INNBOKS_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:4321/innboks",
      }),
      NAVN_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:4321/navn",
      }),
      UTBETALINGSOVERSIKT_API_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:4321/utbetalinger/minside-widget",
      }),
      UTBETALINGSOVERSIKT_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:4321/utbetalingsoversikt",
      }),
      PUBLIC_TELEMETRY_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:4321/collect",
      }),
      PUBLIC_LEGACY_SELECTOR_URL: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:4321/selector/din-oversikt",
      }),
    },
  },
});
