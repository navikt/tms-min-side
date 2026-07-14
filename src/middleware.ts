import { authenticate } from "@navikt/astro-auth";
import { sequence } from "astro/middleware";

export const onRequest = sequence(authenticate(), async (context, next) => {
  const { payload } = context.locals.validation as { ok: true; payload: { acr?: string } };
  context.locals.isSubstantial = payload.acr === "idporten-loa-substantial";
  return next();
});
