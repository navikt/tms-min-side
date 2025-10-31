import { MultiStatusError } from "./error";

export const fetchData = async (oboToken: string, url: string) => {
  const response = await fetch(url, {
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

  if (response.status === 207) {
    throw new MultiStatusError(`Http multi-status from ${url}`, await response.json());
  }

  return await response.json();
};

export const fetchHtml = async (oboToken: string, url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${oboToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Http error with status: ${response.status}`);
  }

  return await response.text();
};
