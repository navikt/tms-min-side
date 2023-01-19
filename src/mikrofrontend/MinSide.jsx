import React from "react";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import ContentLoader from "../components/loader/ContentLoader";
import { meldekortUrl, oversiktManifestUrl, oversiktBaseUrl, tjenesterBaseUrl, tjenesterManifestUrl } from "../urls";
import { arbeidssokerUrl } from "../urls";
import { aiaBaseUrl, aiaManifestUrl } from "../urls";
import { aiaEntry, bundle, oversiktEntry, tjenesterEntry } from "./entrypoints";
import useStore, { selectIsError, selectSetIsError } from "../store/store";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { useQuery } from "react-query";
import { useManifest } from "../hooks/useManifest";
import { fetcher } from "../api/api";
import { updateUserProperties } from "../amplitude/amplitude";
import Layout from "../components/layout/Layout";

const MinSide = () => {
  const { data } = useQuery(arbeidssokerUrl, fetcher, {
    onError: useStore(selectSetIsError),
    onSuccess: (data) => updateUserProperties(data.erArbeidssoker),
  });

  const [aiaManifest, isLoadingAiaManifest] = useManifest(aiaManifestUrl);
  const [oversiktManifest, isLoadingOversiktManifest] = useManifest(oversiktManifestUrl);
  const [tjenesterManifest, isLoadingTjenesterManifest] = useManifest(tjenesterManifestUrl);

  const isError = useStore(selectIsError);
  useBreadcrumbs();

  if (isLoadingAiaManifest || isLoadingOversiktManifest || isLoadingTjenesterManifest) {
    return <ContentLoader />;
  }

  const ArbeidsflateForInnloggetArbeidssoker = React.lazy(() =>
    import(`${aiaBaseUrl}/${aiaManifest[aiaEntry][bundle]}`)
  );

  const Oversikt = React.lazy(() => import(`${oversiktBaseUrl}/${oversiktManifest[oversiktEntry][bundle]}`));
  const Tjenester = React.lazy(() => import(`${tjenesterBaseUrl}/${tjenesterManifest[tjenesterEntry][bundle]}`));
  const Meldekort = React.lazy(() => import(meldekortUrl));

  return (
    <Layout isError={isError}>
      <React.Suspense fallback={<ContentLoader />}>
        <ErrorBoundary>
          <Oversikt />
        </ErrorBoundary>
        <ErrorBoundary>
          <Meldekort />
        </ErrorBoundary>
        {data?.erArbeidssoker ? (
          <ErrorBoundary>
            <ArbeidsflateForInnloggetArbeidssoker />
          </ErrorBoundary>
        ) : null}
        <ErrorBoundary>
          <Tjenester />
        </ErrorBoundary>
      </React.Suspense>
    </Layout>
  );
};

export default MinSide;
