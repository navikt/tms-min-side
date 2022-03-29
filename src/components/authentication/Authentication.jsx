import React from "react";
import { useQuery } from "react-query";
import redirectToIdPorten from "../../utils/redirect";
import { minSideProxyUrl } from "../../api/urls";
import { fetcher } from "../../api/api";

const Authentication = ({ children }) => {
  const { data: status, isLoading, isError } = useQuery(`${minSideProxyUrl}/login/status`, fetcher);

  if (isLoading) {
    return <div>Logger inn...</div>;
  }

  if (!status?.authenticated || isError) {
    redirectToIdPorten();
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default Authentication;