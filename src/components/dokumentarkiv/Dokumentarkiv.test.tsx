import { screen } from "@testing-library/react";
import { mswServer } from "mock/mswServer";
import { HttpResponse, http } from "msw";
import { expect, test } from "vitest";
import { axe } from "vitest-axe";
import { render } from "vitest-setup";
import { dokumentarkivUrl, mineSakerApiSisteUrl } from "./dokumentarkivUrls";
import Dokumenter from "./dokumenter/Dokumenter";

test("tomt panel lenker til dokumentarkiv", async () => {
  mswServer.use(
    http.get(mineSakerApiSisteUrl, () => {
      return HttpResponse.json({
        sakstemaer: [],
      });
    }),
  );

  const { container } = render(<Dokumenter language={"nb"} />);
  expect(await screen.findByRole("link")).toHaveAttribute("href", dokumentarkivUrl);
  expect(await axe(container)).toHaveNoViolations();
});

test("viser siste dokument", async () => {
  mswServer.use(
    http.get(mineSakerApiSisteUrl, () => {
      return HttpResponse.json({
        sakstemaer: [
          {
            navn: "Serviceklager",
            kode: "SER",
            sistEndret: "2023-05-25T12:41:02Z",
            detaljvisningUrl: "https://localhost:3000/dokumenturl",
          },
        ],
      });
    }),
  );

  const { container } = render(<Dokumenter language={"nb"} />);

  expect(await screen.findByRole("heading", { name: "Serviceklager", level: 2 })).toBeInTheDocument();
  expect(await screen.findByRole("link", { name: /Serviceklager/ })).toHaveAttribute(
    "href",
    "https://localhost:3000/dokumenturl",
  );
  expect(await screen.findByText("Sist endret: 25. mai 2023")).toBeInTheDocument();
  expect(await screen.findByRole("link", { name: "Gå til dokumentarkivet" })).toHaveAttribute("href", dokumentarkivUrl);
  expect(await axe(container)).toHaveNoViolations();
});

test("viser to siste dokumenter", async () => {
  mswServer.use(
    http.get(mineSakerApiSisteUrl, () => {
      return HttpResponse.json({
        sakstemaer: [
          {
            navn: "Serviceklager",
            kode: "SER",
            sistEndret: "2023-05-25T12:41:02Z",
            detaljvisningUrl: "https://localhost:3000/dokumenturl1",
          },
          {
            navn: "Arbeidsavklaringspenger",
            kode: "AAP",
            sistEndret: "2023-04-20T11:33:51Z",
            detaljvisningUrl: "https://localhost:3000/dokumenturl2",
          },
        ],
      });
    }),
  );

  render(<Dokumenter language={"nb"} />);

  expect(await screen.findByRole("heading", { name: "Serviceklager", level: 2 })).toBeInTheDocument();
  expect(
    await screen.findByRole("heading", {
      name: "Arbeidsavklaringspenger",
      level: 2,
    }),
  ).toBeInTheDocument();
});
