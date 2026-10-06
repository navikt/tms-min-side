import { logContentEvent, logEvent, logGroupedEvent, logMfEvent } from "@src/shared/utils/client/umami";
import { afterEach, describe, expect, it, vi } from "vitest";

const { getAnalyticsInstance, custom } = vi.hoisted(() => {
  const custom = vi.fn();
  const logger = Object.assign(
    vi.fn(() => Promise.resolve()),
    { custom },
  );
  return { custom, getAnalyticsInstance: vi.fn(() => logger) };
});

vi.mock("@navikt/nav-dekoratoren-moduler", () => ({ getAnalyticsInstance }));

const originAtImport = getAnalyticsInstance.mock.calls.map((call) => [...call]);

afterEach(() => {
  custom.mockReset();
});

describe("umami", () => {
  it("should create the analytics instance with the app origin", () => {
    expect(originAtImport).toEqual([["tms-min-side"]]);
  });

  it("should log navigere events through logger.custom", async () => {
    custom.mockResolvedValue(undefined);

    await logEvent("innloggede-tjenester-lenke", "innloggede-tjenester", "Aktivitetsplan");

    expect(custom).toHaveBeenCalledWith("navigere", {
      komponent: "innloggede-tjenester-lenke",
      kategori: "innloggede-tjenester",
      lenketekst: "Aktivitetsplan",
    });
  });

  it.each([true, false])("should log microfrontend events through logger.custom (%s)", async (metric) => {
    custom.mockResolvedValue(undefined);

    await logMfEvent("minside.aktivitetsplan", metric);

    expect(custom).toHaveBeenCalledWith("minside.aktivitetsplan", { komponent: metric });
  });

  it("should log grouped composition events through logger.custom", async () => {
    custom.mockResolvedValue(undefined);

    await logGroupedEvent("a,b,c");

    expect(custom).toHaveBeenCalledWith("minside-composition", { composition: "a,b,c" });
  });

  it.each([true, false])("should log content events through logger.custom (%s)", async (hasContent) => {
    custom.mockResolvedValue(undefined);

    await logContentEvent("innboks.json", hasContent);

    expect(custom).toHaveBeenCalledWith("innboks.json", { hasContent });
  });

  it("should warn instead of throwing when the logger rejects", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    custom.mockRejectedValue(new Error("not initialized"));

    await expect(logEvent("a", "b", "c")).resolves.toBeUndefined();

    expect(warn).toHaveBeenCalledWith("Uninitialized amplitude");
    warn.mockRestore();
  });
});
