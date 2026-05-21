import { REDIRECT_URI } from "astro:env/server";
import { getToken, validateToken } from "@navikt/oasis";
import { defineMiddleware } from "astro/middleware";
import { isInternal, isLocal } from "./shared/utils/server/environment.ts";

export const onRequest = defineMiddleware(async (context, next) => {
  const token = getToken(context.request.headers);
  const params = encodeURIComponent(context.url.search);
  const loginUrl = `/minside/oauth2/login?redirect=${REDIRECT_URI}`;

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
