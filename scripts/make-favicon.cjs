/* Build app/favicon.ico from the NEOYO monogram.
   Browsers probe /favicon.ico whether or not an SVG icon is declared, so
   without this every page logs a 404. ICO = 6-byte header, one 16-byte
   directory entry, then a PNG payload. */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SIZE = 32;

(async () => {
  const png = await sharp(path.join(__dirname, "..", "app", "icon.svg"))
    .resize(SIZE, SIZE)
    .png()
    .toBuffer();

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image

  const entry = Buffer.alloc(16);
  entry.writeUInt8(SIZE, 0); // width
  entry.writeUInt8(SIZE, 1); // height
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12); // offset past header + entry

  const out = path.join(__dirname, "..", "app", "favicon.ico");
  fs.writeFileSync(out, Buffer.concat([header, entry, png]));
  console.log("wrote app/favicon.ico —", png.length + 22, "bytes");
})();
