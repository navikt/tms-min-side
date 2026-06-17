import type { Lenke } from "@src/features/innloggede-tjenester/innloggedeTjenesterUrls";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import LinkWithAmplitude from "./LinkWithAmplitude";

const logEvent = vi.fn();
vi.mock("@src/shared/utils/client/umami.ts", () => ({
  logEvent: (...args: unknown[]) => logEvent(...args),
}));

const link: Lenke = {
  nb: "Aktivitetsplan",
  nn: "Aktivitetsplan",
  en: "Activity plan",
  url: {
    nb: "https://aktivitetsplan.nav.no/nb",
    nn: "https://aktivitetsplan.nav.no/nn",
    en: "https://aktivitetsplan.nav.no/en",
  },
};

afterEach(() => {
  logEvent.mockReset();
});

describe("LinkWithAmplitude", () => {
  it("should render the link text and href for the given locale", () => {
    render(<LinkWithAmplitude link={link} locale="en" />);

    const anchor = screen.getByRole("link", { name: "Activity plan" });
    expect(anchor).toHaveAttribute("href", "https://aktivitetsplan.nav.no/en");
  });

  it("should log an analytics event when the link is clicked", () => {
    render(<LinkWithAmplitude link={link} locale="nb" />);

    fireEvent.click(screen.getByRole("link", { name: "Aktivitetsplan" }));

    expect(logEvent).toHaveBeenCalledWith("innloggede-tjenester-lenke", "innloggede-tjenester", "Aktivitetsplan");
  });
});
