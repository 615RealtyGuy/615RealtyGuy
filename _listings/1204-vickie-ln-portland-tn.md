---
layout: listing

# ─── Status (the one field you flip over the listing's life) ──────────────
# active | pending | sold
status: active

# ─── Identity / address ──────────────────────────────────────────────────
slug: 1204-vickie-ln-portland-tn
address: "1204 Vickie Lane"
street: "1204 Vickie Ln"
city: "Portland"
state: "TN"
state_full: "Tennessee"
zip: "37148"
county: "Sumner"
subdivision: "Angelina Estates"

# ─── Numbers ─────────────────────────────────────────────────────────────
price: 449000
price_display: "$449,000"          # what shows on the page (with commas/$)
price_sub: "$249 / sqft · seller concessions offered"
beds: 3
baths: 2
sqft: "1,800"
acres: "1.00"
garage: "2-car"
year_built: 2025
new_construction: true
mls: "3128580"                     # confirmed — Realtracs Agent Report
list_date: "2026-02-11"           # confirmed (string form = no timezone drift)
possession: "Date of deed"
financing: "Conv · FHA · USDA · VA"

# Coordinates power the precise OpenStreetMap marker embed.
# From 36°37'04.2"N 86°31'07.0"W (John's pin, June 2026).
lat: 36.617833
lng: -86.518611

# ─── SEO / AEO ───────────────────────────────────────────────────────────
seo_title: "1204 Vickie Ln, Portland TN 37148 — New Construction on 1 Acre"
seo_description: "New construction at 1204 Vickie Ln in Angelina Estates, Portland TN. 3 bed, 2 bath, 1,800 sqft on a full acre with a 20x20 bonus room."

# ─── Agents (rail) ───────────────────────────────────────────────────────
agents:
  - name: "John Crowder"
    title: "Realtor® · Affiliate Broker"
    phone: "(615) 491-1638"
    tel: "6154911638"
    initials: "JC"
    photo: "/market_widget/Headshot.png"
  - name: "Mike Honeycutt"
    title: "Realtor®"
    phone: "(615) 430-9923"
    tel: "6154309923"
    initials: "MH"

# ─── Narrative (rewritten from the PDF facts — never copy MLS remarks) ────
narrative:
  eyebrow: "The home"
  title: "A full acre, a brand-new build, and not a square foot of carpet"
  paragraphs:
    - "New construction usually means a quarter-acre lot and a neighbor's window ten feet from yours. Vickie Lane is the exception — a one-acre homesite with no neighbors directly across the street, ten minutes from shopping and dining in Portland."
    - "Inside, the layout opens straight through: living room, dining, and a kitchen finished with solid-surface counters, tile backsplash, and stainless appliances. Laminate wood flooring runs wall-to-wall — zero carpet anywhere — with tile in both baths. Above the garage, a 20×20 bonus room is the flex space every plan promises and few actually deliver at this size: media room, office, fourth-bedroom conversion, your call."
    - "The details you don't see in photos are the ones that age best here: an encapsulated crawlspace, a finished garage with a coated floor, and a concrete drive. It's a house built to be easy to own."

# ─── Rooms & dimensions ──────────────────────────────────────────────────
rooms:
  - { name: "Living room",     dim: "15 × 15", note: "great room" }
  - { name: "Primary bedroom", dim: "12 × 14", note: "full bath" }
  - { name: "Bedroom 2",       dim: "10 × 12" }
  - { name: "Bedroom 3",       dim: "10 × 11" }
  - { name: "Bonus room",      dim: "20 × 20", note: "over garage" }

specs:
  - { label: "Water / sewer", value: "City water · septic tank" }
  - { label: "HVAC",          value: "Central heat & air" }
  - { label: "Crawlspace",    value: "Encapsulated" }
  - { label: "Exterior",      value: "Vinyl siding · covered porch & patio" }
  - { label: "Internet",      value: "High-speed available" }

