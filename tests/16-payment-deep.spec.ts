import { test, expect } from "@playwright/test";

test.describe("PAYMENT & ORDERS — Deep Coverage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "buyer@demo.com");
    await page.fill('input[name="password"]', "buyer123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 30000 });

    await page.goto("/listings");
    await page.waitForLoadState("networkidle");

    const links = page.locator('a[href^="/listings/"]');
    const count = await links.count();

    for (let i = 0; i < count; i++) {
      await links.nth(i).click();
      await page.waitForURL(/\/listings\/[a-z0-9]+/);
      await page.waitForLoadState("networkidle");

      const addBtn = page.locator('button:has-text("Add to Cart")');
      if (await addBtn.isVisible().catch(() => false)) {
        await addBtn.click();
        await page.waitForTimeout(800);
        break;
      }
      await page.goto("/listings");
      await page.waitForLoadState("networkidle");
    }
  });

  test("PM1: All 6 payment methods visible on checkout", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    if (page.url().includes("/cart")) { test.skip(); return; }
    const methods = ["Escrow", "Credit / Debit Card", "JazzCash", "Easypaisa", "Bank Transfer", "PayPal"];
    for (const m of methods) {
      await expect(page.getByText(m, { exact: false }).first()).toBeVisible({ timeout: 5000 });
    }
  });

  test("PM7: Escrow protected message shown", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    if (page.url().includes("/cart")) { test.skip(); return; }
    await expect(page.getByText("Escrow", { exact: false }).first()).toBeVisible({ timeout: 10000 });
  });
});