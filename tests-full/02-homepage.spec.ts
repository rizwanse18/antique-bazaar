import { test, expect } from "@playwright/test";

test.describe("HOMEPAGE — Full Coverage", () => {
  test("H1: Homepage loads with all sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Discover Timeless Treasures/i })).toBeVisible();
    await expect(page.getByText(/Antique Bazaar/i).first()).toBeVisible();
  });

  test("H2: Search bar present and functional", async ({ page }) => {
    await page.goto("/");
    const searchInput = page.locator('input[name="q"]').first();
    await expect(searchInput).toBeVisible();
    await searchInput.fill("Mughal");
    await searchInput.press("Enter");
    await page.waitForURL(/listings.*q=Mughal/, { timeout: 15000 });
  });

  test("H3: Categories sidebar present", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/All Categories/i)).toBeVisible();
    await expect(page.getByText(/Furniture/i).first()).toBeVisible();
    await expect(page.getByText(/Coins/i).first()).toBeVisible();
  });

  test("H4: Featured antiques section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Featured Antiques/i)).toBeVisible();
    const cards = page.locator('a[href^="/listings/"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("H5: Top bar shows location", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Peshawar/i).first()).toBeVisible();
  });

  test("H6: Footer present with contact info", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.getByText(/antiqueitemmarketplace@gmail.com/i).first()).toBeVisible();
  });
});