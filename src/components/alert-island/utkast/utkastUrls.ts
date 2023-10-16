import { getEnvironmentClientSide } from "../../../utils/environment.client";

const UTKAST_URL = {
  local: "http://localhost:3000/minside/utkast",
  dev: "https://www.intern.dev.nav.no/minside/utkast",
  prod: "https://www.nav.no/minside/utkast",
};

const ANTALL_UTKAST_URL = {
  local: "http://localhost:3000/utkast",
  dev: "https://www.intern.dev.nav.no/tms-min-side-proxy/utkast/utkast/antall",
  prod: "https://www.nav.no/tms-min-side-proxy/utkast/utkast/antall",
};

const ANTALL_UTKAST_DIGISOS_URL = {
  local: "http://localhost:3000/utkast-digisos",
  dev: "https://www.intern.dev.nav.no/tms-min-side-proxy/utkast/utkast/digisos/antall",
  prod: "https://www.nav.no/tms-min-side-proxy/utkast/utkast/digisos/antall",
};

export const utkastUrl = UTKAST_URL[getEnvironmentClientSide()];
export const antallUtkastUrl = ANTALL_UTKAST_URL[getEnvironmentClientSide()];
export const antallUtkastDigisosUrl = ANTALL_UTKAST_DIGISOS_URL[getEnvironmentClientSide()];
