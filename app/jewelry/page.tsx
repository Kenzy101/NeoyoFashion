import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Onward from "@/components/Onward";
import PageHead from "@/components/PageHead";
import Plate from "@/components/Plate";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Rotator360 from "@/components/Rotator360";
import { BRAND } from "@/lib/brand";
import { byCollection, COLLECTIONS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: COLLECTIONS.jewelry.title,
  description: COLLECTIONS.jewelry.lede,
};

/**
 * Jewelry gets its own composition rather than the collection template:
 * macro photography and a 360° turntable are the whole argument here,
 * so the page opens with both before it shows a single price.
 */
export default function Jewelry() {
  const collection = COLLECTIONS.jewelry;
  const products = byCollection("jewelry");

  return (
    <>
      <PageHead
        eyebrow={`${BRAND.name} — Cast in ${BRAND.city}`}
        title={collection.title}
        lede={collection.lede}
      />

      {/* Macro opening — three closeups at different distances */}
      <section className="u-page u-page--railed" aria-label="Macro study">
        <div
          style={{
            display: "grid",
            gap: "var(--space-sm)",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))",
          }}
        >
          {(["gold", "espresso", "skin"] as const).map((tone, i) => (
            <Reveal key={tone} kind="develop" index={i}>
              <div data-cursor-view="Closer">
                <Plate
                  tone={tone}
                  ratio={i === 1 ? "3 / 4" : "1 / 1"}
                  motion={i === 0 ? "kenburns" : "still"}
                  light="none"
                />
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal kind="fade">
          <p className="u-caption" style={{ marginTop: "var(--space-sm)" }}>
            Macro, single hard key. Brass at 1:1.
          </p>
        </Reveal>
      </section>

      {/* The 360° turntable — the piece, turned in the hand */}
      <section className="u-page u-page--railed u-section" aria-label="Turn the piece">
        <div
          style={{
            display: "grid",
            gap: "var(--space-xl)",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))",
            alignItems: "center",
          }}
        >
          <Reveal kind="fade">
            <Rotator360 form="ring" label="The Seal Ring" />
          </Reveal>

          <Reveal kind="rise" index={1}>
            <div style={{ display: "grid", gap: "var(--space-md)" }}>
              <p className="eyebrow">Turn it</p>
              <h2 className="u-display">The Seal Ring</h2>
              <p className="u-body-lg">
                Lost-wax cast in {BRAND.city}, then polished for two hours until the
                light stops catching and starts moving.
              </p>
              <p className="u-caption">
                Drag, swipe, or use the arrow keys. Ten degrees a step.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="u-page u-page--railed u-section" aria-label={collection.title}>
        <div className="grid grid--even">
          {products.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} ratio="1 / 1" />
          ))}
        </div>
      </section>

      <Onward current="/jewelry" />
      <Footer />
    </>
  );
}
