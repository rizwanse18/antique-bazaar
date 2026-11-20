import { test, expect } from "@playwright/test";

async function loginSeller(page: any) {
  await page.goto("/login");
  await page.fill('input[name="email"]', "seller@demo.com");
  await page.fill('input[name="password"]', "seller123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard/, { timeout: 20000 });
}

test.describe("SELLER & LISTINGS DEEP — 20 Tests", () => {
  test("SL1: Seller dashboard shows active listings count", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/dashboard/seller");
    await page.waitForLoadState("domcontentloaded");
    const body = await page.textContent("body");
    expect(body).toMatch(/Active Listings|Active/i);
  });

  test("SL2: Seller dashboard shows total revenue", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/dashboard/seller");
    await page.waitForLoadState("domcontentloaded");
    const body = await page.textContent("body");
    expect(body).toMatch(/Total Revenue|Revenue/i);
  });

  test("SL3: Seller dashboard shows total views", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/dashboard/seller");
    await page.waitForLoadState("domcontentloaded");
    const body = await page.textContent("body");
    expect(body).toMatch(/Total Views|Views/i);
  });

  test("SL4: Seller dashboard shows total bids", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/dashboard/seller");
    await page.waitForLoadState("domcontentloaded");
    const body = await page.textContent("body");
    expect(body).toMatch(/Total Bids|Bids/i);
  });

  test("SL5: Seller sees own listings in table", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/dashboard/seller");
    await page.waitForLoadState("domcontentloaded");
    const body = await page.textContent("body");
    expect(body).toMatch(/Your Listings|Listings/i);
  });

  test("SL6: New Listing button present", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/dashboard/seller");
    await page.waitForLoadState("domcontentloaded");
    const newBtn = page.locator('a:has-text("New Listing")').first();
    expect(await newBtn.count()).toBeGreaterThan(0);
  });

  test("SL7: Sell page has all form fields", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/sell");
    await page.waitForLoadState("domcontentloaded");
    expect(await page.locator('input[name="title"]').count()).toBeGreaterThan(0);
    expect(await page.locator('select[name="category"]').count()).toBeGreaterThan(0);
    expect(await page.locator('textarea[name="description"]').count()).toBeGreaterThan(0);
  });

  test("SL8: Sell page has image URL input", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/sell");
    await page.waitForLoadState("domcontentloaded");
    const body = await page.textContent("body");
    expect(body).toMatch(/Image|image/i);
  });

  test("SL9: Sell page has sale type dropdown", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/sell");
    await page.waitForLoadState("domcontentloaded");
    const selects = page.locator("select");
    expect(await selects.count()).toBeGreaterThan(0);
  });

  test("SL10: Sell page has price input", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/sell");
    await page.waitForLoadState("domcontentloaded");
    expect(await page.locator('input[type="number"]').count()).toBeGreaterThan(0);
  });

  test("SL11: Sell page has condition dropdown", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/sell");
    await page.waitForLoadState("domcontentloaded");
    const body = await page.textContent("body");
    expect(body).toMatch(/Condition/i);
  });

  test("SL12: Sell page has rarity dropdown", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/sell");
    await page.waitForLoadState("domcontentloaded");
    const body = await page.textContent("body");
    expect(body).toMatch(/Rarity/i);
  });

  test("SL13: Sell page has provenance field", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/sell");
    await page.waitForLoadState("domcontentloaded");
    const body = await page.textContent("body");
    expect(body).toMatch(/Provenance|provenance/i);
  });

  test("SL14: Sell page has legal confirmation checkbox", async ({ page }) => {
    await loginSeller(page);
    await page.goto("/sell");
    await page.waitForLoadState("domcontentloaded");
    const checkboxes = page.locator('input[type="checkbox"]');
    expect(await checkboxes.count()).toBeGreaterThan(0);
  });

  test("SL15: Buyer blocked from seller dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "buyer@demo.com");
    await page.fill('input[name="password"]', "buyer123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 20000 });
    await page.goto("/dashboard/seller");
    const body = await page.textContent("body");
    expect(body).toMatch(/Seller Access Required|Buyer account/i);
  });

  test("SL16: Listing cards show rarity badge", async ({ page }) => {
    await page.goto("/listings");
    await page.waitForLoadState("domcontentloaded");
    const body = await page.textContent("body");
    expect(body).toMatch(/Rare|Museum-grade|Common|Very Rare/i);
  });

  test("SL17: Listing cards show seller name", async ({ page }) => {
    await page.goto("/listings");
    await page.waitForLoadState("domcontentloaded");
    const body = await page.textContent("body");
    expect(body).toMatch(/Heritage House|seller/i);
  });

  test("SL18: Listings page count display", async ({ page }) => {
    await page.goto("/listings");
    await page.waitForLoadState("domcontentloaded");
    const body = await page.textContent("body");
    expect(body).toMatch(/treasures available|items/i);
  });

  test("SL19: Listing detail shows era info", async ({ page }) => {
    await page.goto("/listings/cmwn914l2000324zce70jeiwq");
    await page.waitForLoadState("domcontentloaded");
    const body = await page.textContent("body");
    expect(body).toMatch(/Mughal|1650|Era/i);
  });

  test("SL20: Listing detail shows condition", async ({ page }) => {
    await page.goto("/listings/cmwn914l2000324zce70jeiwq");
    await page.waitForLoadState("domcontentloaded");
    const body = await page.textContent("body");
    expect(body).toMatch(/Condition|Excellent|Good|Mint/i);
  });
});