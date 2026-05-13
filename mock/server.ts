import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
// import { HTTPException } from "hono/http-exception";
import aktuelt from "./data/aktuelt.json" with { type: "json" };
import dinOversikt from "./data/din-oversikt.json" with { type: "json" };
import journalposter from "./data/dokumenter.json" with { type: "json" };
import innboks from "./data/innboks.json" with { type: "json" };
import { mockMicrofrontend } from "./data/microfrontend/mockMicrofrontend.ts";
import navn from "./data/navn.json" with { type: "json" };
import status from "./data/status.json" with { type: "json" };
import utbetalinger from "./data/utbetalinger.json" with { type: "json" };
import utkast from "./data/utkast.json" with { type: "json" };
import varsler from "./data/varsler.json" with { type: "json" };

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

api.get("/aktuelt", (c) => {
  return c.json(aktuelt);
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

api.get("/meldekort/*", (c) => {
  return c.html(mockMicrofrontend("Meldekort"));
});

api.get("/pensjonskalkulator/*", (c) => {
  return c.html(mockMicrofrontend("Pensjonskalkulator"));
});

api.get("/syfo-dialog/*", (c) => {
  return c.html(mockMicrofrontend("Syfo dialog"));
});

api.get("/aap/*", (c) => {
  return c.html(mockMicrofrontend("AAP"));
});

serve(api);
