import { describe, expect, it } from "vitest";
import {
  beskjedSingular,
  buildText,
  hasBeskjeder,
  hasOppgaver,
  hasOppgaverAndBeskjeder,
  hasVarsler,
  oppgaveSingular,
} from "./varslerUtils";

describe("count predicates", () => {
  it("hasOppgaver should be true only for a positive count", () => {
    expect(hasOppgaver(1)).toBe(true);
    expect(hasOppgaver(0)).toBe(false);
  });

  it("hasBeskjeder should be true only for a positive count", () => {
    expect(hasBeskjeder(2)).toBe(true);
    expect(hasBeskjeder(0)).toBe(false);
  });

  it("hasVarsler should be true only for a positive count", () => {
    expect(hasVarsler(3)).toBe(true);
    expect(hasVarsler(0)).toBe(false);
  });

  it("hasOppgaverAndBeskjeder should require both counts to be positive", () => {
    expect(hasOppgaverAndBeskjeder(1, 1)).toBe(true);
    expect(hasOppgaverAndBeskjeder(1, 0)).toBe(false);
    expect(hasOppgaverAndBeskjeder(0, 1)).toBe(false);
  });

  it("oppgaveSingular and beskjedSingular should be true only for exactly one", () => {
    expect(oppgaveSingular(1)).toBe(true);
    expect(oppgaveSingular(2)).toBe(false);
    expect(beskjedSingular(1)).toBe(true);
    expect(beskjedSingular(0)).toBe(false);
  });
});

describe("buildText", () => {
  const beskjedText = "beskjeder";
  const oppgaveText = "oppgaver";
  const ogText = "og";

  it("should combine oppgaver and beskjeder when both are present", () => {
    expect(buildText(2, 3, beskjedText, oppgaveText, ogText)).toBe("3 oppgaver og 2 beskjeder");
  });

  it("should describe only oppgaver when there are no beskjeder", () => {
    expect(buildText(0, 3, beskjedText, oppgaveText, ogText)).toBe("3 oppgaver");
  });

  it("should describe only beskjeder when there are no oppgaver", () => {
    expect(buildText(2, 0, beskjedText, oppgaveText, ogText)).toBe("2 beskjeder");
  });

  it("should return undefined when there is nothing to report", () => {
    expect(buildText(0, 0, beskjedText, oppgaveText, ogText)).toBeUndefined();
  });
});
