import { getDevBaseUrl, getEnvironmentClientSide } from "@utils/client/environment.ts";

const TIDLIGERE_VARSLER_URL = {
  local: "http://localhost:3000",
  dev: `${getDevBaseUrl}/tms-tidligere-varsler-mikrofrontend`,
  prod: "https://www.nav.no/tms-tidligere-varsler-mikrofrontend",
};

export const tidligereVarslerUrl = TIDLIGERE_VARSLER_URL[getEnvironmentClientSide()];
export const tidligereVarslerManifestUrl = `${tidligereVarslerUrl}/manifest.json`;
