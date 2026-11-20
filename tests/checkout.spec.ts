import { test, expect } from "@playwright/test";

test.describe("Cart & Checkout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "buyer@demo.com");
    await page.fill('input[name="password"]', "buyer123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 30000 });
  });

  test("Cart page loads", async ({ page }) => {
    await page.goto("/cart");
    await page.waitForLoadState("networkidle");
    // Cart page pe h1 ya "Cart is empty" hona chahiye
    await expect(page.locator("h1, h2").first()).toBeVisible({ timeout: 10000 });
  });
});