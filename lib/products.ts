export type WeightId = "classic" | "heavyweight";
export type PatternId = "meander" | "laurel";
export type ColourwayId = "fjord" | "dune" | "slate";

export type Weight = {
  id: WeightId;
  label: string;
  gsm: number; // PLACEHOLDER: confirm exact gsm with supplier
  price: number; // PLACEHOLDER: confirm final retail price
};

export type Product = {
  slug: string;
  name: string;
  pattern: PatternId;
  colourway: { id: ColourwayId; label: string; hex: string };
  weights: Weight[];
  images: {
    main: string;
    detail?: string;
    alt?: string;
    lifestyle?: string;
  };
  shortDescription: string;
  description: string;
  care: string[];
  composition: string;
};

export const CURRENCY = "GBP"; // PLACEHOLDER — confirm: owner is based in Oslo; may prefer NOK or EUR

// Stripe price IDs — PLACEHOLDER: create products in Stripe dashboard, then fill these in
export const STRIPE_PRICE_IDS: Record<WeightId, string> = {
  classic:     "price_PLACEHOLDER_classic",
  heavyweight: "price_PLACEHOLDER_heavyweight",
};

const WEIGHTS: Weight[] = [
  {
    id: "classic",
    label: "Classic weight",
    gsm: 400, // PLACEHOLDER ~400 — confirm with supplier
    price: 185, // PLACEHOLDER — confirm final retail price
  },
  {
    id: "heavyweight",
    label: "Heavyweight",
    gsm: 600, // PLACEHOLDER ~600 — confirm with supplier
    price: 245, // PLACEHOLDER — confirm final retail price
  },
];

const CARE = [
  "Dry clean, or hand wash cold and dry flat.",
  "Store folded with cedar.",
  "Pills are cashmere being cashmere — de-pill gently and it improves with age.",
];

export const products: Product[] = [
  // ─── MEANDER ───────────────────────────────────────────────────────
  {
    slug: "meander-fjord",
    name: "Meander Throw",
    pattern: "meander",
    colourway: { id: "fjord", label: "Fjord", hex: "#8DA6BE" },
    weights: WEIGHTS,
    images: {
      main:   "/products/meander-fjord-main.jpg",
      detail: "/products/meander-fjord-detail.jpg",
      alt:    "/products/meander-fjord-alt.jpg",
    },
    shortDescription: "Meander throw in Fjord — 100% cashmere with hand-knotted fringe.",
    description:
      "A Fjord Meander throw in pure cashmere, finished with a hand-knotted fringe. The Greek-key pattern runs in soft dusty-blue — geometry that has meant 'unending' for three thousand years. Generous enough for two, light enough to fold into a bag.",
    care: CARE,
    composition: "100% cashmere",
  },
  {
    slug: "meander-dune",
    name: "Meander Throw",
    pattern: "meander",
    colourway: { id: "dune", label: "Dune", hex: "#C2A98A" },
    weights: WEIGHTS,
    images: {
      main:   "/products/meander-dune-main.jpg",
      detail: "/products/meander-dune-detail.jpg",
      alt:    "/products/meander-dune-alt.jpg",
    },
    shortDescription: "Meander throw in Dune — 100% cashmere with hand-knotted fringe.",
    description:
      "A Dune Meander throw in pure cashmere, finished with a hand-knotted fringe. The Greek-key runs in warm sand — the colour of light on stone at the end of the day. Generous enough for two, light enough to fold into a bag.",
    care: CARE,
    composition: "100% cashmere",
  },
  {
    slug: "meander-slate",
    name: "Meander Throw",
    pattern: "meander",
    colourway: { id: "slate", label: "Slate", hex: "#7E8488" },
    weights: WEIGHTS,
    images: {
      main:   "/products/meander-slate-main.jpg",
      detail: "/products/meander-slate-detail.jpg",
      alt:    "/products/meander-slate-alt.jpg",
    },
    shortDescription: "Meander throw in Slate — 100% cashmere with hand-knotted fringe.",
    description:
      "A Slate Meander throw in pure cashmere, finished with a hand-knotted fringe. The Greek-key holds its shape in cool grey — quiet, precise, made to last decades. Generous enough for two, light enough to fold into a bag.",
    care: CARE,
    composition: "100% cashmere",
  },
  // ─── LAUREL ────────────────────────────────────────────────────────
  {
    slug: "laurel-fjord",
    name: "Laurel Throw",
    pattern: "laurel",
    colourway: { id: "fjord", label: "Fjord", hex: "#8DA6BE" },
    weights: WEIGHTS,
    images: {
      main:   "/products/laurel-fjord-main.jpg",
      detail: "/products/laurel-fjord-detail.jpg",
      alt:    "/products/laurel-fjord-alt.jpg",
    },
    shortDescription: "Laurel throw in Fjord — 100% cashmere with hand-knotted fringe.",
    description:
      "A Fjord Laurel throw in pure cashmere, finished with a hand-knotted fringe. A leaf that climbs the cloth, soft-edged and unhurried — in the cool blue of still water. Generous enough for two, light enough to fold into a bag.",
    care: CARE,
    composition: "100% cashmere",
  },
  {
    slug: "laurel-dune",
    name: "Laurel Throw",
    pattern: "laurel",
    colourway: { id: "dune", label: "Dune", hex: "#C2A98A" },
    weights: WEIGHTS,
    images: {
      main:   "/products/laurel-dune-main.jpg",
      detail: "/products/laurel-dune-detail.jpg",
      alt:    "/products/laurel-dune-alt.jpg",
    },
    shortDescription: "Laurel throw in Dune — 100% cashmere with hand-knotted fringe.",
    description:
      "A Dune Laurel throw in pure cashmere, finished with a hand-knotted fringe. A leaf that climbs the cloth, soft-edged and unhurried — warm sand catching the weave. Generous enough for two, light enough to fold into a bag.",
    care: CARE,
    composition: "100% cashmere",
  },
  {
    slug: "laurel-slate",
    name: "Laurel Throw",
    pattern: "laurel",
    colourway: { id: "slate", label: "Slate", hex: "#7E8488" },
    weights: WEIGHTS,
    images: {
      main:   "/products/laurel-slate-main.jpg",
      detail: "/products/laurel-slate-detail.jpg",
      alt:    "/products/laurel-slate-alt.jpg",
    },
    shortDescription: "Laurel throw in Slate — 100% cashmere with hand-knotted fringe.",
    description:
      "A Slate Laurel throw in pure cashmere, finished with a hand-knotted fringe. The leaf pattern in cool grey — unhurried, precise, made to live in the room for years. Generous enough for two, light enough to fold into a bag.",
    care: CARE,
    composition: "100% cashmere",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelated(product: Product, count = 3): Product[] {
  const samePattern = products.filter(
    (p) => p.slug !== product.slug && p.pattern === product.pattern
  );
  const sameColour = products.filter(
    (p) =>
      p.slug !== product.slug &&
      p.pattern !== product.pattern &&
      p.colourway.id === product.colourway.id
  );
  return [...samePattern, ...sameColour].slice(0, count);
}
