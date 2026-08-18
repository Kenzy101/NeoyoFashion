# NEOYO

**Outstandingly Different.**

The official website for NEOYO — a fashion house in Lagos, Nigeria.

**Live:** https://kenzy101.github.io/NeoyoFashion/

This is not an ecommerce site first. It is an experience. The landing page has no
shop, no navigation bar and no scroll: a logo fixed to the left edge, a tagline, a
full-screen cinematic film, and a ticker of client voices. Everything else lives
behind a single hamburger in the top-right corner.

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build
```

```bash
npm start
```

Requires Node 18.18+ (Node 24 recommended).

---

## What's here

| Route | |
|---|---|
| `/` | The landing cinema — logo, tagline, the campaign film, review ticker |
| `/core` `/ease` | Made to order collections |
| `/jewelry` | Macro photography + 360° turntable |
| `/accessories` | Object studies |
| `/vip` | The private room |
| `/campaigns` | Four seasons on film |
| `/about` `/journal` | The house, and notes from the atelier |
| `/contact` `/appointments` | Client care and the appointment request |
| `/product/[slug]` | 16 product pages, statically generated |
| `/checkout` | One page. No steps. |
| **`/styleguide`** | **The live component library, tokens and handoff** |

All 16 routes are statically prerendered.

---

## Reading the code

Start with **[`DESIGN.md`](DESIGN.md)** — the full design system and developer
handoff: colour, typography, space, motion, the imagery contract, component
rules, accessibility, and the two layout traps that are already solved.

Then `/styleguide` in the browser, which is the same system rendered live.

The single source of truth for every colour, size, duration and easing curve is
[`app/styles/tokens.css`](app/styles/tokens.css). Nothing in the codebase
hard-codes a value.

---

## Deploying

Every push to `main` builds and publishes to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The site is a
static export, so it needs no server and no credentials — the workflow uses
the built-in token.

**One-time setup.** Pages has to be switched on for the repository:
*Settings → Pages → Build and deployment → Source: **GitHub Actions***. If the
workflow's "Configure Pages" step is skipped or fails, also check
*Settings → Actions → General → Workflow permissions* is set to
**Read and write permissions**.

Moving to a custom domain: set `NEXT_PUBLIC_BASE_PATH` to an empty string in
the workflow, since the site is then served from the root rather than
`/NeoyoFashion`.

To build the exported site locally:

```bash
NEXT_PUBLIC_BASE_PATH=/NeoyoFashion npm run build
```

The output lands in `out/`.

---

## Before this goes live

Three things are deliberately unfinished, and each is marked `TODO(handoff)` in
the source:

1. **Accessories photography.** Everything else runs on the real shoot. The
   four accessories carry an empty `shots` list in `lib/catalog.ts` and fall
   back to the procedural plate, because inventing a placeholder that looks
   like a product would be worse than an honest absence.

   To add photography anywhere: drop the files in a folder, run
   `node scripts/ingest-media.cjs "C:/path/to/media"`, then reference the new
   slug — in `shots` for a product, or in `lib/cinema.ts` for the homepage
   film. Video works through the same pipeline. See `DESIGN.md` § 6.
2. **Payment.** The card fields in `components/CheckoutForm.tsx` are inert markup
   for layout only — `aria-hidden`, non-interactive, collecting nothing. Replace
   that block with a hosted payment element (Paystack, Stripe, Flutterwave)
   before any real order. Card data must never reach NEOYO's servers.
3. **Form endpoints.** Contact, appointments and checkout validate and confirm on
   the client; wire them to a server action or API route.

### Bag and currency

The bag lives in `components/Providers.tsx` and persists to
`localStorage` under `neoyo:bag`. It is client-only by design — the site
is a static export — so there is no order record anywhere until a payment
provider is wired in.

Prices are stored in Naira throughout `lib/catalog.ts`; `<Price/>`
converts for display. In Nigeria the visitor chooses Naira or dollars;
everywhere else the site is dollars only, because the order settles in
dollars. The rate is `NGN_PER_USD` in `lib/currency.ts` — **it is
hard-coded and needs reviewing whenever pricing changes.**

Region comes from the browser's time zone, with the locale as a second
opinion, because a static export has no request IP to read. If the site
ever moves to a host with edge functions, read the country header instead.

---

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · plain CSS with design tokens.

No CSS framework, no animation library, no icon package. Every effect is CSS or a
few lines of `requestAnimationFrame`.

---

## Brand

| | |
|---|---|
| Bone White | `#F2ECDE` — dominant surface, 80% |
| Brownish Gold | `#A9824B` — logo, accents, hardware |
| Espresso Brown | `#2B1B12` — dark ground, high contrast only |
| Display | Cormorant Garamond |
| Body | Inter |

*She doesn't seek attention. Attention follows her.*

---

Lagos, Nigeria · [hello@neoyo.com](mailto:hello@neoyo.com) · [@neoyo_official](https://instagram.com/neoyo_official)
