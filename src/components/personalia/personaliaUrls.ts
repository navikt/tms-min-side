import { getEnvironmentClientSide } from "../../utils/environment.client";

const NAVN_URL = {
  local: "http://localhost:3000/navn",
  dev: "https://www.intern.dev.nav.no/tms-min-side-proxy/navn",
  prod: "https://www.nav.no/tms-min-side-proxy/navn",
};

export const navnUrl = NAVN_URL[getEnvironmentClientSide()];
