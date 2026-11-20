import Link from "next/link";
import { Star, Filter, Search } from "lucide-react";
import WishlistButton from "@/components/listing/WishlistButton";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

const CATEGORIES = ["Furniture", "Paintings", "Coins", "Jewelry", "Ceramics", "Watches", "Textiles", "Sculpture"];
const CONDITIONS = ["Mint", "Excellent", "Good", "Restored", "Fair", "As-Is"];
const RARITIES = ["Common", "Rare", "Very Rare", "Museum-grade"];

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const category = typeof sp.category === "string" ? sp.category : undefined;
  const condition = typeof sp.condition === "string" ? sp.condition : undefined;
  const rarity = typeof sp.rarity === "string" ? sp.rarity : undefined;
  const q = typeof sp.q === "string" ? sp.q : undefined;
  const minPrice = typeof sp.min === "string" ? Number(sp.min) : undefined;
  const maxPrice = typeof sp.max === "string" ? Number(sp.max) : undefined;

  const where: any = { status: "APPROVED" };
  if (category) where.category = category;
  if (condition) where.condition = condition;
  if (rarity) where.rarity = rarity;
  if (q) where.OR = [{ title: { contains: q } }, { description: { contains: q } }];
  if (minPrice || maxPrice) where.price = {};
  if (minPrice) where.price.gte = minPrice;
  if (maxPrice) where.price.lte = maxPrice;

  const listings = await prisma.listing.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { seller: { select: { name: true } } },
  });

  function buildQuery(key: string, value: string) {
    const params = new URLSearchParams();
    Object.entries(sp).forEach(([k, v]) => {
      if (typeof v === "string") params.set(k, v);
    });
    if (params.get(key) === value) params.delete(key);
    else params.set(key, value);
    return `/listings?${params.toString()}`;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-antique-900 mb-2">All Antiques</h1>
      <p className="text-antique-600 mb-6">{listings.length} treasures available</p>

      {/* Search bar */}
      <form action="/listings" className="mb-8">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-antique-400" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Search by title or description..."
            className="input-field pl-12 pr-32"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary py-2 px-4 text-sm">Search</button>
        </div>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 card p-6 h-fit sticky top-24">
          <h3 className="font-bold flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5" /> Filters
            {(category || condition || rarity || q) && (
              <Link href="/listings" className="ml-auto text-xs text-red-600 hover:underline">Clear</Link>
            )}
          </h3>
          <div className="space-y-5">
            <div>
              <p className="font-semibold text-sm mb-2">Category</p>
              {CATEGORIES.map(c => (
                <Link key={c} href={buildQuery("category", c)} className={`block text-sm py-1 px-2 rounded ${category === c ? "bg-antique-100 font-semibold text-antique-900" : "hover:bg-antique-50"}`}>
                  {c}
                </Link>
              ))}
            </div>
            <div>
              <p className="font-semibold text-sm mb-2">Condition</p>
              {CONDITIONS.map(c => (
                <Link key={c} href={buildQuery("condition", c)} className={`block text-sm py-1 px-2 rounded ${condition === c ? "bg-antique-100 font-semibold text-antique-900" : "hover:bg-antique-50"}`}>
                  {c}
                </Link>
              ))}
            </div>
            <div>
              <p className="font-semibold text-sm mb-2">Rarity</p>
              {RARITIES.map(c => (
                <Link key={c} href={buildQuery("rarity", c)} className={`block text-sm py-1 px-2 rounded ${rarity === c ? "bg-antique-100 font-semibold text-antique-900" : "hover:bg-antique-50"}`}>
                  {c}
                </Link>
              ))}
            </div>
            <form action="/listings" className="space-y-2">
              <p className="font-semibold text-sm">Price Range (PKR)</p>
              <div className="flex gap-2">
                <input name="min" type="number" placeholder="Min" defaultValue={minPrice} className="input-field text-sm" />
                <input name="max" type="number" placeholder="Max" defaultValue={maxPrice} className="input-field text-sm" />
              </div>
              <button className="btn-outline w-full text-sm py-2">Apply Price</button>
            </form>
          </div>
        </aside>

        <div className="lg:col-span-3">
          {listings.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-lg font-semibold mb-2">No listings found</p>
              <p className="text-sm text-antique-600 mb-4">Try adjusting your filters</p>
              <Link href="/listings" className="btn-primary">Clear Filters</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((l) => {
                const imgs = JSON.parse(l.images);
                return (
                  <Link key={l.id} href={`/listings/${l.id}`} className="card overflow-hidden group">
                    <div className="relative h-56 overflow-hidden">
                      <img loading="lazy" src={imgs[0]} alt={l.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <span className="absolute top-3 left-3 bg-gold-500 text-white text-xs px-2 py-1 rounded-full">{l.rarity}</span>
                      <div className="absolute top-3 right-3"><WishlistButton listingId={l.id} size="sm" /></div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-antique-500 mb-1">{l.era}</p>
                      <h3 className="font-serif font-bold mb-2 line-clamp-1">{l.title}</h3>
                      <div className="flex items-center gap-1 mb-2 text-xs"><Star className="w-3 h-3 fill-gold-500 text-gold-500" /> 4.9 · {l.seller.name}</div>
                      <p className="font-bold text-lg text-antique-900">{l.price ? formatPrice(l.price) : "Auction"}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}