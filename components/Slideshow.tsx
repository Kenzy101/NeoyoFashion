"use client";

import { useEffect, useState } from "react";
import Plate from "./Plate";
import type { PlateTone } from "@/lib/plate";

export type Slide = {
  tone: PlateTone;
  /** The subject register — shown small, bottom right. */
  label: string;
  /** Real asset drop-in. */
  src?: string;
  video?: string;
  alt?: string;
};

/**
 * The landing film.
 *
 * Nine registers from the brief — luxury fashion, jewelry, beauty
 * closeups, fabric movement, architecture, soft light, product, close
 * detail, editorial portrait — crossfading on a 5s dwell with a 1.8s
 * fade and a slow Ken Burns push. Nothing cuts.
 *
 * The timer stops while the tab is hidden so a visitor returning after
 * an hour does not land mid-fade on slide 700.
 */
export const SLIDES: Slide[] = [
  { tone: "bone", label: "Core — The Monolith Coat" },
  { tone: "gold", label: "Jewelry — The Seal Ring" },
  { tone: "skin", label: "Beauty — Close" },
  { tone: "stone", label: "Fabric — In Movement" },
  { tone: "architecture", label: "Lagos — Atelier" },
  { tone: "bone", label: "Light — Four O'Clock" },
  { tone: "espresso", label: "Accessories — The Archive Bag" },
  { tone: "gold", label: "Detail — Hand-Finished" },
  { tone: "skin", label: "Campaign — Attention Follows Her" },
];

export default function Slideshow({ slides = SLIDES }: { slides?: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Reduced motion: hold on the first frame. The site still reads —
    // the film is atmosphere, never the only carrier of information.
    if (still.matches) return;

    if (paused) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);

    return () => clearInterval(id);
  }, [slides.length, paused]);

  // Stop advancing while the tab is in the background.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div className="film">
      {slides.map((slide, i) => (
        <div
          key={`${slide.tone}-${i}`}
          className="film__slide"
          data-active={index === i ? "true" : "false"}
          aria-hidden="true"
        >
          <Plate
            tone={slide.tone}
            motion={i % 2 === 0 ? "kenburns" : "kenburns-alt"}
            src={slide.src}
            video={slide.video}
            alt={slide.alt}
            fill
          />
        </div>
      ))}

      <div className="film__vignette" aria-hidden="true" />

      {/* The film is decorative; its subject is announced quietly for
          anyone who wants it, and politely for assistive tech. */}
      <div className="film__meta" aria-live="off">
        <span className="u-hairline" style={{ color: "inherit" }}>
          {slides[index]?.label}
        </span>
        <span className="film__progress" aria-hidden="true">
          <span key={index} />
        </span>
        <span className="u-hairline" style={{ color: "inherit" }}>
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
