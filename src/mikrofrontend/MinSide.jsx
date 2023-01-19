import React from "react";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import ContentLoader from "../components/loader/ContentLoader";
import { meldekortUrl, oversiktManifestUrl, oversiktBaseUrl, tjenesterBaseUrl, tjenesterManifestUrl } from "../urls";
import { arbeidssokerUrl } from "../urls";
import { aiaBaseUrl, aiaManifestUrl } from "../urls";
import useStore, { selectIsError, selectSetIsError } from "../store/store";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { useQuery } from "react-query";
import { fetcher, manifestFetcher } from "../api/api";
import { updateUserProperties } from "../amplitude/amplitude";
import Layout from "../components/layout/Layout";

const MinSide = () => {
  const { data } = useQuery(arbeidssokerUrl, fetcher, {
    onError: useStore(selectSetIsError),
    onSuccess: (data) => updateUserProperties(data.erArbeidssoker),
  });

  const { data: aiaManifest, isLoading: isLoadingAiaManifest } = useQuery(aiaManifestUrl, manifestFetcher, {
    onError: useStore(selectSetIsError),
  });

  const { data: oversiktManifest, isLoading: isLoadingOversiktManifest } = useQuery(
    oversiktManifestUrl,
    manifestFetcher,
    {
      onError: useStore(selectSetIsError),
    }
  );

  const { data: tjenesterManifest, isLoading: isLoadingTjenesterManifest } = useQuery(
    tjenesterManifestUrl,
    manifestFetcher,
    {
      onError: useStore(selectSetIsError),
    }
  );

  const isError = useStore(selectIsError);
  useBreadcrumbs();

  if (isLoadingAiaManifest || isLoadingOversiktManifest || isLoadingTjenesterManifest) {
    return <ContentLoader />;
  }

  const ArbeidsflateForInnloggetArbeidssoker = React.lazy(() =>
    import(`${aiaBaseUrl}/${aiaManifest["src/main.tsx"]["file"]}`)
  );

  const Oversikt = React.lazy(() => import(`${oversiktBaseUrl}/${oversiktManifest["src/Mikrofrontend.jsx"]["file"]}`));

  const Tjenester = React.lazy(() =>
    import(`${tjenesterBaseUrl}/${tjenesterManifest["src/Mikrofrontend.jsx"]["file"]}`)
  );

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
