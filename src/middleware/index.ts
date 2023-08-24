import { validateIdportenToken } from "./auth/validate";
import { defineMiddleware } from "astro/middleware";
import { loginUrl } from "./urls";
import { isInternal } from "./utils";
import { isLocal } from "../utils/environment";

export const onRequest = defineMiddleware(async (context, next) => {
  const bearerToken: string | null | undefined = context.request.headers.get("authorization");

  return next();

  if (isLocal) {
    return next();
  }

  if (isInternal(context)) {
    return next();
  }

  if (!bearerToken) {
    console.info("Could not find any bearer token on the request. Redirecting to login.");
    return context.redirect(loginUrl);
  }

  const validationResult = await validateIdportenToken(bearerToken);

  if (validationResult !== "valid") {
    const error = new Error(`Invalid JWT token found (cause: ${validationResult.errorType} ${validationResult.message}, redirecting to login.`);
    console.error(error);
    return context.redirect(loginUrl);
  }

  return next();
});
