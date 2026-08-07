import { expect, test } from "@playwright/test";
import { MinSidePage } from "./pages/minside.page";

const timeout = 15_000;

test.describe("Aktuelt", () => {
  test("viser aktuelt-innhold med mikrofrontend", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(minSide.aktuelt).toBeVisible({ timeout });
    await expect(minSide.microfrontend("Pensjonskalkulator")).toBeVisible({
      timeout,
    });
  });
});
