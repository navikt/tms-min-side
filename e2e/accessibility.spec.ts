import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { MinSidePage } from "./pages/minside.page";

const wcagTags = ["wcag2a", "wcag2aa", "wcag21aa"];

test.describe("Universell utforming", () => {
  test("landingssiden har ingen WCAG-brudd", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();
    await minSide.expectNameLoaded();

    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

    expect(results.violations).toEqual([]);
  });
});
