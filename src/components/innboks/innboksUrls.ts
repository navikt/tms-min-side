import { getEnvironment } from "../../utils/server/environment";

const VARSEL_API_URL = {
  local: "http://localhost:3000/innboks",
  dev: "http://tms-varsel-api/tms-varsel-api/ssr/antall/aktive",
  prod: "http://tms-varsel-api/tms-varsel-api/ssr/antall/aktive",
};

const INNBOKS_URL = {
  local: "http://localhost:3000/innboks",
  dev: "https://innboks.dev.nav.no",
  prod: "https://innboks.nav.no",
};

export const innboksUrl = INNBOKS_URL[getEnvironment()];
export const antallVarslerUrl = `${VARSEL_API_URL[getEnvironment()]}`;
