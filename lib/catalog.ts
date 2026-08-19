import type { PlateTone } from "./plate";
import { GARMENT_SIZES } from "./sizing";

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
  /**
   * Media manifest keys, in gallery order. The first is the hero.
   * An empty list means the piece is still waiting on photography and
   * falls back to the procedural plate.
   */
  shots: string[];
  /** Colour treatment — see Plate. Supplier stills are graded. */
  grade?: "campaign" | "studio";
  materials: string;
  atelier: string;
  care: string;
  sizes?: string[];
  /**
   * Which line within the collection this piece belongs to. Only Core is
   * divided; everything else is a single run and leaves this unset.
   */
  line?: string;
  /** Jewelry: offer the 360° viewer alongside the gallery. */
  rotate?: boolean;
  /** Garments: render the slow fabric film beneath the gallery. */
  fabric?: string;
};

/**
 * A line within a collection. Core holds two; Ease, Jewelry and
 * Accessories are each a single run and define none, which is what makes
 * the collection page render a plain grid rather than tabs.
 */
export type CollectionLine = {
  id: string;
  title: string;
  /** One sentence. It sits under the tabs, so it must be short. */
  lede: string;
  hero?: string;
};

export type Collection = {
  id: CollectionId;
  title: string;
  lede: string;
  tone: PlateTone;
  /** The hero frame for the collection page. */
  hero?: string;
  /** The register the collection is shot in. */
  register: string;
  /** Present only where the collection is divided. */
  lines?: CollectionLine[];
};

