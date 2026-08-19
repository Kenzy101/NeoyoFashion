"use client";

import Link from "next/link";
import { useBag, useCurrency } from "./Providers";
import Plate from "./Plate";
import Price from "./Price";
import CurrencySwitch from "./CurrencySwitch";
import Reveal from "./Reveal";
import { BRAND } from "@/lib/brand";
import { formatMoney } from "@/lib/currency";
import { MEASUREMENT_FIELDS } from "@/lib/sizing";

/**
 * The bag.
 *
 * A held order, not a spreadsheet: the photograph is the row, quantity is
 * a pair of hairline steppers, and the only loud element on the page is
 * the single button that leaves it.
 */
export default function BagView() {
  const { resolved, subtotal, count, setQty, remove, ready } = useBag();
  const { currency } = useCurrency();

  // Hold the page still until the stored bag has been read, rather than
  // showing "your bag is empty" for a frame to someone who has three
  // things in it.
  if (!ready) {
    return (
      <div className="u-page u-page--railed" style={{ paddingBlock: "clamp(7rem, 18vh, 12rem)" }}>
        <span className="eyebrow">Your bag</span>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="u-page u-page--railed" style={{ paddingBlock: "clamp(7rem, 18vh, 12rem)" }}>
        <Reveal kind="rise">
          <div style={{ display: "grid", gap: "var(--space-lg)", justifyItems: "start", maxWidth: "40ch" }}>
            <span className="eyebrow">Your bag</span>
            <h1 className="u-display">Nothing held.</h1>
            <p className="u-body-lg">
              When you find something, it will wait here for you.
            </p>
            <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
              <Link href="/core" className="btn btn--ghost">
                NEOYO Core
              </Link>
              <Link href="/jewelry" className="btn btn--ghost">
                Jewelry
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }

  const duties = Math.round(subtotal * 0.075);
  const total = subtotal + duties;

  return (
    <div className="u-page u-page--railed" style={{ paddingBlock: "clamp(6rem, 14vh, 10rem) var(--space-3xl)" }}>
      <div className="bag">
        <div className="bag__lines">
          <Reveal kind="fade">
            <div className="bag__head">
              <div style={{ display: "grid", gap: "var(--space-2xs)" }}>
                <span className="eyebrow">Your bag</span>
                <h1 className="u-display">
                  {count} {count === 1 ? "piece" : "pieces"}
                </h1>
              </div>
              <CurrencySwitch />
            </div>
          </Reveal>

          <ul className="bag__list">
            {resolved.map((line) => (
              <li className="bag__line" key={line.id}>
                <Link
                  href={`/product/${line.slug}`}
                  className="bag__frame"
                  aria-label={line.product.name}
                >
                  <Plate
                    tone={line.product.tone}
                    slug={line.product.shots[0]}
                    grade={line.product.grade}
                    alt={line.product.name}
                    ratio="4 / 5"
                  />
                </Link>

                <div className="bag__body">
                  <Link href={`/product/${line.slug}`} className="card__name m-underline">
                    {line.product.name}
                  </Link>
                  <span className="u-caption">{line.product.note}</span>
                  {line.size ? (
                    <span className="u-hairline">
                      {line.product.collection === "jewelry" ? "Size" : "Fit"} — {line.size}
                    </span>
                  ) : null}

                  {/* A custom order carries its figures with it, so the
                      client can check what the atelier was given. */}
                  {line.measurements ? (
                    <dl className="bag__measure">
                      {MEASUREMENT_FIELDS.filter((f) => line.measurements?.[f.key]).map((f) => (
                        <div key={f.key}>
                          <dt>{f.label}</dt>
                          <dd>{line.measurements?.[f.key]}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  <div className="bag__qty" role="group" aria-label={`Quantity, ${line.product.name}`}>
                    <button
                      type="button"
                      className="bag__step"
                      onClick={() => setQty(line.id, line.qty - 1)}
                      aria-label="One fewer"
                    >
                      &minus;
                    </button>
                    <span className="bag__count" aria-live="polite">
                      {line.qty}
                    </span>
                    <button
                      type="button"
                      className="bag__step"
                      onClick={() => setQty(line.id, line.qty + 1)}
                      aria-label="One more"
                      disabled={line.qty >= 9}
                    >
                      &#43;
                    </button>

                    <button
                      type="button"
                      className="btn btn--quiet bag__remove"
                      onClick={() => remove(line.id)}
                    >
                      Remove
                      <span className="u-sr-only"> {line.product.name}</span>
                    </button>
                  </div>
                </div>

                <Price ngn={line.product.price * line.qty} className="bag__price" />
              </li>
            ))}
          </ul>
        </div>

        <aside className="summary" aria-label="Order summary">
          <span className="eyebrow">Summary</span>

          <div className="summary__totals" style={{ borderBlockStart: "none", paddingBlockStart: 0 }}>
            <div className="summary__row">
              <span>Subtotal</span>
              <Price ngn={subtotal} />
            </div>
            <div className="summary__row">
              <span>Delivery</span>
              <span>Complimentary</span>
            </div>
            <div className="summary__row">
              <span>Duties &amp; taxes</span>
              <Price ngn={duties} />
            </div>
            <div className="summary__row summary__row--total">
              <span>Total</span>
              <Price ngn={total} />
            </div>
          </div>

          <Link href="/checkout" className="btn btn--primary btn--large btn--wide">
            Checkout — {formatMoney(total, currency)}
            <span className="btn__arrow" aria-hidden="true">
              &#8594;
            </span>
          </Link>

          <p className="u-caption">
            Presented in the bone-white box, gold foil monogram, wax seal.
            Complimentary worldwide delivery from {BRAND.city}.
          </p>
        </aside>
      </div>
    </div>
  );
}
