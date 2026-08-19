"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Cursor from "./Cursor";
import Menu from "./Menu";
import Veil from "./Veil";
import { BRAND } from "@/lib/brand";

/**
 * The persistent chrome: logo rail, menu trigger, fullscreen menu,
 * cursor and the page-transition veil.
 *
 * There is deliberately no loading screen. The landing film is the first
 * thing the visitor should meet, and a curtain in front of it delays the
 * only moment the page exists to deliver.
 *
 * Mounted once in the root layout so none of it remounts on navigation —
 * the rail and trigger stay put while pages change beneath them.
 */
export default function Chrome() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // The landing film runs full-bleed behind the chrome, so the rail and
  // trigger switch to bone white there. Every other page is bone-ground.
  const overMedia = pathname === "/";

  const close = useCallback(() => setOpen(false), []);

  // Close the menu whenever the route changes, including on back/forward.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <Cursor />
      <Veil />

      {/* Fixed logo rail — left edge, very subtle */}
      <div className="rail" data-over-media={overMedia ? "true" : "false"} data-print-hide>
        <Link href="/" className="rail__logo" aria-label={`${BRAND.name} — home`}>
          {BRAND.name}
        </Link>
        <span className="rail__line" aria-hidden="true" />
      </div>

      {/* The only control on the landing page */}
      <button
        ref={triggerRef}
        type="button"
        className="trigger"
        data-over-media={overMedia && !open ? "true" : "false"}
        aria-expanded={open}
        aria-controls="neoyo-menu"
        onClick={() => setOpen((v) => !v)}
        data-print-hide
      >
        <span className="u-sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className="trigger__bar" aria-hidden="true" />
        <span className="trigger__bar" aria-hidden="true" />
        <span className="trigger__bar" aria-hidden="true" />
      </button>

      <div id="neoyo-menu">
        <Menu open={open} onClose={close} triggerRef={triggerRef} />
      </div>
    </>
  );
}
