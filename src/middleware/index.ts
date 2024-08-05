import { defineMiddleware } from "astro/middleware";
import { getToken, validateToken } from "@navikt/oasis";
import { loginUrl } from "./urls";
import { isInternal } from "./utils";
import { isLocal } from "@utils/server/environment.ts";

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
    console.info("Could not find any bearer token on the request. Redirecting to login.");
    return context.redirect(`${loginUrl}${params}`);
  }

  const validation = await validateToken(token);

  if (!validation.ok) {
    console.info("Validation of token failed. Redirecting to login");
    return context.redirect(`${loginUrl}${params}`);
  }

  return next();
});
