import React from "react";
import { aiaCdnUrl, nyAiaManifestUrl } from "../urls";
import ErrorBoundary from "@components/error-boundary/ErrorBoundary.tsx";
import ContentLoader from "@components/oversikt/loader/ContentLoader.tsx";
import { entry, bundle } from "@components/oversikt/entrypoints.ts";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "@utils/api.client.ts";

const NyAiaStandardWrapper = () => {
  const { data: manifest, isLoading } = useSWRImmutable({ path: nyAiaManifestUrl }, fetcher);

  if (isLoading) {
    return null;
  }

  const AiaStandard = React.lazy(() => import(`${aiaCdnUrl}/${manifest[entry][bundle]}`));

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <AiaStandard />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default NyAiaStandardWrapper;
