import { navnUrl } from "./personaliaUrls";

export const fetchNavn = async (oboToken: string) => {
  let isError =  false;

  const response = await fetch(navnUrl, {
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

  const data = isError ? { navn: "" } : response;

  return { data, isError };
}