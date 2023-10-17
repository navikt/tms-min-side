import { getEnvironmentClientSide } from "../../utils/environment.client.ts";

const SISTE_SAKER_URL = {
  local: "http://localhost:3000/siste-saker",
  dev: "https://www.intern.dev.nav.no/mine-saker-api/siste",
  prod: "https://person.nav.no/mine-saker-api/siste",
};

const DOKUMENTARKIV_URL = {
  local: "http://localhost:3000/mine-saker",
  dev: "https://www.intern.dev.nav.no/mine-saker",
  prod: "https://person.nav.no/mine-saker",
};

export const dokumentarkivUrl = DOKUMENTARKIV_URL[getEnvironmentClientSide()];
export const mineSakerApiSisteUrl = SISTE_SAKER_URL[getEnvironmentClientSide()];
