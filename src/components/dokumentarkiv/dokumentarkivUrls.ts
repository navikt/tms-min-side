import { getDevBaseUrl, getEnvironmentClientSide } from "@utils/client/environment.ts";

const DOKUMENTARKIV_URL = {
  local: "http://localhost:3000/dokumentarkiv",
  dev: `${getDevBaseUrl}/dokumentarkiv`,
  prod: "https://www.nav.no/dokumentarkiv",
};

export const dokumentarkivUrl = DOKUMENTARKIV_URL[getEnvironmentClientSide()];
