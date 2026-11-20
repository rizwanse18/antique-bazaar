import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Login required" }, { status: 401 });

  const full = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true, name: true, email: true, role: true,
      phone: true, mobile: true, address: true, city: true,
      cnic: true, profilePic: true, bio: true,
      kycVerified: true, createdAt: true,
    },
  });
  return NextResponse.json({ user: full });
}

const schema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  cnic: z.string().optional(),
  profilePic: z.string().url().optional().or(z.literal("")),
  bio: z.string().optional(),
});

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Login required" }, { status: 401 });

    const body = await req.json();
    const data = schema.parse(body);

    const updated = await prisma.user.update({
      where: { id: user.id },
      data,
    });
    return NextResponse.json({ user: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed" }, { status: 400 });
  }
}