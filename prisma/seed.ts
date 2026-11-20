import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

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

const DEMO_LISTINGS = [
  { title: "Mughal Era Brass Lamp", category: "Lighting", era: "Mughal, 1650 AD", price: 125000, condition: "Excellent", rarity: "Very Rare" },
  { title: "Victorian Silver Teapot Set", category: "Silverware", era: "Victorian, 1870 AD", price: 89000, condition: "Mint", rarity: "Rare" },
  { title: "Handwoven Persian Rug", category: "Textiles", era: "Qajar, 1890 AD", price: 340000, condition: "Excellent", rarity: "Museum-grade" },
  { title: "Antique Pocket Watch", category: "Watches", era: "Art Deco, 1920 AD", price: 67000, condition: "Good", rarity: "Rare" },
  { title: "Ming Dynasty Ceramic Vase", category: "Ceramics", era: "Ming, 1500 AD", price: 890000, condition: "Mint", rarity: "Museum-grade" },
  { title: "Bronze Buddha Sculpture", category: "Sculpture", era: "Gandhara, 300 AD", price: 456000, condition: "Restored", rarity: "Very Rare" },
  { title: "Ottoman Gold Coin", category: "Coins", era: "Ottoman, 1750 AD", price: 156000, condition: "Excellent", rarity: "Rare" },
  { title: "Regency Mahogany Chair", category: "Furniture", era: "Regency, 1810 AD", price: 220000, condition: "Good", rarity: "Rare" },
];

async function main() {
  console.log("Seeding started...");

  const adminPass = await bcrypt.hash("admin123", 10);
  const sellerPass = await bcrypt.hash("seller123", 10);
  const buyerPass = await bcrypt.hash("buyer123", 10);

  // 1. Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@antique.com" },
    update: { password: adminPass, role: "ADMIN" },
    create: {
      name: "Admin",
      email: "admin@antique.com",
      password: adminPass,
      role: "ADMIN",
      emailVerified: true,
      kycVerified: true,
    },
  });
  console.log("✓ Admin:", admin.email, "/ admin123");

  // 2. Seller
  const seller = await prisma.user.upsert({
    where: { email: "seller@demo.com" },
    update: { password: sellerPass, role: "SELLER" },
    create: {
      name: "Heritage House",
      email: "seller@demo.com",
      password: sellerPass,
      role: "SELLER",
      emailVerified: true,
      kycVerified: true,
    },
  });
  console.log("✓ Seller:", seller.email, "/ seller123");

  // 3. Buyer
  const buyer = await prisma.user.upsert({
    where: { email: "buyer@demo.com" },
    update: { password: buyerPass },
    create: {
      name: "Ali Buyer",
      email: "buyer@demo.com",
      password: buyerPass,
      role: "BUYER",
      emailVerified: true,
    },
  });
  console.log("✓ Buyer:", buyer.email, "/ buyer123");

  // 4. Demo listings
  const existingCount = await prisma.listing.count();
  if (existingCount === 0) {
    for (let i = 0; i < DEMO_LISTINGS.length; i++) {
      const d = DEMO_LISTINGS[i];
      await prisma.listing.create({
        data: {
          title: d.title,
          description: `Authentic ${d.title} — ${d.era}. Excellent provenance, fully authenticated by our experts. A rare find for serious collectors.`,
          category: d.category,
          era: d.era,
          origin: "Pakistan",
          material: "Authentic period material",
          dimensions: "Varies",
          condition: d.condition,
          provenance: "Private collection",
          rarity: d.rarity,
          images: JSON.stringify([IMAGES[i % IMAGES.length]]),
          saleType: "FIXED",
          price: d.price,
          status: "APPROVED",
          legalConfirmed: true,
          sellerId: seller.id,
        },
      });
    }
    console.log(`✓ ${DEMO_LISTINGS.length} demo listings created`);
  } else {
    console.log(`✓ Listings already exist (${existingCount})`);
  }

  // 5. Pending listing for admin testing
  const pendingExists = await prisma.listing.findFirst({ where: { status: "PENDING" } });
  if (!pendingExists) {
    await prisma.listing.create({
      data: {
        title: "Victorian Pocket Watch (Pending Review)",
        description: "Antique Victorian pocket watch, needs admin approval.",
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
    console.log("✓ Pending listing created (for admin testing)");
  }

  // 6. Auction listing
  const auctionExists = await prisma.listing.findFirst({ where: { saleType: "AUCTION" } });
  if (!auctionExists) {
    await prisma.listing.create({
      data: {
        title: "Rare Mughal Dagger — 17th Century",
        description: "Authentic Mughal-era dagger with jade hilt. Museum-grade. Fully documented provenance.",
        category: "Weapons",
        era: "Mughal, 1650 AD",
        origin: "India",
        material: "Damascus steel + jade",
        condition: "Excellent",
        provenance: "Royal collection, Jaipur",
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
    console.log("✓ Auction listing created");
  }

  console.log("\n========================================");
  console.log("ALL SEED COMPLETE — TEST ACCOUNTS");
  console.log("========================================");
  console.log("ADMIN  → admin@antique.com  / admin123");
  console.log("SELLER → seller@demo.com    / seller123");
  console.log("BUYER  → buyer@demo.com     / buyer123");
  console.log("========================================\n");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("SEED ERROR:", e);
    prisma.$disconnect();
    process.exit(1);
  });