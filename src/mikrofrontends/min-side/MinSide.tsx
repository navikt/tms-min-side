import React from "react";
import ErrorBoundary from "@components/error-boundary/ErrorBoundary";
import ContentLoader from "@components/loader/ContentLoader";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs";
import { useLanguage } from "../../hooks/useLanguage";
import { bundle, oversiktEntry } from "../entrypoints";
import { oversiktCdnUrl, oversiktManifestUrl } from "./urls";
import { useSentry } from "../../hooks/useSentry";
import { useFaro } from "../../hooks/useFaro";
import { useStatistikk } from "../../hooks/useStatistikk";
import type { Props } from "../types";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "@utils/api.client.ts";

const MinSide = ({ language }: Props) => {
  const { data: manifest, isLoading: isLoadingManifest } = useSWRImmutable({ path: oversiktManifestUrl }, fetcher);

  useLanguage(language);
  useBreadcrumbs([], language);
  useSentry();
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
