/**
 * One-off: point the remaining editorial pages at the real photography.
 * Kept in the repo as a record of which frame went where.
 */
import fs from "node:fs";

const edit = (file, pairs) => {
  let s = fs.readFileSync(file, "utf8");
  for (const [from, to] of pairs) {
    if (!s.includes(from)) throw new Error(`anchor missing in ${file}:\n${from.slice(0, 90)}`);
    s = s.replace(from, to);
  }
  fs.writeFileSync(file, s, "utf8");
  console.log("patched", file);
};

/* ------------------------------- JEWELRY ------------------------------- */
edit("app/jewelry/page.tsx", [
  [
    `          {(["gold", "espresso", "skin"] as const).map((tone, i) => (
            <Reveal key={tone} kind="develop" index={i}>
              <div data-cursor-view="Closer">
                <Plate
                  tone={tone}
                  ratio={i === 1 ? "3 / 4" : "1 / 1"}
                  motion={i === 0 ? "kenburns" : "still"}
                  light="none"
                />
              </div>
            </Reveal>
          ))}`,
    `          {MACRO.map((shot, i) => (
            <Reveal key={shot.slug} kind="develop" index={i}>
              <div data-cursor-view="Closer">
                <Plate
                  tone={shot.tone}
                  slug={shot.slug}
                  grade="studio"
                  alt={shot.alt}
                  ratio={i === 1 ? "3 / 4" : "1 / 1"}
                  light="none"
                />
              </div>
            </Reveal>
          ))}`,
  ],
  [
    `export default function Jewelry() {`,
    `/** The macro opening — three closeups at different distances. */
const MACRO = [
  { slug: "img-5660", tone: "gold" as const, alt: "The Crimson Drop, on crimson" },
  { slug: "img-5610", tone: "stone" as const, alt: "Citrine and moonstone on satin" },
  { slug: "img-5596", tone: "espresso" as const, alt: "Carved quartz blossom on driftwood" },
];

export default function Jewelry() {`,
  ],
  [`            <Rotator360 form="ring" label="The Seal Ring" />`,
   `            <Rotator360 form="earring" label="The Crimson Drop" />`],
  [`              <h2 className="u-display">The Seal Ring</h2>`,
   `              <h2 className="u-display">The Crimson Drop</h2>`],
  [
    `                Lost-wax cast in {BRAND.city}, then polished for two hours until the
                light stops catching and starts moving.`,
    `                Red agate, set by hand in {BRAND.city} against four white stones,
                then polished until the light stops catching and starts moving.`,
  ],
  [`            Macro, single hard key. Brass at 1:1.`,
   `            Macro, single hard key. Stone at 1:1.`],
]);

/* ------------------------------ CAMPAIGNS ------------------------------ */
edit("app/campaigns/page.tsx", [
  [
    `const CAMPAIGNS: {
  season: string;
  title: string;
  line: string;
  tone: PlateTone;
  frames: PlateTone[];
}[] = [`,
    `const CAMPAIGNS: {
  season: string;
  title: string;
  line: string;
  tone: PlateTone;
  /** Manifest key for the full-bleed opening frame. */
  hero: string;
  /** Three supporting frames, shown at different distances. */
  frames: { slug: string; tone: PlateTone; alt: string }[];
  grade?: "campaign" | "studio";
}[] = [`,
  ],
  [
    `  {
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
];`,
    `  {
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
];`,
  ],
  [
    `                <Plate
                  tone={campaign.tone}
                  motion={index % 2 === 0 ? "kenburns" : "kenburns-alt"}
                  fill
                />`,
    `                <Plate
                  tone={campaign.tone}
                  slug={campaign.hero}
                  grade={campaign.grade}
                  alt={\`\${campaign.title}, \${campaign.season}\`}
                  fill
                />`,
  ],
  [
    `                {campaign.frames.map((tone, i) => (
                  <Reveal key={\`\${campaign.season}-\${i}\`} kind="develop" index={i}>
                    <div className="m-push" data-cursor-view="Closer">
                      <Plate tone={tone} ratio={i === 1 ? "4 / 5" : "1 / 1"} />
                    </div>
                  </Reveal>
                ))}`,
    `                {campaign.frames.map((frame, i) => (
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
                ))}`,
  ],
]);

