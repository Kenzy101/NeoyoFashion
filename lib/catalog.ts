import type { PlateTone } from "./plate";

export type CollectionId = "core" | "ease" | "jewelry" | "accessories";

export type Product = {
  slug: string;
  name: string;
  collection: CollectionId;
  /** Amount in the smallest sensible unit of the display currency. */
  price: number;
  /** One line. The product page is photography, not copy. */
  note: string;
  tone: PlateTone;
  /** Tones for the gallery plates, in order. */
  gallery: PlateTone[];
  materials: string;
  atelier: string;
  care: string;
  sizes?: string[];
  /** Jewelry: render the 360° viewer instead of a static hero. */
  rotate?: boolean;
  /** Garments: render the slow fabric film beneath the gallery. */
  fabric?: string;
};

export type Collection = {
  id: CollectionId;
  title: string;
  lede: string;
  tone: PlateTone;
  /** The register the collection is shot in. */
  register: string;
};

export const COLLECTIONS: Record<CollectionId, Collection> = {
  core: {
    id: "core",
    title: "NEOYO Core",
    lede: "The permanent collection. Pieces that do not arrive and do not leave — cut once, corrected for years, and made to outlive the season that introduced them.",
    tone: "bone",
    register: "Editorial portrait, warm museum key, deep whitespace.",
  },
  ease: {
    id: "ease",
    title: "NEOYO Ease",
    lede: "Movement, unhurried. Softer constructions in the same disciplined hand — fabric that travels, drapes, and forgives.",
    tone: "stone",
    register: "Fabric in motion, low shutter, natural afternoon light.",
  },
  jewelry: {
    id: "jewelry",
    title: "Jewelry",
    lede: "Cast in Lagos, finished by hand. Brass, bronze and gold vermeil worked until the light behaves.",
    tone: "gold",
    register: "Macro, single hard key, 360° capture on a bone sweep.",
  },
  accessories: {
    id: "accessories",
    title: "Accessories",
    lede: "The finishing gesture. Leather, hardware and silk that carry the house monogram without ever announcing it.",
    tone: "espresso",
    register: "Object study, espresso ground, foil-stamped detail.",
  },
};

