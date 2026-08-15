import Plate from "./Plate";
import type { PlateTone } from "@/lib/plate";

/**
 * The fabric register.
 *
 * A slow, flowing textile study. Until real footage lands this is the
 * `silk` motion applied to a warm ground — a 34s uneven cycle chosen so
 * the loop point is not findable. Supply `video` (muted, looping, H.264
 * + WebM, ≤ 6s, ≤ 2MB) and it plays that instead, under the same grain.
 */
export default function FabricFilm({
  caption,
  tone = "stone",
  video,
}: {
  caption: string;
  tone?: PlateTone;
  video?: string;
}) {
  return (
    <figure className="fabric">
      <Plate tone={tone} motion="silk" video={video} fill light="key" />
      <figcaption className="fabric__caption u-hairline" style={{ color: "inherit" }}>
        {caption}
      </figcaption>
    </figure>
  );
}
