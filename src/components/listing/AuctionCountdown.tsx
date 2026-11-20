"use client";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function AuctionCountdown({ endTime, compact = false }: { endTime: string | Date; compact?: boolean }) {
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    const end = new Date(endTime).getTime();
    const tick = () => setRemaining(Math.max(0, end - Date.now()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const mins = Math.floor((remaining % 3600000) / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);

  if (remaining <= 0) {
    return <span className="text-xs text-red-600 font-bold">Auction Ended</span>;
  }

  if (compact) {
    return (
      <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {days > 0 ? `${days}d ${hours}h` : hours > 0 ? `${hours}h ${mins}m` : `${mins}m ${secs}s`}
      </div>
    );
  }

  return (
    <div className={`flex gap-2 ${remaining < 300000 ? "animate-pulse" : ""}`}>
      {[
        { label: "Days", value: days },
        { label: "Hours", value: hours },
        { label: "Mins", value: mins },
        { label: "Secs", value: secs },
      ].map((t) => (
        <div key={t.label} className="bg-antique-900 text-cream rounded-lg px-3 py-2 text-center min-w-[60px]">
          <div className="text-xl font-bold">{String(t.value).padStart(2, "0")}</div>
          <div className="text-xs text-antique-300">{t.label}</div>
        </div>
      ))}
    </div>
  );
}