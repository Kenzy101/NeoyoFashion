import Cinema from "@/components/Cinema";
import Ticker from "@/components/Ticker";
import { BRAND } from "@/lib/brand";

/**
 * The landing page.
 *
 * Per the brief this holds four things and nothing else: the logo (fixed
 * in the rail, rendered by Chrome), the tagline, the campaign film, and
 * the customer review ticker. No visible shop, no navigation bar, no
 * product grid, no scroll.
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

      <Cinema />

      <div className="landing__word">
        <span className="landing__eyebrow">{BRAND.name}</span>
        <p className="landing__tagline">{BRAND.tagline}</p>
      </div>

      <div className="landing__ticker">
        <Ticker duration={90} />
      </div>
    </div>
  );
}
