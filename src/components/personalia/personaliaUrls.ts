import { getDevBaseUrl, getEnvironmentClientSide } from "@utils/client/environment.ts";

const NAVN_URL = {
  local: "http://localhost:3000/navn",
  dev: `${getDevBaseUrl}/tms-min-side-proxy/navn`,
  prod: "https://www.nav.no/tms-min-side-proxy/navn",
};

export const navnUrl = NAVN_URL[getEnvironmentClientSide()];
