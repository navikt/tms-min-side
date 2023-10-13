export const isRoute = (route: URLPattern, request: Request) => {
  return route.exec(request.url);
}

export const NAVN = new URLPattern({ pathname: "/navn" });
export const IDENT = new URLPattern({ pathname: "/ident" });
export const VARSLER = new URLPattern({ pathname: "/varsler" });
export const UTKAST = new URLPattern({ pathname: "/utkast" });
export const UTKAST_DIGISOS = new URLPattern({ pathname: "/utkast-digisos" });
export const INNBOKS = new URLPattern({ pathname: "/innboks" });
export const MANIFEST = new URLPattern({ pathname: "/manifest.json" });
export const MIKROFRONTEND = new URLPattern({ pathname: "/bundle.js" });
export const SISTE_SAKER = new URLPattern({ pathname: "/siste-saker" });
export const STATISTIKK = new URLPattern({ pathname: "/statistikk" });
export const TELEMTRY = new URLPattern({ pathname: "/collect" });
