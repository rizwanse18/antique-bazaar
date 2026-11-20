import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("Admin can login", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@antique.com");
    await page.fill('input[name="password"]', "admin123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 10000 });
  });

  test("Wrong password shows error", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@antique.com");
    await page.fill('input[name="password"]', "wrong");
    await page.click('button[type="submit"]');
    await expect(page.locator("text=Invalid email or password")).toBeVisible({ timeout: 5000 });
  });

  test("Seller can login", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "seller@demo.com");
    await page.fill('input[name="password"]', "seller123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 10000 });
  });
});