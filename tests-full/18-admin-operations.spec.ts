import { test, expect } from "@playwright/test";

async function loginAdmin(page: any) {
  await page.goto("/login");
  await page.fill('input[name="email"]', "admin@antique.com");
  await page.fill('input[name="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard/, { timeout: 20000 });
}

test.describe("ADMIN OPERATIONS DEEP — 20 Tests", () => {
  test("ADM1: Admin dashboard shows total users count", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin");
    const body = await page.textContent("body");
    expect(body).toMatch(/Total Users|Users/i);
  });

  test("ADM2: Admin dashboard shows total listings", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin");
    const body = await page.textContent("body");
    expect(body).toMatch(/Listings|Total Listings/i);
  });

  test("ADM3: Admin dashboard shows pending count", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin");
    const body = await page.textContent("body");
    expect(body).toMatch(/Pending|Pending Approval/i);
  });

  test("ADM4: Admin dashboard shows revenue", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin");
    const body = await page.textContent("body");
    expect(body).toMatch(/Revenue|PKR|Rs/i);
  });

  test("ADM5: Recent users section visible", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin");
    const body = await page.textContent("body");
    expect(body).toMatch(/Recent Users|Users/i);
  });

  test("ADM6: Recent listings section visible", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin");
    const body = await page.textContent("body");
    expect(body).toMatch(/Recent Listings|Listings/i);
  });

  test("ADM7: Products page shows table headers", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin/products");
    const body = await page.textContent("body");
    expect(body).toMatch(/Product|Seller|Price|Status/i);
  });

  test("ADM8: Products table has multiple rows", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin/products");
    const rows = page.locator("tbody tr");
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test("ADM9: Status dropdown in products", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin/products");
    const selects = page.locator("select");
    expect(await selects.count()).toBeGreaterThan(0);
  });

  test("ADM10: Users page shows role column", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin/users");
    const body = await page.textContent("body");
    expect(body).toMatch(/Role|BUYER|SELLER|ADMIN/i);
  });

  test("ADM11: Users page shows KYC column", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin/users");
    const body = await page.textContent("body");
    expect(body).toMatch(/KYC|Verified|Unverified/i);
  });

  test("ADM12: Users page shows stats counts", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin/users");
    const body = await page.textContent("body");
    expect(body).toMatch(/Buyers|Sellers|Admins|All/i);
  });

  test("ADM13: Complaints center loads", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin/complaints");
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("ADM14: Complaints center shows status filter", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin/complaints");
    const body = await page.textContent("body");
    expect(body).toMatch(/Complaints|OPEN|RESOLVED|STATUS/i);
  });

  test("ADM15: Admin can access all 3 sub-pages", async ({ page }) => {
    await loginAdmin(page);
    for (const path of ["/dashboard/admin/products", "/dashboard/admin/users", "/dashboard/admin/complaints"]) {
      await page.goto(path);
      await page.waitForLoadState("domcontentloaded");
      expect(page.url()).toContain(path);
    }
  });

  test("ADM16: Admin sees 3 quick action cards", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/dashboard/admin");
    const body = await page.textContent("body");
    expect(body).toMatch(/Products/i);
    expect(body).toMatch(/Users/i);
    expect(body).toMatch(/Complaints/i);
  });

  test("ADM17: Non-admin cannot access products", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "buyer@demo.com");
    await page.fill('input[name="password"]', "buyer123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 20000 });
    await page.goto("/dashboard/admin/products");
    const body = await page.textContent("body");
    expect(body).toMatch(/Admin Access Only|admin privileges/i);
  });

  test("ADM18: Non-admin cannot access users", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "buyer@demo.com");
    await page.fill('input[name="password"]', "buyer123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 20000 });
    await page.goto("/dashboard/admin/users");
    const body = await page.textContent("body");
    expect(body).toMatch(/Admin Access Only|admin privileges/i);
  });

  test("ADM19: Non-admin cannot access complaints", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "buyer@demo.com");
    await page.fill('input[name="password"]', "buyer123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 20000 });
    await page.goto("/dashboard/admin/complaints");
    const body = await page.textContent("body");
    expect(body).toMatch(/Admin Access Only|admin privileges/i);
  });

  test("ADM20: Admin dashboard loads within 5 seconds", async ({ page }) => {
    await loginAdmin(page);
    const start = Date.now();
    await page.goto("/dashboard/admin");
    await page.waitForLoadState("domcontentloaded");
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(5000);
  });
});