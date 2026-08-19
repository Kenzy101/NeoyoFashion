"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BagLink from "./BagLink";
import Plate from "./Plate";
import { NAV } from "@/lib/nav";
import { BRAND } from "@/lib/brand";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Focus is returned here on close. */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

/**
 * The fullscreen menu.
 *
 * Hovering an item raises a large cinematic preview behind the list.
 * On touch, where there is no hover, the preview follows the item the
 * visitor's finger last rested on, and the whisper line is always shown.
 *
 * Accessibility: rendered as a modal dialog — focus is trapped while
 * open, Escape closes, background is inert to screen readers, and the
 * trigger regains focus on close.
 */
export default function Menu({ open, onClose, triggerRef }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /* `inert` is applied imperatively rather than as a JSX prop.
     React 19 serialises a boolean `inert` to inert="" on the server and
     then warns about that same empty string when it hydrates. Setting
     the property on the node sidesteps the round trip; behaviour is
     identical, and the closed menu is genuinely inert rather than merely
     hidden. */
  useEffect(() => {
    const node = rootRef.current;
    if (node) node.inert = !open;
  }, [open]);

  /* -------- scroll lock + focus management -------- */
  useEffect(() => {
    if (!open) return;

    document.body.setAttribute("data-scroll-locked", "true");

    // Move focus into the panel once it is visible.
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    const focusTimer = window.setTimeout(() => first?.focus(), 120);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      // Trap: cycle focus between the first and last focusable element.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.removeAttribute("data-scroll-locked");
    };
  }, [open, onClose]);

  /* -------- return focus to the trigger on close -------- */
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open, triggerRef]);

  return (
    <div
      ref={rootRef}
      className="menu"
      data-open={open ? "true" : "false"}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      // Hidden from the tree entirely when closed, so nothing behind the
      // veil is reachable by tab or screen reader. `inert` is set in the
      // effect above; visibility:hidden covers the pre-hydration window.
      aria-hidden={open ? undefined : "true"}
    >
      {/* Cinematic previews — one per section, crossfading behind the list */}
      <div className="menu__previews" aria-hidden="true">
        {NAV.map((item, i) => (
          <div
            key={item.href}
            className="menu__preview"
            data-active={open && active === i ? "true" : "false"}
          >
            <Plate
              tone={item.tone}
              motion={i % 2 === 0 ? "kenburns" : "kenburns-alt"}
              fill
            />
          </div>
        ))}
      </div>

      <div className="menu__inner" ref={panelRef}>
        <nav aria-label="Main">
          <ul className="menu__list">
            {NAV.map((item, i) => (
              <li className="menu__item" key={item.href}>
                <Link
                  href={item.href}
                  className="menu__link"
                  style={{ ["--menu-index" as string]: i }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onTouchStart={() => setActive(i)}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                >
                  <span className="menu__index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="menu__foot">
          <div className="menu__contact">
            <a className="u-hairline m-underline" href={`mailto:${BRAND.email}`}>
              {BRAND.email}
            </a>
            <span className="u-hairline">{BRAND.atelier}</span>
          </div>

          <div className="menu__social">
            <a
              className="u-hairline m-underline"
              href={BRAND.socialUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              {BRAND.social}
            </a>
            <BagLink className="u-hairline m-underline" onNavigate={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
