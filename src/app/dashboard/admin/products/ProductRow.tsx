"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Check, X, Star, Eye, Pencil, Save } from "lucide-react";
import toast from "react-hot-toast";
import { formatPrice } from "@/lib/utils";

type L = {
  id: string;
  title: string;
  category: string;
  images: string;
  price: number | null;
  startingBid: number | null;
  status: string;
  featured: boolean;
  createdAt: string;
  sellerName: string;
  sellerEmail: string;
  bidsCount: number;
  ordersCount: number;
  reviewsCount: number;
};

export function ProductRow({ listing }: { listing: L }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(listing.title);
  const [price, setPrice] = useState(listing.price || listing.startingBid || 0);
  const [busy, setBusy] = useState(false);

  const img = JSON.parse(listing.images)[0];

  async function api(method: string, body?: any) {
    setBusy(true);
    try {
      const url = method === "DELETE" ? `/api/admin/listings?id=${listing.id}` : "/api/admin/listings";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed");
      }
      toast.success("Done");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function deleteListing() {
    if (!confirm(`Delete "${listing.title}"? This cannot be undone.`)) return;
    await api("DELETE");
  }

  async function saveEdit() {
    await api("PATCH", { id: listing.id, title, price });
    setEditing(false);
  }

  return (
    <tr className="border-t border-antique-100 hover:bg-antique-50/50">
      <td className="p-3">
        <div className="flex gap-2 items-center">
          <img src={img} alt={listing.title} className="w-12 h-12 object-cover rounded" />
          <div className="min-w-0">
            {editing ? (
              <input value={title} onChange={e => setTitle(e.target.value)} className="input-field text-xs py-1" />
            ) : (
              <Link href={`/listings/${listing.id}`} className="font-semibold hover:text-antique-700 line-clamp-1">{listing.title}</Link>
            )}
            <p className="text-xs text-antique-500">{listing.category}</p>
          </div>
        </div>
      </td>
      <td className="p-3">
        <p className="text-xs font-semibold">{listing.sellerName}</p>
        <p className="text-xs text-antique-500">{listing.sellerEmail}</p>
      </td>
      <td className="p-3">
        {editing ? (
          <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="input-field text-xs py-1 w-24" />
        ) : (
          <span className="font-semibold">{formatPrice(listing.price || listing.startingBid || 0)}</span>
        )}
      </td>
      <td className="p-3">
        <select value={listing.status} onChange={e => api("PATCH", { id: listing.id, status: e.target.value })}
          className={`text-xs px-2 py-1 rounded-full font-semibold border-0 ${
            listing.status === "APPROVED" ? "bg-green-100 text-green-800" :
            listing.status === "SOLD" ? "bg-blue-100 text-blue-800" :
            listing.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
            "bg-red-100 text-red-800"
          }`}>
          <option value="PENDING">PENDING</option>
          <option value="APPROVED">APPROVED</option>
          <option value="SOLD">SOLD</option>
          <option value="REJECTED">REJECTED</option>
        </select>
      </td>
      <td className="p-3 text-xs text-antique-600">
        <span>👁 {listing.bidsCount} bids</span><br />
        <span>🛒 {listing.ordersCount} orders</span><br />
        <span>⭐ {listing.reviewsCount} reviews</span>
      </td>
      <td className="p-3">
        <div className="flex gap-1 flex-wrap">
          {editing ? (
            <>
              <button onClick={saveEdit} disabled={busy} className="bg-green-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"><Save className="w-3 h-3" /> Save</button>
              <button onClick={() => { setEditing(false); setTitle(listing.title); setPrice(listing.price || listing.startingBid || 0); }} className="bg-gray-300 text-gray-800 px-2 py-1 rounded text-xs">Cancel</button>
            </>
          ) : (
            <>
              <Link href={`/listings/${listing.id}`} className="bg-antique-600 text-white px-2 py-1 rounded text-xs"><Eye className="w-3 h-3" /></Link>
              <button onClick={() => setEditing(true)} className="bg-blue-600 text-white px-2 py-1 rounded text-xs"><Pencil className="w-3 h-3" /></button>
              {listing.status === "PENDING" && (
                <button onClick={() => api("PATCH", { id: listing.id, status: "APPROVED" })} className="bg-green-600 text-white px-2 py-1 rounded text-xs" title="Approve"><Check className="w-3 h-3" /></button>
              )}
              <button onClick={() => api("PATCH", { id: listing.id, featured: !listing.featured })} className={`px-2 py-1 rounded text-xs ${listing.featured ? "bg-gold-500 text-white" : "bg-gray-200"}`} title="Toggle featured"><Star className="w-3 h-3" /></button>
              <button onClick={deleteListing} disabled={busy} className="bg-red-600 text-white px-2 py-1 rounded text-xs" title="Delete"><Trash2 className="w-3 h-3" /></button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}