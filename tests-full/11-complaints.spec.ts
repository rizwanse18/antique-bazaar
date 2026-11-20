import { test, expect } from "@playwright/test";

async function loginBuyer(page: any) {
  await page.goto("/login");
  await page.fill('input[name="email"]', "buyer@demo.com");
  await page.fill('input[name="password"]', "buyer123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard/, { timeout: 20000 });
}

test.describe("COMPLAINTS — Full Coverage", () => {
  test("CM1: Contact page shows complaint form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: /Submit a Complaint/i })).toBeVisible();
    await expect(page.locator('input[name="subject"]')).toBeVisible();
    await expect(page.locator('select[name="category"]')).toBeVisible();
    await expect(page.locator('textarea[name="description"]')).toBeVisible();
  });

  test("CM2: Contact page shows all contact methods", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByText(/antiqueitemmarketplace@gmail.com/i).first()).toBeVisible();
    await expect(page.getByText(/0347.*9182632/i).first()).toBeVisible();
    await expect(page.getByText(/Peshawar/i).first()).toBeVisible();
  });

  test("CM3: My Complaints page requires login", async ({ page }) => {
    await page.goto("/dashboard/complaints");
    await expect(page.getByText(/Please login/i)).toBeVisible({ timeout: 10000 });
  });

  test("CM4: My Complaints page loads when logged in", async ({ page }) => {
    await loginBuyer(page);
    await page.goto("/dashboard/complaints");
    await expect(page.getByRole("heading", { name: /My Complaints/i })).toBeVisible();
  });

  test("CM5: Admin complaints page shows all complaints", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@antique.com");
    await page.fill('input[name="password"]', "admin123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 20000 });
    await page.goto("/dashboard/admin/complaints");
    await expect(page.getByRole("heading", { name: /Complaints Center/i })).toBeVisible();
  });
});