# NEOYO — Design System & Developer Handoff

**Outstandingly Different.**

This is the working specification for the NEOYO website. It is written for the
person who has to build the next page. If something is not described here, it
does not exist in the system yet — add it here first, then to `/styleguide`,
then use it.

The live component library is at **`/styleguide`**. This document is the reasoning
behind it.

---

## 1. What this site is

It is not an ecommerce site with a nice theme on top. It is an experience that
happens to sell things.

Three rules govern every decision:

1. **Emotion before commerce.** The landing page has no shop, no nav bar, no
   product grid, no scroll. It has a logo, a tagline, a film, and a review
   ticker. The visitor should feel something before they are asked to do
   anything.
2. **Whitespace is the structure.** When in doubt, take the larger space step and
   remove a sentence. Almost no text is the target, not an accident.
3. **Nothing snaps.** Every transition uses a deep ease-out over a long duration.
   If an interaction feels quick, it is wrong.

The reference is an Apple keynote build, not a fashion carousel.

---

## 2. Colour

Taken verbatim from the official **NEOYO Color System** board.

| Name | Hex | Token | Role |
|---|---|---|---|
| Bone White | `#F2ECDE` | `--neoyo-bone-white` | **Primary.** Dominant surface — 80% of every page |
| Brownish Gold | `#A9824B` | `--neoyo-gold` | **Primary.** Logo, accents, hardware |
| Gold — Light | `#CBAE7C` | `--neoyo-gold-light` | Tonal. Highlights, hairlines, dark-ground text |
| Gold — Deep | `#8A6A3A` | `--neoyo-gold-deep` | Tonal. Pressed states, depth, focus ring |
| Bone — Shadow | `#E9E0CC` | `--neoyo-bone-shadow` | Tonal. Recessed surfaces |
| Espresso Brown | `#2B1B12` | `--neoyo-espresso` | **Secondary.** Dark ground and high-contrast text only |

### Never use the palette directly

Components consume **semantic tokens**, never raw palette values. This is what
makes the dark ground work with no component changes:

```css
background: var(--surface);        /* bone white  → espresso on dark  */
color:      var(--ink);            /* espresso    → bone white on dark */
color:      var(--ink-muted);      /* body copy                        */
color:      var(--ink-faint);      /* metadata, eyebrows, captions     */
border:     1px solid var(--line);
```

Flip any section to the espresso ground with a single attribute. Everything
inside inverts, including the gold:

```html
<section data-ground="dark"> … </section>
<section data-ground="light"> … </section>   <!-- force back inside a dark parent -->
```

### Gold splits in two

Brownish Gold reaches only **3.3:1** on bone white, and Gold — Deep only
**4.2:1**. Neither is legal for body copy.

- `--accent` / `--accent-deep` — **decorative only.** Fills, rules, borders,
  hardware, the focus ring, the sheen.
- `--accent-ink` — **any gold that is text.** Resolves to a deep bronze
  (`#6E5228`, 6.2:1) on bone and lifts to Gold — Light on espresso.

The same applies to the neutrals. `--neoyo-stone` (`#B8AE9C`) is decorative at
1.9:1; text uses `--neoyo-taupe` (4.6:1) or `--neoyo-taupe-deep` (6.1:1), which
the ink tokens point at.

---

## 3. Typography

**Display:** Cormorant Garamond — 300/400, roman and italic.
**Body:** Inter — 300/400/500.

Both are self-hosted at build time via `next/font/google`. There is no runtime
font request and no layout shift.

- The serif is never set below 300 and never in uppercase.
- The sans carries information; the serif carries feeling.
- Tracking widens as size shrinks (`--track-hairline` is `0.34em`) and tightens
  as size grows (`--track-monument` is `-0.045em`).

| Utility | Token | Range | Use |
|---|---|---|---|
| `.u-monument` | `--text-monument` | 64 → 256px | One per site. The footer mark. |
| `.u-hero` | `--text-hero` | 48 → 144px | Page titles |
| `.u-display` | `--text-display` | 36 → 72px | Section titles |
| `.u-title` | `--text-title` | 24 → 36px | Sub-heads |
| `.u-body-lg` | `--text-body-lg` | 16 → 19px | Ledes (serif) |
| `.u-body` | `--text-body` | 14 → 16px | Copy (sans) |
| `.u-label` | `--text-label` | 12 → 13px | Buttons, nav |
| `.u-hairline` | `--text-hairline` | 10 → 11px | Eyebrows, metadata |

