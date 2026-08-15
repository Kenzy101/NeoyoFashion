import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { FOOTER_NAV } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className="foot" data-print-hide>
      <div className="u-page u-page--railed">
        <div className="foot__inner">
          <div className="foot__col">
            <span className="u-hairline">{BRAND.tagline}</span>
            <p className="u-body" style={{ maxWidth: "26ch" }}>
              A house built in {BRAND.city}. Cut once, corrected for years.
            </p>
            <a className="u-label m-underline" href={`mailto:${BRAND.email}`}>
              {BRAND.email}
            </a>
          </div>

          {FOOTER_NAV.map((group) => (
            <nav className="foot__col" key={group.heading} aria-label={group.heading}>
              <span className="u-hairline">{group.heading}</span>
              <div className="foot__nav">
                {group.links.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          ))}
        </div>

        <div className="foot__base">
          <span className="u-caption">
            &copy; {new Date().getFullYear()} {BRAND.name}. {BRAND.atelier}.
          </span>
          <span className="u-caption">
            <a
              className="m-underline"
              href={BRAND.socialUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              {BRAND.social}
            </a>
          </span>
          <span className="u-caption">{BRAND.phone}</span>
        </div>

        <div className="foot__mark" aria-hidden="true">
          {BRAND.name}
        </div>
      </div>
    </footer>
  );
}
