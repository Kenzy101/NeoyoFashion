# NEOYO

**Outstandingly Different.**

The official website for NEOYO — a fashion house in Lagos, Nigeria.

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
| `/core` `/ease` | Ready-to-wear collections |
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

## Before this goes live

Three things are deliberately unfinished, and each is marked `TODO(handoff)` in
the source:

1. **Photography beyond the homepage.** The landing cinema runs on real
   campaign photography. Interior pages still use `<Plate/>`, which renders
   warm museum light procedurally in CSS — add `src` / `video` + `alt` to the
   existing calls and nothing else changes, since ratio, grain, key light and
   motion are already correct. See `DESIGN.md` § 6.

   To add to the homepage film, drop files in a folder and run
   `node scripts/ingest-media.cjs "C:/path/to/media"`, then list the new slug
   in `lib/cinema.ts`. Video is supported by the same pipeline.
2. **Payment.** The card fields in `components/CheckoutForm.tsx` are inert markup
   for layout only — `aria-hidden`, non-interactive, collecting nothing. Replace
   that block with a hosted payment element (Paystack, Stripe, Flutterwave)
   before any real order. Card data must never reach NEOYO's servers.
3. **Form endpoints.** Contact, appointments and checkout validate and confirm on
   the client; wire them to a server action or API route.

The cart is currently `SAMPLE_ORDER` in `lib/catalog.ts`.

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
