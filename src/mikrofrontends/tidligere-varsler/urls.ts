import { getEnvironmentClientSide } from "@utils/environment.client.ts";

const TIDLIGERE_VARSLER_URL = {
  local: "http://localhost:3000",
  dev: "https://www.intern.dev.nav.no/tms-min-side-varslinger",
  prod: "https://www.nav.no/tms-min-side-varslinger",
};

export const tidligereVarslerUrl = TIDLIGERE_VARSLER_URL[getEnvironmentClientSide()];
export const tidligereVarslerManifestUrl = `${tidligereVarslerUrl}/manifest.json`;
