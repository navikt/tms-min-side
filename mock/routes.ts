export const isRoute = (route: URLPattern, request: Request) => {
  return route.exec(request.url);
}

export const MANIFEST = new URLPattern({ pathname: "/manifest.json" });
export const MIKROFRONTEND = new URLPattern({ pathname: "/bundle.js" });
export const STATISTIKK = new URLPattern({ pathname: "/statistikk" });
