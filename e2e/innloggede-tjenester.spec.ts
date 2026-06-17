import { expect, test } from "@playwright/test";
import { MinSidePage } from "./pages/minside.page";

test.describe("Innloggede tjenester", () => {
  test("viser navigasjon med tjenesteseksjoner", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    await expect(minSide.innloggedeTjenester).toBeVisible();
    await expect(page.getByText("JOBB OG OPPFØLGING")).toBeVisible();
    await expect(page.getByText("PERSONOPPLYSNINGER")).toBeVisible();
  });

  test("lenker til en kjent tjeneste", async ({ page }) => {
    const minSide = new MinSidePage(page);
    await minSide.goto();

    const aktivitetsplan = page.getByRole("link", { name: "Aktivitetsplan" });
    await expect(aktivitetsplan).toBeVisible();
    await expect(aktivitetsplan).toHaveAttribute("href", /aktivitetsplan/);
  });
});
