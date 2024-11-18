import { getDevBaseUrl, getEnvironmentClientSide } from "@utils/client/environment.ts";

const DOKUMENTARKIV_URL = {
  local: "http://localhost:3000/dokumentarkiv",
  dev: `${getDevBaseUrl}/dokumentarkiv`,
  prod: "https://www.nav.no/dokumentarkiv",
};

const JOURNALPOSTER_URL = {
  local: "http://localhost:3000/journalposter",
  dev: `${getDevBaseUrl}/mine-saker-api/v2/journalposter/alle`,
  prod: "https://www.nav.no/mine-saker-api/v2/journalposter/alle",
};

const MINE_SAKER_API = {
  local: "http://localhost:3000/mine-saker-api",
  dev: `${getDevBaseUrl}/mine-saker-api`,
  prod: "https://www.nav.no/mine-saker-api",
};

export const dokumentarkivUrl = DOKUMENTARKIV_URL[getEnvironmentClientSide()];
export const mineSakerApiUrl = MINE_SAKER_API[getEnvironmentClientSide()];
export const journalposterUrl = JOURNALPOSTER_URL[getEnvironmentClientSide()];
