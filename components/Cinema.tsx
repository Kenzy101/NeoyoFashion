"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  KIND_LABEL,
  RESOLVED,
  fallbackSrc,
  isPortrait,
  srcSet,
  videoSrc,
  type ResolvedSlide,
} from "@/lib/cinema";

/**
 * The landing cinema.
 *
 * One page, one film. Slides alternate between ready-to-wear and jewelry
 * and hand over on a long cross-dissolve while both frames are still
 * moving — the motion never stops, it only changes subject, which is what
 * separates a film from a carousel.
 *
 * Only three slides are ever in the DOM (previous, current, next). The next
 * one is mounted a full beat early at zero opacity so it is decoded and
 * already drifting before it is ever seen; nothing pops in.
 *
 * Portrait photography on a landscape screen is shown whole, letterboxed
 * over a blurred bed of itself, because on a fashion site the cut of the
 * garment is the subject and cropping a dress in half to fill the frame
 * defeats the point. Square and landscape frames fill edge to edge.
 */

const HOLD = 5000; // dwell, per the brief

export default function Cinema({ slides = RESOLVED }: { slides?: ResolvedSlide[] }) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [still, setStill] = useState(false);
  const liveRef = useRef<HTMLParagraphElement>(null);

  /* Reduced motion: hold on the opening frame. The film is atmosphere and
     never the sole carrier of information, so stillness costs nothing. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* Stop advancing while the tab is in the background, so a visitor who
     returns after an hour does not land mid-dissolve on slide 700. */
  useEffect(() => {
    const sync = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  const running = !paused && !hidden && !still && count > 1;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), HOLD);
    return () => clearInterval(id);
  }, [running, count]);

  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  );

  /* The caption follows the picture rather than leading it.
     The dissolve runs 1.9s, so for the first second of it the previous
     frame is still the dominant image — naming the incoming slide that
     early reads as a mislabel. Holding the caption until the new frame
     has the screen keeps word and image bound together. */
  const [metaIndex, setMetaIndex] = useState(0);
  useEffect(() => {
    const t = window.setTimeout(() => setMetaIndex(index), 950);
    return () => clearTimeout(t);
  }, [index]);

  if (count === 0) return null;

  const prev = (index - 1 + count) % count;
  const next = (index + 1) % count;
  // Everything else stays out of the DOM entirely.
  const window_ = new Set([prev, index, next]);
  const current = slides[Math.min(metaIndex, count - 1)];

  return (
    <div
      className="cine"
      role="region"
      aria-roledescription="carousel"
      aria-label="NEOYO campaign film"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
      }}
    >
      {slides.map((slide, i) => {
        if (!window_.has(i)) return null;
        const asset = slide.asset;
        const active = i === index;
        const portrait = isPortrait(asset);

        return (
          <div
            key={slide.slug}
            className="cine__slide"
            data-active={active ? "true" : "false"}
            data-orient={portrait ? "portrait" : "wide"}
            data-drift={i % 2 === 0 ? "push" : "pull"}
            data-grade={slide.grade ?? "campaign"}
            aria-hidden="true"
          >
            {/* The bed: a blurred, darkened copy of the same frame. Only
                visible where the foreground is letterboxed. */}
            <div
              className="cine__bed"
              style={{ backgroundImage: `url(${asset.lqip ?? fallbackSrc(asset)})` }}
            />

            <div className="cine__frame">
              {asset.kind === "video" ? (
                <video
                  className="cine__media"
                  src={videoSrc(asset)}
                  poster={asset.lqip}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ objectPosition: slide.focus ?? "center" }}
                />
              ) : (
                <picture>
                  <source type="image/avif" srcSet={srcSet(asset, "avif")} sizes="100vw" />
                  <source type="image/webp" srcSet={srcSet(asset, "webp")} sizes="100vw" />
                  <img
                    className="cine__media"
                    src={fallbackSrc(asset)}
                    alt=""
                    width={asset.width}
                    height={asset.height}
                    // The opening frame is the LCP element; the rest are
                    // mounted a beat early and have time to arrive.
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "low"}
                    decoding="async"
                    style={{ objectPosition: slide.focus ?? "center" }}
                  />
                </picture>
              )}
            </div>
          </div>
        );
      })}

      <div className="cine__vignette" aria-hidden="true" />
      <div className="cine__grain" aria-hidden="true" />

      {/* The film's subject, announced quietly. */}
      <div className="cine__meta">
        <p className="cine__subject" key={`s-${metaIndex}`} ref={liveRef}>
          <span className="cine__kind">{KIND_LABEL[current.kind]}</span>
          <span className="cine__dash" aria-hidden="true">—</span>
          <span>{current.label}</span>
        </p>

        <span className="cine__bar" aria-hidden="true">
          <span key={`${index}-${running}`} data-running={running ? "true" : "false"} />
        </span>

        <span className="cine__count" key={`c-${metaIndex}`} aria-hidden="true">
          {String(metaIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>

        {/* WCAG 2.2.2 — anything that moves on its own for more than five
            seconds needs a way to stop it. Kept to a hairline so it does
            not read as a control panel. */}
        <div className="cine__controls">
          <button type="button" className="cine__btn" onClick={() => step(-1)}>
            <span className="u-sr-only">Previous slide</span>
            <span aria-hidden="true">&#8592;</span>
          </button>
          <button
            type="button"
            className="cine__btn"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
          >
            <span className="u-sr-only">{paused ? "Play the film" : "Pause the film"}</span>
            <span aria-hidden="true">{paused ? "\u25B6" : "\u2016"}</span>
          </button>
          <button type="button" className="cine__btn" onClick={() => step(1)}>
            <span className="u-sr-only">Next slide</span>
            <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
      </div>

      {/* Announced only when the visitor drives it, never on auto-advance. */}
      <p className="u-sr-only" aria-live="polite">
        {paused ? `${KIND_LABEL[current.kind]} — ${current.label}. Slide ${metaIndex + 1} of ${count}.` : ""}
      </p>
    </div>
  );
}
