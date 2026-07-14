import { authenticate } from "@navikt/astro-auth";
import { validateToken } from "@navikt/oasis";
import { defineMiddleware, sequence } from "astro/middleware";

const setSubstantialLevel = defineMiddleware(async (context, next) => {
  const { token } = context.locals;

  if (token) {
    const validation = await validateToken(token);
    context.locals.isSubstantial = validation.ok && validation.payload.acr === "idporten-loa-substantial";
  }

  return next();
});

export const onRequest = sequence(authenticate(), setSubstantialLevel);