export const PRODUCTS: Product[] = [
  /* ------------------------------- CORE ------------------------------- */
  {
    slug: "the-monolith-coat",
    name: "The Monolith Coat",
    collection: "core",
    price: 890000,
    note: "One seam down the back. Nothing else asked to be there.",
    tone: "bone",
    gallery: ["bone", "architecture", "stone", "skin"],
    materials: "Double-faced Italian wool, 780gsm. Horn buttons.",
    atelier: "Cut and finished in Lagos over eleven days.",
    care: "Dry clean by specialist only. Rest on a broad shoulder.",
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "Wool, falling at quarter speed.",
  },
  {
    slug: "the-architect-blazer",
    name: "The Architect Blazer",
    collection: "core",
    price: 620000,
    note: "A shoulder built the way a building is built.",
    tone: "stone",
    gallery: ["stone", "bone", "architecture"],
    materials: "Compact wool twill. Bemberg cupro lining in bone.",
    atelier: "Hand-padded lapel. Fourteen fittings before release.",
    care: "Dry clean. Hang immediately.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "the-ivory-column-dress",
    name: "The Ivory Column",
    collection: "core",
    price: 745000,
    note: "It does not move until she does.",
    tone: "skin",
    gallery: ["skin", "bone", "stone"],
    materials: "Silk crêpe, four-ply. Concealed bone-white closure.",
    atelier: "Draped on the stand, never flat-patterned.",
    care: "Dry clean. Store rolled, never folded.",
    sizes: ["XS", "S", "M", "L"],
    fabric: "Crêpe, catching the room's only window.",
  },
  {
    slug: "the-espresso-trouser",
    name: "The Espresso Trouser",
    collection: "core",
    price: 385000,
    note: "The break falls exactly where it was told to.",
    tone: "espresso",
    gallery: ["espresso", "stone", "architecture"],
    materials: "Wool gabardine in espresso. Unlined to the knee.",
    atelier: "Single-pleat, self-faced waistband, hand-set.",
    care: "Dry clean. Press under a cloth.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },

  /* ------------------------------- EASE ------------------------------- */
  {
    slug: "the-sunday-shirt",
    name: "The Sunday Shirt",
    collection: "ease",
    price: 275000,
    note: "Worn open, and it still looks decided.",
    tone: "bone",
    gallery: ["bone", "skin", "stone"],
    materials: "Washed silk habotai. Mother-of-pearl.",
    atelier: "Garment-washed twice before finishing.",
    care: "Hand wash cold. Dry flat, away from light.",
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "Silk, moving on a slow exhale.",
  },
  {
    slug: "the-atelier-knit",
    name: "The Atelier Knit",
    collection: "ease",
    price: 340000,
    note: "The colour of the studio wall at four o'clock.",
    tone: "stone",
    gallery: ["stone", "bone", "skin"],
    materials: "Mongolian cashmere, two-ply, 12-gauge.",
    atelier: "Fully fashioned. Linked by hand at the shoulder.",
    care: "Hand wash cool. Reshape and dry flat.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    slug: "the-drift-trouser",
    name: "The Drift Trouser",
    collection: "ease",
    price: 298000,
    note: "It arrives in the room a moment after she does.",
    tone: "stone",
    gallery: ["stone", "architecture", "bone"],
    materials: "Linen-silk, sand-washed. Drawstring in bone.",
    atelier: "Cut wide from a single length.",
    care: "Machine wash gentle. Line dry.",
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "Linen-silk, drifting across a bone sweep.",
  },
  {
    slug: "the-long-robe",
    name: "The Long Robe",
    collection: "ease",
    price: 465000,
    note: "For the hour before, and the hour after.",
    tone: "skin",
    gallery: ["skin", "espresso", "stone"],
    materials: "Silk satin, bone white. Espresso piping.",
    atelier: "Piped by hand, corner to corner.",
    care: "Dry clean preferred.",
    sizes: ["One size"],
    fabric: "Satin, folding and unfolding.",
  },

  /* ------------------------------ JEWELRY ----------------------------- */
  {
    slug: "the-seal-ring",
    name: "The Seal Ring",
    collection: "jewelry",
    price: 210000,
    note: "The house mark, worn where it can be felt.",
    tone: "gold",
    gallery: ["gold", "espresso", "bone"],
    materials: "Solid brass, 3µ gold vermeil. Hand-engraved seal.",
    atelier: "Lost-wax cast in Lagos. Polished for two hours.",
    care: "Keep from water and fragrance. Buff with the cloth supplied.",
    sizes: ["48", "50", "52", "54", "56"],
    rotate: true,
  },
  {
    slug: "the-bronze-cuff",
    name: "The Bronze Cuff",
    collection: "jewelry",
    price: 265000,
    note: "Heavier than it looks. That is the point.",
    tone: "gold",
    gallery: ["gold", "skin", "espresso"],
    materials: "Cast bronze, 92g. Brushed interior, mirrored edge.",
    atelier: "Formed on a mandrel, finished by a single hand.",
    care: "Bronze will warm with wear. Do not lacquer.",
    sizes: ["S", "M", "L"],
    rotate: true,
  },
  {
    slug: "the-hairline-chain",
    name: "The Hairline Chain",
    collection: "jewelry",
    price: 175000,
    note: "Visible only when the light is right.",
    tone: "gold",
    gallery: ["gold", "skin", "bone"],
    materials: "0.9mm gold vermeil over sterling. Hidden clasp.",
    atelier: "Hand-linked, 42cm and 46cm lengths.",
    care: "Last on, first off.",
    sizes: ["42cm", "46cm"],
    rotate: true,
  },
  {
    slug: "the-monolith-earring",
    name: "The Monolith Earring",
    collection: "jewelry",
    price: 195000,
    note: "One plane, one shadow.",
    tone: "gold",
    gallery: ["gold", "espresso", "architecture"],
    materials: "Brushed brass, gold vermeil. Titanium post.",
    atelier: "Cut from sheet, folded once, never soldered.",
    care: "Store in the espresso-lined box supplied.",
    rotate: true,
  },

  /* ---------------------------- ACCESSORIES --------------------------- */
  {
    slug: "the-archive-bag",
    name: "The Archive Bag",
    collection: "accessories",
    price: 720000,
    note: "It holds a day. It reveals nothing.",
    tone: "espresso",
    gallery: ["espresso", "gold", "architecture"],
    materials: "Vegetable-tanned calf, espresso. Gold-tone hardware.",
    atelier: "Saddle-stitched. Edge-painted in four passes.",
    care: "Condition twice yearly. Store in the dust bag supplied.",
  },
  {
    slug: "the-bone-scarf",
    name: "The Bone Scarf",
    collection: "accessories",
    price: 155000,
    note: "The monogram, printed once, in the corner.",
    tone: "bone",
    gallery: ["bone", "skin", "stone"],
    materials: "Silk twill, 90 × 90cm. Hand-rolled hem.",
    atelier: "Screen-printed in six colourways of one colour.",
    care: "Dry clean only.",
    fabric: "Twill, turning slowly in still air.",
  },
  {
    slug: "the-wax-seal-belt",
    name: "The Wax Seal Belt",
    collection: "accessories",
    price: 240000,
    note: "The buckle is the seal from the packaging, cast in brass.",
    tone: "gold",
    gallery: ["gold", "espresso", "stone"],
    materials: "Espresso calf strap. Solid brass seal buckle.",
    atelier: "Buckle cast from the original wax-seal die.",
    care: "Keep dry. The brass will patina.",
    sizes: ["70", "75", "80", "85", "90"],
  },
  {
    slug: "the-travel-pouch",
    name: "The Travel Pouch",
    collection: "accessories",
    price: 135000,
    note: "Uncoated bone outside. Espresso within.",
    tone: "stone",
    gallery: ["stone", "espresso", "bone"],
    materials: "Bone-white canvas, espresso suede lining.",
    atelier: "Foil-stamped monogram, struck once.",
    care: "Spot clean only.",
  },
];

/* ----------------------------- selectors ----------------------------- */

export const byCollection = (id: CollectionId): Product[] =>
  PRODUCTS.filter((p) => p.collection === id);

export const bySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

/** Naira, grouped, no decimals — prices are never the loudest thing. */
export const formatPrice = (amount: number): string =>
  `₦${amount.toLocaleString("en-NG")}`;

/** The order carried into checkout. Static — there is no cart backend yet. */
export const SAMPLE_ORDER = [
  { slug: "the-monolith-coat", size: "M", qty: 1 },
  { slug: "the-seal-ring", size: "52", qty: 1 },
] as const;
