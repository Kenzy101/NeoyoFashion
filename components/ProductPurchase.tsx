"use client";

import Link from "next/link";
import { useState } from "react";
import { useBag } from "./Providers";
import { BRAND } from "@/lib/brand";
import type { Product } from "@/lib/catalog";

/**
 * The purchase panel.
 *
 * Size and "add to bag" are one component because they are one decision —
 * splitting them means the button has to guess which size the swatches are
 * showing. The size selector is a radio group, so arrow keys move through
 * the run and the current choice is announced rather than each size
 * sounding like an independent toggle.
 */
export default function ProductPurchase({ product }: { product: Product }) {
  const { add } = useBag();
  const sizes = product.sizes ?? [];
  const [size, setSize] = useState<string | undefined>(sizes[0]);
  const [added, setAdded] = useState(false);

  const label = product.collection === "jewelry" ? "Size" : "Fit";
  const groupId = `size-${product.slug}`;

  const onAdd = () => {
    add(product.slug, size, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2600);
  };

  return (
    <div className="product__actions">
      {sizes.length ? (
        <div style={{ display: "grid", gap: "var(--space-2xs)" }}>
          <span className="u-hairline" id={groupId}>
            {label}
          </span>
          <div className="swatches" role="radiogroup" aria-labelledby={groupId}>
            {sizes.map((option, i) => (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={size === option}
                className="swatch"
                // Only the selected chip is a tab stop; arrows do the rest.
                tabIndex={size === option ? 0 : -1}
                onClick={() => setSize(option)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                  event.preventDefault();
                  const next =
                    event.key === "ArrowRight"
                      ? (i + 1) % sizes.length
                      : (i - 1 + sizes.length) % sizes.length;
                  setSize(sizes[next]);
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

      <button type="button" className="btn btn--primary btn--wide" onClick={onAdd}>
        {added ? "Added to bag" : "Add to bag"}
        <span className="btn__arrow" aria-hidden="true">
          &#8594;
        </span>
      </button>

      {/* Announced once, politely, rather than on every render. */}
      <p className="u-sr-only" role="status">
        {added ? `${product.name} added to your bag.` : ""}
      </p>

      {added ? (
        <Link href="/cart" className="btn btn--quiet" style={{ justifySelf: "start" }}>
          View bag
          <span className="btn__arrow" aria-hidden="true">
            &#8594;
          </span>
        </Link>
      ) : (
        <Link href="/appointments" className="btn btn--ghost btn--wide">
          See it in {BRAND.city}
        </Link>
      )}
    </div>
  );
}
