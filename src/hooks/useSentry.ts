import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import { getEnvironmentClientSide } from "../utils/environment.client";

export const useSentry = () => {
  useEffect(() => {
    if (getEnvironmentClientSide() === "prod") {
      Sentry.init({
        dsn: "https://06300e573bfb494a8241395dc8d43c0d@sentry.gc.nav.no/129",
        integrations: [new Sentry.BrowserTracing()],
        tracesSampleRate: 0.1,
      });
    }
  }, []);
};
