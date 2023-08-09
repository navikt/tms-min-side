import { useEffect } from "react";
import { initializeFaro } from '@grafana/faro-web-sdk';
import { telemetryConfig } from "../utils/faro/config";

export const useFaro = () => {
  useEffect(() => {
    initializeFaro({
      url: telemetryConfig.telemetryCollectorURL,
      app: telemetryConfig.app,
    });
  }, []);
};
