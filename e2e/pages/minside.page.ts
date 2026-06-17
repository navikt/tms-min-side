import { expect, type Locator, type Page } from "@playwright/test";

const BASE_PATH = "/minside/nb/";

export class MinSidePage {
  readonly greeting: Locator;
  readonly innloggedeTjenester: Locator;
  readonly dinOversikt: Locator;
  readonly utbetalinger: Locator;
  readonly seAlleUtbetalinger: Locator;
  readonly innboks: Locator;
  readonly dokumenter: Locator;
  readonly seAlleDokumenter: Locator;
  readonly varsler: Locator;
  readonly utkast: Locator;
  readonly aktuelt: Locator;

  constructor(private readonly page: Page) {
    this.greeting = page.getByRole("heading", { name: /Hei,/ });
    this.innloggedeTjenester = page.getByRole("heading", {
      name: "Innloggede tjenester",
    });
    this.dinOversikt = page.getByRole("heading", {
      name: "Din oversikt",
      exact: true,
    });
    this.utbetalinger = page.getByRole("heading", {
      name: "Utbetalinger",
      exact: true,
    });
    this.seAlleUtbetalinger = page.getByRole("link", {
      name: "Se alle utbetalinger",
    });
    this.innboks = page.getByRole("heading", { name: "Innboks", exact: true });
    this.dokumenter = page.getByRole("heading", {
      name: "Siste dokumenter",
      exact: true,
    });
    this.seAlleDokumenter = page.getByRole("link", {
      name: "Se alle dokumenter",
    });
    this.varsler = page.getByRole("heading", { name: "Varsler", exact: true });
    this.utkast = page.getByRole("heading", { name: "Utkast", exact: true });
    this.aktuelt = page.getByRole("heading", {
      name: "Kan være aktuelt for deg",
      exact: true,
    });
  }

  async goto() {
    await this.page.goto(BASE_PATH);
    await expect(this.greeting).toBeVisible();
  }

  async expectNameLoaded() {
    await expect(this.page.getByText(/navn navnesen/i).first()).toBeVisible({
      timeout: 20_000,
    });
  }

  microfrontend(name: string): Locator {
    return this.page.getByRole("heading", { name, level: 3, exact: true });
  }
}
