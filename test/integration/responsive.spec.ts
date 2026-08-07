import { expect, test } from "@playwright/test";
import { MinSidePage } from "./pages/minside.page";

const viewports = [
  { name: "mobil", width: 375, height: 812 },
  { name: "desktop", width: 1280, height: 800 },
];

for (const viewport of viewports) {
  test(`viser innhold på ${viewport.name} (${viewport.width}px)`, async ({ page }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });

    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(minSide.greeting).toBeVisible();
    await minSide.expectNameLoaded();
  });
}
