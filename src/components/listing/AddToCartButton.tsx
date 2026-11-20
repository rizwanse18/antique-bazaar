"use client";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import toast from "react-hot-toast";

export default function AddToCartButton({
  listing,
}: {
  listing: { id: string; title: string; price: number; image: string; sellerName: string };
}) {
  const { addItem, items } = useCart();
  const inCart = items.some((i) => i.listingId === listing.id);

  function add() {
    addItem({
      listingId: listing.id,
      title: listing.title,
      price: listing.price,
      image: listing.image,
      sellerName: listing.sellerName,
    });
    toast.success("Added to cart!");
  }

  if (inCart) {
    return (
      <button className="btn-outline flex-1 flex items-center justify-center gap-2" disabled>
        <ShoppingBag className="w-5 h-5" /> In Cart
      </button>
    );
  }

  return (
    <button onClick={add} className="btn-primary flex-1 flex items-center justify-center gap-2">
      <ShoppingBag className="w-5 h-5" /> Add to Cart
    </button>
  );
}