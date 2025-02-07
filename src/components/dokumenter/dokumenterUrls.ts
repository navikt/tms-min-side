import { getEnvironment } from "../../utils/server/environment";

const DOKUMENTARKIV_URL = {
  local: "http://localhost:3000/dokumentarkiv",
  dev: "https://www.ansatt.dev.nav.no/dokumentarkiv",
  prod: "https://www.nav.no/dokumentarkiv",
};

const DOKUMENTER_URL = {
  local: "http://localhost:3000/journalposter",
  dev: "https://www.intern.dev.nav.no/mine-saker-api/ssr/journalposter/siste",
  prod: "https://www.nav.no/mine-saker-api/ssr/journalposter/siste",
};

export const dokumentarkivUrl = DOKUMENTARKIV_URL[getEnvironment()];
export const dokumenterUrl = DOKUMENTER_URL[getEnvironment()];
