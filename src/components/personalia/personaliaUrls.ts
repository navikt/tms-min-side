import { getEnvironmentClientSide } from "../../utils/environment.client";

const NAVN_URL = {
  local: "http://localhost:4000/navn",
  dev: "https://www.intern.dev.nav.no/tms-min-side-proxy/personalia/navn",
  prod: "https://www.nav.no/tms-min-side-proxy/personalia/navn",
};

const IDENT_URL = {
  local: "http://localhost:4000/ident",
  dev: "https://www.intern.dev.nav.no/tms-min-side-proxy/personalia/ident",
  prod: "https://www.nav.no/tms-min-side-proxy/personalia/ident",
};

export const navnUrl = NAVN_URL[getEnvironmentClientSide()];
export const identUrl = IDENT_URL[getEnvironmentClientSide()];

