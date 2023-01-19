import { getEnvironment } from "./api/environment";

const MIN_SIDE_URL = {
  local: "http://localhost:3000/minside",
  development: "https://www.dev.nav.no/minside",
  production: "https://www.nav.no/minside",
};

const MIN_SIDE_PROXY_URL = {
  local: "http://localhost:3000/tms-min-side-proxy",
  development: "https://www.dev.nav.no/tms-min-side-proxy",
  production: "https://www.nav.no/tms-min-side-proxy",
};

const BASE_URL = {
  local: "http://localhost:3000",
  development: "https://www.dev.nav.no",
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

const ARBEIDSSOKER_URL = {
  local: "http://localhost:3000/dittnav-api/arbeidssoker",
  development: "https://www.dev.nav.no/aia-backend/er-arbeidssoker",
  production: "https://www.nav.no/aia-backend/er-arbeidssoker",
};

const AIA_BASE_URL = {
  local: "http://localhost:3000/aia/bundle.js",
  development: "https://veientilarbeid.dev.nav.no/esm",
  production: "https://veientilarbeid.nav.no/esm",
};

const MELDEKORT_URL = {
  local: "http://localhost:3000/meldekort/bundle.js",
  development: "https://www.dev.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
  production: "https://www.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
};

const OVERSIKT_BASE_URL = {
  local: "http://localhost:3000/tms-min-side-oversikt/bundle.js",
  development: "https://person.dev.nav.no/tms-oversikt-mikrofrontend",
  production: "https://www.nav.no/tms-oversikt-mikrofrontend",
};

const TJENESTER_BASE_URL = {
  local: "http://localhost:3000/tms-min-side-tjenester/bundle.js",
  development: "https://person.dev.nav.no/tms-min-side-tjenester",
  production: "https://www.nav.no/tms-min-side-tjenester",
};

const VARSLINGER_BASE_URL = {
  local: "http://localhost:3000/tms-min-side-varslinger/bundle.js",
  development: "https://person.dev.nav.no/tms-min-side-varslinger",
  production: "https://www.nav.no/tms-min-side-varslinger",
};

const UTKAST_BASE_URL = {
  local: "http://localhost:3000/tms-utkast-mikrofrontend/bundle.js",
  development: "https://www.dev.nav.no/tms-utkast-mikrofrontend",
  production: "https://www.nav.no/tms-utkast-mikrofrontend",
};

export const minSideUrl = MIN_SIDE_URL[getEnvironment()];
export const minSideProxyUrl = MIN_SIDE_PROXY_URL[getEnvironment()];
export const authenticationUrl = `${MIN_SIDE_PROXY_URL[getEnvironment()]}/login/status`;
export const legacyAuthenticationUrl = LEGACY_AUTHENTICATION_URL[getEnvironment()];
export const loginserviceUrl = LOGINSERVICE_URL[getEnvironment()];
export const baseUrl = BASE_URL[getEnvironment()];
export const arbeidssokerUrl = ARBEIDSSOKER_URL[getEnvironment()];
export const aiaBaseUrl = AIA_BASE_URL[getEnvironment()];
export const aiaManifestUrl = `${AIA_BASE_URL[getEnvironment()]}/manifest.json`;
export const meldekortUrl = MELDEKORT_URL[getEnvironment()];
export const oversiktBaseUrl = OVERSIKT_BASE_URL[getEnvironment()];
export const oversiktManifestUrl = `${OVERSIKT_BASE_URL[getEnvironment()]}/manifest.json`;
export const tjenesterBaseUrl = TJENESTER_BASE_URL[getEnvironment()];
export const tjenesterManifestUrl = `${TJENESTER_BASE_URL[getEnvironment()]}/manifest.json`;
export const utkastBaseUrl = UTKAST_BASE_URL[getEnvironment()];
export const utkastManifestUrl = `${UTKAST_BASE_URL[getEnvironment()]}/manifest.json`;
export const varslingerBaseUrl = VARSLINGER_BASE_URL[getEnvironment()];
export const varslingerManifestUrl = `${VARSLINGER_BASE_URL[getEnvironment()]}/manifest.json`;
