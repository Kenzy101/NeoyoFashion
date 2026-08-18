/* Probe source media: dimensions, orientation, ratio. */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const SRC = process.argv[2] || "C:/Users/HP/Videos/CAPCUT EDITS";
(async () => {
  const files = fs.readdirSync(SRC).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
  for (const f of files) {
    try {
      const m = await sharp(path.join(SRC, f)).metadata();
      const ratio = m.width / m.height;
      const orient = ratio > 1.05 ? "landscape" : ratio < 0.95 ? "portrait" : "square";
      console.log(
        f.padEnd(24),
        (m.width + "x" + m.height).padEnd(12),
        ratio.toFixed(2).padStart(5),
        orient
      );
    } catch (e) {
      console.log(f, "ERR", e.message.slice(0, 60));
    }
  }
})();
