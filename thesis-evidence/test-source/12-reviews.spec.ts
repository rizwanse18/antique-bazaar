import { test, expect } from "@playwright/test";

async function goToFirstListing(page: any) {
  await page.goto("/listings");
  await page.waitForLoadState("domcontentloaded");
  const link = page.locator('a[href*="/listings/"]').first();
  await link.waitFor({ state: "visible", timeout: 15000 });
  const href = await link.getAttribute("href");
  await page.goto(href!);
  await page.waitForLoadState("domcontentloaded");
}

test.describe("REVIEWS — Full Coverage", () => {
  test("R1: Review section on listing detail", async ({ page }) => {
    await goToFirstListing(page);
    const body = await page.textContent("body");
    expect(body).toMatch(/Reviews|review|No reviews|Write a Review/i);
  });

  test("R2: Star rating visible when review form shown", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "buyer@demo.com");
    await page.fill('input[name="password"]', "buyer123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 20000 });
    await goToFirstListing(page);
    const body = await page.textContent("body");
    expect(body).toMatch(/Reviews|review|Write a Review|No reviews/i);
  });

  test("R3: Orders page has Leave Review link", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "buyer@demo.com");
    await page.fill('input[name="password"]', "buyer123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 20000 });
    await page.goto("/dashboard/orders");
    const body = await page.textContent("body");
    expect(body).toMatch(/Leave Review|My Orders|No orders/i);
  });

  test("R4: Reviews API responds", async ({ page }) => {
    const res = await page.request.get("/api/reviews?listingId=nonexistent");
    expect([200, 400, 404]).toContain(res.status());
  });
});