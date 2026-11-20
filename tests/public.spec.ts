import { test, expect } from "@playwright/test";

test.describe("Public Pages", () => {
  test("About page", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { name: /About Antique Bazaar/i })).toBeVisible({ timeout: 10000 });
  });

  test("Contact page", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("text=Submit a Complaint")).toBeVisible();
  });

  test("Auctions page", async ({ page }) => {
    await page.goto("/auctions");
    await expect(page.getByRole("heading", { name: /Live Auctions/i })).toBeVisible({ timeout: 10000 });
  });

  test("Cart page", async ({ page }) => {
    await page.goto("/cart");
    await expect(page.getByRole("heading", { name: /Shopping Cart/i })).toBeVisible({ timeout: 10000 });
  });
});