import { getEnvironmentClientSide } from "../environment.ts";

const TELEMETRY_URL = {
  local: "http://localhost:3000/collect",
  dev: "https://telemetry.ekstern.dev.nav.no/collect",
  prod: "https://telemetry.nav.no/collect",
};

export const telemetryUrl = TELEMETRY_URL[getEnvironmentClientSide()];
