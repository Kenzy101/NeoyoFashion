/**
 * Currency.
 *
 * Every price in the catalogue is stored in Naira — one source of truth,
 * because the house prices in Naira. Presentation converts.
 *
 * The rule, per the house:
 *   · In Nigeria  — Naira and US Dollars, the visitor chooses.
 *   · Elsewhere   — US Dollars only. There is no Naira option abroad,
 *                   because the order will settle in dollars.
 */

export type Currency = "NGN" | "USD";
export type Region = "NG" | "INTL";

/**
 * Naira per US Dollar.
 *
 * REVIEW THIS. It is a hard-coded rate because the site is a static export
 * with no server to call a rates API from, and a wrong rate on a luxury
 * price list is worse than a stale one that somebody owns. Update it when
 * the house updates its pricing, and note the date below.
 *
 * Last set: 18 August 2026.
 */
export const NGN_PER_USD = 1650;

export const CURRENCY_LABEL: Record<Currency, string> = {
  NGN: "₦ NGN",
  USD: "$ USD",
};

/** Naira → dollars, rounded to a whole dollar. Luxury prices do not have cents. */
export const toUSD = (ngn: number): number => Math.round(ngn / NGN_PER_USD);

/**
 * Format a Naira-denominated amount in the requested currency.
 * Grouped, no decimals — the price is never the loudest thing on the page.
 */
export const formatMoney = (ngn: number, currency: Currency): string =>
  currency === "NGN"
    ? `₦${ngn.toLocaleString("en-NG")}`
    : `$${toUSD(ngn).toLocaleString("en-US")}`;

/**
 * Where the visitor is, as far as the browser will say.
 *
 * A static export has no server, so there is no request IP and no geo
 * header to read. The time zone is the most reliable signal a browser
 * offers — it is set by the operating system and survives a VPN far
 * better than the IP does — with the locale as a second opinion.
 *
 * TODO(handoff): if the site ever moves to a host with edge functions
 * (Vercel, Cloudflare, Netlify), read the country header there instead and
 * pass it in. This is a good default, not a legal-grade determination.
 */
export const detectRegion = (): Region => {
  if (typeof window === "undefined") return "INTL";

  try {
    // WAT covers Nigeria and its neighbours; Lagos is the Nigerian zone.
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (zone === "Africa/Lagos") return "NG";
  } catch {
    // Intl unavailable — fall through to the locale check.
  }

  const locales = [
    ...(navigator.languages ?? []),
    navigator.language ?? "",
  ].filter(Boolean);

  if (locales.some((l) => l.toUpperCase().endsWith("-NG"))) return "NG";

  return "INTL";
};

/** Which currencies a region may choose between. */
export const currenciesFor = (region: Region): Currency[] =>
  region === "NG" ? ["NGN", "USD"] : ["USD"];

export const defaultCurrencyFor = (region: Region): Currency =>
  region === "NG" ? "NGN" : "USD";
