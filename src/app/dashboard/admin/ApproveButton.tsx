"use client";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";

export function ApproveButton({ listingId, action }: { listingId: string; action: "APPROVED" | "REJECTED" }) {
  const router = useRouter();
  async function handle() {
    const res = await fetch("/api/admin/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listingId, action }),
    });
    if (res.ok) {
      toast.success(`Listing ${action.toLowerCase()}`);
      router.refresh();
    } else {
      const d = await res.json();
      toast.error(d.error || "Failed");
    }
  }
  return action === "APPROVED" ? (
    <button onClick={handle} className="bg-green-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1 hover:bg-green-700">
      <Check className="w-3 h-3" /> Approve
    </button>
  ) : (
    <button onClick={handle} className="bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1 hover:bg-red-700">
      <X className="w-3 h-3" /> Reject
    </button>
  );
}