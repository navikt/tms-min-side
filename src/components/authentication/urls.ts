import { getEnvironmentClientSide } from "@utils/environment.client.ts";

const MINSIDE_URL = {
  local: "http://localhost:4321/minside",
  dev: "https://www.ansatt.dev.nav.no/minside",
  prod: "https://www.nav.no/minside",
};

const LOGIN_URL = {
  local: "http://localhost:3000/login",
  dev: "https://www.ansatt.dev.nav.no/tms-min-side-proxy/login",
  prod: "https://www.nav.no/tms-min-side-proxy/login",
};

export const statusUrl = `${LOGIN_URL[getEnvironmentClientSide()]}/status`;
export const redirectUrl = `${LOGIN_URL[getEnvironmentClientSide()]}?redirect_uri=${MINSIDE_URL[getEnvironmentClientSide()]}`;
