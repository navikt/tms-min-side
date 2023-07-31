import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import { getEnvironmentClientSide } from "../utils/environment.client";

export const useSentry = () => {
  useEffect(() => {
    if (getEnvironmentClientSide() === "prod") {
      Sentry.init({
        dsn: "https://b068a67792974fbb85afbaddc294c484@sentry.gc.nav.no/166",
        integrations: [new Sentry.BrowserTracing()],
        tracesSampleRate: 0.1,
      });
    }
  }, []);
};
