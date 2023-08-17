import { IDENT, isRoute, MANIFEST, MIKROFRONTEND, NAVN, STATISTIKK, TELEMTRY } from "./routes.ts";
import mikrofrontend from "./data/mikrofrontend.ts";
import manifest from "./data/manifest.json" assert { type: "json" };
import navn from "./data/navn.json" assert { type: "json" };
import ident from "./data/ident.json" assert { type: "json" };

export const handler = (request: Request): Response => {
  if (isRoute(NAVN, request)) {
    return new Response(JSON.stringify(navn), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "personaliaText/javascript",
      },
    });
  }

  if (isRoute(IDENT, request)) {
    return new Response(JSON.stringify(ident), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "personaliaText/javascript",
      },
    });
  }

  if (isRoute(MIKROFRONTEND, request)) {
    return new Response(mikrofrontend, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "personaliaText/javascript",
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
