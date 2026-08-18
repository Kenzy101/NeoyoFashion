import { MEDIA, type MediaAsset } from "./media.generated";

/**
 * The landing cinema.
 *
 * A single-page film. Slides alternate deliberately between ready-to-wear
 * and jewelry so the house reads as one world rather than two catalogues —
 * a garment, then the thing worn with it, then the next garment.
 *
 * `focus` is the object-position used when a frame has to be cropped. It
 * matters most on portrait photography shown on a landscape screen: put it
 * where the garment is, not where the centre of the file happens to be.
 */

export type SlideKind = "wear" | "jewelry" | "beauty";

export type Slide = {
  /** Key into MEDIA, produced by scripts/ingest-media.cjs. */
  slug: string;
  kind: SlideKind;
  /** Shown small, bottom right. Short — this is a film, not a caption. */
  label: string;
  /** object-position for the cropped case. Defaults to centre. */
  focus?: string;
  /**
   * Colour treatment. The campaign photography was shot in the house's
   * own warm light and needs nothing. The stone bracelets are studio
   * stills from a different source — bright whites, saturated purples
   * and teals — and are graded back toward the earth family so the film
   * reads as one shoot rather than a lookbook spliced with a catalogue.
   */
  grade?: "campaign" | "studio";
};

export const KIND_LABEL: Record<SlideKind, string> = {
  wear: "Ready-to-Wear",
  jewelry: "Jewelry",
  beauty: "Beauty",
};

export const SLIDES: Slide[] = [
  { slug: "kal03419", kind: "wear", label: "Backstage, Lagos", focus: "50% 42%" },
  { slug: "img-5667", kind: "jewelry", label: "The Crimson Drop" },
  { slug: "1767551647754", kind: "wear", label: "Tweed and Tulle", focus: "50% 45%" },
  { slug: "1767531220533", kind: "jewelry", label: "Stacked at the Wrist", focus: "50% 50%" },
  { slug: "img-5714", kind: "wear", label: "The Rosette Lattice", focus: "50% 46%" },
  { slug: "img-5610", kind: "jewelry", label: "Citrine and Moonstone", grade: "studio" },
  { slug: "1767531220079", kind: "beauty", label: "Pearl, Close", focus: "50% 34%" },
  { slug: "img-5733", kind: "wear", label: "The Turquoise Column", focus: "50% 48%" },
  { slug: "img-5587", kind: "jewelry", label: "Rutilated, Mixed", grade: "studio" },
  { slug: "img-5389", kind: "wear", label: "Black, in Afternoon Light", focus: "50% 38%" },
  { slug: "img-5660", kind: "jewelry", label: "Red Stone, Set in Gold" },
  { slug: "img-5708", kind: "wear", label: "The Ruffle Gown", focus: "50% 46%" },
  { slug: "img-5573", kind: "jewelry", label: "Citrine, Double Strand", grade: "studio" },
  { slug: "1767615547311", kind: "wear", label: "White Tweed, Off Shoulder", focus: "50% 36%" },
  { slug: "img-5895", kind: "jewelry", label: "Strawberry Quartz", grade: "studio" },
  { slug: "img-5734", kind: "wear", label: "The Sculpted Jacket", focus: "50% 44%" },
  { slug: "img-5596", kind: "jewelry", label: "Quartz on Driftwood", grade: "studio" },
  { slug: "1767372347865-2", kind: "wear", label: "Full Length, White Room", focus: "50% 46%" },
  { slug: "img-5366", kind: "jewelry", label: "Snow Quartz", grade: "studio" },
  { slug: "img-5713", kind: "wear", label: "On the Stand", focus: "50% 46%" },
  { slug: "img-5658", kind: "jewelry", label: "Rose Quartz, Silver Set", grade: "studio" },
  { slug: "1767531220127", kind: "wear", label: "Magenta and Tweed", focus: "50% 36%" },
  { slug: "img-5654", kind: "jewelry", label: "Citrine, Gold Fittings", grade: "studio" },
  { slug: "img-5387", kind: "wear", label: "The Green Silk", focus: "50% 36%" },
  { slug: "img-5466", kind: "jewelry", label: "Snow Quartz on Black", grade: "studio" },
];

/**
 * Held back from the landing film — both frames carry a third party's
 * watermark (supplier text on the plate in one, a printed card in the
 * other). Re-shoot or crop them out and they can rejoin the sequence.
 */
export const WITHHELD = ["img-5586", "img-5656"] as const;

export type ResolvedSlide = Slide & { asset: MediaAsset };

/** Slides whose asset actually exists on disk. Anything missing is dropped
 *  rather than rendering a broken frame. */
export const RESOLVED: ResolvedSlide[] = SLIDES.map((slide) => {
  const asset = MEDIA[slide.slug];
  return asset ? { ...slide, asset } : null;
}).filter((s): s is ResolvedSlide => s !== null);

/** srcset across the widths the ingest script actually produced. */
export const srcSet = (asset: MediaAsset, format: "avif" | "webp"): string =>
  (asset.widths ?? [])
    .map((w) => `/media/${asset.slug}-${w}.${format} ${w}w`)
    .join(", ");

/** The widest derivative — used as the <img> fallback src. */
export const fallbackSrc = (asset: MediaAsset): string => {
  const widths = asset.widths ?? [];
  const widest = widths.length ? widths[widths.length - 1] : 900;
  return `/media/${asset.slug}-${widest}.webp`;
};

export const isPortrait = (asset: MediaAsset): boolean =>
  Boolean(asset.width && asset.height && asset.width / asset.height < 0.95);
