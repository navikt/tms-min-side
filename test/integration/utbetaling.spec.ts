import { expect, test } from "@playwright/test";
import { MinSidePage } from "./pages/minside.page";

const timeout = 15_000;

test.describe("Utbetaling", () => {
  test("viser utbetalingslisten med ytelser", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(minSide.utbetalinger).toBeVisible({ timeout });
    await expect(page.getByText("Arbeidsavklaringspenger").first()).toBeVisible({ timeout });
  });

  test("merker kommende utbetaling med «Neste utbetaling»", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(page.getByText("Neste utbetaling").first()).toBeVisible({
      timeout,
    });
  });

  test("lenker til alle utbetalinger", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(minSide.seAlleUtbetalinger).toBeVisible({ timeout });
    await expect(minSide.seAlleUtbetalinger).toHaveAttribute("href", /utbetalingsoversikt/);
  });
});
