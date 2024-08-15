import { getEnvironment } from "@utils/server/environment.ts";

const NAVN_URL = {
  local: "http://localhost:3000/navn",
  dev: "http://tms-min-side-proxy/tms-min-side-proxy/navn",
  prod: "http://tms-min-side-proxy/tms-min-side-proxy/navn",
};

export const navnUrl = NAVN_URL[getEnvironment()];
