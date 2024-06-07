import { getEnvironmentClientSide } from "@utils/environment.client.ts";

const MIN_SIDE_PROXY_URL = {
  local: "http://localhost:3000/tms-min-side-proxy",
  dev: "https://www.ansatt.dev.nav.no/tms-min-side-proxy",
  prod: "https://www.nav.no/tms-min-side-proxy",
};

const MELDEKORT_URL = {
  local: "http://localhost:3000/meldekort/bundle.js",
  dev: "https://www.intern.dev.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
  prod: "https://www.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
};

const SELECTOR_URL = {
  local: "http://localhost:3000/selector",
  dev: "https://www.ansatt.dev.nav.no/tms-min-side-proxy/selector",
  prod: "https://www.nav.no/tms-min-side-proxy/selector",
};

const DIALOG_MED_VEILEDER_URL = {
  local: "http://localhost:3000/arbeid/dialog",
  dev: "https://pto.ekstern.dev.nav.no/arbeid/dialog",
  prod: "https://www.nav.no/arbeid/dialog",
};

const AIA_URL = {
  local: "http://localhost:3000/aia",
  dev: "https://veientilarbeid.intern.dev.nav.no/esm",
  prod: "https://veientilarbeid.nav.no/esm",
};

const NY_AIA_URL = {
  local: "http://localhost:3000/aia",
  dev: "https://aia-min-side.intern.dev.nav.no/esm",
  prod: "https://aia-min-side.nav.no/esm",
};

const AIA_CDN_URL = {
  local: "http://localhost:3000/aia",
  dev: "https://cdn.nav.no/paw/aia",
  prod: "https://cdn.nav.no/paw/aia",
};

const AKTIVITETSPLAN_URL = {
  local: "http://localhost:3000/api/aktivitetsplan",
  dev: "https://aktivitetsplan.ekstern.dev.nav.no/",
  prod: "https://aktivitetsplan.nav.no/",
};

export const meldekortUrl = MELDEKORT_URL[getEnvironmentClientSide()];
export const dinOversiktUrl = `${SELECTOR_URL[getEnvironmentClientSide()]}/din-oversikt`;
export const featureToggleUrl = `${MIN_SIDE_PROXY_URL[getEnvironmentClientSide()]}/featuretoggles`;
export const dialogMedVeilederUrl = DIALOG_MED_VEILEDER_URL[getEnvironmentClientSide()];
export const aiaManifestUrl = `${AIA_URL[getEnvironmentClientSide()]}/manifest.json`;
export const nyAiaManifestUrl = `${NY_AIA_URL[getEnvironmentClientSide()]}/manifest.json`;
export const aiaCdnUrl = AIA_CDN_URL[getEnvironmentClientSide()];
export const aktivitetsplanUrl = AKTIVITETSPLAN_URL[getEnvironmentClientSide()];
