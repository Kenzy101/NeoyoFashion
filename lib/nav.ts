import type { PlateTone } from "./plate";

export type NavItem = {
  label: string;
  href: string;
  /** Tone of the cinematic preview raised behind the menu on hover. */
  tone: PlateTone;
  /** The whispered line under the preview. Never more than a few words. */
  whisper: string;
};

/** The menu. Order is the order on the board — nothing is alphabetised. */
export const NAV: NavItem[] = [
  { label: "NEOYO Core", href: "/core", tone: "bone", whisper: "The permanent collection" },
  { label: "NEOYO Ease", href: "/ease", tone: "stone", whisper: "Movement, unhurried" },
  { label: "Jewelry", href: "/jewelry", tone: "gold", whisper: "Cast in Lagos" },
  { label: "Accessories", href: "/accessories", tone: "espresso", whisper: "The finishing gesture" },
  { label: "VIP Experience", href: "/vip", tone: "espresso", whisper: "By appointment only" },
  { label: "Campaigns", href: "/campaigns", tone: "skin", whisper: "Seasons on film" },
  { label: "About", href: "/about", tone: "architecture", whisper: "Outstandingly different" },
  { label: "Journal", href: "/journal", tone: "bone", whisper: "Notes from the atelier" },
  { label: "Contact", href: "/contact", tone: "stone", whisper: "Lagos, Nigeria" },
  { label: "Appointments", href: "/appointments", tone: "gold", whisper: "Reserve the room" },
];

/** Footer groupings — the menu, re-cut for the base of the page. */
export const FOOTER_NAV = [
  {
    heading: "Collections",
    links: NAV.filter((n) => ["/core", "/ease", "/jewelry", "/accessories"].includes(n.href)),
  },
  {
    heading: "House",
    links: NAV.filter((n) =>
      ["/about", "/campaigns", "/journal", "/vip"].includes(n.href),
    ),
  },
  {
    heading: "Client Care",
    links: [
      ...NAV.filter((n) => ["/contact", "/appointments"].includes(n.href)),
      { label: "Styleguide", href: "/styleguide", tone: "bone" as PlateTone, whisper: "" },
    ],
  },
];
