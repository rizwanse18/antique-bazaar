import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { readFileSync, writeFileSync } from "fs";

const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" });
const p = new PrismaClient({ adapter });

async function main() {
  const seller = await p.user.findFirst({ where: { role: "SELLER" } });
  if (!seller) { console.log("ERROR: No seller found"); process.exit(1); }

  // Delete old test listings
  await p.listing.deleteMany({ where: { title: { contains: "Test Listing" } } });

  // Create fresh test listing
  const listing = await p.listing.create({
    data: {
      title: "Test Listing for Automation",
      description: "Test item for automated payment testing.",
      category: "Furniture",
      era: "Test Era",
      condition: "Excellent",
      rarity: "Rare",
      images: JSON.stringify(["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800"]),
      saleType: "FIXED",
      price: 50000,
      status: "APPROVED",
      legalConfirmed: true,
      sellerId: seller.id,
    },
  });

  console.log("NEW_TEST_ID:", listing.id);

  // Auto-update both test files
  const files = [
    "./tests-full/16-payment-deep.spec.ts",
    "./tests-full/17-payment-gateway.spec.ts",
  ];

  for (const f of files) {
    let content = readFileSync(f, "utf-8");
    content = content.replace(/const FIXED_ID = "[^"]*";/, `const FIXED_ID = "${listing.id}";`);
    writeFileSync(f, content, "utf-8");
    console.log("UPDATED:", f);
  }

  await p.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });