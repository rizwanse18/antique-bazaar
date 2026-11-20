export const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800",
  "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800",
  "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800",
  "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800",
  "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800",
  "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800",
];

export function pickImages(count = 3, seed = "") {
  const h = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return Array.from({ length: count }, (_, i) => DEMO_IMAGES[(h + i) % DEMO_IMAGES.length]);
}
