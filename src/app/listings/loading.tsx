export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="h-10 w-64 skeleton rounded mb-3"></div>
      <div className="h-4 w-40 skeleton rounded mb-8"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="h-56 skeleton"></div>
            <div className="p-4 space-y-2">
              <div className="h-3 w-20 skeleton rounded"></div>
              <div className="h-5 w-full skeleton rounded"></div>
              <div className="h-4 w-32 skeleton rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}