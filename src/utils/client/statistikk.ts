import { getDevBaseUrl, getEnvironmentClientSide } from "@utils/client/environment.ts";

const INNLOGGINGSSTATISTIKK_URL = {
  local: "http://localhost:3000/statistikk",
  dev: `${getDevBaseUrl}/tms-min-side-proxy/statistikk/innlogging`,
  prod: "https://www.nav.no/tms-min-side-proxy/statistikk/innlogging",
};

const innloggingsstatistikkUrl = `${INNLOGGINGSSTATISTIKK_URL[getEnvironmentClientSide()]}`;

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
