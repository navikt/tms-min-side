import { getDevBaseUrl } from "@utils/client/environment.ts";
import { getEnvironment } from "../../../utils/server/environment";

const VARSLER_URL = {
  local: "http://localhost:3000/minside/varsler",
  dev: `${getDevBaseUrl}/minside/varsler`,
  prod: "https://www.nav.no/minside/varsler",
};

const VARSEL_API_URL = {
  local: "http://localhost:3000/varsler",
  dev: "http://tms-varsel-api/tms-varsel-api/ssr/antall/aktive",
  prod: "http://tms-varsel-api/tms-varsel-api/ssr/antall/aktive",
};

export const varslerUrl = VARSLER_URL[getEnvironment()];
export const varselApiUrl = VARSEL_API_URL[getEnvironment()];
