import { useEffect, useState } from "react";
import UXSignalContent from "@components/ux-signal/UXSignalContent.tsx";
import { aiaBackendUrl } from "@components/oversikt/urls.ts";
import { getEnvironmentClientSide } from "@utils/client/environment.ts";

async function fetchToggles() {
  try {
    return await fetch(`${aiaBackendUrl}/unleash?feature=aia.uxsignals`).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    });
  } catch (err) {
    console.error(err);
  }
}

async function sjekkErAktivArbeidssoker() {
  try {
    const perioder = await fetch(`${aiaBackendUrl}/arbeidssokerregisteret/v1/arbeidssoekerperioder`).then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      },
    );
    return perioder.filter((p: any) => !Boolean(p.avsluttet)).length > 0;
  } catch (err) {
    console.error(err);
    return false;
  }
}

const AiAUXSignals = () => {
  const [toggledOn, setToggledOn] = useState<boolean>(false);

  useEffect(() => {
    async function checkToggledOn() {
      const toggles = await fetchToggles();
      if (toggles["aia.uxsignals"]) {
        setToggledOn(await sjekkErAktivArbeidssoker());
      }
    }

    checkToggledOn();
  }, []);

  if (!toggledOn) {
    return null;
  }

  return <UXSignalContent panelId={"panel-zelu70575h"} mode={getEnvironmentClientSide() !== "prod" ? "demo" : ""} />;
};

export default AiAUXSignals;
