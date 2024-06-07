import { getEnvironmentClientSide } from "@utils/environment.client.ts";

const NAVN_URL = {
  local: "http://localhost:3000/navn",
  dev: "https://www.ansatt.dev.nav.no/tms-min-side-proxy/navn",
  prod: "https://www.nav.no/tms-min-side-proxy/navn",
};

export const navnUrl = NAVN_URL[getEnvironmentClientSide()];
