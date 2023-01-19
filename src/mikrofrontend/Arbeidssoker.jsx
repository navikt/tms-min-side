import React from "react";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import ContentLoader from "../components/loader/ContentLoader";
import { aiaBaseUrl, aiaManifestUrl } from "../urls";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import useStore, { selectIsError, selectLanguage } from "../store/store";
import { text } from "../language/text";
import Layout from "../components/layout/Layout";
import { useQuery } from "react-query";
import { manifestFetcher } from "../api/api";

const Arbeidssoker = () => {
  const { data: manifest, isLoading: isLoadingManifest } = useQuery(aiaManifestUrl, manifestFetcher);

  const language = useStore(selectLanguage);
  const isError = useStore(selectIsError);

  useBreadcrumbs([
    {
      url: `/minside/arbeidssoker`,
      title: text.arbeidssoker[language],
      handleInApp: true,
    },
  ]);

  if (isLoadingManifest) {
    return <ContentLoader />;
  }

  const ArbeidsflateForInnloggetArbeidssoker = React.lazy(() =>
    import(`${aiaBaseUrl}/${manifest["src/main.tsx"]["file"]}`)
  );

  return (
    <Layout isError={isError}>
      <React.Suspense fallback={<ContentLoader />}>
        <ErrorBoundary>
          <ArbeidsflateForInnloggetArbeidssoker />
        </ErrorBoundary>
      </React.Suspense>
    </Layout>
  );
};

export default Arbeidssoker;
