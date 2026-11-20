import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Login required" }, { status: 401 });

  const complaints = await prisma.complaint.findMany({
    where: user.role === "ADMIN" ? {} : { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true, role: true } } },
  });
  return NextResponse.json({ complaints });
}

const schema = z.object({
  subject: z.string().min(5),
  category: z.enum(["ORDER", "PAYMENT", "LISTING", "ACCOUNT", "OTHER"]),
  description: z.string().min(10),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
});

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Please login to submit a complaint" }, { status: 401 });

    const body = await req.json();
    const data = schema.parse(body);

    const complaint = await prisma.complaint.create({
      data: { ...data, userId: user.id },
    });

    return NextResponse.json({ complaint });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to submit" }, { status: 400 });
  }
}