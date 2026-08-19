"use client";

import Link from "next/link";
import { useState } from "react";
import SizeChart from "./SizeChart";
import { useBag } from "./Providers";
import type { Product } from "@/lib/catalog";
import {
  CUSTOM_FIT,
  MEASUREMENT_FIELDS,
  summariseMeasurements,
  type Measurements,
} from "@/lib/sizing";

/**
 * The purchase panel.
 *
 * Fit and "add to bag" are one component because they are one decision —
 * split, the button has to guess which size the swatches are showing.
 *
 * Garments carry the house's numbered run, 6 through 20, plus a Custom
 * option. Choosing Custom opens the measurement form built on the same
 * columns as the size chart, so a client reads the chart and fills in the
 * identical set of figures. Jewelry keeps its own sizes and never offers
 * custom — a bracelet is cut to a length, not to a body.
 */
export default function ProductPurchase({ product }: { product: Product }) {
  const { add } = useBag();

  const isGarment = product.collection === "core" || product.collection === "ease";
  const sizes = product.sizes ?? [];
  const options = isGarment && sizes.length ? [...sizes, CUSTOM_FIT] : sizes;

  const [size, setSize] = useState<string | undefined>(options[0]);
  const [measurements, setMeasurements] = useState<Measurements>({});
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const custom = size === CUSTOM_FIT;
  const label = product.collection === "jewelry" ? "Size" : "Fit";
  const groupId = `fit-${product.slug}`;

  const onAdd = () => {
    // A custom order without measurements is not an order, it is a guess.
    if (custom) {
      const missing = MEASUREMENT_FIELDS.filter((f) => !measurements[f.key]?.trim());
      if (missing.length) {
        setError(
          missing.length === MEASUREMENT_FIELDS.length
            ? "Please give us your measurements."
            : `Still needed: ${missing.map((f) => f.label.toLowerCase()).join(", ")}.`,
        );
        document
          .querySelector<HTMLInputElement>(`#m-${product.slug}-${missing[0].key}`)
          ?.focus();
        return;
      }
    }

    setError(null);
    add(product.slug, size, 1, custom ? measurements : undefined);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2600);
  };

  return (
    <div className="product__actions">
      {options.length ? (
        <div style={{ display: "grid", gap: "var(--space-2xs)" }}>
          <span className="u-hairline" id={groupId}>
            {label}
          </span>
          <div className="swatches" role="radiogroup" aria-labelledby={groupId}>
            {options.map((option, i) => (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={size === option}
                className="swatch"
                data-wide={option === CUSTOM_FIT ? "true" : undefined}
                // Only the selected chip is a tab stop; arrows do the rest.
                tabIndex={size === option ? 0 : -1}
                onClick={() => setSize(option)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                  event.preventDefault();
                  const next =
                    event.key === "ArrowRight"
                      ? (i + 1) % options.length
                      : (i - 1 + options.length) % options.length;
                  setSize(options[next]);
                  event.currentTarget.parentElement
                    ?.querySelectorAll<HTMLButtonElement>("button")
                    [next]?.focus();
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {isGarment ? <SizeChart active={custom ? undefined : size} /> : null}

      {/* --- Custom order — the chart's own columns, as fields --- */}
      {custom ? (
        <fieldset className="measure">
          <legend className="measure__legend">Your measurements</legend>
          <p className="u-caption" style={{ marginBlockEnd: "var(--space-sm)" }}>
            In inches. The atelier will write to confirm before cutting.
          </p>

          <div className="measure__grid">
            {MEASUREMENT_FIELDS.map((f) => (
              <div className="field" key={f.key}>
                <label className="field__label" htmlFor={`m-${product.slug}-${f.key}`}>
                  {f.label}
                </label>
                <div className="field__control">
                  <input
                    className="field__input"
                    id={`m-${product.slug}-${f.key}`}
                    // Height is written as feet and inches; the rest are numbers.
                    inputMode={f.key === "height" ? "text" : "decimal"}
                    placeholder={f.key === "height" ? `5'9"` : "—"}
                    value={measurements[f.key] ?? ""}
                    onChange={(e) =>
                      setMeasurements((m) => ({ ...m, [f.key]: e.target.value }))
                    }
                    aria-describedby={`h-${product.slug}-${f.key}`}
                  />
                </div>
                <span className="field__hint" id={`h-${product.slug}-${f.key}`}>
                  {f.hint}
                </span>
              </div>
            ))}
          </div>

          {error ? (
            <p className="field__error" role="alert" style={{ marginBlockStart: "var(--space-sm)" }}>
              {error}
            </p>
          ) : null}
        </fieldset>
      ) : null}

      <button type="button" className="btn btn--primary btn--wide" onClick={onAdd}>
        {added ? "Added to bag" : custom ? "Order to my measurements" : "Add to bag"}
        <span className="btn__arrow" aria-hidden="true">
          &#8594;
        </span>
      </button>

      {/* Announced once, politely, rather than on every render. */}
      <p className="u-sr-only" role="status">
        {added
          ? `${product.name} added to your bag${
              custom ? `, ${summariseMeasurements(measurements)}` : ""
            }.`
          : ""}
      </p>

      {added ? (
        <Link href="/cart" className="btn btn--quiet" style={{ justifySelf: "start" }}>
          View bag
          <span className="btn__arrow" aria-hidden="true">
            &#8594;
          </span>
        </Link>
      ) : null}
    </div>
  );
}
