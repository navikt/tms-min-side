import {
  getIsAnsattClientSide,
  getDevBaseUrl,
  getEnvironmentClientSide,
} from "@utils/client/environment.ts";

const MIN_SIDE_PROXY_URL = {
  local: "http://localhost:3000/tms-min-side-proxy",
  dev: `${getDevBaseUrl}/tms-min-side-proxy`,
  prod: "https://www.nav.no/tms-min-side-proxy",
};

const MELDEKORT_URL = {
  local: "http://localhost:3000/meldekort/bundle.js",
  dev: "https://www.intern.dev.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
  prod: "https://www.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
};

const SELECTOR_URL = {
  local: "http://localhost:3000/selector",
  dev: `${getDevBaseUrl}/tms-min-side-proxy/selector`,
  prod: "https://www.nav.no/tms-min-side-proxy/selector",
};

const DIALOG_MED_VEILEDER_URL = {
  local: "http://localhost:3000/arbeid/dialog",
  dev: "https://pto.ekstern.dev.nav.no/arbeid/dialog",
  prod: "https://www.nav.no/arbeid/dialog",
};

const AKTIVITETSPLAN_URL = {
  local: "http://localhost:3000/api/aktivitetsplan",
  dev: "https://aktivitetsplan.ekstern.dev.nav.no/",
  prod: "https://aktivitetsplan.nav.no/",
};

const meldekortAnsattUrl = "https://arbeid.ansatt.dev.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js";
export const meldekortUrl = getIsAnsattClientSide() ? meldekortAnsattUrl : MELDEKORT_URL[getEnvironmentClientSide()];
export const dinOversiktUrl = `${SELECTOR_URL[getEnvironmentClientSide()]}/din-oversikt`;
export const featureToggleUrl = `${MIN_SIDE_PROXY_URL[getEnvironmentClientSide()]}/featuretoggles`;
export const dialogMedVeilederUrl = DIALOG_MED_VEILEDER_URL[getEnvironmentClientSide()];
export const aktivitetsplanUrl = AKTIVITETSPLAN_URL[getEnvironmentClientSide()];
