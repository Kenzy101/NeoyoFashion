"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  currenciesFor,
  defaultCurrencyFor,
  detectRegion,
  type Currency,
  type Region,
} from "@/lib/currency";
import { bySlug, type Product } from "@/lib/catalog";

/* =====================================================================
   CURRENCY
   ===================================================================== */

type CurrencyState = {
  currency: Currency;
  region: Region;
  choices: Currency[];
  setCurrency: (c: Currency) => void;
  /** False until the region has been read on the client. */
  ready: boolean;
};

const CurrencyContext = createContext<CurrencyState | null>(null);

const CURRENCY_KEY = "neoyo:currency";

function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // The server has no idea where the visitor is, so it renders dollars and
  // the client corrects on mount. `ready` lets prices hold still until then
  // rather than flickering from one currency to another.
  const [region, setRegion] = useState<Region>("INTL");
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const detected = detectRegion();
    setRegion(detected);

    const allowed = currenciesFor(detected);
    let next = defaultCurrencyFor(detected);

    try {
      const saved = localStorage.getItem(CURRENCY_KEY) as Currency | null;
      // A saved choice only counts if the region still permits it. Someone
      // who chose Naira in Lagos and opens the site in Paris gets dollars.
      if (saved && allowed.includes(saved)) next = saved;
    } catch {
      /* storage unavailable — the default stands */
    }

    setCurrencyState(next);
    setReady(true);
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(CURRENCY_KEY, c);
    } catch {
      /* nothing to do */
    }
  }, []);

  const value = useMemo(
    () => ({ currency, region, choices: currenciesFor(region), setCurrency, ready }),
    [currency, region, setCurrency, ready],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyState {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside <Providers>");
  return ctx;
}

/* =====================================================================
   BAG
   ===================================================================== */

export type BagLine = {
  slug: string;
  /** Undefined for pieces sold in one size. */
  size?: string;
  qty: number;
};

export type ResolvedLine = BagLine & { product: Product };

type BagState = {
  lines: BagLine[];
  resolved: ResolvedLine[];
  count: number;
  /** Subtotal in Naira — the currency layer converts for display. */
  subtotal: number;
  add: (slug: string, size: string | undefined, qty?: number) => void;
  setQty: (slug: string, size: string | undefined, qty: number) => void;
  remove: (slug: string, size: string | undefined) => void;
  clear: () => void;
  /** False until localStorage has been read. */
  ready: boolean;
  /** Set briefly after an add, so the chrome can acknowledge it. */
  lastAdded: string | null;
};

const BagContext = createContext<BagState | null>(null);

const BAG_KEY = "neoyo:bag";

/** Two lines are the same line only if both piece and size match. */
const sameLine = (l: BagLine, slug: string, size?: string) =>
  l.slug === slug && (l.size ?? "") === (size ?? "");

function BagProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<BagLine[]>([]);
  const [ready, setReady] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  // Read once on mount. The server renders an empty bag, so nothing here
  // can cause a hydration mismatch.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(BAG_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLines(
            parsed.filter(
              (l): l is BagLine =>
                !!l &&
                typeof (l as BagLine).slug === "string" &&
                Number.isFinite((l as BagLine).qty) &&
                // Drop anything whose piece has since left the collection.
                Boolean(bySlug((l as BagLine).slug)),
            ),
          );
        }
      }
    } catch {
      /* corrupt or unavailable — start with an empty bag */
    }
    setReady(true);
  }, []);

  // Persist every change, but never the empty initial state before the
  // stored bag has been read — that would wipe it on first paint.
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(BAG_KEY, JSON.stringify(lines));
    } catch {
      /* nothing to do */
    }
  }, [lines, ready]);

  const add = useCallback((slug: string, size: string | undefined, qty = 1) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => sameLine(l, slug, size));
      if (i === -1) return [...prev, { slug, size, qty }];
      const next = [...prev];
      next[i] = { ...next[i], qty: Math.min(next[i].qty + qty, 9) };
      return next;
    });
    setLastAdded(slug);
    window.setTimeout(() => setLastAdded(null), 2600);
  }, []);

  const setQty = useCallback((slug: string, size: string | undefined, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !sameLine(l, slug, size))
        : prev.map((l) =>
            sameLine(l, slug, size) ? { ...l, qty: Math.min(qty, 9) } : l,
          ),
    );
  }, []);

  const remove = useCallback((slug: string, size: string | undefined) => {
    setLines((prev) => prev.filter((l) => !sameLine(l, slug, size)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const resolved = useMemo(
    () =>
      lines
        .map((l) => {
          const product = bySlug(l.slug);
          return product ? { ...l, product } : null;
        })
        .filter((l): l is ResolvedLine => l !== null),
    [lines],
  );

  const value = useMemo<BagState>(
    () => ({
      lines,
      resolved,
      count: resolved.reduce((n, l) => n + l.qty, 0),
      subtotal: resolved.reduce((n, l) => n + l.product.price * l.qty, 0),
      add,
      setQty,
      remove,
      clear,
      ready,
      lastAdded,
    }),
    [lines, resolved, add, setQty, remove, clear, ready, lastAdded],
  );

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag(): BagState {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag must be used inside <Providers>");
  return ctx;
}

/* =====================================================================
   ROOT
   ===================================================================== */

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <BagProvider>{children}</BagProvider>
    </CurrencyProvider>
  );
}
