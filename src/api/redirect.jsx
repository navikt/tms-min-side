import { baseUrl, loginserviceUrl, minSideProxyUrl } from "../urls";

const redirectToIdPorten = (redirectUrl) => {
  window.location.assign(`${minSideProxyUrl}/login?redirect_uri=${redirectUrl}${window.location.search}`);
};

export const redirectToLoginService = () => {
  const redirectUrl = baseUrl + window.location.pathname.replace(/\/$/, "");
  window.location.assign(`${loginserviceUrl}&redirect=${redirectUrl}${window.location.search}`);
};

export default redirectToIdPorten;
