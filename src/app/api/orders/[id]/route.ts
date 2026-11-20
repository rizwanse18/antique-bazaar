import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Login required" }, { status: 401 });

  const { id } = await params;
  const { status } = await req.json();

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  // Buyer can mark as DELIVERED only
  if (order.buyerId !== user.id) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }
  if (status !== "DELIVERED") {
    return NextResponse.json({ error: "Only DELIVERED status can be set by buyer" }, { status: 400 });
  }

  const updated = await prisma.order.update({
    where: { id },
    data: { status: "DELIVERED" },
  });
  return NextResponse.json({ order: updated });
}