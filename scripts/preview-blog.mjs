#!/usr/bin/env node
/**
 * preview-blog.mjs — local Jekyll-ish renderer + static server for eyeballing
 * blog post changes on a box that has no Ruby/Jekyll.
 *
 * Renders every _posts/*.md through _layouts/post.html with liquidjs, using a
 * small built-in Markdown->HTML converter that covers the subset these posts
 * use (headings, bold/italic, links, images, lists, blockquotes, hr, paragraphs).
 * Wires prev/next from date order. Writes into _preview/blog/<slug>/, then serves
 * _preview first, falling back to the repo root so /assets etc. resolve.
 *
 * Throwaway dev tool — NOT part of the Jekyll build. Run: node scripts/preview-blog.mjs
 * Then open the URL it prints (port 3003 to avoid clashing with preview.mjs on 3002).
 */
import http from "node:http";
import { promises as fs, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Liquid } from "liquidjs";
import yaml from "js-yaml";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "_preview");
const PORT = 3003;
const SITE_URL = "https://615realtyguy.com";

const engine = new Liquid({ root: [path.join(ROOT, "_includes"), path.join(ROOT, "_layouts"), ROOT], extname: ".html", jekyllInclude: true });

// ---- Jekyll-ish liquid filters the post layout relies on ----
engine.registerFilter("jsonify", (v) => JSON.stringify(v));
engine.registerFilter("absolute_url", (v) => SITE_URL + (v || ""));
engine.registerFilter("number_of_words", (v) => String(v || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length);
engine.registerFilter("date_to_xmlschema", (v) => toDate(v).toISOString());
engine.registerFilter("date", (v, fmt) => strftime(toDate(v), fmt));

function toDate(v) {
  if (v instanceof Date) return v;
  // js-yaml gives a Date for `date: 2026-06-18`; guard for strings just in case.
  return new Date(v);
}
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function strftime(d, fmt) {
  if (!fmt) return d.toISOString();
  const mon = d.getUTCMonth(), day = d.getUTCDate(), yr = d.getUTCFullYear();
  return fmt
    .replace(/%B/g, MONTHS[mon])
    .replace(/%b/g, MONTHS[mon].slice(0, 3))
    .replace(/%-d/g, String(day))
    .replace(/%d/g, String(day).padStart(2, "0"))
    .replace(/%Y/g, String(yr));
}

// ---- Split a Jekyll source file into { data, body } ----
function parse(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: src };
  return { data: yaml.load(m[1]) || {}, body: m[2] };
}

// ---- Minimal Markdown -> HTML (only what these posts use) ----
function inline(s) {
  return s
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, a, src) => `<img src="${src}" alt="${a}">`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, href) => `<a href="${href}">${t}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}
function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  const flushPara = (buf) => { if (buf.length) out.push(`<p>${inline(buf.join(" ").trim())}</p>`); };
  while (i < lines.length) {
    let line = lines[i];
    if (/^\s*$/.test(line)) { i++; continue; }
    if (/^---+\s*$/.test(line)) { out.push("<hr>"); i++; continue; }
    let h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { const n = h[1].length; out.push(`<h${n}>${inline(h[2].trim())}</h${n}>`); i++; continue; }
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, "")); i++; }
      out.push(`<blockquote>${inline(buf.join(" ").trim())}</blockquote>`);
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { items.push(inline(lines[i].replace(/^\s*[-*]\s+/, "").trim())); i++; }
      out.push(`<ul>${items.map((t) => `<li>${t}</li>`).join("")}</ul>`);
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) { items.push(inline(lines[i].replace(/^\s*\d+\.\s+/, "").trim())); i++; }
      out.push(`<ol>${items.map((t) => `<li>${t}</li>`).join("")}</ol>`);
      continue;
    }
    // paragraph: gather until blank or next block starter
    const buf = [];
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,6}\s|>\s?|---+\s*$|\s*[-*]\s+|\s*\d+\.\s+)/.test(lines[i])) {
      buf.push(lines[i]); i++;
    }
    flushPara(buf);
  }
  return out.join("\n");
}

async function main() {
  const postsDir = path.join(ROOT, "_posts");
  const files = (await fs.readdir(postsDir)).filter((f) => /\.(md|markdown)$/.test(f)).sort();
  const posts = [];
  for (const f of files) {
    const { data, body } = parse(await fs.readFile(path.join(postsDir, f), "utf8"));
    const slug = f.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.(md|markdown)$/, "");
    posts.push({ ...data, slug, url: `/blog/${slug}/`, _html: mdToHtml(body) });
  }
  // date order (oldest -> newest) so prev = older, next = newer (Jekyll semantics)
  posts.sort((a, b) => toDate(a.date) - toDate(b.date));

  const layout = await fs.readFile(path.join(ROOT, "_layouts", "post.html"), "utf8");
  const site = { url: SITE_URL, title: "615 Realty Guy" };
  for (let n = 0; n < posts.length; n++) {
    const page = { ...posts[n] };
    page.previous = posts[n - 1] ? { url: posts[n - 1].url, title: posts[n - 1].title } : null;
    page.next = posts[n + 1] ? { url: posts[n + 1].url, title: posts[n + 1].title } : null;
    const html = await engine.parseAndRender(layout, { page, site, content: page._html });
    const dir = path.join(OUT, "blog", page.slug);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, "index.html"), html);
  }
  console.log(`Rendered ${posts.length} posts into _preview/blog/`);

  const MIME = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript",
    ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml",
    ".ico": "image/x-icon", ".json": "application/json", ".woff2": "font/woff2", ".xml": "application/xml" };

  http.createServer(async (req, res) => {
    let url = req.url.split("?")[0];
    if (url.endsWith("/")) url += "index.html";
    for (const base of [OUT, ROOT]) {
      const fp = path.join(base, decodeURIComponent(url));
      if (!fp.startsWith(base)) continue;
      if (existsSync(fp) && (await fs.stat(fp)).isFile()) {
        res.writeHead(200, { "Content-Type": MIME[path.extname(fp).toLowerCase()] || "application/octet-stream" });
        res.end(await fs.readFile(fp));
        return;
      }
    }
    res.writeHead(404); res.end("Not found");
  }).listen(PORT, () => {
    const target = posts.find((p) => p.slug.includes("bridge-loan")) || posts[posts.length - 1];
    console.log(`Preview at http://localhost:${PORT}${target.url}`);
  });
}

main().catch((e) => { console.error(e); process.exit(1); });
