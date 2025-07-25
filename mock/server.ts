import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import manifest from "./data/microfrontend/manifest.json" with { type: "json" };
import navn from "./data/navn.json" with { type: "json" };
import dinOversikt from "./data/din-oversikt.json" with { type: "json" };
import journalposter from "./data/dokumenter.json" with { type: "json" };
import varsler from "./data/varsler.json" with { type: "json" };
import utkast from "./data/utkast.json" with { type: "json" };
import utbetalinger from "./data/utbetalinger.json" with { type: "json" };
import innboks from "./data/innboks.json" with { type: "json" };
import status from "./data/status.json" with { type: "json" };
import mikrofrontend from "./data/microfrontend/mikrofrontend.js";
import { mockMicrofrontendSSR } from "./data/microfrontend/mockMicrofrontendSSR.ts";
import { mockMicrofrontendCSR } from "./data/microfrontend/mockMicrofrontendCSR.ts";
import { HTTPException } from "hono/http-exception";

const api = new Hono();

api.use(
  "/*",
  cors({
    origin: "http://localhost:4321",
    credentials: true,
  }),
);

api.get("/navn", (c) => {
  return c.json(navn);
});

api.get("/selector/din-oversikt", (c) => {
  return c.json(dinOversikt);
});

api.get("/varsler", (c) => {
  return c.json(varsler);
});

api.get("/utkast", (c) => {
  return c.json(utkast);
});

api.get("/utbetalinger/siste", (c) => {
  return c.json(utbetalinger);
});

api.get("/innboks", (c) => {
  return c.json(innboks);
});

api.get("/journalposter", (c) => {
  return c.json(journalposter);
});

api.get("/login/status", (c) => {
  return c.json(status);
});

api.post("/statistikk", (c) => {
  return c.text("Done");
});

api.post("/collect", (c) => {
  return c.text("Done");
});

api.get("/manifest.json", (c) => {
  return c.json(manifest);
});

api.get("/pensjonskalkulator/*", (c) => {
  return c.html(mockMicrofrontendSSR("Pensjonskalkulator"));
});

api.get("/syfo-dialog/*", (c) => {
  return c.html(mockMicrofrontendSSR("Syfo dialog"));
});

api.get("/bundle.js", (c) => {
  return new Response(mikrofrontend, {
    headers: {
      "Content-Type": "text/javascript",
    },
  });
});

api.get("/aap/bundle.js", (c) => {
  return new Response(mockMicrofrontendCSR("AAP", "5vh"), {
    headers: {
      "Content-Type": "text/javascript",
    },
  });
});

api.get("/meldekort/bundle.js", (c) => {
  return new Response(mockMicrofrontendCSR("Meldekort", "5vh"), {
    headers: {
      "Content-Type": "text/javascript",
    },
  });
});

api.get("/aia-backend/unleash", (c) => {
  return c.json({
    "aia.uxsignals": true,
  });
});

api.get("/aia-backend/arbeidssokerregisteret/v1/arbeidssoekerperioder", (c) => {
  return c.json([
    {
      periodeId: "eb39f0ee-ddba-42a1-8ed3-590285b2e279",
      startet: {
        tidspunkt: "2024-03-14T12:29:10.926Z",
        utfoertAv: {
          type: "VEILEDER",
        },
        kilde: "paw-arbeidssoekerregisteret-inngang",
        aarsak: "Er over 18 år, er bosatt i Norge etter Folkeregisterloven",
      },
      avsluttet: null,
    },
  ]);
});

serve(api);
