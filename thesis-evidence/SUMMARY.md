# Antique Item Marketplace — Test Report

**Date:** 2026-11-19 20:55:45
**Framework:** Playwright 1.65.1 | Chromium
**Total Tests:** 95 | **Passed:** 95 | **Failed:** 0
**Duration:** ~4 minutes

## Test Coverage

| # | File | Tests | Area |
|---|---|---|---|
| 01 | auth-full.spec.ts | 8 | Login, signup, roles, session |
| 02 | homepage.spec.ts | 6 | Hero, search, categories, footer |
| 03 | listings.spec.ts | 8 | Cards, filters, URL params |
| 04 | listing-detail.spec.ts | 7 | Gallery, wishlist, add-to-cart, 404 |
| 05 | wishlist.spec.ts | 4 | Page, guard, toggle, empty |
| 06 | cart-checkout.spec.ts | 6 | Cart, add, checkout, persist |
| 07 | auction-bidding.spec.ts | 5 | Countdown, bid panel, history |
| 08 | orders.spec.ts | 3 | Buyer order view |
| 09 | seller-dashboard.spec.ts | 5 | Stats, listings, guard |
| 10 | admin-panel.spec.ts | 8 | Dashboard, products, users, complaints |
| 11 | complaints.spec.ts | 5 | Form, my complaints, admin |
| 12 | reviews.spec.ts | 4 | Review section, star, API |
| 13 | public-pages.spec.ts | 7 | About, contact, help, 404, robots |
| 14 | responsive.spec.ts | 5 | Mobile, tablet, desktop |
| 15 | seo-meta.spec.ts | 5 | Title, meta, sitemap, robots |
| 16 | payment-deep.spec.ts | 12 | 6 payment methods, escrow, orders |

## Test Accounts
- Admin: admin@antique.com / admin123
- Seller: seller@demo.com / seller123
- Buyer: buyer@demo.com / buyer123

## Files Included
- index.html — interactive report
- playwright-results.json — raw JSON
- playwright-results.xml — JUnit XML
- test-source/ — 16 .spec.ts files
- screenshots/ — failures only (empty = all pass)