export const COLLECTIONS: Record<CollectionId, Collection> = {
  core: {
    id: "core",
    title: "NEOYO Core",
    lede: "The permanent collection. Pieces that do not arrive and do not leave — cut once, corrected for years, and made to outlive the season that introduced them.",
    tone: "bone",
    hero: "1767551647754",
    register: "Editorial portrait and gallery still, warm museum key, deep whitespace.",
    lines: [
      {
        id: "lumina",
        title: "Lumina",
        lede: "The pieces that catch the room. Metallic, bonded and bright — cut to be seen from across it.",
        hero: "img-5708",
      },
      {
        id: "within-her",
        title: "Within Her",
        lede: "The quieter half. Ivory, bouclé and organza, worked so the detail only arrives when she is close.",
        hero: "img-5714",
      },
    ],
  },
  ease: {
    id: "ease",
    title: "NEOYO Ease",
    lede: "Movement, unhurried. Softer constructions in the same disciplined hand — fabric that travels, drapes, and forgives.",
    tone: "stone",
    hero: "kal03419",
    register: "Natural afternoon light, terracotta walls, the rail still in frame.",
  },
  jewelry: {
    id: "jewelry",
    title: "Jewelry",
    lede: "Stone and gold, chosen one bead at a time. Quartz, citrine, amethyst and pearl, strung and set by hand.",
    tone: "gold",
    hero: "img-5667",
    register: "Macro, single hard key, on satin and stone.",
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
  /* ------------------------------- CORE -------------------------------
     The gallery pieces — shot on the stand under museum light, and again
     on the body. */
  {
    slug: "the-tulle-drop-dress",
    name: "The Tulle Drop Dress",
    collection: "core",
    price: 745000,
    note: "Tailored to the hip, and then it simply lets go.",
    tone: "bone",
    shots: ["img-5713", "1767551647754", "1767372347865-2"],
    materials: "Bouclé tweed bodice. Silk organza and lace tiering.",
    atelier: "Draped on the stand. Nine days of tiering by hand.",
    care: "Dry clean by specialist only. Hang from the shoulder.",
    sizes: GARMENT_SIZES,
    line: "within-her",
    fabric: "Organza, falling at quarter speed.",
  },
  {
    slug: "the-rosette-lattice",
    name: "The Rosette Lattice",
    collection: "core",
    price: 890000,
    note: "Every rosette is tied where two lines cross. There are forty-one.",
    tone: "bone",
    shots: ["img-5714"],
    materials: "Ivory bouclé. Hand-tied velvet rosettes on a chain lattice.",
    atelier: "Cut and finished in Lagos over eleven days.",
    care: "Dry clean by specialist only. Store boxed.",
    sizes: GARMENT_SIZES,
    line: "within-her",
  },
  {
    slug: "the-ruffle-gown",
    name: "The Ruffle Gown",
    collection: "core",
    price: 1150000,
    note: "Metallic at the shoulder, and then it descends into weather.",
    tone: "skin",
    shots: ["img-5708", "1767531220127"],
    materials: "Liquid magenta lamé. Layered velvet and lace ruffling.",
    atelier: "Peplum set by hand. The skirt is built in fourteen tiers.",
    care: "Dry clean by specialist only.",
    sizes: GARMENT_SIZES,
    line: "lumina",
    fabric: "Velvet and lace, turning in still air.",
  },
  {
    slug: "the-turquoise-column",
    name: "The Turquoise Column",
    collection: "core",
    price: 685000,
    note: "One colour, one line, one slit exactly where it was told to be.",
    tone: "stone",
    shots: ["img-5733"],
    materials: "Bonded crêpe. Sculpted neckline with a self bow.",
    atelier: "Pattern corrected across four fittings before release.",
    care: "Dry clean. Press under a cloth.",
    sizes: GARMENT_SIZES,
    line: "lumina",
  },

  /* ------------------------------- EASE ------------------------------- */
  {
    slug: "the-sculpted-jacket",
    name: "The Sculpted Jacket",
    collection: "ease",
    price: 620000,
    note: "A shoulder built the way a building is built.",
    tone: "espresso",
    shots: ["img-5734", "img-5389"],
    materials: "Textured black jacquard. Cupro lining in bone.",
    atelier: "Hand-padded shoulder. Off-shoulder line set on the stand.",
    care: "Dry clean. Hang immediately.",
    sizes: GARMENT_SIZES,
  },
  {
    slug: "the-boucle-off-shoulder",
    name: "The Bouclé Off-Shoulder",
    collection: "ease",
    price: 465000,
    note: "Worn with the sleeves pushed back, which is how it was fitted.",
    tone: "bone",
    shots: ["1767615547311", "img-5387"],
    materials: "Cream bouclé with sequin fleck. Concealed back closure.",
    atelier: "Fully fashioned. Linked by hand at the shoulder.",
    care: "Dry clean preferred.",
    sizes: GARMENT_SIZES,
  },
  {
    slug: "the-shadow-dress",
    name: "The Shadow Dress",
    collection: "ease",
    price: 540000,
    note: "Made for the hour when the light comes in sideways.",
    tone: "espresso",
    shots: ["img-5389", "img-5734"],
    materials: "Black jacquard. Wrap front, self tie.",
    atelier: "Cut wide from a single length and closed by hand.",
    care: "Dry clean. Store rolled, never folded.",
    sizes: GARMENT_SIZES,
    fabric: "Jacquard, moving on a slow exhale.",
  },
  {
    slug: "the-fur-cuff-mini",
    name: "The Fur-Cuff Mini",
    collection: "ease",
    price: 495000,
    note: "It arrives in the room a moment after she does.",
    tone: "skin",
    shots: ["kal03419"],
    materials: "Ivory and blush bouclé. Detachable marabou cuffs and collar.",
    atelier: "The cuffs are removable — the dress outlives the trim.",
    care: "Dry clean. Store the trim separately.",
    sizes: GARMENT_SIZES,
  },

  /* ------------------------------ JEWELRY -----------------------------
     Stone, strung and set by hand. Shot as studio stills and graded back
     toward the house palette. */
  {
    slug: "the-crimson-drop",
    name: "The Crimson Drop",
    collection: "jewelry",
    price: 210000,
    note: "Red stone, four white stones, and nothing else asked to be there.",
    tone: "gold",
    shots: ["img-5667", "img-5660"],
    grade: "studio",
    materials: "Red agate cabochon. Cubic zirconia on gold vermeil.",
    atelier: "Set by hand. Huggie fitting, titanium post.",
    care: "Last on, first off. Keep from fragrance.",
    rotate: true,
  },
  {
    slug: "the-snow-quartz-bracelet",
    name: "The Snow Quartz Bracelet",
    collection: "jewelry",
    price: 145000,
    note: "Cloud caught inside stone. No two beads are the same.",
    tone: "bone",
    shots: ["img-5366", "img-5466"],
    grade: "studio",
    materials: "Crackle snow quartz, 10mm. Elastic core.",
    atelier: "Graded and strung one bead at a time.",
    care: "Keep from water and fragrance.",
    sizes: ["16cm", "17cm", "18cm", "19cm"],
    rotate: true,
  },
  {
    slug: "the-citrine-double-strand",
    name: "The Citrine Double Strand",
    collection: "jewelry",
    price: 235000,
    note: "Two turns of afternoon, with one pearl to break it.",
    tone: "gold",
    shots: ["img-5573", "img-5654"],
    grade: "studio",
    materials: "Rutilated citrine, 8mm. Freshwater pearl. Clear quartz focal.",
    atelier: "Double-wrapped, hand-knotted, finished in gold vermeil.",
    care: "Store flat, away from direct light.",
    rotate: true,
  },
  {
    slug: "the-rutilated-mixed",
    name: "The Rutilated Mixed",
    collection: "jewelry",
    price: 320000,
    note: "Amethyst, strawberry and gold rutile, chosen to argue with each other.",
    tone: "espresso",
    shots: ["img-5587"],
    grade: "studio",
    materials: "Amethyst, strawberry quartz and rutilated quartz, 12mm.",
    atelier: "Every bead hand-selected for its inclusion pattern.",
    care: "Keep from water and fragrance.",
    sizes: ["17cm", "18cm", "19cm"],
    rotate: true,
  },
  {
    slug: "the-strawberry-quartz",
    name: "The Strawberry Quartz",
    collection: "jewelry",
    price: 185000,
    note: "The colour of the studio wall at four in the afternoon.",
    tone: "skin",
    shots: ["img-5658", "img-5895"],
    grade: "studio",
    materials: "Strawberry quartz, 10mm. Carved silver focal.",
    atelier: "Strung by hand, knotted between every bead.",
    care: "Keep from water and fragrance.",
    sizes: ["16cm", "17cm", "18cm"],
    rotate: true,
  },
  {
    slug: "the-citrine-moonstone",
    name: "The Citrine & Moonstone",
    collection: "jewelry",
    price: 265000,
    note: "Warm stone either side of one cool one.",
    tone: "gold",
    shots: ["img-5610"],
    grade: "studio",
    materials: "Rutilated citrine, 12mm. Moonstone in pavé-set silver.",
    atelier: "Focal set by hand and polished for two hours.",
    care: "Keep from water and fragrance.",
    sizes: ["17cm", "18cm", "19cm"],
    rotate: true,
  },
  {
    slug: "the-amethyst-blossom",
    name: "The Amethyst Blossom",
    collection: "jewelry",
    price: 195000,
    note: "One carved flower, and the rest gets out of its way.",
    tone: "stone",
    shots: ["img-5596"],
    grade: "studio",
    materials: "Carved clear quartz blossom. Amethyst, moonstone and jade.",
    atelier: "The blossom is carved from a single piece. Gold spacers throughout.",
    care: "Keep from water and fragrance.",
    sizes: ["16cm", "17cm", "18cm"],
    rotate: true,
  },

  /* ---------------------------- ACCESSORIES ---------------------------
     PHOTOGRAPHY PENDING. These four carry no `shots` on purpose and fall
     back to the procedural plate. Add the slugs once the objects are shot;
     nothing else about the page needs to change. */
  {
    slug: "the-archive-bag",
    name: "The Archive Bag",
    collection: "accessories",
    price: 720000,
    note: "It holds a day. It reveals nothing.",
    tone: "espresso",
    shots: [],
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
    shots: [],
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
    shots: [],
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
    shots: [],
    materials: "Bone-white canvas, espresso suede lining.",
    atelier: "Foil-stamped monogram, struck once.",
    care: "Spot clean only.",
  },
];

/* ----------------------------- selectors ----------------------------- */

export const byCollection = (id: CollectionId): Product[] =>
  PRODUCTS.filter((p) => p.collection === id);

/** The pieces in one line of a collection. */
export const byLine = (id: CollectionId, line: string): Product[] =>
  PRODUCTS.filter((p) => p.collection === id && p.line === line);

export const bySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

/** Naira, grouped, no decimals — prices are never the loudest thing. */
export const formatPrice = (amount: number): string =>
  `₦${amount.toLocaleString("en-NG")}`;

/** The order carried into checkout. Static — there is no cart backend yet. */
export const SAMPLE_ORDER = [
  { slug: "the-tulle-drop-dress", size: "M", qty: 1 },
  { slug: "the-crimson-drop", size: "One size", qty: 1 },
] as const;
