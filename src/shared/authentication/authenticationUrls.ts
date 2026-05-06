import { getDevBaseUrl, getEnvironmentClientSide } from "@utils/client/environment.ts";

const MINSIDE_URL = {
  local: "http://localhost:4321/minside",
  dev: `${getDevBaseUrl}/minside`,
  prod: "https://www.nav.no/minside",
};

const LOGIN_URL = {
  local: "http://localhost:3000/login",
  dev: `${getDevBaseUrl}/tms-min-side-proxy/login`,
  prod: "https://www.nav.no/tms-min-side-proxy/login",
};

export const statusUrl = `${LOGIN_URL[getEnvironmentClientSide()]}/status`;
export const redirectUrl = `${LOGIN_URL[getEnvironmentClientSide()]}?redirect_uri=${MINSIDE_URL[getEnvironmentClientSide()]}`;
