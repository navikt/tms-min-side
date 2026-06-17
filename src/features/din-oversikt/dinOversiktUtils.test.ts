import type { Microfrontend } from "@src/shared/microfrontends/microfrontendTypes";
import { describe, expect, it } from "vitest";
import type { PersonalizedContent } from "./DinOversiktTypes";
import { getProduktkortList, hasAktueltMicrofrontends, hasMicrofrontends } from "./dinOversiktUtils";

const microfrontend = (id: string): Microfrontend => ({
  microfrontend_id: id,
  url: "http://localhost:3000/mf",
  appname: "app",
  namespace: "min-side",
  fallback: "",
  ssr: true,
});

describe("hasMicrofrontends", () => {
  it("should be true when there is at least one microfrontend", () => {
    expect(hasMicrofrontends([microfrontend("a")])).toBe(true);
  });

  it("should be false for an empty list", () => {
    expect(hasMicrofrontends([])).toBe(false);
  });
});

describe("hasAktueltMicrofrontends", () => {
  it("should be true when there is at least one microfrontend", () => {
    expect(hasAktueltMicrofrontends([microfrontend("a")])).toBe(true);
  });

  it("should be false for an empty list", () => {
    expect(hasAktueltMicrofrontends([])).toBe(false);
  });
});

describe("getProduktkortList", () => {
  it("should return undefined when there is no personalized content", () => {
    expect(getProduktkortList("nb", undefined)).toBeUndefined();
  });

  it("should sort produktkort codes and map them to product properties", () => {
    const content = {
      produktkort: ["FOR", "DAG"],
    } as PersonalizedContent;

    const result = getProduktkortList("nb", content);

    expect(result?.map((p) => p.produktnavn)).toEqual(["dagpenger", "foreldrepenger"]);
  });
});
