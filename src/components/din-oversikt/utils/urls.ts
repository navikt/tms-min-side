import { getEnvironment } from "../../../utils/server/environment";

const SELECTOR_URL = {
  local: "http://localhost:3000/selector/din-oversikt",
  dev: "http://tms-mikrofrontend-selector/selector/din-oversikt",
  prod: "http://tms-mikrofrontend-selector/selector/din-oversikt",
};

export const dinOversiktUrl = SELECTOR_URL[getEnvironment()];
