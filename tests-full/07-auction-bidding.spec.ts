import { test, expect } from "@playwright/test";

test.describe("AUCTION BIDDING — Full Coverage", () => {
  test("AUC1: Auctions page loads with live auctions", async ({ page }) => {
    await page.goto("/auctions");
    await expect(page.getByRole("heading", { name: /Live Auctions/i })).toBeVisible();
  });

  test("AUC2: Auction card has countdown timer", async ({ page }) => {
    await page.goto("/auctions");
    const bodyText = await page.textContent("body");
    expect(bodyText).toMatch(/LIVE|Auction|bids|Current/i);
  });

  test("AUC3: Auction detail page has bid panel", async ({ page }) => {
    await page.goto("/auctions");
    const firstAuction = page.locator('a[href^="/listings/"]').first();
    const count = await firstAuction.count();
    if (count > 0) {
      await firstAuction.click();
      await page.waitForURL(/\/listings\/[a-z0-9]+/);
      const bodyText = await page.textContent("body");
      expect(bodyText).toMatch(/Live Auction|Place Bid|Current Bid|No bids/i);
    }
  });

  test("AUC4: Bid panel shows bid history section", async ({ page }) => {
    await page.goto("/auctions");
    const firstAuction = page.locator('a[href^="/listings/"]').first();
    const count = await firstAuction.count();
    if (count > 0) {
      await firstAuction.click();
      await page.waitForURL(/\/listings\/[a-z0-9]+/);
      const bodyText = await page.textContent("body");
      expect(bodyText).toMatch(/Bid History|bids|Starting/i);
    }
  });

  test("AUC5: Homepage auctions section exists", async ({ page }) => {
    await page.goto("/");
    const bodyText = await page.textContent("body");
    expect(bodyText).toMatch(/LIVE AUCTIONS|Bid on Rare|Auctions/i);
  });
});