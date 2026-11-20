import { test, expect } from "@playwright/test";

async function loginSeller(page: any) {
  await page.goto("/login");
  await page.fill('input[name="email"]', "seller@demo.com");
  await page.fill('input[name="password"]', "seller123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard/, { timeout: 20000 });
}

test.describe("SELLER DASHBOARD — Full Coverage", () => {
  test("S1: Seller dashboard loads with stats", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/dashboard/seller");
    await page.waitForLoadState("networkidle");
    const bodyText = await page.textContent("body");
    expect(bodyText).toMatch(/Seller Dashboard|Active Listings|Total Revenue/i);
  });

  test("S2: Seller sees own listings table", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/dashboard/seller");
    const bodyText = await page.textContent("body");
    expect(bodyText).toMatch(/Your Listings|Total Listings/i);
  });

  test("S3: New Listing button present", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/dashboard/seller");
    const newBtn = page.getByRole("link", { name: /New Listing/i });
    await expect(newBtn).toBeVisible();
  });

  test("S4: Sell page form renders for seller", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/sell");
    await expect(page.getByRole("heading", { name: /List Your Antique/i })).toBeVisible();
    await expect(page.locator('input[name="title"]')).toBeVisible();
    await expect(page.locator('select[name="category"]')).toBeVisible();
  });

  test("S5: Buyer gets blocked from seller dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "buyer@demo.com");
    await page.fill('input[name="password"]', "buyer123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 20000 });
    await page.goto("/dashboard/seller");
    const bodyText = await page.textContent("body");
    expect(bodyText).toMatch(/Seller Access Required|Buyer account/i);
  });
});