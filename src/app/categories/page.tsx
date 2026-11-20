import Link from "next/link";
import { categories } from "@/lib/data";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-serif text-5xl font-bold text-antique-900 dark:text-cream mb-8 text-center">All Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map(c => (
          <Link key={c.id} href={`/listings?category=${c.id}`} className="card p-8 text-center hover:scale-105 group">
            <div className="w-20 h-20 bg-gradient-to-br from-antique-100 to-antique-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-gold-400 group-hover:to-gold-500">
              <span className="text-3xl">🏺</span>
            </div>
            <h3 className="font-serif font-bold text-lg">{c.name}</h3>
            <p className="text-sm text-antique-600">{c.count} items</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
