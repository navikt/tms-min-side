import React from "react";
import ContentLoader from "../../components/loader/ContentLoader";
import { aiaCdnUrl, aiaManifestUrl, standardUrl } from "./urls";
import { aiaStandardEntry, bundle } from "../entrypoints";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "@utils/api.client.ts";

const AiaStandard = () => {
  const { data: standard, isLoading: isLoadingArbeidssoker } = useSWRImmutable({ path: standardUrl }, fetcher);
  const { data: manifest, isLoading: isLoadingManifest } = useSWRImmutable({ path: aiaManifestUrl }, fetcher);

  if (isLoadingArbeidssoker) {
    return null;
  }

  if (!standard) {
    return null;
  }

  if (isLoadingManifest) {
    return null;
  }

  const AiaStandard = React.lazy(() => import(`${aiaCdnUrl}/${manifest[aiaStandardEntry][bundle]}`));

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <AiaStandard />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default AiaStandard;
