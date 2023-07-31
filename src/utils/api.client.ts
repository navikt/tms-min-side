import { innloggingsstatistikkUrl } from "../mikrofrontends/min-side/urls";

interface Props {
  path: string;
  options?: object;
}

export const include = {
  credentials: "include",
};

export const fetcher = async ({ path, options }: Props) => {
  const response = await fetch(path, {
    method: "GET",
    ...options,
  });

  if (!response.ok) {
    throw new Error("Fetch request failed");
  }

  return await response.json();
};

export async function postInnloggingsstatistikk() {
  try {
    await fetch(innloggingsstatistikkUrl, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    console.warn("Klarte ikke å sende innloggingsstatistikk");
  }
}
