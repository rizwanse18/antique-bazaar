import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return null;
  return user;
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admin only" }, { status: 403 });

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true, name: true, email: true, role: true,
      kycVerified: true, isActive: true, createdAt: true,
      _count: { select: { listings: true, orders: true, bids: true } },
    },
  });
  return NextResponse.json({ users });
}

export async function PATCH(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admin only" }, { status: 403 });

  const { id, role, isActive, kycVerified } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  if (id === admin.id && role && role !== "ADMIN") {
    return NextResponse.json({ error: "Cannot demote yourself" }, { status: 400 });
  }

  const data: any = {};
  if (role) data.role = role;
  if (typeof isActive === "boolean") data.isActive = isActive;
  if (typeof kycVerified === "boolean") data.kycVerified = kycVerified;

  const user = await prisma.user.update({ where: { id }, data });
  return NextResponse.json({ user: { id: user.id, role: user.role, isActive: user.isActive } });
}

export async function DELETE(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admin only" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  if (id === admin.id) return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });

  // Cascade delete
  await prisma.wishlist.deleteMany({ where: { userId: id } });
  await prisma.bid.deleteMany({ where: { userId: id } });
  await prisma.review.deleteMany({ where: { userId: id } });
  await prisma.complaint.deleteMany({ where: { userId: id } });
  await prisma.order.deleteMany({ where: { buyerId: id } });

  // Listings bhi delete karo (aur unki dependencies)
  const userListings = await prisma.listing.findMany({ where: { sellerId: id }, select: { id: true } });
  const ids = userListings.map(l => l.id);
  if (ids.length) {
    await prisma.bid.deleteMany({ where: { listingId: { in: ids } } });
    await prisma.order.deleteMany({ where: { listingId: { in: ids } } });
    await prisma.review.deleteMany({ where: { listingId: { in: ids } } });
    await prisma.wishlist.deleteMany({ where: { listingId: { in: ids } } });
    await prisma.listing.deleteMany({ where: { sellerId: id } });
  }

  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}