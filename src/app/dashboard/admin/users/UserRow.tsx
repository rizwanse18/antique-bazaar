"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Shield, ShieldOff, Ban, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/utils";

type U = {
  id: string; name: string; email: string; role: string;
  kycVerified: boolean; isActive: boolean; createdAt: string;
  listings: number; orders: number; bids: number;
};

export function UserRow({ user, currentUserId }: { user: U; currentUserId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const self = user.id === currentUserId;

  async function patch(data: any) {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, ...data }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error);
      }
      toast.success("Updated");
      router.refresh();
    } catch (e: any) { toast.error(e.message); }
    finally { setBusy(false); }
  }

  async function del() {
    if (!confirm(`Delete user "${user.name}"? This will delete ALL their listings, orders, bids. Cannot undo.`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/users?id=${user.id}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error);
      }
      toast.success("User deleted");
      router.refresh();
    } catch (e: any) { toast.error(e.message); }
    finally { setBusy(false); }
  }

  return (
    <tr className="border-t border-antique-100 hover:bg-antique-50/50">
      <td className="p-3">
        <p className="font-semibold">{user.name} {self && <span className="text-xs text-antique-500">(you)</span>}</p>
        <p className="text-xs text-antique-500">{user.email}</p>
        <p className="text-xs text-antique-400">Joined {formatDate(user.createdAt)}</p>
      </td>
      <td className="p-3">
        <select value={user.role} onChange={e => patch({ role: e.target.value })} disabled={self || busy}
          className={`text-xs px-2 py-1 rounded-full font-semibold border-0 ${
            user.role === "ADMIN" ? "bg-red-100 text-red-800" :
            user.role === "SELLER" ? "bg-gold-100 text-yellow-800" :
            "bg-blue-100 text-blue-800"
          }`}>
          <option value="BUYER">BUYER</option>
          <option value="SELLER">SELLER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </td>
      <td className="p-3">
        <button onClick={() => patch({ kycVerified: !user.kycVerified })} disabled={busy}
          className={`text-xs px-2 py-1 rounded-full font-semibold ${user.kycVerified ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
          {user.kycVerified ? "✓ Verified" : "Unverified"}
        </button>
      </td>
      <td className="p-3">
        <button onClick={() => patch({ isActive: !user.isActive })} disabled={busy || self}
          className={`text-xs px-2 py-1 rounded-full font-semibold ${user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {user.isActive ? "Active" : "Banned"}
        </button>
      </td>
      <td className="p-3 text-xs text-antique-600">
        📦 {user.listings} · 🛒 {user.orders} · 🎯 {user.bids}
      </td>
      <td className="p-3">
        <div className="flex gap-1">
          {user.role !== "ADMIN" && (
            <button onClick={() => patch({ role: "ADMIN" })} disabled={busy} className="bg-red-600 text-white px-2 py-1 rounded text-xs" title="Make Admin"><Shield className="w-3 h-3" /></button>
          )}
          {user.role === "ADMIN" && !self && (
            <button onClick={() => patch({ role: "BUYER" })} disabled={busy} className="bg-gray-600 text-white px-2 py-1 rounded text-xs" title="Demote"><ShieldOff className="w-3 h-3" /></button>
          )}
          <button onClick={() => patch({ isActive: !user.isActive })} disabled={busy || self} className={`px-2 py-1 rounded text-xs ${user.isActive ? "bg-orange-600 text-white" : "bg-green-600 text-white"}`} title={user.isActive ? "Ban" : "Unban"}>
            {user.isActive ? <Ban className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
          </button>
          <button onClick={del} disabled={busy || self} className="bg-red-700 text-white px-2 py-1 rounded text-xs" title="Delete user"><Trash2 className="w-3 h-3" /></button>
        </div>
      </td>
    </tr>
  );
}