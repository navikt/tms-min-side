import { getEnvironmentClientSide } from "@utils/environment.client.ts";

const AIA_MELDEKORT_URL = {
  //local: "http://localhost:3000",
  local: "https://cdn.nav.no/paw/aia-meldekort",
  dev: "https://cdn.nav.no/paw/aia-meldekort",
  prod: "https://cdn.nav.no/paw/aia-meldekort",
};

export const aiaMeldekortUrl = AIA_MELDEKORT_URL[getEnvironmentClientSide()];
