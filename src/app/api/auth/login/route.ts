import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signToken } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[LOGIN] Attempt:", body.email);

    const data = schema.parse(body);

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    console.log("[LOGIN] User found:", user ? user.email : "NOT FOUND");
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const ok = await verifyPassword(data.password, user.password);
    console.log("[LOGIN] Password valid:", ok);
    if (!ok) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = signToken({ userId: user.id, email: user.email, role: user.role });
    console.log("[LOGIN] Success for:", user.email);

    const res = NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
    res.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch (err: any) {
    console.error("[LOGIN] Error:", err.message);
    return NextResponse.json({ error: err.message || "Login failed" }, { status: 400 });
  }
}