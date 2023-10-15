import React from "react";
import { aiaEntry, bundle } from "../entrypoints";
import { useManifest } from "../../hooks/useManifest";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../utils/api.client.ts";
import { aiaCdnUrl, aiaManifestUrl, arbeidssokerUrl } from "./urls.ts";

const Aia = () => {
  const { data: arbeidssoker, isLoading: isLoadingArbeidssoker } = useSWRImmutable({ path: arbeidssokerUrl }, fetcher);
  const [manifest, isLoadingManifest] = useManifest(aiaManifestUrl);

  if (isLoadingArbeidssoker) {
    return null;
  }

  if (!arbeidssoker?.erArbeidssoker) {
    return null;
  }

  if (isLoadingManifest) {
    return null;
  }

  const ArbeidsflateForInnloggetArbeidssoker = React.lazy(() => import(`${aiaCdnUrl}/${manifest[aiaEntry][bundle]}`));

  return (
    <React.Suspense fallback={"Loading..."}>
      <ErrorBoundary>
        <ArbeidsflateForInnloggetArbeidssoker />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default Aia;
