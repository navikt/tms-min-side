import { getEnvironmentClientSide } from "../../../utils/environment.client";

const VARSLER_URL = {
  local: "http://localhost:3000/minside/varsler",
  dev: "https://www.intern.dev.nav.no/minside/varsler",
  prod: "https://www.nav.no/minside/varsler",
};


const VARSLER_API_URL = {
  local: "http://localhost:4000/varsler",
  dev: "https://www.intern.dev.nav.no/tms-varsel-api/antall/aktive",
  prod: "https://www.nav.no/tms-varsel-api/antall/aktive",
};

export const varslerUrl = VARSLER_URL[getEnvironmentClientSide()];
export const antallVarslerUrl = VARSLER_API_URL[getEnvironmentClientSide()];
