import Link from "next/link";
import { Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { UserRow } from "./UserRow";

export default async function AdminUsers() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Admin Access Only</h1>
        <Link href="/dashboard" className="btn-primary">Dashboard</Link>
      </div>
    );
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true, name: true, email: true, role: true,
      kycVerified: true, isActive: true, createdAt: true, emailVerified: true,
      _count: { select: { listings: true, orders: true, bids: true } },
    },
  });

  const counts = {
    all: users.length,
    buyers: users.filter(u => u.role === "BUYER").length,
    sellers: users.filter(u => u.role === "SELLER").length,
    admins: users.filter(u => u.role === "ADMIN").length,
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-4xl font-bold mb-2 flex items-center gap-3">
            <Users className="w-8 h-8" /> Manage Users
          </h1>
          <p className="text-antique-600">Change roles, ban, or delete users</p>
        </div>
        <Link href="/dashboard/admin" className="btn-outline text-sm">← Admin</Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold">{counts.all}</p><p className="text-xs font-semibold">All</p></div>
        <div className="bg-blue-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold">{counts.buyers}</p><p className="text-xs font-semibold">Buyers</p></div>
        <div className="bg-gold-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold">{counts.sellers}</p><p className="text-xs font-semibold">Sellers</p></div>
        <div className="bg-red-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold">{counts.admins}</p><p className="text-xs font-semibold">Admins</p></div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-antique-50 text-left">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Role</th>
                <th className="p-3">KYC</th>
                <th className="p-3">Status</th>
                <th className="p-3">Stats</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <UserRow key={u.id} currentUserId={user.id} user={{
                  id: u.id, name: u.name, email: u.email, role: u.role,
                  kycVerified: u.kycVerified, isActive: u.isActive,
                  createdAt: u.createdAt.toISOString(),
                  listings: u._count.listings, orders: u._count.orders, bids: u._count.bids,
                }} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}