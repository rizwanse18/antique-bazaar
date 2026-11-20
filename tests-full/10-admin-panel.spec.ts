import { test, expect } from "@playwright/test";

async function loginAdmin(page: any) {
  await page.goto("/login");
  await page.fill('input[name="email"]', "admin@antique.com");
  await page.fill('input[name="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard/, { timeout: 20000 });
}

test.describe("ADMIN PANEL — Full Coverage", () => {
  test("AD1: Admin dashboard shows stats", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin");
    const bodyText = await page.textContent("body");
    expect(bodyText).toMatch(/Admin Panel|Total Users|Total Listings/i);
  });

  test("AD2: Quick action cards visible", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin");
    await expect(page.getByText(/Products/i).first()).toBeVisible();
    await expect(page.getByText(/Users/i).first()).toBeVisible();
    await expect(page.getByText(/Complaints/i).first()).toBeVisible();
  });

  test("AD3: Products page shows table", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin/products");
    await expect(page.getByRole("heading", { name: /Manage Products/i })).toBeVisible();
    await expect(page.locator("table")).toBeVisible();
  });

  test("AD4: Users page shows table", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin/users");
    await expect(page.getByRole("heading", { name: /Manage Users/i })).toBeVisible();
    await expect(page.locator("table")).toBeVisible();
  });

  test("AD5: Complaints page loads", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin/complaints");
    await expect(page.getByRole("heading", { name: /Complaints Center/i })).toBeVisible();
  });

  test("AD6: Non-admin blocked from admin panel", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "buyer@demo.com");
    await page.fill('input[name="password"]', "buyer123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 20000 });
    await page.goto("/dashboard/admin");
    const bodyText = await page.textContent("body");
    expect(bodyText).toMatch(/Admin Access Only|admin privileges/i);
  });

  test("AD7: Product status dropdown present", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin/products");
    const selects = page.locator("select");
    expect(await selects.count()).toBeGreaterThan(0);
  });

  test("AD8: User role dropdown present", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin/users");
    const selects = page.locator("select");
    expect(await selects.count()).toBeGreaterThan(0);
  });
});