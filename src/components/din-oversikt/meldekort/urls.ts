import { getEnvironmentClientSide, getIsAnsattClientSide } from "../../../utils/client/environment";

const MELDEKORT_URL = {
  local: "http://localhost:3000/meldekort/bundle.js",
  dev: "https://www.intern.dev.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
  prod: "https://www.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
};

const meldekortAnsattUrl = "https://arbeid.ansatt.dev.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js";
export const meldekortUrl = getIsAnsattClientSide() ? meldekortAnsattUrl : MELDEKORT_URL[getEnvironmentClientSide()];