import { describe, expect, it } from "vitest";
import type { Utbetaling, UtbetalingData } from "./utbetalingTypes";
import { formatToReadableDate, isIngen, isKommende, isList, isTidligere } from "./utbetalingUtils";

const utbetalingData = (id: string): UtbetalingData => ({
  utbetaling: 1000,
  dato: "2024-06-17",
  ytelse: "Dagpenger",
  kontonummer: "12345678901",
  id,
});

const utbetaling = (kommende: number, siste: number): Utbetaling => ({
  kommendeUtbetalinger: Array.from({ length: kommende }, (_, i) => utbetalingData(`k${i}`)),
  sisteUtbetalinger: Array.from({ length: siste }, (_, i) => utbetalingData(`s${i}`)),
});

describe("formatToReadableDate", () => {
  it("should format the date as 'day. month' in Norwegian", () => {
    expect(formatToReadableDate("2024-06-17").trim()).toBe("17. juni");
  });
});

describe("isIngen", () => {
  it("should be true when there are no payments at all", () => {
    expect(isIngen(utbetaling(0, 0))).toBe(true);
  });

  it("should be false when there is at least one payment", () => {
    expect(isIngen(utbetaling(1, 0))).toBe(false);
  });
});

describe("isKommende", () => {
  it("should be true for exactly one upcoming and no past payment", () => {
    expect(isKommende(utbetaling(1, 0))).toBe(true);
  });

  it("should be false when there is also a past payment", () => {
    expect(isKommende(utbetaling(1, 1))).toBe(false);
  });
});

describe("isTidligere", () => {
  it("should be true for exactly one past and no upcoming payment", () => {
    expect(isTidligere(utbetaling(0, 1))).toBe(true);
  });

  it("should be false when there is also an upcoming payment", () => {
    expect(isTidligere(utbetaling(1, 1))).toBe(false);
  });
});

describe("isList", () => {
  it("should be true when there are two or more payments combined", () => {
    expect(isList(utbetaling(1, 1))).toBe(true);
    expect(isList(utbetaling(0, 2))).toBe(true);
  });

  it("should be false when there is at most one payment", () => {
    expect(isList(utbetaling(1, 0))).toBe(false);
    expect(isList(utbetaling(0, 0))).toBe(false);
  });
});
