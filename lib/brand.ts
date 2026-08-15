/**
 * NEOYO — brand constants.
 * Sourced from the official brand boards (Color System, Business Card,
 * Packaging Board, Social Template). Treat this file as canon.
 */

export const BRAND = {
  name: "NEOYO",
  tagline: "Outstandingly Different.",
  voice: "She doesn't seek attention. Attention follows her.",
  email: "hello@neoyo.com",
  phone: "+234 000 000 0000",
  social: "@neoyo_official",
  socialUrl: "https://instagram.com/neoyo_official",
  city: "Lagos",
  country: "Nigeria",
  atelier: "Lagos, Nigeria",
  founder: "Kami",
  founderTitle: "Founder & Creative Director",
  currency: "₦",
} as const;

/** The official colour system, mirrored from tokens.css for the styleguide. */
export const PALETTE = [
  { name: "Bone White", hex: "#F2ECDE", role: "Primary — dominant surface (80%)", token: "--neoyo-bone-white" },
  { name: "Brownish Gold", hex: "#A9824B", role: "Primary — logo, accents, hardware", token: "--neoyo-gold" },
  { name: "Gold — Light", hex: "#CBAE7C", role: "Tonal — highlights, hairlines", token: "--neoyo-gold-light" },
  { name: "Gold — Deep", hex: "#8A6A3A", role: "Tonal — pressed states, depth", token: "--neoyo-gold-deep" },
  { name: "Bone — Shadow", hex: "#E9E0CC", role: "Tonal — recessed surfaces", token: "--neoyo-bone-shadow" },
  { name: "Espresso Brown", hex: "#2B1B12", role: "Secondary — dark ground, high contrast only", token: "--neoyo-espresso" },
] as const;
