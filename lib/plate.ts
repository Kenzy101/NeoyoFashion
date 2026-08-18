/**
 * Plate — NEOYO's imagery contract.
 *
 * A plate is a photographic slot. Until real assets land it renders
 * warm, museum-lit light procedurally in CSS; once `src` or `video`
 * is supplied the same lighting composites over the photograph, so
 * the whole site keeps one lighting direction and one grain.
 *
 * See DESIGN.md § Imagery for the art-direction brief per tone.
 */

/** The six lighting registers. Every tone lives inside the earth family. */
export type PlateTone =
  | "bone" /* ivory ground, high key — garments, stills            */
  | "gold" /* metal and foil — jewelry, hardware                    */
  | "espresso" /* near-black warm brown — night, leather, packaging */
  | "stone" /* muted mid-tone — fabric, texture, tailoring          */
  | "skin" /* beauty closeups, portraits                            */
  | "architecture"; /* directional light shafts, hard edges         */

/** Motion register applied to the plate's contents. */
export type PlateMotion = "still" | "kenburns" | "kenburns-alt" | "silk";

export type PlateProps = {
  tone: PlateTone;
  motion?: PlateMotion;
  /**
   * A key into the ingested media manifest. Preferred over `src`: it
   * renders responsive AVIF + WebP with the correct intrinsic size, so
   * nothing reflows as the photograph arrives. Produced by
   * scripts/ingest-media.cjs.
   */
  slug?: string;
  /**
   * Colour treatment, matching the landing cinema. `studio` pulls
   * supplier stills back toward the earth family; campaign photography
   * needs nothing.
   */
  grade?: "campaign" | "studio";
  /** Escape hatch for a one-off file outside the manifest. */
  src?: string;
  /** Drop-in point for product/fabric video. Muted, looping, inline. */
  video?: string;
  /** Required whenever `src` is set. Empty string marks it decorative. */
  alt?: string;
  /** CSS aspect-ratio, e.g. "4 / 5". Omit with `fill`. */
  ratio?: string;
  /** Fill the parent instead of holding a ratio. */
  fill?: boolean;
  /** object-position for the real asset. */
  focus?: string;
  /** Suppress the key-light overlay for macro/product-on-white shots. */
  light?: "key" | "none";
  className?: string;
  children?: React.ReactNode;
};
