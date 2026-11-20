import Link from "next/link";
import { Package, DollarSign, Eye, TrendingUp, Plus, Edit } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { formatPrice, formatDate } from "@/lib/utils";

export default async function SellerDashboard() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Seller Dashboard</h1>
        <Link href="/login" className="btn-primary">Login</Link>
      </div>
    );
  }
  if (user.role !== "SELLER" && user.role !== "ADMIN") {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Seller Access Required</h1>
        <p className="mb-6">Your account is a Buyer account. Please signup as a Seller to sell items.</p>
        <Link href="/signup" className="btn-primary">Create Seller Account</Link>
      </div>
    );
  }

  const listings = await prisma.listing.findMany({
    where: { sellerId: user.id },
    orderBy: { createdAt: "desc" },
    include: { bids: true, orders: true },
  });

  const totalListings = listings.length;
  const soldItems = listings.filter(l => l.status === "SOLD").length;
  const activeListings = listings.filter(l => l.status === "APPROVED").length;
  const totalViews = listings.reduce((s, l) => s + l.views, 0);
  const totalRevenue = listings.filter(l => l.status === "SOLD").reduce((s, l) => s + (l.price || 0), 0);
  const totalBids = listings.reduce((s, l) => s + l.bids.length, 0);

  const stats = [
    { icon: Package, label: "Active Listings", value: String(activeListings), color: "bg-blue-500" },
    { icon: DollarSign, label: "Total Revenue", value: formatPrice(totalRevenue), color: "bg-green-500" },
    { icon: Eye, label: "Total Views", value: String(totalViews), color: "bg-purple-500" },
    { icon: TrendingUp, label: "Total Bids", value: String(totalBids), color: "bg-gold-500" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl font-bold text-antique-900">Seller Dashboard</h1>
          <p className="text-antique-600">Welcome back, {user.name}</p>
        </div>
        <Link href="/sell" className="btn-primary flex items-center gap-2"><Plus className="w-5 h-5" /> New Listing</Link>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card p-5 text-center">
          <p className="text-2xl font-bold">{totalListings}</p>
          <p className="text-sm text-antique-600">Total Listings</p>
        </div>
        <div className="card p-5 text-center">
          <p className="text-2xl font-bold">{soldItems}</p>
          <p className="text-sm text-antique-600">Sold Items</p>
        </div>
        <div className="card p-5 text-center">
          <p className="text-2xl font-bold">{activeListings}</p>
          <p className="text-sm text-antique-600">Active</p>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-bold text-xl mb-4">Your Listings</h3>
        {listings.length === 0 ? (
          <div className="text-center py-8">
            <Package className="w-12 h-12 mx-auto text-antique-300 mb-3" />
            <p className="mb-4">You haven't listed anything yet</p>
            <Link href="/sell" className="btn-primary">List Your First Antique</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {listings.map((l) => {
              const imgs = JSON.parse(l.images);
              return (
                <div key={l.id} className="flex items-center gap-4 p-3 border border-antique-100 rounded-lg">
                  <img loading="lazy" src={imgs[0]} alt={l.title} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <Link href={`/listings/${l.id}`} className="font-semibold hover:text-antique-700 line-clamp-1">{l.title}</Link>
                    <p className="text-xs text-antique-500">
                      {l.category} · {l.views} views · {l.bids.length} bids · Created {formatDate(l.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{l.price ? formatPrice(l.price) : l.startingBid ? `Bid ${formatPrice(l.startingBid)}` : "—"}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      l.status === "APPROVED" ? "bg-green-100 text-green-800" :
                      l.status === "SOLD" ? "bg-blue-100 text-blue-800" :
                      l.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-700"
                    }`}>{l.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}