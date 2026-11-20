"use client";
import Link from "next/link";
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function Cart() {
  const { items, removeItem, total, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="font-serif text-4xl font-bold mb-8">Shopping Cart</h1>
        <div className="card p-12 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-antique-300 mb-4" />
          <p className="text-lg font-semibold mb-2">Your cart is empty</p>
          <p className="text-sm text-antique-500 mb-6">Add treasures to your cart</p>
          <Link href="/listings" className="btn-primary">Browse Antiques</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-4xl font-bold">Shopping Cart</h1>
        <button onClick={clear} className="text-sm text-red-600 hover:underline">Clear all</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.listingId} className="card p-4 flex gap-4">
              <img loading="lazy" src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <Link href={`/listings/${item.listingId}`} className="font-serif font-bold hover:text-antique-700 line-clamp-1">{item.title}</Link>
                <p className="text-xs text-antique-500 mt-1">by {item.sellerName}</p>
                <p className="font-bold text-lg text-antique-900 mt-2">{formatPrice(item.price)}</p>
              </div>
              <button onClick={() => removeItem(item.listingId)} className="text-red-500 hover:text-red-700 self-start">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="card p-6 h-fit sticky top-24">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(total())}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className="text-green-600">Free</span></div>
            <div className="flex justify-between"><span>Escrow fee (2%)</span><span>{formatPrice(total() * 0.02)}</span></div>
          </div>
          <div className="border-t-2 pt-3 mb-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span><span>{formatPrice(total() * 1.02)}</span>
            </div>
          </div>
          <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
            Checkout <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}