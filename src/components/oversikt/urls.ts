import { getEnvironment } from "@components/oversikt/utils/getEnvironment.ts";

const MIN_SIDE_PROXY_URL = {
  local: "http://localhost:3000/tms-min-side-proxy",
  development: "https://www.intern.dev.nav.no/tms-min-side-proxy",
  production: "https://www.nav.no/tms-min-side-proxy",
};

const MELDEKORT_URL = {
  local: "http://localhost:3000/meldekort/bundle.js",
  development: "https://www.intern.dev.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
  production: "https://www.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
};

const SELECTOR_URL = {
  local: "http://localhost:3000/selector",
  development: "https://www.intern.dev.nav.no/tms-min-side-proxy/selector",
  production: "https://www.nav.no/tms-min-side-proxy/selector",
};

const OPPFOLGING_URL = {
  local: "http://localhost:3000/oppfolging",
  development: "https://www.intern.dev.nav.no/tms-min-side-proxy/oppfolging",
  production: "https://www.nav.no/tms-min-side-proxy/oppfolging",
};

const DIALOG_MED_VEILEDER_URL = {
  local: "http://localhost:3000/arbeid/dialog",
  development: "https://pto.ekstern.dev.nav.no/arbeid/dialog",
  production: "https://www.nav.no/arbeid/dialog",
};

const MINE_SAKER_SAKSTEMAER_URL = {
  local: "http://localhost:3000/sakstemaer/egne",
  development: "https://www.intern.dev.nav.no/mine-saker-api/sakstemaer/egne",
  production: "https://person.nav.no/mine-saker-api/sakstemaer/egne",
};

const AIA_URL = {
  local: "http://localhost:3000/aia",
  development: "https://veientilarbeid.intern.dev.nav.no/esm",
  production: "https://veientilarbeid.nav.no/esm",
};

const AIA_CDN_URL = {
  local: "http://localhost:3000/aia",
  development: "https://cdn.nav.no/paw/aia",
  production: "https://cdn.nav.no/paw/aia",
};

const ARBEIDSSOKER_URL = {
  local: "http://localhost:3000/er-arbeidssoker",
  development: "https://www.intern.dev.nav.no/tms-min-side-proxy/aia/aia-backend/er-arbeidssoker",
  production: "https://www.nav.no/tms-min-side-proxy/aia/aia-backend/er-arbeidssoker",
};

const MELDEKORT_API_URL = {
  local: "http://localhost:3000/meldekortinfo",
  development: "https://www.intern.dev.nav.no/tms-min-side-proxy/meldekort/api/person/meldekortstatus",
  production: "https://www.nav.no/tms-min-side-proxy/meldekort/api/person/meldekortstatus",
};

const AKTIVITETSPLAN_URL = {
  local: "http://localhost:3000/api/aktivitetsplan",
  development: "https://aktivitetsplan.ekstern.dev.nav.no/",
  production: "https://aktivitetsplan.nav.no/",
};

export const meldekortUrl = MELDEKORT_URL[getEnvironment()];
export const microfrontendsUrl = `${SELECTOR_URL[getEnvironment()]}/microfrontends`;
export const oppfolgingUrl = OPPFOLGING_URL[getEnvironment()];
export const mineSakerSakstemaerUrl = MINE_SAKER_SAKSTEMAER_URL[getEnvironment()];
export const featureToggleUrl = `${MIN_SIDE_PROXY_URL[getEnvironment()]}/featuretoggles`;
export const dialogMedVeilederUrl = DIALOG_MED_VEILEDER_URL[getEnvironment()];
export const arbeidssokerUrl = ARBEIDSSOKER_URL[getEnvironment()];
export const aiaManifestUrl = `${AIA_URL[getEnvironment()]}/manifest.json`;
export const aiaCdnUrl = AIA_CDN_URL[getEnvironment()];
export const meldekortApiUrl = MELDEKORT_API_URL[getEnvironment()];
export const aktivitetsplanUrl = AKTIVITETSPLAN_URL[getEnvironment()];
