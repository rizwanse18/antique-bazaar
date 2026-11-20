import Link from "next/link";
import { Search, ArrowRight, Gavel, Shield, Truck, BadgeCheck, Star, TrendingUp, MapPin, Sparkles, Clock, Users, ChevronRight, Flame, Zap, Award, Eye } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import AuctionCountdown from "@/components/listing/AuctionCountdown";
import WishlistButton from "@/components/listing/WishlistButton";
import SearchBar from "@/components/layout/SearchBar";

const CATEGORIES = [
  { name: "Furniture", slug: "furniture", emoji: "🪑", count: 1240 },
  { name: "Paintings", slug: "paintings", emoji: "🎨", count: 890 },
  { name: "Coins", slug: "coins", emoji: "🪙", count: 2100 },
  { name: "Jewelry", slug: "jewelry", emoji: "💎", count: 670 },
  { name: "Ceramics", slug: "ceramics", emoji: "🏺", count: 540 },
  { name: "Watches", slug: "watches", emoji: "⌚", count: 430 },
  { name: "Textiles", slug: "textiles", emoji: "🧵", count: 320 },
  { name: "Sculpture", slug: "sculpture", emoji: "🗿", count: 280 },
];

async function getData() {
  const featured = await prisma.listing.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "desc" },
    take: 16,
    include: { seller: { select: { name: true } } },
  });
  const auctions = await prisma.listing.findMany({
    where: { status: "APPROVED", saleType: "AUCTION", auctionEnd: { gt: new Date() } },
    take: 6,
    orderBy: { auctionEnd: "asc" },
    include: { bids: { orderBy: { amount: "desc" }, take: 1 } },
  });
  const premium = await prisma.listing.findMany({
    where: { status: "APPROVED", rarity: { in: ["Rare", "Very Rare", "Museum-grade"] } },
    take: 4,
    orderBy: { price: "desc" },
    include: { seller: { select: { name: true } } },
  });
  return { featured, auctions, premium };
}

