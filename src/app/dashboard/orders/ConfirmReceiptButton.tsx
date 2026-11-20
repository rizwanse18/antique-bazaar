"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export function ConfirmReceiptButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    if (loading) return;

    // Use window.confirm explicitly, and rename function to avoid clash
    const ok = window.confirm(
      "Confirm you have received this item? You will be able to write a review after."
    );
    if (!ok) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "DELIVERED" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast.success("Delivery confirmed! You can now write a review.");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleConfirm}
      disabled={loading}
      className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-50"
    >
      <CheckCircle className="w-4 h-4" />
      {loading ? "Confirming..." : "Confirm Receipt"}
    </button>
  );
}