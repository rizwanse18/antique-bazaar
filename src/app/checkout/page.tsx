"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, CreditCard, Lock, Phone, Mail, MapPin, User } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { validateMobile, PAYMENT_METHODS } from "@/lib/payments";
import { PaymentModal } from "@/components/PaymentModal";
import toast from "react-hot-toast";

type Method = "ESCROW" | "CARD" | "JAZZCASH" | "EASYPAISA" | "BANK" | "PAYPAL";

export default function Checkout() {
  const router = useRouter();
  const { items, total, clear } = useCart();
  const [method, setMethod] = useState<Method>("ESCROW");
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => {
      if (d.user) {
        setFullName(d.user.name || "");
        setEmail(d.user.email || "");
        setMobile(d.user.mobile || "");
        setAddress(d.user.address || "");
        setCity(d.user.city || "Peshawar");
      }
    }).catch(() => {});
  }, []);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Cart is empty</h1>
        <Link href="/listings" className="btn-primary">Browse Antiques</Link>
      </div>
    );
  }

  function validateForm(): boolean {
    if (fullName.trim().length < 2) { toast.error("Please enter your full name"); return false; }
    if (!email.includes("@")) { toast.error("Please enter a valid email"); return false; }
    const m = validateMobile(mobile);
    if (!m.valid) { toast.error(m.message!); return false; }
    if (address.trim().length < 10) { toast.error("Please enter a complete address"); return false; }
    if (city.trim().length < 2) { toast.error("Please enter your city"); return false; }
    return true;
  }

  function startPayment(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;
    const config = PAYMENT_METHODS[method];
    if (config.requiresDetails) {
      setShowPayment(true);
    } else {
      placeOrder();
    }
  }

  async function placeOrder() {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ listingId: i.listingId, price: i.price })),
          paymentMethod: method,
          customer: { fullName, email, mobile, address, city },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success(`${data.orders.length} order(s) placed successfully!`);
      clear();
      router.push("/dashboard/orders");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  const totalAmount = Math.round(total() * 1.02);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="font-serif text-4xl font-bold mb-8">Checkout</h1>

      <form onSubmit={startPayment} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><User className="w-5 h-5" /> Customer Details</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold mb-1 block">Full Name *</label>
                <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Ali Khan" className="input-field" required />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block flex items-center gap-1"><Mail className="w-4 h-4" /> Email *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="input-field" required />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block flex items-center gap-1"><Phone className="w-4 h-4" /> Mobile Number * (11 digits)</label>
                <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="03001234567" className="input-field" maxLength={11} required />
                {mobile && !validateMobile(mobile).valid && (
                  <p className="text-xs text-red-600 mt-1">{validateMobile(mobile).message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><MapPin className="w-5 h-5" /> Shipping Address</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold mb-1 block">Complete Address *</label>
                <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="House #, Street, Area" className="input-field h-20" required />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">City *</label>
                <input value={city} onChange={e => setCity(e.target.value)} placeholder="Peshawar" className="input-field" required />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-bold text-lg mb-4">Payment Method</h3>
            <div className="space-y-3">
              {Object.entries(PAYMENT_METHODS).map(([id, m]) => (
                <label key={id} className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${method === id ? "border-antique-600 bg-antique-50 dark:bg-antique-800" : "border-antique-200 dark:border-antique-700 hover:border-antique-400"}`}>
                  <input type="radio" name="pay" value={id} checked={method === id} onChange={() => setMethod(id as Method)} />
                  <div className="flex-1">
                    <p className="font-semibold flex items-center gap-2">
                      {id === "ESCROW" && <Shield className="w-4 h-4 text-green-600" />}
                      {id === "CARD" && <CreditCard className="w-4 h-4" />}
                      {m.label}
                    </p>
                    <p className="text-xs text-antique-500 dark:text-antique-300">{m.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-6 h-fit sticky top-24">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm mb-4">
            {items.map((i) => (
              <div key={i.listingId} className="flex justify-between">
                <span className="line-clamp-1 flex-1 mr-2">{i.title}</span>
                <span>{formatPrice(i.price)}</span>
              </div>
            ))}
          </div>
          <div className="border-t-2 pt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(total())}</span></div>
            <div className="flex justify-between"><span>Escrow fee (2%)</span><span>{formatPrice(total() * 0.02)}</span></div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t-2">
              <span>Total</span><span>{formatPrice(totalAmount)}</span>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full mt-4 flex items-center justify-center gap-2 disabled:opacity-50">
            <Lock className="w-4 h-4" /> {loading ? "Processing..." : "Continue to Payment"}
          </button>
          <p className="text-xs text-center text-antique-500 dark:text-antique-300 mt-3 flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" /> Secure payment
          </p>
        </div>
      </form>

      {showPayment && (
        <PaymentModal
          method={method}
          amount={totalAmount}
          onClose={() => setShowPayment(false)}
          onSuccess={() => {
            setShowPayment(false);
            placeOrder();
          }}
        />
      )}
    </div>
  );
}