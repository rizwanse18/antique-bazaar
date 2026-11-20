import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

// GET bids for a listing
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const listingId = searchParams.get("listingId");
  if (!listingId) return NextResponse.json({ error: "Missing listingId" }, { status: 400 });

  const bids = await prisma.bid.findMany({
    where: { listingId },
    orderBy: { amount: "desc" },
    include: { user: { select: { id: true, name: true } } },
  });
  return NextResponse.json({ bids });
}

const bidSchema = z.object({
  listingId: z.string(),
  amount: z.number().positive(),
});

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Login required" }, { status: 401 });

    const body = await req.json();
    const { listingId, amount } = bidSchema.parse(body);

    const listing = await prisma.listing.findUnique({ where: { id: listingId } });
    if (!listing) return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    if (listing.saleType !== "AUCTION") return NextResponse.json({ error: "Not an auction" }, { status: 400 });
    if (listing.sellerId === user.id) return NextResponse.json({ error: "Cannot bid on your own item" }, { status: 400 });
    if (listing.auctionEnd && new Date(listing.auctionEnd) < new Date()) {
      return NextResponse.json({ error: "Auction ended" }, { status: 400 });
    }

    // Get highest bid
    const highest = await prisma.bid.findFirst({
      where: { listingId },
      orderBy: { amount: "desc" },
    });
    const minNext = highest ? highest.amount : listing.startingBid || 0;
    const minIncrement = Math.max(1, Math.floor(minNext * 0.05));

    if (amount < minNext + (highest ? minIncrement : 0)) {
      return NextResponse.json({
        error: `Minimum bid is PKR ${minNext + (highest ? minIncrement : 0).toLocaleString()}`,
      }, { status: 400 });
    }

    // Anti-sniping: extend by 2 min if bid in last 2 min
    let newEnd = listing.auctionEnd;
    if (listing.auctionEnd) {
      const remaining = new Date(listing.auctionEnd).getTime() - Date.now();
      if (remaining < 120000 && remaining > 0) {
        newEnd = new Date(Date.now() + 120000);
        await prisma.listing.update({ where: { id: listingId }, data: { auctionEnd: newEnd } });
      }
    }

    const bid = await prisma.bid.create({
      data: { listingId, userId: user.id, amount },
      include: { user: { select: { id: true, name: true } } },
    });

    return NextResponse.json({ bid, auctionEnd: newEnd });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Bid failed" }, { status: 400 });
  }
}