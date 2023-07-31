import { getEnvironmentClientSide } from "../../utils/environment.client";

const VARSLER_URL = {
  local: "http://localhost:4000",
  dev: "https://www.intern.dev.nav.no/tms-varsler-mikrofrontend/tms-varsler-mikrofrontend.js",
  prod: "https://www.nav.no/tms-varsler-mikrofrontend/tms-varsler-mikrofrontend.js",
};

export const varslerUrl = VARSLER_URL[getEnvironmentClientSide()];