export default async function Home() {
  const { featured, auctions, premium } = await getData();

  return (
    <div className="bg-gray-50">
      {/* TOP BAR — PREMIUM */}
      <div className="bg-gradient-to-r from-antique-950 via-antique-900 to-antique-950 text-cream text-[11px] sm:text-xs py-2 border-b border-gold-500/20">
        <div className="container mx-auto px-3 sm:px-4 flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 shrink-0 text-gold-400" />
            <span>Peshawar, Pakistan</span>
            <span className="hidden sm:inline mx-2 text-antique-600">|</span>
            <span className="hidden sm:inline text-gold-400 font-semibold">🏛️ Trusted since 2010</span>
          </div>
          <div className="flex gap-3 sm:gap-4">
            <Link href="/help" className="hover:text-gold-400 transition">Help Center</Link>
            <Link href="/sell" className="hover:text-gold-400 transition hidden sm:inline">Sell on Antique Bazaar</Link>
          </div>
        </div>
      </div>

      {/* SEARCH HEADER — AMAZON STYLE */}
      <div className="bg-white border-b-2 border-antique-100 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-6">
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-antique-700 via-gold-500 to-antique-700 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition">
                <Gavel className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="font-serif font-bold text-xl text-antique-900 leading-none">Antique Bazaar</p>
                <p className="text-[10px] text-gold-600 font-semibold">TIMELESS TREASURES</p>
              </div>
            </Link>

            <SearchBar />

            <div className="hidden lg:flex items-center gap-3">
              <Link href="/login" className="px-3 py-2 text-sm font-semibold text-antique-700 hover:text-antique-900 transition">Sign In</Link>
              <Link href="/signup" className="px-4 py-2 text-sm font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-antique-950 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md">Join Free</Link>
            </div>
          </div>
        </div>

        {/* CATEGORY MEGA-BAR — DESKTOP ONLY */}
        <div className="hidden sm:block border-t border-gray-100 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1 overflow-x-auto py-1.5 scrollbar-hide">
              <Link href="/listings" className="px-3 py-1.5 text-xs font-semibold text-antique-700 bg-white rounded-full border border-antique-200 hover:bg-antique-50 whitespace-nowrap">All</Link>
              {CATEGORIES.map(cat => (
                <Link key={cat.slug} href={`/listings?category=${cat.slug}`} className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-white rounded-full hover:text-antique-700 whitespace-nowrap transition">
                  {cat.emoji} {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE HERO — PREMIUM */}
      <div className="sm:hidden relative bg-gradient-to-br from-antique-950 via-antique-900 to-antique-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{backgroundImage: "url('https://images.unsplash.com/photo-1523528283115-9bf9b1699245?w=800')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
        <div className="relative px-4 py-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 bg-gold-500 text-antique-950 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              <Award className="w-3 h-3" /> Verified
            </span>
            <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> LIVE
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold mb-3 leading-tight">Discover <span className="text-gold-400">Timeless</span> Treasures</h1>
          <p className="text-sm text-antique-200 mb-5 leading-relaxed">Buy & sell authentic antiques with escrow protection.</p>
          <Link href="/listings" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-antique-950 px-5 py-3.5 rounded-xl font-bold text-sm w-full active:scale-95 transition shadow-lg">
            Explore Collection <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="grid grid-cols-3 gap-2 mt-6">
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md border border-white/20">
              <p className="text-gold-400 font-bold text-xl">{featured.length}+</p>
              <p className="text-[10px] text-antique-200">Items</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md border border-white/20">
              <p className="text-gold-400 font-bold text-xl">12K</p>
              <p className="text-[10px] text-antique-200">Sellers</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md border border-white/20">
              <p className="text-gold-400 font-bold text-xl">98%</p>
              <p className="text-[10px] text-antique-200">Happy</p>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE CATEGORIES GRID */}
      <div className="sm:hidden bg-white py-4">
        <div className="px-4 flex items-center justify-between mb-3">
          <h2 className="font-bold text-base text-antique-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-gold-500" /> Shop by Category
          </h2>
          <Link href="/categories" className="text-xs text-antique-700 font-semibold flex items-center gap-0.5">All <ChevronRight className="w-3 h-3" /></Link>
        </div>
        <div className="grid grid-cols-4 gap-3 px-4">
          {CATEGORIES.slice(0, 8).map(cat => (
            <Link key={cat.slug} href={`/listings?category=${cat.slug}`} className="flex flex-col items-center touch-manipulation active:scale-95 transition">
              <div className="w-full aspect-square bg-gradient-to-br from-antique-50 to-gold-100 rounded-xl flex items-center justify-center text-3xl border border-antique-100 shadow-sm">
                {cat.emoji}
              </div>
              <span className="text-[10px] text-gray-700 mt-1.5 text-center leading-tight font-medium">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* DESKTOP 3-COLUMN */}
      <div className="hidden sm:block container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Categories */}
          

          {/* CENTER */}
          <div className="lg:col-span-9 space-y-6">
            {/* HERO BANNER */}
            <div className="relative bg-gradient-to-br from-antique-950 via-antique-900 to-antique-700 rounded-2xl overflow-hidden h-80 flex items-center shadow-xl">
              <div className="absolute inset-0 opacity-25" style={{backgroundImage: "url('https://images.unsplash.com/photo-1523528283115-9bf9b1699245?w=1200')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-antique-950/80 to-transparent"></div>
              <div className="relative z-10 px-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 bg-gold-500 text-antique-950 text-xs font-bold px-3 py-1.5 rounded-full">
                    <Award className="w-3.5 h-3.5" /> VERIFIED ANTIQUES
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> LIVE AUCTIONS
                  </span>
                </div>
                <h1 className="font-serif text-5xl font-bold text-white mb-4 leading-tight">Discover <span className="text-gold-400">Timeless</span><br />Treasures</h1>
                <p className="text-antique-200 mb-6 max-w-md text-sm">Buy & sell authentic antiques with confidence. Escrow-protected payments, insured shipping, expert authentication.</p>
                <div className="flex gap-3">
                  <Link href="/listings" className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-antique-950 px-7 py-3.5 rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all shadow-lg">
                    Shop Now <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/auctions" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-white/20 transition">
                    <Gavel className="w-5 h-5" /> Live Auctions
                  </Link>
                </div>
              </div>
            </div>

            {/* FEATURED GRID */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-serif font-bold text-xl text-antique-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gold-500" /> Featured Antiques
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Hand-picked treasures from verified sellers</p>
                </div>
                <Link href="/listings" className="text-sm text-antique-700 font-semibold hover:underline flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {featured.slice(0, 6).map(l => {
                  const imgs = JSON.parse(l.images);
                  return (
                    <Link key={l.id} href={`/listings/${l.id}`} className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="relative h-40 overflow-hidden">
                        <img src={imgs[0]} alt={l.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                        <div className="absolute top-2 left-2">
                          <span className="bg-gold-500 text-antique-950 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">{l.rarity}</span>
                        </div>
                        <div className="absolute top-2 right-2"><WishlistButton listingId={l.id} size="sm" /></div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                          <div className="flex items-center gap-1 text-white text-[10px]">
                            <Star className="w-3 h-3 fill-gold-400 text-gold-400" /> 4.9
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-bold line-clamp-1 text-gray-800 group-hover:text-antique-700">{l.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{l.seller.name}</p>
                        <p className="font-bold text-base text-antique-900 mt-1.5">{l.price ? formatPrice(l.price) : "Auction"}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Auctions + Trust */}
          <div className="lg:col-span-3 space-y-6">
            {/* LIVE AUCTIONS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> LIVE AUCTIONS
                </div>
                <Flame className="w-4 h-4" />
              </div>
              <div className="divide-y divide-gray-100">
                {auctions.length === 0 ? (
                  <p className="p-4 text-sm text-gray-500 text-center">No live auctions</p>
                ) : auctions.slice(0, 3).map(a => {
                  const imgs = JSON.parse(a.images);
                  const currentBid = a.bids[0]?.amount || a.startingBid || 0;
                  return (
                    <Link key={a.id} href={`/listings/${a.id}`} className="flex gap-3 p-3 hover:bg-red-50 transition">
                      <img src={imgs[0]} alt={a.title} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold line-clamp-1 text-gray-800">{a.title}</p>
                        <p className="text-xs text-red-600 font-bold mt-1">{formatPrice(currentBid)}</p>
                        <div className="mt-1"><AuctionCountdown endTime={a.auctionEnd!} compact /></div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Link href="/auctions" className="block text-center py-3 text-sm text-red-600 font-bold hover:bg-red-50 bg-gradient-to-r from-red-50 to-white">View All Auctions →</Link>
            </div>

            {/* PREMIUM PICKS */}
            {premium.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-gold-500 to-gold-600 text-antique-950 px-4 py-3 flex items-center gap-2 text-sm font-bold">
                  <Award className="w-4 h-4" /> PREMIUM PICKS
                </div>
                <div className="divide-y divide-gray-100">
                  {premium.slice(0, 2).map(p => {
                    const imgs = JSON.parse(p.images);
                    return (
                      <Link key={p.id} href={`/listings/${p.id}`} className="flex gap-3 p-3 hover:bg-gold-50 transition">
                        <img src={imgs[0]} alt={p.title} className="w-14 h-14 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold line-clamp-1 text-gray-800">{p.title}</p>
                          <p className="text-xs text-gold-700 font-bold mt-0.5">{p.price ? formatPrice(p.price) : "—"}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">⭐ {p.rarity}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TRUST BADGES */}
            <div className="bg-gradient-to-br from-antique-50 to-gold-50 rounded-2xl border border-antique-100 p-4 space-y-3">
              <h3 className="font-bold text-xs text-antique-900 uppercase tracking-wide mb-2">Why Choose Us</h3>
              {[
                { icon: BadgeCheck, title: "Expert Verified", desc: "Every item authenticated" },
                { icon: Shield, title: "Escrow Protected", desc: "Funds held until delivery" },
                { icon: Truck, title: "Insured Shipping", desc: "Worldwide secure delivery" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/60 rounded-lg p-2.5">
                  <div className="w-9 h-9 bg-gradient-to-br from-antique-700 to-antique-800 rounded-lg flex items-center justify-center shrink-0">
                    <b.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-antique-900">{b.title}</p>
                    <p className="text-[10px] text-gray-600">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE — FLASH DEALS STRIP */}
      <div className="sm:hidden bg-white mt-4 py-4">
        <div className="px-4 flex items-center justify-between mb-3">
          <h2 className="font-bold text-base text-antique-900 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-red-600" /> Live Auctions
          </h2>
          <Link href="/auctions" className="text-xs text-red-600 font-semibold flex items-center gap-0.5">All <ChevronRight className="w-3 h-3" /></Link>
        </div>
        {auctions.length > 0 ? (
          <div className="flex gap-3 px-4 overflow-x-auto pb-2" style={{scrollbarWidth: "none"}}>
            {auctions.map(a => {
              const imgs = JSON.parse(a.images);
              const currentBid = a.bids[0]?.amount || a.startingBid || 0;
              return (
                <Link key={a.id} href={`/listings/${a.id}`} className="bg-white rounded-xl overflow-hidden shrink-0 w-44 shadow-md border border-gray-100 active:scale-95 transition">
                  <div className="relative h-28">
                    <img src={imgs[0]} alt={a.title} className="w-full h-full object-cover" />
                    <div className="absolute top-1.5 left-1.5">
                      <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span> LIVE
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-bold line-clamp-1 text-gray-800">{a.title}</p>
                    <p className="text-sm text-red-600 font-bold mt-1">{formatPrice(currentBid)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="px-4 text-xs text-gray-500">No live auctions right now</p>
        )}
      </div>

      {/* MOBILE — FEATURED */}
      <div className="sm:hidden bg-white mt-4 py-4">
        <div className="px-4 flex items-center justify-between mb-3">
          <h2 className="font-bold text-base text-antique-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-gold-500" /> Featured
          </h2>
          <Link href="/listings" className="text-xs text-antique-700 font-semibold flex items-center gap-0.5">All <ChevronRight className="w-3 h-3" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-3 px-4">
          {featured.slice(0, 6).map(l => {
            const imgs = JSON.parse(l.images);
            return (
              <Link key={l.id} href={`/listings/${l.id}`} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm active:scale-[0.98] transition">
                <div className="relative h-36 overflow-hidden">
                  <img src={imgs[0]} alt={l.title} className="w-full h-full object-cover" />
                  <div className="absolute top-1.5 left-1.5">
                    <span className="bg-gold-500 text-antique-950 text-[9px] font-bold px-2 py-0.5 rounded-full">{l.rarity}</span>
                  </div>
                  <div className="absolute top-1.5 right-1.5"><WishlistButton listingId={l.id} size="sm" /></div>
                </div>
                <div className="p-2.5">
                  <h3 className="text-xs font-bold line-clamp-2 leading-tight h-8 text-gray-800">{l.title}</h3>
                  <p className="text-[10px] text-gray-500 mt-1">{l.seller.name}</p>
                  <p className="font-bold text-sm text-antique-900 mt-1">{l.price ? formatPrice(l.price) : "Auction"}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* MOBILE — TRUST BADGES */}
      <div className="sm:hidden bg-gradient-to-br from-antique-50 to-gold-50 mt-4 py-5">
        <div className="grid grid-cols-3 gap-3 px-4">
          {[
            { icon: BadgeCheck, label: "Verified" },
            { icon: Shield, label: "Escrow" },
            { icon: Truck, label: "Insured" },
          ].map((b, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 bg-white rounded-xl py-3 shadow-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-antique-700 to-antique-800 rounded-full flex items-center justify-center">
                <b.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-bold text-antique-900">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP — MORE TREASURES */}
      {featured.length > 6 && (
        <div className="hidden sm:block container mx-auto px-4 mt-6 pb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif font-bold text-xl flex items-center gap-2 text-antique-900">
                <TrendingUp className="w-5 h-5 text-gold-500" /> More Treasures
              </h2>
              <Link href="/listings" className="text-sm text-antique-700 font-semibold hover:underline">View All →</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {featured.slice(6, 12).map(l => {
                const imgs = JSON.parse(l.images);
                return (
                  <Link key={l.id} href={`/listings/${l.id}`} className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
                    <div className="relative h-32 overflow-hidden">
                      <img src={imgs[0]} alt={l.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    </div>
                    <div className="p-2.5">
                      <h3 className="text-xs font-bold line-clamp-1 text-gray-800">{l.title}</h3>
                      <p className="text-xs font-bold text-antique-900 mt-1">{l.price ? formatPrice(l.price) : "Auction"}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE CTA */}
      <div className="sm:hidden bg-gradient-to-br from-antique-950 to-antique-800 text-white mt-4 px-4 py-7 text-center">
        <h2 className="font-serif text-2xl font-bold mb-2">Have an Antique?</h2>
        <p className="text-xs text-antique-200 mb-5">List it free. Reach thousands of collectors worldwide.</p>
        <Link href="/sell" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-antique-950 px-6 py-3.5 rounded-xl font-bold text-sm w-full active:scale-95 transition shadow-lg">
          <Gavel className="w-4 h-4" /> Start Selling
        </Link>
      </div>
    </div>
  );
}