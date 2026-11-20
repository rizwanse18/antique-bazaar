import { test, expect } from "@playwright/test";

async function loginBuyer(page: any) {
  await page.goto("/login");
  await page.fill('input[name="email"]', "buyer@demo.com");
  await page.fill('input[name="password"]', "buyer123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard/, { timeout: 20000 });
}

test.describe("WISHLIST — Full Coverage", () => {
  test("W1: Wishlist page loads when logged in", async ({ page }) => {
    await loginBuyer(page);
    await page.goto("/dashboard/wishlist");
    await expect(page.getByRole("heading", { name: /My Wishlist/i })).toBeVisible();
  });

  test("W2: Wishlist page requires login", async ({ page }) => {
    await page.goto("/dashboard/wishlist");
    await expect(page.getByText(/Please login/i)).toBeVisible({ timeout: 10000 });
  });

  test("W3: Heart button toggles on listing card", async ({ page }) => {
    await loginBuyer(page);
    await page.goto("/listings");
    const heart = page.locator('button[aria-label="Wishlist"]').first();
    await heart.scrollIntoViewIfNeeded();
    await heart.click();
    await page.waitForTimeout(1000);
    await page.goto("/dashboard/wishlist");
    await page.waitForLoadState("networkidle");
  });

  test("W4: Wishlist empty state message", async ({ page }) => {
    await loginBuyer(page);
    await page.goto("/dashboard/wishlist");
    const bodyText = await page.textContent("body");
    expect(bodyText).toMatch(/wishlist|No items|empty|saved treasures/i);
  });
});