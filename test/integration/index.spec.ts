import { expect, test } from "@playwright/test";
import { MinSidePage } from "./pages/minside.page";

test.describe("Landingsside", () => {
  test("viser hilsen og tittel", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(page).toHaveTitle("Min side");
    await expect(minSide.greeting).toBeVisible();
  });

  test("viser seksjonen for innloggede tjenester", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(minSide.innloggedeTjenester).toBeVisible();
  });

  test("henter innbyggerens navn fra api-et", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await minSide.expectNameLoaded();
  });
});
