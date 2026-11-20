"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Gavel, TrendingUp, User } from "lucide-react";
import toast from "react-hot-toast";
import AuctionCountdown from "./AuctionCountdown";
import { formatPrice } from "@/lib/utils";

type Bid = { id: string; amount: number; createdAt: string; user: { id: string; name: string } };

export default function BidPanel({
  listingId,
  startingBid,
  buyNowPrice,
  auctionEnd,
  sellerId,
  isLoggedIn,
}: {
  listingId: string;
  startingBid: number;
  buyNowPrice?: number | null;
  auctionEnd: string | Date;
  sellerId: string;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const [bids, setBids] = useState<Bid[]>([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [buying, setBuying] = useState(false);
  const [endTime, setEndTime] = useState(auctionEnd);

  async function loadBids() {
    const res = await fetch(`/api/bids?listingId=${listingId}`);
    const data = await res.json();
    setBids(data.bids || []);
  }

  useEffect(() => {
    loadBids();
    const i = setInterval(loadBids, 5000);
    return () => clearInterval(i);
  }, [listingId]);

  const highest = bids[0]?.amount || 0;
  const minNext = highest ? Math.ceil(highest * 1.05) : startingBid;

  async function placeBid(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Please login to bid");
      router.push("/login");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/bids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, amount: Number(amount) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("Bid placed! You are now the highest bidder");
      setAmount("");
      if (data.auctionEnd) setEndTime(data.auctionEnd);
      await loadBids();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleBuyNow() {
    if (!isLoggedIn) {
      toast.error("Please login to buy");
      router.push("/login");
      return;
    }
    if (!confirm(`Buy this item for ${formatPrice(buyNowPrice!)}?`)) return;

    setBuying(true);
    try {
      const res = await fetch("/api/buy-now", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("Purchase successful! Redirecting to orders...");
      router.push("/dashboard/orders");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setBuying(false);
    }
  }

  return (
    <div className="card p-6">
      <h3 className="font-serif font-bold text-xl mb-4 flex items-center gap-2">
        <Gavel className="w-5 h-5" /> Live Auction
      </h3>

      <AuctionCountdown endTime={endTime} />

      <div className="mt-6 p-4 bg-antique-50 dark:bg-antique-800 rounded-lg">
        <p className="text-xs text-antique-600 dark:text-antique-300 mb-1">Current Bid</p>
        <p className="text-3xl font-bold text-antique-900 dark:text-gold-400">
          {highest > 0 ? formatPrice(highest) : "No bids yet"}
        </p>
        <p className="text-xs text-antique-500 dark:text-antique-300 mt-1">
          {bids.length} bids · Starting: {formatPrice(startingBid)}
        </p>
      </div>

      {buyNowPrice && (
        <button
          onClick={handleBuyNow}
          disabled={buying}
          className="btn-secondary w-full mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {buying ? "Processing..." : `Buy Now for ${formatPrice(buyNowPrice)}`}
        </button>
      )}

      <form onSubmit={placeBid} className="mt-4 space-y-3">
        <div>
          <label className="text-sm font-semibold mb-1 block">
            Your Bid (min PKR {minNext.toLocaleString()})
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={String(minNext)}
            className="input-field"
            min={minNext}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
          <Gavel className="w-5 h-5" /> {loading ? "Placing..." : "Place Bid"}
        </button>
      </form>

      {bids.length > 0 && (
        <div className="mt-6">
          <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Bid History
          </h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {bids.map((b, i) => (
              <div key={b.id} className={`flex items-center justify-between p-2 rounded text-sm ${i === 0 ? "bg-gold-500/10 border border-gold-500" : "bg-antique-50 dark:bg-antique-800"}`}>
                <div className="flex items-center gap-2">
                  <User className="w-3 h-3 text-antique-500" />
                  <span className={i === 0 ? "font-bold" : ""}>{b.user.name}</span>
                  {i === 0 && <span className="text-xs bg-gold-500 text-white px-2 py-0.5 rounded">Top</span>}
                </div>
                <span className="font-semibold">{formatPrice(b.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}