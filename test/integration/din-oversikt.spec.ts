import { expect, test } from "@playwright/test";
import { MinSidePage } from "./pages/minside.page";

const timeout = 15_000;

test.describe("Din oversikt", () => {
  test("viser overskriften for den personaliserte oversikten", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(minSide.dinOversikt).toBeVisible({ timeout });
  });

  test("viser meldekort-mikrofrontenden", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(minSide.microfrontend("Meldekort")).toBeVisible({ timeout });
  });

  test("viser mikrofrontendene for AAP og Syfo dialog", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(minSide.microfrontend("AAP")).toBeVisible({ timeout });
    await expect(minSide.microfrontend("Syfo dialog")).toBeVisible({ timeout });
  });

  test("viser et produktkort med ytelse", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(minSide.kort("Dagpenger", "Oversikt over saken din")).toBeVisible({ timeout });
  });

  test("viser statuskort fra tms-statuskort", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(minSide.kort("Arbeidsavklaringspenger", "Vi behandler søknaden din")).toBeVisible({ timeout });
    await expect(minSide.kort("Tilleggsstønader", "Du har en aktiv sak")).toBeVisible({ timeout });
  });
});
