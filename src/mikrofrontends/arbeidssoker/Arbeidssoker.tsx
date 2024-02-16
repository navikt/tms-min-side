import React from "react";
import ContentLoader from "@components/loader/ContentLoader";
import ErrorBoundary from "@components/error-boundary/ErrorBoundary";
import { aiaCdnUrl, aiaManifestUrl } from "./urls.ts";
import { aiaEntry, bundle } from "../entrypoints";
import { useLanguage } from "@hooks/useLanguage.ts";
import { fetcher } from "@utils/api.client.ts";
import type { Props } from "../types";
import useSWRImmutable from "swr/immutable";

const Arbeidssoker = ({ language }: Props) => {
  const { data: manifest, isLoading: isLoadingManifest } = useSWRImmutable({ path: aiaManifestUrl }, fetcher);
  useLanguage(language);

  if (isLoadingManifest) {
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

export default Arbeidssoker;
