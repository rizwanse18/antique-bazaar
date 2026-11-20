import Link from "next/link";
import { Package, Gavel, Heart, MessageSquare, TrendingUp, Eye, ShieldCheck, AlertCircle, User } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { icon: Package, label: "My Orders", value: "12", color: "bg-blue-500" },
    { icon: Gavel, label: "Active Bids", value: "4", color: "bg-red-500" },
    { icon: Heart, label: "Watchlist", value: "28", color: "bg-pink-500" },
    { icon: MessageSquare, label: "Messages", value: "7", color: "bg-green-500" },
  ];
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-antique-900 dark:text-cream mb-2">Dashboard</h1>
      <p className="text-antique-600 dark:text-antique-300 mb-8">Welcome back, Ali!</p>

            {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Link href="/dashboard/profile" className="card p-4 text-center hover:scale-105 transition">
          <User className="w-6 h-6 mx-auto mb-2 text-purple-600" />
          <p className="font-semibold text-sm">My Profile</p>
        </Link><Link href="/dashboard/orders" className="card p-4 text-center hover:scale-105 transition">
          <Package className="w-6 h-6 mx-auto mb-2 text-antique-700" />
          <p className="font-semibold text-sm">My Orders</p>
        </Link>
        <Link href="/dashboard/wishlist" className="card p-4 text-center hover:scale-105 transition">
          <Heart className="w-6 h-6 mx-auto mb-2 text-red-500" />
          <p className="font-semibold text-sm">Wishlist</p>
        </Link>
        <Link href="/sell" className="card p-4 text-center hover:scale-105 transition">
          <Gavel className="w-6 h-6 mx-auto mb-2 text-gold-600" />
          <p className="font-semibold text-sm">Sell Item</p>
        </Link>
        <Link href="/auctions" className="card p-4 text-center hover:scale-105 transition">
          <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" />
          <p className="font-semibold text-sm">Auctions</p>
        </Link>
      </div>
      {/* Role-based links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link href="/dashboard/seller" className="card p-6 flex items-center gap-3 hover:scale-105 transition">
          <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center"><Gavel className="w-6 h-6 text-white" /></div>
          <div>
            <p className="font-bold">Seller Dashboard</p>
            <p className="text-xs text-antique-500">Manage your listings</p>
          </div>
        </Link>
                <Link href="/dashboard/profile" className="card p-4 text-center hover:scale-105 transition">
          <User className="w-6 h-6 mx-auto mb-2 text-purple-600" />
          <p className="font-semibold text-sm">My Profile</p>
        </Link><Link href="/dashboard/orders" className="card p-6 flex items-center gap-3 hover:scale-105 transition">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center"><Package className="w-6 h-6 text-white" /></div>
          <div>
            <p className="font-bold">My Orders</p>
            <p className="text-xs text-antique-500">View order history</p>
          </div>
        </Link>
        <Link href="/dashboard/admin" className="card p-6 flex items-center gap-3 hover:scale-105 transition">
          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center"><ShieldCheck className="w-6 h-6 text-white" /></div>
          <div>
            <p className="font-bold">Admin Panel</p>
            <p className="text-xs text-antique-500">Platform moderation</p>
          </div>
        </Link>
      </div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="card p-6">
            <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-4`}>
              <s.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-4xl font-extrabold text-antique-900 dark:text-gold-400">{s.value}</p>
            <p className="text-sm font-semibold text-antique-700 dark:text-antique-200">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Recent Activity</h3>
          <div className="space-y-3">
            {["You bid on Mughal Dagger", "Won: Persian Rug auction", "New message from seller", "Order #12345 shipped"].map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-antique-50 dark:bg-antique-800 rounded-lg">
                <div className="w-2 h-2 bg-gold-500 rounded-full shrink-0"></div>
                <p className="text-sm font-medium text-antique-800 dark:text-antique-200">{a}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Eye className="w-5 h-5" /> Watchlist</h3>
          <p className="text-sm font-medium text-antique-700 dark:text-antique-300">You have 28 items in your watchlist</p>
          <Link href="/dashboard/wishlist" className="btn-outline mt-4 w-full block text-center">View All</Link>
        </div>
      </div>
    </div>
  );
}