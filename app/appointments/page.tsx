import type { Metadata } from "next";
import AppointmentForm from "@/components/AppointmentForm";
import Footer from "@/components/Footer";
import Onward from "@/components/Onward";
import PageHead from "@/components/PageHead";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Appointments",
  description: "Reserve the private room. By appointment, in Lagos or elsewhere.",
};

export default function Appointments() {
  return (
    <>
      <PageHead
        eyebrow={`${BRAND.name} — By appointment`}
        title="Reserve the room"
        lede="Two hours, the collection pulled in your size before you arrive, and no one else in the building."
      />

      <section className="u-page u-page--railed" aria-label="Appointments">
        <div className="contact">
          <Reveal kind="develop">
            <div style={{ display: "grid", gap: "var(--space-md)" }}>
              <div data-cursor-view="Look">
                <Plate tone="espresso" ratio="4 / 5" motion="kenburns" />
              </div>
              <p className="u-caption">
                The private room, {BRAND.city}. West-facing, one window.
              </p>
            </div>
          </Reveal>

          <Reveal kind="rise" index={1}>
            <AppointmentForm />
          </Reveal>
        </div>
      </section>

      <div style={{ height: "var(--section-gap)" }} />

      <Onward current="/appointments" />
      <Footer />
    </>
  );
}
