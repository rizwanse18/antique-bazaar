import { test, expect } from "@playwright/test";

test.describe("AUTH — Full Coverage", () => {
  test("A1: Login page renders all elements", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: /Welcome Back/i })).toBeVisible({ timeout: 15000 });
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    const body = await page.textContent("body");
    expect(body).toMatch(/Sign up|Don't have an account/i);
  });

  test("A2: Admin login redirects to dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@antique.com");
    await page.fill('input[name="password"]', "admin123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 20000 });
    await expect(page).toHaveURL(/dashboard/);
  });

  test("A3: Seller login works", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "seller@demo.com");
    await page.fill('input[name="password"]', "seller123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 20000 });
  });

  test("A4: Buyer login works", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "buyer@demo.com");
    await page.fill('input[name="password"]', "buyer123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 20000 });
  });

  test("A5: Wrong password shows error", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@antique.com");
    await page.fill('input[name="password"]', "wrongpass");
    await page.click('button[type="submit"]');
    const body = await page.textContent("body");
    expect(body).toMatch(/Invalid email or password|error|incorrect/i);
  });

  test("A6: Empty fields blocked by validation", async ({ page }) => {
    await page.goto("/login");
    await page.click('button[type="submit"]');
    const emailInput = page.locator('input[name="email"]');
    const valid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(valid).toBe(false);
  });

  test("A7: Signup page renders", async ({ page }) => {
    await page.goto("/signup");
    await expect(page.getByRole("heading", { name: /Create Account/i })).toBeVisible({ timeout: 15000 });
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test("A8: Session persists after page reload", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@antique.com");
    await page.fill('input[name="password"]', "admin123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 20000 });
    await page.reload();
    await expect(page).toHaveURL(/dashboard/);
  });
});