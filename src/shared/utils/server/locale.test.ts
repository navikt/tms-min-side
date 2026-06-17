import { describe, expect, it } from "vitest";
import { getLocale } from "./locale";

describe("getLocale", () => {
  it("should return the provided locale when it is set", () => {
    expect(getLocale("nn")).toBe("nn");
    expect(getLocale("en")).toBe("en");
    expect(getLocale("nb")).toBe("nb");
  });

  it("should fall back to 'nb' when the locale is undefined", () => {
    expect(getLocale(undefined)).toBe("nb");
  });
});
