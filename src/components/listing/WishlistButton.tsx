"use client";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

export default function WishlistButton({ listingId, size = "md" }: { listingId: string; size?: "sm" | "md" | "lg" }) {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/wishlist")
      .then(r => r.json())
      .then(d => {
        if (d.items?.some((i: any) => i.listingId === listingId)) setActive(true);
      })
      .catch(() => {});
  }, [listingId]);

  async function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setActive(data.added);
      toast.success(data.added ? "Added to wishlist" : "Removed from wishlist");
    } catch (err: any) {
      toast.error(err.message || "Login required");
    } finally {
      setLoading(false);
    }
  }

  const sizes = { sm: "w-8 h-8", md: "w-9 h-9", lg: "w-12 h-12" };
  const iconSizes = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`${sizes[size]} bg-white/90 dark:bg-antique-900/90 rounded-full flex items-center justify-center transition ${active ? "text-red-500" : "text-antique-500 hover:text-red-500"}`}
      aria-label="Wishlist"
    >
      <Heart className={`${iconSizes[size]} ${active ? "fill-red-500" : ""}`} />
    </button>
  );
}