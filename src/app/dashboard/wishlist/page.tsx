import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export default async function WishlistPage() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Wishlist</h1>
        <p className="mb-6">Please login to view your wishlist</p>
        <Link href="/login" className="btn-primary">Login</Link>
      </div>
    );
  }

  const items = await prisma.wishlist.findMany({
    where: { userId: user.id },
    include: { listing: { include: { seller: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-antique-900 mb-2 flex items-center gap-3">
        <Heart className="w-8 h-8 text-red-500" /> My Wishlist
      </h1>
      <p className="text-antique-600 mb-8">{items.length} saved treasures</p>

      {items.length === 0 ? (
        <div className="card p-12 text-center">
          <Heart className="w-16 h-16 mx-auto text-antique-300 mb-4" />
          <p className="text-lg font-semibold mb-2">Your wishlist is empty</p>
          <p className="text-sm text-antique-600 mb-6">Save your favorite antiques here</p>
          <Link href="/listings" className="btn-primary">Browse Antiques</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((w) => {
            const imgs = JSON.parse(w.listing.images);
            return (
              <Link key={w.id} href={`/listings/${w.listing.id}`} className="card overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  <img loading="lazy" src={imgs[0]} alt={w.listing.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-antique-500 mb-1">{w.listing.era}</p>
                  <h3 className="font-serif font-bold mb-2 line-clamp-1">{w.listing.title}</h3>
                  <div className="flex items-center gap-1 mb-2 text-xs"><Star className="w-3 h-3 fill-gold-500 text-gold-500" /> 4.9 · {w.listing.seller.name}</div>
                  <p className="font-bold text-lg text-antique-900">{w.listing.price ? formatPrice(w.listing.price) : "Auction"}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}