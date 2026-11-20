export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="font-serif text-5xl font-bold text-antique-900 dark:text-cream mb-6">About Antique Bazaar</h1>
      <p className="text-lg text-antique-700 dark:text-antique-300 mb-4">Founded in 2010, Antique Bazaar is the world's most trusted marketplace for authentic antiques. We connect collectors, museums, and enthusiasts with verified sellers from over 50 countries.</p>
      <p className="text-lg text-antique-700 dark:text-antique-300 mb-4">Every listing is reviewed by our team of expert authenticators. Payments are escrow-protected. Shipping is fully insured. We are committed to preserving cultural heritage while making rare treasures accessible to everyone.</p>
      <div className="grid grid-cols-3 gap-6 mt-12">
        <div className="text-center"><p className="text-4xl font-bold text-gold-500">50K+</p><p>Antiques</p></div>
        <div className="text-center"><p className="text-4xl font-bold text-gold-500">12K+</p><p>Sellers</p></div>
        <div className="text-center"><p className="text-4xl font-bold text-gold-500">98%</p><p>Happy Buyers</p></div>
      </div>
    </div>
  );
}
