import { useEffect } from "react";
import { initializeFaro } from "@grafana/faro-web-sdk";

const Observability = ({ url }: { url: string }) => {
  useEffect(() => {
    initializeFaro({
      url: url,
      app: { name: "tms-min-side" },
    });
  }, []);

  return null;
};

export default Observability;
