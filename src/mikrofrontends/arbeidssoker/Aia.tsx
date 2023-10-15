import React from "react";
import { aiaEntry, bundle } from "../entrypoints";
import { useManifest } from "../../hooks/useManifest";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../utils/api.client.ts";
import { aiaCdnUrl, aiaManifestUrl, arbeidssokerUrl } from "./urls.ts";
import { getEnvironment } from "../../utils/environment.ts";

const Aia = () => {
  const { data: arbeidssoker, isLoading: isLoadingArbeidssoker } = useSWRImmutable({ path: arbeidssokerUrl }, fetcher);
  const [manifest, isLoadingManifest] = useManifest(aiaManifestUrl);

  if (isLoadingArbeidssoker) {
    return <h1>Loading...</h1>;
  }

  if (!arbeidssoker?.erArbeidssoker) {
    console.log("Env:" + getEnvironment());
    return <h1>Ikke arbeidssøker...</h1>;
  }

  if (isLoadingManifest) {
    return <h1>Loading...</h1>;
  }


  const ArbeidsflateForInnloggetArbeidssoker = React.lazy(() => import(`${aiaCdnUrl}/${manifest[aiaEntry][bundle]}`));

  return (
    <ErrorBoundary>
      <ArbeidsflateForInnloggetArbeidssoker />
    </ErrorBoundary>
  );
};

export default Aia;
