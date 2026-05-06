import { requestOboToken } from "@navikt/oasis";
import { isLocal } from "@utils/server/environment.ts";
import logger from "./logger";

export const getOboToken = async (token: string, audience: string): Promise<string> => {
  const oboResult = await requestOboToken(token, audience);

  if (isLocal) {
    return "Fake token";
  }

  if (!oboResult.ok) {
    logger.error("Error getting access token: " + oboResult.error);
    throw new Error("Request oboToken for min-side-proxy failed ");
  }

  return oboResult.token;
};

export const getAudience = (name: string, namespace: string = "min-side") => {
  const cluster = process.env.NAIS_CLUSTER_NAME;

  return `${cluster}:${namespace}:${name}`;
};
