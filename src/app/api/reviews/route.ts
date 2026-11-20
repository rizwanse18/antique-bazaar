import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const listingId = searchParams.get("listingId");
  if (!listingId) return NextResponse.json({ error: "Missing listingId" }, { status: 400 });

  const reviews = await prisma.review.findMany({
    where: { listingId },
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true } } },
  });

  const avg = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  return NextResponse.json({ reviews, avg: Math.round(avg * 10) / 10, count: reviews.length });
}

const schema = z.object({
  listingId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Login required" }, { status: 401 });

    const body = await req.json();
    const data = schema.parse(body);

    // MUST have a DELIVERED order
    const deliveredOrder = await prisma.order.findFirst({
      where: {
        buyerId: user.id,
        listingId: data.listingId,
        status: "DELIVERED",
      },
    });
    if (!deliveredOrder) {
      return NextResponse.json({
        error: "You can only review items that have been delivered to you"
      }, { status: 403 });
    }

    const existing = await prisma.review.findFirst({
      where: { userId: user.id, listingId: data.listingId },
    });
    if (existing) {
      return NextResponse.json({ error: "You already reviewed this item" }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: { listingId: data.listingId, userId: user.id, rating: data.rating, comment: data.comment },
      include: { user: { select: { name: true } } },
    });

    return NextResponse.json({ review });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed" }, { status: 400 });
  }
}