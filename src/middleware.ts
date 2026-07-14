import { authenticate } from "@navikt/astro-auth";
import { sequence } from "astro/middleware";

export const onRequest = sequence(authenticate(), async (context, next) => {
  const { validation } = context.locals;
  context.locals.isSubstantial = validation.ok && validation.payload.acr === "idporten-loa-substantial";
  return next();
});
