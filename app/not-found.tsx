import Link from "next/link";
import Plate from "@/components/Plate";
import { BRAND } from "@/lib/brand";

export default function NotFound() {
  return (
    <div style={{ position: "relative", minHeight: "100svh", display: "grid" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <Plate tone="architecture" motion="kenburns" fill />
      </div>

      <div
        className="u-page u-page--railed"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          alignContent: "center",
          gap: "var(--space-lg)",
          justifyItems: "start",
          paddingBlock: "var(--space-3xl)",
        }}
      >
        <span className="u-hairline" style={{ color: "rgba(242, 236, 222, 0.7)" }}>
          {BRAND.name} — 404
        </span>
        <h1 className="u-hero" style={{ color: "var(--neoyo-bone-white)", maxWidth: "14ch" }}>
          Nothing here.
        </h1>
        <p className="u-body-lg" style={{ color: "rgba(242, 236, 222, 0.78)" }}>
          The page has been archived, or never existed. Both happen.
        </p>
        <Link
          href="/"
          className="btn btn--ghost"
          style={{ color: "var(--neoyo-bone-white)", borderColor: "rgba(242, 236, 222, 0.4)" }}
        >
          Return
          <span className="btn__arrow" aria-hidden="true">
            &#8594;
          </span>
        </Link>
      </div>
    </div>
  );
}
