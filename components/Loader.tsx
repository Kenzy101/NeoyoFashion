"use client";

import { useEffect, useState } from "react";
import { BRAND } from "@/lib/brand";

/**
 * The loading screen.
 *
 * Espresso ground, gold wordmark, a hairline that fills. It lifts away
 * as a curtain rather than fading, so the first thing the visitor sees
 * is the film already running underneath.
 *
 * Shown once per session — returning to the landing page mid-visit does
 * not replay it. It also refuses to outstay a slow connection: the
 * ceiling is 2.4s regardless of load state.
 */
const SESSION_KEY = "neoyo:entered";

export default function Loader() {
  // Assume it has been seen; the effect corrects this before first paint
  // of the overlay, which avoids a flash for returning visitors.
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let entered = false;
    try {
      entered = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Private mode or storage disabled — treat as a first visit.
    }
    if (entered) return;

    setShow(true);
    document.body.setAttribute("data-scroll-locked", "true");

    const start = performance.now();
    const FLOOR = 1500; // never shorter — the pause is the point
    const CEILING = 2400; // never longer — even on a poor connection
    let raf = 0;

    const tick = () => {
      const elapsed = performance.now() - start;
      setProgress(Math.min(1, elapsed / FLOOR));
      if (elapsed < CEILING) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      setProgress(1);
      setDone(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* nothing to do */
      }
      document.body.removeAttribute("data-scroll-locked");
      // Unmount only after the curtain has finished lifting (--dur-cinema).
      window.setTimeout(() => setShow(false), 1400);
    };

    const settle = window.setTimeout(finish, FLOOR);
    const hardStop = window.setTimeout(finish, CEILING);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      clearTimeout(hardStop);
      document.body.removeAttribute("data-scroll-locked");
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="loader"
      data-state={done ? "done" : "loading"}
      role="status"
      aria-live="polite"
      aria-label="Entering NEOYO"
    >
      <div className="loader__inner">
        <span className="loader__mark">{BRAND.name}</span>
        <span className="loader__rule">
          <span
            className="loader__fill"
            style={{ ["--loader-progress" as string]: progress }}
          />
        </span>
        <span className="loader__word">{BRAND.tagline}</span>
      </div>
    </div>
  );
}
