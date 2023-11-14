import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import manifest from "./data/manifest.json" assert { type: "json" };
import navn from "./data/navn.json" assert { type: "json" };
import sisteSaker from "./data/siste-saker.json" assert { type: "json" };
import varsler from "./data/varsler.json" assert { type: "json" };
import utkast from "./data/utkast.json" assert { type: "json" };
import utkastDigisos from "./data/utkast-digisos.json" assert { type: "json" };
import utbetalinger from "./data/utbetalinger.json" assert { type: "json" };
import innboks from "./data/innboks.json" assert { type: "json" };
import erArbeidssoker from "./data/er-arbeidssoker.json" assert { type: "json" };
import mikrofrontend from "./data/mikrofrontend.js";

const api = new Hono();

api.use("/*", cors({
  origin: "http://localhost:4321",
  credentials: true,
}));

api.get('/navn', (c) => {
  return c.json(navn);
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

api.get('/siste', (c) => {
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

api.get('/siste-saker', (c) => {
  return c.json(sisteSaker);
});

api.get('/er-arbeidssoker', (c) => {
  return c.json(erArbeidssoker);
});

api.post('/statistikk', (c) => {
  return c.text("Done");
});

api.post('/collect', (c) => {
  return c.text("Done")
});

serve(api);
