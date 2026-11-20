import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return null;
  return user;
}

// GET all listings (admin view — includes non-approved)
export async function GET(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admin only" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const where: any = {};
  if (status) where.status = status;

  const listings = await prisma.listing.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      seller: { select: { id: true, name: true, email: true } },
      _count: { select: { bids: true, orders: true } },
    },
  });
  return NextResponse.json({ listings });
}

// DELETE a listing
export async function DELETE(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admin only" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  // Cascade: bids, orders, reviews, wishlists delete
  await prisma.bid.deleteMany({ where: { listingId: id } });
  await prisma.order.deleteMany({ where: { listingId: id } });
  await prisma.review.deleteMany({ where: { listingId: id } });
  await prisma.wishlist.deleteMany({ where: { listingId: id } });
  await prisma.listing.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}

// PATCH — update status/fields
export async function PATCH(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admin only" }, { status: 403 });

  const body = await req.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const allowed = ["status", "title", "price", "featured", "category", "rarity"];
  const data: any = {};
  for (const k of allowed) if (k in updates) data[k] = updates[k];

  const listing = await prisma.listing.update({ where: { id }, data });
  return NextResponse.json({ listing });
}