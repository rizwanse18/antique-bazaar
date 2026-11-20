import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" });
const p = new PrismaClient({ adapter });

async function main() {
  const seller = await p.user.findFirst({ where: { role: "SELLER" } });
  if (!seller) { console.log("ERROR: No seller"); return; }

  // Delete old test listings
  await p.listing.deleteMany({
    where: { title: { contains: "Test Listing" } },
  });

  const listing = await p.listing.create({
    data: {
      title: "Test Listing for Automation",
      description: "Test item for automated payment testing. Do not delete.",
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
  await p.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });