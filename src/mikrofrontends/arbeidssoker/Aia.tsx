import React from "react";
import { aiaEntry, bundle } from "../entrypoints";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../utils/api.client.ts";
import { aiaCdnUrl, aiaManifestUrl, arbeidssokerUrl } from "./urls.ts";
import ContentLoader from "../../components/loader/ContentLoader.tsx";

const Aia = () => {
  const { data: arbeidssoker, isLoading: isLoadingArbeidssoker } = useSWRImmutable({ path: arbeidssokerUrl }, fetcher);
  const { data: manifest, isLoading: isLoadingManifest } = useSWRImmutable({ path: aiaManifestUrl }, fetcher);

  if (isLoadingArbeidssoker) {
    return <div />;
  }

  if (!arbeidssoker?.erArbeidssoker) {
    return null;
  }

  if (isLoadingManifest) {
    return <div />;
  }

  const ArbeidsflateForInnloggetArbeidssoker = React.lazy(() => import(`${aiaCdnUrl}/${manifest[aiaEntry][bundle]}`));

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <ArbeidsflateForInnloggetArbeidssoker />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default Aia;
