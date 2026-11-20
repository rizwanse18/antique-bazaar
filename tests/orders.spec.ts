import { test, expect } from "@playwright/test";

test.describe("Order flow", () => {
  test("Buyer can view orders", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "buyer@demo.com");
    await page.fill('input[name="password"]', "buyer123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 30000 });
    await page.goto("/dashboard/orders");
    await expect(page.getByRole("heading", { name: /My Orders/i })).toBeVisible({ timeout: 10000 });
  });
});