# Listing pages — how to add one

Self-hosted listing pages for 615realtyguy.com. Each listing is **one data file**
fed into **one shared layout**. Adding a listing is ~10 minutes once photos are ready.

- **Live URL:** `https://615realtyguy.com/listings/<slug>/`
- **Index:** `https://615realtyguy.com/listings/`
- **Slug = filename** of the data file (e.g. `1204-vickie-ln-portland-tn`).

---

## The moving parts

| File | What it is |
|---|---|
| `_listings/<slug>.md` | The listing. All facts live in its YAML front matter. **This is the only file you edit per listing.** |
| `_layouts/listing.html` | The shared page template (hero, stats, incentive ticket, gallery, specs, map, FAQ, lead form, JSON-LD, compliance footer). |
| `listings.html` → `/listings/` | The index page (active first, then under-contract, then sold). |
| `_includes/listing-card.html` | One card on the index. |
| `assets/listings/<slug>/` | The web-ready photos (committed to the repo). |
| `scripts/process-listing-photos.mjs` | Local image pipeline (EXIF-strip + WebP variants + manifest stub). |

Photos are served from `/assets/listings` today. That base is set **once** in
`_config.yml` as `listing_media_base`. To move to Cloudflare R2 later, change that
one line to your media domain — no page edits needed.

---

## Add a new listing (end-to-end)

### 1. Photos
Name your originals like the manifest ids (lowercase, hyphenated, numbered):

```
exterior-front-01.jpg   kitchen-01.jpg   primary-bed-01.jpg   bonus-room-01.jpg ...
```

Drop them in `scripts/originals/<slug>/`, then (first time only) install sharp:

```powershell
cd scripts
npm install          # installs sharp — one time
node process-listing-photos.mjs <slug>
```

This writes EXIF-stripped `*-600/1200/2400.webp` into `assets/listings/<slug>/`
and a manifest stub to `scripts/out/<slug>.photos.yml`.

> The script strips GPS/EXIF automatically and never upscales past the source.
> `scripts/originals/` and `scripts/out/` are gitignored — raw photos don't get committed.

After the data file is filled in (step 2), generate the **social-share card** —
a 1200×630 JPEG with the photo + price + address, used for the Open Graph /
Twitter image so links unfurl with the hero (JPEG, because iMessage/SMS and some
platforms won't preview WebP):

```powershell
node make-og-card.mjs <slug>      # writes assets/listings/<slug>/og.jpg
```

Re-run it any time the price or status changes so the share card stays current.

### 2. Data file
Copy an existing one as a starting point:

```powershell
Copy-Item _listings/1204-vickie-ln-portland-tn.md _listings/<slug>.md
```

Fill in the front matter (price, beds, MLS#, rooms, schools, narrative, FAQ…).
Rewrite the narrative in your own voice — **never paste MLS public remarks verbatim**.
Then paste the `photos:` block from `scripts/out/<slug>.photos.yml`, write real
alt text for each image, pick the hero, and mark any wide shots `wide: true`.

Set `photos_ready: true` once the images exist (until then the page shows labeled
placeholders so you can preview the layout).

### 3. Preview & ship
```powershell
bundle exec jekyll serve      # http://localhost:4000/listings/<slug>/
```
Looks right? Commit and push. GitHub Pages rebuilds in ~1 minute. The sitemap
updates automatically (`jekyll-sitemap`).

---

## Updating status (under contract / sold)

Edit **one field** in `_listings/<slug>.md`:

```yaml
status: active     # → pending → sold
```

- **active** — full marketing page + incentive ticket + "Request a showing".
- **pending** — badge flips to **Under Contract**; ticket hidden; form becomes
  "ask about backup offers / similar homes."
- **sold** — gold **Sold by SixOneFive** badge; ticket gone; the lead form turns
  into a home-valuation capture ("what's yours worth?") plus a link to the city's
  area page. **The page stays indexed** — it keeps earning SEO and feeds the area page.

You can do this **right on GitHub.com** (open the file → pencil icon → change the
word → commit) from your phone. No local tools needed. JSON-LD `availability` and
all on-page copy update from that one field.

---

## Internal linking & SEO/AEO

On-page SEO/AEO is automatic per listing: unique `<title>` + meta description, canonical,
Open Graph (hero image), JSON-LD (`RealEstateListing` + `Offer` + `PostalAddress` + `geo` +
`FAQPage`), descriptive WebP filenames + alt text, and auto-inclusion in `sitemap.xml`.

Internal links are wired so listings aren't orphaned:

- **Every page** links to `/listings/` via the top nav ("Listings").
- **Each listing** links back to its city's area page (Location section + top nav).
- **Area pages** auto-show their city's listings. The **Portland** page is already wired:
  it has `---` front matter at the top plus a "Homes I'm Listing in Portland" section that
  loops `site.listings | where: "city", "<City>"`. Sold listings stay in that section
  (badge flips to "Sold") — that's the "recently sold" hook.

**When you list in a new city** (e.g. Gallatin), copy that pattern into that area page once:
1. Add `---\n---` as the very first lines of `gallatin-tn-real-estate.html`.
2. Copy the `<style>…</style>` + `<section class="listings-section">…</section>` block from
   `portland-tn-real-estate.html`, changing the heading text and the `where: "city", "Portland"`
   filter to `"Gallatin"`. Done — that city's listings now appear and update automatically.

## Lead routing

Forms post to the same FormSubmit endpoint as the rest of the site, with the same
honeypot + 3-second time-trap. Every submission carries hidden tags:
`listing_slug`, `listing_address`, `listing_status`, and `lead_intent`
(`showing` / `incentive` / `valuation`) — so you can tell at a glance which listing
and which CTA a lead came from.

---

## Compliance (baked into the layout — don't remove)

Firm name + phone (SixOneFive Real Estate Advisors · (615) 200-0278), Equal Housing
Opportunity, Realtor® mark, "believed accurate but not guaranteed" disclaimer, and a
Realtracs/MLS source line. Status is always read from the data file, never hard-coded,
so the page can't advertise a stale status.
