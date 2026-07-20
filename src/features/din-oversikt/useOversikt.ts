import type { PersonalizedContent } from "./DinOversiktTypes";
import { hasMicrofrontends } from "./dinOversiktUtils.ts";
import type ProduktProperties from "./produktkort/ProduktProperties.tsx";
import type { StatuskortType } from "./statuskort/StatuskortTypes";

export const getShowDinOversikt = (
  personalizedContent: PersonalizedContent,
  produktProperties?: ProduktProperties[],
  statuskort?: StatuskortType[],
) => {
  const hasProduktkort = (produktConfig?: ProduktProperties[]) =>
    produktConfig !== undefined && produktConfig.length > 0;

  const hasStatuskort = (kort?: StatuskortType[]) => kort !== undefined && kort.length > 0;

  if (!personalizedContent) {
    return false;
  }

  return (
    hasMicrofrontends(personalizedContent.microfrontends) ||
    hasProduktkort(produktProperties) ||
    hasStatuskort(statuskort) ||
    personalizedContent?.meldekort
  );
};
