"use client";

import Link from "next/link";
import { useState } from "react";
import CurrencySwitch from "./CurrencySwitch";
import Field from "./Field";
import Plate from "./Plate";
import Price from "./Price";
import Reveal from "./Reveal";
import { useBag, useCurrency } from "./Providers";
import { BRAND } from "@/lib/brand";
import { formatMoney } from "@/lib/currency";

type Errors = Partial<
  Record<"email" | "name" | "address" | "city" | "country", string>
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
 * element (Paystack / Stripe / Flutterwave) in their place before this
 * page goes anywhere near a real order. See DESIGN.md § Checkout.
 */
export default function CheckoutForm() {
  const { resolved, subtotal, count, clear, ready } = useBag();
  const { currency, region } = useCurrency();
  const [errors, setErrors] = useState<Errors>({});
  const [placed, setPlaced] = useState(false);

  const duties = Math.round(subtotal * 0.075);
  const total = subtotal + duties;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const next: Errors = {};
    const email = String(data.get("email") ?? "").trim();
    if (!email) next.email = "Required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "That address looks incomplete.";

    if (!String(data.get("name") ?? "").trim()) next.name = "Required.";
    if (!String(data.get("address") ?? "").trim()) next.address = "Required.";
    if (!String(data.get("city") ?? "").trim()) next.city = "Required.";
    if (!String(data.get("country") ?? "").trim()) next.country = "Required.";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    // TODO(handoff): hand the order and the settlement currency to the
    // payment provider's hosted element here, then clear the bag only
    // once the provider confirms.
    clear();
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

  // Nothing to check out. Say so plainly rather than showing an empty form.
  if (ready && count === 0) {
    return (
      <div className="u-page u-page--railed" style={{ paddingBlock: "clamp(8rem, 20vh, 14rem)" }}>
        <Reveal kind="rise">
          <div style={{ display: "grid", gap: "var(--space-lg)", justifyItems: "start", maxWidth: "40ch" }}>
            <span className="eyebrow">Checkout</span>
            <h1 className="u-display">Your bag is empty.</h1>
            <p className="u-body-lg">There is nothing to settle yet.</p>
            <Link href="/core" className="btn btn--ghost">
              See the collection
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
            Place order — {formatMoney(total, currency)}
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
          <div className="bag__head" style={{ paddingBlockEnd: 0, borderBlockEnd: "none" }}>
            <span className="eyebrow">Your bag</span>
            <CurrencySwitch />
          </div>

          {resolved.map((line) => (
            <div className="summary__line" key={line.id}>
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
                  {line.size ? `${line.size} · ` : ""}
                  {line.qty}
                  {line.measurements ? " · made to measure" : ""}
                </span>
              </div>
              <Price ngn={line.product.price * line.qty} className="u-caption" />
            </div>
          ))}

          <div className="summary__totals">
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

          <p className="u-caption">
            {region === "NG"
              ? "Orders settle in the currency shown above."
              : "Orders outside Nigeria settle in US Dollars."}
          </p>

          <Link href="/cart" className="btn btn--quiet" style={{ justifySelf: "start" }}>
            Edit bag
          </Link>
        </aside>
      </div>
    </div>
  );
}
