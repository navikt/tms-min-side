import React from "react";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import ContentLoader from "../components/loader/ContentLoader";
import { minSideTjenesterUrl, minSideOversiktUrl, meldekortMikrofrontendUrl } from "../urls";
import {
  arbeidssokerUrl,
  arbeidsflateForInnloggetArbeidssokerBaseUrl,
  arbeidsflateForInnloggetArbeidssokerManifestUrl,
} from "../urls";
import useStore, { selectIsError, selectSetIsError } from "../store/store";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { useQuery } from "react-query";
import { fetcher } from "../api/api";
import { updateUserProperties } from "../amplitude/amplitude";
import Layout from "../components/layout/Layout";

const MinSide = () => {
  const { data } = useQuery(arbeidssokerUrl, fetcher, {
    onError: useStore(selectSetIsError),
    onSuccess: (data) => updateUserProperties(data.erArbeidssoker),
  });

  const { data: aiaManifest, isLoading: isLoadingTjenesterManifest } = useQuery(
    arbeidsflateForInnloggetArbeidssokerManifestUrl,
    fetcher
  );

  const isError = useStore(selectIsError);
  useBreadcrumbs();

  if (isLoadingTjenesterManifest) {
    return <ContentLoader />;
  }

  const ArbeidsflateForInnlogetArbeidssoker = React.lazy(() =>
    import(`${arbeidsflateForInnloggetArbeidssokerBaseUrl}/${aiaManifest["src/main.tsx"]["file"]}`)
  );
  const MinSideOversikt = React.lazy(() => import(minSideOversiktUrl));
  const Meldekort = React.lazy(() => import(meldekortMikrofrontendUrl));
  const MinSideTjenester = React.lazy(() => import(minSideTjenesterUrl));

  console.log("Manifest:" + aiaManifest);
  console.log("Manifest url:" + arbeidsflateForInnloggetArbeidssokerManifestUrl);

  return (
    <Layout isError={isError}>
      <React.Suspense fallback={<ContentLoader />}>
        <ErrorBoundary>
          <MinSideOversikt />
        </ErrorBoundary>
        <ErrorBoundary>
          <Meldekort />
        </ErrorBoundary>
        {data?.erArbeidssoker ? (
          <ErrorBoundary>
            <ArbeidsflateForInnlogetArbeidssoker />
          </ErrorBoundary>
        ) : null}
        <ErrorBoundary>
          <MinSideTjenester />
        </ErrorBoundary>
      </React.Suspense>
    </Layout>
  );
};

export default MinSide;
