import type { PlateTone } from "./plate";

export type NavItem = {
  label: string;
  href: string;
  /** Tone of the cinematic preview raised behind the menu on hover. */
  tone: PlateTone;
  /** The whispered line under the preview. Never more than a few words. */
  whisper: string;
};

/**
 * The menu.
 *
 * Set in initial caps, not the wordmark's uppercase — at this size the
 * serif is the voice, and shouting it in caps would fight the film behind
 * it. "VIP" stays an acronym; capitalising it as "Vip" would read as a
 * mistake rather than a style.
 *
 * Order is the order of the house, not the alphabet.
 */
export const NAV: NavItem[] = [
  { label: "Neoyo Core", href: "/core", tone: "bone", whisper: "Lumina · Within Her" },
  { label: "Neoyo Ease", href: "/ease", tone: "stone", whisper: "Movement, unhurried" },
  { label: "Neoyo Jewelry", href: "/jewelry", tone: "gold", whisper: "Cast in Lagos" },
  { label: "Neoyo Accessories", href: "/accessories", tone: "espresso", whisper: "The finishing gesture" },
  { label: "VIP Experience", href: "/vip", tone: "espresso", whisper: "By appointment only" },
  { label: "Appointments", href: "/appointments", tone: "gold", whisper: "Reserve the room" },
];

/**
 * Footer groupings — the menu, re-cut for the base of the page.
 *
 * Campaigns, Journal, About and Contact are no longer in the navigation.
 * Their routes still build and still resolve, so nothing that has been
 * linked or shared breaks; they are simply not offered. Delete the
 * directories under `app/` if they should stop existing entirely.
 */
export const FOOTER_NAV = [
  {
    heading: "Collections",
    links: NAV.filter((n) =>
      ["/core", "/ease", "/jewelry", "/accessories"].includes(n.href),
    ),
  },
  {
    heading: "The House",
    links: NAV.filter((n) => ["/vip", "/appointments"].includes(n.href)),
  },
];
