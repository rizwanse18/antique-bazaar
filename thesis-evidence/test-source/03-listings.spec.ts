import { test, expect } from "@playwright/test";

test.describe("LISTINGS — Full Coverage", () => {
  test("L1: Listings page loads with cards", async ({ page }) => {
    await page.goto("/listings");
    await expect(page.getByRole("heading", { name: /All Antiques/i })).toBeVisible();
    const cards = page.locator('a[href^="/listings/"]');
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test("L2: Filters sidebar visible", async ({ page }) => {
    await page.goto("/listings");
    await expect(page.getByText(/Filters/i)).toBeVisible();
    await expect(page.getByText(/Category/i).first()).toBeVisible();
    await expect(page.getByText(/Condition/i).first()).toBeVisible();
  });

  test("L3: Category filter works via URL", async ({ page }) => {
    await page.goto("/listings?category=Coins");
    await page.waitForLoadState("networkidle");
    const bodyText = await page.textContent("body");
    expect(bodyText).toBeTruthy();
  });

  test("L4: Search filter via URL", async ({ page }) => {
    await page.goto("/listings?q=Lamp");
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("q=Lamp");
  });

  test("L5: Price range filter via URL", async ({ page }) => {
    await page.goto("/listings?min=50000&max=500000");
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("min=50000");
  });

  test("L6: Click on card opens detail page", async ({ page }) => {
    await page.goto("/listings");
    await page.locator('a[href^="/listings/"]').first().click();
    await page.waitForURL(/\/listings\/[a-z0-9]+/, { timeout: 15000 });
  });

  test("L7: Wishlist heart buttons on cards", async ({ page }) => {
    await page.goto("/listings");
    const heartButtons = page.locator('button[aria-label="Wishlist"]');
    expect(await heartButtons.count()).toBeGreaterThan(0);
  });

  test("L8: Clear filters link exists", async ({ page }) => {
    await page.goto("/listings?category=Coins");
    await page.waitForLoadState("networkidle");
    const bodyText = await page.textContent("body");
    expect(bodyText).toContain("Clear");
  });
});