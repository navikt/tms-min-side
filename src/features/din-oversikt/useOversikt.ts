import type { PersonalizedContent } from "./DinOversiktTypes";
import { hasMicrofrontends } from "./dinOversiktUtils.ts";
import type ProduktProperties from "./produktkort/ProduktProperties.tsx";
import type { Statuskort } from "./statuskort/StatuskortTypes";

export const getShowDinOversikt = (
  personalizedContent: PersonalizedContent,
  produktProperties?: ProduktProperties[],
  statuskort?: Statuskort[],
) => {
  const hasProduktkort = (produktConfig?: ProduktProperties[]) =>
    produktConfig !== undefined && produktConfig.length > 0;

  const hasStatuskort = (kort?: Statuskort[]) => kort !== undefined && kort.length > 0;

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
