"use client";
import { useEffect, useState } from "react";
import { Star, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

type Review = { id: string; rating: number; comment: string | null; createdAt: string; user: { name: string } };

export default function ReviewSection({
  listingId,
  canReview,
}: {
  listingId: string;
  canReview: boolean;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avg, setAvg] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  async function load() {
    const res = await fetch(`/api/reviews?listingId=${listingId}`);
    const data = await res.json();
    setReviews(data.reviews || []);
    setAvg(data.avg || 0);
    // check own review
  }

  useEffect(() => { load(); }, [listingId]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, rating, comment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("Review posted!");
      setComment("");
      setRating(5);
      setAlreadyReviewed(true);
      await load();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif font-bold text-xl flex items-center gap-2">
          <MessageCircle className="w-5 h-5" /> Reviews ({reviews.length})
        </h3>
        {reviews.length > 0 && (
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-gold-500 text-gold-500" />
            <span className="font-bold text-lg">{avg}</span>
            <span className="text-sm text-antique-500">/ 5</span>
          </div>
        )}
      </div>

      {canReview && !alreadyReviewed && (
        <form onSubmit={submit} className="mb-6 p-4 bg-antique-50 rounded-lg space-y-3">
          <p className="font-semibold text-sm">Write a Review</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} type="button" onClick={() => setRating(n)}>
                <Star className={`w-7 h-7 ${n <= rating ? "fill-gold-500 text-gold-500" : "text-antique-300"}`} />
              </button>
            ))}
          </div>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            className="input-field h-24" />
          <button type="submit" disabled={loading} className="btn-primary text-sm py-2 px-4 disabled:opacity-50">
            {loading ? "Posting..." : "Post Review"}
          </button>
        </form>
      )}

      {!canReview && reviews.length === 0 && (
        <p className="text-sm text-antique-500 mb-4">No reviews yet. Buy this item to be the first to review!</p>
      )}

      {reviews.length > 0 ? (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {reviews.map(r => (
            <div key={r.id} className="p-3 bg-antique-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-sm">{r.user.name}</p>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(n => (
                    <Star key={n} className={`w-3 h-3 ${n <= r.rating ? "fill-gold-500 text-gold-500" : "text-antique-300"}`} />
                  ))}
                </div>
              </div>
              {r.comment && <p className="text-sm text-antique-700">{r.comment}</p>}
              <p className="text-xs text-antique-400 mt-1">{new Date(r.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}