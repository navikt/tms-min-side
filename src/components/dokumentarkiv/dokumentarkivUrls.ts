import { getDevBaseUrl, getEnvironmentClientSide } from "@utils/environment.client.ts";

const DOKUMENTARKIV_URL = {
  local: "http://localhost:3000/dokumentarkiv",
  dev: `${getDevBaseUrl}/dokumentarkiv`,
  prod: "https://www.nav.no/dokumentarkiv",
};

export const dokumentarkivUrl = DOKUMENTARKIV_URL[getEnvironmentClientSide()];
