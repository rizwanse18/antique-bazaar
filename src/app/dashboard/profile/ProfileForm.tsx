"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, MapPin, CreditCard, Image as ImageIcon, Save } from "lucide-react";
import toast from "react-hot-toast";

export function ProfileForm({ initial }: { initial: any }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: initial.name || "",
    phone: initial.phone || "",
    mobile: initial.mobile || "",
    address: initial.address || "",
    city: initial.city || "",
    cnic: initial.cnic || "",
    profilePic: initial.profilePic || "",
    bio: initial.bio || "",
  });
  const [saving, setSaving] = useState(false);

  function update(k: string, v: string) {
    setForm({ ...form, [k]: v });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("Profile updated!");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-6">
      {/* PROFILE PICTURE */}
      <div className="card p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><ImageIcon className="w-5 h-5" /> Profile Picture</h3>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-antique-100 dark:bg-antique-800 flex items-center justify-center">
            {form.profilePic ? (
              <img src={form.profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-antique-400" />
            )}
          </div>
          <div className="flex-1">
            <label className="text-sm font-semibold mb-1 block">Image URL</label>
            <input value={form.profilePic} onChange={e => update("profilePic", e.target.value)} placeholder="https://..." className="input-field" />
          </div>
        </div>
      </div>

      {/* BASIC INFO */}
      <div className="card p-6 space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2"><User className="w-5 h-5" /> Basic Information</h3>
        <div>
          <label className="text-sm font-semibold mb-1 block">Full Name *</label>
          <input value={form.name} onChange={e => update("name", e.target.value)} className="input-field" required />
        </div>
        <div>
          <label className="text-sm font-semibold mb-1 block flex items-center gap-1"><Mail className="w-4 h-4" /> Email (Read-only)</label>
          <input value={initial.email} disabled className="input-field bg-antique-50 dark:bg-antique-800 cursor-not-allowed" />
        </div>
        <div>
          <label className="text-sm font-semibold mb-1 block">Bio</label>
          <textarea value={form.bio} onChange={e => update("bio", e.target.value)} className="input-field h-20" placeholder="Tell us about yourself..." />
        </div>
      </div>

      {/* CONTACT */}
      <div className="card p-6 space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2"><Phone className="w-5 h-5" /> Contact Details</h3>
        <div>
          <label className="text-sm font-semibold mb-1 block">Mobile Number *</label>
          <input value={form.mobile} onChange={e => update("mobile", e.target.value)} placeholder="0300 1234567" className="input-field" />
        </div>
        <div>
          <label className="text-sm font-semibold mb-1 block">Phone (Alternate)</label>
          <input value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="Optional" className="input-field" />
        </div>
      </div>

      {/* ADDRESS */}
      <div className="card p-6 space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2"><MapPin className="w-5 h-5" /> Address</h3>
        <div>
          <label className="text-sm font-semibold mb-1 block">Complete Address</label>
          <textarea value={form.address} onChange={e => update("address", e.target.value)} placeholder="House #, Street, Area" className="input-field h-20" />
        </div>
        <div>
          <label className="text-sm font-semibold mb-1 block">City</label>
          <input value={form.city} onChange={e => update("city", e.target.value)} placeholder="Peshawar" className="input-field" />
        </div>
      </div>

      {/* KYC (SELLER) */}
      {(initial.role === "SELLER" || initial.role === "ADMIN") && (
        <div className="card p-6 space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2"><CreditCard className="w-5 h-5" /> Seller KYC</h3>
          <div>
            <label className="text-sm font-semibold mb-1 block">CNIC / ID Number</label>
            <input value={form.cnic} onChange={e => update("cnic", e.target.value)} placeholder="12345-6789012-3" className="input-field" />
          </div>
          <p className="text-xs text-antique-500 dark:text-antique-300">
            Status: {initial.kycVerified ? "✅ Verified" : "⏳ Pending verification"}
          </p>
        </div>
      )}

      <button type="submit" disabled={saving} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
        <Save className="w-5 h-5" /> {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}