import React from "react";
import ContentLoader from "../../components/loader/ContentLoader";
import { aiaCdnUrl, aiaManifestUrl, arbeidssokerUrl, standardUrl } from "./urls";
import { aiaEntry, bundle } from "../entrypoints";
import { useManifest } from "../../hooks/useManifest";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../utils/api.client.ts";

const AiaStandard = () => {
  const { data: standard, isLoading: isLoadingArbeidssoker } = useSWRImmutable({ path: standardUrl }, fetcher);
  const [manifest, isLoadingManifest] = useManifest(aiaManifestUrl);

  if (isLoadingArbeidssoker) {
    return null;
  }

  if (!standard) {
    return null;
  }

  if (isLoadingManifest) {
    return null;
  }


  const AiaStandard = React.lazy(() => import(`${aiaCdnUrl}/${manifest[aiaEntry][bundle]}`));

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <AiaStandard />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default AiaStandard;
