#!/usr/bin/env node
/**
 * process-listing-photos.mjs
 * --------------------------------------------------------------------------
 * Turns a folder of raw listing photos into web-ready, EXIF-stripped WebP
 * variants and scaffolds the `photos:` manifest for the listing data file.
 *
 * Usage:
 *   node scripts/process-listing-photos.mjs <slug> [originalsDir]
 *
 * Example:
 *   node scripts/process-listing-photos.mjs 1204-vickie-ln-portland-tn
 *
 * Input  (default): scripts/originals/<slug>/*.{jpg,jpeg,png,webp,heic}
 * Output (images) : assets/listings/<slug>/<basename>-{600,1200,2400}.webp
 * Output (stub)   : scripts/out/<slug>.photos.yml   ← paste into the .md file
 *
 * Naming convention: name your originals like the manifest ids, e.g.
 *   exterior-front-01.jpg, kitchen-01.jpg, primary-bed-01.jpg
 * The basename (minus extension) becomes the photo `file:` id 1:1.
 *
 * Notes:
 *  - sharp does NOT copy source metadata unless you ask it to, so EXIF/GPS
 *    is stripped automatically. We never call .withMetadata().
 *  - Variants are never upscaled past the source width.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const WIDTHS = [600, 1200, 2400];
const SECTION_PREFIXES = {
  exterior: "exterior", front: "exterior", rear: "exterior", lot: "exterior",
  living: "living", great: "living", family: "living",
  kitchen: "kitchen",
  dining: "dining",
  primary: "bedroom", bed: "bedroom", bedroom: "bedroom",
  bath: "bath",
  bonus: "bonus", loft: "bonus",
};

function guessSection(base) {
  const first = base.toLowerCase().split(/[-_]/)[0];
  return SECTION_PREFIXES[first] || "other";
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: node scripts/process-listing-photos.mjs <slug> [originalsDir]");
    process.exit(1);
  }

  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const originalsDir = process.argv[3]
    ? path.resolve(process.argv[3])
    : path.join(root, "scripts", "originals", slug);
  const outImgDir = path.join(root, "assets", "listings", slug);
  const outStubDir = path.join(root, "scripts", "out");

  let entries;
  try {
    entries = await fs.readdir(originalsDir);
  } catch {
    console.error(`No originals folder found at:\n  ${originalsDir}\nDrop your raw photos there (named per convention) and re-run.`);
    process.exit(1);
  }

  const sources = entries
    .filter((f) => /\.(jpe?g|png|webp|tiff?|heic)$/i.test(f))
    .sort();
  if (sources.length === 0) {
    console.error(`No image files in ${originalsDir}`);
    process.exit(1);
  }

  await fs.mkdir(outImgDir, { recursive: true });
  await fs.mkdir(outStubDir, { recursive: true });

  const manifest = [];
  for (const file of sources) {
    const base = path.basename(file, path.extname(file));
    const input = path.join(originalsDir, file);
    const meta = await sharp(input).metadata();
    const srcW = meta.width || Math.max(...WIDTHS);

    for (const w of WIDTHS) {
      const target = Math.min(w, srcW);
      const outPath = path.join(outImgDir, `${base}-${w}.webp`);
      await sharp(input)
        .rotate() // respect orientation, then drop metadata
        .resize({ width: target, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outPath);
    }
    manifest.push({ file: base, section: guessSection(base) });
    console.log(`✓ ${base}  →  ${WIDTHS.map((w) => `${base}-${w}.webp`).join(", ")}`);
  }

  // Scaffold the photos: block. First image is assumed hero — reorder later if needed.
  const [hero, ...rest] = manifest;
  const lines = [];
  lines.push("photos_ready: true   # images generated — flip the data file to match");
  lines.push("photos:");
  lines.push("  hero:");
  lines.push(`    file: "${hero.file}"`);
  lines.push(`    alt: ""   # describe the scene + "at <address>"`);
  lines.push("  gallery:");
  for (const m of rest) {
    lines.push(`    - { file: "${m.file}", section: "${m.section}", wide: false, alt: "" }`);
  }
  const stubPath = path.join(outStubDir, `${slug}.photos.yml`);
  await fs.writeFile(stubPath, lines.join("\n") + "\n", "utf8");

  console.log(`\n${sources.length} photos → ${path.relative(root, outImgDir)}`);
  console.log(`Manifest stub written to ${path.relative(root, stubPath)}`);
  console.log(`Next: paste it into _listings/${slug}.md, fill in alt text, set hero + any wide:true.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
