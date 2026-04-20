import ProduktProperties from "../produktkort/ProduktProperties.tsx";
import { hasMicrofrontends } from "../../../utils/server/oversikt.ts";
import type { PersonalizedContent } from "../DinOversiktTypes";

export const getShowDinOversikt = (
  personalizedContent: PersonalizedContent,
  produktProperties?: ProduktProperties[],
) => {
  const hasProduktkort = (produktConfig?: ProduktProperties[]) =>
    produktConfig !== undefined && produktConfig.length > 0;

  if (!personalizedContent) {
    return false;
  }

  return (
    hasMicrofrontends(personalizedContent.microfrontends) ||
    hasProduktkort(produktProperties) ||
    personalizedContent?.meldekort
  );
};
