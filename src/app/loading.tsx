export default function Loading() {
  return (
    <div>
      <section className="bg-antique-900 py-24">
        <div className="container mx-auto px-4">
          <div className="h-8 w-64 skeleton rounded mb-6"></div>
          <div className="h-16 w-full max-w-2xl skeleton rounded mb-4"></div>
          <div className="h-6 w-96 skeleton rounded mb-8"></div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card p-6">
                <div className="h-16 w-16 skeleton rounded-full mb-3"></div>
                <div className="h-4 w-24 skeleton rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}