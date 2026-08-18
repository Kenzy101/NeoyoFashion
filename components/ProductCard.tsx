import Link from "next/link";
import Plate from "./Plate";
import Reveal from "./Reveal";
import Price from "./Price";
import type { Product } from "@/lib/catalog";

/**
 * The product tile.
 *
 * No border, no shadow, no button. The photograph is the card; the name
 * and price sit beneath it in the quietest type on the page. The whole
 * tile is one hit target via a stretched pseudo-element, so there is
 * only ever one tab stop per product.
 */
export default function ProductCard({
  product,
  index = 0,
  ratio = "4 / 5",
}: {
  product: Product;
  index?: number;
  ratio?: string;
}) {
  return (
    <Reveal kind="develop" index={index % 4} className="card">
      <div className="card__frame" data-cursor-view="View">
        <Plate
          tone={product.tone}
          slug={product.shots[0]}
          grade={product.grade}
          alt={product.name}
          ratio={ratio}
          motion={index % 3 === 0 && !product.shots.length ? "kenburns" : "still"}
        />
      </div>

      <div className="card__body">
        <Link href={`/product/${product.slug}`} className="card__link">
          <span className="card__name">{product.name}</span>
        </Link>
        <span className="card__meta card__reveal">{product.note}</span>
        <Price ngn={product.price} className="card__price" />
      </div>
    </Reveal>
  );
}
