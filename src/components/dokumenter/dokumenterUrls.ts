import { getDevBaseUrl, getEnvironmentClientSide } from "@utils/client/environment.ts";

const DOKUMENTARKIV_URL = {
  local: "http://localhost:3000/dokumentarkiv",
  dev: `${getDevBaseUrl}/dokumentarkiv`,
  prod: "https://www.nav.no/dokumentarkiv",
};

const MINE_SAKER_API = {
  local: "http://localhost:3000/journalposter",
  dev: `${getDevBaseUrl}/mine-saker-api/journalposter`,
  prod: "https://www.nav.no/mine-saker-api/journalposter",
};

export const dokumentarkivUrl = DOKUMENTARKIV_URL[getEnvironmentClientSide()];
export const journalposterUrl = MINE_SAKER_API[getEnvironmentClientSide()];