# ─── Location ────────────────────────────────────────────────────────────
location_blurb: "Angelina Estates sits on Portland's quieter east side — acre-plus lots, new builds, and a straight shot to Highway 109 for commuters. You're roughly 15 minutes to I-65, 35–45 to Nashville, and minutes from Portland's square, schools, and the Strawberry Festival route."
schools:
  elementary: "Watt Hardison Elementary"   # confirmed — Realtracs
  middle: "Portland West Middle School"
  high: "Portland High School"
area_page: "/portland-tn-real-estate.html"

# ─── FAQ (drives the FAQPage schema) ─────────────────────────────────────
faq:
  - q: "Is 1204 Vickie Lane on city sewer or septic?"
    a: "City water, septic tank — common for acre lots in this part of Sumner County, and one less monthly utility bill."
  - q: "What schools is this home zoned for?"
    a: "Watt Hardison Elementary, Portland West Middle, and Portland High School. Always verify zoning directly with Sumner County Schools before closing."
  - q: "Is there an HOA in Angelina Estates?"
    a: "Yes — there is an association, with fees to be determined as the community completes. Ask us for the latest documents."
  - q: "What's the bonus room like?"
    a: "It's a 20×20 finished space over the garage — large enough to function as a media room, home office, gym, or guest space."

# ─── Photos ──────────────────────────────────────────────────────────────
# Real professional photos, curated from the 79-shot MLS set and processed
# through scripts/process-listing-photos.mjs (EXIF/GPS stripped, 3 WebP sizes).
photos_ready: true
photos:
  hero:
    file: "exterior-front-01"
    alt: "Front exterior of 1204 Vickie Ln, a new-construction home with a two-car garage on a 1-acre lot in Portland TN"
  gallery:
    - { file: "living-great-room-01", section: "living",   wide: true,  alt: "Open great room with vaulted ceiling flowing into the kitchen and laminate wood floors at 1204 Vickie Ln" }
    - { file: "living-great-room-02", section: "living",                 alt: "Vaulted great room with ceiling fan and large windows at 1204 Vickie Ln" }
    - { file: "kitchen-01",           section: "kitchen",                alt: "Kitchen with white cabinetry, stainless appliances and a center island at 1204 Vickie Ln" }
    - { file: "kitchen-02",           section: "kitchen",                alt: "Kitchen island with pendant lighting and stainless steel appliances at 1204 Vickie Ln" }
    - { file: "kitchen-03",           section: "kitchen",                alt: "Stainless range with patterned tile backsplash at 1204 Vickie Ln" }
    - { file: "dining-01",            section: "dining",                 alt: "Dining area with chandelier and natural light at 1204 Vickie Ln" }
    - { file: "primary-bed-01",       section: "bedroom",  wide: true,   alt: "Spacious primary bedroom with vaulted ceiling and en-suite access at 1204 Vickie Ln" }
    - { file: "primary-bath-01",      section: "bath",                   alt: "Primary bathroom with double vanity and tile flooring at 1204 Vickie Ln" }
    - { file: "primary-shower-01",    section: "bath",                   alt: "Tiled walk-in shower with a glass door in the primary bath at 1204 Vickie Ln" }
    - { file: "primary-closet-01",    section: "other",                  alt: "Walk-in closet with built-in shelving and a window at 1204 Vickie Ln" }
    - { file: "bedroom-2-01",         section: "bedroom",                alt: "Second bedroom with ceiling fan and laminate wood flooring at 1204 Vickie Ln" }
    - { file: "bedroom-3-01",         section: "bedroom",                alt: "Third bedroom with ceiling fan and natural light at 1204 Vickie Ln" }
    - { file: "bath-2-01",            section: "bath",                   alt: "Second full bathroom with a tub-shower combo and vanity at 1204 Vickie Ln" }
    - { file: "bonus-room-01",        section: "bonus",    wide: true,   alt: "20-by-20 bonus room over the garage with a vaulted ceiling at 1204 Vickie Ln" }
    - { file: "exterior-rear-01",     section: "exterior",               alt: "Rear exterior with a covered patio overlooking the back yard at 1204 Vickie Ln" }
    - { file: "lot-01",               section: "exterior", wide: true,   alt: "Just over an acre of open yard with no neighbors directly across the street at 1204 Vickie Ln" }
---
