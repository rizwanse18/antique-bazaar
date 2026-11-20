import { test, expect } from "@playwright/test";

test.describe("Complaints", () => {
  test("Contact page shows complaint form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("text=Submit a Complaint")).toBeVisible();
    await expect(page.locator('input[name="subject"]')).toBeVisible();
  });

  test("Complaint form requires login", async ({ page }) => {
    await page.goto("/contact");
    await page.fill('input[name="subject"]', "Test complaint");
    await page.selectOption('select[name="category"]', "OTHER");
    await page.fill('textarea[name="description"]', "This is a test complaint description.");
    await page.click('button:has-text("Submit Complaint")');
    // Should show login required message
    await expect(page.locator("text=login").or(page.locator("text=Login"))).toBeVisible({ timeout: 5000 });
  });
});