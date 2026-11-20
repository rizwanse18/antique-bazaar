"use client";
import { useState } from "react";
import { HelpCircle, Send, MessageSquare, CheckCircle, AlertCircle, Mail, ShoppingBag, CreditCard, Package, User, Truck, MessageCircle, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const QUICK_GUIDE = [
  {
    icon: ShoppingBag,
    title: "How to Buy",
    steps: ["Browse listings", "Add to cart", "Checkout with escrow", "Confirm receipt"],
    color: "bg-blue-500",
  },
  {
    icon: CreditCard,
    title: "Payments",
    steps: ["Escrow protected", "6 payment methods", "Funds held safely", "Auto refund if issue"],
    color: "bg-green-500",
  },
  {
    icon: Package,
    title: "Shipping",
    steps: ["Insured delivery", "Track order anytime", "Signature on receipt", "DHL / FedEx / TCS"],
    color: "bg-purple-500",
  },
  {
    icon: User,
    title: "Account",
    steps: ["Sign up free", "KYC for sellers", "Secure login", "Password reset"],
    color: "bg-gold-500",
  },
];

const FAQS = [
  { q: "How does escrow payment work?", a: "When you pay, funds are held securely by Antique Bazaar. Once you confirm receipt and satisfaction, funds are released to the seller." },
  { q: "How do I verify authenticity?", a: "Every listing includes provenance, certificates, and can be reviewed by our expert authenticators for a small fee." },
  { q: "What if the item is fake?", a: "Full refund guaranteed. File a dispute within 7 days of receipt through the complaint system." },
  { q: "How are antiques shipped?", a: "All items shipped with insured, tracked, signature-required delivery via DHL, FedEx, or TCS." },
  { q: "Can I export cultural heritage items?", a: "Some items are restricted. Our compliance checker will alert you before purchase." },
  { q: "How do I track my order?", a: "Go to Dashboard → My Orders. Each order shows tracking number and current status." },
  { q: "How do I request a refund?", a: "Open a complaint from Contact page. Admin will review within 24-48 hours." },
  { q: "How do I become a verified seller?", a: "Sign up as seller and submit KYC documents (CNIC, bank details). Verification takes 2-3 business days." },
];

const CATEGORIES = [
  { value: "ORDER", label: "Order Issue" },
  { value: "PAYMENT", label: "Payment Problem" },
  { value: "LISTING", label: "Listing / Product" },
  { value: "ACCOUNT", label: "Account Access" },
  { value: "SHIPPING", label: "Shipping / Delivery" },
  { value: "OTHER", label: "Other / General" },
];

export default function HelpPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `[Help Center] ${form.get("subject")}`,
          category: form.get("category"),
          priority: "NORMAL",
          description: form.get("message"),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");

      toast.success("Message sent to admin!");
      setSubmitted(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <div className="bg-gradient-to-br from-antique-950 via-antique-900 to-antique-700 text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{backgroundImage: "url('https://images.unsplash.com/photo-1523528283115-9bf9b1699245?w=1200')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-2xl">
            <HelpCircle className="w-10 h-10 text-antique-950" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-3">Help Center</h1>
          <p className="text-antique-200 text-base sm:text-lg max-w-2xl mx-auto">Find answers, learn how it works, or message our admin team directly</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">

        {/* QUICK GUIDE — KON KAISA KAAM KARTA HAI */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-antique-900 mb-2">Quick Guide</h2>
            <p className="text-sm text-antique-600">Everything you need to know in 4 easy steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_GUIDE.map((guide, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-5">
                <div className={`w-12 h-12 ${guide.color} rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                  <guide.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-base text-antique-900 mb-3">{guide.title}</h3>
                <ol className="space-y-2">
                  {guide.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-5 h-5 bg-antique-100 text-antique-700 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {j + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION — CLEAN ACCORDION */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-antique-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-sm text-antique-600">Click any question to see the answer</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-antique-50 transition"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <span className="w-7 h-7 bg-gradient-to-br from-antique-700 to-gold-500 text-white rounded-full text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="font-semibold text-sm text-antique-900">{f.q}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-antique-600 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 pl-14 text-sm text-gray-700 leading-relaxed animate-in fade-in slide-in-from-top-1">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* STILL NEED HELP — MESSAGE FORM */}
        <section className="bg-gradient-to-br from-white to-antique-50 rounded-2xl border-2 border-antique-200 shadow-lg p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-antique-700 to-gold-500 rounded-2xl flex items-center justify-center shrink-0 shadow-md">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-antique-900">Still need help?</h2>
                <Sparkles className="w-5 h-5 text-gold-500" />
              </div>
              <p className="text-sm text-antique-600">
                Your issue not covered above? Send a message directly to our admin team. We reply within <strong className="text-antique-800">24-48 hours</strong>.
              </p>
            </div>
          </div>

          {submitted && (
            <div className="mb-5 p-4 bg-green-50 border-2 border-green-300 rounded-xl flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900">✓ Message sent to admin!</p>
                <p className="text-sm text-green-700 mt-1">
                  Track it in{" "}
                  <Link href="/dashboard/complaints" className="underline font-semibold hover:text-green-800">
                    My Complaints
                  </Link>
                  . Admin will reply soon.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="font-semibold mb-1.5 block text-sm text-antique-900">Subject *</label>
              <input
                name="subject"
                placeholder="Brief description of your issue (min 5 characters)"
                className="input-field bg-white"
                required
                minLength={5}
              />
            </div>

            <div>
              <label className="font-semibold mb-1.5 block text-sm text-antique-900">Category *</label>
              <select name="category" className="input-field bg-white" required>
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold mb-1.5 block text-sm text-antique-900">Your Message *</label>
              <textarea
                name="message"
                placeholder="Describe your issue in detail. Include order number, listing ID, or any relevant information (min 10 characters)..."
                className="input-field h-32 bg-white"
                required
                minLength={10}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-antique-700 to-antique-800 text-white font-bold py-3.5 rounded-lg hover:from-antique-800 hover:to-antique-900 transition shadow-md hover:shadow-lg disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              {loading ? "Sending..." : "Send Message to Admin"}
            </button>

            <p className="text-xs text-center text-antique-500 flex items-center justify-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Goes directly to admin dashboard — not via email
            </p>
          </form>
        </section>

        {/* ALTERNATIVE CONTACT */}
        <section className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-center font-bold text-antique-900 mb-4">Other ways to reach us</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="mailto:antiqueitemmarketplace@gmail.com"
              className="flex items-center gap-3 p-4 bg-gradient-to-br from-antique-50 to-white border border-antique-200 rounded-xl hover:border-antique-600 transition group"
            >
              <div className="w-10 h-10 bg-antique-700 rounded-lg flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-bold text-antique-900 group-hover:text-antique-700 break-all">antiqueitemmarketplace@gmail.com</p>
              </div>
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-3 p-4 bg-gradient-to-br from-antique-50 to-white border border-antique-200 rounded-xl hover:border-antique-600 transition group"
            >
              <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-antique-950" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Contact Form</p>
                <p className="text-sm font-bold text-antique-900 group-hover:text-antique-700">Submit complaint</p>
              </div>
            </Link>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-antique-50 to-white border border-antique-200 rounded-xl">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Response Time</p>
                <p className="text-sm font-bold text-antique-900">24-48 hours</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}