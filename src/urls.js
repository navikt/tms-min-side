import { getEnvironment } from "./api/environment";

const MIN_SIDE_PROXY_URL = {
  local: "http://localhost:3000/tms-min-side-proxy",
  development: "https://www.dev.nav.no/tms-min-side-proxy",
  production: "https://www.nav.no/tms-min-side-proxy",
};

const BASE_URL = {
  local: "http://localhost:3000",
  development: "https://www.intern.dev.nav.no",
  production: "https://www.nav.no",
};

const LEGACY_AUTHENTICATION_URL = {
  local: "http://localhost:3000/dittnav-api/authPing",
  development: "https://www.dev.nav.no/dittnav-api/authPing",
  production: "https://www.nav.no/dittnav-api/authPing",
};

const LOGINSERVICE_URL = {
  local: "http://localhost:3000/loginservice",
  development: "https://loginservice.dev.nav.no/login?level=Level3",
  production: "https://loginservice.nav.no/login?level=Level3",
};

const AAP_BASE_URL = {
  local: "http://localhost:3000/aap/bundle.js",
  development: "https://www.dev.nav.no/aap/aap-min-side-microfrontend",
  production: "https://www.nav.no/aap/aap-min-side-microfrontend",
};

const AAP_BASE_CDN_URL = {
  local: "http://localhost:3000/aap/bundle.js",
  development: "https://cdn.nav.no/aap/aap-min-side-microfrontend/dist",
  production: "https://cdn.nav.no/aap/aap-min-side-microfrontend/dist",
};

const ARBEIDSSOKER_URL = {
  local: "http://localhost:3000/dittnav-api/arbeidssoker",
  development: "https://www.intern.dev.nav.no/aia-backend/er-arbeidssoker",
  production: "https://www.nav.no/aia-backend/er-arbeidssoker",
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

const MELDEKORT_URL = {
  local: "http://localhost:3000/meldekort/bundle.js",
  development: "https://www.dev.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
  production: "https://www.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
};

const OVERSIKT_BASE_URL = {
  local: "http://localhost:3000/tms-min-side-oversikt/bundle.js",
  development: "https://www.intern.dev.nav.no/tms-oversikt-mikrofrontend",
  production: "https://www.nav.no/tms-oversikt-mikrofrontend",
};

const OVERSIKT_BASE_CDN_URL = {
  local: "http://localhost:3000/tms-min-side-oversikt/bundle.js",
  development: "https://cdn.nav.no/min-side/tms-oversikt-mikrofrontend/dist",
  production: "https://cdn.nav.no/min-side/tms-oversikt-mikrofrontend/dist",
};

const TIDLIGERE_VARSLER_BASE_URL = {
  local: "http://localhost:3000/tms-min-side-varslinger/bundle.js",
  development: "https://www.intern.dev.nav.no/tms-min-side-varslinger",
  production: "https://www.nav.no/tms-min-side-varslinger",
};

const TJENESTER_BASE_URL = {
  local: "http://localhost:3000/tms-min-side-tjenester/bundle.js",
  development: "https://www.intern.dev.nav.no/tms-min-side-tjenester",
  production: "https://www.nav.no/tms-min-side-tjenester",
};

const TJENESTER_BASE_CDN_URL = {
  local: "http://localhost:3000/tms-min-side-tjenester/bundle.js",
  development: "https://cdn.nav.no/min-side/tms-min-side-tjenester/dist",
  production: "https://cdn.nav.no/min-side/tms-min-side-tjenester/dist",
};

const UTKAST_BASE_URL = {
  local: "http://localhost:3000/tms-utkast-mikrofrontend/bundle.js",
  development: "https://www.intern.dev.nav.no/tms-utkast-mikrofrontend",
  production: "https://www.nav.no/tms-utkast-mikrofrontend",
};

const VARSLER_URL = {
  local: "http://localhost:3000/tms-varsler/bundle.js",
  development: "https://www.intern.dev.nav.no/tms-varsler/tms-varsler.js",
  production: "https://www.nav.no/tms-varsler/tms-varsler.js",
};

const SELECTOR_URL = {
  local: "http://localhost:3000/tms-min-side-proxy/selector/mikrofrontends",
  development: "https://www.dev.nav.no/tms-min-side-proxy/selector/mikrofrontends",
  production: "https://www.nav.no/tms-min-side-proxy/selector/mikrofrontends",
};

export const minSideProxyUrl = MIN_SIDE_PROXY_URL[getEnvironment()];
export const authenticationUrl = `${MIN_SIDE_PROXY_URL[getEnvironment()]}/login/status`;
export const legacyAuthenticationUrl = LEGACY_AUTHENTICATION_URL[getEnvironment()];
export const loginserviceUrl = LOGINSERVICE_URL[getEnvironment()];
export const baseUrl = BASE_URL[getEnvironment()];
export const aapBaseCdnUrl = AAP_BASE_CDN_URL[getEnvironment()];
export const aapManifestUrl = `${AAP_BASE_URL[getEnvironment()]}/manifest.json`;
export const arbeidssokerUrl = ARBEIDSSOKER_URL[getEnvironment()];
export const aiaBaseCdnUrl = AIA_BASE_CDN_URL[getEnvironment()];
export const aiaManifestUrl = `${AIA_BASE_URL[getEnvironment()]}/manifest.json`;
export const meldekortUrl = MELDEKORT_URL[getEnvironment()];
export const oversiktBaseCdnUrl = OVERSIKT_BASE_CDN_URL[getEnvironment()];
export const oversiktManifestUrl = `${OVERSIKT_BASE_URL[getEnvironment()]}/manifest.json`;
export const tidligereVarslerBaseUrl = TIDLIGERE_VARSLER_BASE_URL[getEnvironment()];
export const tidligereVarslerManifestUrl = `${TIDLIGERE_VARSLER_BASE_URL[getEnvironment()]}/manifest.json`;
export const tjenesterBaseCdnUrl = TJENESTER_BASE_CDN_URL[getEnvironment()];
export const tjenesterManifestUrl = `${TJENESTER_BASE_URL[getEnvironment()]}/manifest.json`;
export const utkastBaseUrl = UTKAST_BASE_URL[getEnvironment()];
export const utkastManifestUrl = `${UTKAST_BASE_URL[getEnvironment()]}/manifest.json`;
export const varslerUrl = VARSLER_URL[getEnvironment()];
export const selectorUrl = SELECTOR_URL[getEnvironment()];
export const innloggingsstatistikkUrl = `${MIN_SIDE_PROXY_URL[getEnvironment()]}/statistikk/innlogging`;

export const baseUrlWithLanguage = {
  nb: `${baseUrl}/minside`,
  en: `${baseUrl}/minside/en`,
  nn: `${baseUrl}/minside/nn`,
};
