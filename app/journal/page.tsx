import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Onward from "@/components/Onward";
import PageHead from "@/components/PageHead";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import type { PlateTone } from "@/lib/plate";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from the atelier.",
};

const ENTRIES: {
  date: string;
  kind: string;
  title: string;
  excerpt: string;
  tone: PlateTone;
  shot: string;
  grade?: "campaign" | "studio";
}[] = [
  {
    date: "12.06.26",
    kind: "Atelier",
    title: "Eleven days for one dress",
    excerpt:
      "The Rosette Lattice takes eleven days, and nine of them are spent tying forty-one knots nobody will ever count.",
    tone: "stone",
    shot: "img-5713",
  },
  {
    date: "28.05.26",
    kind: "Material",
    title: "Why the stone is never dyed",
    excerpt:
      "Dye makes every bead agree with the next one. We would rather they argued.",
    tone: "gold",
    shot: "img-5573",
    grade: "studio",
  },
  {
    date: "04.05.26",
    kind: "Colour",
    title: "Eighty percent bone white",
    excerpt:
      "A restricted palette is not a limitation. It is a way of removing every excuse.",
    tone: "bone",
    shot: "img-5714",
  },
  {
    date: "19.04.26",
    kind: "Packaging",
    title: "The wax seal, and what it is for",
    excerpt:
      "It is not a closure. It is the last moment before a piece stops being ours and starts being yours.",
    tone: "espresso",
    shot: "img-5734",
  },
  {
    date: "02.04.26",
    kind: "Light",
    title: "Four o'clock",
    excerpt:
      "Every fitting in this house happens in the afternoon. The reason is not romantic; it is that the light stops lying.",
    tone: "architecture",
    shot: "1767531220079",
  },
];

export default function Journal() {
  return (
    <>
      <PageHead
        eyebrow={`${BRAND.name} — Notes from the atelier`}
        title="Journal"
        lede="Occasional writing on material, colour, light, and the slow parts of making something properly."
      />

      <section className="u-page u-page--railed" aria-label="Entries">
        <div className="journal">
          {ENTRIES.map((entry, i) => (
            <Reveal key={entry.title} kind="rise" index={i % 3}>
              <article className={`entry ${i % 2 === 1 ? "spread--flip" : ""}`}>
                <div className="m-push" data-cursor-view="Read">
                  <Plate
                    tone={entry.tone}
                    slug={entry.shot}
                    grade={entry.grade}
                    alt={entry.title}
                    ratio="4 / 3"
                  />
                </div>

                <div className="entry__body">
                  <div style={{ display: "flex", gap: "var(--space-md)" }}>
                    <span className="u-hairline">{entry.date}</span>
                    <span className="u-hairline">{entry.kind}</span>
                  </div>
                  <h2 className="entry__title">{entry.title}</h2>
                  <p className="u-body">{entry.excerpt}</p>
                  <span className="btn btn--quiet" style={{ justifySelf: "start" }}>
                    Read
                    <span className="btn__arrow" aria-hidden="true">
                      &#8594;
                    </span>
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <div style={{ height: "var(--section-gap)" }} />

      <Onward current="/journal" />
      <Footer />
    </>
  );
}
