import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InnboksTag from "./InnboksTag";

describe("InnboksTag", () => {
  it("should render the singular text for exactly one new message", () => {
    render(<InnboksTag innbokser={1} locale="nb" />);

    expect(screen.getByText("1 ny melding")).toBeInTheDocument();
  });

  it("should render the plural text for several new messages", () => {
    render(<InnboksTag innbokser={3} locale="nb" />);

    expect(screen.getByText("3 nye meldinger")).toBeInTheDocument();
  });

  it("should render the empty-state text when there are no new messages", () => {
    render(<InnboksTag innbokser={0} locale="nb" />);

    expect(screen.getByText("Ingen nye meldinger")).toBeInTheDocument();
  });

  it("should render the English text for the given locale", () => {
    render(<InnboksTag innbokser={2} locale="en" />);

    expect(screen.getByText("2 new messages")).toBeInTheDocument();
  });
});
