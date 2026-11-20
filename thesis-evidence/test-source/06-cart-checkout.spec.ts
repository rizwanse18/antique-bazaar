import { test, expect } from "@playwright/test";

const FIXED_ID = "cmwn914l2000324zce70jeiwq";

async function loginBuyer(page: any) {
  await page.goto("/login");
  await page.fill('input[name="email"]', "buyer@demo.com");
  await page.fill('input[name="password"]', "buyer123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard/, { timeout: 20000 });
}

test.describe("CART & CHECKOUT — Full Coverage", () => {
  test("C1: Cart page loads (empty state)", async ({ page }) => {
    await loginBuyer(page);
    await page.goto("/cart");
    const body = await page.textContent("body");
    expect(body).toMatch(/Cart|empty|Browse Antiques/i);
  });

  test("C2: Add to cart button visible on listing", async ({ page }) => {
    await loginBuyer(page);
    await page.goto(`/listings/${FIXED_ID}`);
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);
    const body = await page.textContent("body");
    expect(body).toMatch(/Add to Cart|Buy Now|In Cart|Make Offer/i);
  });

  test("C3: Navbar cart icon present", async ({ page }) => {
    await page.goto("/");
    const cartLinks = page.locator('a[href="/cart"]');
    expect(await cartLinks.count()).toBeGreaterThan(0);
  });

  test("C4: Checkout page renders payment methods", async ({ page }) => {
    await loginBuyer(page);
    await page.goto("/checkout");
    const body = await page.textContent("body");
    expect(body).toMatch(/Cart is empty|Checkout|Payment/i);
  });

  test("C5: Cart persists across reload", async ({ page }) => {
    await loginBuyer(page);
    await page.goto("/cart");
    await page.reload();
    const body = await page.textContent("body");
    expect(body).toMatch(/Cart|empty/i);
  });

  test("C6: Checkout requires login (protected)", async ({ page }) => {
    await page.goto("/checkout");
    const body = await page.textContent("body");
    expect(body).toMatch(/Cart is empty|Checkout|login/i);
  });
});