import { minSideProxyUrl } from "../urls";

const redirectToIdPorten = (redirectUrl: string) => {
  window.location.assign(`${minSideProxyUrl}/login?redirect_uri=${redirectUrl}${window.location.search}`);
};

export default redirectToIdPorten;
