import { getEnvironmentClientSide } from "@utils/environment.client.ts";

const UTKAST_URL = {
  local: "http://localhost:3000",
  dev: "https://www.intern.dev.nav.no/tms-utkast-mikrofrontend",
  prod: "https://www.nav.no/tms-utkast-mikrofrontend",
};

export const utkastUrl = UTKAST_URL[getEnvironmentClientSide()];
export const utkastManifestUrl = `${utkastUrl}/manifest.json`;
