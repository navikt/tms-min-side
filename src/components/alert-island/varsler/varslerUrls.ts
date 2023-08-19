import { getEnvironment } from "../../../utils/environment";

const VARSLER_URL = {
  local: "http://localhost:3000/minside/varsler",
  dev: "https://www.intern.dev.nav.no/minside/varsler",
  prod: "https://www.nav.no/tms-varsel-api/minside/varsler",
};

export const varslerUrl = VARSLER_URL[getEnvironment()];
