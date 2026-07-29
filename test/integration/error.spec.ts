import { expect, test } from "@playwright/test";

test.describe("Ukjent rute", () => {
  test("svarer med 404 for en side som ikke finnes", async ({ page }) => {
    const response = await page.goto("/minside/nb/finnes-ikke");

    expect(response?.status()).toBe(404);
  });
});
