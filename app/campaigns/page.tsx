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
  frames: PlateTone[];
}[] = [
  {
    season: "SS 26",
    title: "Attention Follows Her",
    line: "She doesn't seek attention. Attention follows her.",
    tone: "skin",
    frames: ["skin", "bone", "gold"],
  },
  {
    season: "AW 25",
    title: "The Monolith",
    line: "One seam. One shoulder. One decision.",
    tone: "architecture",
    frames: ["architecture", "stone", "espresso"],
  },
  {
    season: "SS 25",
    title: "Four O'Clock",
    line: "The colour of the studio wall at four o'clock.",
    tone: "bone",
    frames: ["bone", "skin", "stone"],
  },
  {
    season: "AW 24",
    title: "Cast In Lagos",
    line: "Brass, worked until the light behaves.",
    tone: "gold",
    frames: ["gold", "espresso", "gold"],
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
                  motion={index % 2 === 0 ? "kenburns" : "kenburns-alt"}
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
                {campaign.frames.map((tone, i) => (
                  <Reveal key={`${campaign.season}-${i}`} kind="develop" index={i}>
                    <div className="m-push" data-cursor-view="Closer">
                      <Plate tone={tone} ratio={i === 1 ? "4 / 5" : "1 / 1"} />
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
