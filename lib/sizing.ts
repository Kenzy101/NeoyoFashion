/**
 * NEOYO sizing.
 *
 * Transcribed from the official NEOYO Size Chart. All measurements are in
 * inches. The chart's own column headings read "BURST" and "UNDER BURST";
 * spelled correctly here, since the site has to be read by clients.
 */

export type SizeRow = {
  size: string;
  bust: number;
  underBust: number;
  waist: number;
  highHip: number;
  lowHip: number;
  height: string;
};

/** The columns, in the order the house prints them. */
export const SIZE_COLUMNS = [
  { key: "size", label: "Size" },
  { key: "bust", label: "Bust" },
  { key: "underBust", label: "Under Bust" },
  { key: "waist", label: "Waist" },
  { key: "highHip", label: "High Hip" },
  { key: "lowHip", label: "Low Hip" },
  { key: "height", label: "Height Guide" },
] as const;

export const SIZE_CHART: SizeRow[] = [
  { size: "6", bust: 36, underBust: 31, waist: 28, highHip: 36, lowHip: 38, height: `5'7" – 5'9"` },
  { size: "8", bust: 38, underBust: 33, waist: 30, highHip: 38, lowHip: 40, height: `5'8" – 5'10"` },
  { size: "10", bust: 40, underBust: 35, waist: 32, highHip: 40, lowHip: 42, height: `5'9" – 5'11"` },
  { size: "12", bust: 42, underBust: 37, waist: 34, highHip: 42, lowHip: 44, height: `5'10" – 6'0"` },
  { size: "14", bust: 44, underBust: 39, waist: 36, highHip: 44, lowHip: 46, height: `5'11" – 6'1"` },
  { size: "16", bust: 46, underBust: 41, waist: 38, highHip: 46, lowHip: 48, height: `6'0"+` },
  { size: "18", bust: 48, underBust: 43, waist: 40, highHip: 48, lowHip: 50, height: `6'0"+` },
  { size: "20", bust: 50, underBust: 45, waist: 42, highHip: 50, lowHip: 52, height: `6'0"+` },
];

/** The run of numbered sizes, for a garment's fit selector. */
export const GARMENT_SIZES = SIZE_CHART.map((r) => r.size);

/**
 * The sentinel that turns the fit selector into a measurement form.
 * Kept as a value rather than a boolean so a bag line records "Custom"
 * the same way it records "12".
 */
export const CUSTOM_FIT = "Custom";

/** The note printed beneath the house's own chart. */
export const SIZE_NOTE =
  "NEOYO sizing is designed for ease and comfort, particularly around the bust and hip. Our garments are generally tailored for individuals 5'7\" and taller. If you find yourself between sizes or have a fuller bust, we recommend sizing up to ensure the perfect, graceful fit.";

/** The measurements a custom order asks for, in chart order. */
export const MEASUREMENT_FIELDS = [
  { key: "bust", label: "Bust", hint: "Around the fullest part" },
  { key: "underBust", label: "Under bust", hint: "Directly beneath" },
  { key: "waist", label: "Waist", hint: "The natural crease" },
  { key: "highHip", label: "High hip", hint: "About 3\" below the waist" },
  { key: "lowHip", label: "Low hip", hint: "The fullest part" },
  { key: "height", label: "Height", hint: "Without shoes" },
] as const;

export type MeasurementKey = (typeof MEASUREMENT_FIELDS)[number]["key"];
export type Measurements = Partial<Record<MeasurementKey, string>>;

/** A short, human summary for a bag line or an order note. */
export const summariseMeasurements = (m: Measurements): string =>
  MEASUREMENT_FIELDS.filter((f) => m[f.key]?.trim())
    .map((f) => `${f.label} ${m[f.key]!.trim()}`)
    .join(" · ");
