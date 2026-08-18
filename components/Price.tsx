"use client";

import { useCurrency } from "./Providers";
import { formatMoney } from "@/lib/currency";

/**
 * A price, in whatever currency this visitor is entitled to see.
 *
 * Amounts are always passed in Naira — the catalogue's single source of
 * truth — and converted here. Until the region has been read on the client
 * the figure is held at reduced opacity rather than swapped, so a price
 * never appears to change while somebody is looking at it.
 */
export default function Price({
  ngn,
  className,
}: {
  ngn: number;
  className?: string;
}) {
  const { currency, ready } = useCurrency();

  return (
    <span
      className={className}
      data-price-ready={ready ? "true" : "false"}
      // Both figures are the same length class, so nothing reflows.
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {formatMoney(ngn, currency)}
    </span>
  );
}
