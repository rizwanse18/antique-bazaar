import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./ProfileForm";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Profile</h1>
        <Link href="/login" className="btn-primary">Login</Link>
      </div>
    );
  }

  const full = await prisma.user.findUnique({ where: { id: user.id } });
  if (!full) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-serif text-4xl font-bold mb-2">My Profile</h1>
      <p className="text-antique-600 dark:text-antique-300 mb-8">Manage your personal information</p>
      <ProfileForm initial={JSON.parse(JSON.stringify(full))} />
    </div>
  );
}