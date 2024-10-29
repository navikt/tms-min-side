import { getDevBaseUrl, getEnvironmentClientSide } from "@utils/client/environment.ts";

const UTBETALINGSOVERSIKT_URL = {
  local: "http://localhost:3000/utbetalingsoversikt",
  dev: "https://www.intern.dev.nav.no/utbetalingsoversikt-ny",
  prod: "https://www.nav.no/utbetalingsoversikt-ny",
};

const UTBETALINGSOVERSIKT_API_URL = {
  local: "http://localhost:3000/utbetalinger/siste",
  dev: `${getDevBaseUrl}/tms-utbetalingsoversikt-api/utbetalinger/siste`,
  prod: "https://person.nav.no/tms-utbetalingsoversikt-api/utbetalinger/siste",
};

export const utbetalingsoversiktApiUrl = UTBETALINGSOVERSIKT_API_URL[getEnvironmentClientSide()];
export const utbetalingsoversiktUrl = UTBETALINGSOVERSIKT_URL[getEnvironmentClientSide()];
