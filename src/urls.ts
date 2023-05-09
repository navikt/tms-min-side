import { getEnvironment } from "./api/environment";

const MIN_SIDE_PROXY_URL = {
  local: "http://localhost:3000/tms-min-side-proxy",
  development: "https://www.intern.dev.nav.no/tms-min-side-proxy",
  production: "https://www.nav.no/tms-min-side-proxy",
};

const BASE_URL = {
  local: "http://localhost:3000",
  development: "https://www.intern.dev.nav.no",
  production: "https://www.nav.no",
};

const AIA_BASE_URL = {
  local: "http://localhost:3000/aia/bundle.js",
  development: "https://veientilarbeid.intern.dev.nav.no/esm",
  production: "https://veientilarbeid.nav.no/esm",
};

const AIA_BASE_CDN_URL = {
  local: "http://localhost:3000/aia/bundle.js",
  development: "https://cdn.nav.no/paw/aia",
  production: "https://cdn.nav.no/paw/aia",
};

const OVERSIKT_BASE_URL = {
  local: "http://localhost:3000/oversikt",
  development: "https://www.intern.dev.nav.no/tms-oversikt-mikrofrontend",
  production: "https://www.nav.no/tms-oversikt-mikrofrontend",
};

const OVERSIKT_BASE_CDN_URL = {
  local: "http://localhost:3000/oversikt",
  development: "https://cdn.nav.no/min-side/tms-oversikt-mikrofrontend/dist",
  production: "https://cdn.nav.no/min-side/tms-oversikt-mikrofrontend/dist",
};

const TIDLIGERE_VARSLER_BASE_URL = {
  local: "http://localhost:3000/tms-min-side-varslinger/bundle.js",
  development: "https://www.intern.dev.nav.no/tms-min-side-varslinger",
  production: "https://www.nav.no/tms-min-side-varslinger",
};

const UTKAST_BASE_URL = {
  local: "http://localhost:3000/tms-utkast-mikrofrontend/bundle.js",
  development: "https://www.intern.dev.nav.no/tms-utkast-mikrofrontend",
  production: "https://www.nav.no/tms-utkast-mikrofrontend",
};

const VARSLER_URL = {
  local: "http://localhost:3000/tms-varsler/bundle.js",
  development: "https://www.intern.dev.nav.no/tms-varsler-mikrofrontend/tms-varsler-mikrofrontend.js",
  production: "https://www.nav.no/tms-varsler-mikrofrontend/tms-varsler-mikrofrontend.js",
};

export const minSideProxyUrl = MIN_SIDE_PROXY_URL[getEnvironment()];
export const authenticationUrl = `${MIN_SIDE_PROXY_URL[getEnvironment()]}/login/status`;
export const baseUrl = BASE_URL[getEnvironment()];
export const aiaBaseCdnUrl = AIA_BASE_CDN_URL[getEnvironment()];
export const aiaManifestUrl = `${AIA_BASE_URL[getEnvironment()]}/manifest.json`;
export const oversiktBaseCdnUrl = OVERSIKT_BASE_CDN_URL[getEnvironment()];
export const oversiktManifestUrl = `${OVERSIKT_BASE_URL[getEnvironment()]}/manifest.json`;
export const tidligereVarslerBaseUrl = TIDLIGERE_VARSLER_BASE_URL[getEnvironment()];
export const tidligereVarslerManifestUrl = `${TIDLIGERE_VARSLER_BASE_URL[getEnvironment()]}/manifest.json`;
export const utkastBaseUrl = UTKAST_BASE_URL[getEnvironment()];
export const utkastManifestUrl = `${UTKAST_BASE_URL[getEnvironment()]}/manifest.json`;
export const varslerUrl = VARSLER_URL[getEnvironment()];
export const innloggingsstatistikkUrl = `${MIN_SIDE_PROXY_URL[getEnvironment()]}/statistikk/innlogging`;

export const baseUrlWithLanguage = {
  nb: `${baseUrl}/minside`,
  en: `${baseUrl}/minside/en`,
  nn: `${baseUrl}/minside/nn`,
};
