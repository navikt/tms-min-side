import { getToken, validateToken } from "@navikt/oasis";
import { isLocal } from "@src/shared/utils/server/environment.ts";
import logger from "@src/shared/utils/server/logger";
import { defineMiddleware } from "astro/middleware";
import { loginUrl } from "./urls";
import { isInternal } from "./utils";

export const onRequest = defineMiddleware(async (context, next) => {
  const token = getToken(context.request.headers);
  const params = encodeURIComponent(context.url.search);

  if (isLocal) {
    return next();
  }

  if (isInternal(context)) {
    return next();
  }

  if (!token) {
    return context.redirect(`${loginUrl}${params}`);
  }

  const validation = await validateToken(token);

  if (!validation.ok) {
    console.info("Validation of token failed. Redirecting to login");
    return context.redirect(`${loginUrl}${params}`);
  }

  context.locals.token = token;
  context.locals.isSubstantial = validation.payload.acr === "idporten-loa-substantial";

  return next();
});
