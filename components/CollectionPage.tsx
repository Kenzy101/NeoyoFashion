import FabricFilm from "./FabricFilm";
import Footer from "./Footer";
import Onward from "./Onward";
import PageHead from "./PageHead";
import Plate from "./Plate";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { BRAND } from "@/lib/brand";
import { byCollection, COLLECTIONS, type CollectionId } from "@/lib/catalog";

/**
 * The collection template.
 *
 * Core and Ease use the loose editorial grid — pieces sit at different
 * weights and drop into the page at different heights, so it reads as a
 * spread rather than a catalogue. Jewelry and accessories switch to the
 * even grid, where the object rather than the composition is the subject.
 */
export default function CollectionPage({
  id,
  even = false,
  fabric,
}: {
  id: CollectionId;
  even?: boolean;
  fabric?: string;
}) {
  const collection = COLLECTIONS[id];
  const products = byCollection(id);
  const [first, ...rest] = products;

  return (
    <>
      <PageHead
        eyebrow={`${BRAND.name} — ${String(products.length).padStart(2, "0")} pieces`}
        title={collection.title}
        lede={collection.lede}
      />

      {/* A full-bleed opening plate — the collection's register, stated once.
          Full-bleed wrappers always reveal with `fade`: a scaling entrance
          on a 100%-wide element pushes past the viewport and produces a
          horizontal scrollbar. The Ken Burns push inside supplies the move. */}
      <Reveal kind="fade">
        <div className="bleed" data-cursor-view="Look">
          <Plate
            tone={collection.tone}
            slug={collection.hero}
            alt={`${collection.title} campaign`}
            motion={collection.hero ? "still" : "kenburns"}
            fill
          />
          <div className="bleed__quote">
            <p className="u-voice">{BRAND.voice}</p>
          </div>
        </div>
      </Reveal>

      <section className="u-page u-page--railed u-section" aria-label={collection.title}>
        <div className={`grid ${even ? "grid--even" : ""}`}>
          {(even ? products : [first, ...rest]).filter(Boolean).map((product, i) => (
            <ProductCard
              key={product.slug}
              product={product}
              index={i}
              ratio={even ? "1 / 1" : i % 4 === 1 ? "3 / 4" : "4 / 5"}
            />
          ))}
        </div>
      </section>

      {/* The fabric register — slow flowing textile, full width */}
      {fabric ? (
        <Reveal kind="fade">
          <section className="u-section" style={{ paddingBlock: "0 var(--section-gap)" }}>
            <FabricFilm caption={fabric} tone={collection.tone} />
          </section>
        </Reveal>
      ) : null}

      <Onward current={`/${id}`} />
      <Footer />
    </>
  );
}
