"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  listingId: string;
  title: string;
  price: number;
  image: string;
  sellerName: string;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (listingId: string) => void;
  clear: () => void;
  total: () => number;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((s) => {
          if (s.items.some((i) => i.listingId === item.listingId)) return s;
          return { items: [...s.items, item] };
        }),
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.listingId !== id) })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price, 0),
    }),
    { name: "antique-cart" }
  )
);