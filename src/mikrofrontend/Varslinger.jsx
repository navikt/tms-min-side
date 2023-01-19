import React from "react";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import ContentLoader from "../components/loader/ContentLoader";
import { varslingerBaseUrl, varslingerManifestUrl } from "../urls";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import useStore, { selectIsError, selectLanguage } from "../store/store";
import { text } from "../language/text";
import Layout from "../components/layout/Layout";
import { useQuery } from "react-query";
import { manifestFetcher } from "../api/api";

const Varslinger = () => {
  const { data: manifest, isLoading: isLoadingManifest } = useQuery(varslingerManifestUrl, manifestFetcher);

  const language = useStore(selectLanguage);
  const isError = useStore(selectIsError);

  useBreadcrumbs([
    {
      url: `/minside/varslinger`,
      title: text.minSideVarslinger[language],
      handleInApp: true,
    },
  ]);

  if (isLoadingManifest) {
    return <ContentLoader />;
  }

  const VarslingerMikrofrotend = React.lazy(() =>
    import(`${varslingerBaseUrl}/${manifest["src/Mikrofrontend.jsx"]["file"]}`)
  );

  return (
    <Layout isError={isError}>
      <React.Suspense fallback={<ContentLoader />}>
        <ErrorBoundary>
          <VarslingerMikrofrotend />
        </ErrorBoundary>
      </React.Suspense>
    </Layout>
  );
};

export default Varslinger;
