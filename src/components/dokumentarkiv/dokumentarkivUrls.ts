import { getEnvironmentClientSide } from "../../utils/environment.client.ts";

const SISTE_SAKER_URL = {
  local: "http://localhost:4000/siste-saker",
  dev: "https://www.intern.dev.nav.no/mine-saker-api/siste",
  prod: "https://person.nav.no/mine-saker-api/siste",
};

const DOKUMENTARKIV_URL = {
  local: "http://localhost:4000/utkast",
  dev: "https://www.intern.dev.nav.no/tms-min-side-proxy/utkast/utkast/antall",
  prod: "https://www.nav.no/tms-min-side-proxy/utkast/utkast/antall",
};

export const dokumentarkivUrl = DOKUMENTARKIV_URL[getEnvironmentClientSide()];
export const mineSakerApiSisteUrl = SISTE_SAKER_URL[getEnvironmentClientSide()];
