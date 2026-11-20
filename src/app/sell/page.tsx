"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

export default function SellPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([""]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validImages = imageUrls.filter(u => u.trim()); if (validImages.length === 0) { toast.error("Add at least one image URL"); return; }
    setLoading(true);
    const f = new FormData(e.currentTarget);
    const saleType = f.get("saleType") as string;
    const body: any = {
      title: f.get("title"),
      description: f.get("description"),
      category: f.get("category"),
      era: f.get("era") || undefined,
      origin: f.get("origin") || undefined,
      material: f.get("material") || undefined,
      dimensions: f.get("dimensions") || undefined,
      condition: f.get("condition"),
      conditionNotes: f.get("conditionNotes") || undefined,
      provenance: f.get("provenance") || undefined,
      restoration: f.get("restoration") || undefined,
      rarity: f.get("rarity") || "Common",
      images: validImages,
      saleType,
      price: saleType === "FIXED" ? Number(f.get("price")) : undefined,
      startingBid: saleType === "AUCTION" ? Number(f.get("price")) : undefined,
      auctionDays: saleType === "AUCTION" ? Number(f.get("auctionDays") || 7) : undefined,
    };
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast.success("Listing created!");
      router.push(`/listings/${data.listing.id}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="font-serif text-4xl font-bold text-antique-900 mb-2">List Your Antique</h1>
      <p className="text-antique-600 mb-8">Fill in the details about your treasure</p>

      <form onSubmit={onSubmit} className="card p-8 space-y-6">
        <div>
          <label className="font-semibold mb-2 block">Images (min 1, max 5) *</label>
          <div className="space-y-2">
            {imageUrls.map((url, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={url}
                  onChange={(e) => {
                    const copy = [...imageUrls];
                    copy[i] = e.target.value;
                    setImageUrls(copy);
                  }}
                  className="input-field flex-1"
                  required={i === 0}
                />
                {imageUrls.length > 1 && (
                  <button type="button" onClick={() => setImageUrls(imageUrls.filter((_, idx) => idx !== i))} className="px-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">✕</button>
                )}
              </div>
            ))}
            {imageUrls.length < 5 && (
              <button type="button" onClick={() => setImageUrls([...imageUrls, ""])} className="text-sm text-antique-700 font-semibold hover:underline">+ Add another image</button>
            )}
          </div>
          <p className="text-xs text-antique-500 mt-2">Paste Unsplash/Imgur URLs. First image = main.</p>
          {imageUrls[0] && <img loading="lazy" src={imageUrls[0]} alt="preview" className="mt-3 max-h-48 rounded-lg" />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div><label className="font-semibold mb-1 block">Title *</label><input name="title" className="input-field" placeholder="Mughal Era Brass Lamp" required /></div>
          <div><label className="font-semibold mb-1 block">Category *</label>
            <select name="category" className="input-field">
              <option>Furniture</option><option>Paintings</option><option>Coins</option><option>Jewelry</option><option>Ceramics</option><option>Watches</option><option>Textiles</option><option>Sculpture</option>
            </select>
          </div>
          <div><label className="font-semibold mb-1 block">Era / Period</label><input name="era" className="input-field" placeholder="Mughal, 1650 AD" /></div>
          <div><label className="font-semibold mb-1 block">Origin</label><input name="origin" className="input-field" placeholder="Pakistan" /></div>
          <div><label className="font-semibold mb-1 block">Material</label><input name="material" className="input-field" placeholder="Brass" /></div>
          <div><label className="font-semibold mb-1 block">Dimensions</label><input name="dimensions" className="input-field" placeholder="30 x 20 x 15 cm" /></div>
          <div><label className="font-semibold mb-1 block">Condition *</label>
            <select name="condition" className="input-field">
              <option>Mint</option><option>Excellent</option><option>Good</option><option>Fair</option><option>Restored</option><option>As-Is</option>
            </select>
          </div>
          <div><label className="font-semibold mb-1 block">Rarity</label>
            <select name="rarity" className="input-field">
              <option>Common</option><option>Rare</option><option>Very Rare</option><option>Museum-grade</option>
            </select>
          </div>
        </div>

        <div><label className="font-semibold mb-1 block">Description *</label><textarea name="description" className="input-field h-32" placeholder="Detailed description..." required></textarea></div>
        <div><label className="font-semibold mb-1 block">Provenance / History</label><textarea name="provenance" className="input-field h-20" placeholder="Ownership history..."></textarea></div>
        <div><label className="font-semibold mb-1 block">Restoration History</label><textarea name="restoration" className="input-field h-20" placeholder="Any repairs..."></textarea></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div><label className="font-semibold mb-1 block">Sale Type</label>
            <select name="saleType" className="input-field">
              <option value="FIXED">Fixed Price</option>
              <option value="AUCTION">Auction</option>
            </select>
          </div>
          <div><label className="font-semibold mb-1 block">Price / Starting Bid (PKR) *</label><input name="price" type="number" className="input-field" placeholder="125000" required /></div>
          <div><label className="font-semibold mb-1 block">Auction Duration (Days)</label><input name="auctionDays" type="number" min="1" max="30" defaultValue="7" className="input-field" /></div>
        </div>

        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" className="mt-1" required /> I confirm legal ownership and export compliance for this item.
        </label>

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? "Submitting..." : "Publish Listing"}
        </button>
      </form>
    </div>
  );
}
