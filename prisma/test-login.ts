import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "admin@antique.com";
  const password = "admin123";

  console.log("Testing login for:", email);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.log("FAIL: User not found in DB");
    return;
  }
  console.log("✓ User found:", user.name, "| role:", user.role);
  console.log("Password hash in DB:", user.password.substring(0, 30) + "...");

  const valid = await bcrypt.compare(password, user.password);
  console.log("Password match:", valid ? "PASS" : "FAIL");

  if (!valid) {
    console.log("\n*** HASH MISMATCH ***");
    console.log("Regenerating hash and updating...");
    const newHash = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email },
      data: { password: newHash },
    });
    console.log("✓ Hash updated. Try login again.");
  }
}

main().then(() => prisma.$disconnect()).catch(console.error);