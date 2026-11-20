import Link from "next/link";
import { Package, Shield, Truck, CheckCircle, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { formatPrice, formatDate } from "@/lib/utils";
import { ConfirmReceiptButton } from "./ConfirmReceiptButton";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  SHIPPED: "bg-blue-100 text-blue-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">My Orders</h1>
        <p className="mb-6">Please login to view orders</p>
        <Link href="/login" className="btn-primary">Login</Link>
      </div>
    );
  }

  const orders = await prisma.order.findMany({
    where: { buyerId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      listing: { select: { id: true, title: true, images: true } },
    },
  });

  const reviewedListingIds = new Set(
    (await prisma.review.findMany({ where: { userId: user.id }, select: { listingId: true } })).map(r => r.listingId)
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="font-serif text-4xl font-bold mb-2 flex items-center gap-3">
        <Package className="w-8 h-8" /> My Orders
      </h1>
      <p className="text-antique-600 dark:text-antique-300 mb-8">{orders.length} orders</p>

      {orders.length === 0 ? (
        <div className="card p-12 text-center">
          <Package className="w-16 h-16 mx-auto text-antique-300 mb-4" />
          <p className="text-lg font-semibold mb-2">No orders yet</p>
          <Link href="/listings" className="btn-primary mt-4">Browse Antiques</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => {
            const imgs = JSON.parse(o.listing.images);
            const hasReviewed = reviewedListingIds.has(o.listing.id);
            return (
              <div key={o.id} className="card p-5">
                <div className="flex gap-4">
                  <img src={imgs[0]} alt={o.listing.title} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link href={`/listings/${o.listing.id}`} className="font-serif font-bold text-lg hover:text-antique-700 dark:hover:text-gold-400">{o.listing.title}</Link>
                        <p className="text-xs text-antique-500">Order #{o.orderNumber}</p>
                        <p className="text-xs text-antique-500">Placed: {formatDate(o.createdAt)}</p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${STATUS_COLORS[o.status] || "bg-gray-100"}`}>{o.status}</span>
                    </div>
                    <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
                      <div className="flex items-center gap-3 text-sm text-antique-600 dark:text-antique-300">
                        <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> {o.paymentMethod}</span>
                        <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> {o.paymentStatus}</span>
                      </div>
                      <p className="font-bold text-lg">{formatPrice(o.totalAmount)}</p>
                    </div>

                    <div className="mt-3 flex gap-2 flex-wrap">
                      {o.status === "PENDING" && (
                        <ConfirmReceiptButton orderId={o.id} />
                      )}
                      {o.status === "DELIVERED" && !hasReviewed && (
                        <Link
                          href={`/listings/${o.listing.id}#review`}
                          className="flex items-center gap-1 bg-gold-500 hover:bg-gold-600 text-antique-950 text-sm font-semibold px-4 py-2 rounded-lg"
                        >
                          <Star className="w-4 h-4" /> Write Review
                        </Link>
                      )}
                      {o.status === "DELIVERED" && hasReviewed && (
                        <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400 font-semibold">
                          <CheckCircle className="w-4 h-4" /> Review submitted
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}