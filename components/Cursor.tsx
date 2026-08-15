"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The NEOYO cursor.
 *
 * A gold ring that trails a dot on a spring. The ring opens over links
 * and opens further over imagery, where it carries a one-word label.
 *
 * Never mounted for coarse pointers or when reduced motion is requested —
 * it is pure motion, and there is nothing to degrade to.
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<"idle" | "link" | "view" | "hidden">("hidden");
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decide = () => setEnabled(fine.matches && !still.matches);
    decide();

    fine.addEventListener("change", decide);
    still.addEventListener("change", decide);
    return () => {
      fine.removeEventListener("change", decide);
      still.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.removeAttribute("data-cursor");
      return;
    }
    document.body.setAttribute("data-cursor", "custom");

    // Target position (the true pointer) and the ring's lagging position.
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      // The dot is exact — it is the pointer. Written directly, not tweened.
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }

      const el = event.target as HTMLElement | null;
      const view = el?.closest<HTMLElement>("[data-cursor-view]");
      if (view) {
        setState("view");
        setLabel(view.dataset.cursorView || "View");
        return;
      }
      if (el?.closest("a, button, input, select, textarea, [role='button'], label")) {
        setState("link");
        setLabel("");
        return;
      }
      setState("idle");
      setLabel("");
    };

    // The ring eases toward the pointer — 0.16 is the "expensive" lag.
    const tick = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onLeave = () => setState("hidden");
    const onEnter = () => setState("idle");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      document.body.removeAttribute("data-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cursor" data-state={state} aria-hidden="true">
      <div ref={ringRef} style={{ position: "absolute", top: 0, left: 0 }}>
        <div className="cursor__ring">
          <span className="cursor__label">{label}</span>
        </div>
      </div>
      <div ref={dotRef} style={{ position: "absolute", top: 0, left: 0 }}>
        <div className="cursor__dot" />
      </div>
    </div>
  );
}
