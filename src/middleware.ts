import { authenticate } from "@navikt/astro-auth";
import { validateToken } from "@navikt/oasis";
import { sequence } from "astro/middleware";

export const onRequest = sequence(authenticate(), async (context, next) => {
  const { token } = context.locals;

  if (token) {
    const validation = await validateToken(token);
    context.locals.isSubstantial = validation.ok && validation.payload.acr === "idporten-loa-substantial";
  }

  return next();
});