Every size is a `clamp()` — the scale is continuous from 360px to 1600px, so
there is no step where type "jumps".

---

## 4. Space & layout

4px base, geometric growth. Prefer the larger step.

```
--space-3xs 4    --space-2xs 8    --space-xs 12   --space-sm 16
--space-md  24   --space-lg  40   --space-xl 64   --space-2xl 96
--space-3xl 144  --space-4xl 224
```

Fluid metrics:

| Token | Range | Meaning |
|---|---|---|
| `--gutter` | 20 → 72px | Page inset |
| `--section-gap` | 80 → 256px | Rhythm between sections |
| `--rail-width` | 48 → 96px | Fixed logo rail (desktop only) |
| `--measure` | 34ch | Reading width |
| `--page-max` | 96rem | Content ceiling |

Wrappers:

```html
<div class="u-page u-page--railed">   <!-- content that clears the logo rail -->
<section class="u-section">           <!-- standard vertical rhythm -->
```

### Breakpoints

| min-width | What changes |
|---|---|
| **48rem (768px)** ↓ | Below this the logo rail **lays down** into the top-left corner, and `--page--railed` drops the reserved rail width |
| 34rem | Collection grid goes two-column |
| 56rem | Editorial spreads split; journal entries split |
| 60rem | Product detail splits; purchase panel becomes sticky |
| 62rem | Checkout splits; order summary becomes sticky |
| 68rem | Twelve-column editorial grid engages |

### Two layout traps, already handled — do not reintroduce

1. **`min-width: auto` on grid/flex items.** A single non-wrapping child (a code
   block, a long token) sets the track's floor and stretches the page past the
   viewport. Every layout container in `base.css` opts out with
   `min-inline-size: 0`. Add new containers to that list.
2. **`100vw` for full-bleed.** `100vw` includes the scrollbar gutter and pushes
   the page 10–17px wider than the viewport on every desktop browser that
   reserves scrollbar space. `.bleed` is instead a **top-level flow child** — a
   sibling of `.u-page`, never inside it — at `inline-size: 100%`.

Related: full-bleed elements always reveal with `kind="fade"`. A scaling
entrance (`develop`) on a 100%-wide element sticks 2% past each edge until it
resolves, which is a horizontal scrollbar.

---

## 5. Motion

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 120ms | Colour and opacity only |
| `--dur-quick` | 260ms | Hover states, small controls |
| `--dur-calm` | 520ms | **The default.** Links, fields, cards |
| `--dur-slow` | 900ms | Menu items, veil lift |
| `--dur-cinema` | 1400ms | Scroll reveals, loader curtain |
| `--dur-epic` | 2200ms | Image pushes, drawn rules |
| `--ease-glide` | `cubic-bezier(.22,1,.36,1)` | **Default.** Everything that arrives |
| `--ease-veil` | `cubic-bezier(.65,0,.35,1)` | Symmetric wipes |
| `--ease-cinema` | `cubic-bezier(.4,0,.1,1)` | Slideshow crossfade, Ken Burns |
| `--ease-silk` | `cubic-bezier(.16,1,.3,1)` | Menu and large panels |
| `--stagger` | 70ms | Per-item delay in sequences |
| `--slide-hold` | 5000ms | Slideshow dwell |
| `--slide-fade` | 1800ms | Slideshow crossfade |

### Scroll reveal

```tsx
<Reveal kind="rise" index={2}>…</Reveal>
```

`kind`: `rise` · `rise-far` · `fade` · `drift-left` · `drift-right` · `develop` · `lift`
`index`: stagger position, multiplied by `--stagger`.

One `IntersectionObserver` per element, disconnected on release — elements never
re-hide, because a luxury page should not flicker when the visitor scrolls back
up.

Masked line lift, for large serif headlines:

```html
<span class="m-mask"><span class="m-mask__inner">Title</span></span>
```

### Page transitions

An espresso curtain is **already down** over the incoming page — painted in a
single frame with no transition — and then lifts from the top. The visitor never
sees a page assemble itself; they see a finished page revealed. Implemented in
`components/Veil.tsx` on `usePathname()` change. Removed entirely under reduced
motion.

