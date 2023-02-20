import { useEffect } from "react";
import amplitude from "amplitude-js";

export const initializeAmplitude = () => {
  amplitude.getInstance().init("default", "", {
    apiEndpoint: "amplitude.nav.no/collect-auto",
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    platform: window.location.toString(),
  });
};

export function logEvent(name, metric) {
  amplitude.getInstance().logEvent(name, {
    app: "tms-min-side",
    label: metric,
  });
}

export function updateUserProperties(hasAia) {
  amplitude.getInstance().setUserProperties({
    getsAia: hasAia,
  });
}

export function logAmplitudeEventWhenComponentMounted(komponent) {
  useEffect(() => {
    amplitude.getInstance().logEvent("komponent vist", {
      komponent,
    });
  }, []);
}
