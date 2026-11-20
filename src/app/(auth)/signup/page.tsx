"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gavel, Mail, Lock, User, ShoppingBag, Store } from "lucide-react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<"BUYER" | "SELLER">("BUYER");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
      role,
    };
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      toast.success("Account created!");
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md card p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-antique-700 to-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Gavel className="w-9 h-9 text-white" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-antique-900">Create Account</h1>
          <p className="text-sm text-antique-600 mt-2">Join the antique community</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <button type="button" onClick={() => setRole("BUYER")}
            className={`p-4 rounded-lg border-2 text-center transition ${role === "BUYER" ? "border-antique-700 bg-antique-50" : "border-antique-200"}`}>
            <ShoppingBag className="w-6 h-6 mx-auto mb-2" />
            <p className="font-semibold text-sm">Buyer</p>
          </button>
          <button type="button" onClick={() => setRole("SELLER")}
            className={`p-4 rounded-lg border-2 text-center transition ${role === "SELLER" ? "border-antique-700 bg-antique-50" : "border-antique-200"}`}>
            <Store className="w-6 h-6 mx-auto mb-2" />
            <p className="font-semibold text-sm">Seller</p>
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-1 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-antique-400" />
              <input name="name" type="text" placeholder="John Doe" className="input-field pl-11" required />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-antique-400" />
              <input name="email" type="email" placeholder="you@example.com" className="input-field pl-11" required />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-antique-400" />
              <input name="password" type="password" placeholder="Min 8 characters" className="input-field pl-11" required minLength={8} />
            </div>
          </div>
          <label className="flex items-start gap-2 text-xs text-antique-600">
            <input type="checkbox" className="mt-1" required /> I agree to the Terms of Service and Privacy Policy
          </label>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-antique-600">
          Already have an account? <Link href="/login" className="text-antique-700 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
