import { isErrorAtom } from "@src/shared/store/store";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Feilmelding from "./Feilmelding";
import { feilmeldingText } from "./feilmeldingText";

beforeEach(() => {
  isErrorAtom.set(false);
});

describe("Feilmelding", () => {
  it("should render nothing while there is no error", () => {
    const { container } = render(<Feilmelding locale="nb" />);

    expect(container).toBeEmptyDOMElement();
  });

  it("should render the error alert when the error atom is set", () => {
    isErrorAtom.set(true);

    render(<Feilmelding locale="nb" />);

    expect(screen.getByText(feilmeldingText.feilmelding.nb)).toBeInTheDocument();
  });

  it("should render the alert text for the given locale", () => {
    isErrorAtom.set(true);

    render(<Feilmelding locale="en" />);

    expect(screen.getByText(feilmeldingText.feilmelding.en)).toBeInTheDocument();
  });
});
