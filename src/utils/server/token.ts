import { requestOboToken } from "@navikt/oasis";
import { isLocal } from "@utils/server/environment.ts";

const audience = `${process.env.NAIS_CLUSTER_NAME}:min-side:tms-min-side-proxy`;

export const getOboToken = async (token: string): Promise<string> => {
  const oboResult = await requestOboToken(token, audience);

  if (isLocal) {
    return "Fake token";
  }

  if (!oboResult.ok) {
    console.error("Error getting access token: " + oboResult.error);
    throw new Error("Request oboToken for min-side-proxy failed ");
  }

  return oboResult.token;
};