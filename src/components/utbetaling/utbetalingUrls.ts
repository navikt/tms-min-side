import dayjs from "dayjs";
import { getEnvironmentClientSide } from "@utils/environment.client.ts";

const toDate = dayjs().format("YYYYMMDD");
const fromDate = dayjs().subtract(3, "month").format("YYYYMMDD");

const UTBETALINGSOVERSIKT_URL = {
  local: "http://localhost:3000/utbetalingsoversikt",
  dev: "https://www.intern.dev.nav.no/utbetalingsoversikt",
  prod: "https://www.nav.no/utbetalingsoversikt",
};

const UTBETALINGSOVERSIKT_API_URL = {
  local: "http://localhost:3000/utbetalinger",
  dev: "https://www.intern.dev.nav.no/tms-utbetalingsoversikt-api/siste",
  prod: "https://person.nav.no/tms-utbetalingsoversikt-api/siste",
};

export const utbetalingsoversiktApiUrl = `${UTBETALINGSOVERSIKT_API_URL[getEnvironmentClientSide()]}?&fom=${fromDate}&tom=${toDate}`;
export const utbetalingsoversiktUrl = UTBETALINGSOVERSIKT_URL[getEnvironmentClientSide()];
