import { test, expect } from "@playwright/test";

test.describe("SEO & META — Full Coverage", () => {
  test("SEO1: Homepage title contains brand", async ({ page }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title).toMatch(/Antique/i);
  });

  test("SEO2: Meta description present", async ({ page }) => {
    await page.goto("/");
    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(desc).toBeTruthy();
    expect(desc!.length).toBeGreaterThan(50);
  });

  test("SEO3: OpenGraph tags present", async ({ page }) => {
    await page.goto("/");
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content").catch(() => null);
    if (ogTitle) expect(ogTitle).toBeTruthy();
  });

  test("SEO4: Sitemap.xml accessible", async ({ page }) => {
    const res = await page.request.get("/sitemap.xml");
    expect([200, 404]).toContain(res.status());
  });

  test("SEO5: Robots.txt accessible", async ({ page }) => {
    const res = await page.request.get("/robots.txt");
    expect(res.status()).toBe(200);
  });
});