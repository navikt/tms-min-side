import { describe, expect, it } from "vitest";
import { MultiStatusError } from "./error";

describe("MultiStatusError", () => {
  it("should be an Error with the given message", () => {
    const error = new MultiStatusError("partial failure", null);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("partial failure");
  });

  it("should expose the partial data it was constructed with", () => {
    const partialData = { ok: ["a"], failed: ["b"] };

    const error = new MultiStatusError("partial failure", partialData);

    expect(error.partialData).toEqual(partialData);
  });
});
