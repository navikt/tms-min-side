import { getEnvironmentClientSide } from "@utils/environment.client.ts";

const UTBETALINGSOVERSIKT_URL = {
  local: "http://localhost:3000/utbetalingsoversikt",
  dev: "https://www.intern.dev.nav.no/utbetalingsoversikt",
  prod: "https://www.nav.no/utbetalingsoversikt",
};

const UTBETALINGSOVERSIKT_API_URL = {
  local: "http://localhost:3000/utbetalinger/siste",
  dev: "https://www.ansatt.dev.nav.no/tms-utbetalingsoversikt-api/utbetalinger/siste",
  prod: "https://person.nav.no/tms-utbetalingsoversikt-api/utbetalinger/siste",
};

export const utbetalingsoversiktApiUrl = UTBETALINGSOVERSIKT_API_URL[getEnvironmentClientSide()];
export const utbetalingsoversiktUrl = UTBETALINGSOVERSIKT_URL[getEnvironmentClientSide()];
