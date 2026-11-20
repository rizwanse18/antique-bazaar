import Link from "next/link";
import { AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { formatDate } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  OPEN: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  RESOLVED: "bg-green-100 text-green-800",
  CLOSED: "bg-gray-100 text-gray-700",
};

const PRIORITY_STYLES: Record<string, string> = {
  LOW: "bg-gray-100 text-gray-700",
  NORMAL: "bg-blue-100 text-blue-800",
  HIGH: "bg-orange-100 text-orange-800",
  URGENT: "bg-red-100 text-red-800",
};

export default async function MyComplaints() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">My Complaints</h1>
        <p className="mb-6">Please login</p>
        <Link href="/login" className="btn-primary">Login</Link>
      </div>
    );
  }

  const complaints = await prisma.complaint.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl font-bold text-antique-900 mb-2 flex items-center gap-3">
            <AlertCircle className="w-8 h-8" /> My Complaints
          </h1>
          <p className="text-antique-600">{complaints.length} complaints submitted</p>
        </div>
        <Link href="/contact" className="btn-primary">New Complaint</Link>
      </div>

      {complaints.length === 0 ? (
        <div className="card p-12 text-center">
          <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-4" />
          <p className="text-lg font-semibold mb-2">No complaints</p>
          <p className="text-sm text-antique-600 mb-6">Everything looks good!</p>
          <Link href="/contact" className="btn-outline">Contact Support</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {complaints.map(c => (
            <div key={c.id} className="card p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">{c.subject}</h3>
                  <p className="text-xs text-antique-500">
                    {c.category} · {formatDate(c.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${PRIORITY_STYLES[c.priority]}`}>{c.priority}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${STATUS_STYLES[c.status]}`}>{c.status}</span>
                </div>
              </div>
              <p className="text-sm text-antique-700 mb-3 whitespace-pre-wrap">{c.description}</p>
              {c.adminNote && (
                <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                  <p className="text-xs font-semibold text-green-800 mb-1">Admin Response:</p>
                  <p className="text-sm text-green-900 whitespace-pre-wrap">{c.adminNote}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}