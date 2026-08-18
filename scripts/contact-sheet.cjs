/* Build labelled contact sheets so the whole set can be reviewed at once. */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = process.argv[2];
const OUT = process.argv[3];
const COLS = 3, ROWS = 3, TILE = 420, LABEL = 34;
const CELL_H = TILE + LABEL;

(async () => {
  const files = fs.readdirSync(SRC).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
  fs.mkdirSync(OUT, { recursive: true });

  for (let page = 0; page * 9 < files.length; page++) {
    const batch = files.slice(page * 9, page * 9 + 9);
    const composites = [];

    for (let i = 0; i < batch.length; i++) {
      const col = i % COLS, row = Math.floor(i / COLS);
      const buf = await sharp(path.join(SRC, batch[i]))
        .resize(TILE, TILE, { fit: "contain", background: "#1c110b" })
        .toBuffer();
      composites.push({ input: buf, left: col * TILE, top: row * CELL_H });

      const label = `${page * 9 + i + 1}. ${batch[i]}`;
      const svg = Buffer.from(
        `<svg width="${TILE}" height="${LABEL}"><rect width="100%" height="100%" fill="#000"/>` +
        `<text x="8" y="23" font-family="monospace" font-size="17" fill="#ffcf8a">${label.replace(/&/g, "&amp;")}</text></svg>`
      );
      composites.push({ input: svg, left: col * TILE, top: row * CELL_H + TILE });
    }

    const out = path.join(OUT, `sheet-${page + 1}.png`);
    await sharp({
      create: { width: COLS * TILE, height: ROWS * CELL_H, channels: 3, background: "#000" },
    }).composite(composites).png().toFile(out);
    console.log("wrote", out, `(${batch.length} images)`);
  }
})();