### Cursor

A gold ring trailing a dot on a 0.16 lerp. It opens over links and opens further
over imagery, where it carries a one-word label:

```html
<div data-cursor-view="Closer">…</div>
```

Never mounted for coarse pointers or reduced motion — it is pure motion and there
is nothing to degrade to. The native cursor returns.

---

## 6. Imagery — the `Plate` contract

`<Plate/>` is the **only** imagery primitive in the system.

With no asset it renders warm museum light procedurally in CSS. Supply `src` or
`video` and the *same* key light and film grain composite over the real
photograph — so placeholder and photograph are lit identically, and there is
never a white flash while an image loads.

```tsx
<Plate tone="bone" ratio="4 / 5" />                          {/* placeholder */}
<Plate tone="bone" src="/img/coat-01.jpg" alt="…" />          {/* real still */}
<Plate tone="stone" video="/film/silk.mp4" motion="silk" />   {/* fabric     */}
<Plate tone="gold" light="none" />                            {/* macro      */}
```

### The six lighting registers

| `tone` | Art direction |
|---|---|
| `bone` | Ivory ground, high key. Garments, stills, packaging |
| `gold` | Metal and foil. Jewelry, hardware, close detail |
| `espresso` | Near-black warm brown. Night, leather, boxes |
| `stone` | Muted mid-tone. Fabric, texture, tailoring |
| `skin` | Beauty closeups, editorial portraits |
| `architecture` | Directional light shafts, hard edges. Atelier, city |

`motion`: `still` · `kenburns` · `kenburns-alt` · `silk`
`light`: `key` (default) · `none` (macro and product-on-white)

### Adding photography

The site runs on the real shoot everywhere except Accessories. To add more:

1. Drop the files in a folder and run
   `node scripts/ingest-media.cjs "C:/path/to/media"`. It writes responsive
   AVIF + WebP at three widths plus a blurred LQIP for each image, copies
   video through, and regenerates `lib/media.generated.ts`. Re-runnable —
   it skips derivatives that already exist.
2. Reference the slug:
   - a product → add it to `shots` in `lib/catalog.ts` (first entry is the hero)
   - the homepage film → add a slide to `lib/cinema.ts`
   - an editorial page → pass `slug` to `<Plate/>`
3. Keep the `tone` prop. It stays as the load-in colour behind the asset, so
   there is never a white flash.
4. Set `grade="studio"` for anything not shot in the house's own light.

**Never** hand-write a `/media/...` path. Everything goes through
`lib/media.ts`, which applies the deployment base path — a raw path 404s on
GitHub Pages, where the site is served from a sub-directory.

---

## 6b. The landing cinema

The homepage is a single-page film. `components/Cinema.tsx` plays the real
campaign photography full-bleed; slides alternate deliberately between
made to order and jewelry so the house reads as one world rather than two
catalogues.

### How it behaves

- **5s dwell, 1.9s cross-dissolve.** The dissolve is longer than a third of
  the dwell, so there is always a moment where both frames are present and
  both are still drifting. The motion never stops; it only changes subject.
  That continuity is the whole difference between a film and a carousel.
- **Only three slides are ever in the DOM** (previous, current, next). The
  next is mounted a full beat early at zero opacity so it is decoded and
  already moving before it is seen. Nothing pops in.
- **The caption follows the picture.** It updates 950ms after the slide
  index, because for the first second of a dissolve the *previous* frame is
  still the dominant image and naming the incoming one reads as a mislabel.
- **Portrait frames are shown whole**, letterboxed over a blurred, darkened
  bed of themselves, whenever the screen is landscape. On a fashion site the
  cut of the garment is the subject; cropping a dress in half to fill the
  frame defeats the point. Square and landscape frames fill edge to edge.
  Letterboxed frames also drift on a much gentler curve (3.5% rather than
  13%) so the push does not crop back into what the letterboxing preserved.

### Colour grading

Slides carry a `grade`:

- `campaign` (default) — shot in the house's own warm light, needs only the
  faintest unifying touch.
- `studio` — the stone bracelets, which arrived as supplier stills with
  bright white sweeps and saturated purples and teals. These are pulled back
  toward the earth family so the film reads as one shoot.

Set it per slide in `lib/cinema.ts`.

