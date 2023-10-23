import { getEnvironmentClientSide } from "../../utils/environment.client.ts";

const VARSEL_API_URL = {
  local: "http://localhost:3000/innboks",
  dev: "https://www.intern.dev.nav.no/tms-varsel-api/antall/aktive",
  prod: "https://www.nav.no/tms-varsel-api/antall/aktive",
};

const INNBOKS_URL = {
  local: "http://localhost:3000/innboks",
  dev: "https://innboks.dev.nav.no",
  prod: "https://innboks.nav.no",
};

export const innboksUrl = INNBOKS_URL[getEnvironmentClientSide()];
export const antallVarslerUrl = `${VARSEL_API_URL[getEnvironmentClientSide()]}`;
