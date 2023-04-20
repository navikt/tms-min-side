import React, { useEffect } from "react";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import ContentLoader from "../components/loader/ContentLoader";
import { oversiktManifestUrl, oversiktBaseCdnUrl } from "../urls";
import { bundle, oversiktEntry } from "./entrypoints";
import useStore, { selectIsError } from "../store/store";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { useManifest } from "../hooks/useManifest";
import { postInnloggingsstatistikk } from "../api/api";
import Layout from "../components/layout/Layout";

const MinSide = () => {
  const [oversiktManifest, isLoadingOversiktManifest] = useManifest(oversiktManifestUrl);

  useEffect(() => {
    postInnloggingsstatistikk();
  }, []);

  const isError = useStore(selectIsError);
  useBreadcrumbs([]);

  if (isLoadingOversiktManifest) {
    return <ContentLoader />;
  }

  const Oversikt = React.lazy(() => import(`${oversiktBaseCdnUrl}/${oversiktManifest[oversiktEntry][bundle]}`));

  return (
    <Layout isError={isError}>
      <React.Suspense fallback={<ContentLoader />}>
        <ErrorBoundary>
          <Oversikt />
        </ErrorBoundary>
      </React.Suspense>
    </Layout>
  );
};

export default MinSide;
