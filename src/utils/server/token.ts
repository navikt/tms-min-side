import { requestOboToken } from "@navikt/oasis";
import { isLocal } from "@utils/server/environment.ts";

const audience = `api://${process.env.NAIS_CLUSTER_NAME}.min-side.tms-min-side-proxy/.default`;

export const getOboToken = async (token: string): Promise<string> => {
  const oboResult = await requestOboToken(token, audience);

  if (isLocal) {
    return "Fake token";
  }

  if (!oboResult.ok) {
    console.log("Fail on-behalf-of token for api");
    throw new Error("Request oboToken for min-side-proxy backend failed");
  }

  return oboResult.token;
};