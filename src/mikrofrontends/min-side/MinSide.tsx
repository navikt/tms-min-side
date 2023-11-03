import React from "react";
import ErrorBoundary from "@components/error-boundary/ErrorBoundary";
import ContentLoader from "@components/loader/ContentLoader";
import { useBreadcrumbs } from "@hooks/useBreadcrumbs.ts";
import { useLanguage } from "@hooks/useLanguage.ts";
import { useFaro } from "@hooks/useFaro.ts";
import { useStatistikk } from "@hooks/useStatistikk.ts";
import { bundle, oversiktEntry } from "../entrypoints";
import { oversiktCdnUrl, oversiktManifestUrl } from "./urls";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "@utils/api.client.ts";
import type { Props } from "../types";

const MinSide = ({ language }: Props) => {
  const { data: manifest, isLoading: isLoadingManifest } = useSWRImmutable({ path: oversiktManifestUrl }, fetcher);

  useLanguage(language);
  useBreadcrumbs([], language);
  useFaro();
  useStatistikk();

  if (isLoadingManifest) {
    return <ContentLoader />;
  }

  const Oversikt = React.lazy(() => import(`${oversiktCdnUrl}/${manifest[oversiktEntry][bundle]}`));

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <Oversikt />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default MinSide;
