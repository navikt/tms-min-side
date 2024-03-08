import { getEnvironmentClientSide } from "@utils/environment.client.ts";

const MIN_SIDE_PROXY_URL = {
  local: "http://localhost:3000/tms-min-side-proxy",
  dev: "https://www.intern.dev.nav.no/tms-min-side-proxy",
  prod: "https://www.nav.no/tms-min-side-proxy",
};

const MELDEKORT_URL = {
  local: "http://localhost:3000/meldekort/bundle.js",
  dev: "https://www.intern.dev.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
  prod: "https://www.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
};

const SELECTOR_URL = {
  local: "http://localhost:3000/selector",
  dev: "https://www.intern.dev.nav.no/tms-min-side-proxy/selector",
  prod: "https://www.nav.no/tms-min-side-proxy/selector",
};

const OPPFOLGING_URL = {
  local: "http://localhost:3000/oppfolging",
  dev: "https://www.intern.dev.nav.no/tms-min-side-proxy/oppfolging",
  prod: "https://www.nav.no/tms-min-side-proxy/oppfolging",
};

const DIALOG_MED_VEILEDER_URL = {
  local: "http://localhost:3000/arbeid/dialog",
  dev: "https://pto.ekstern.dev.nav.no/arbeid/dialog",
  prod: "https://www.nav.no/arbeid/dialog",
};

const MINE_SAKER_SAKSTEMAER_URL = {
  local: "http://localhost:3000/sakstemaer/egne",
  dev: "https://www.intern.dev.nav.no/mine-saker-api/sakstemaer/egne",
  prod: "https://person.nav.no/mine-saker-api/sakstemaer/egne",
};

const AIA_URL = {
  local: "http://localhost:3000/aia",
  dev: "https://veientilarbeid.intern.dev.nav.no/esm",
  prod: "https://veientilarbeid.nav.no/esm",
};

const AIA_CDN_URL = {
  local: "http://localhost:3000/aia",
  dev: "https://cdn.nav.no/paw/aia",
  prod: "https://cdn.nav.no/paw/aia",
};

const ARBEIDSSOKER_URL = {
  local: "http://localhost:3000/er-arbeidssoker",
  dev: "https://www.intern.dev.nav.no/tms-min-side-proxy/aia/aia-backend/er-arbeidssoker",
  prod: "https://www.nav.no/tms-min-side-proxy/aia/aia-backend/er-arbeidssoker",
};

const MELDEKORT_API_URL = {
  local: "http://localhost:3000/meldekortinfo",
  dev: "https://www.intern.dev.nav.no/tms-min-side-proxy/meldekort/api/person/meldekortstatus",
  prod: "https://www.nav.no/tms-min-side-proxy/meldekort/api/person/meldekortstatus",
};

const AKTIVITETSPLAN_URL = {
  local: "http://localhost:3000/api/aktivitetsplan",
  dev: "https://aktivitetsplan.ekstern.dev.nav.no/",
  prod: "https://aktivitetsplan.nav.no/",
};

export const meldekortUrl = MELDEKORT_URL[getEnvironmentClientSide()];
export const microfrontendsUrl = `${SELECTOR_URL[getEnvironmentClientSide()]}/microfrontends`;
export const oppfolgingUrl = OPPFOLGING_URL[getEnvironmentClientSide()];
export const mineSakerSakstemaerUrl = MINE_SAKER_SAKSTEMAER_URL[getEnvironmentClientSide()];
export const featureToggleUrl = `${MIN_SIDE_PROXY_URL[getEnvironmentClientSide()]}/featuretoggles`;
export const dialogMedVeilederUrl = DIALOG_MED_VEILEDER_URL[getEnvironmentClientSide()];
export const arbeidssokerUrl = ARBEIDSSOKER_URL[getEnvironmentClientSide()];
export const aiaManifestUrl = `${AIA_URL[getEnvironmentClientSide()]}/manifest.json`;
export const aiaCdnUrl = AIA_CDN_URL[getEnvironmentClientSide()];
export const meldekortApiUrl = MELDEKORT_API_URL[getEnvironmentClientSide()];
export const aktivitetsplanUrl = AKTIVITETSPLAN_URL[getEnvironmentClientSide()];
