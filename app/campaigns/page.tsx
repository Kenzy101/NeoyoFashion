import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Onward from "@/components/Onward";
import PageHead from "@/components/PageHead";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import type { PlateTone } from "@/lib/plate";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Campaigns",
  description: "Seasons on film. The NEOYO campaign archive.",
};

const CAMPAIGNS: {
  season: string;
  title: string;
  line: string;
  tone: PlateTone;
  /** Manifest key for the full-bleed opening frame. */
  hero: string;
  /** Three supporting frames, shown at different distances. */
  frames: { slug: string; tone: PlateTone; alt: string }[];
  grade?: "campaign" | "studio";
}[] = [
  {
    season: "SS 26",
    title: "Attention Follows Her",
    line: "She doesn't seek attention. Attention follows her.",
    tone: "skin",
    hero: "kal03419",
    frames: [
      { slug: "1767531220079", tone: "skin", alt: "Pearl, close" },
      { slug: "1767615547311", tone: "bone", alt: "Bouclé, off the shoulder" },
      { slug: "1767531220533", tone: "gold", alt: "Stacked at the wrist" },
    ],
  },
  {
    season: "AW 25",
    title: "On The Stand",
    line: "One seam. One shoulder. One decision.",
    tone: "architecture",
    hero: "img-5714",
    frames: [
      { slug: "img-5713", tone: "bone", alt: "The Tulle Drop Dress on the stand" },
      { slug: "img-5708", tone: "skin", alt: "The Ruffle Gown on the stand" },
      { slug: "img-5733", tone: "stone", alt: "The Turquoise Column on the stand" },
    ],
  },
  {
    season: "SS 25",
    title: "Four O'Clock",
    line: "The colour of the studio wall at four o'clock.",
    tone: "bone",
    hero: "1767551647754",
    frames: [
      { slug: "1767372347865-2", tone: "bone", alt: "Full length, white room" },
      { slug: "img-5387", tone: "skin", alt: "The Bouclé Off-Shoulder" },
      { slug: "img-5389", tone: "espresso", alt: "Black, in afternoon light" },
    ],
  },
  {
    season: "AW 24",
    title: "Cast In Lagos",
    line: "Stone, worked until the light behaves.",
    tone: "gold",
    hero: "img-5667",
    grade: "studio",
    frames: [
      { slug: "img-5587", tone: "espresso", alt: "Rutilated, mixed" },
      { slug: "img-5573", tone: "gold", alt: "The Citrine Double Strand" },
      { slug: "img-5658", tone: "skin", alt: "The Strawberry Quartz" },
    ],
  },
];

export default function Campaigns() {
  return (
    <>
      <PageHead
        eyebrow={`${BRAND.name} — Archive`}
        title="Campaigns"
        lede="Four seasons, shot in Lagos. Each one is a single idea, held for as long as it takes."
      />

      <div className="editorial">
        {CAMPAIGNS.map((campaign, index) => (
          <section key={campaign.season} aria-label={`${campaign.season} — ${campaign.title}`}>
            {/* The campaign's hero frame, full-bleed with the season's line.
                `fade`, not `develop` — see CollectionPage. */}
            <Reveal kind="fade">
              <div className="bleed" data-cursor-view="Look">
                <Plate
                  tone={campaign.tone}
                  slug={campaign.hero}
                  grade={campaign.grade}
                  alt={`${campaign.title}, ${campaign.season}`}
                  fill
                />
                <div className="bleed__quote">
                  <p className="u-voice">{campaign.line}</p>
                </div>
              </div>
            </Reveal>

            <div className="u-page u-page--railed" style={{ paddingBlockStart: "var(--space-lg)" }}>
              <Reveal kind="fade">
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: "var(--space-md)",
                    alignItems: "baseline",
                    paddingBlockEnd: "var(--space-xl)",
                  }}
                >
                  <h2 className="u-display">{campaign.title}</h2>
                  <span className="u-hairline">{campaign.season}</span>
                </div>
              </Reveal>

              {/* Three supporting frames at different distances */}
              <div
                style={{
                  display: "grid",
                  gap: "var(--space-sm)",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))",
                }}
              >
                {campaign.frames.map((frame, i) => (
                  <Reveal key={frame.slug} kind="develop" index={i}>
                    <div className="m-push" data-cursor-view="Closer">
                      <Plate
                        tone={frame.tone}
                        slug={frame.slug}
                        grade={campaign.grade}
                        alt={frame.alt}
                        ratio={i === 1 ? "4 / 5" : "1 / 1"}
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <div style={{ height: "var(--section-gap)" }} />

      <Onward current="/campaigns" />
      <Footer />
    </>
  );
}
