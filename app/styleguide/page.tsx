import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PageHead from "@/components/PageHead";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import Rotator360 from "@/components/Rotator360";
import Swatches from "@/components/Swatches";
import Ticker from "@/components/Ticker";
import { BRAND, PALETTE } from "@/lib/brand";
import type { PlateTone } from "@/lib/plate";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "NEOYO component library, design tokens and developer handoff.",
  robots: { index: false, follow: false },
};

const TONES: PlateTone[] = ["bone", "gold", "espresso", "stone", "skin", "architecture"];

const TYPE_SCALE = [
  { name: "Monument", cls: "u-monument", token: "--text-monument", note: "64 → 256px. One per site." },
  { name: "Hero", cls: "u-hero", token: "--text-hero", note: "48 → 144px. Page titles." },
  { name: "Display", cls: "u-display", token: "--text-display", note: "36 → 72px. Section titles." },
  { name: "Title", cls: "u-title", token: "--text-title", note: "24 → 36px. Sub-heads." },
  { name: "Body large", cls: "u-body-lg", token: "--text-body-lg", note: "16 → 19px serif. Ledes." },
  { name: "Body", cls: "u-body", token: "--text-body", note: "14 → 16px sans. Copy." },
  { name: "Label", cls: "u-label", token: "--text-label", note: "12 → 13px. Buttons, nav." },
  { name: "Hairline", cls: "u-hairline", token: "--text-hairline", note: "10 → 11px. Eyebrows, meta." },
];

const MOTION = [
  { token: "--dur-instant", value: "120ms", use: "Colour and opacity only." },
  { token: "--dur-quick", value: "260ms", use: "Hover states, small controls." },
  { token: "--dur-calm", value: "520ms", use: "The default. Links, fields, cards." },
  { token: "--dur-slow", value: "900ms", use: "Menu items, veil lift." },
  { token: "--dur-cinema", value: "1400ms", use: "Scroll reveals, loader curtain." },
  { token: "--dur-epic", value: "2200ms", use: "Image pushes, drawn rules." },
  { token: "--ease-glide", value: "cubic-bezier(.22,1,.36,1)", use: "Default. Everything that arrives." },
  { token: "--ease-veil", value: "cubic-bezier(.65,0,.35,1)", use: "Symmetric wipes." },
  { token: "--ease-cinema", value: "cubic-bezier(.4,0,.1,1)", use: "Cinema crossfade, Ken Burns." },
  { token: "--ease-silk", value: "cubic-bezier(.16,1,.3,1)", use: "Menu and large panels." },
];

/**
 * The handoff surface.
 *
 * Everything a developer needs to build a new page without inventing
 * anything: the palette with its tokens, the type scale, the motion
 * table, every component in every state, and the imagery contract.
 */
