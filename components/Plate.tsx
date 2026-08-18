import type { PlateProps } from "@/lib/plate";
import { asset, fallbackSrc, srcSet, videoSrc } from "@/lib/media";

/**
 * Plate — the imagery primitive.
 *
 * Three modes, in order of preference:
 *
 *  1. `slug` — a key into the ingested media manifest. Renders responsive
 *     AVIF + WebP at the correct intrinsic size, so nothing reflows as the
 *     photograph arrives.
 *  2. `src` / `video` — an escape hatch for a one-off file.
 *  3. Neither — the procedural warm-light ground, for slots that are still
 *     waiting on photography.
 *
 * In every case the same key light and film grain composite on top, so a
 * placeholder and a photograph are lit identically and the page keeps one
 * lighting direction throughout.
 */
export default function Plate({
  tone,
  motion = "still",
  slug,
  grade = "campaign",
  src,
  video,
  alt,
  ratio,
  fill = false,
  focus,
  light = "key",
  className,
  children,
}: PlateProps) {
  const style: React.CSSProperties & Record<string, string | number> = {};
  if (ratio) style["--plate-ratio"] = ratio;
  if (focus) style["--plate-focus"] = focus;

  const media = slug ? asset(slug) : undefined;

  return (
    <div
      className={["plate", fill ? "plate--fill" : "", className ?? ""]
        .filter(Boolean)
        .join(" ")}
      data-tone={tone}
      data-motion={motion}
      data-light={light}
      data-grade={media || src || video ? grade : undefined}
      style={style}
    >
      <div className="plate__ground" aria-hidden="true" />

      {media?.kind === "video" || video ? (
        <video
          className="plate__media"
          src={media ? videoSrc(media) : video}
          poster={media?.lqip}
          autoPlay
          muted
          loop
          playsInline
          aria-label={alt || undefined}
          aria-hidden={alt ? undefined : "true"}
        />
      ) : media ? (
        <picture>
          <source type="image/avif" srcSet={srcSet(media, "avif")} sizes="(min-width: 68rem) 50vw, 100vw" />
          <source type="image/webp" srcSet={srcSet(media, "webp")} sizes="(min-width: 68rem) 50vw, 100vw" />
          <img
            className="plate__media"
            src={fallbackSrc(media)}
            alt={alt ?? ""}
            width={media.width}
            height={media.height}
            loading="lazy"
            decoding="async"
          />
        </picture>
      ) : src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="plate__media"
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          decoding="async"
        />
      ) : null}

      {children}
    </div>
  );
}
