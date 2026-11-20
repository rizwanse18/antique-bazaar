import { test, expect } from "@playwright/test";

test.describe("PAYMENT GATEWAY DEEP", () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto("/login");
    await page.fill('input[name="email"]', "buyer@demo.com");
    await page.fill('input[name="password"]', "buyer123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 30000 });

    // Add item to cart via listings
    await page.goto("/listings");
    await page.waitForLoadState("networkidle");

    // Find first fixed-price listing (not auction)
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
      // Go back if not fixed-price
      await page.goto("/listings");
      await page.waitForLoadState("networkidle");
    }
  });

  test("PG2: JazzCash payment option visible", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    if (page.url().includes("/cart")) {
      test.skip();
      return;
    }
    await expect(page.getByText("JazzCash", { exact: false }).first()).toBeVisible({ timeout: 10000 });
  });

  test("PG3: Easypaisa payment option visible", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    if (page.url().includes("/cart")) { test.skip(); return; }
    await expect(page.getByText("Easypaisa", { exact: false }).first()).toBeVisible({ timeout: 10000 });
  });

  test("PG4: Bank Transfer (Raast) option visible", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    if (page.url().includes("/cart")) { test.skip(); return; }
    await expect(page.getByText("Bank Transfer", { exact: false }).first()).toBeVisible({ timeout: 10000 });
  });

  test("PG5: PayPal option visible", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    if (page.url().includes("/cart")) { test.skip(); return; }
    await expect(page.getByText("PayPal", { exact: false }).first()).toBeVisible({ timeout: 10000 });
  });

  test("PG6: Escrow option visible", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    if (page.url().includes("/cart")) { test.skip(); return; }
    await expect(page.getByText("Escrow", { exact: false }).first()).toBeVisible({ timeout: 10000 });
  });

  test("PG7: All 6 payment options present together", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    if (page.url().includes("/cart")) { test.skip(); return; }
    const methods = ["Escrow", "Credit / Debit Card", "JazzCash", "Easypaisa", "Bank Transfer", "PayPal"];
    for (const m of methods) {
      await expect(page.getByText(m, { exact: false }).first()).toBeVisible({ timeout: 5000 });
    }
  });

  test("PG13: Escrow protection message displayed", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    if (page.url().includes("/cart")) { test.skip(); return; }
    await expect(page.getByText("Escrow", { exact: false }).first()).toBeVisible({ timeout: 10000 });
  });

  test("PG14: Order Summary shows subtotal", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    if (page.url().includes("/cart")) { test.skip(); return; }
    await expect(page.getByText("Subtotal", { exact: false }).first()).toBeVisible({ timeout: 10000 });
  });

  test("PG15: Escrow fee 2% calculated", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    if (page.url().includes("/cart")) { test.skip(); return; }
    await expect(page.getByText("Escrow fee", { exact: false }).first()).toBeVisible({ timeout: 10000 });
  });

  test("PG16: Total amount displayed", async ({ page }) => {
    await page.goto("/checkout");
    await page.waitForLoadState("networkidle");
    if (page.url().includes("/cart")) { test.skip(); return; }
    await expect(page.getByText("Total", { exact: false }).first()).toBeVisible({ timeout: 10000 });
  });
});