import React from "react";
import { aiaCdnUrl, aiaManifestUrl } from "../urls";
import ErrorBoundary from "@components/error-boundary/ErrorBoundary.tsx";
import ContentLoader from "@components/oversikt/loader/ContentLoader.tsx";
import { aiaStandardEntry, bundle } from "@components/oversikt/entrypoints.ts";
import { useManifest } from "@components/oversikt/hooks/useManifest.ts";

const AiaStandardWrapper = () => {
  const [manifest, isLoading] = useManifest(aiaManifestUrl);

  if (isLoading) {
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

export default AiaStandardWrapper;
