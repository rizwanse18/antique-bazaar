import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Please login first" }, { status: 401 });

    const { listingId } = await req.json();
    if (!listingId) return NextResponse.json({ error: "Missing listingId" }, { status: 400 });

    const listing = await prisma.listing.findUnique({ where: { id: listingId } });
    if (!listing) return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    if (listing.sellerId === user.id) return NextResponse.json({ error: "Cannot buy your own item" }, { status: 400 });
    if (listing.status !== "APPROVED") return NextResponse.json({ error: "Item not available" }, { status: 400 });
    if (!listing.buyNowPrice) return NextResponse.json({ error: "Buy Now not available" }, { status: 400 });

    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        totalAmount: listing.buyNowPrice * 1.02,
        status: "PENDING",
        paymentMethod: "ESCROW",
        paymentStatus: "ESCROW_HELD",
        shippingAddr: "To be confirmed",
        listingId: listing.id,
        buyerId: user.id,
      },
    });

    await prisma.listing.update({
      where: { id: listingId },
      data: { status: "SOLD" },
    });

    return NextResponse.json({ order });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed" }, { status: 400 });
  }
}