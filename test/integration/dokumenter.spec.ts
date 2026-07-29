import { expect, test } from "@playwright/test";
import { MinSidePage } from "./pages/minside.page";

const timeout = 15_000;

test.describe("Dokumenter", () => {
  test("viser de siste dokumentene", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(minSide.dokumenter).toBeVisible({ timeout });
    await expect(
      page.getByRole("link", {
        name: /Søknad om å beholde arbeidsavklaringspenger under opphold i innlandet/,
      }),
    ).toBeVisible({ timeout });
  });

  test("lenker til alle dokumenter", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(minSide.seAlleDokumenter).toBeVisible({ timeout });
    await expect(minSide.seAlleDokumenter).toHaveAttribute("href", /dokumentarkiv/);
  });
});
