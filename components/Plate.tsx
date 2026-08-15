import type { PlateProps } from "@/lib/plate";

/**
 * Plate — the imagery primitive.
 *
 * With no `src`/`video` it renders the procedural warm-light ground
 * (see components.css § PLATE). Supply `src` and the photograph loads
 * over that ground, so there is never a white flash and the grain and
 * key light stay identical across real and placeholder frames.
 */
export default function Plate({
  tone,
  motion = "still",
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
  // Custom properties are not in CSSProperties, so widen the record.
  const style: React.CSSProperties & Record<string, string | number> = {};
  if (ratio) style["--plate-ratio"] = ratio;
  if (focus) style["--plate-focus"] = focus;

  return (
    <div
      className={["plate", fill ? "plate--fill" : "", className ?? ""]
        .filter(Boolean)
        .join(" ")}
      data-tone={tone}
      data-motion={motion}
      data-light={light}
      style={style}
    >
      <div className="plate__ground" aria-hidden="true" />

      {video ? (
        <video
          className="plate__media"
          src={video}
          autoPlay
          muted
          loop
          playsInline
          // Decorative unless the caller gives it a name
          aria-label={alt || undefined}
          aria-hidden={alt ? undefined : "true"}
        />
      ) : null}

      {src ? (
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
