"use client";

import Link from "next/link";
import { useBag } from "./Providers";

/**
 * The bag, in the menu foot.
 *
 * The count only appears once the stored bag has been read, so the number
 * never jumps from nothing to three in front of the visitor.
 */
export default function BagLink({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const { count, ready } = useBag();

  return (
    <Link href="/cart" className={className} onClick={onNavigate}>
      Bag
      {ready && count > 0 ? (
        <>
          {" "}
          <span className="bag__badge" aria-hidden="true">
            {count}
          </span>
          <span className="u-sr-only">, {count} {count === 1 ? "piece" : "pieces"}</span>
        </>
      ) : null}
    </Link>
  );
}
