import { expect, test } from "@playwright/test";
import { MinSidePage } from "./pages/minside.page";

const timeout = 15_000;

test.describe("Varsler og utkast", () => {
  test("viser varsler med oppgaver og beskjeder", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(minSide.varsler).toBeVisible({ timeout });
    await expect(page.getByText("3 oppgaver og 6 beskjeder")).toBeVisible({
      timeout,
    });
  });

  test("viser antall påbegynte utkast", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(minSide.utkast).toBeVisible({ timeout });
    await expect(page.getByText("Du har 2 påbegynte søknader")).toBeVisible({
      timeout,
    });
  });
});
