import React from "react";
import { useQuery } from "react-query";
import redirectToIdPorten, { redirectToLoginService } from "../../api/redirect";
import { legacyAuthenticationUrl, authenticationUrl, baseUrl } from "../../urls";
import { FetchError, fetcher } from "../../api/api";
import ContentLoader from "../loader/ContentLoader";

type Props = {
  children?: React.ReactNode;
};

const Authentication = ({ children }: Props) => {
  const { data: status, isLoading: isLoadingStatus, isError } = useQuery(authenticationUrl, fetcher);
  const {
    data: legacyStatus,
    isLoading: isLoadingLegacyStatus,
    error: isLoadingLegacyStatusError,
  } = useQuery(legacyAuthenticationUrl, fetcher, {
    enabled: !isLoadingStatus,
    onError: (error: FetchError) => {
      if (error.response.status === 401) {
        redirectToLoginService();
      }
    },
  });

  const redirectUrl = baseUrl + window.location.pathname;

  if (isLoadingStatus || isLoadingLegacyStatus || isLoadingLegacyStatusError) {
    return <ContentLoader />;
  }

  if (!status?.authenticated || isError) {
    redirectToIdPorten(redirectUrl);
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default Authentication;
