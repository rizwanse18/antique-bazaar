import { test, expect } from "@playwright/test";

test.describe("Admin Panel", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@antique.com");
    await page.fill('input[name="password"]', "admin123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 30000 });
    await page.waitForLoadState("networkidle");
  });

  test("Admin dashboard", async ({ page }) => {
    await page.goto("/dashboard/admin");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 10000 });
  });

  test("Products page", async ({ page }) => {
    await page.goto("/dashboard/admin/products");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 10000 });
  });

  test("Users page", async ({ page }) => {
    await page.goto("/dashboard/admin/users");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 10000 });
  });

  test("Complaints page", async ({ page }) => {
    await page.goto("/dashboard/admin/complaints");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 10000 });
  });
});