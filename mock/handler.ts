import { isRoute, MANIFEST, MIKROFRONTEND, STATISTIKK } from "./routes.ts";
import mikrofrontend from "./data/mikrofrontend.ts";
import manifest from "./data/manifest.json" assert { type: "json" };

export const handler = (request: Request): Response => {
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

  if (isRoute(STATISTIKK, request)) {
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
