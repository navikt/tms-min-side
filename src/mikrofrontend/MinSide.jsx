import React, { useEffect } from "react";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import ContentLoader from "../components/loader/ContentLoader";
import { oversiktManifestUrl, tjenesterManifestUrl, tjenesterBaseCdnUrl, oversiktBaseCdnUrl } from "../urls";
import { bundle, oversiktEntry, tjenesterEntry } from "./entrypoints";
import useStore, { selectIsError } from "../store/store";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { useManifest } from "../hooks/useManifest";
import { postInnloggingsstatistikk } from "../api/api";
import { logEvent } from "../amplitude/amplitude";
import Layout from "../components/layout/Layout";

const MinSide = () => {
  const [oversiktManifest, isLoadingOversiktManifest] = useManifest(oversiktManifestUrl);
  const [tjenesterManifest, isLoadingTjenesterManifest] = useManifest(tjenesterManifestUrl);

  useEffect(() => {
    logEvent("build", import.meta.env.VITE_BUILD_TIMESTAMP);
    postInnloggingsstatistikk();
  }, []);

  const isError = useStore(selectIsError);
  useBreadcrumbs();

  if (isLoadingOversiktManifest || isLoadingTjenesterManifest) {
    return <ContentLoader />;
  }

  const Oversikt = React.lazy(() => import(`${oversiktBaseCdnUrl}/${oversiktManifest[oversiktEntry][bundle]}`));
  const Tjenester = React.lazy(() => import(`${tjenesterBaseCdnUrl}/${tjenesterManifest[tjenesterEntry][bundle]}`));

  return (
    <Layout isError={isError}>
      <React.Suspense fallback={<ContentLoader />}>
        <ErrorBoundary>
          <Oversikt />
        </ErrorBoundary>
        <ErrorBoundary>
          <Tjenester />
        </ErrorBoundary>
      </React.Suspense>
    </Layout>
  );
};

export default MinSide;
