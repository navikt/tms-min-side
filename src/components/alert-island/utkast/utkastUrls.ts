import { getEnvironmentClientSide } from "@utils/environment.client.ts";

const UTKAST_URL = {
  local: "http://localhost:3000/minside/utkast",
  dev: "https://www.intern.dev.nav.no/minside/utkast",
  prod: "https://www.nav.no/minside/utkast",
};

const ANTALL_UTKAST_URL = {
  local: "http://localhost:3000/utkast",
  dev: "https://www.ansatt.dev.nav.no/tms-min-side-proxy/utkast/v2/utkast/antall",
  prod: "https://www.nav.no/tms-min-side-proxy/utkast/v2/utkast/antall",
};

export const utkastUrl = UTKAST_URL[getEnvironmentClientSide()];
export const antallUtkastUrl = ANTALL_UTKAST_URL[getEnvironmentClientSide()];