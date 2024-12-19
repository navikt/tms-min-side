import { getDevBaseUrl, getEnvironmentClientSide } from "@utils/client/environment.ts";

const VARSLER_URL = {
  local: "http://localhost:3000/minside/varsler",
  dev: `${getDevBaseUrl}/minside/varsler`,
  prod: "https://www.nav.no/minside/varsler",
};

const VARSLER_API_URL = {
  local: "http://localhost:3000/varsler",
  dev: `${getDevBaseUrl}/tms-varsel-api/antall/aktive`,
  prod: "https://www.nav.no/tms-varsel-api/antall/aktive",
};

export const varslerUrl = VARSLER_URL[getEnvironmentClientSide()];
export const antallVarslerUrl = VARSLER_API_URL[getEnvironmentClientSide()];
