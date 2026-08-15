"use client";

import { useEffect, useRef, useState } from "react";

type RevealKind = "rise" | "rise-far" | "fade" | "drift-left" | "drift-right" | "develop" | "lift";

type Props = {
  children: React.ReactNode;
  /** Which entrance the element takes. See motion.css § SCROLL REVEAL. */
  kind?: RevealKind;
  /** Stagger position within a sequence. Multiplied by --stagger. */
  index?: number;
  /** How far into the viewport before release. Default is a generous 18%. */
  threshold?: number;
  as?: "div" | "section" | "article" | "li" | "figure" | "header" | "footer";
  className?: string;
};

/**
 * Scroll reveal. One IntersectionObserver per element, disconnected on
 * release — elements never re-hide, because a luxury page should not
 * flicker when the visitor scrolls back up.
 */
export default function Reveal({
  children,
  kind = "rise",
  index = 0,
  threshold = 0.18,
  as: Tag = "div",
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No observer support, or the visitor asked for stillness: show at once.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      // The bottom margin releases elements slightly before they arrive,
      // so the motion is finishing as they enter — never starting.
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      data-reveal={kind}
      data-revealed={revealed ? "true" : "false"}
      style={{ ["--reveal-index" as string]: index }}
    >
      {children}
    </Tag>
  );
}