/* -------------------------------- ABOUT -------------------------------- */
edit("app/about/page.tsx", [
  [`          <Plate tone="architecture" motion="kenburns" fill />`,
   `          <Plate
            tone="skin"
            slug="1767531220127"
            alt="NEOYO, photographed in Lagos"
            fill
          />`],
  [
    `                  <Plate
                    tone={(["bone", "gold", "stone", "espresso"] as const)[i]}
                    ratio="5 / 4"
                  />`,
    `                  <Plate
                    tone={PRINCIPLE_SHOTS[i].tone}
                    slug={PRINCIPLE_SHOTS[i].slug}
                    grade={PRINCIPLE_SHOTS[i].grade}
                    alt={PRINCIPLE_SHOTS[i].alt}
                    ratio="5 / 4"
                  />`,
  ],
  [
    `export default function About() {`,
    `/** One frame per principle, in the order the principles are written. */
const PRINCIPLE_SHOTS = [
  { slug: "img-5714", tone: "bone" as const, alt: "The Rosette Lattice on the stand" },
  { slug: "img-5610", tone: "gold" as const, alt: "Citrine and moonstone", grade: "studio" as const },
  { slug: "1767551647754", tone: "stone" as const, alt: "Cut and finished in Lagos" },
  { slug: "img-5389", tone: "espresso" as const, alt: "Black, in afternoon light" },
];

export default function About() {`,
  ],
  [`              <Plate tone="skin" ratio="4 / 5" motion="kenburns-alt" />`,
   `              <Plate
                tone="skin"
                slug="1767531220079"
                alt="The atelier, four o&apos;clock"
                ratio="4 / 5"
              />`],
]);

/* ------------------------------- JOURNAL ------------------------------- */
edit("app/journal/page.tsx", [
  [`  tone: PlateTone;
}[] = [`, `  tone: PlateTone;
  shot: string;
  grade?: "campaign" | "studio";
}[] = [`],
  [`    tone: "stone",
  },`, `    tone: "stone",
    shot: "img-5713",
  },`],
  [`    tone: "gold",
  },`, `    tone: "gold",
    shot: "img-5573",
    grade: "studio",
  },`],
  [`    tone: "bone",
  },`, `    tone: "bone",
    shot: "img-5714",
  },`],
  [`    tone: "espresso",
  },`, `    tone: "espresso",
    shot: "img-5734",
  },`],
  [`    tone: "architecture",
  },`, `    tone: "architecture",
    shot: "1767531220079",
  },`],
  [`                  <Plate tone={entry.tone} ratio="4 / 3" />`,
   `                  <Plate
                    tone={entry.tone}
                    slug={entry.shot}
                    grade={entry.grade}
                    alt={entry.title}
                    ratio="4 / 3"
                  />`],
]);

/* --------------------------------- VIP --------------------------------- */
edit("app/vip/page.tsx", [
  [`          <Plate tone="espresso" motion="kenburns" fill />`,
   `          <Plate
            tone="espresso"
            slug="img-5389"
            alt="The private room, Lagos"
            fill
          />`],
  [`                  <Plate tone={offering.tone} ratio="5 / 4" />`,
   `                  <Plate
                    tone={offering.tone}
                    slug={offering.shot}
                    alt={offering.title}
                    ratio="5 / 4"
                  />`],
  [`    tone: "espresso" as const,
  },
  {
    title: "Made to Measure",`, `    tone: "espresso" as const,
    shot: "img-5708",
  },
  {
    title: "Made to Measure",`],
  [`    tone: "stone" as const,
  },
  {
    title: "The House Call",`, `    tone: "stone" as const,
    shot: "img-5713",
  },
  {
    title: "The House Call",`],
  [`    tone: "architecture" as const,
  },
  {
    title: "Archive Access",`, `    tone: "architecture" as const,
    shot: "kal03419",
  },
  {
    title: "Archive Access",`],
  [`    tone: "gold" as const,
  },
];`, `    tone: "gold" as const,
    shot: "img-5667",
  },
];`],
]);

/* ----------------------------- APPOINTMENTS ---------------------------- */
edit("app/appointments/page.tsx", [
  [`                <Plate tone="espresso" ratio="4 / 5" motion="kenburns" />`,
   `                <Plate
                  tone="espresso"
                  slug="img-5734"
                  alt="The private room, Lagos"
                  ratio="4 / 5"
                />`],
]);

console.log("\nall pages wired to real photography");
