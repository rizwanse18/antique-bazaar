# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 16-payment-deep.spec.ts >> PAYMENT & ORDERS — Deep Coverage >> PM1: All 6 payment methods visible on checkout
- Location: tests-full\16-payment-deep.spec.ts:53:3

# Error details

```
Error: expect(received).toMatch(expected)

Expected pattern: /Escrow/i
Received string:  "🏛️ Peshawar, Pakistan — Trusted since 2010Help CenterSell on Antique BazaarAntique BazaarTimeless TreasuresBrowseAuctionsSell Item Dashboard LogoutCart is emptyBrowse AntiquesAntique BazaarThe world's most trusted marketplace for authentic antiques, rare collectibles, and timeless treasures.MarketplaceBrowse AllLive AuctionsSell an ItemCategoriesAbout UsSupportHelp CenterContact UsBuyer ProtectionShipping InfoAuthenticationContact Peshawar, Pakistan 0347 9182632 antiqueitemmarketplace@gmail.com© 2025 Antique Bazaar. All rights reserved.PrivacyTermsCookiesself.__next_r=\"EHRFX9lJepRcBURZBFeHt\";var __nextHmrInitialVersion=\"0\";(self.__next_f=self.__next_f||[]).push([0])self.__next_f.push([1,\"7:\\\"[project]/node_modules/next/dist/client/components/layout-router.js [app-client] (ecmascript)\\\"\\n8:\\\"/_next/static/chunks/node_modules_08wda7qma1b_2._.js\\\"\\n9:\\\"/_next/static/chunks/src_142h1ytu0owb_._.js\\\"\\na:\\\"LoadingBoundaryProvider\\\"\\nb:I[\\\"$7\\\",[\\\"$8\\\",\\\"$9\\\"],\\\"$a\\\"]\\nd:\\\"[project]/node_modules/next/dist/next-devtools/userspace/app/segment-explorer-node.js [app-client] (ecmascript)\\\"\\ne:I[\\\"$d\\\",[\\\"$8\\\",\\\"$9\\\"],\\\"SegmentViewNode\\\"]\\n36:\\\"$Sreact.fragment\\\"\\n4b:\\\"[project]/node_modules/next-auth/react.js [app-client] (ecmascript)\\\"\\n4c:I[\\\"$4b\\\",[\\\"$8\\\",\\\"$9\\\"],\\\"SessionProvider\\\"]\\n4e:\\\"[project]/src/components/layout/Navbar.tsx [app-client] (ecmascript)\\\"\\n4f:I[\\\"$4e\\\",[\\\"$8\\\",\\\"$9\\\"],\\\"default\\\"]\\n52:I[\\\"$7\\\",[\\\"$8\\\",\\\"$9\\\"],\\\"default\\\"]\\n53:\\\"[project]/src/app/error.tsx [app-client] (ecmascript)\\\"\\n54:\\\"/_next/static/chunks/_0bsiqlj7n8p77._.js\\\"\\n55:I[\\\"$53\\\",[\\\"$8\\\",\\\"$9\\\",\\\"$54\\\"],\\\"default\\\"]\\n59:\\\"[project]/node_modules/next/dist/client/components/render-from-template-context.js [app-client] (ecmascript)\\\"\\n5a:I[\\\"$59\\\",[\\\"$8\\\",\\\"$9\\\"],\\\"default\\\"]\\n69:\\\"$Sreact.forward_ref\\\"\\n70:\\\"[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)\\\"\\n71:I[\\\"$70\\\",[\\\"$8\\\",\\\"$9\\\"],\\\"\\\"]\\n77:\\\"[project]/node_modules/lucide-react/dist/esm/Icon.mjs [app-client] (ecmascript)\\\"\\n78:I[\\\"$77\\\",[\\\"$8\\\",\\\"$9\\\"],\\\"default\\\"]\\n7c:\\\"$Sreact.forward_ref\\\"\\nfa:\\\"[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)\\\"\\nfb:I[\\\"$fa\\\",[\\\"$8\\\",\\\"$9\\\"],\\\"Toaster\\\"]\\n105:\\\"[project]/node_modules/next/dist/client/components/client-page.js [app-client] (ecmascript)\\\"\\n106:I[\\\"$105\\\",[\\\"$8\\\",\\\"$9\\\"],\\\"ClientPageRoot\\\"]\\n107:\\\"[project]/src/app/checkout/page.tsx [app-client] (ecmascript)\\\"\\n108:\\\"/_next/static/chunks/node_modules_0tnd8b8lgm5n_._.js\\\"\\n109:\\\"/_next/static/chunks/src_1crq2ty9_yq1z._.js\\\"\\n10a:I[\\\"$107\\\",[\\\"$8\\\",\\\"$9\\\",\\\"$108\\\",\\\"$109\\\"],\\\"default\\\"]\\n113:\\\"[project]/node_modules/next/dist/lib/framework/boundary-components.js [app-client] (ecmascript)\\\"\\n114:I[\\\"$113\\\",[\\\"$8\\\",\\\"$9\\\"],\\\"OutletBoundary\\\"]\\n116:\\\"$Sreact.suspense\\\"\\n123:\\\"ViewportBoundary\\\"\\n124:I[\\\"$113\\\",[\\\"$8\\\",\\\"$9\\\"],\\\"$123\\\"]\\n12d:\\\"MetadataBoundary\\\"\\n12e:I[\\\"$113\\\",[\\\"$8\\\",\\\"$9\\\"],\\\"$12d\\\"]\\n139:\\\"[project]/node_modules/next/dist/client/components/builtin/global-error.js [app-client] (ecmascript)\\\"\\n13a:I[\\\"$139\\\",[\\\"$8\\\",\\\"$9\\\"],\\\"default\\\",1]\\n:HL[\\\"/_next/static/chunks/src_app_globals_162hn9oqc8uss.css\\\",\\\"style\\\"]\\n:HL[\\\"https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900\\u0026family=Inter:wght@300;400;500;600;700\\u0026display=swap\\\",\\\"style\\\"]\\n1:D\\\"$4\\\"\\n1:D\\\"$2\\\"\\n1:D\\\"$5\\\"\\n1:null\\nf:D\\\"$11\\\"\\nf:D\\\"$10\\\"\\nf:D\\\"$13\\\"\\nf:[\\\"$\\\",\\\"div\\\",\\\"l\\\",{\\\"children\\\":[[\\\"$\\\",\\\"section\\\",null,{\\\"className\\\":\\\"bg-antique-900 py-24\\\",\\\"children\\\":[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"container mx-auto px-4\\\",\\\"children\\\":[[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-8 w-64 skeleton rounded mb-6\\\"},\\\"$10\\\",\\\"$16\\\",1],[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-16 w-full max-w-2xl skeleton rounded mb-4\\\"},\\\"$10\\\",\\\"$17\\\",1],[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-6 w-96 skeleton rounded mb-8\\\"},\\\"$10\\\",\\\"$18\\\",1]]},\\\"$10\\\",\\\"$15\\\",1]},\\\"$10\\\",\\\"$14\\\",1],[\\\"$\\\",\\\"section\\\",null,{\\\"className\\\":\\\"py-16\\\",\\\"children\\\":[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"container mx-auto px-4\\\",\\\"children\\\":[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"grid grid-cols-2 md:grid-cols-4 gap-6\\\",\\\"children\\\":[[\\\"$\\\",\\\"div\\\",\\\"0\\\",{\\\"className\\\":\\\"card p-6\\\",\\\"children\\\":[[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-16 w-16 skeleton rounded-full mb-3\\\"},\\\"$10\\\",\\\"$1d\\\",1],[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-4 w-24 skeleton rounded\\\"},\\\"$10\\\",\\\"$1e\\\",1]]},\\\"$10\\\",\\\"$1c\\\",0],[\\\"$\\\",\\\"div\\\",\\\"1\\\",{\\\"className\\\":\\\"card p-6\\\",\\\"children\\\":[[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-16 w-16 skeleton rounded-full mb-3\\\"},\\\"$10\\\",\\\"$20\\\",1],[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-4 w-24 skeleton rounded\\\"},\\\"$10\\\",\\\"$21\\\",1]]},\\\"$10\\\",\\\"$1f\\\",0],[\\\"$\\\",\\\"div\\\",\\\"2\\\",{\\\"className\\\":\\\"card p-6\\\",\\\"children\\\":[[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-16 w-16 skeleton rounded-full mb-3\\\"},\\\"$10\\\",\\\"$23\\\",1],[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-4 w-24 skeleton rounded\\\"},\\\"$10\\\",\\\"$24\\\",1]]},\\\"$10\\\",\\\"$22\\\",0],[\\\"$\\\",\\\"div\\\",\\\"3\\\",{\\\"className\\\":\\\"card p-6\\\",\\\"children\\\":[[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-16 w-16 skeleton rounded-full mb-3\\\"},\\\"$10\\\",\\\"$26\\\",1],[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-4 w-24 skeleton rounded\\\"},\\\"$10\\\",\\\"$27\\\",1]]},\\\"$10\\\",\\\"$25\\\",0],[\\\"$\\\",\\\"div\\\",\\\"4\\\",{\\\"className\\\":\\\"card p-6\\\",\\\"children\\\":[[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-16 w-16 skeleton rounded-full mb-3\\\"},\\\"$10\\\",\\\"$29\\\",1],[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-4 w-24 skeleton rounded\\\"},\\\"$10\\\",\\\"$2a\\\",1]]},\\\"$10\\\",\\\"$28\\\",0],[\\\"$\\\",\\\"div\\\",\\\"5\\\",{\\\"className\\\":\\\"card p-6\\\",\\\"children\\\":[[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-16 w-16 skeleton rounded-full mb-3\\\"},\\\"$10\\\",\\\"$2c\\\",1],[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-4 w-24 skeleton rounded\\\"},\\\"$10\\\",\\\"$2d\\\",1]]},\\\"$10\\\",\\\"$2b\\\",0],[\\\"$\\\",\\\"div\\\",\\\"6\\\",{\\\"className\\\":\\\"card p-6\\\",\\\"children\\\":[[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-16 w-16 skeleton rounded-full mb-3\\\"},\\\"$10\\\",\\\"$2f\\\",1],[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-4 w-24 skeleton rounded\\\"},\\\"$10\\\",\\\"$30\\\",1]]},\\\"$10\\\",\\\"$2e\\\",0],[\\\"$\\\",\\\"div\\\",\\\"7\\\",{\\\"className\\\":\\\"card p-6\\\",\\\"children\\\":[[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-16 w-16 skeleton rounded-full mb-3\\\"},\\\"$10\\\",\\\"$32\\\",1],[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"h-4 w-24 skeleton rounded\\\"},\\\"$10\\\",\\\"$33\\\",1]]},\\\"$10\\\",\\\"$31\\\",0]]},\\\"$10\\\",\\\"$1b\\\",1]},\\\"$10\\\",\\\"$1a\\\",1]},\\\"$10\\\",\\\"$19\\\",1]]},\\\"$10\\\",\\\"$12\\\",1]\\n3a:D\\\"$42\\\"\\n3a:D\\\"$3b\\\"\\n3a:D\\\"$44\\\"\\n5c:D\\\"$5e\\\"\\n5c:D\\\"$5d\\\"\\n5c:D\\\"$60\\\"\\n66:D\\\"$6d\\\"\\n66:D\\\"$67\\\"\\n66:D\\\"$6f\\\"\\n72:D\\\"$74\\\"\\n72:D\\\"$73\\\"\\n72:D\\\"$76\\\"\\n72:[\\\"$\\\",\\\"$L78\\\",null,{\\\"ref\\\":\\\"$undefined\\\",\\\"icon\\\":{\\\"name\\\":\\\"house\\\",\\\"size\\\":24,\\\"node\\\":[[\\\"path\\\",{\\\"d\\\":\\\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\\\",\\\"key\\\":\\\"5wwlr5\\\"}],[\\\"path\\\",{\\\"d\\\":\\\"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\\\",\\\"key\\\":\\\"r6nss1\\\"}]],\\\"aliases\\\":[\\\"home\\\"]},\\\"className\\\":\\\"w-4 h-4\\\"},\\\"$73\\\",\\\"$75\\\",1]\\n66:[\\\"$\\\",\\\"$L71\\\",null,{\\\"href\\\":\\\"/\\\",\\\"className\\\":\\\"btn-primary flex items-center gap-2\\\",\\\"children\\\":[\\\"$72\\\",\\\" Home\\\"]},\\\"$67\\\",\\\"$6e\\\",1]\\n79:D\\\"$80\\\"\\n79:D\\\"$7a\\\"\\n79:D\\\"$82\\\"\\n83:D\\\"$85\\\"\\n83:D\\\"$84\\\"\\n83:D\\\"$87\\\"\\n83:[\\\"$\\\",\\\"$L78\\\",null,{\\\"ref\\\":\\\"$undefined\\\",\\\"icon\\\":{\\\"name\\\":\\\"search\\\",\\\"size\\\":24,\\\"node\\\":[[\\\"path\\\",{\\\"d\\\":\\\"m21 21-4.34-4.34\\\",\\\"key\\\":\\\"14j7rj\\\"}],[\\\"circle\\\",{\\\"cx\\\":\\\"11\\\",\\\"cy\\\":\\\"11\\\",\\\"r\\\":\\\"8\\\",\\\"key\\\":\\\"4ej97u\\\"}]]},\\\"className\\\":\\\"w-4 h-4\\\"},\\\"$84\\\",\\\"$86\\\",1]\\n79:[\\\"$\\\",\\\"$L71\\\",null,{\\\"href\\\":\\\"/listings\\\",\\\"className\\\":\\\"btn-outline flex items-center gap-2\\\",\\\"children\\\":[\\\"$83\\\",\\\" Browse\\\"]},\\\"$7a\\\",\\\"$81\\\",1]\\n5c:[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"min-h-[70vh] flex items-center justify-center px-4\\\",\\\"children\\\":[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"text-center max-w-md\\\",\\\"children\\\":[[\\\"$\\\",\\\"p\\\",null,{\\\"className\\\":\\\"text-8xl font-serif font-bold text-antique-700 mb-4\\\",\\\"children\\\":\\\"404\\\"},\\\"$5d\\\",\\\"$62\\\",1],[\\\"$\\\",\\\"h1\\\",null,{\\\"className\\\":\\\"font-serif text-3xl font-bold mb-3\\\",\\\"children\\\":\\\"Page Not Found\\\"},\\\"$5d\\\",\\\"$63\\\",1],[\\\"$\\\",\\\"p\\\",null,{\\\"className\\\":\\\"text-antique-600 mb-8\\\",\\\"children\\\":\\\"The treasure you're looking for has vanished. Try browsing our collection.\\\"},\\\"$5d\\\",\\\"$64\\\",1],[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"flex gap-3 justify-center\\\",\\\"children\\\":[\\\"$66\\\",\\\"$79\\\"]},\\\"$5d\\\",\\\"$65\\\",1]]},\\\"$5d\\\",\\\"$61\\\",1]},\\\"$5d\\\",\\\"$5f\\\",1]\\n8c:D\\\"$8e\\\"\\n8c:D\\\"$8d\\\"\\n8c:D\\\"$90\\\"\\n96:D\\\"$98\\\"\\n96:D\\\"$97\\\"\\n96:D\\\"$9a\\\"\\n96:[\\\"$\\\",\\\"$L78\\\",null,{\\\"ref\\\":\\\"$undefined\\\",\\\"icon\\\":{\\\"name\\\":\\\"gavel\\\",\\\"size\\\":24,\\\"node\\\":[[\\\"path\\\",{\\\"d\\\":\\\"m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381\\\",\\\"key\\\":\\\"pgg06f\\\"}],[\\\"path\\\",{\\\"d\\\":\\\"m16 16 6-6\\\",\\\"key\\\":\\\"vzrcl6\\\"}],[\\\"path\\\",{\\\"d\\\":\\\"m21.5 10.5-8-8\\\",\\\"key\\\":\\\"a17d9x\\\"}],[\\\"path\\\",{\\\"d\\\":\\\"m8 8 6-6\\\",\\\"key\\\":\\\"18bi4p\\\"}],[\\\"path\\\",{\\\"d\\\":\\\"m8.5 7.5 8 8\\\",\\\"key\\\":\\\"1oyaui\\\"}]]},\\\"className\\\":\\\"w-6 h-6\\\"},\\\"$97\\\",\\\"$99\\\",1]\\n9f:D\\\"$a1\\\"\\n9f:D\\\"$a0\\\"\\n9f:D\\\"$a3\\\"\\n9f:[\\\"$\\\",\\\"$L78\\\",null,{\\\"ref\\\":\\\"$undefined\\\",\\\"icon\\\":{\\\"name\\\":\\\"share-2\\\",\\\"size\\\":24,\\\"node\\\":[[\\\"circle\\\",{\\\"cx\\\":\\\"18\\\",\\\"cy\\\":\\\"5\\\",\\\"r\\\":\\\"3\\\",\\\"key\\\":\\\"gq8acd\\\"}],[\\\"circle\\\",{\\\"cx\\\":\\\"6\\\",\\\"cy\\\":\\\"12\\\",\\\"r\\\":\\\"3\\\",\\\"key\\\":\\\"w7nqdw\\\"}],[\\\"circle\\\",{\\\"cx\\\":\\\"18\\\",\\\"cy\\\":\\\"19\\\",\\\"r\\\":\\\"3\\\",\\\"key\\\":\\\"1xt0gg\\\"}],[\\\"line\\\",{\\\"x1\\\":\\\"8.59\\\",\\\"x2\\\":\\\"15.42\\\",\\\"y1\\\":\\\"13.51\\\",\\\"y2\\\":\\\"17.49\\\",\\\"key\\\":\\\"47mynk\\\"}],[\\\"line\\\",{\\\"x1\\\":\\\"15.41\\\",\\\"x2\\\":\\\"8.59\\\",\\\"y1\\\":\\\"6.51\\\",\\\"y2\\\":\\\"10.49\\\",\\\"key\\\":\\\"1n3mei\\\"}]]},\\\"className\\\":\\\"w-4 h-4\\\"},\\\"$a0\\\",\\\"$a2\\\",1]\\na5:D\\\"$a7\\\"\\na5:D\\\"$a6\\\"\\na5:D\\\"$a9\\\"\\na5:[\\\"$\\\",\\\"$L78\\\",null,{\\\"ref\\\":\\\"$undefined\\\",\\\"icon\\\":\\\"$9f:props:icon\\\",\\\"className\\\":\\\"w-4 h-4\\\"},\\\"$a6\\\",\\\"$a8\\\",1]\\nab:D\\\"$ad\\\"\\nab:D\\\"$ac\\\"\\nab:D\\\"$af\\\"\\nab:[\\\"$\\\",\\\"$L78\\\",null,{\\\"ref\\\":\\\"$undefined\\\",\\\"icon\\\":\\\"$9f:props:icon\\\",\\\"className\\\":\\\"w-4 h-4\\\"},\\\"$ac\\\",\\\"$ae\\\",1]\\nb4:D\\\"$b6\\\"\\nb4:D\\\"$b5\\\"\\nb4:D\\\"$b8\\\"\\nb4:[\\\"$\\\",\\\"$L71\\\",null,{\\\"href\\\":\\\"/listings\\\",\\\"className\\\":\\\"hover:text-gold-400\\\",\\\"children\\\":\\\"Browse All\\\"},\\\"$b5\\\",\\\"$b7\\\",1]\\nba:D\\\"$bc\\\"\\nba:D\\\"$bb\\\"\\nba:D\\\"$be\\\"\\nba:[\\\"$\\\",\\\"$L71\\\",null,{\\\"href\\\":\\\"/auctions\\\",\\\"className\\\":\\\"hover:text-gold-400\\\",\\\"children\\\":\\\"Live Auctions\\\"},\\\"$bb\\\",\\\"$bd\\\",1]\\nc0:D\\\"$c2\\\"\\nc0:D\\\"$c1\\\"\\nc0:D\\\"$c4\\\"\\nc0:[\\\"$\\\",\\\"$L71\\\",null,{\\\"href\\\":\\\"/sell\\\",\\\"className\\\":\\\"hover:text-gold-400\\\",\\\"children\\\":\\\"Sell an Item\\\"},\\\"$c1\\\",\\\"$c3\\\",1]\\nc6:D\\\"$c8\\\"\\nc6:D\\\"$c7\\\"\\nc6:D\\\"$ca\\\"\\nc6:[\\\"$\\\",\\\"$L71\\\",null,{\\\"href\\\":\\\"/categories\\\",\\\"className\\\":\\\"hover:text-gold-400\\\",\\\"children\\\":\\\"Categories\\\"},\\\"$c7\\\",\\\"$c9\\\",1]\\ncc:D\\\"$ce\\\"\\ncc:D\\\"$cd\\\"\\ncc:D\\\"$d0\\\"\\ncc:[\\\"$\\\",\\\"$L71\\\",null,{\\\"href\\\":\\\"/about\\\",\\\"className\\\":\\\"hover:text-gold-400\\\",\\\"children\\\":\\\"About Us\\\"},\\\"$cd\\\",\\\"$cf\\\",1]\\nd5:D\\\"$d7\\\"\\nd5:D\\\"$d6\\\"\\nd5:D\\\"$d9\\\"\\nd5:[\\\"$\\\",\\\"$L71\\\",null,{\\\"href\\\":\\\"/help\\\",\\\"className\\\":\\\"hover:text-gold-400\\\",\\\"children\\\":\\\"Help Center\\\"},\\\"$d6\\\",\\\"$d8\\\",1]\\ndb:D\\\"$dd\\\"\\ndb:D\\\"$dc\\\"\\ndb:D\\\"$df\\\"\\ndb:[\\\"$\\\",\\\"$L71\\\",null,{\\\"href\\\":\\\"/contact\\\",\\\"className\\\":\\\"hover:text-gold-400\\\",\\\"children\\\":\\\"Contact Us\\\"},\\\"$dc\\\",\\\"$de\\\",1]\\ne1:D\\\"$e3\\\"\\ne1:D\\\"$e2\\\"\\ne1:D\\\"$e5\\\"\\ne1:[\\\"$\\\",\\\"$L71\\\",null,{\\\"href\\\":\\\"/help\\\",\\\"className\\\":\\\"hover:text-gold-400\\\",\\\"children\\\":\\\"Buyer Protection\\\"},\\\"$e2\\\",\\\"$e4\\\",1]\\ne7:D\\\"$e9\\\"\\ne7:D\\\"$e8\\\"\\ne7:D\\\"$eb\\\"\\ne7:[\\\"$\\\",\\\"$L71\\\",null,{\\\"href\\\":\\\"/help\\\",\\\"className\\\":\\\"hover:text-gold-400\\\",\\\"children\\\":\\\"Shipping Info\\\"},\\\"$e8\\\",\\\"$ea\\\",1]\\ned:D\\\"$ef\\\"\\ned:D\\\"$ee\\\"\\ned:D\\\"$f1\\\"\\ned:[\\\"$\\\",\\\"$L71\\\",null,{\\\"href\\\":\\\"/help\\\",\\\"className\\\":\\\"hover:text-gold-400\\\",\\\"children\\\":\\\"Authentication\\\"},\\\"$ee\\\",\\\"$f0\\\",1]\\n8c:[\\\"$\\\",\\\"footer\\\",null,{\\\"className\\\":\\\"bg-antique-950 text-cream mt-20\\\",\\\"children\\\":[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"container mx-auto px-4 py-16\\\",\\\"children\\\":[[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10\\\",\\\"children\\\":[[\\\"$\\\",\\\"div\\\",null,{\\\"children\\\":[[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"flex items-center gap-2 mb-4\\\",\\\"children\\\":[[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"w-10 h-10 bg-gradient-to-br from-antique-700 to-gold-500 rounded-lg flex items-center justify-center\\\",\\\"children\\\":\\\"$96\\\"},\\\"$8d\\\",\\\"$95\\\",1],[\\\"$\\\",\\\"h3\\\",null,{\\\"className\\\":\\\"font-serif font-bold text-xl\\\",\\\"children\\\":\\\"Antique Bazaar\\\"},\\\"$8d\\\",\\\"$9b\\\",1]]},\\\"$8d\\\",\\\"$94\\\",1],[\\\"$\\\",\\\"p\\\",null,{\\\"className\\\":\\\"text-antique-300 text-sm mb-4\\\",\\\"children\\\":\\\"The world's most trusted marketplace for authentic antiques, rare collectibles, and timeless treasures.\\\"},\\\"$8d\\\",\\\"$9c\\\",1],[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"flex gap-3\\\",\\\"children\\\":[[\\\"$\\\",\\\"a\\\",null,{\\\"href\\\":\\\"#\\\",\\\"className\\\":\\\"w-9 h-9 bg-antique-900 rounded-full flex items-center justify-center hover:bg-gold-500 transition\\\",\\\"children\\\":\\\"$9f\\\"},\\\"$8d\\\",\\\"$9e\\\",1],[\\\"$\\\",\\\"a\\\",null,{\\\"href\\\":\\\"#\\\",\\\"className\\\":\\\"w-9 h-9 bg-antique-900 rounded-full flex items-center justify-center hover:bg-gold-500 transition\\\",\\\"children\\\":\\\"$a5\\\"},\\\"$8d\\\",\\\"$a4\\\",1],[\\\"$\\\",\\\"a\\\",null,{\\\"href\\\":\\\"#\\\",\\\"className\\\":\\\"w-9 h-9 bg-antique-900 rounded-full flex items-center justify-center hover:bg-gold-500 transition\\\",\\\"children\\\":\\\"$ab\\\"},\\\"$8d\\\",\\\"$aa\\\",1]]},\\\"$8d\\\",\\\"$9d\\\",1]]},\\\"$8d\\\",\\\"$93\\\",1],[\\\"$\\\",\\\"div\\\",null,{\\\"children\\\":[[\\\"$\\\",\\\"h4\\\",null,{\\\"className\\\":\\\"font-serif font-bold text-lg mb-4 text-gold-400\\\",\\\"children\\\":\\\"Marketplace\\\"},\\\"$8d\\\",\\\"$b1\\\",1],[\\\"$\\\",\\\"ul\\\",null,{\\\"className\\\":\\\"space-y-2 text-sm text-antique-300\\\",\\\"children\\\":[[\\\"$\\\",\\\"li\\\",null,{\\\"children\\\":\\\"$b4\\\"},\\\"$8d\\\",\\\"$b3\\\",1],[\\\"$\\\",\\\"li\\\",null,{\\\"children\\\":\\\"$ba\\\"},\\\"$8d\\\",\\\"$b9\\\",1],[\\\"$\\\",\\\"li\\\",null,{\\\"children\\\":\\\"$c0\\\"},\\\"$8d\\\",\\\"$bf\\\",1],[\\\"$\\\",\\\"li\\\",null,{\\\"children\\\":\\\"$c6\\\"},\\\"$8d\\\",\\\"$c5\\\",1],[\\\"$\\\",\\\"li\\\",null,{\\\"children\\\":\\\"$cc\\\"},\\\"$8d\\\",\\\"$cb\\\",1]]},\\\"$8d\\\",\\\"$b2\\\",1]]},\\\"$8d\\\",\\\"$b0\\\",1],[\\\"$\\\",\\\"div\\\",null,{\\\"children\\\":[[\\\"$\\\",\\\"h4\\\",null,{\\\"className\\\":\\\"font-serif font-bold text-lg mb-4 text-gold-400\\\",\\\"children\\\":\\\"Support\\\"},\\\"$8d\\\",\\\"$d2\\\",1],[\\\"$\\\",\\\"ul\\\",null,{\\\"className\\\":\\\"space-y-2 text-sm text-antique-300\\\",\\\"children\\\":[[\\\"$\\\",\\\"li\\\",null,{\\\"children\\\":\\\"$d5\\\"},\\\"$8d\\\",\\\"$d4\\\",1],[\\\"$\\\",\\\"li\\\",null,{\\\"children\\\":\\\"$db\\\"},\\\"$8d\\\",\\\"$da\\\",1],[\\\"$\\\",\\\"li\\\",null,{\\\"children\\\":\\\"$e1\\\"},\\\"$8d\\\",\\\"$e0\\\",1],[\\\"$\\\",\\\"li\\\",null,{\\\"children\\\":\\\"$e7\\\"},\\\"$8d\\\",\\\"$e6\\\",1],[\\\"$\\\",\\\"li\\\",null,{\\\"children\\\":\\\"$ed\\\"},\\\"$8d\\\",\\\"$ec\\\",1]]},\\\"$8d\\\",\\\"$d3\\\",1]]},\\\"$8d\\\",\\\"$d1\\\",1],[\\\"$\\\",\\\"div\\\",null,{\\\"children\\\":[[\\\"$\\\",\\\"h4\\\",null,{\\\"className\\\":\\\"font-serif font-bold text-lg mb-4 text-gold-400\\\",\\\"children\\\":\\\"Contact\\\"},\\\"$8d\\\",\\\"$f3\\\",1],[\\\"$\\\",\\\"ul\\\",null,{\\\"className\\\":\\\"space-y-3 text-sm text-antique-300\\\",\\\"children\\\":[\\\"$Lf5\\\",\\\"$Lf6\\\",\\\"$Lf7\\\"]},\\\"$8d\\\",\\\"$f4\\\",1]]},\\\"$8d\\\",\\\"$f2\\\",1]]},\\\"$8d\\\",\\\"$92\\\",1],\\\"$Lf8\\\"]},\\\"$8d\\\",\\\"$91\\\",1]},\\\"$8d\\\",\\\"$8f\\\",1]\\n3a:[\\\"$\\\",\\\"html\\\",null,{\\\"lang\\\":\\\"en\\\",\\\"suppressHydrationWarning\\\":true,\\\"children\\\":[[\\\"$\\\",\\\"head\\\",null,{\\\"children\\\":[[\\\"$\\\",\\\"link\\\",null,{\\\"rel\\\":\\\"preconnect\\\",\\\"href\\\":\\\"https://fonts.googleapis.com\\\"},\\\"$3b\\\",\\\"$46\\\",1],[\\\"$\\\",\\\"link\\\",null,{\\\"rel\\\":\\\"preconnect\\\",\\\"href\\\":\\\"https://fonts.gstatic.com\\\",\\\"crossOrigin\\\":\\\"anonymous\\\"},\\\"$3b\\\",\\\"$47\\\",1],[\\\"$\\\",\\\"link\\\",null,{\\\"href\\\":\\\"https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900\\u0026family=Inter:wght@300;400;500;600;700\\u0026display=swap\\\",\\\"rel\\\":\\\"stylesheet\\\"},\\\"$3b\\\",\\\"$48\\\",1]]},\\\"$3b\\\",\\\"$45\\\",1],[\\\"$\\\",\\\"body\\\",null,{\\\"className\\\":\\\"min-h-screen flex flex-col bg-cream\\\",\\\"children\\\":[[\\\"$\\\",\\\"$L4c\\\",null,{\\\"children\\\":[[\\\"$\\\",\\\"$L4f\\\",null,{},\\\"$3b\\\",\\\"$4d\\\",1],[\\\"$\\\",\\\"main\\\",null,{\\\"className\\\":\\\"flex-1\\\",\\\"children\\\":[\\\"$\\\",\\\"$L52\\\",null,{\\\"parallelRouterKey\\\":\\\"children\\\",\\\"error\\\":\\\"$55\\\",\\\"errorStyles\\\":[\\\"$\\\",\\\"$Le\\\",null,{\\\"type\\\":\\\"error\\\",\\\"pagePath\\\":\\\"error.tsx\\\",\\\"children\\\":[]},null,\\\"$56\\\",0],\\\"errorScripts\\\":[[\\\"$\\\",\\\"script\\\",\\\"script-0\\\",{\\\"src\\\":\\\"/_next/static/chunks/_0bsiqlj7n8p77._.js\\\",\\\"async\\\":true,\\\"nonce\\\":\\\"$undefined\\\"},null,\\\"$57\\\",0]],\\\"template\\\":[\\\"$\\\",\\\"$L5a\\\",null,{},null,\\\"$58\\\",1],\\\"templateStyles\\\":\\\"$undefined\\\",\\\"templateScripts\\\":\\\"$undefined\\\",\\\"notFound\\\":[\\\"$\\\",\\\"$Le\\\",\\\"c-not-found\\\",{\\\"type\\\":\\\"not-found\\\",\\\"pagePath\\\":\\\"not-found.tsx\\\",\\\"children\\\":[\\\"$5c\\\",[]]},null,\\\"$5b\\\",0],\\\"forbidden\\\":\\\"$undefined\\\",\\\"unauthorized\\\":\\\"$undefined\\\",\\\"segmentViewBoundaries\\\":[[\\\"$\\\",\\\"$Le\\\",null,{\\\"type\\\":\\\"boundary:not-found\\\",\\\"pagePath\\\":\\\"not-found.tsx@boundary\\\"},null,\\\"$88\\\",1],[\\\"$\\\",\\\"$Le\\\",null,{\\\"type\\\":\\\"boundary:loading\\\",\\\"pagePath\\\":\\\"loading.tsx@boundary\\\"},null,\\\"$89\\\",1],[\\\"$\\\",\\\"$Le\\\",null,{\\\"type\\\":\\\"boundary:error\\\",\\\"pagePath\\\":\\\"error.tsx@boundary\\\"},null,\\\"$8a\\\",1],[\\\"$\\\",\\\"$Le\\\",null,{\\\"type\\\":\\\"boundary:global-error\\\",\\\"pagePath\\\":\\\"__next_builtin__global-error.js\\\"},null,\\\"$8b\\\",1]]},null,\\\"$51\\\",1]},\\\"$3b\\\",\\\"$50\\\",1],\\\"$8c\\\"]},\\\"$3b\\\",\\\"$4a\\\",1],[\\\"$\\\",\\\"$Lfb\\\",null,{\\\"position\\\":\\\"top-right\\\"},\\\"$3b\\\",\\\"$f9\\\",1]]},\\\"$3b\\\",\\\"$49\\\",1]]},\\\"$3b\\\",\\\"$43\\\",1]\\n100:X\\n10d:D\\\"$110\\\"\\n10d:D\\\"$10e\\\"\\n10d:D\\\"$112\\\"\\n10d:[\\\"$\\\",\\\"$L114\\\",null,{\\\"children\\\":[\\\"$\\\",\\\"$116\\\",null,{\\\"name\\\":\\\"Next.MetadataOutlet\\\",\\\"children\\\":\\\"$@117\\\"},\\\"$10e\\\",\\\"$115\\\",1]},\\\"$10e\\\",\\\"$111\\\",1]\\n101:[[\\\"children\\\",{\\\"s\\\":\\\"__PAGE__\\\",\\\"d\\\":{\\\"r\\\":[\\\"$\\\",\\\"$36\\\",\\\"c\\\",{\\\"children\\\":[[\\\"$\\\",\\\"$Le\\\",\\\"c-page\\\",{\\\"type\\\":\\\"page\\\",\\\"pagePath\\\":\\\"checkout/page.tsx\\\",\\\"children\\\":[\\\"$\\\",\\\"$L106\\\",null,{\\\"Component\\\":\\\"$10a\\\",\\\"serverProvidedParams\\\":{\\\"searchParams\\\":{},\\\"params\\\":{},\\\"promises\\\":null}},null,\\\"$104\\\",1]},null,\\\"$103\\\",1],[[\\\"$\\\",\\\"script\\\",\\\"script-0\\\",{\\\"src\\\":\\\"/_next/static/chunks/node_modules_0tnd8b8lgm5n_._.js\\\",\\\"async\\\":true,\\\"nonce\\\":\\\"$undefined\\\"},null,\\\"$10b\\\",0],[\\\"$\\\",\\\"script\\\",\\\"script-1\\\",{\\\"src\\\":\\\"/_next/static/chunks/src_1crq2ty9_yq1z._.js\\\",\\\"async\\\":true,\\\"nonce\\\":\\\"$undefined\\\"},null,\\\"$10c\\\",0]],\\\"$10d\\\"]},null,\\\"$102\\\",0],\\\"p\\\":false,\\\"v\\\":null}}]]\\nfc:[[\\\"children\\\",{\\\"s\\\":\\\"checkout\\\",\\\"d\\\":{\\\"r\\\":[\\\"$\\\",\\\"$36\\\",\\\"c\\\",{\\\"children\\\":[null,[\\\"$\\\",\\\"$L52\\\",null,{\\\"parallelRouterKey\\\":\\\"children\\\",\\\"error\\\":\\\"$undefined\\\",\\\"errorStyles\\\":\\\"$undefined\\\",\\\"errorScripts\\\":\\\"$undefined\\\",\\\"template\\\":[\\\"$\\\",\\\"$L5a\\\",null,{},null,\\\"$ff\\\",1],\\\"templateStyles\\\":\\\"$undefined\\\",\\\"templateScripts\\\":\\\"$undefined\\\",\\\"notFound\\\":\\\"$undefined\\\",\\\"forbidden\\\":\\\"$undefined\\\",\\\"unauthorized\\\":\\\"$undefined\\\",\\\"segmentViewBoundaries\\\":[\\\"$undefined\\\",\\\"$undefined\\\",\\\"$undefined\\\",\\\"$undefined\\\"]},null,\\\"$fe\\\",1]]},null,\\\"$fd\\\",0],\\\"p\\\":false,\\\"v\\\":\\\"$100\\\"},\\\"c\\\":\\\"$Q101\\\"}]]\\n119:D\\\"$11c\\\"\\n119:D\\\"$11a\\\"\\n119:D\\\"$11d\\\"\\n119:null\\n11e:D\\\"$120\\\"\\n11e:D\\\"$11f\\\"\\n11e:D\\\"$122\\\"\\n125:D\\\"$127\\\"\\n125:D\\\"$126\\\"\\n11e:[\\\"$\\\",\\\"$L124\\\",null,{\\\"children\\\":\\\"$L125\\\"},\\\"$11f\\\",\\\"$121\\\",1]\\n128:D\\\"$12a\\\"\\n128:D\\\"$129\\\"\\n128:D\\\"$12c\\\"\\n131:D\\\"$133\\\"\\n131:D\\\"$132\\\"\\n134:D\\\"$136\\\"\\n134:D\\\"$135\\\"\\n134:D\\\"$137\\\"\\n134:null\\n128:[\\\"$\\\",\\\"$L12e\\\",null,{\\\"children\\\":[[\\\"$\\\",\\\"div\\\",null,{\\\"hidden\\\":true,\\\"children\\\":[\\\"$\\\",\\\"$116\\\",null,{\\\"name\\\":\\\"Next.Metadata\\\",\\\"children\\\":\\\"$L131\\\"},\\\"$129\\\",\\\"$130\\\",1]},\\\"$129\\\",\\\"$12f\\\",1],\\\"$134\\\"]},\\\"$129\\\",\\\"$12b\\\",1]\\n138:[]\\n0:{\\\"P\\\":\\\"$1\\\",\\\"c\\\":[\\\"\\\",\\\"checkout\\\"],\\\"q\\\":\\\"\\\",\\\"i\\\":true,\\\"t\\\":{\\\"t\\\":{\\\"s\\\":\\\"\\\",\\\"h\\\":20,\\\"d\\\":{\\\"r\\\":[\\\"$\\\",\\\"$Lb\\\",null,{\\\"loading\\\":[[\\\"$\\\",\\\"$Le\\\",\\\"c-loading\\\",{\\\"type\\\":\\\"loading\\\",\\\"pagePath\\\":\\\"loading.tsx\\\",\\\"children\\\":\\\"$f\\\"},null,\\\"$c\\\",0],[],null],\\\"children\\\":[\\\"$\\\",\\\"$Le\\\",\\\"layout\\\",{\\\"type\\\":\\\"layout\\\",\\\"pagePath\\\":\\\"layout.tsx\\\",\\\"children\\\":[\\\"$\\\",\\\"$36\\\",\\\"c\\\",{\\\"children\\\":[[[\\\"$\\\",\\\"link\\\",\\\"0\\\",{\\\"rel\\\":\\\"stylesheet\\\",\\\"href\\\":\\\"/_next/static/chunks/src_app_globals_162hn9oqc8uss.css\\\",\\\"precedence\\\":\\\"next_static/chunks/src_app_globals_162hn9oqc8uss.css\\\",\\\"crossOrigin\\\":\\\"$undefined\\\",\\\"nonce\\\":\\\"$undefined\\\"},null,\\\"$37\\\",0],[\\\"$\\\",\\\"script\\\",\\\"script-0\\\",{\\\"src\\\":\\\"/_next/static/chunks/node_modules_08wda7qma1b_2._.js\\\",\\\"async\\\":true,\\\"nonce\\\":\\\"$undefined\\\"},null,\\\"$38\\\",0],[\\\"$\\\",\\\"script\\\",\\\"script-1\\\",{\\\"src\\\":\\\"/_next/static/chunks/src_142h1ytu0owb_._.js\\\",\\\"async\\\":true,\\\"nonce\\\":\\\"$undefined\\\"},null,\\\"$39\\\",0]],\\\"$3a\\\"]},null,\\\"$35\\\",1]},null,\\\"$34\\\",0]},null,\\\"$6\\\",0],\\\"p\\\":false,\\\"v\\\":null},\\\"c\\\":\\\"$Qfc\\\"},\\\"h\\\":{\\\"r\\\":[\\\"$\\\",\\\"$36\\\",\\\"h\\\",{\\\"children\\\":[\\\"$119\\\",\\\"$11e\\\",\\\"$128\\\",null]},null,\\\"$118\\\",0],\\\"p\\\":false,\\\"v\\\":null}},\\\"m\\\":\\\"$W138\\\",\\\"G\\\":[\\\"$13a\\\",[\\\"$\\\",\\\"$Le\\\",\\\"ge-svn\\\",{\\\"type\\\":\\\"global-error\\\",\\\"pagePath\\\":\\\"__next_builtin__global-error.js\\\",\\\"children\\\":[[\\\"$\\\",\\\"link\\\",\\\"0\\\",{\\\"rel\\\":\\\"stylesheet\\\",\\\"href\\\":\\\"/_next/static/chunks/src_app_globals_162hn9oqc8uss.css\\\",\\\"precedence\\\":\\\"next_static/chunks/src_app_globals_162hn9oqc8uss.css\\\",\\\"crossOrigin\\\":\\\"$undefined\\\",\\\"nonce\\\":\\\"$undefined\\\"},null,\\\"$13c\\\",0]]},null,\\\"$13b\\\",0]],\\\"S\\\":false,\\\"r\\\":\\\"$undefined\\\",\\\"s\\\":\\\"$undefined\\\",\\\"a\\\":\\\"$undefined\\\",\\\"l\\\":\\\"$undefined\\\",\\\"p\\\":\\\"$undefined\\\",\\\"d\\\":\\\"$undefined\\\",\\\"b\\\":\\\"development\\\"}\\nf5:D\\\"$13e\\\"\\n13f:D\\\"$141\\\"\\n13f:D\\\"$140\\\"\\n13f:D\\\"$143\\\"\\n13f:[\\\"$\\\",\\\"$L78\\\",null,{\\\"ref\\\":\\\"$undefined\\\",\\\"icon\\\":{\\\"name\\\":\\\"map-pin\\\",\\\"size\\\":24,\\\"node\\\":[[\\\"path\\\",{\\\"d\\\":\\\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\\\",\\\"key\\\":\\\"1r0f0z\\\"}],[\\\"circle\\\",{\\\"cx\\\":\\\"12\\\",\\\"cy\\\":\\\"10\\\",\\\"r\\\":\\\"3\\\",\\\"key\\\":\\\"ilqhr7\\\"}]]},\\\"className\\\":\\\"w-4 h-4 text-gold-400 shrink-0 mt-1\\\"},\\\"$140\\\",\\\"$142\\\",1]\\nf5:[\\\"$\\\",\\\"li\\\",null,{\\\"className\\\":\\\"flex gap-2\\\",\\\"children\\\":[\\\"$13f\\\",\\\" Peshawar, Pakistan\\\"]},\\\"$8d\\\",\\\"$13d\\\",1]\\nf6:D\\\"$145\\\"\\n146:D\\\"$148\\\"\\n146:D\\\"$147\\\"\\n146:D\\\"$14a\\\"\\n146:[\\\"$\\\",\\\"$L78\\\",null,{\\\"ref\\\":\\\"$undefined\\\",\\\"icon\\\":{\\\"name\\\":\\\"phone\\\",\\\"size\\\":24,\\\"node\\\":[[\\\"path\\\",{\\\"d\\\":\\\"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384\\\",\\\"key\\\":\\\"9njp5v\\\"}]]},\\\"className\\\":\\\"w-4 h-4 text-gold-400 shrink-0\\\"},\\\"$147\\\",\\\"$149\\\",1]\\nf6:[\\\"$\\\",\\\"li\\\",null,{\\\"className\\\":\\\"flex gap-2\\\",\\\"children\\\":[\\\"$146\\\",\\\" 0347 9182632\\\"]},\\\"$8d\\\",\\\"$144\\\",1]\\nf7:D\\\"$14c\\\"\\n14d:D\\\"$14f\\\"\\n14d:D\\\"$14e\\\"\\n14d:D\\\"$151\\\"\\n14d:[\\\"$\\\",\\\"$L78\\\",null,{\\\"ref\\\":\\\"$undefined\\\",\\\"icon\\\":{\\\"name\\\":\\\"mail\\\",\\\"size\\\":24,\\\"node\\\":[[\\\"path\\\",{\\\"d\\\":\\\"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7\\\",\\\"key\\\":\\\"132q7q\\\"}],[\\\"rect\\\",{\\\"x\\\":\\\"2\\\",\\\"y\\\":\\\"4\\\",\\\"width\\\":\\\"20\\\",\\\"height\\\":\\\"16\\\",\\\"rx\\\":\\\"2\\\",\\\"key\\\":\\\"izxlao\\\"}]]},\\\"className\\\":\\\"w-4 h-4 text-gold-400 shrink-0\\\"},\\\"$14e\\\",\\\"$150\\\",1]\\nf7:[\\\"$\\\",\\\"li\\\",null,{\\\"className\\\":\\\"flex gap-2\\\",\\\"children\\\":[\\\"$14d\\\",\\\" antiqueitemmarketplace@gmail.com\\\"]},\\\"$8d\\\",\\\"$14b\\\",1]\\nf8:D\\\"$153\\\"\\n156:D\\\"$158\\\"\\n156:D\\\"$157\\\"\\n156:D\\\"$15a\\\"\\n156:[\\\"$\\\",\\\"$L71\\\",null,{\\\"href\\\":\\\"#\\\",\\\"className\\\":\\\"hover:text-gold-400\\\",\\\"children\\\":\\\"Privacy\\\"},\\\"$157\\\",\\\"$159\\\",1]\\n15b:D\\\"$15d\\\"\\n15b:D\\\"$15c\\\"\\n15b:D\\\"$15f\\\"\\n15b:[\\\"$\\\",\\\"$L71\\\",null,{\\\"href\\\":\\\"#\\\",\\\"className\\\":\\\"hover:text-gold-400\\\",\\\"children\\\":\\\"Terms\\\"},\\\"$15c\\\",\\\"$15e\\\",1]\\n160:D\\\"$162\\\"\\n160:D\\\"$161\\\"\\n160:D\\\"$164\\\"\\n160:[\\\"$\\\",\\\"$L71\\\",null,{\\\"href\\\":\\\"#\\\",\\\"className\\\":\\\"hover:text-gold-400\\\",\\\"children\\\":\\\"Cookies\\\"},\\\"$161\\\",\\\"$163\\\",1]\\nf8:[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"border-t border-antique-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-antique-400\\\",\\\"children\\\":[[\\\"$\\\",\\\"p\\\",null,{\\\"children\\\":\\\"© 2025 Antique Bazaar. All rights reserved.\\\"},\\\"$8d\\\",\\\"$154\\\",1],[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"flex gap-4 mt-3 md:mt-0\\\",\\\"children\\\":[\\\"$156\\\",\\\"$15b\\\",\\\"$160\\\"]},\\\"$8d\\\",\\\"$155\\\",1]]},\\\"$8d\\\",\\\"$152\\\",1]\\n100:C\\n125:D\\\"$165\\\"\\n125:[[\\\"$\\\",\\\"meta\\\",\\\"0\\\",{\\\"charSet\\\":\\\"utf-8\\\"},\\\"$10e\\\",\\\"$166\\\",0],[\\\"$\\\",\\\"meta\\\",\\\"1\\\",{\\\"name\\\":\\\"viewport\\\",\\\"content\\\":\\\"width=device-width, initial-scale=1\\\"},\\\"$10e\\\",\\\"$167\\\",0]]\\n16e:\\\"[project]/node_modules/next/dist/lib/metadata/generate/icon-mark.js [app-client] (ecmascript)\\\"\\n16f:I[\\\"$16e\\\",[\\\"$8\\\",\\\"$9\\\"],\\\"IconMark\\\"]\\n117:D\\\"$168\\\"\\n117:null\\n131:D\\\"$169\\\"\\n131:[[\\\"$\\\",\\\"title\\\",\\\"0\\\",{\\\"children\\\":\\\"Antique Item Marketplace — Buy \\u0026 Sell Authentic Antiques\\\"},\\\"$10e\\\",\\\"$16a\\\",0],[\\\"$\\\",\\\"meta\\\",\\\"1\\\",{\\\"name\\\":\\\"description\\\",\\\"content\\\":\\\"Pakistan's most trusted marketplace for authentic antiques.\\\"},\\\"$10e\\\",\\\"$16b\\\",0],[\\\"$\\\",\\\"link\\\",\\\"2\\\",{\\\"rel\\\":\\\"icon\\\",\\\"href\\\":\\\"/favicon.ico?favicon.117ezoe8m31dk.ico\\\",\\\"sizes\\\":\\\"48x48\\\",\\\"type\\\":\\\"image/x-icon\\\"},\\\"$10e\\\",\\\"$16c\\\",0],[\\\"$\\\",\\\"$L16f\\\",\\\"3\\\",{},\\\"$10e\\\",\\\"$16d\\\",0]]\\n\"])"
```

