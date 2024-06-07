import { getEnvironment } from "../utils/environment";
import { getDevBaseUrl } from "../utils/environment.client";

const REDIRECT_URI = {
  dev:`${getDevBaseUrl}/minside`,
  prod: "https://www.nav.no/minside",
};

export const redirectUri = REDIRECT_URI[getEnvironment()];
export const loginUrl = `/minside/oauth2/login?redirect=${redirectUri}`;
