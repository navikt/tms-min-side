import React from "react";
import ContentLoader from "../../components/loader/ContentLoader";
import { aiaCdnUrl, aiaManifestUrl } from "./urls";
import { aiaEntry, bundle } from "../entrypoints";
import { useManifest } from "../../hooks/useManifest";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";

const ArbeidssokerFlate = () => {
  const [manifest, isLoading] = useManifest(aiaManifestUrl);

  if (isLoading) {
    return <ContentLoader />;
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

export default ArbeidssokerFlate;
