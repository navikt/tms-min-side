import { getEnvironment } from "@utils/server/environment.ts";
import { getDevBaseUrl } from "@utils/client/environment.ts";

const REDIRECT_URI = {
  dev: `${getDevBaseUrl}/minside`,
  prod: "https://www.nav.no/minside",
};

export const redirectUri = REDIRECT_URI[getEnvironment()];
export const loginUrl = `/minside/oauth2/login?redirect=${redirectUri}`;
