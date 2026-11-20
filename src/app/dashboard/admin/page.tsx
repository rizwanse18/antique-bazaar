import { ApproveButton } from "./ApproveButton";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Users, Package, DollarSign, Clock, ShieldCheck, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { formatPrice, formatDate } from "@/lib/utils";

export default async function AdminDashboard() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Admin Access Only</h1>
        <p className="mb-6">This page requires admin privileges.</p>
        <Link href="/dashboard" className="btn-primary">Go to Dashboard</Link>
      </div>
    );
  }

  const [userCount, listingCount, pendingListings, orderCount, revenueData, recentUsers, recentListings] = await Promise.all([
    prisma.user.count(),
    prisma.listing.count(),
    prisma.listing.findMany({ where: { status: "PENDING" }, take: 10, include: { seller: { select: { name: true } } } }),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { totalAmount: true } }),
    prisma.user.findMany({ take: 5, orderBy: { createdAt: "desc" }, select: { id: true, name: true, email: true, role: true, createdAt: true } }),
    prisma.listing.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { seller: { select: { name: true } } } }),
  ]);

  const stats = [
    { icon: Users, label: "Total Users", value: String(userCount), color: "bg-blue-500" },
    { icon: Package, label: "Total Listings", value: String(listingCount), color: "bg-purple-500" },
    { icon: Clock, label: "Pending Approval", value: String(pendingListings.length), color: "bg-yellow-500" },
    { icon: DollarSign, label: "Total Revenue", value: formatPrice(revenueData._sum.totalAmount || 0), color: "bg-green-500" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-antique-900 mb-2 flex items-center gap-3">
        <ShieldCheck className="w-8 h-8" /> Admin Panel
      </h1>
      <p className="text-antique-600 mb-8">Platform overview and moderation</p>

            <div className="mb-8">
        <Link href="/dashboard/admin/complaints" className="card p-6 flex items-center justify-between hover:scale-[1.01] transition">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-lg">Complaints Center</p>
              <p className="text-sm text-antique-600">View and respond to customer complaints</p>
            </div>
          </div>
          <span className="text-antique-700 font-semibold">Open →</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link href="/dashboard/admin/products" className="card p-6 flex items-center gap-3 hover:scale-[1.02] transition">
          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center"><Package className="w-6 h-6 text-white" /></div>
          <div>
            <p className="font-bold">Products</p>
            <p className="text-xs text-antique-500">Manage / delete / edit listings</p>
          </div>
        </Link>
        <Link href="/dashboard/admin/users" className="card p-6 flex items-center gap-3 hover:scale-[1.02] transition">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center"><Users className="w-6 h-6 text-white" /></div>
          <div>
            <p className="font-bold">Users</p>
            <p className="text-xs text-antique-500">Roles, ban, delete accounts</p>
          </div>
        </Link>
        <Link href="/dashboard/admin/complaints" className="card p-6 flex items-center gap-3 hover:scale-[1.02] transition">
          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center"><AlertCircle className="w-6 h-6 text-white" /></div>
          <div>
            <p className="font-bold">Complaints</p>
            <p className="text-xs text-antique-500">Respond to user issues</p>
          </div>
        </Link>
      </div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="card p-6">
            <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-4`}>
              <s.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-antique-900">{s.value}</p>
            <p className="text-sm text-antique-600">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Users className="w-5 h-5" /> Recent Users</h3>
          <div className="space-y-2">
            {recentUsers.map(u => (
              <div key={u.id} className="flex justify-between p-3 bg-antique-50 rounded-lg">
                <div>
                  <p className="font-semibold text-sm">{u.name}</p>
                  <p className="text-xs text-antique-500">{u.email}</p>
                </div>
                <span className="text-xs bg-antique-200 px-2 py-0.5 rounded-full self-center">{u.role}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Package className="w-5 h-5" /> Recent Listings</h3>
          <div className="space-y-2">
            {recentListings.map(l => (
              <Link key={l.id} href={`/listings/${l.id}`} className="flex justify-between p-3 bg-antique-50 rounded-lg hover:bg-antique-100">
                <div className="min-w-0">
                  <p className="font-semibold text-sm line-clamp-1">{l.title}</p>
                  <p className="text-xs text-antique-500">{l.seller.name} · {formatDate(l.createdAt)}</p>
                </div>
                <span className="text-xs bg-antique-200 px-2 py-0.5 rounded-full self-center">{l.status}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {pendingListings.length > 0 && (
        <div className="card p-6 mt-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-yellow-600" /> Pending Approval ({pendingListings.length})</h3>
          <div className="space-y-2">
            {pendingListings.map(l => (
              <div key={l.id} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-semibold text-sm">{l.title}</p>
                  <p className="text-xs text-antique-500">by {l.seller.name}</p>
                </div>
                <div className="flex gap-2">
                  <ApproveButton listingId={l.id} action="APPROVED" />
                  <ApproveButton listingId={l.id} action="REJECTED" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
