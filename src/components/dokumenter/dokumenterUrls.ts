import { getEnvironment } from "../../utils/server/environment";

const DOKUMENTARKIV_URL = {
  local: "http://localhost:3000/dokumentarkiv",
  dev: "https://www.ansatt.dev.nav.no/dokumentarkiv",
  prod: "https://www.nav.no/dokumentarkiv",
};

const DOKUMENTER_URL = {
  local: "http://localhost:3000/journalposter",
  dev: "https://www.dev.nav.no/mine-saker-api/v2/journalposter/siste",
  prod: "https://www.nav.no/mine-saker-api/v2/journalposter/siste",
};

export const dokumentarkivUrl = DOKUMENTARKIV_URL[getEnvironment()];
export const dokumenterUrl = DOKUMENTER_URL[getEnvironment()];
