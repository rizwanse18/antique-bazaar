import Link from "next/link";
import { Gavel, Mail, Phone, MapPin, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-antique-950 text-cream mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-antique-700 to-gold-500 rounded-lg flex items-center justify-center">
                <Gavel className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl">Antique Bazaar</h3>
            </div>
            <p className="text-antique-300 text-sm mb-4">
              The world's most trusted marketplace for authentic antiques, rare collectibles, and timeless treasures.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-antique-900 rounded-full flex items-center justify-center hover:bg-gold-500 transition">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-antique-900 rounded-full flex items-center justify-center hover:bg-gold-500 transition">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-antique-900 rounded-full flex items-center justify-center hover:bg-gold-500 transition">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-gold-400">Marketplace</h4>
            <ul className="space-y-2 text-sm text-antique-300">
              <li><Link href="/listings" className="hover:text-gold-400">Browse All</Link></li>
              <li><Link href="/auctions" className="hover:text-gold-400">Live Auctions</Link></li>
              <li><Link href="/sell" className="hover:text-gold-400">Sell an Item</Link></li>
              <li><Link href="/categories" className="hover:text-gold-400">Categories</Link></li>
              <li><Link href="/about" className="hover:text-gold-400">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-gold-400">Support</h4>
            <ul className="space-y-2 text-sm text-antique-300">
              <li><Link href="/help" className="hover:text-gold-400">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-gold-400">Contact Us</Link></li>
              <li><Link href="/help" className="hover:text-gold-400">Buyer Protection</Link></li>
              <li><Link href="/help" className="hover:text-gold-400">Shipping Info</Link></li>
              <li><Link href="/help" className="hover:text-gold-400">Authentication</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-gold-400">Contact</h4>
            <ul className="space-y-3 text-sm text-antique-300">
              <li className="flex gap-2"><MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-1" /> Peshawar, Pakistan</li>
              <li className="flex gap-2"><Phone className="w-4 h-4 text-gold-400 shrink-0" /> 0347 9182632</li>
              <li className="flex gap-2"><Mail className="w-4 h-4 text-gold-400 shrink-0" /> antiqueitemmarketplace@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-antique-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-antique-400">
          <p>© 2025 Antique Bazaar. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <Link href="#" className="hover:text-gold-400">Privacy</Link>
            <Link href="#" className="hover:text-gold-400">Terms</Link>
            <Link href="#" className="hover:text-gold-400">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
