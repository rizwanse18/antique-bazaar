"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Menu, X, Moon, Sun, Gavel, LogOut, LayoutDashboard } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import toast from "react-hot-toast";
import { useCart } from "@/store/cart";

type User = { id: string; name: string; email: string; role: string } | null;

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState<User>(null);
  const cartCount = useCart((s) => s.items.length);

  useEffect(() => {
    const saved = localStorage.getItem("dark-mode");
    if (saved === "true") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => setUser(d.user)).catch(() => {});
  }, []);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("dark-mode", String(!dark));
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Logged out");
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-antique-950 text-cream text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>🏛️ Peshawar, Pakistan — Trusted since 2010</span>
          <div className="hidden md:flex gap-4">
            <Link href="/help" className="hover:text-gold-400">Help Center</Link>
            <Link href="/sell" className="hover:text-gold-400">Sell on Antique Bazaar</Link>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-antique-900 border-b-2 border-antique-100 dark:border-antique-700 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-antique-700 to-gold-500 rounded-xl flex items-center justify-center">
                <Gavel className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="font-serif font-bold text-2xl text-antique-900 dark:text-gold-400 leading-none">Antique Bazaar</span>
                <p className="text-xs text-antique-600 dark:text-antique-300">Timeless Treasures</p>
              </div>
            </Link>

            {/* SEARCH */}
            <div className="hidden lg:flex items-center flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-antique-500 dark:text-antique-400" />
                <input type="text" placeholder="Search antiques, coins, paintings..." className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-antique-200 dark:border-antique-700 focus:border-antique-600 focus:outline-none bg-antique-50 dark:bg-antique-800 text-antique-900 dark:text-cream placeholder:text-antique-500 dark:placeholder:text-antique-400" />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="hidden lg:flex items-center gap-4">
              {/* DARK MODE TOGGLE */}
              <button onClick={toggleDark} className="p-2 hover:bg-antique-100 dark:hover:bg-antique-800 rounded-full transition text-antique-800 dark:text-gold-400" aria-label="Toggle theme">
                {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <Link href="/listings" className="font-semibold text-antique-800 dark:text-cream hover:text-antique-600 dark:hover:text-gold-400">Browse</Link>
              <Link href="/auctions" className="font-semibold text-antique-800 dark:text-cream hover:text-antique-600 dark:hover:text-gold-400">Auctions</Link>
              <Link href="/sell" className="btn-secondary text-sm py-2 px-4">Sell Item</Link>

              <Link href="/cart" className="relative p-2 hover:bg-antique-100 dark:hover:bg-antique-800 rounded-full text-antique-800 dark:text-cream">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
                )}
              </Link>

              {user ? (
                <>
                  <Link href={user.role === "SELLER" ? "/dashboard/seller" : user.role === "ADMIN" ? "/dashboard/admin" : "/dashboard"} className="flex items-center gap-2 bg-antique-700 hover:bg-antique-800 text-white text-sm font-semibold py-2 px-4 rounded-lg transition dark:bg-gold-500 dark:hover:bg-gold-600 dark:text-antique-950">
                    <LayoutDashboard className="w-4 h-4" /> <span>Dashboard</span>
                  </Link>
                  <button onClick={logout} className="text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center gap-1">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="bg-antique-700 hover:bg-antique-800 text-white font-bold text-sm py-2.5 px-5 rounded-lg shadow-md transition">Login</Link>
                  <Link href="/signup" className="btn-primary text-sm py-2 px-4">Sign Up</Link>
                </>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button className="lg:hidden p-2 text-antique-900 dark:text-cream" onClick={() => setOpen(!open)}>
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* MOBILE MENU */}
          {open && (
            <div className="lg:hidden pb-4 flex flex-col gap-3 border-t border-antique-100 dark:border-antique-700 pt-4">
              <input type="text" placeholder="Search..." className="input-field" />
              <Link href="/listings" className="py-2 font-semibold text-antique-800 dark:text-cream">Browse</Link>
              <Link href="/auctions" className="py-2 font-semibold text-antique-800 dark:text-cream">Auctions</Link>
              <Link href="/sell" className="btn-secondary text-center">Sell Item</Link>
              {user ? (
                <>
                  <Link href="/dashboard" className="btn-outline text-center">Dashboard</Link>
                  <button onClick={logout} className="text-red-600 font-semibold text-center py-2">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn-outline text-center">Login</Link>
                  <Link href="/signup" className="btn-primary text-center">Sign Up</Link>
                </>
              )}
              <button onClick={toggleDark} className="text-center py-2 font-semibold text-antique-800 dark:text-cream">
                {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}