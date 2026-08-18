import { MEDIA, type MediaAsset } from "./media.generated";

/**
 * Media access. One place that knows how a slug becomes a URL.
 *
 * `basePath` matters: on GitHub Pages the site is served from a
 * sub-directory, and Next only rewrites its own <Link>/next-image URLs —
 * a hand-written "/media/x.avif" would 404. Everything that touches a
 * media file goes through here so the prefix is applied exactly once.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export type { MediaAsset };

export const asset = (slug: string): MediaAsset | undefined => MEDIA[slug];

export const mediaUrl = (file: string): string => `${BASE_PATH}/media/${file}`;

/** srcset across the widths the ingest script actually produced. */
export const srcSet = (a: MediaAsset, format: "avif" | "webp"): string =>
  (a.widths ?? []).map((w) => `${mediaUrl(`${a.slug}-${w}.${format}`)} ${w}w`).join(", ");

/** The widest derivative — the <img> fallback. */
export const fallbackSrc = (a: MediaAsset): string => {
  const widths = a.widths ?? [];
  const widest = widths.length ? widths[widths.length - 1] : 900;
  return mediaUrl(`${a.slug}-${widest}.webp`);
};

/** Video assets are copied through whole; re-prefix their stored path. */
export const videoSrc = (a: MediaAsset): string | undefined =>
  a.src ? `${BASE_PATH}${a.src}` : undefined;

export const isPortrait = (a: MediaAsset): boolean =>
  Boolean(a.width && a.height && a.width / a.height < 0.95);
