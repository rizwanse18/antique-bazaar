import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

async function safeDelete(model: any, name: string) {
  try {
    if (model?.deleteMany) await model.deleteMany({});
    console.log(`✓ Cleared ${name}`);
  } catch (e: any) {
    console.log(`⚠ Skipped ${name}: ${e.message}`);
  }
}

async function main() {
  console.log("=== TEST SEED START ===");

  // Safe deletes
  await safeDelete(prisma.wishlist, "wishlist");
  await safeDelete(prisma.bid, "bid");
  await safeDelete(prisma.order, "order");
  await safeDelete(prisma.review, "review");
  await safeDelete(prisma.complaint, "complaint");
  await safeDelete(prisma.listing, "listing");
  await safeDelete(prisma.session, "session");
  await safeDelete(prisma.account, "account");
  await safeDelete(prisma.user, "user");

  // Admin
  const adminHash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@antique.com",
      password: adminHash,
      role: "ADMIN",
      emailVerified: true,
      kycVerified: true,
    },
  });
  console.log("✓ Admin:", admin.email);
  console.log("  Password verify:", (await bcrypt.compare("admin123", admin.password)) ? "PASS" : "FAIL");

  // Seller
  const sellerHash = await bcrypt.hash("seller123", 10);
  const seller = await prisma.user.create({
    data: {
      name: "Heritage House",
      email: "seller@demo.com",
      password: sellerHash,
      role: "SELLER",
      emailVerified: true,
      kycVerified: true,
    },
  });
  console.log("✓ Seller:", seller.email);
  console.log("  Password verify:", (await bcrypt.compare("seller123", seller.password)) ? "PASS" : "FAIL");

  // Buyer
  const buyerHash = await bcrypt.hash("buyer123", 10);
  const buyer = await prisma.user.create({
    data: {
      name: "Ali Buyer",
      email: "buyer@demo.com",
      password: buyerHash,
      role: "BUYER",
      emailVerified: true,
    },
  });
  console.log("✓ Buyer:", buyer.email);
  console.log("  Password verify:", (await bcrypt.compare("buyer123", buyer.password)) ? "PASS" : "FAIL");

  // Demo listings
  const IMAGES = [
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800",
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800",
    "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800",
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800",
    "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800",
    "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800",
    "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800",
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800",
  ];
  const DEMO = [
    { title: "Mughal Era Brass Lamp", category: "Furniture", era: "Mughal, 1650 AD", price: 125000, condition: "Excellent", rarity: "Very Rare" },
    { title: "Victorian Silver Teapot", category: "Ceramics", era: "Victorian, 1870 AD", price: 89000, condition: "Mint", rarity: "Rare" },
    { title: "Handwoven Persian Rug", category: "Textiles", era: "Qajar, 1890 AD", price: 340000, condition: "Excellent", rarity: "Museum-grade" },
    { title: "Antique Pocket Watch", category: "Watches", era: "Art Deco, 1920 AD", price: 67000, condition: "Good", rarity: "Rare" },
    { title: "Ming Dynasty Vase", category: "Ceramics", era: "Ming, 1500 AD", price: 890000, condition: "Mint", rarity: "Museum-grade" },
    { title: "Bronze Buddha Sculpture", category: "Sculpture", era: "Gandhara, 300 AD", price: 456000, condition: "Restored", rarity: "Very Rare" },
    { title: "Ottoman Gold Coin", category: "Coins", era: "Ottoman, 1750 AD", price: 156000, condition: "Excellent", rarity: "Rare" },
    { title: "Regency Chair", category: "Furniture", era: "Regency, 1810 AD", price: 220000, condition: "Good", rarity: "Rare" },
  ];

  for (let i = 0; i < DEMO.length; i++) {
    const d = DEMO[i];
    await prisma.listing.create({
      data: {
        title: d.title,
        description: `Authentic ${d.title} — ${d.era}. Fully authenticated.`,
        category: d.category,
        era: d.era,
        origin: "Pakistan",
        material: "Period material",
        condition: d.condition,
        rarity: d.rarity,
        images: JSON.stringify([IMAGES[i]]),
        saleType: "FIXED",
        price: d.price,
        status: "APPROVED",
        legalConfirmed: true,
        sellerId: seller.id,
      },
    });
  }
  console.log(`✓ ${DEMO.length} listings created`);

  // Pending listing
  await prisma.listing.create({
    data: {
      title: "Victorian Pocket Watch (Pending)",
      description: "Needs admin approval.",
      category: "Watches",
      era: "Victorian, 1890 AD",
      condition: "Good",
      rarity: "Rare",
      images: JSON.stringify([IMAGES[3]]),
      saleType: "FIXED",
      price: 45000,
      status: "PENDING",
      legalConfirmed: true,
      sellerId: seller.id,
    },
  });
  console.log("✓ Pending listing created");

  // Auction
  await prisma.listing.create({
    data: {
      title: "Rare Mughal Dagger",
      description: "Museum-grade Mughal dagger.",
      category: "Sculpture",
      era: "Mughal, 1650 AD",
      condition: "Excellent",
      rarity: "Museum-grade",
      images: JSON.stringify(["https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800"]),
      saleType: "AUCTION",
      startingBid: 300000,
      buyNowPrice: 800000,
      auctionEnd: new Date(Date.now() + 3 * 86400000),
      status: "APPROVED",
      legalConfirmed: true,
      sellerId: seller.id,
    },
  });
  console.log("✓ Auction created");

  console.log("\n========================================");
  console.log("ALL SEED COMPLETE");
  console.log("========================================");
  console.log("ADMIN  → admin@antique.com  / admin123");
  console.log("SELLER → seller@demo.com    / seller123");
  console.log("BUYER  → buyer@demo.com     / buyer123");
  console.log("========================================\n");
}

main().then(() => prisma.$disconnect()).catch((e) => {
  console.error("ERROR:", e);
  prisma.$disconnect();
  process.exit(1);
});