export default function Styleguide() {
  return (
    <>
      <PageHead
        eyebrow={`${BRAND.name} — Developer handoff`}
        title="Styleguide"
        lede="The component library, design tokens and rules. If something is not here, it does not exist yet — add it here first."
      />

      <div className="u-page u-page--railed guide">
        {/* ---------------------------- COLOUR ---------------------------- */}
        <Reveal kind="rise" as="section" className="guide__section">
          <div>
            <p className="eyebrow">01 — Colour</p>
            <h2 className="u-title" style={{ marginTop: "var(--space-sm)" }}>
              Official colour system
            </h2>
            <p className="u-body" style={{ marginTop: "var(--space-sm)" }}>
              Bone White is the dominant surface (80%). Brownish Gold carries the
              logo, type accents and hardware. Espresso Brown anchors dark-mode
              moments and high-contrast text only. Nothing outside this family.
            </p>
          </div>

          <div className="swatches-grid">
            {PALETTE.map((colour) => (
              <div className="swatch-chip" key={colour.hex}>
                <div className="swatch-chip__well" style={{ background: colour.hex }} />
                <span className="swatch-chip__name">{colour.name}</span>
                <span className="swatch-chip__hex">{colour.hex}</span>
                <span className="u-caption">{colour.role}</span>
                <code className="swatch-chip__hex">{colour.token}</code>
              </div>
            ))}
          </div>

          <code className="guide__code">{`/* Consume semantic tokens, never raw palette values. */
background: var(--surface);        /* bone white  → espresso in dark   */
color:      var(--ink);            /* espresso    → bone white in dark */
color:      var(--ink-muted);      /* body copy, AA on both grounds    */
border:     1px solid var(--line);
accent:     var(--accent);         /* gold, lifted automatically in dark */

/* Flip any section to the espresso ground: */
<section data-ground="dark"> … </section>`}</code>
        </Reveal>

        {/* -------------------------- TYPOGRAPHY -------------------------- */}
        <Reveal kind="rise" as="section" className="guide__section">
          <div>
            <p className="eyebrow">02 — Typography</p>
            <h2 className="u-title" style={{ marginTop: "var(--space-sm)" }}>
              Cormorant Garamond · Inter
            </h2>
            <p className="u-body" style={{ marginTop: "var(--space-sm)" }}>
              Large elegant serif for anything that carries feeling; a quiet sans
              for anything that carries information. The serif is never set below
              300 weight, and never in uppercase.
            </p>
          </div>

          <div style={{ display: "grid", gap: "var(--space-lg)" }}>
            {TYPE_SCALE.map((step) => (
              <div key={step.name} style={{ display: "grid", gap: "var(--space-2xs)" }}>
                <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap" }}>
                  <span className="u-hairline">{step.name}</span>
                  <code className="swatch-chip__hex">{step.token}</code>
                  <span className="u-caption">{step.note}</span>
                </div>
                <p className={step.cls} style={{ maxWidth: "100%" }}>
                  Outstandingly Different.
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* --------------------------- BUTTONS ---------------------------- */}
        <Reveal kind="rise" as="section" className="guide__section">
          <div>
            <p className="eyebrow">03 — Buttons</p>
            <h2 className="u-title" style={{ marginTop: "var(--space-sm)" }}>
              Three ranks, one filled
            </h2>
            <p className="u-body" style={{ marginTop: "var(--space-sm)" }}>
              A page may hold exactly one primary button. Everything else is ghost
              or quiet. The gold sheen crosses once on hover — it is the only
              shine in the system.
            </p>
          </div>

          <div className="guide__row">
            <button className="btn btn--primary">
              Add to bag
              <span className="btn__arrow" aria-hidden="true">&#8594;</span>
            </button>
            <button className="btn btn--ghost">See it in Lagos</button>
            <button className="btn btn--quiet">
              Read
              <span className="btn__arrow" aria-hidden="true">&#8594;</span>
            </button>
            <button className="btn btn--primary" disabled>
              Sold out
            </button>
          </div>

          <div className="guide__row">
            <button className="btn btn--primary btn--large">Large primary</button>
          </div>

          <code className="guide__code">{`<button class="btn btn--primary">Add to bag</button>
<button class="btn btn--ghost">See it in Lagos</button>
<button class="btn btn--quiet">Read</button>

Modifiers: --large (60px tall) · --wide (100%) · [disabled]`}</code>
        </Reveal>

        {/* ---------------------------- FORMS ----------------------------- */}
        <Reveal kind="rise" as="section" className="guide__section">
          <div>
            <p className="eyebrow">04 — Forms</p>
            <h2 className="u-title" style={{ marginTop: "var(--space-sm)" }}>
              Underline, never a box
            </h2>
            <p className="u-body" style={{ marginTop: "var(--space-sm)" }}>
              One component — <code>&lt;Field/&gt;</code> — covers input, select
              and textarea. Labels are always real <code>&lt;label for&gt;</code>,
              hints and errors are wired through <code>aria-describedby</code>,
              and errors set <code>aria-invalid</code>.
            </p>
          </div>

          <div style={{ display: "grid", gap: "var(--space-md)", maxWidth: "34rem" }}>
            <FieldDemo />
          </div>

          <div style={{ maxWidth: "20rem" }}>
            <Swatches options={["XS", "S", "M", "L", "XL"]} label="Fit" />
          </div>
        </Reveal>

        {/* ---------------------------- CARDS ----------------------------- */}
        <Reveal kind="rise" as="section" className="guide__section">
          <div>
            <p className="eyebrow">05 — Cards</p>
            <h2 className="u-title" style={{ marginTop: "var(--space-sm)" }}>
              The photograph is the card
            </h2>
            <p className="u-body" style={{ marginTop: "var(--space-sm)" }}>
              No border, no shadow, no button. The image pushes in 4% on hover,
              the note fades up, and the whole tile is a single tab stop.
            </p>
          </div>

          <div className="grid grid--even">
            <div className="card">
              <div className="card__frame" data-cursor-view="View">
                <Plate tone="bone" ratio="4 / 5" />
              </div>
              <div className="card__body">
                <a href="#cards" className="card__link">
                  <span className="card__name">The Monolith Coat</span>
                </a>
                <span className="card__meta card__reveal">
                  One seam down the back.
                </span>
                <span className="card__price">₦890,000</span>
              </div>
            </div>

            <div className="card">
              <div className="card__frame" data-cursor-view="View">
                <Plate tone="gold" ratio="4 / 5" light="none" />
              </div>
              <div className="card__body">
                <a href="#cards" className="card__link">
                  <span className="card__name">The Seal Ring</span>
                </a>
                <span className="card__meta card__reveal">The house mark.</span>
                <span className="card__price">₦210,000</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* --------------------------- IMAGERY ---------------------------- */}
        <Reveal kind="rise" as="section" className="guide__section">
          <div>
            <p className="eyebrow">06 — Imagery</p>
            <h2 className="u-title" style={{ marginTop: "var(--space-sm)" }}>
              Six lighting registers
            </h2>
            <p className="u-body" style={{ marginTop: "var(--space-sm)" }}>
              <code>&lt;Plate/&gt;</code> is the only imagery primitive. Until real
              photography lands it renders warm museum light procedurally; supply{" "}
              <code>src</code> or <code>video</code> and the same key light and
              film grain composite over the real asset, so placeholder and
              photograph are lit identically.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: "var(--space-md)",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 11rem), 1fr))",
            }}
          >
            {TONES.map((tone) => (
              <div key={tone} style={{ display: "grid", gap: "var(--space-2xs)" }}>
                <Plate tone={tone} ratio="1 / 1" />
                <span className="u-hairline">{tone}</span>
              </div>
            ))}
          </div>

          <code className="guide__code">{`<Plate tone="bone" ratio="4 / 5" />                       {/* placeholder */}
<Plate tone="bone" src="/img/coat-01.jpg" alt="…" />       {/* real still */}
<Plate tone="stone" video="/film/silk.mp4" motion="silk" /> {/* fabric   */}
<Plate tone="gold" light="none" />                          {/* macro    */}

motion: still | kenburns | kenburns-alt | silk
light:  key (default) | none`}</code>
        </Reveal>

        {/* ---------------------------- MOTION ---------------------------- */}
        <Reveal kind="rise" as="section" className="guide__section">
          <div>
            <p className="eyebrow">07 — Motion</p>
            <h2 className="u-title" style={{ marginTop: "var(--space-sm)" }}>
              Nothing snaps. Nothing bounces.
            </h2>
            <p className="u-body" style={{ marginTop: "var(--space-sm)" }}>
              Every transition uses a token from this table. Deep ease-outs, long
              durations, generous stagger. All of it collapses under{" "}
              <code>prefers-reduced-motion</code>.
            </p>
          </div>

          <dl className="spec">
            {MOTION.map((row) => (
              <div className="spec__row" key={row.token}>
                <dt className="spec__key">{row.token}</dt>
                <dd className="spec__value">
                  <strong style={{ fontWeight: 500, color: "var(--ink)" }}>{row.value}</strong>
                  {" — "}
                  {row.use}
                </dd>
              </div>
            ))}
          </dl>

          <code className="guide__code">{`<Reveal kind="rise" index={2}>…</Reveal>

kind: rise | rise-far | fade | drift-left | drift-right | develop | lift
index: stagger position, multiplied by --stagger (70ms)

Masked line lift:
<span class="m-mask"><span class="m-mask__inner">Title</span></span>`}</code>
        </Reveal>

        {/* --------------------------- 360 + TICKER ------------------------ */}
        <Reveal kind="rise" as="section" className="guide__section">
          <div>
            <p className="eyebrow">08 — Specialist components</p>
            <h2 className="u-title" style={{ marginTop: "var(--space-sm)" }}>
              360° viewer · review ticker
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gap: "var(--space-lg)",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
            }}
          >
            <div style={{ display: "grid", gap: "var(--space-2xs)" }}>
              <Rotator360 form="ring" label="Demo ring" />
              <span className="u-caption">
                Drag, swipe or arrow keys. 36 frames, 10° apart.
              </span>
            </div>
            <div style={{ display: "grid", gap: "var(--space-2xs)" }}>
              <Rotator360 form="cuff" label="Demo cuff" />
              <span className="u-caption">
                Supply <code>frames</code> to play a real turntable capture.
              </span>
            </div>
          </div>

          <div style={{ paddingBlock: "var(--space-md)", borderBlock: "1px solid var(--line-soft)" }}>
            <Ticker duration={50} />
          </div>
        </Reveal>

        {/* -------------------------- SPACE / GRID ------------------------- */}
        <Reveal kind="rise" as="section" className="guide__section">
          <div>
            <p className="eyebrow">09 — Space &amp; layout</p>
            <h2 className="u-title" style={{ marginTop: "var(--space-sm)" }}>
              Whitespace is the structure
            </h2>
          </div>

          <code className="guide__code">{`Space scale (4px base, geometric):
--space-3xs 4   --space-2xs 8   --space-xs 12  --space-sm 16
--space-md  24  --space-lg  40  --space-xl 64  --space-2xl 96
--space-3xl 144 --space-4xl 224

Fluid:
--gutter       20 → 72px    page inset
--section-gap  80 → 256px   rhythm between sections
--rail-width   48 → 96px    fixed logo rail (desktop)
--measure      34ch         reading width
--page-max     96rem        content ceiling

Wrappers:
<div class="u-page u-page--railed">   content that clears the logo rail
<section class="u-section">           standard vertical rhythm

Breakpoints (min-width, rem):
34   two-column grid          56   spreads split
60   product detail splits    62   checkout splits
68   twelve-column editorial grid
48   ↓ below this the logo rail lays down into the top-left corner`}</code>
        </Reveal>

        {/* -------------------------- ACCESSIBILITY ----------------------- */}
        <Reveal kind="rise" as="section" className="guide__section">
          <div>
            <p className="eyebrow">10 — Accessibility</p>
            <h2 className="u-title" style={{ marginTop: "var(--space-sm)" }}>
              Non-negotiable
            </h2>
          </div>

          <dl className="spec">
            <div className="spec__row">
              <dt className="spec__key">Contrast</dt>
              <dd className="spec__value">
                Body copy uses <code>--ink-muted</code>, which clears AA on both
                bone and espresso. Gold is lifted to <code>--neoyo-gold-light</code>{" "}
                automatically on the dark ground. Gold is never used for body copy
                on bone.
              </dd>
            </div>
            <div className="spec__row">
              <dt className="spec__key">Motion</dt>
              <dd className="spec__value">
                <code>prefers-reduced-motion</code> stops the slideshow, ticker,
                Ken Burns, silk, veil and cursor, and forces every reveal to its
                final state. No content is motion-dependent.
              </dd>
            </div>
            <div className="spec__row">
              <dt className="spec__key">Focus</dt>
              <dd className="spec__value">
                A gold hairline ring, offset 4px, on every focusable element. Never
                removed. Skip link is the first tab stop on every page.
              </dd>
            </div>
            <div className="spec__row">
              <dt className="spec__key">Menu</dt>
              <dd className="spec__value">
                Modal dialog: focus trapped, Escape closes, background{" "}
                <code>inert</code>, focus returned to the trigger.
              </dd>
            </div>
            <div className="spec__row">
              <dt className="spec__key">Targets</dt>
              <dd className="spec__value">
                44 × 44px minimum on the menu trigger, swatches and all buttons.
              </dd>
            </div>
            <div className="spec__row">
              <dt className="spec__key">Cursor</dt>
              <dd className="spec__value">
                The custom cursor is decorative and never mounted for coarse
                pointers or reduced motion — the native cursor returns.
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>

      <Footer />
    </>
  );
}

