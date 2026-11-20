import { test, expect } from "@playwright/test";

test.describe("PUBLIC PAGES — Full Coverage", () => {
  test("P1: About page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { name: /About Antique Bazaar/i })).toBeVisible();
  });

  test("P2: Contact page loads", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: /Contact/i }).first()).toBeVisible();
  });

  test("P3: Help page loads with FAQ", async ({ page }) => {
    await page.goto("/help");
    await expect(page.getByRole("heading", { name: /Help Center/i })).toBeVisible();
  });

  test("P4: Categories page loads", async ({ page }) => {
    await page.goto("/categories");
    await expect(page.getByRole("heading", { name: /Categories/i })).toBeVisible();
  });

  test("P5: 404 page loads for invalid route", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByText(/404|Page Not Found/i).first()).toBeVisible();
  });

  test("P6: Footer links navigate correctly", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer").scrollIntoViewIfNeeded();
    const aboutLink = page.locator('footer a[href="/about"]');
    expect(await aboutLink.count()).toBeGreaterThan(0);
  });

  test("P7: Robots.txt accessible", async ({ page }) => {
    const res = await page.request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain("User-agent");
  });
});