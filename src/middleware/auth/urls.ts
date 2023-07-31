import { getEnvironment } from "../../utils/environment";

const REDIRECT_URI = {
  dev: "https://www.intern.dev.nav.no/minside",
  prod: "https://www.nav.no/minside",
};

export const redirectUri = REDIRECT_URI[getEnvironment()];
