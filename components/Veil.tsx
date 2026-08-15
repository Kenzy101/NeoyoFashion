"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BRAND } from "@/lib/brand";

type Phase = "idle" | "hold" | "reveal";

/**
 * Page transitions.
 *
 * On every route change an espresso curtain is already down over the
 * incoming page — painted in a single frame, no transition — and then
 * lifts from the top. The visitor never sees a page assemble itself;
 * they see a finished page revealed.
 *
 * The first render is skipped so the curtain does not fight the loader.
 * Removed entirely under prefers-reduced-motion (see chrome.css).
 */
export default function Veil() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setPhase("hold");

    // Two frames: one to commit `hold` with no transition, one to start
    // the lift. A single rAF can be coalesced and the wipe is skipped.
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setPhase("reveal"));
    });

    // Settle back to idle once the lift has finished (--dur-slow).
    const settle = window.setTimeout(() => setPhase("idle"), 1000);

    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
      clearTimeout(settle);
    };
  }, [pathname]);

  return (
    <div className="veil" data-phase={phase} aria-hidden="true">
      <span className="veil__mark">{BRAND.name}</span>
    </div>
  );
}
