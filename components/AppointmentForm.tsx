"use client";

import { useState } from "react";
import Field from "./Field";
import { BRAND } from "@/lib/brand";

type Errors = Partial<Record<"name" | "email" | "date", string>>;

/**
 * Appointment request.
 *
 * Not a booking engine — a request. The house replies to confirm, which
 * is the point: the visitor is asking for a room, not reserving a slot.
 */
export default function AppointmentForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const next: Errors = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Please tell us your name.";

    const email = String(data.get("email") ?? "").trim();
    if (!email) next.email = "Please leave an address we can reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That address looks incomplete.";

    if (!String(data.get("date") ?? "")) next.date = "Choose a day that suits you.";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    // TODO(handoff): POST to /api/appointments or a server action here.
    setSent(true);
  };

  if (sent) {
    return (
      <div
        style={{ display: "grid", gap: "var(--space-md)", justifyItems: "start" }}
        role="status"
      >
        <span className="eyebrow">Requested</span>
        <p className="u-body-lg">
          Thank you. Someone from the house will write to confirm the hour, and to
          ask what you would like pulled before you arrive.
        </p>
        <button type="button" className="btn btn--quiet" onClick={() => setSent(false)}>
          Request another
        </button>
      </div>
    );
  }

  return (
    <form className="checkout__form" onSubmit={onSubmit} noValidate>
      <fieldset className="fieldset">
        <legend className="fieldset__legend">Your details</legend>

        <div className="fieldset__row fieldset__row--two">
          <Field label="Name" name="name" autoComplete="name" required error={errors.name} />
          <Field
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            error={errors.email}
          />
        </div>

        <Field label="Telephone" name="phone" type="tel" autoComplete="tel" />
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset__legend">The appointment</legend>

        <div className="fieldset__row fieldset__row--two">
          <Field
            label="Preferred day"
            name="date"
            type="date"
            required
            error={errors.date}
          />
          <Field
            as="select"
            label="Hour"
            name="hour"
            options={[
              { value: "10", label: "10:00" },
              { value: "12", label: "12:00" },
              { value: "14", label: "14:00" },
              { value: "16", label: "16:00 — the light" },
            ]}
          />
        </div>

        <Field
          as="select"
          label="Where"
          name="city"
          options={[
            { value: "lagos", label: `${BRAND.city} — the atelier` },
            { value: "abuja", label: "Abuja — house call" },
            { value: "accra", label: "Accra — house call" },
            { value: "london", label: "London — house call" },
            { value: "newyork", label: "New York — house call" },
          ]}
        />

        <Field
          as="select"
          label="Interest"
          name="interest"
          options={[
            { value: "core", label: "NEOYO Core" },
            { value: "ease", label: "NEOYO Ease" },
            { value: "jewelry", label: "Jewelry" },
            { value: "accessories", label: "Accessories" },
            { value: "mtm", label: "Made to measure" },
            { value: "archive", label: "Archive access" },
          ]}
        />

        <Field
          as="textarea"
          label="Anything we should know"
          name="notes"
          rows={4}
          hint="Sizes you already own, a piece you have been waiting for, an occasion."
        />

        <label className="choice">
          <input className="choice__input" type="checkbox" name="consent" />
          <span className="choice__box" aria-hidden="true" />
          <span className="choice__label">
            I would like to hear when new pieces are released. No more than four
            times a year.
          </span>
        </label>

        <button type="submit" className="btn btn--primary" style={{ justifySelf: "start" }}>
          Request the room
          <span className="btn__arrow" aria-hidden="true">
            &#8594;
          </span>
        </button>
      </fieldset>
    </form>
  );
}
