import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-serif font-bold text-antique-700 mb-4">404</p>
        <h1 className="font-serif text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-antique-600 mb-8">The treasure you're looking for has vanished. Try browsing our collection.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-primary flex items-center gap-2"><Home className="w-4 h-4" /> Home</Link>
          <Link href="/listings" className="btn-outline flex items-center gap-2"><Search className="w-4 h-4" /> Browse</Link>
        </div>
      </div>
    </div>
  );
}