/* Field is a client component; this wrapper keeps the demo self-contained. */
function FieldDemo() {
  return (
    <>
      <div className="field">
        <label className="field__label" htmlFor="guide-name">
          Full name
        </label>
        <div className="field__control">
          <input className="field__input" id="guide-name" placeholder="Kami" />
        </div>
        <span className="field__hint">Rest state.</span>
      </div>

      <div className="field" data-invalid="true">
        <label className="field__label" htmlFor="guide-email">
          Email
        </label>
        <div className="field__control">
          <input
            className="field__input"
            id="guide-email"
            defaultValue="kami@"
            aria-invalid="true"
            aria-describedby="guide-email-error"
          />
        </div>
        <span className="field__error" id="guide-email-error">
          That address looks incomplete.
        </span>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="guide-select">
          Subject
        </label>
        <div className="field__control">
          <select className="field__select" id="guide-select" defaultValue="sizing">
            <option value="order">An order</option>
            <option value="sizing">Sizing and fit</option>
            <option value="care">Care and repair</option>
          </select>
        </div>
      </div>

      <label className="choice">
        <input className="choice__input" type="checkbox" defaultChecked />
        <span className="choice__box" aria-hidden="true" />
        <span className="choice__label">
          This is a gift. Omit the price, add the wax seal.
        </span>
      </label>
    </>
  );
}
