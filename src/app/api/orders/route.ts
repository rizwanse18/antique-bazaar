import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Login required" }, { status: 401 });

  const orders = await prisma.order.findMany({
    where: { buyerId: user.id },
    orderBy: { createdAt: "desc" },
    include: { listing: { select: { id: true, title: true, images: true } } },
  });
  return NextResponse.json({ orders });
}

const orderSchema = z.object({
  items: z.array(z.object({ listingId: z.string(), price: z.number() })).min(1),
  paymentMethod: z.string(),
  customer: z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    mobile: z.string().min(10),
    address: z.string().min(10),
    city: z.string().min(2),
  }),
});

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Please login" }, { status: 401 });

    const body = await req.json();
    const data = orderSchema.parse(body);

    // Update user profile with latest customer info
    await prisma.user.update({
      where: { id: user.id },
      data: {
        mobile: data.customer.mobile,
        address: data.customer.address,
        city: data.customer.city,
      },
    });

    const created = [];
    for (const item of data.items) {
      const listing = await prisma.listing.findUnique({ where: { id: item.listingId } });
      if (!listing) continue;
      if (listing.status !== "APPROVED") continue;
      if (listing.saleType === "AUCTION") continue;

      const order = await prisma.order.create({
        data: {
          orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          totalAmount: item.price * 1.02,
          status: "PENDING",
          paymentMethod: data.paymentMethod,
          paymentStatus: data.paymentMethod === "ESCROW" ? "ESCROW_HELD" : "PAID",
          shippingAddr: `${data.customer.fullName}, ${data.customer.mobile}, ${data.customer.email} — ${data.customer.address}, ${data.customer.city}`,
          listingId: item.listingId,
          buyerId: user.id,
        },
      });
      await prisma.listing.update({ where: { id: item.listingId }, data: { status: "SOLD" } });
      created.push(order);
    }

    return NextResponse.json({ orders: created });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Order failed" }, { status: 400 });
  }
}