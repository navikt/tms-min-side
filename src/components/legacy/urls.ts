import { getDevBaseUrl, getEnvironmentClientSide } from "@utils/client/environment.ts";

const SELECTOR_URL = {
  local: "http://localhost:3000/selector",
  dev: `${getDevBaseUrl}/tms-min-side-proxy/selector`,
  prod: "https://www.nav.no/tms-min-side-proxy/selector",
};

export const dinOversiktLegacyUrl = `${SELECTOR_URL[getEnvironmentClientSide()]}/din-oversikt`;
