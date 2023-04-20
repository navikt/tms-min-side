import { QueryFunctionContext } from "react-query";
import { innloggingsstatistikkUrl } from "../urls.js";

export class FetchError extends Error {
  response: Response;
  constructor(response: Response, message: string) {
    super(message);
    this.response = response;
  }
}

const checkResponse = (response: Response) => {
  if (!response.ok) {
    throw new FetchError(response, "Fetch request failed");
  }
};

export const fetcher = async ({ queryKey }: QueryFunctionContext) => {
  const response = await fetch(queryKey.toString(), {
    method: "GET",
    credentials: "include",
  });
  checkResponse(response);

  return response.json();
};

export const manifestFetcher = async ({ queryKey }: QueryFunctionContext) => {
  const response = await fetch(queryKey.toString(), { method: "GET" });
  checkResponse(response);

  return response.json();
};

export async function postInnloggingsstatistikk() {
  try {
    await fetch(innloggingsstatistikkUrl, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } catch {
    console.warn("Klarte ikke å sende innloggingsstatistikk");
  }
}
