import type { DokumentType } from "@src/features/dokumenter/dokumenterTypes";
import { describe, expect, it } from "vitest";
import { formatDateMonth, setAvsenderMottaker } from "./dokumentUtils";

const dokument = (overrides: Partial<DokumentType> = {}): DokumentType => ({
  tittel: "Vedtak om dagpenger",
  opprettet: "2024-06-17",
  dokumentInfoId: "doc-1",
  journalpostId: "jp-1",
  temakode: "DAG",
  avsender: null,
  mottaker: null,
  ...overrides,
});

describe("formatDateMonth", () => {
  it("should format the date as 'day. month year' in Norwegian", () => {
    expect(formatDateMonth("2024-06-17")).toBe("17. juni 2024");
  });
});

describe("setAvsenderMottaker", () => {
  it("should return the avsender when it is set", () => {
    expect(setAvsenderMottaker(dokument({ avsender: "Nav" }))).toBe("Nav");
  });

  it("should fall back to the mottaker when there is no avsender", () => {
    expect(setAvsenderMottaker(dokument({ avsender: null, mottaker: "Ola" }))).toBe("Ola");
  });
});
