import React, { useEffect } from "react";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import ContentLoader from "../components/loader/ContentLoader";
import {
  meldekortUrl,
  oversiktManifestUrl,
  aiaBaseCdnUrl,
  tjenesterBaseCdnUrl,
  oversiktBaseCdnUrl,
  innloggingsstatistikkUrl,
} from "../urls";
import { aapBaseCdnUrl, aapManifestUrl, selectorUrl } from "../urls";
import { tjenesterManifestUrl } from "../urls";
import { aiaManifestUrl, arbeidssokerUrl } from "../urls";
import { aapEntry, aiaEntry, bundle, oversiktEntry, tjenesterEntry } from "./entrypoints";
import useStore, { selectIsError, selectSetIsError } from "../store/store";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { useQuery } from "react-query";
import { useManifest } from "../hooks/useManifest";
import { fetcher, post } from "../api/api";
import { logEvent } from "../amplitude/amplitude";
import Layout from "../components/layout/Layout";

const MinSide = () => {
  const { data: arbeidssoker } = useQuery(arbeidssokerUrl, fetcher, {
    onError: useStore(selectSetIsError),
    onSuccess: (data) => logEvent("minside.aia", data.erArbeidssoker),
  });

  const { data: profil, isLoading: isLoadingProfil } = useQuery(selectorUrl, fetcher, {
    onError: useStore(selectSetIsError),
    onSuccess: (data) => data.microfrontends.map((id) => logEvent(`minside.${id}`, true)),
  });

  const [aapManifest, isLoadingAapManifest] = useManifest(aapManifestUrl);
  const [aiaManifest, isLoadingAiaManifest] = useManifest(aiaManifestUrl);
  const [oversiktManifest, isLoadingOversiktManifest] = useManifest(oversiktManifestUrl);
  const [tjenesterManifest, isLoadingTjenesterManifest] = useManifest(tjenesterManifestUrl);

  useEffect(() => {
    logEvent("build", import.meta.env.VITE_BUILD_TIMESTAMP);
    post(innloggingsstatistikkUrl);
  }, []);

  const isError = useStore(selectIsError);
  useBreadcrumbs();

  if (
    isLoadingAiaManifest ||
    isLoadingOversiktManifest ||
    isLoadingTjenesterManifest ||
    isLoadingAapManifest ||
    isLoadingProfil
  ) {
    return <ContentLoader />;
  }

  const isAapBruker = profil?.microfrontends.includes("aap");
  const isArbeidssoker = arbeidssoker?.erArbeidssoker;

  const ArbeidsflateForInnloggetArbeidssoker = React.lazy(() =>
    import(`${aiaBaseCdnUrl}/${aiaManifest[aiaEntry][bundle]}`)
  );

  const Oversikt = React.lazy(() => import(`${oversiktBaseCdnUrl}/${oversiktManifest[oversiktEntry][bundle]}`));
  const Meldekort = React.lazy(() => import(meldekortUrl));
  const Arbeidsavklaringspenger = React.lazy(() => import(`${aapBaseCdnUrl}/${aapManifest[aapEntry][bundle]}`));
  const Tjenester = React.lazy(() => import(`${tjenesterBaseCdnUrl}/${tjenesterManifest[tjenesterEntry][bundle]}`));

  return (
    <Layout isError={isError}>
      <React.Suspense fallback={<ContentLoader />}>
        <ErrorBoundary>
          <Oversikt />
        </ErrorBoundary>
        <ErrorBoundary>
          <Meldekort />
        </ErrorBoundary>
        {isAapBruker ? (
          <ErrorBoundary>
            <Arbeidsavklaringspenger />
          </ErrorBoundary>
        ) : null}
        {isArbeidssoker ? (
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
