"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

export function ComplaintActions({ id, currentStatus, currentNote }: { id: string; currentStatus: string; currentNote: string }) {
  const router = useRouter();
  const [note, setNote] = useState(currentNote);
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);
    try {
      const res = await fetch(`/api/complaints/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNote: note }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Complaint updated");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-t pt-3 space-y-2">
      <div className="flex gap-2 flex-wrap">
        {["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"].map(s => (
          <button key={s} onClick={() => setStatus(s)}
            className={`text-xs px-3 py-1 rounded-full font-semibold transition ${status === s ? "bg-antique-700 text-white" : "bg-antique-100 hover:bg-antique-200"}`}>
            {s}
          </button>
        ))}
      </div>
      <textarea value={note} onChange={(e) => setNote(e.target.value)}
        placeholder="Admin response to customer..."
        className="input-field h-20 text-sm" />
      <button onClick={save} disabled={loading}
        className="btn-primary text-sm py-2 px-4 flex items-center gap-2 disabled:opacity-50">
        <Send className="w-4 h-4" /> {loading ? "Saving..." : "Update & Respond"}
      </button>
    </div>
  );
}