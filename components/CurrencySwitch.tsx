"use client";

import { useCurrency } from "./Providers";
import { CURRENCY_LABEL } from "@/lib/currency";

/**
 * The currency choice.
 *
 * Only rendered where there is a choice to make — in Nigeria. Everywhere
 * else the order settles in dollars, so a switch would be a control that
 * does nothing, which is worse than no control at all.
 */
export default function CurrencySwitch({ className }: { className?: string }) {
  const { currency, choices, setCurrency, ready } = useCurrency();

  if (!ready || choices.length < 2) return null;

  return (
    <div
      className={["ccy", className ?? ""].filter(Boolean).join(" ")}
      role="radiogroup"
      aria-label="Currency"
    >
      {choices.map((c) => (
        <button
          key={c}
          type="button"
          role="radio"
          aria-checked={currency === c}
          className="ccy__opt"
          onClick={() => setCurrency(c)}
        >
          {CURRENCY_LABEL[c]}
        </button>
      ))}
    </div>
  );
}