### Adding photography or film

Drop files into the source folder and run:

```bash
node scripts/ingest-media.cjs "C:/path/to/your/media"
```

The script produces responsive AVIF + WebP at three widths plus a blurred
LQIP data URI for every image, copies video through untouched, and rewrites
`lib/media.generated.ts`. It is re-runnable and skips derivatives that
already exist. Then add the new slug to `SLIDES` in `lib/cinema.ts` with its
`kind`, `label` and — for portrait photography — a `focus` point.

**Video** is supported by the same slide list: any `.mp4` / `.webm` / `.mov`
in the source folder becomes a `kind: "video"` asset and plays muted, looping
and inline in the slideshow. Keep clips short (≤ 8s) and export H.264 at a
sane bitrate; they are served as-is.

### Accessibility

The film auto-advances, so WCAG 2.2.2 requires a way to stop it. The
prev / pause / next controls at bottom right are 44 × 44px, carry real
accessible names, and the pause genuinely halts the timer. Under
`prefers-reduced-motion` the film holds on its opening frame with all drift
disabled — the controls still work, so the visitor drives it themselves.

---

## 6c. Deployment

The site is a **static export** — every route is prerendered, there are no API
routes, server actions or middleware — so it is flat files and can be served
from anywhere.

`.github/workflows/deploy.yml` builds on every push to `main` and publishes to
GitHub Pages using the built-in token. No credential is stored anywhere.

Two things are easy to get wrong:

1. **The base path.** GitHub Pages serves a project site from `/<repo>`. Next
   rewrites its own `<Link>` and `next/image` URLs but *not* hand-written
   strings, so `NEXT_PUBLIC_BASE_PATH` is threaded through `lib/media.ts` and
   every media URL is built there. Moving to a custom domain means setting it
   to an empty string.
2. **RSC payload paths.** Next 16's export writes a route's payload to
   `__next.core/__PAGE__.txt` while the client router prefetches
   `__next.core.__PAGE__.txt`. Every prefetch 404s and each client navigation
   silently degrades to a full document request.
   `scripts/flatten-rsc.mjs` runs as `postbuild` and writes the flat name the
   router asks for. If a future Next release fixes the path, the extra files
   simply go unrequested.

`out/.nojekyll` is required — without it GitHub's Jekyll pass strips `_next`
and the site loads unstyled.

---

## 6c. Bag, currency and orders

**The bag.** `components/Providers.tsx` holds it: an array of
`{slug, size, qty}`, persisted to `localStorage` under `neoyo:bag`.
Two lines are the same line only when both piece *and* size match, so one
dress in two sizes is two rows. Quantity is capped at nine — past that it
is a wholesale enquiry, not a bag.

The stored bag is read once on mount, and nothing is written back until
that read completes; writing earlier would wipe a returning visitor's bag
on first paint. The server always renders an empty bag, so there is no
hydration mismatch.

**Currency.** Every price in the catalogue is stored in Naira — the house
prices in Naira, so that is the single source of truth. `<Price ngn={…}/>`
converts at render.

| Region | Sees |
|---|---|
| Nigeria | Naira and US Dollars, switchable |
| Everywhere else | US Dollars only |

There is no switch outside Nigeria because the order settles in dollars —
a control that cannot change the outcome is worse than no control.

`NGN_PER_USD` in `lib/currency.ts` is **hard-coded and dated**. A static
export cannot call a rates API at build time without going stale anyway,
and a wrong rate on a luxury price list is worse than one somebody owns.
Update it when pricing changes.

Region detection reads the browser time zone (`Africa/Lagos`) with the
locale as a second opinion. It is a good default, not a legal-grade
determination — a static site has no request IP. On a host with edge
functions, read the country header and pass it in instead.

---

## 6d. Sizing and made-to-measure

`lib/sizing.ts` holds the house size chart, transcribed from the official
board. All measurements are in inches. The board prints "BURST" and
"UNDER BURST"; spelled correctly in the code, since clients read this.

Sizes run **6 – 20**. Garments (Core and Ease) use that run; jewelry keeps
its own lengths, and a bracelet is never made to measure — it is cut to a
length, not to a body.

