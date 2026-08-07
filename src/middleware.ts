import { authenticate } from "@navikt/astro-auth";
import { sequence } from "astro/middleware";

export const onRequest = sequence(authenticate(), async (context, next) => {
  const { validation } = context.locals;

  if (validation?.ok) {
    context.locals.isSubstantial = validation.payload.acr === "idporten-loa-substantial";
  }

  return next();
});
