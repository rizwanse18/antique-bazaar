"use client";
import { Mail } from "lucide-react";

export default function ForgotPassword() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md card p-8">
        <h1 className="font-serif text-3xl font-bold mb-2 text-center">Forgot Password?</h1>
        <p className="text-sm text-antique-600 text-center mb-6">Enter your email — we'll send a reset link</p>
        <form className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-antique-400" />
            <input type="email" placeholder="you@example.com" className="input-field pl-11" required />
          </div>
          <button className="btn-primary w-full">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
}
