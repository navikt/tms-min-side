import { getEnvironmentClientSide } from "@utils/client/environment.ts";

const VARSLER_URL = {
  local: "http://localhost:3000",
  dev: "https://www.intern.dev.nav.no/tms-varsler-mikrofrontend",
  prod: "https://www.nav.no/tms-varsler-mikrofrontend",
};

const VARSLER_CDN_URL = {
  local: "http://localhost:3000",
  dev: "https://cdn.nav.no/min-side/tms-varsler-mikrofrontend/dist",
  prod: "https://cdn.nav.no/min-side/tms-varsler-mikrofrontend/dist",
};

export const varslerCdnUrl = VARSLER_CDN_URL[getEnvironmentClientSide()];
export const varslerManifestUrl = `${VARSLER_URL[getEnvironmentClientSide()]}/manifest.json`;
