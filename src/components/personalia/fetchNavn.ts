import { navnUrl } from "./personaliaUrls";

export const fetchNavn = async (oboToken: string) => {
  const response = await fetch(navnUrl, {
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