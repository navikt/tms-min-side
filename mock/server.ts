import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import manifest from "./data/microfrontend/manifest.json" assert { type: "json" };
import navn from "./data/navn.json" assert { type: "json" };
import selector from "./data/selector.json" assert { type: "json" };
import varsler from "./data/varsler.json" assert { type: "json" };
import utkast from "./data/utkast.json" assert { type: "json" };
import utbetalinger from "./data/utbetalinger.json" assert { type: "json" };
import innboks from "./data/innboks.json" assert { type: "json" };
import status from "./data/status.json" assert { type: "json" };
import mikrofrontend from "./data/microfrontend/mikrofrontend.js";
import { mikrofrontendBundle } from "./data/microfrontend/microfrontend-oversikt.ts";

const api = new Hono();

api.use("/*", cors({
  origin: "http://localhost:4321",
  credentials: true,
}));

api.get('/navn', (c) => {
  return c.json(navn);
});

api.get('/selector/din-oversikt', (c) => {
  return c.json(selector);
});

api.get('/varsler', (c) => {
  return c.json(varsler);
});

api.get('/utkast', (c) => {
  return c.json(utkast);
});

api.get('/utbetalinger/siste', (c) => {
  return c.json(utbetalinger);
});

api.get('/innboks', (c) => {
  return c.json(innboks);
});

api.get('/login/status', (c) => {
  return c.json(status);
});

api.post('/statistikk', (c) => {
  return c.text("Done");
});

api.post('/collect', (c) => {
  return c.text("Done")
});

api.get('/manifest.json', (c) => {
  return c.json(manifest);
});

api.get('/bundle.js', (c) => {
  return new Response(mikrofrontend,  {
    headers: {
      "Content-Type": "text/javascript",
    },
  });
});

api.get('/pensjon/bundle.js', (c) => {
  return new Response(mikrofrontendBundle("Pensjon", "5vh"),  {
    headers: {
      "Content-Type": "text/javascript",
    },
  });
});

api.get('/syfo-dialog/bundle.js', (c) => {
  return new Response(mikrofrontendBundle("Syfo dialog", "5vh"),  {
    headers: {
      "Content-Type": "text/javascript",
    },
  });
});

api.get('/aap/bundle.js', (c) => {
  return new Response(mikrofrontendBundle("AAP", "5vh"),  {
    headers: {
      "Content-Type": "text/javascript",
    },
  });
});

api.get('/meldekort/bundle.js', (c) => {
  return new Response(mikrofrontendBundle("Meldekort", "5vh"),  {
    headers: {
      "Content-Type": "text/javascript",
    },
  });
});

api.get('/aia-backend/unleash', (c) => {
  return c.json({
    "aia.uxsignals": true
  });
});

api.get("/aia-backend/arbeidssokerregisteret/v1/arbeidssoekerperioder", (c) => {
  return c.json([
    {
      periodeId: "eb39f0ee-ddba-42a1-8ed3-590285b2e279",
      startet: {
        tidspunkt: "2024-03-14T12:29:10.926Z",
        utfoertAv: {
          type: "VEILEDER"
        },
        kilde: "paw-arbeidssoekerregisteret-inngang",
        aarsak: "Er over 18 år, er bosatt i Norge etter Folkeregisterloven"
      },
      avsluttet: null
    }
  ]);
});

serve(api);