# Page snapshot

```yaml
- generic [active] [ref=f3e1]:
  - generic [ref=f3e3]:
    - generic [ref=f3e4]: 🏛️ Peshawar, Pakistan — Trusted since 2010
    - generic [ref=f3e5]:
      - link "Help Center" [ref=f3e6] [cursor=pointer]:
        - /url: /help
      - link "Sell on Antique Bazaar" [ref=f3e7] [cursor=pointer]:
        - /url: /sell
  - navigation [ref=f3e8]:
    - generic [ref=f3e10]:
      - link [ref=f3e11] [cursor=pointer]:
        - /url: /
        - generic [ref=f3e19]:
          - text: Antique Bazaar
          - paragraph [ref=f3e20]: Timeless Treasures
      - textbox "Search antiques, coins, paintings..." [ref=f3e26]
      - generic [ref=f3e27]:
        - button "Toggle theme" [ref=f3e28]
        - link "Browse" [ref=f3e31] [cursor=pointer]:
          - /url: /listings
        - link "Auctions" [ref=f3e32] [cursor=pointer]:
          - /url: /auctions
        - link "Sell Item" [ref=f3e33] [cursor=pointer]:
          - /url: /sell
        - link [ref=f3e34] [cursor=pointer]:
          - /url: /cart
        - link "Dashboard" [ref=f3e38] [cursor=pointer]:
          - /url: /dashboard
        - button "Logout" [ref=f3e45]
  - main [ref=f3e49]:
    - generic [ref=f3e50]:
      - heading "Cart is empty" [level=1] [ref=f3e51]
      - link "Browse Antiques" [ref=f3e52] [cursor=pointer]:
        - /url: /listings
  - contentinfo [ref=f3e53]:
    - generic [ref=f3e54]:
      - generic [ref=f3e55]:
        - generic [ref=f3e56]:
          - heading "Antique Bazaar" [level=3] [ref=f3e65]
          - paragraph [ref=f3e66]: The world's most trusted marketplace for authentic antiques, rare collectibles, and timeless treasures.
          - generic [ref=f3e67]:
            - link [ref=f3e68] [cursor=pointer]:
              - /url: "#"
            - link [ref=f3e75] [cursor=pointer]:
              - /url: "#"
            - link [ref=f3e82] [cursor=pointer]:
              - /url: "#"
        - generic [ref=f3e89]:
          - heading "Marketplace" [level=4] [ref=f3e90]
          - list [ref=f3e91]:
            - listitem [ref=f3e92]:
              - link "Browse All" [ref=f3e93] [cursor=pointer]:
                - /url: /listings
            - listitem [ref=f3e94]:
              - link "Live Auctions" [ref=f3e95] [cursor=pointer]:
                - /url: /auctions
            - listitem [ref=f3e96]:
              - link "Sell an Item" [ref=f3e97] [cursor=pointer]:
                - /url: /sell
            - listitem [ref=f3e98]:
              - link "Categories" [ref=f3e99] [cursor=pointer]:
                - /url: /categories
            - listitem [ref=f3e100]:
              - link "About Us" [ref=f3e101] [cursor=pointer]:
                - /url: /about
        - generic [ref=f3e102]:
          - heading "Support" [level=4] [ref=f3e103]
          - list [ref=f3e104]:
            - listitem [ref=f3e105]:
              - link "Help Center" [ref=f3e106] [cursor=pointer]:
                - /url: /help
            - listitem [ref=f3e107]:
              - link "Contact Us" [ref=f3e108] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=f3e109]:
              - link "Buyer Protection" [ref=f3e110] [cursor=pointer]:
                - /url: /help
            - listitem [ref=f3e111]:
              - link "Shipping Info" [ref=f3e112] [cursor=pointer]:
                - /url: /help
            - listitem [ref=f3e113]:
              - link "Authentication" [ref=f3e114] [cursor=pointer]:
                - /url: /help
        - generic [ref=f3e115]:
          - heading "Contact" [level=4] [ref=f3e116]
          - list [ref=f3e117]:
            - listitem [ref=f3e118]: Peshawar, Pakistan
            - listitem [ref=f3e122]: 0347 9182632
            - listitem [ref=f3e125]: antiqueitemmarketplace@gmail.com
      - generic [ref=f3e129]:
        - paragraph [ref=f3e130]: © 2025 Antique Bazaar. All rights reserved.
        - generic [ref=f3e131]:
          - link "Privacy" [ref=f3e132] [cursor=pointer]:
            - /url: "#"
          - link "Terms" [ref=f3e133] [cursor=pointer]:
            - /url: "#"
          - link "Cookies" [ref=f3e134] [cursor=pointer]:
            - /url: "#"
  - button "Open Next.js Dev Tools" [ref=f3e140] [cursor=pointer]
  - alert [ref=f3e144]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | const FIXED_ID = "YAHAN-TEST-ID-PASTE-KARO";
  4   | async function addToCartThenCheckout(page: any) {
  5   |   // Clear cart
  6   |   await page.goto("/cart");
  7   |   await page.waitForLoadState("domcontentloaded");
  8   |   await page.waitForTimeout(500);
  9   |   const clearBtn = page.locator('button:has-text("Clear all"), button:has-text("Clear")').first();
  10  |   if (await clearBtn.count() > 0) {
  11  |     await clearBtn.click().catch(() => {});
  12  |     await page.waitForTimeout(800);
  13  |   }
  14  | 
  15  |   // Go to listing and add
  16  |   await page.goto(`/listings/${FIXED_ID}`);
  17  |   await page.waitForLoadState("domcontentloaded");
  18  |   await page.waitForTimeout(2000);
  19  | 
  20  |   const addBtn = page.locator('button:has-text("Add to Cart")').first();
  21  |   const buyBtn = page.locator('button:has-text("Buy Now")').first();
  22  | 
  23  |   if (await addBtn.count() > 0) {
  24  |     await addBtn.click();
  25  |     await page.waitForTimeout(2000);
  26  |   } else if (await buyBtn.count() > 0) {
  27  |     await buyBtn.click();
  28  |     await page.waitForTimeout(2000);
  29  |   }
  30  | 
  31  |   await page.goto("/checkout");
  32  |   await page.waitForLoadState("domcontentloaded");
  33  |   await page.waitForTimeout(1500);
  34  | }
  35  | 
  36  | async function loginBuyer(page: any) {
  37  |   await page.goto("/login");
  38  |   await page.fill('input[name="email"]', "buyer@demo.com");
  39  |   await page.fill('input[name="password"]', "buyer123");
  40  |   await page.click('button[type="submit"]');
  41  |   await page.waitForURL(/dashboard/, { timeout: 20000 });
  42  | }
  43  | 
  44  | async function loginAdmin(page: any) {
  45  |   await page.goto("/login");
  46  |   await page.fill('input[name="email"]', "admin@antique.com");
  47  |   await page.fill('input[name="password"]', "admin123");
  48  |   await page.click('button[type="submit"]');
  49  |   await page.waitForURL(/dashboard/, { timeout: 20000 });
  50  | }
  51  | 
  52  | test.describe("PAYMENT & ORDERS — Deep Coverage", () => {
  53  |   test("PM1: All 6 payment methods visible on checkout", async ({ page }) => {
  54  |     await loginBuyer(page);
  55  |     await addToCartThenCheckout(page);
  56  |     const body = await page.textContent("body");
> 57  |     expect(body).toMatch(/Escrow/i);
      |                  ^ Error: expect(received).toMatch(expected)
  58  |     expect(body).toMatch(/Credit.*Debit.*Card|Card/i);
  59  |     expect(body).toMatch(/JazzCash/i);
  60  |     expect(body).toMatch(/Easypaisa/i);
  61  |     expect(body).toMatch(/Bank Transfer|Raast/i);
  62  |     expect(body).toMatch(/PayPal/i);
  63  |   });
  64  | 
  65  |   test("PM2: Escrow is default payment method", async ({ page }) => {
  66  |     await loginBuyer(page);
  67  |     await page.goto("/checkout");
  68  |     const escrowRadio = page.locator('input[value="ESCROW"]');
  69  |     if (await escrowRadio.count() > 0) {
  70  |       expect(await escrowRadio.isChecked()).toBe(true);
  71  |     }
  72  |   });
  73  | 
  74  |   test("PM3: Cart empty → checkout shows empty message", async ({ page }) => {
  75  |     await loginBuyer(page);
  76  |     await page.goto("/cart");
  77  |     // clear cart first
  78  |     const clearBtn = page.locator('button:has-text("Clear all"), button:has-text("Clear")');
  79  |     if (await clearBtn.count() > 0) {
  80  |       await clearBtn.first().click().catch(() => {});
  81  |     }
  82  |     await page.goto("/checkout");
  83  |     const body = await page.textContent("body");
  84  |     expect(body).toMatch(/Cart is empty|Browse Antiques/i);
  85  |   });
  86  | 
  87  |   test("PM4: Shipping address textarea present", async ({ page }) => {
  88  |     await loginBuyer(page);
  89  |     await page.goto(`/listings/${FIXED_ID}`);
  90  |     await page.waitForLoadState("domcontentloaded");
  91  |     // Add to cart if available
  92  |     const addBtn = page.locator('button:has-text("Add to Cart")').first();
  93  |     if (await addBtn.count() > 0) {
  94  |       await addBtn.click().catch(() => {});
  95  |       await page.waitForTimeout(800);
  96  |     }
  97  |     await page.goto("/checkout");
  98  |     const body = await page.textContent("body");
  99  |     if (body && /Checkout/i.test(body)) {
  100 |       const textarea = page.locator('textarea').first();
  101 |       if (await textarea.count() > 0) {
  102 |         await expect(textarea).toBeVisible();
  103 |       }
  104 |     }
  105 |   });
  106 | 
  107 |   test("PM5: Order Summary shows subtotal + escrow fee + total", async ({ page }) => {
  108 |     await loginBuyer(page);
  109 |     await addToCartThenCheckout(page);
  110 |     const body = await page.textContent("body");
  111 |     if (body && /Order Summary|Subtotal/i.test(body)) {
  112 |       expect(body).toMatch(/Subtotal/i);
  113 |       expect(body).toMatch(/Escrow fee|escrow/i);
  114 |       expect(body).toMatch(/Total/i);
  115 |     }
  116 |   });
  117 | 
  118 |   test("PM6: Place Order button visible on checkout", async ({ page }) => {
  119 |     await loginBuyer(page);
  120 |     await addToCartThenCheckout(page);
  121 |     const body = await page.textContent("body");
  122 |     if (body && /Checkout/i.test(body)) {
  123 |       const orderBtn = page.locator('button:has-text("Place Order")').first();
  124 |       if (await orderBtn.count() > 0) {
  125 |         await expect(orderBtn).toBeVisible();
  126 |       }
  127 |     }
  128 |   });
  129 | 
  130 |   test("PM7: Escrow protected message shown", async ({ page }) => {
  131 |     await loginBuyer(page);
  132 |     await addToCartThenCheckout(page);
  133 |     const body = await page.textContent("body");
  134 |     expect(body).toMatch(/Escrow protected|Escrow Protected|funds held|secure/i);
  135 |   });
  136 | 
  137 |   test("PM8: Order placed via API creates DB record", async ({ page }) => {
  138 |     await loginBuyer(page);
  139 | 
  140 |     // Buy first approved fixed listing via cart + checkout UI
  141 |     await page.goto(`/listings/${FIXED_ID}`);
  142 |     await page.waitForLoadState("domcontentloaded");
  143 | 
  144 |     const addBtn = page.locator('button:has-text("Add to Cart")').first();
  145 |     if (await addBtn.count() === 0) {
  146 |       // Fallback: directly place order via API
  147 |       const res = await page.request.post("/api/orders", {
  148 |         data: {
  149 |           items: [{ listingId: FIXED_ID, price: 125000 }],
  150 |           paymentMethod: "ESCROW",
  151 |           shippingAddr: "Test House, Street 1, Peshawar, 25000",
  152 |         },
  153 |       });
  154 |       expect([200, 201, 400]).toContain(res.status());
  155 |       return;
  156 |     }
  157 | 
```