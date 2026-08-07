import type { StatuskortType } from "@src/features/din-oversikt/statuskort/StatuskortTypes";
import {
  getStatuskortList,
  getStatuskortUrl,
  isStatuskortEnabled,
} from "@src/features/din-oversikt/statuskort/statuskortUtils";
import { describe, expect, it } from "vitest";

const statuskort = (id: string): StatuskortType => ({
  id,
  tjeneste: "dagpenger",
  innhold: {
    tittel: "Dagpenger",
    beskrivelse: "Vi behandler søknaden din",
    link: "https://www.nav.no/dagpenger",
  },
});

describe("isStatuskortEnabled", () => {
  it("should be true when a url is configured", () => {
    expect(isStatuskortEnabled("http://tms-statuskort/statuskort")).toBe(true);
  });

  it("should be false when the url is empty or missing", () => {
    expect(isStatuskortEnabled("")).toBe(false);
    expect(isStatuskortEnabled("  ")).toBe(false);
    expect(isStatuskortEnabled(undefined)).toBe(false);
  });
});

describe("getStatuskortUrl", () => {
  it("should append locale as a query parameter", () => {
    expect(getStatuskortUrl("http://tms-statuskort/statuskort", "nn")).toBe(
      "http://tms-statuskort/statuskort?locale=nn",
    );
  });
});

describe("getStatuskortList", () => {
  it("should return the statuskort from the response", () => {
    const kort = statuskort("a");

    expect(getStatuskortList({ statuskort: [kort], harSkjulteKort: false })).toEqual([kort]);
  });

  it("should return an empty list when the response is missing", () => {
    expect(getStatuskortList(undefined)).toEqual([]);
  });

  it("should skip statuskort without innhold", () => {
    const utenInnhold = { id: "b", tjeneste: "aap" } as StatuskortType;

    expect(getStatuskortList({ statuskort: [utenInnhold], harSkjulteKort: true })).toEqual([]);
  });
});
