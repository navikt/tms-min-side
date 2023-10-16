import { getEnvironmentClientSide } from "../../utils/environment.client";

const AIA_URL = {
  local: "http://localhost:3000",
  dev: "https://veientilarbeid.intern.dev.nav.no/esm",
  prod: "https://veientilarbeid.nav.no/esm",
};

const AIA_CDN_URL = {
  local: "http://localhost:3000",
  dev: "https://cdn.nav.no/paw/aia",
  prod: "https://cdn.nav.no/paw/aia",
};

const ARBEIDSSOKER_URL = {
  local: "http://localhost:3000/er-arbeidssoker",
  dev: "https://www.intern.dev.nav.no/tms-min-side-proxy/aia/aia-backend/er-arbeidssoker",
  prod: "https://www.nav.no/tms-min-side-proxy/aia/aia-backend/er-arbeidssoker",
};

export const aiaCdnUrl = AIA_CDN_URL[getEnvironmentClientSide()];
export const aiaManifestUrl = `${AIA_URL[getEnvironmentClientSide()]}/manifest.json`;
export const arbeidssokerUrl = ARBEIDSSOKER_URL[getEnvironmentClientSide()];
