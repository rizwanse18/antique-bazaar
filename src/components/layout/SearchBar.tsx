"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, TrendingUp, Clock } from "lucide-react";

const SUGGESTIONS = [
  "Mughal Lamp", "Victorian Teapot", "Persian Rug", "Antique Pocket Watch",
  "Ming Dynasty Vase", "Bronze Buddha", "Ottoman Gold Coin", "Regency Chair",
  "Wooden Furniture", "Brass Decor", "Silver Jewelry", "Gold Coin",
  "Wrist Watch", "Pocket Watch", "Antique Clock", "Painting",
  "Oil Painting", "Watercolor Art", "Ceramic Vase", "Porcelain Plate",
];

const TRENDING = ["Mughal", "Victorian", "Coins", "Watches", "Rugs", "Paintings"];
const RECENT_KEY = "antique-recent-searches";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem(RECENT_KEY);
      if (s) setRecent(JSON.parse(s).slice(0, 5));
    } catch {}
  }, []);

  useEffect(() => {
    function h(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setShow(false);
    }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    if (!query.trim()) { setFiltered([]); return; }
    const q = query.toLowerCase();
    setFiltered(SUGGESTIONS.filter(s => s.toLowerCase().includes(q)).slice(0, 6));
  }, [query]);

  function saveRecent(term: string) {
    try {
      const u = [term, ...recent.filter(r => r !== term)].slice(0, 5);
      localStorage.setItem(RECENT_KEY, JSON.stringify(u));
      setRecent(u);
    } catch {}
  }

  function go(term: string) {
    if (!term.trim()) return;
    saveRecent(term);
    setShow(false);
    setQuery(term);
    router.push(`/listings?q=${encodeURIComponent(term)}`);
  }

  return (
    <div ref={wrapperRef} className="relative flex-1 max-w-3xl">
      <form onSubmit={(e) => { e.preventDefault(); go(query); }} className="flex">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShow(true); }}
            onFocus={() => setShow(true)}
            placeholder="Search antiques, coins, paintings..."
            className="w-full pl-9 sm:pl-10 pr-3 py-3 sm:py-3.5 border-2 border-antique-600 border-r-0 rounded-l-lg focus:outline-none text-sm"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="bg-gradient-to-r from-antique-700 to-antique-800 text-white px-4 sm:px-8 rounded-r-lg font-bold text-sm">Search</button>
      </form>

      {show && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-antique-200 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
          {filtered.length > 0 && (
            <div className="p-2">
              <p className="text-[10px] font-bold text-gray-400 px-2 py-1 uppercase">Suggestions</p>
              {filtered.map((s) => (
                <button key={s} type="button" onClick={() => go(s)} className="w-full flex items-center gap-2 px-2 py-2 hover:bg-antique-50 rounded text-left text-sm">
                  <Search className="w-3.5 h-3.5 text-gray-400" /> <span className="font-medium">{s}</span>
                </button>
              ))}
            </div>
          )}

          {!query && (
            <div className="p-2">
              <p className="text-[10px] font-bold text-gray-400 px-2 py-1 uppercase flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Trending
              </p>
              <div className="flex flex-wrap gap-1.5 px-2 pb-2">
                {TRENDING.map(t => (
                  <button key={t} type="button" onClick={() => go(t)} className="text-xs px-2.5 py-1 bg-gold-100 text-gold-700 rounded-full font-semibold">{t}</button>
                ))}
              </div>
            </div>
          )}

          {!query && recent.length > 0 && (
            <div className="p-2 border-t border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 px-2 py-1 uppercase flex items-center gap-1">
                <Clock className="w-3 h-3" /> Recent
              </p>
              {recent.map(r => (
                <button key={r} type="button" onClick={() => go(r)} className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded text-left text-xs text-gray-700">
                  <Clock className="w-3 h-3 text-gray-400" /> {r}
                </button>
              ))}
            </div>
          )}

          {query && filtered.length === 0 && (
            <div className="p-4 text-center text-sm text-gray-500">
              No suggestions for "<strong>{query}</strong>"
              <br />
              <button type="button" onClick={() => go(query)} className="mt-2 text-xs text-antique-700 font-semibold hover:underline">Search anyway →</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}