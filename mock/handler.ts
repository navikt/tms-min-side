import { IDENT, INNBOKS, isRoute, MANIFEST, MIKROFRONTEND, NAVN, SISTE_SAKER } from "./routes.ts";
import { STATISTIKK, TELEMTRY, UTKAST, UTKAST_DIGISOS, VARSLER } from "./routes.ts";
import mikrofrontend from "./data/mikrofrontend.ts";
import manifest from "./data/manifest.json" assert { type: "json" };
import navn from "./data/navn.json" assert { type: "json" };
import sisteSaker from "./data/siste-saker.json" assert { type: "json" };
import varsler from "./data/varsler.json" assert { type: "json" };
import utkast from "./data/utkast.json" assert { type: "json" };
import utkastDigisos from "./data/utkast-digisos.json" assert { type: "json" };
import innboks from "./data/innboks.json" assert { type: "json" };

export const handler = (request: Request): Response => {
  if (isRoute(NAVN, request)) {
    return new Response(JSON.stringify(navn), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }

  if (isRoute(VARSLER, request)) {
    return new Response(JSON.stringify(varsler), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }

  if (isRoute(UTKAST, request)) {
    return new Response(JSON.stringify(utkast), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }

  if (isRoute(UTKAST_DIGISOS, request)) {
    return new Response(JSON.stringify(utkastDigisos), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }

  if (isRoute(INNBOKS, request)) {
    return new Response(JSON.stringify(innboks), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }

  if (isRoute(MIKROFRONTEND, request)) {
    return new Response(mikrofrontend, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/javascript",
      },
    });
  }

  if (isRoute(MANIFEST, request)) {
    return new Response(JSON.stringify(manifest), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json;",
      },
    });
  }

  if (isRoute(SISTE_SAKER, request)) {
    return new Response(JSON.stringify(sisteSaker), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (isRoute(STATISTIKK, request)) {
    return new Response("", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (isRoute(TELEMTRY, request)) {
    return new Response("", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  return new Response("Mock server is running", {
    status: 200,
  });
};
