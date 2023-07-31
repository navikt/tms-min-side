import { getEnvironmentClientSide } from "../../utils/environment.client";

const UTKAST_URL = {
  local: "http://localhost:4000",
  dev: "https://www.intern.dev.nav.no/tms-utkast-mikrofrontend",
  prod: "https://www.nav.no/tms-utkast-mikrofrontend",
};

export const utkastUrl = UTKAST_URL[getEnvironmentClientSide()];
export const utkastManifestUrl = `${utkastUrl}/manifest.json`;
