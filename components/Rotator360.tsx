"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const FRAMES = 36; // 10° per frame — the standard jewelry capture

export type JewelForm = "ring" | "cuff" | "chain" | "earring";

type Props = {
  /** Real capture: 36 frames, shot on a bone sweep. Drop them in here. */
  frames?: string[];
  /** Procedural stand-in used until the capture lands. */
  form?: JewelForm;
  label: string;
};

/**
 * 360° product viewer.
 *
 * Drag, swipe, or use the arrow keys. With `frames` supplied it plays a
 * real turntable capture; without it, it renders the piece procedurally
 * and rotates the *lighting and foreshortening* — which is what the eye
 * actually reads as rotation.
 *
 * Accessibility: the viewer is a slider. Arrow keys step 10°, Home/End
 * jump to front and back, and the value is announced as a bearing.
 * Vertical page scrolling is never captured (touch-action: pan-y).
 */
export default function Rotator360({ frames, form = "ring", label }: Props) {
  const count = frames?.length ?? FRAMES;
  const [frame, setFrame] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const accumulator = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);

  const step = useCallback(
    (delta: number) => {
      setFrame((f) => (f + delta + count) % count);
    },
    [count],
  );

  /* ---------------- pointer drag ---------------- */
  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    // Roughly one full turn per 400px of travel.
    const PX_PER_FRAME = 400 / count;

    const onDown = (event: PointerEvent) => {
      dragging.current = true;
      lastX.current = event.clientX;
      accumulator.current = 0;
      setEngaged(true);
      node.setPointerCapture(event.pointerId);
    };

    const onMove = (event: PointerEvent) => {
      if (!dragging.current) return;
      accumulator.current += event.clientX - lastX.current;
      lastX.current = event.clientX;

      const steps = Math.trunc(accumulator.current / PX_PER_FRAME);
      if (steps !== 0) {
        accumulator.current -= steps * PX_PER_FRAME;
        step(steps);
      }
    };

    const onUp = (event: PointerEvent) => {
      dragging.current = false;
      if (node.hasPointerCapture(event.pointerId)) {
        node.releasePointerCapture(event.pointerId);
      }
    };

    node.addEventListener("pointerdown", onDown);
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerup", onUp);
    node.addEventListener("pointercancel", onUp);

    return () => {
      node.removeEventListener("pointerdown", onDown);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerup", onUp);
      node.removeEventListener("pointercancel", onUp);
    };
  }, [count, step]);

  const bearing = Math.round((frame / count) * 360);

  return (
    <div className="rotator" data-engaged={engaged ? "true" : "false"}>
      <div
        className="rotator__stage"
        ref={stageRef}
        data-cursor-view="Rotate"
        aria-hidden="true"
      >
        {frames
          ? frames.map((src, i) => (
              <div
                key={src}
                className="rotator__frame"
                data-active={i === frame ? "true" : "false"}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            ))
          : // Procedural: one live frame, driven by the current bearing.
            <ProceduralJewel form={form} angle={(frame / count) * 360} />}
      </div>

      <div className="rotator__hint" aria-hidden="true">
        <span>&#8592;</span> Drag to rotate <span>&#8594;</span>
      </div>

      {/* The accessible control. Visible on focus; always operable. */}
      <input
        className="rotator__slider"
        type="range"
        min={0}
        max={count - 1}
        step={1}
        value={frame}
        onChange={(e) => {
          setEngaged(true);
          setFrame(Number(e.target.value));
        }}
        aria-label={`Rotate ${label}`}
        aria-valuetext={`${bearing} degrees`}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
   Procedural stand-in.

   Rotation is sold by two things: foreshortening (the piece narrows as
   it turns edge-on) and a specular highlight that travels around the
   form. Both are driven by the same angle.
   ------------------------------------------------------------------ */
function ProceduralJewel({ form, angle }: { form: JewelForm; angle: number }) {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);

  // Never fully edge-on: 0.22 keeps the silhouette readable at 90°/270°.
  const squash = 0.22 + 0.78 * Math.abs(cos);
  // The highlight travels across the form as it turns.
  const highlight = 50 + 34 * Math.sin(rad);
  const shade = 50 - 26 * Math.sin(rad);

  const metal = `radial-gradient(60% 60% at ${highlight}% 34%, #F5E4C4 0%, #CBAE7C 26%, #A9824B 58%, #6D5230 82%, #43301A 100%)`;

  const shapes: Record<JewelForm, React.CSSProperties> = {
    ring: {
      width: "46%",
      aspectRatio: "1 / 1",
      borderRadius: "50%",
      // The band, not a disc
      mask: "radial-gradient(circle, transparent 58%, #000 59%)",
      WebkitMask: "radial-gradient(circle, transparent 58%, #000 59%)",
    },
    cuff: {
      width: "58%",
      aspectRatio: "1 / 1",
      borderRadius: "50%",
      // An open cuff — a band with a gap at the base
      mask: "radial-gradient(circle, transparent 62%, #000 63%), linear-gradient(#000 0 0)",
      WebkitMask: "radial-gradient(circle, transparent 62%, #000 63%), linear-gradient(#000 0 0)",
      maskComposite: "intersect",
      WebkitMaskComposite: "source-in",
      clipPath: "polygon(0 0, 100% 0, 100% 72%, 58% 72%, 58% 100%, 42% 100%, 42% 72%, 0 72%)",
    },
    chain: {
      width: "26%",
      aspectRatio: "1 / 2.4",
      borderRadius: "50% 50% 46% 46%",
      mask: "radial-gradient(ellipse 42% 46% at 50% 52%, transparent 62%, #000 63%)",
      WebkitMask: "radial-gradient(ellipse 42% 46% at 50% 52%, transparent 62%, #000 63%)",
    },
    earring: {
      width: "30%",
      aspectRatio: "1 / 1.9",
      borderRadius: "2px",
      clipPath: "polygon(50% 0, 100% 26%, 100% 100%, 0 100%, 0 26%)",
    },
  };

  return (
    <div
      className="rotator__frame"
      data-active="true"
      style={{
        display: "grid",
        placeItems: "center",
        background: `radial-gradient(120% 100% at 30% 8%, #FFFDF8 0%, #F2ECDE 44%, #E4D9C2 74%, #CDBE9F 100%)`,
        transition: "none",
      }}
    >
      <div
        style={{
          ...shapes[form],
          background: metal,
          transform: `scaleX(${squash.toFixed(3)})`,
          boxShadow: `${(cos * 14).toFixed(1)}px 26px 44px rgba(43, 27, 18, 0.28)`,
          filter: `brightness(${(0.86 + shade / 220).toFixed(3)})`,
        }}
      />
    </div>
  );
}
