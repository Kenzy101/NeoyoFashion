"use client";

import { useState } from "react";
import Field from "./Field";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/**
 * Client-care enquiry.
 *
 * Validation is deliberate rather than eager: nothing is marked wrong
 * until the visitor submits, and the first invalid field takes focus so
 * a keyboard or screen-reader user is not left hunting for the problem.
 *
 * There is no backend yet — `onSubmit` is the single place to wire a
 * server action or endpoint. See DESIGN.md § Forms.
 */
export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) next.name = "Please tell us your name.";
    if (!email) next.email = "Please leave an address we can reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That address looks incomplete.";
    if (!message) next.message = "Please tell us what you need.";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      const form = event.currentTarget;
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    // TODO(handoff): POST to /api/enquiries or a server action here.
    setSent(true);
  };

  if (sent) {
    return (
      <div
        style={{ display: "grid", gap: "var(--space-md)", justifyItems: "start" }}
        role="status"
      >
        <span className="eyebrow">Received</span>
        <p className="u-body-lg">
          Thank you. Client care will write back within one working day.
        </p>
        <button type="button" className="btn btn--quiet" onClick={() => setSent(false)}>
          Write again
        </button>
      </div>
    );
  }

  return (
    <form className="checkout__form" onSubmit={onSubmit} noValidate>
      <fieldset className="fieldset">
        <legend className="fieldset__legend">Write to us</legend>

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

        <Field
          as="select"
          label="Subject"
          name="subject"
          options={[
            { value: "order", label: "An order" },
            { value: "sizing", label: "Sizing and fit" },
            { value: "care", label: "Care and repair" },
            { value: "press", label: "Press" },
            { value: "other", label: "Something else" },
          ]}
        />

        <Field
          as="textarea"
          label="Message"
          name="message"
          rows={6}
          required
          error={errors.message}
          hint="A sentence is plenty."
        />

        <button type="submit" className="btn btn--primary" style={{ justifySelf: "start" }}>
          Send
          <span className="btn__arrow" aria-hidden="true">
            &#8594;
          </span>
        </button>
      </fieldset>
    </form>
  );
}
