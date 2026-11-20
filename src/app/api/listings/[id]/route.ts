import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { seller: { select: { id: true, name: true, avatar: true } } },
  });
  if (!listing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await prisma.listing.update({ where: { id }, data: { views: { increment: 1 } } });
  return NextResponse.json({ listing: { ...listing, images: JSON.parse(listing.images) } });
}

