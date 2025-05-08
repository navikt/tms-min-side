import type { PersonalizedContent } from "../../microfrontend/microfrontendTypes.tsx";
import ProduktProperties from "../produktkort/ProduktProperties.tsx";
import { hasMicrofrontends } from "../../../utils/server/oversikt.ts";

export const getShowDinOversikt = (personalizedContent: PersonalizedContent, produktProperties?: ProduktProperties[]) => {
  const hasProduktkort = (produktConfig?: ProduktProperties[]) => produktConfig !== undefined && produktConfig.length > 0;

  if (!personalizedContent) {
    return false;
  }

  return (
    hasMicrofrontends(personalizedContent.microfrontends) ||
    hasProduktkort(produktProperties) ||
    personalizedContent?.meldekort
  );
};
