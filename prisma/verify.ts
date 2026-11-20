import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("=== MODELS ===");
  console.log("user:", typeof prisma.user);
  console.log("account:", typeof prisma.account);
  console.log("session:", typeof prisma.session);
  console.log("listing:", typeof prisma.listing);
  console.log("complaint:", typeof prisma.complaint);

  const users = await prisma.user.findMany();
  console.log("\nUSERS:", users.length);
  users.forEach(u => console.log("  ", u.email, "|", u.role));

  await prisma.$disconnect();
}

main().catch(e => { console.error("ERROR:", e.message); process.exit(1); });