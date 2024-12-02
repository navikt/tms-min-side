import { getDevBaseUrl, getEnvironmentClientSide } from "@utils/client/environment.ts";

const DOKUMENTARKIV_URL = {
  local: "http://localhost:3000/dokumentarkiv",
  dev: `${getDevBaseUrl}/dokumentarkiv`,
  prod: "https://www.nav.no/dokumentarkiv",
};

const DOKUMENTER_URL = {
  local: "http://localhost:3000/journalposter",
  dev: `${getDevBaseUrl}/mine-saker-api/v2/journalposter/siste`,
  prod: "https://www.nav.no/mine-saker-api/v2/journalposter/siste",
};

export const dokumentarkivUrl = DOKUMENTARKIV_URL[getEnvironmentClientSide()];
export const dokumenterUrl = DOKUMENTER_URL[getEnvironmentClientSide()];
