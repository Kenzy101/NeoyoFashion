import Reveal from "./Reveal";

/**
 * Every interior page opens the same way: an eyebrow, a large serif
 * title that lifts from behind a mask, and a single line of lede.
 * The consistency is what makes the site feel like one publication.
 */
export default function PageHead({
  eyebrow,
  title,
  lede,
  split = true,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  split?: boolean;
}) {
  return (
    <header className={`head ${split ? "head--split" : ""}`}>
      <div className="u-page u-page--railed">
        <div className="head__inner">
          <div>
            <Reveal kind="fade">
              <p className="eyebrow" style={{ marginBottom: "var(--space-md)" }}>
                {eyebrow}
              </p>
            </Reveal>

            <Reveal kind="fade">
              <h1 className="head__title">
                <span className="m-mask">
                  <span className="m-mask__inner">{title}</span>
                </span>
              </h1>
            </Reveal>
          </div>

          {lede ? (
            <Reveal kind="rise" index={1}>
              <p className="head__lede">{lede}</p>
            </Reveal>
          ) : null}
        </div>
      </div>
    </header>
  );
}
