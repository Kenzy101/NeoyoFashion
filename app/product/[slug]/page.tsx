import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FabricFilm from "@/components/FabricFilm";
import Footer from "@/components/Footer";
import Plate from "@/components/Plate";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Rotator360, { type JewelForm } from "@/components/Rotator360";
import Swatches from "@/components/Swatches";
import { BRAND } from "@/lib/brand";
import { bySlug, byCollection, COLLECTIONS, formatPrice, PRODUCTS } from "@/lib/catalog";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = bySlug(slug);
  if (!product) return { title: "Not found" };
  return { title: product.name, description: product.note };
}

/** Which procedural form the 360° viewer should draw per jewelry piece. */
const FORM: Record<string, JewelForm> = {
  "the-crimson-drop": "earring",
  "the-snow-quartz-bracelet": "cuff",
  "the-citrine-double-strand": "chain",
  "the-rutilated-mixed": "cuff",
  "the-strawberry-quartz": "cuff",
  "the-citrine-moonstone": "cuff",
  "the-amethyst-blossom": "cuff",
};

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = bySlug(slug);
  if (!product) notFound();

  const collection = COLLECTIONS[product.collection];
  const alsoIn = byCollection(product.collection)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      <article className="u-page u-page--railed product">
        {/* --- Gallery. Massive photography, almost no text. --- */}
        <div className="product__gallery">
          {/* The hero: the photograph itself where one exists, and the
              procedural plate where the piece is still awaiting a shoot. */}
          <Reveal kind="develop">
            <div data-cursor-view="Closer">
              <Plate
                tone={product.tone}
                slug={product.shots[0]}
                grade={product.grade}
                alt={product.name}
                ratio="4 / 5"
                motion={product.shots.length ? "still" : "kenburns"}
                light={product.collection === "jewelry" ? "none" : "key"}
              />
            </div>
          </Reveal>

          {/* Jewelry turns in the hand. The viewer sits under the hero so a
              visitor sees the real piece first and the turntable second. */}
          {product.rotate ? (
            <Reveal kind="fade">
              <Rotator360 form={FORM[product.slug] ?? "ring"} label={product.name} />
            </Reveal>
          ) : null}

          {product.shots.slice(1).map((shot, i) => (
            <Reveal key={shot} kind="develop" index={i}>
              <div data-cursor-view="Closer">
                <Plate
                  tone={product.tone}
                  slug={shot}
                  grade={product.grade}
                  alt={`${product.name}, view ${i + 2}`}
                  ratio={i % 2 === 0 ? "3 / 4" : "1 / 1"}
                  light={product.collection === "jewelry" ? "none" : "key"}
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* --- The purchase panel. Sticky, quiet, one action. --- */}
        <aside className="product__aside" aria-label={`${product.name} details`}>
          <Reveal kind="rise">
            <div style={{ display: "grid", gap: "var(--space-sm)" }}>
              <Link href={`/${product.collection}`} className="eyebrow">
                {collection.title}
              </Link>
              <h1 className="product__name">{product.name}</h1>
              <p className="product__price">{formatPrice(product.price)}</p>
            </div>
          </Reveal>

          <Reveal kind="rise" index={1}>
            <p className="product__note">{product.note}</p>
          </Reveal>

          <Reveal kind="rise" index={2}>
            <div className="product__actions">
              {product.sizes?.length ? (
                <Swatches
                  options={product.sizes}
                  label={product.collection === "jewelry" ? "Size" : "Fit"}
                />
              ) : null}

              <Link href="/checkout" className="btn btn--primary btn--wide">
                Add to bag
                <span className="btn__arrow" aria-hidden="true">
                  &#8594;
                </span>
              </Link>

              <Link href="/appointments" className="btn btn--ghost btn--wide">
                See it in {BRAND.city}
              </Link>
            </div>
          </Reveal>

          <Reveal kind="fade" index={3}>
            <dl className="spec">
              <div className="spec__row">
                <dt className="spec__key">Material</dt>
                <dd className="spec__value">{product.materials}</dd>
              </div>
              <div className="spec__row">
                <dt className="spec__key">Atelier</dt>
                <dd className="spec__value">{product.atelier}</dd>
              </div>
              <div className="spec__row">
                <dt className="spec__key">Care</dt>
                <dd className="spec__value">{product.care}</dd>
              </div>
              <div className="spec__row">
                <dt className="spec__key">Delivery</dt>
                <dd className="spec__value">
                  Complimentary, worldwide. Presented in the bone-white box.
                </dd>
              </div>
            </dl>
          </Reveal>
        </aside>
      </article>

      {/* --- The fabric register, for pieces that move --- */}
      {product.fabric ? (
        <Reveal kind="fade">
          <section
            className="u-section"
            style={{ paddingBlock: "var(--section-gap) 0" }}
            aria-label="Fabric"
          >
            <FabricFilm caption={product.fabric} tone={product.tone} />
          </section>
        </Reveal>
      ) : null}

      {/* --- The house line, stated once --- */}
      <Reveal kind="fade">
        <section className="u-page u-page--railed u-section" aria-label="House">
          <p
            className="u-voice"
            style={{
              fontSize: "var(--text-display)",
              lineHeight: 1.25,
              maxWidth: "20ch",
              color: "var(--ink)",
            }}
          >
            {BRAND.voice}
          </p>
        </section>
      </Reveal>

      {alsoIn.length ? (
        <section
          className="u-page u-page--railed"
          style={{ paddingBlockEnd: "var(--section-gap)" }}
          aria-label={`More from ${collection.title}`}
        >
          <Reveal kind="fade">
            <p className="eyebrow" style={{ marginBottom: "var(--space-xl)" }}>
              Also in {collection.title}
            </p>
          </Reveal>
          <div className="grid grid--even">
            {alsoIn.map((item, i) => (
              <ProductCard key={item.slug} product={item} index={i} ratio="4 / 5" />
            ))}
          </div>
        </section>
      ) : null}

      <Footer />
    </>
  );
}
