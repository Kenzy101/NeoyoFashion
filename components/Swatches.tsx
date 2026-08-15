"use client";

import { useState } from "react";

/**
 * Size / variant selector.
 *
 * Hairline chips, gold when chosen. Implemented as a radio group rather
 * than buttons so arrow keys move between options and the current choice
 * is announced — `aria-pressed` alone would make each size sound like an
 * independent toggle.
 */
export default function Swatches({
  options,
  label,
}: {
  options: string[];
  label: string;
}) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div style={{ display: "grid", gap: "var(--space-2xs)" }}>
      <span className="u-hairline" id={`swatch-${label}`}>
        {label}
      </span>
      <div className="swatches" role="radiogroup" aria-labelledby={`swatch-${label}`}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected === option}
            aria-pressed={selected === option}
            className="swatch"
            // Only the selected chip is in the tab order; arrows do the rest.
            tabIndex={selected === option ? 0 : -1}
            onClick={() => setSelected(option)}
            onKeyDown={(event) => {
              if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
              event.preventDefault();
              const i = options.indexOf(selected);
              const next =
                event.key === "ArrowRight"
                  ? (i + 1) % options.length
                  : (i - 1 + options.length) % options.length;
              setSelected(options[next]);
              const group = event.currentTarget.parentElement;
              group?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
