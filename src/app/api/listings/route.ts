import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const where: any = { status: "APPROVED" };
  if (category) where.category = category;
  if (search) where.title = { contains: search };

  const listings = await prisma.listing.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { seller: { select: { id: true, name: true } } },
  });
  return NextResponse.json({ listings });
}

const createSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string(),
  era: z.string().optional(),
  origin: z.string().optional(),
  material: z.string().optional(),
  dimensions: z.string().optional(),
  weight: z.string().optional(),
  condition: z.string(),
  conditionNotes: z.string().optional(),
  provenance: z.string().optional(),
  restoration: z.string().optional(),
  rarity: z.string().default("Common"),
  estimatedValue: z.string().optional(),
  shippingNotes: z.string().optional(),
  images: z.array(z.string()).min(1),
  saleType: z.enum(["FIXED", "AUCTION"]).default("FIXED"),
  price: z.number().optional(),
  startingBid: z.number().optional(),
  auctionDays: z.number().min(1).max(30).optional(),
  reservePrice: z.number().optional(),
  buyNowPrice: z.number().optional(),
});

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Please login first" }, { status: 401 });
    if (user.role !== "SELLER" && user.role !== "ADMIN") {
      return NextResponse.json({ error: "Only sellers can create listings" }, { status: 403 });
    }

    const body = await req.json();
    const data = createSchema.parse(body);

    const listing = await prisma.listing.create({
      data: {
        ...data,
        images: JSON.stringify(data.images),
        sellerId: user.id,
        status: "APPROVED",
        legalConfirmed: true,
      },
    });

    return NextResponse.json({ listing });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create" }, { status: 400 });
  }
}
