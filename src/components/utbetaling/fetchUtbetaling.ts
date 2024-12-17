import type { Utbetaling } from "./utbetalingTypes";
import { utbetalingsoversiktApiUrl } from "./utbetalingUrls";

export const fetchUtbetaling = async (oboToken: string): Promise<Utbetaling> => {
  const response = await fetch(utbetalingsoversiktApiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${oboToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Http error with status: ${response.status}`);
  }

  return await response.json();
}