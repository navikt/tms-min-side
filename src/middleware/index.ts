import { validateIdportenToken } from "./auth/validate";
import { defineMiddleware } from "astro/middleware";
import { redirectUri } from "./auth/urls";
import { isInternal, isLocal } from "./utils";

export const onRequest = defineMiddleware(async (context, next) => {
  const bearerToken: string | null | undefined = context.request.headers.get("authorization");

  if (isLocal()) {
    return next();
  }

  if (isInternal(context)) {
    return next();
  }

  if (!bearerToken) {
    console.info("Could not find any bearer token on the request. Redirecting to login.");
    return context.redirect(`/minside/oauth2/login?redirect=${redirectUri}`);
  }

  const validationResult = await validateIdportenToken(bearerToken);

  if (validationResult !== "valid") {
    const error = new Error(`Invalid JWT token found (cause: ${validationResult.errorType} ${validationResult.message}, redirecting to login.`);
    console.error(error);
    return context.redirect(`/minside/oauth2/login?redirect=${redirectUri}`);
  }

  return next();
});
