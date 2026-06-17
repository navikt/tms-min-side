import { beforeEach, describe, expect, it } from "vitest";
import { isErrorAtom, setIsError } from "./store";

describe("isErrorAtom", () => {
  beforeEach(() => {
    isErrorAtom.set(false);
  });

  it("should default to false", () => {
    expect(isErrorAtom.value).toBe(false);
  });

  it("setIsError should flip the atom to true", () => {
    setIsError();

    expect(isErrorAtom.value).toBe(true);
  });
});
