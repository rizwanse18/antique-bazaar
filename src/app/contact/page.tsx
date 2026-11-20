"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, AlertCircle, Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const CATEGORIES = [
  { value: "ORDER", label: "Order Problem" },
  { value: "PAYMENT", label: "Payment Issue" },
  { value: "LISTING", label: "Listing Issue" },
  { value: "ACCOUNT", label: "Account Problem" },
  { value: "OTHER", label: "Other" },
];

const PRIORITIES = [
  { value: "LOW", label: "Low" },
  { value: "NORMAL", label: "Normal" },
  { value: "HIGH", label: "High" },
  { value: "URGENT", label: "Urgent" },
];

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: form.get("subject"),
          category: form.get("category"),
          priority: form.get("priority"),
          description: form.get("description"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      toast.success("Complaint submitted! Admin will respond soon.");
      setSubmitted(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="font-serif text-5xl font-bold text-antique-900 mb-6 text-center">Contact & Support</h1>
      <p className="text-center text-antique-600 mb-10">We're here to help — 24/7</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card p-6 text-center">
          <Mail className="w-8 h-8 mx-auto mb-3 text-antique-700" />
          <h3 className="font-bold">Email</h3>
          <a href="mailto:antiqueitemmarketplace@gmail.com" className="text-sm text-antique-600 hover:text-antique-800 break-all">antiqueitemmarketplace@gmail.com</a>
        </div>
        <div className="card p-6 text-center">
          <Phone className="w-8 h-8 mx-auto mb-3 text-antique-700" />
          <h3 className="font-bold">Phone / WhatsApp</h3>
          <a href="tel:03479182632" className="text-sm text-antique-600 hover:text-antique-800">0347 9182632</a>
        </div>
        <div className="card p-6 text-center">
          <MapPin className="w-8 h-8 mx-auto mb-3 text-antique-700" />
          <h3 className="font-bold">Location</h3>
          <p className="text-sm text-antique-600">Peshawar, Pakistan</p>
        </div>
      </div>

      <div className="card p-8">
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="w-7 h-7 text-red-500" />
          <div>
            <h2 className="font-serif text-2xl font-bold">Submit a Complaint</h2>
            <p className="text-sm text-antique-500">Goes directly to admin — no email needed</p>
          </div>
        </div>

        {submitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
            <div>
              <p className="font-semibold text-green-900">Complaint received!</p>
              <p className="text-sm text-green-700">Admin will review and respond soon. Track status in <a href="/dashboard/complaints" className="underline">My Complaints</a>.</p>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="font-semibold mb-1 block">Subject *</label>
            <input name="subject" placeholder="Brief description of the issue" className="input-field" required minLength={5} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold mb-1 block">Category *</label>
              <select name="category" className="input-field" required>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="font-semibold mb-1 block">Priority</label>
              <select name="priority" className="input-field" defaultValue="NORMAL">
                {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold mb-1 block">Description *</label>
            <textarea name="description" placeholder="Explain the issue in detail..." className="input-field h-40" required minLength={10}></textarea>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
            <Send className="w-5 h-5" /> {loading ? "Submitting..." : "Submit Complaint to Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}