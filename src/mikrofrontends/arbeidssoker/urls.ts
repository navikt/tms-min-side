import { getEnvironmentClientSide } from "../../utils/environment.client";

const AIA_URL = {
  local: "http://localhost:4000",
  dev: "https://veientilarbeid.intern.dev.nav.no/esm",
  prod: "https://veientilarbeid.nav.no/esm",
};

const AIA_CDN_URL = {
  local: "http://localhost:4000",
  dev: "https://cdn.nav.no/paw/aia",
  prod: "https://cdn.nav.no/paw/aia",
};


export const aiaCdnUrl = AIA_CDN_URL[getEnvironmentClientSide()];
export const aiaManifestUrl = `${AIA_URL[getEnvironmentClientSide()]}/manifest.json`;
