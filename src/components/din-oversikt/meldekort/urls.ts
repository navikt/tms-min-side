import { getEnvironment } from "@utils/server/environment";

const MELDEKORT_URL = {
  local: "http://localhost:3000/meldekort",
  dev: "http://meldekort-mikrofrontend.meldekort",
  prod: "http://meldekort-mikrofrontend.meldekort",
};

export const meldekortUrl = MELDEKORT_URL[getEnvironment()];
