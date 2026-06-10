#!/usr/bin/env node
/**
 * make-og-card.mjs — build a 1200x630 JPEG social-share card for a listing.
 *
 * Usage:  node scripts/make-og-card.mjs <slug>
 *
 * Reads _listings/<slug>.md for the headline facts and the processed hero
 * photo, then composites a branded card to assets/listings/<slug>/og.jpg.
 *
 * Why JPEG (not the WebP hero): link unfurlers on iMessage/SMS and several
 * social platforms don't render WebP previews. JPEG at 1200x630 is the
 * universally-safe Open Graph image.
 *
 * sharp only — no extra dependencies. Front matter is read with a tiny
 * line parser (just the few scalar fields we need).
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const W = 1200, H = 630;

function xml(s) {
  return String(s == null ? "" : s).replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));
}

// minimal front-matter scalar reader: `key: "value"` or `key: value`
function field(fm, key) {
  const m = fm.match(new RegExp(`^\\s*${key}:\\s*"?(.*?)"?\\s*(?:#.*)?$`, "m"));
  return m ? m[1] : "";
}

async function main() {
  const slug = process.argv[2];
  if (!slug) { console.error("Usage: node scripts/make-og-card.mjs <slug>"); process.exit(1); }

  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const mdPath = path.join(root, "_listings", `${slug}.md`);
  const md = await fs.readFile(mdPath, "utf8");
  const fm = md.split(/^---$/m)[1] || md; // front matter block

  const status = (field(fm, "status") || "active").replace(/_/g, " ").toUpperCase();
  const newCon = /new_construction:\s*true/.test(fm);
  const price = field(fm, "price_display");
  const address = field(fm, "address");
  const city = field(fm, "city"), state = field(fm, "state");
  const beds = field(fm, "beds"), baths = field(fm, "baths");
  const sqft = field(fm, "sqft"), acres = field(fm, "acres");
  // hero file id (first `file:` under `hero:`)
  const heroM = fm.match(/hero:\s*\n\s*file:\s*"([^"]+)"/);
  const heroFile = heroM ? heroM[1] : "";
  if (!heroFile) { console.error("Could not find photos.hero.file in", mdPath); process.exit(1); }

  const heroSrc = path.join(root, "assets", "listings", slug, `${heroFile}-2400.webp`);
  const base = await sharp(heroSrc).resize(W, H, { fit: "cover" }).toBuffer();

  const eyebrow = newCon ? `${status} · NEW CONSTRUCTION` : status;
  const sub = `${city}, ${state}  ·  ${beds} bd  ·  ${baths} ba  ·  ${sqft} sqft  ·  ${acres} ac`;
  const badgeW = 34 + eyebrow.length * 12.5;

  const overlay = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="40%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.86"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="60" y="48" width="${badgeW}" height="40" rx="4" fill="#d2b56c"/>
  <text x="${60 + badgeW / 2}" y="75" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" letter-spacing="2" fill="#16130D">${xml(eyebrow)}</text>
  <text x="1140" y="78" text-anchor="end" font-family="Georgia, 'Times New Roman', serif" font-size="26" fill="#f2ede1">615 Realty Guy <tspan fill="#d2b56c">| SixOneFive</tspan></text>
  <text x="60" y="500" font-family="Georgia, 'Times New Roman', serif" font-size="86" font-weight="700" fill="#d2b56c">${xml(price)}</text>
  <text x="60" y="556" font-family="Georgia, 'Times New Roman', serif" font-size="46" fill="#ffffff">${xml(address)}</text>
  <text x="63" y="596" font-family="Arial, Helvetica, sans-serif" font-size="25" letter-spacing="1" fill="#cfc6b0">${xml(sub)}</text>
</svg>`);

  const out = path.join(root, "assets", "listings", slug, "og.jpg");
  await sharp(base).composite([{ input: overlay, top: 0, left: 0 }]).jpeg({ quality: 86 }).toFile(out);
  console.log(`OG card -> ${path.relative(root, out)}  (${price} — ${address})`);
}

main().catch((e) => { console.error(e); process.exit(1); });
