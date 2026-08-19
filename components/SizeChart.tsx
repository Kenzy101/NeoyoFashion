"use client";

import { useId, useState } from "react";
import { SIZE_CHART, SIZE_COLUMNS, SIZE_NOTE } from "@/lib/sizing";

/**
 * The house size chart.
 *
 * Collapsed by default — the product page is photography, and a table of
 * numbers is the least cinematic object in the system. It opens in place
 * as a real disclosure: a button that owns `aria-expanded` and a region
 * that is genuinely removed from the page when shut, not merely hidden.
 *
 * The table scrolls inside its own container on a narrow screen rather
 * than widening the page — seven columns of inches will not fit a phone,
 * and shrinking the type until they do is worse than a sideways nudge.
 */
export default function SizeChart({
  /** Highlighted row, so the chart answers "what is a 12" in context. */
  active,
}: {
  active?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="chart">
      <button
        type="button"
        className="chart__toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span>Size chart</span>
        <span className="chart__mark" aria-hidden="true">
          {open ? "–" : "+"}
        </span>
      </button>

      {open ? (
        <div className="chart__body" id={id}>
          <div className="chart__scroll" tabIndex={0} role="group" aria-label="NEOYO size chart, measurements in inches">
            <table className="chart__table">
              <caption className="u-sr-only">
                NEOYO size chart. All measurements in inches.
              </caption>
              <thead>
                <tr>
                  {SIZE_COLUMNS.map((c) => (
                    <th key={c.key} scope="col">
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row) => (
                  <tr key={row.size} data-active={active === row.size ? "true" : undefined}>
                    <th scope="row">{row.size}</th>
                    <td>{row.bust}</td>
                    <td>{row.underBust}</td>
                    <td>{row.waist}</td>
                    <td>{row.highHip}</td>
                    <td>{row.lowHip}</td>
                    <td className="chart__height">{row.height}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="chart__note">{SIZE_NOTE}</p>
          <p className="u-hairline">All measurements in inches</p>
        </div>
      ) : null}
    </div>
  );
}
