"use client";

import { useId } from "react";

type Base = {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
};

type InputProps = Base &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> & { as?: "input" };

type TextareaProps = Base &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & { as: "textarea" };

type SelectProps = Base &
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "id"> & {
    as: "select";
    options: { value: string; label: string }[];
  };

type Props = InputProps | TextareaProps | SelectProps;

/**
 * Field — the only form control in the system.
 *
 * Underline, never a box. The label rides above the rule and turns gold
 * on focus, and a gold hairline draws in beneath the control.
 *
 * The label is always a real <label for>, hints and errors are wired
 * through aria-describedby, and errors set aria-invalid — the elegance
 * is in the CSS, not in removing the semantics.
 */
export default function Field(props: Props) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  // `as` and `options` are ours — they must never reach the DOM.
  const {
    label,
    hint,
    error,
    required,
    as: _as,
    options: _options,
    ...rest
  } = props as Base & Record<string, unknown>;
  void _as;
  void _options;

  const describedBy = [hint ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(" ");

  const shared = {
    id,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy || undefined,
  };

  return (
    <div className="field" data-invalid={error ? "true" : "false"}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>

      <div className="field__control">
        {props.as === "textarea" ? (
          <textarea
            className="field__textarea"
            {...shared}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : props.as === "select" ? (
          <select
            className="field__select"
            {...shared}
            {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {props.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="field__input"
            {...shared}
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>

      {hint ? (
        <span className="field__hint" id={hintId}>
          {hint}
        </span>
      ) : null}

      {error ? (
        <span className="field__error" id={errorId} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
