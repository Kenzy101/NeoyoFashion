import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Onward from "@/components/Onward";
import PageHead from "@/components/PageHead";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "VIP Experience",
  description:
    "The private room. By appointment, in Lagos or wherever you happen to be.",
};

const OFFERINGS = [
  {
    title: "The Private Room",
    body: "Two hours, the collection pulled in your size before you arrive, and no one else in the building.",
    tone: "espresso" as const,
    shot: "img-5708",
  },
  {
    title: "Made to Measure",
    body: "Four fittings across six weeks. Your pattern is kept, and every piece after the first is cut from it.",
    tone: "stone" as const,
    shot: "img-5713",
  },
  {
    title: "The House Call",
    body: "We travel. Lagos, Abuja, London, Accra, New York. The rail arrives; the room becomes the atelier.",
    tone: "architecture" as const,
    shot: "kal03419",
  },
  {
    title: "Archive Access",
    body: "Pieces held back from release, offered first to clients who have been with the house longest.",
    tone: "gold" as const,
    shot: "img-5667",
  },
];

export default function VIP() {
  return (
    <>
      <PageHead
        eyebrow={`${BRAND.name} — By appointment`}
        title="VIP Experience"
        lede="Some things are not sold. They are offered, in a quiet room, by someone who knows what you already own."
      />

      {/* Full-bleed wrappers reveal with `fade`, never a scaling entrance. */}
      <Reveal kind="fade">
        <div className="bleed" data-cursor-view="Enter">
          <Plate
            tone="espresso"
            slug="img-5389"
            alt="The private room, Lagos"
            fill
          />
          <div className="bleed__quote">
            <p className="u-voice">One client. One afternoon. One rail.</p>
          </div>
        </div>
      </Reveal>

      <section className="u-page u-page--railed u-section" aria-label="What is offered">
        <div className="editorial">
          {OFFERINGS.map((offering, i) => (
            <Reveal key={offering.title} kind="rise">
              <div className={`spread ${i % 2 === 1 ? "spread--flip" : ""}`}>
                <div className="spread__media m-push" data-cursor-view="Look">
                  <Plate
                    tone={offering.tone}
                    slug={offering.shot}
                    alt={offering.title}
                    ratio="5 / 4"
                  />
                </div>
                <div className="spread__text">
                  <span className="u-hairline">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="u-title">{offering.title}</h2>
                  <p className="u-body">{offering.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal kind="rise">
        <section
          className="u-page u-page--railed"
          style={{ paddingBlockEnd: "var(--section-gap)", display: "grid", gap: "var(--space-lg)", justifyItems: "start" }}
          aria-label="Reserve"
        >
          <p className="u-body-lg">
            The room is offered to a small number of clients each season. There is no
            list to join — there is a conversation to begin.
          </p>
          <Link href="/appointments" className="btn btn--primary btn--large">
            Request the room
            <span className="btn__arrow" aria-hidden="true">
              &#8594;
            </span>
          </Link>
        </section>
      </Reveal>

      <Onward current="/vip" />
      <Footer />
    </>
  );
}
