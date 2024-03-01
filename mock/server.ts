import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import aiaManifest from "./data/aia-manifest.json" assert { type: "json" };
import manifest from "./data/manifest.json" assert { type: "json" };
import meldekortinfo from "./data/meldekortinfo.json" assert { type: "json" };
import navn from "./data/navn.json" assert { type: "json" };
import oppfolging from "./data/oppfolging.json" assert { type: "json" };
import selector from "./data/selector.json" assert { type: "json" };
import sisteSaker from "./data/siste-saker.json" assert { type: "json" };
import sakstemaerEgne from "./data/sakstemaer-egne.json" assert { type: "json" };
import varsler from "./data/varsler.json" assert { type: "json" };
import utkast from "./data/utkast.json" assert { type: "json" };
import utkastDigisos from "./data/utkast-digisos.json" assert { type: "json" };
import utbetalinger from "./data/utbetalinger.json" assert { type: "json" };
import innboks from "./data/innboks.json" assert { type: "json" };
import erArbeidssoker from "./data/er-arbeidssoker.json" assert { type: "json" };
import status from "./data/status.json" assert { type: "json" };
import mikrofrontend from "./data/mikrofrontend.js";
import { mikrofrontendBundle } from "./data/microfrontend-oversikt.ts";

const api = new Hono();

api.use("/*", cors({
  origin: "http://localhost:4321",
  credentials: true,
}));

api.get('/meldekortinfo', (c) => {
  return c.json(meldekortinfo);
});

api.get('/navn', (c) => {
  return c.json(navn);
});

api.get('/oppfolging', (c) => {
  return c.json(oppfolging);
});

api.get('/selector/microfrontends', (c) => {
  return c.json(selector);
});

api.get('/varsler', (c) => {
  return c.json(varsler);
});

api.get('/utkast', (c) => {
  return c.json(utkast);
});

api.get('/utkast-digisos', (c) => {
  return c.json(utkastDigisos);
});

api.get('/utbetalinger/siste', (c) => {
  return c.json(utbetalinger);
});

api.get('/innboks', (c) => {
  return c.json(innboks);
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

api.get('/aia/bundle.js', (c) => {
  return new Response(mikrofrontendBundle("AiA", "30vh"),  {
    headers: {
      "Content-Type": "text/javascript",
    },
  });
});

api.get('/aia/manifest.json', (c) => {
  return c.json(aiaManifest)
});

api.get('/meldekort/bundle.js', (c) => {
  return new Response(mikrofrontendBundle("Meldekort", "5vh"),  {
    headers: {
      "Content-Type": "text/javascript",
    },
  });
});

api.get('/siste-saker', (c) => {
  return c.json(sisteSaker);
});

api.get('/sakstemaer/egne', (c) => {
  return c.json(sakstemaerEgne);
});

api.get('/er-arbeidssoker', (c) => {
  return c.json(erArbeidssoker);
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

serve(api);
