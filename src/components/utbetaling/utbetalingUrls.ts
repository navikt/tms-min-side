import { getEnvironment } from "@utils/server/environment.ts";

const UTBETALINGSOVERSIKT_URL = {
  local: "http://localhost:3000/utbetalingsoversikt",
  dev: "https://www.ansatt.dev.nav.no/utbetalingsoversikt",
  prod: "https://www.nav.no/utbetalingsoversikt",
};

const UTBETALINGSOVERSIKT_API_URL = {
  local: "http://localhost:3000/utbetalinger/siste",
  dev: "http://tms-utbetalingsoversikt-api/tms-utbetalingsoversikt-api/utbetalinger/ssr/siste",
  prod: "http://tms-utbetalingsoversikt-api/tms-utbetalingsoversikt-api/utbetalinger/ssr/siste",
};

export const utbetalingsoversiktApiUrl = UTBETALINGSOVERSIKT_API_URL[getEnvironment()];
export const utbetalingsoversiktUrl = UTBETALINGSOVERSIKT_URL[getEnvironment()];
