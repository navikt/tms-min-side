import React from "react";
import ErrorBoundary from "@components/error-boundary/ErrorBoundary";
import ContentLoader from "@components/loader/ContentLoader";
import { useLanguage } from "@hooks/useLanguage.ts";
import { bundle, tidligereVarslerEntry } from "../entrypoints";
import { tidligereVarslerManifestUrl, tidligereVarslerUrl } from "./urls";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "@utils/api.client.ts";
import type { Props } from "../types";

const TidligereVarsler = ({ language }: Props) => {
  const { data: manifest, isLoading: isLoadingManifest } = useSWRImmutable({ path: tidligereVarslerManifestUrl }, fetcher);
  useLanguage(language);

  if (isLoadingManifest) {
    return <ContentLoader />;
  }

  const TidligereVarslerMikrofrotend = React.lazy(
    () => import(`${tidligereVarslerUrl}/${manifest[tidligereVarslerEntry][bundle]}`)
  );

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <TidligereVarslerMikrofrotend />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default TidligereVarsler;
