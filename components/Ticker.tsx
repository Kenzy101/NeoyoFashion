import { REVIEWS, type Review } from "@/lib/reviews";

/**
 * The customer review crawl.
 *
 * The list is rendered twice and translated by exactly -50%, which is
 * what makes the loop seamless. The second copy is hidden from assistive
 * tech so the quotes are not announced twice. Hovering pauses it; under
 * reduced motion it stops and wraps into a static block.
 */
export default function Ticker({
  reviews = REVIEWS,
  duration = 70,
  className,
}: {
  reviews?: Review[];
  duration?: number;
  className?: string;
}) {
  const group = (hidden: boolean) => (
    <div className="ticker__group" aria-hidden={hidden ? "true" : undefined}>
      {reviews.map((review, i) => (
        <p className="ticker__item" key={`${review.author}-${i}`}>
          <span>{review.quote}</span>
          <span className="ticker__author">{review.author}</span>
        </p>
      ))}
    </div>
  );

  return (
    <div
      className={["ticker", className ?? ""].filter(Boolean).join(" ")}
      style={{ ["--ticker-duration" as string]: `${duration}s` }}
    >
      <div className="ticker__track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
