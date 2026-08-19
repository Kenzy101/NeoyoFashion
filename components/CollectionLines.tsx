"use client";

import { useRef, useState } from "react";
import Plate from "./Plate";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { BRAND } from "@/lib/brand";
import type { Collection, Product } from "@/lib/catalog";

/**
 * A collection divided into lines.
 *
 * Implemented as a real tab set, not a filter row: `role="tablist"` with
 * arrow-key navigation and one tab stop for the whole group, which is how
 * a keyboard expects to move through a set of alternatives. Each panel is
 * mounted only while selected, so the reveal animations replay on switch
 * and the page never holds two collections' worth of imagery at once.
 *
 * The tabs are set in the display serif rather than as buttons. These are
 * the names of two collections, and the house does not label its
 * collections the way a shop labels a filter.
 */
export default function CollectionLines({
  collection,
  products,
}: {
  collection: Collection;
  products: Product[];
}) {
  const lines = collection.lines ?? [];
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  if (lines.length === 0) return null;

  const line = lines[active];
  const inLine = products.filter((p) => p.line === line.id);

  const move = (delta: number) => {
    const next = (active + delta + lines.length) % lines.length;
    setActive(next);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <>
      <section className="u-page u-page--railed lines" aria-label={`${collection.title} collections`}>
        <div className="lines__tabs" role="tablist" aria-label="Collections" ref={tabsRef}>
          {lines.map((l, i) => (
            <button
              key={l.id}
              type="button"
              role="tab"
              id={`tab-${l.id}`}
              aria-selected={active === i}
              aria-controls={`panel-${l.id}`}
              // One tab stop for the group; arrows move within it.
              tabIndex={active === i ? 0 : -1}
              className="lines__tab"
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") { e.preventDefault(); move(1); }
                if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); }
                if (e.key === "Home") { e.preventDefault(); setActive(0); }
                if (e.key === "End") { e.preventDefault(); setActive(lines.length - 1); }
              }}
            >
              {l.title}
            </button>
          ))}
        </div>

        <p className="lines__lede" key={`lede-${line.id}`}>
          {line.lede}
        </p>
      </section>

      <div
        role="tabpanel"
        id={`panel-${line.id}`}
        aria-labelledby={`tab-${line.id}`}
        // Re-keyed per line so the reveals replay rather than snapping in.
        key={line.id}
      >
        {line.hero ? (
          <Reveal kind="fade">
            <div className="bleed" data-cursor-view="Look">
              <Plate
                tone={collection.tone}
                slug={line.hero}
                alt={`${line.title}, ${collection.title}`}
                fill
              />
              <div className="bleed__quote">
                <p className="u-voice">{BRAND.voice}</p>
              </div>
            </div>
          </Reveal>
        ) : null}

        <section className="u-page u-page--railed u-section" aria-label={line.title}>
          {inLine.length ? (
            <div className="grid">
              {inLine.map((product, i) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  index={i}
                  ratio={i % 4 === 1 ? "3 / 4" : "4 / 5"}
                />
              ))}
            </div>
          ) : (
            // Honest rather than an empty grid that looks broken.
            <p className="u-body-lg">This line is being cut. It will be here shortly.</p>
          )}
        </section>
      </div>
    </>
  );
}
