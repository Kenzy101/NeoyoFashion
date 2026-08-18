"use client";

import Link from "next/link";
import { useState } from "react";
import Field from "./Field";
import Plate from "./Plate";
import Reveal from "./Reveal";
import { BRAND } from "@/lib/brand";
import { bySlug, formatPrice, SAMPLE_ORDER } from "@/lib/catalog";

type Errors = Partial<
  Record<"email" | "name" | "address" | "city" | "country" | "card", string>
>;

/**
 * Checkout.
 *
 * One page. No steps, no progress bar, no upsell, no "continue to
 * shipping". Everything the visitor must supply is visible at once, the
 * order sits beside it, and there is exactly one button.
 *
 * PAYMENT: the card fields here are inert markup for layout only —
 * nothing is collected, stored, or transmitted. Wire a hosted payment
 * element (Stripe / Paystack / Flutterwave) in their place before this
 * page goes anywhere near a real order. See DESIGN.md § Checkout.
 */
export default function CheckoutForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [placed, setPlaced] = useState(false);

  const lines = SAMPLE_ORDER.map((line) => {
    const product = bySlug(line.slug);
    return product ? { ...line, product } : null;
  }).filter((line): line is NonNullable<typeof line> => line !== null);

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const duties = Math.round(subtotal * 0.075);
  const total = subtotal + duties;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const next: Errors = {};
    const email = String(data.get("email") ?? "").trim();
    if (!email) next.email = "Required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That address looks incomplete.";

    if (!String(data.get("name") ?? "").trim()) next.name = "Required.";
    if (!String(data.get("address") ?? "").trim()) next.address = "Required.";
    if (!String(data.get("city") ?? "").trim()) next.city = "Required.";
    if (!String(data.get("country") ?? "").trim()) next.country = "Required.";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    // TODO(handoff): hand off to the payment provider's hosted element.
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="u-page u-page--railed" style={{ paddingBlock: "clamp(8rem, 20vh, 14rem)" }}>
        <Reveal kind="rise">
          <div style={{ display: "grid", gap: "var(--space-lg)", justifyItems: "start", maxWidth: "44ch" }}>
            <span className="eyebrow">Placed</span>
            <h1 className="u-display">Thank you.</h1>
            <p className="u-body-lg">
              Your pieces are being wrapped in {BRAND.city} — bone-white box, gold
              foil, wax seal. You will have a confirmation by email, and a note from
              the atelier when it leaves.
            </p>
            <Link href="/" className="btn btn--ghost">
              Return
            </Link>
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="u-page u-page--railed">
      <div className="checkout">
        {/* ---------------- the form ---------------- */}
        <form className="checkout__form" onSubmit={onSubmit} noValidate>
          <Reveal kind="fade">
            <div style={{ display: "grid", gap: "var(--space-2xs)" }}>
              <span className="eyebrow">{BRAND.name}</span>
              <h1 className="u-display">Checkout</h1>
            </div>
          </Reveal>

          <fieldset className="fieldset">
            <legend className="fieldset__legend">Contact</legend>
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={errors.email}
              hint="For the confirmation, and nothing else."
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset__legend">Delivery</legend>

            <Field label="Full name" name="name" autoComplete="name" required error={errors.name} />
            <Field
              label="Address"
              name="address"
              autoComplete="street-address"
              required
              error={errors.address}
            />

            <div className="fieldset__row fieldset__row--three">
              <Field label="City" name="city" autoComplete="address-level2" required error={errors.city} />
              <Field label="Postcode" name="postcode" autoComplete="postal-code" />
              <Field label="Country" name="country" autoComplete="country-name" required error={errors.country} />
            </div>

            <Field label="Telephone" name="phone" type="tel" autoComplete="tel" />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset__legend">Payment</legend>

            {/* Layout only. Replace this block with the provider's hosted
                element before launch — see the note at the top of this file. */}
            <div
              aria-hidden="true"
              style={{
                display: "grid",
                gap: "var(--space-md)",
                opacity: 0.55,
                pointerEvents: "none",
              }}
            >
              <Field label="Card number" name="card" inputMode="numeric" placeholder="•••• •••• •••• ••••" />
              <div className="fieldset__row fieldset__row--two">
                <Field label="Expiry" name="expiry" placeholder="MM / YY" />
                <Field label="Security code" name="cvc" inputMode="numeric" placeholder="•••" />
              </div>
            </div>

            <p className="field__hint">
              Card details are handled by our payment provider and never reach
              NEOYO&apos;s servers.
            </p>

            <label className="choice">
              <input className="choice__input" type="checkbox" name="gift" />
              <span className="choice__box" aria-hidden="true" />
              <span className="choice__label">
                This is a gift. Omit the price, add the wax seal and a hand-written card.
              </span>
            </label>
          </fieldset>

          <button type="submit" className="btn btn--primary btn--large btn--wide">
            Place order — {formatPrice(total)}
            <span className="btn__arrow" aria-hidden="true">
              &#8594;
            </span>
          </button>

          <p className="u-caption">
            Complimentary worldwide delivery. Returns accepted within thirty days,
            unworn, in the box it arrived in.
          </p>
        </form>

        {/* ---------------- the order ---------------- */}
        <aside className="summary" aria-label="Your order">
          <span className="eyebrow">Your bag</span>

          {lines.map((line) => (
            <div className="summary__line" key={line.slug}>
              <Plate
                tone={line.product.tone}
                slug={line.product.shots[0]}
                grade={line.product.grade}
                alt={line.product.name}
                ratio="4 / 5"
              />
              <div style={{ display: "grid", gap: "var(--space-3xs)" }}>
                <span className="card__name" style={{ fontSize: "var(--text-body)" }}>
                  {line.product.name}
                </span>
                <span className="u-caption">
                  {line.size} · {line.qty}
                </span>
              </div>
              <span className="u-caption">{formatPrice(line.product.price * line.qty)}</span>
            </div>
          ))}

          <div className="summary__totals">
            <div className="summary__row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary__row">
              <span>Delivery</span>
              <span>Complimentary</span>
            </div>
            <div className="summary__row">
              <span>Duties &amp; taxes</span>
              <span>{formatPrice(duties)}</span>
            </div>
            <div className="summary__row summary__row--total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <p className="u-caption">
            Presented in the bone-white box, gold foil monogram, wax seal.
          </p>
        </aside>
      </div>
    </div>
  );
}
