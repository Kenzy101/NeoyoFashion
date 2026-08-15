import Link from "next/link";
import { NAV } from "@/lib/nav";

/**
 * The glide to the next section. Sits at the foot of every interior
 * page so the visitor is never returned to a navigation bar — the site
 * carries them forward instead.
 */
export default function Onward({ current }: { current: string }) {
  const index = NAV.findIndex((item) => item.href === current);
  const previous = index > 0 ? NAV[index - 1] : NAV[NAV.length - 1];
  const next = index >= 0 && index < NAV.length - 1 ? NAV[index + 1] : NAV[0];

  return (
    <nav className="u-page u-page--railed" aria-label="Continue">
      <div className="onward">
        <Link href={previous.href} className="onward__link">
          <span className="u-hairline" style={{ display: "block", marginBottom: "var(--space-2xs)" }}>
            Previously
          </span>
          {previous.label}
        </Link>

        <Link href={next.href} className="onward__link" style={{ textAlign: "right" }}>
          <span className="u-hairline" style={{ display: "block", marginBottom: "var(--space-2xs)" }}>
            Next
          </span>
          {next.label}
        </Link>
      </div>
    </nav>
  );
}
