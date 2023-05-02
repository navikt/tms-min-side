import React from "react";
import { useQuery } from "react-query";
import redirectToIdPorten from "../../api/redirect";
import { authenticationUrl, baseUrl } from "../../urls";
import { fetcher } from "../../api/api";
import ContentLoader from "../loader/ContentLoader";

type Props = {
  children?: React.ReactNode;
};

const Authentication = ({ children }: Props) => {
  const { data: status, isLoading: isLoadingStatus, isError } = useQuery(authenticationUrl, fetcher);
  const redirectUrl = baseUrl + window.location.pathname;

  if (isLoadingStatus) {
    return <ContentLoader />;
  }

  if (!status?.authenticated || isError) {
    redirectToIdPorten(redirectUrl);
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default Authentication;
