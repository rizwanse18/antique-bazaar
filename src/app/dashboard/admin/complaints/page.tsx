import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { formatDate } from "@/lib/utils";
import { ComplaintActions } from "./ComplaintActions";

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

export default async function AdminComplaints() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Admin Access Only</h1>
        <Link href="/dashboard" className="btn-primary">Dashboard</Link>
      </div>
    );
  }

  const complaints = await prisma.complaint.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: { user: { select: { name: true, email: true, role: true } } },
  });

  const open = complaints.filter(c => c.status === "OPEN").length;
  const helpMessages = complaints.filter(c => c.subject.startsWith("[Help Center]")).length;
  const directComplaints = complaints.length - helpMessages;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-4xl font-bold mb-2">Complaints Center</h1>
          <p className="text-antique-600">
            {complaints.length} total · {open} open · {helpMessages} from Help Center · {directComplaints} direct complaints
          </p>
        </div>
        <Link href="/dashboard/admin" className="btn-outline text-sm">← Back to Admin</Link>
      </div>

      {complaints.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-lg font-semibold mb-2">No complaints yet</p>
          <p className="text-sm text-antique-600">All clear!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {complaints.map(c => (
            <div key={c.id} className="card p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">{c.subject}</h3>
                  <p className="text-xs text-antique-500">
                    By <strong>{c.user.name}</strong> ({c.user.role}) · {c.user.email} · {formatDate(c.createdAt)}
                  </p>
                  <p className="text-xs text-antique-500">Category: {c.category}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${PRIORITY_STYLES[c.priority]}`}>{c.priority}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${STATUS_STYLES[c.status]}`}>{c.status}</span>
                </div>
              </div>
              <p className="text-sm text-antique-700 mb-3 whitespace-pre-wrap bg-antique-50 p-3 rounded">{c.description}</p>
              {c.adminNote && (
                <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded mb-3">
                  <p className="text-xs font-semibold text-green-800 mb-1">Admin Response:</p>
                  <p className="text-sm text-green-900 whitespace-pre-wrap">{c.adminNote}</p>
                </div>
              )}
              <ComplaintActions id={c.id} currentStatus={c.status} currentNote={c.adminNote || ""} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}