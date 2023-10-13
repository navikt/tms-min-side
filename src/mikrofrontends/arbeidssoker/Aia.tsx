import React from "react";
import ContentLoader from "../../components/loader/ContentLoader";
// import { aiaCdnUrl, aiaManifestUrl, arbeidssokerUrl } from "./urls.client.ts";
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
    return <ContentLoader />;
  }

  if (!arbeidssoker?.erArbeidssoker) {
    return null;
  }

  if (isLoadingManifest) {
    return <ContentLoader />;
  }


  const ArbeidsflateForInnloggetArbeidssoker = React.lazy(() => import(`${aiaCdnUrl}/${manifest[aiaEntry][bundle]}`));

  return (
    <ErrorBoundary>
      <ArbeidsflateForInnloggetArbeidssoker />
    </ErrorBoundary>
  );
};

export default Aia;
