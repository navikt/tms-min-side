import { getEnvironmentClientSide } from "../../utils/environment.client";

const INNLOGGINGSSTATISTIKK_URL = {
  local: "http://localhost:4000/statistikk",
  dev: "https://www.intern.dev.nav.no/tms-min-side-proxy/statistikk/innlogging",
  prod: "https://www.nav.no/tms-min-side-proxy/statistikk/innlogging",
};

const OVERSIKT_URL = {
  local: "http://localhost:4000",
  dev: "https://www.intern.dev.nav.no/tms-oversikt-mikrofrontend",
  prod: "https://www.nav.no/tms-oversikt-mikrofrontend",
};

const OVERSIKT_CDN_URL = {
  local: "http://localhost:4000",
  dev: "https://cdn.nav.no/min-side/tms-oversikt-mikrofrontend/dist",
  prod: "https://cdn.nav.no/min-side/tms-oversikt-mikrofrontend/dist",
};

export const innloggingsstatistikkUrl = `${INNLOGGINGSSTATISTIKK_URL[getEnvironmentClientSide()]}`;
export const oversiktCdnUrl = OVERSIKT_CDN_URL[getEnvironmentClientSide()];
export const oversiktManifestUrl = `${OVERSIKT_URL[getEnvironmentClientSide()]}/manifest.json`;

