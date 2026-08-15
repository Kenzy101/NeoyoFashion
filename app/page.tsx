import Slideshow from "@/components/Slideshow";
import Ticker from "@/components/Ticker";
import { BRAND } from "@/lib/brand";

/**
 * The landing page.
 *
 * Per the brief this holds four things and nothing else: the logo (fixed
 * in the rail, rendered by Chrome), the tagline, the animated campaign
 * film, and the customer review ticker. There is no visible shop, no
 * navigation bar, no product grid, no scroll.
 *
 * It is one viewport tall on purpose. The visitor should feel something
 * before they are asked to do anything.
 */
export default function Landing() {
  return (
    <div className="landing">
      <h1 className="u-sr-only">
        {BRAND.name} — {BRAND.tagline}
      </h1>

      <Slideshow />

      <div className="landing__word">
        <span className="landing__eyebrow">{BRAND.name}</span>
        <p className="landing__tagline">{BRAND.tagline}</p>
      </div>

      {/* No scroll cue: the landing is exactly one viewport and does not
          scroll, so an invitation to scroll would be a lie — and it sat
          on top of the tagline. The city is carried by the logo rail. */}

      <div className="landing__ticker">
        <Ticker duration={90} />
      </div>
    </div>
  );
}
