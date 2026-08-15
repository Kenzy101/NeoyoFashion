import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Onward from "@/components/Onward";
import PageHead from "@/components/PageHead";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Write to ${BRAND.name}. ${BRAND.atelier}.`,
};

export default function Contact() {
  return (
    <>
      <PageHead
        eyebrow={`${BRAND.name} — ${BRAND.atelier}`}
        title="Contact"
        lede="Client care answers within one working day. For anything to do with the private room, use Appointments instead."
      />

      <section className="u-page u-page--railed" aria-label="Contact">
        <div className="contact">
          <Reveal kind="rise">
            <div className="contact__list">
              <div className="contact__item">
                <span className="u-hairline">Client care</span>
                <a className="u-body-lg m-underline" href={`mailto:${BRAND.email}`}>
                  {BRAND.email}
                </a>
              </div>

              <div className="contact__item">
                <span className="u-hairline">Telephone</span>
                <a className="u-body-lg m-underline" href={`tel:${BRAND.phone.replace(/\s/g, "")}`}>
                  {BRAND.phone}
                </a>
              </div>

              <div className="contact__item">
                <span className="u-hairline">Atelier</span>
                <p className="u-body-lg">
                  {BRAND.city}
                  <br />
                  {BRAND.country}
                </p>
                <p className="u-caption">Visits by appointment only.</p>
              </div>

              <div className="contact__item">
                <span className="u-hairline">Elsewhere</span>
                <a
                  className="u-body-lg m-underline"
                  href={BRAND.socialUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {BRAND.social}
                </a>
              </div>

              <div className="contact__item" style={{ marginTop: "var(--space-md)" }}>
                <Plate tone="architecture" ratio="16 / 9" />
                <p className="u-caption" style={{ marginTop: "var(--space-2xs)" }}>
                  The atelier, facing west.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal kind="rise" index={1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <div style={{ height: "var(--section-gap)" }} />

      <Onward current="/contact" />
      <Footer />
    </>
  );
}
