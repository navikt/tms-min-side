import type { UtbetalingResponse } from "./utbetalingTypes";
import { utbetalingsoversiktApiUrl } from "./utbetalingUrls";

export const fetchUtbetaling = async (oboToken: string) => {
  let isError =  false;

  const response: UtbetalingResponse = await fetch(utbetalingsoversiktApiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${oboToken}`,
    },
  }).then((response) => {
    if (!response.ok) {
      console.error(`Error, fetch failed with status: ${response.status}`);
      isError = true;
      return;
    }

    return response.json();
  }).catch((error) => {
    console.error(`Error, fetch failed: ${error}`);
    isError = true;
  });

  const data = isError ?
    {
      hasKommende: false,
      hasUtbetaling: false,
      sisteUtbetaling: null,
      kommende: null
    } : response;

}