**The chart** (`<SizeChart/>`) is collapsed by default. A product page is
photography, and a table of numbers is the least cinematic object in the
system. It opens as a real disclosure — a button owning `aria-expanded`
over a region genuinely removed from the page when shut. Seven columns of
inches will not fit a phone, so the table scrolls inside its own
container, which is keyboard-reachable. The visitor's current fit is
highlighted, so the chart answers a question in context.

**Custom orders.** The fit selector ends with a `Custom` chip. Choosing it
opens a measurement form built on the same six columns as the chart, so a
client reads the chart and fills in the identical figures. Adding to bag
without them is refused, with focus sent to the first missing field.

A custom line **never merges** with anything: two made-to-measure orders of
the same dress in the same nominal fit are different garments. That is why
every bag line carries a stable `id` rather than being addressed by piece
and size — without it a custom line could not be edited or removed at all.

The bag shows the figures back to the client, and checkout marks the line
"made to measure". Nothing is transmitted; the measurements travel with the
order once a payment provider is wired in.

---

## 6e. Navigation and collection lines

**The menu** is six items, set in initial caps rather than the wordmark's
uppercase: at that size the serif is the voice, and shouting it would
fight the film behind it. "VIP" stays an acronym — "Vip" reads as a
mistake, not a style.

Campaigns, Journal, About and Contact are no longer offered. Their routes
still build and still resolve, so nothing already linked or shared breaks.
Delete the directories under `app/` to remove them entirely.

**The trigger sits above the menu** (`--z-trigger: 75` against
`--z-menu: 70`). It has to: the trigger is also the close button, and a
panel that covers its own control cannot be dismissed by it. That was a
real bug — the menu opened and then refused to close.

**Lines.** A collection may be divided. Core holds two — Lumina and
Within Her — and `<CollectionLines/>` renders them as a real tab set:
`role="tablist"`, arrow-key navigation, one tab stop for the group. Each
panel mounts only while selected, so the reveals replay on switch and the
page never holds two collections of imagery at once.

Ease, Jewelry and Accessories define no lines, and that absence is what
makes their pages render a plain hero-and-grid. To divide a collection,
add `lines` to it in `lib/catalog.ts` and give each piece a `line`.

The split of Core is a starting arrangement — Lumina for the pieces that
catch the room, Within Her for the quieter half. Reassign by editing one
`line` field per product.

---

## 7. Components

All are documented live at `/styleguide`.

### Button — three ranks

```html
<button class="btn btn--primary">Add to bag</button>   <!-- one per page, max -->
<button class="btn btn--ghost">See it in Lagos</button>
<button class="btn btn--quiet">Read</button>
```

Modifiers: `--large` (60px) · `--wide` (100%) · `[disabled]`.

A page may hold **exactly one** primary button. The gold sheen crosses once on
hover — it is the only shine in the system.

### Card — the photograph is the card

No border, no shadow, no button. The image pushes in 4% on hover, the note fades
up, and the whole tile is a single tab stop via a stretched `::after` on
`.card__link`. Never nest another interactive element inside a card.

### Field — underline, never a box

One component covers input, select and textarea:

```tsx
<Field label="Email" name="email" type="email" required error={errors.email} />
<Field as="textarea" label="Message" name="message" rows={6} />
<Field as="select" label="Subject" name="subject" options={[…]} />
```

Labels are always real `<label for>`; hints and errors are wired through
`aria-describedby`; errors set `aria-invalid`. The elegance is in the CSS, not in
removing the semantics.

Validation is **deliberate, not eager** — nothing is marked wrong until submit,
and the first invalid field takes focus.

### Rotator360 — jewelry

```tsx
<Rotator360 form="ring" label="The Seal Ring" />
<Rotator360 frames={[...36 urls]} label="The Seal Ring" />
```

Drag, swipe or arrow keys; 36 frames at 10°. Without `frames` it renders the
piece procedurally and rotates the *lighting and foreshortening*, which is what
the eye actually reads as rotation. It is a slider for accessibility purposes —
arrow keys step, and the value is announced as a bearing. `touch-action: pan-y`
means vertical page scrolling is never captured.

---

## 8. Forms & checkout — wiring it up

There is no backend. Three places are marked `TODO(handoff)`:

| File | What to wire |
|---|---|
| `components/ContactForm.tsx` | Enquiry → `/api/enquiries` or a server action |
| `components/AppointmentForm.tsx` | Appointment request → CRM / calendar |
| `components/CheckoutForm.tsx` | Order → payment provider |

