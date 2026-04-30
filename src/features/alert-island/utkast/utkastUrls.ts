import { getDevBaseUrl } from "@utils/client/environment.ts";
import { getEnvironment } from "../../../utils/server/environment";

const UTKAST_URL = {
  local: "http://localhost:3000/minside/utkast",
  dev: "https://www.ansatt.dev.nav.no/minside/utkast",
  prod: "https://www.nav.no/minside/utkast",
};

const UTKAST_API_URL = {
  local: "http://localhost:3000/utkast",
  dev: `http://tms-utkast/v2/utkast/antall`,
  prod: "http://tms-utkast/v2/utkast/antall",
};

export const utkastUrl = UTKAST_URL[getEnvironment()];
export const utkastApiUrl = UTKAST_API_URL[getEnvironment()];
