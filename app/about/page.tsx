import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Onward from "@/components/Onward";
import PageHead from "@/components/PageHead";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description: `${BRAND.name}. A house built in ${BRAND.city}.`,
};

const PRINCIPLES = [
  {
    heading: "Cut once",
    body: "A pattern is corrected until it is right, then it is kept. Pieces return to the collection in the same shape they left it.",
  },
  {
    heading: "Bone and gold",
    body: "Bone white carries eighty percent of everything the house makes. Gold appears only where something must be held, fastened, or signed.",
  },
  {
    heading: "Made where we are",
    body: `Cut, cast, stitched and finished in ${BRAND.city}. Nothing is sent away to be made cheaply and returned expensive.`,
  },
  {
    heading: "Quiet",
    body: "No logo across the chest. No season that expires. The monogram is struck once, in foil, on the inside.",
  },
];

/** One frame per principle, in the order the principles are written. */
const PRINCIPLE_SHOTS = [
  { slug: "img-5714", tone: "bone" as const, alt: "The Rosette Lattice on the stand" },
  { slug: "img-5610", tone: "gold" as const, alt: "Citrine and moonstone", grade: "studio" as const },
  { slug: "1767551647754", tone: "stone" as const, alt: "Cut and finished in Lagos" },
  { slug: "img-5389", tone: "espresso" as const, alt: "Black, in afternoon light" },
];

export default function About() {
  return (
    <>
      <PageHead
        eyebrow={`${BRAND.name} — ${BRAND.atelier}`}
        title="Outstandingly Different."
        lede="A house built on the idea that the most memorable thing in a room is rarely the loudest."
      />

      {/* Full-bleed wrappers reveal with `fade`, never a scaling entrance. */}
      <Reveal kind="fade">
        <div className="bleed" data-cursor-view="Look">
          <Plate
            tone="skin"
            slug="1767531220127"
            alt="NEOYO, photographed in Lagos"
            fill
          />
          <div className="bleed__quote">
            <p className="u-voice">{BRAND.voice}</p>
          </div>
        </div>
      </Reveal>

      <section className="u-page u-page--railed u-section" aria-label="The house">
        <div className="spread spread--column">
          <div className="spread__text" style={{ gap: "var(--space-lg)" }}>
            <Reveal kind="rise">
              <p className="u-body-lg">
                {BRAND.name} was founded in {BRAND.city} by {BRAND.founder}, on a
                simple and slightly stubborn premise: that clothing should be made
                properly, once, and then left alone.
              </p>
            </Reveal>
            <Reveal kind="rise" index={1}>
              <p className="u-body" style={{ maxWidth: "var(--measure-wide)" }}>
                The house works in a single family of colour — bone white, brownish
                gold, espresso — because a restricted palette forces every other
                decision to be better. Fabric, weight, drape, hardware and finish
                have nowhere to hide.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The four principles, alternating against imagery */}
      <section className="u-page u-page--railed" aria-label="Principles">
        <div className="editorial">
          {PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.heading} kind="rise">
              <div className={`spread ${i % 2 === 1 ? "spread--flip" : ""}`}>
                <div className="spread__media m-push" data-cursor-view="Look">
                  <Plate
                    tone={PRINCIPLE_SHOTS[i].tone}
                    slug={PRINCIPLE_SHOTS[i].slug}
                    grade={PRINCIPLE_SHOTS[i].grade}
                    alt={PRINCIPLE_SHOTS[i].alt}
                    ratio="5 / 4"
                  />
                </div>
                <div className="spread__text">
                  <span className="u-hairline">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="u-title">{principle.heading}</h2>
                  <p className="u-body">{principle.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The founder */}
      <section className="u-page u-page--railed u-section" aria-label="Founder">
        <Reveal kind="rise">
          <div className="spread">
            <div className="spread__media" data-cursor-view="Look">
              <Plate
                tone="skin"
                slug="1767531220079"
                alt="The atelier, four in the afternoon"
                ratio="4 / 5"
              />
            </div>
            <div className="spread__text">
              <span className="u-hairline">{BRAND.founderTitle}</span>
              <h2 className="u-display">{BRAND.founder}</h2>
              <p className="u-body">
                Works from a room with one window, facing west. Most decisions are
                made at four o&apos;clock, when the light is worth waiting for.
              </p>
              <a className="u-label m-underline" href={`mailto:${BRAND.email}`}>
                {BRAND.email}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <Onward current="/about" />
      <Footer />
    </>
  );
}
