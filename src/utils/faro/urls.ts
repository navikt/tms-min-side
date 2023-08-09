import { getEnvironmentClientSide } from "../environment.client";

const TELEMETRY_URL = {
  local: 'http://localhost:4000/collect',
  dev: 'https://telemetry.ekstern.dev.nav.no/collect',
  prod: 'https://telemetry.nav.no/collect',
};

export const telemetryUrl = TELEMETRY_URL[getEnvironmentClientSide()];
