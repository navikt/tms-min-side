export const isRoute = (route: URLPattern, request: Request) => {
  return route.exec(request.url);
}

export const NAVN = new URLPattern({ pathname: "/navn" });
export const IDENT = new URLPattern({ pathname: "/ident" });

export const MANIFEST = new URLPattern({ pathname: "/manifest.json" });
export const MIKROFRONTEND = new URLPattern({ pathname: "/bundle.js" });
export const STATISTIKK = new URLPattern({ pathname: "/statistikk" });
export const TELEMTRY = new URLPattern({ pathname: "/collect" });
