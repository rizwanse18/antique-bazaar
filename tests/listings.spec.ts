import { test, expect } from "@playwright/test";

test.describe("Listings", () => {
  test("Homepage loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Discover Timeless Treasures/i })).toBeVisible({ timeout: 10000 });
  });

  test("Listings page shows filters", async ({ page }) => {
    await page.goto("/listings");
    await expect(page.locator("text=Filters")).toBeVisible();
  });

  test("Listing detail loads", async ({ page }) => {
    await page.goto("/listings");
    await page.locator('a[href^="/listings/"]').first().click();
    await page.waitForURL(/\/listings\/[a-z0-9]+/);
    await expect(page.locator("text=Escrow Protected")).toBeVisible();
  });
});