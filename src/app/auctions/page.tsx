import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import AuctionCountdown from "@/components/listing/AuctionCountdown";

export default async function AuctionsPage() {
  const auctions = await prisma.listing.findMany({
    where: {
      status: "APPROVED",
      saleType: "AUCTION",
      auctionEnd: { gt: new Date() },
    },
    orderBy: { auctionEnd: "asc" },
    include: {
      seller: { select: { name: true } },
      bids: { orderBy: { amount: "desc" }, take: 1 },
    },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <span className="inline-flex items-center gap-2 bg-red-500/10 text-red-600 px-3 py-1 rounded-full text-xs mb-3">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> LIVE NOW
      </span>
      <h1 className="font-serif text-4xl font-bold text-antique-900 mb-2">Live Auctions</h1>
      <p className="text-antique-600 mb-8">{auctions.length} auctions active</p>

      {auctions.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-lg font-semibold mb-2">No live auctions right now</p>
          <p className="text-sm text-antique-600 mb-4">Check back soon or browse fixed-price listings</p>
          <Link href="/listings" className="btn-primary">Browse Listings</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {auctions.map((a) => {
            const imgs = JSON.parse(a.images);
            const currentBid = a.bids[0]?.amount || a.startingBid || 0;
            return (
              <Link key={a.id} href={`/listings/${a.id}`} className="card overflow-hidden group">
                <div className="relative h-56">
                  <img loading="lazy" src={imgs[0]} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <AuctionCountdown endTime={a.auctionEnd!} compact />
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold mb-2 line-clamp-1">{a.title}</h3>
                  <p className="text-xs text-antique-500">Current Bid</p>
                  <p className="text-2xl font-bold text-gold-500 mb-3">{formatPrice(currentBid)}</p>
                  <div className="flex items-center justify-between text-xs text-antique-500 mb-4">
                    <span>{a.bids.length} bids</span>
                    <span>Start: {formatPrice(a.startingBid || 0)}</span>
                  </div>
                  <button className="btn-secondary w-full text-sm py-2">Place Bid</button>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}