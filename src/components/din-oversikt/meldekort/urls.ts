import { getEnvironment } from "../../../utils/server/environment";

const MELDEKORT_URL = {
  local: "http://localhost:3000/meldekort", // TODO: fix this
  dev: "http://meldekort-mikrofrontend.meldekort",
  prod: "http://meldekort-mikrofrontend.meldekort",
};

const MELDEKORT_FALLBACK_URL = {
  local: "http://localhost:3000/meldekort", // TODO: fix this
  dev: "http://meldekort-mikrofrontend.meldekort",
  prod: "http://meldekort-mikrofrontend.meldekort",
};

export const meldekortUrl = MELDEKORT_URL[getEnvironment()];
