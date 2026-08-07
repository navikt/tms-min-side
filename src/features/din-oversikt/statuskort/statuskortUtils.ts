import type { Locale } from "@src/shared/utils/server/locale.ts";
import type { StatuskortResponse, StatuskortType } from "./StatuskortTypes";

export const isStatuskortEnabled = (baseUrl?: string) => baseUrl !== undefined && baseUrl.trim().length > 0;

export const getStatuskortUrl = (baseUrl: string, locale: Locale) => `${baseUrl}?locale=${locale}`;

export const getStatuskortList = (response?: StatuskortResponse): StatuskortType[] =>
  response?.statuskort?.filter((statuskort) => statuskort?.tittel !== undefined) ?? [];
