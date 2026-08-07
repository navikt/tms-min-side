import { expect, test } from "@playwright/test";
import { MinSidePage } from "./pages/minside.page";

const timeout = 15_000;

test.describe("Innboks", () => {
  test("viser innboks med antall nye meldinger", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(minSide.innboks).toBeVisible({ timeout });
    await expect(page.getByText("4 nye meldinger")).toBeVisible({ timeout });
  });

  test("lenker til innboksen", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    const innboksLenke = page.getByRole("link", { name: /Innboks/ });
    await expect(innboksLenke).toBeVisible({ timeout });
    await expect(innboksLenke).toHaveAttribute("href", /innboks/);
  });
});
