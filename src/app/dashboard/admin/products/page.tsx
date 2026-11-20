import Link from "next/link";
import { Package, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { formatPrice, formatDate } from "@/lib/utils";
import { ProductRow } from "./ProductRow";

export default async function AdminProducts() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Admin Access Only</h1>
        <Link href="/dashboard" className="btn-primary">Dashboard</Link>
      </div>
    );
  }

  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      seller: { select: { name: true, email: true } },
      _count: { select: { bids: true, orders: true, reviews: true } },
    },
  });

  const counts = {
    all: listings.length,
    pending: listings.filter(l => l.status === "PENDING").length,
    approved: listings.filter(l => l.status === "APPROVED").length,
    sold: listings.filter(l => l.status === "SOLD").length,
    rejected: listings.filter(l => l.status === "REJECTED").length,
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-4xl font-bold mb-2 flex items-center gap-3">
            <Package className="w-8 h-8" /> Manage Products
          </h1>
          <p className="text-antique-600">Full control over all listings</p>
        </div>
        <Link href="/dashboard/admin" className="btn-outline text-sm">← Admin</Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {[
          { label: "All", value: counts.all, color: "bg-gray-100" },
          { label: "Pending", value: counts.pending, color: "bg-yellow-100" },
          { label: "Approved", value: counts.approved, color: "bg-green-100" },
          { label: "Sold", value: counts.sold, color: "bg-blue-100" },
          { label: "Rejected", value: counts.rejected, color: "bg-red-100" },
        ].map(c => (
          <div key={c.label} className={`${c.color} p-4 rounded-lg text-center`}>
            <p className="text-2xl font-bold">{c.value}</p>
            <p className="text-xs font-semibold">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-antique-50 text-left">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Seller</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
                <th className="p-3">Stats</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map(l => (
                <ProductRow key={l.id} listing={{
                  id: l.id,
                  title: l.title,
                  category: l.category,
                  images: l.images,
                  price: l.price,
                  startingBid: l.startingBid,
                  status: l.status,
                  featured: l.featured,
                  createdAt: l.createdAt.toISOString(),
                  sellerName: l.seller.name,
                  sellerEmail: l.seller.email,
                  bidsCount: l._count.bids,
                  ordersCount: l._count.orders,
                  reviewsCount: l._count.reviews,
                }} />
              ))}
            </tbody>
          </table>
        </div>
        {listings.length === 0 && (
          <p className="text-center py-10 text-antique-500">No products yet</p>
        )}
      </div>
    </div>
  );
}