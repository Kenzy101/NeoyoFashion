/**
 * Post-export shim for Next 16's static RSC payloads.
 *
 * The client router prefetches a route's payload from a FLAT path:
 *     /core/__next.core.__PAGE__.txt
 *
 * but `output: "export"` writes it as a NESTED one:
 *     /core/__next.core/__PAGE__.txt
 *
 * The mismatch makes every prefetch 404. Navigation still works — the
 * router falls back to a document request — but the console fills with
 * errors and every client-side navigation pays a full round trip.
 *
 * This walks the export and, for each `__next.*` directory, writes a
 * sibling flat copy of each file inside it using the name the router
 * actually asks for. If a future Next release fixes the path, the extra
 * files simply go unrequested.
 *
 * Runs automatically via the `postbuild` npm script.
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");

if (!fs.existsSync(OUT)) {
  console.log("flatten-rsc: no out/ directory — nothing to do");
  process.exit(0);
}

let written = 0;

const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;

    if (entry.name.startsWith("__next.")) {
      // Flatten this segment directory into sibling files.
      for (const child of fs.readdirSync(full, { withFileTypes: true })) {
        if (!child.isFile()) continue;
        const flat = path.join(dir, `${entry.name}.${child.name}`);
        if (!fs.existsSync(flat)) {
          fs.copyFileSync(path.join(full, child.name), flat);
          written++;
        }
      }
    }

    walk(full);
  }
};

walk(OUT);
console.log(`flatten-rsc: wrote ${written} flat RSC payload${written === 1 ? "" : "s"}`);
