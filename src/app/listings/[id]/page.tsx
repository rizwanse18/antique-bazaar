import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { getCurrentUser } from "@/lib/session";
import { Star, Shield, Truck, BadgeCheck, MessageCircle, Gavel } from "lucide-react";
import AddToCartButton from "@/components/listing/AddToCartButton";
import WishlistButton from "@/components/listing/WishlistButton";
import ReviewSection from "@/components/listing/ReviewSection";
import BidPanel from "@/components/listing/BidPanel";

export default async function ListingDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [listing, user] = await Promise.all([
    prisma.listing.findUnique({
      where: { id },
      include: { seller: { select: { name: true, id: true } } },
    }),
    getCurrentUser(),
  ]);
  if (!listing) notFound();
  const imgs: string[] = JSON.parse(listing.images);

  const isAuction = listing.saleType === "AUCTION" && listing.auctionEnd;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="rounded-2xl overflow-hidden mb-4">
            <img loading="lazy" src={imgs[0]} alt={listing.title} className="w-full h-[500px] object-cover" />
          </div>
          {imgs.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {imgs.map((img, i) => (
                <img loading="lazy" key={i} src={img} alt="" className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-70" />
              ))}
            </div>
          )}
        </div>
        <div>
          <span className="inline-block bg-gold-500 text-white text-xs px-3 py-1 rounded-full mb-3">{listing.rarity}</span>
          <h1 className="font-serif text-4xl font-bold text-antique-900 mb-2">{listing.title}</h1>
          <p className="text-antique-600 mb-4">{listing.era} · {listing.category}</p>
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 fill-gold-500 text-gold-500" />
            <span className="font-bold">4.9</span>
            <span className="text-sm text-antique-500">· {listing.seller.name}</span>
          </div>

          {isAuction ? (
            <BidPanel
              listingId={listing.id}
              startingBid={listing.startingBid || 0}
              buyNowPrice={listing.buyNowPrice}
              auctionEnd={listing.auctionEnd!}
              sellerId={listing.seller.id}
              isLoggedIn={!!user}
            />
          ) : (
            <>
              <p className="text-4xl font-bold text-antique-900 mb-6">
                {listing.price ? formatPrice(listing.price) : "Price on request"}
              </p>
              <div className="flex gap-3 mb-6">
                {listing.price ? (
                  <AddToCartButton listing={{ id: listing.id, title: listing.title, price: listing.price, image: imgs[0], sellerName: listing.seller.name }} />
                ) : (
                  <button className="btn-primary flex-1" disabled>Contact Seller</button>
                )}
                <button className="btn-outline flex-1 flex items-center justify-center gap-2"><MessageCircle className="w-5 h-5" /> Make Offer</button>
                <div className="border-2 border-antique-200 rounded-lg hover:border-antique-600 flex items-center justify-center">
                  <WishlistButton listingId={listing.id} size="lg" />
                </div>
              </div>
            </>
          )}

          <div className="space-y-3 mb-6 mt-6">
            {[{icon: Shield, t: "Escrow Protected"}, {icon: Truck, t: "Insured Shipping"}, {icon: BadgeCheck, t: "Expert Verified"}].map((b, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-antique-50 rounded-lg">
                <b.icon className="w-5 h-5 text-antique-700" /> <span className="text-sm">{b.t}</span>
              </div>
            ))}
          </div>

          <div className="card p-5">
            <h3 className="font-bold mb-3">Description</h3>
            <p className="text-sm text-antique-700 mb-4">{listing.description}</p>
            <h3 className="font-bold mb-3">Details</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-antique-500">Condition</dt><dd className="font-semibold">{listing.condition}</dd></div>
              <div className="flex justify-between"><dt className="text-antique-500">Era</dt><dd className="font-semibold">{listing.era || "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-antique-500">Origin</dt><dd className="font-semibold">{listing.origin || "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-antique-500">Material</dt><dd className="font-semibold">{listing.material || "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-antique-500">Provenance</dt><dd className="font-semibold">{listing.provenance || "—"}</dd></div>
            
          <ReviewSection
            listingId={listing.id}
            canReview={!!user && !!(await prisma.order.findFirst({ where: { buyerId: user.id, listingId: listing.id, status: "DELIVERED" } }))}
          /></dl>
          </div>
        </div>
      </div>
    </div>
  );
}