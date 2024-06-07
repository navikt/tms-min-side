import { getEnvironment } from "../utils/environment";

const REDIRECT_URI = {
  dev: "https://www.ansatt.dev.nav.no/minside",
  prod: "https://www.nav.no/minside",
};

export const redirectUri = REDIRECT_URI[getEnvironment()];
export const loginUrl = `/minside/oauth2/login?redirect=${redirectUri}`;