### Payment — read this before launch

The card fields in `CheckoutForm.tsx` are **inert markup for layout only**. They
are `aria-hidden`, non-interactive, and nothing is collected, stored or
transmitted. Replace that block with the provider's hosted element (Stripe
Payment Element, Paystack, or Flutterwave — Paystack is the natural default for a
Lagos house) before this page sees a real order. Card data must never reach
NEOYO's own servers.

The cart is currently `SAMPLE_ORDER` in `lib/catalog.ts`. Replace with real cart
state when a cart exists.

---

## 9. Accessibility — non-negotiable

Verified across all 16 routes at 375 / 768 / 1280px:

- **Contrast.** All body, metadata and gold text clears WCAG AA on both grounds.
  Ratios are recorded beside each token in `tokens.css`.
- **Motion.** `prefers-reduced-motion` stops the slideshow, ticker, Ken Burns,
  silk, veil and cursor, and forces every reveal to its final state. No content
  is motion-dependent — the ticker wraps into a static block rather than
  disappearing.
- **Focus.** A gold hairline ring, offset 4px, on every focusable element. Never
  removed. The skip link is the first tab stop on every page.
- **Menu.** A modal dialog: focus trapped, Escape closes, background `inert`,
  focus returned to the trigger, scroll locked.
- **Targets.** 44 × 44px minimum on the trigger, swatches and buttons.
- **Structure.** Exactly one `<h1>` per page; every image has `alt`; decorative
  imagery is `aria-hidden`.
- **Cursor.** Decorative; never mounted for coarse pointers or reduced motion.

### One known React quirk

`inert` is set imperatively in `Menu.tsx` rather than as a JSX prop. React 19
serialises a boolean `inert` to `inert=""` on the server and then warns about
that same empty string on hydration. Setting the property on the node sidesteps
the round trip. Behaviour is identical.

---

## 10. Performance

- All 16 routes are **statically prerendered**. No server work on request.
- Fonts self-hosted at build time — no runtime request, no layout shift.
- Zero runtime dependencies beyond React and Next. No animation library, no CSS
  framework, no icon package. Every effect is CSS or a few lines of rAF.
- Placeholder imagery is CSS gradients, so the site is fast *before* real
  photography and stays fast after, because `Plate` lazy-loads real assets.
- The slideshow composites only two layers at a time and pauses when the tab is
  hidden.
- `will-change` is set only on elements that actually animate.

---

## 11. Project structure

```
app/
  layout.tsx          root: fonts, metadata, Chrome, skip link
  page.tsx            landing — logo, tagline, film, ticker. Nothing else.
  globals.css         stylesheet entry (imports the six below)
  styles/
    tokens.css        ← source of truth. Colour, type, space, motion.
    base.css          reset, type utilities, layout utilities, reduced motion
    motion.css        reveals, keyframes, motion utilities
    components.css    plate, button, card, field, rule, ticker, tag, spec
    chrome.css        loader, cursor, rail, trigger, menu, veil, slideshow
    pages.css         page-level composition
  core/ ease/ jewelry/ accessories/     collections
  vip/ campaigns/ about/ journal/       editorial
  contact/ appointments/                forms
  product/[slug]/     product detail (SSG for all 16 pieces)
  checkout/           one-page checkout
  styleguide/         the live component library
  not-found.tsx       404
components/           Chrome, Menu, Cursor, Loader, Veil, Plate, Reveal,
                      Slideshow, Ticker, Rotator360, FabricFilm, Field,
                      Swatches, ProductCard, CollectionPage, PageHead,
                      Onward, Footer, and the three forms
lib/
  brand.ts            canon: name, tagline, voice, contact, palette
  nav.ts              the menu, in board order
  catalog.ts          collections + 16 products + price formatting
  plate.ts            the imagery contract (types + art direction)
  reviews.ts          the ticker's client voice
```

---

## 12. Voice

From the brand boards. Keep it.

> **Outstandingly Different.**
>
> *She doesn't seek attention. Attention follows her.*

Copy is short, quiet, and slightly private. Never marketing voice. A product note
is one line. A section lede is one sentence. If a paragraph needs a second
sentence, it probably needs neither.
