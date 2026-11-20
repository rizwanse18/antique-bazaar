import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding started...");
  const adminPass = await bcrypt.hash("admin123", 10);
  const sellerPass = await bcrypt.hash("seller123", 10);
  const buyerPass = await bcrypt.hash("buyer123", 10);

  await prisma.user.upsert({
    where: { email: "admin@antique.com" },
    update: { password: adminPass, role: "ADMIN" },
    create: { name: "Admin", email: "admin@antique.com", password: adminPass, role: "ADMIN", emailVerified: true, kycVerified: true },
  });
  console.log("✓ Admin: admin@antique.com / admin123");

  const seller = await prisma.user.upsert({
    where: { email: "seller@demo.com" },
    update: { password: sellerPass, role: "SELLER" },
    create: { name: "Heritage House", email: "seller@demo.com", password: sellerPass, role: "SELLER", emailVerified: true, kycVerified: true },
  });
  console.log("✓ Seller: seller@demo.com / seller123");

  await prisma.user.upsert({
    where: { email: "buyer@demo.com" },
    update: { password: buyerPass },
    create: { name: "Ali Buyer", email: "buyer@demo.com", password: buyerPass, role: "BUYER", emailVerified: true },
  });
  console.log("✓ Buyer: buyer@demo.com / buyer123");

  const existing = await prisma.listing.count();
  if (existing === 0) {
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
          title: d.title, description: `Authentic ${d.title} — ${d.era}. Fully authenticated.`, category: d.category,
          era: d.era, origin: "Pakistan", material: "Period material", condition: d.condition, rarity: d.rarity,
          images: JSON.stringify([IMAGES[i]]), saleType: "FIXED", price: d.price, status: "APPROVED",
          legalConfirmed: true, sellerId: seller.id,
        },
      });
    }
    console.log(`✓ ${DEMO.length} listings created`);
  } else {
    console.log(`✓ Listings already exist (${existing})`);
  }
  console.log("\n=== SEED COMPLETE ===");
}
main().then(() => prisma.$disconnect()).catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });