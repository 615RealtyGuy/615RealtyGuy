# Blog Post SOP — 615RealtyGuy.com

Standard operating procedure for drafting, formatting, and publishing blog posts.

---

## Quick Reference

| Item | Detail |
|------|--------|
| Posts folder | `_posts/` |
| File naming | `YYYY-MM-DD-slug-with-dashes.md` |
| Images folder | `assets/images/blog/` |
| Publish | `git add . && git commit -m "New post: title" && git push` |
| Live URL | `615realtyguy.com/blog/slug-with-dashes/` |

---

## Step-by-Step Workflow

### Step 1: Research & Draft

1. Research your topic — gather stats, sources, data points
2. Use the AI prompt template below to generate the draft
3. Review the output — edit for your voice, verify stats, add Nashville context
4. Identify 3-6 places in the post where a visual would strengthen the content

### Step 2: Create Images

1. **Napkin AI visuals:** Paste each relevant section into Napkin AI, pick/customize a visual, export as PNG
2. **Found images:** Use royalty-free sources (Unsplash, Pexels, Pixabay) or your own photos
3. **Featured image:** Create or choose one hero image for the post (1200x630px ideal)
4. Save all images to `assets/images/blog/` using this naming pattern:
   ```
   slug-featured.png        ← the hero/thumbnail image
   slug-description.png     ← inline images
   ```
   Example for a post about zoning reform:
   ```
   zoning-reform-featured.png
   zoning-reform-density-comparison.png
   zoning-reform-permit-timeline.png
   ```
5. Compress images at tinypng.com or squoosh.app (aim for under 500KB each)

### Step 3: Assemble the Post

1. Copy the front matter template (Section 2 below)
2. Paste your drafted content below the front matter
3. Insert image references where they belong:
   ```markdown
   ![Brief description of the image](/assets/images/blog/slug-description.png)
   ```
4. Add internal links to related posts (see cross-linking table in Section 5)
5. Save as `_posts/YYYY-MM-DD-slug.md`

### Step 4: Publish

```bash
cd ~/OneDrive/Desktop/615RealtyGuy
git add _posts/YYYY-MM-DD-slug.md assets/images/blog/
git commit -m "New post: Your Post Title"
git push
```

Live in 1-2 minutes at `615realtyguy.com/blog/slug/`.

---

## AI Prompt Template

Copy this entire block into Claude or ChatGPT. Fill in the bracketed sections.

---

### PROMPT START — copy everything below this line

```
You are writing a blog post for 615RealtyGuy.com, a real estate blog by John Crowder,
a Nashville-area REALTOR with SixOneFive Real Estate Advisors.

TOPIC: [Describe your topic here. Include any specific angles, data points, or arguments you want covered.]

RESEARCH/NOTES: [Paste any research, stats, article links, or talking points you've gathered.]

REQUIREMENTS:
- Tone: Professional but conversational — like explaining something to a smart friend.
  First person where natural. Confident opinions backed by data.
- Length: 1,500–3,000 words
- Audience: Middle Tennessee homebuyers, sellers, and anyone interested in housing economics
- Add a Nashville/Middle Tennessee angle where relevant

FORMAT — follow this exactly:

1. Start with an italicized hook/subtitle line, then a --- horizontal rule
2. Use ## for main section headings, ### for subsections
3. Use **bold** for key stats and takeaways
4. Use > blockquotes for standout data or quotes
5. Use bullet lists for multi-point data
6. Separate major sections with --- horizontal rules
7. End with a sources line in italics: *Sources: Source 1, Source 2, ...*

IMAGE PLACEMENT:
- Mark 3-6 spots in the post where a visual would be valuable
- Use this exact format:  <!-- IMAGE: brief description of what visual would go here -->
- Place these AFTER the paragraph they relate to, not before
- Good image spots: data comparisons, process flows, timeline charts, stat highlights

INTERNAL LINKS — reference these existing posts where relevant (only if they genuinely connect):
- [how mortgage rates work](/blog/understanding-mortgage-rates/)
- [tariffs and housing costs](/blog/tariffs-rates-real-estate-ripple-effect/)
- [wealth inequality and housing](/blog/wealth-inequality-wage-stagnation-housing/)
- [proposed policies and housing](/blog/proposed-policies-housing-market/)
- [50-year mortgage analysis](/blog/50-year-mortgage-miracle-or-mirage/)
- [housing affordability policy vs reality](/blog/housing-affordability-policy-vs-reality/)
- [first-time buyer tips](/blog/tips-first-time-home-buyers/)
- [2024 real estate recap](/blog/2024-real-estate-recap/)
- [remote work and real estate](/blog/remote-work-revolution-real-estate/)
- [technology in real estate](/blog/tech-transforming-real-estate/)
- [insulation pros and cons](/blog/wrong-insulation-cost-more/)
- [landscaping for new construction](/blog/landscaping-new-construction-homes/)
- [spring maintenance tips](/blog/spring-home-maintenance-tips/)
- [oil prices and housing](/blog/oil-prices-mortgage-rates-housing-market/)

FAQ — at the end of your response, also provide 2-4 FAQ items in this exact format:
FAQ:
Q: [Natural question someone would Google]
A: [Concise 2-3 sentence answer, front-load the key fact]
```

### PROMPT END — copy everything above this line

---

### After the AI Returns the Draft

1. **Read the full draft** — edit for your voice, add opinions, fix anything that sounds generic
2. **Verify every stat** — AI can hallucinate numbers. Spot-check data claims against sources
3. **Find the `<!-- IMAGE: ... -->` markers** — these show where to create/place visuals
4. **Create visuals** for each marker using Napkin AI or found images
5. **Replace each marker** with the actual image markdown:
   ```markdown
   <!-- IMAGE: chart comparing 30-year vs 50-year mortgage costs -->
   ```
   becomes:
   ```markdown
   ![30-year vs 50-year mortgage cost comparison](/assets/images/blog/slug-mortgage-comparison.png)
   ```

---

## AI Prompt Template: Front Matter

After your post content is finalized, use this prompt to generate the front matter:

```
Generate Jekyll front matter for this blog post. Follow this exact YAML format:

---
layout: post
title: "[exact title in title case]"
date: [YYYY-MM-DD]
author: "John Crowder"
description: "[150-160 character SEO summary — this shows in Google results]"
excerpt: "[1-2 sentence teaser for blog cards on the homepage]"
image: "/assets/images/blog/[slug]-featured.[ext]"
categories: [[pick 1-2: market-trends, affordability, home-maintenance, guides, local-market, industry-trends, homebuying]]
tags: [[3-8 lowercase hyphenated keywords]]
faq:
  - question: "[Q1 from the FAQ section]"
    answer: "[A1]"
  - question: "[Q2]"
    answer: "[A2]"
---

Here is the blog post:
[paste your finalized post text]

And here are the FAQ items:
[paste the FAQ items from the draft]
```

---

## Front Matter Template (Manual)

If you prefer to fill it in yourself:

```yaml
---
layout: post
title: "Your Post Title Here"
date: 2026-04-15
author: "John Crowder"
description: "A 150-160 character summary for search engines and social sharing. This shows up in Google results."
excerpt: "A 1-2 sentence teaser shown on the blog index cards and homepage."
image: "/assets/images/blog/your-featured-image.png"
categories: [market-trends]
tags: [mortgage-rates, affordability, nashville]
faq:
  - question: "What is the question?"
    answer: "The concise answer. This generates FAQ schema for Google."
  - question: "Second question?"
    answer: "Second answer."
---
```

### Field-by-Field Guide

| Field | Required? | Notes |
|-------|-----------|-------|
| `layout` | Yes | Always `post` |
| `title` | Yes | Use title case. Wrap in quotes. |
| `date` | Yes | Format: `YYYY-MM-DD`. This sets post order and URL. |
| `author` | Yes | `"John Crowder"` |
| `description` | Yes | 150-160 characters. This is your SEO meta description — shows in Google snippets. |
| `excerpt` | Yes | 1-2 sentences. Shows on blog cards on the homepage and `/blog/` page. |
| `image` | Yes | Path to featured image. Used for social sharing, blog cards, and post hero. |
| `categories` | Yes | Pick 1-2: `market-trends`, `affordability`, `home-maintenance`, `guides`, `local-market` |
| `tags` | Yes | 3-8 specific keywords. Lowercase, hyphenated. |
| `faq` | Optional | 2-4 Q&A pairs. Generates FAQ rich results in Google search. Strongly recommended. |

---

## Images

### Where Images Live

All blog images go in: `assets/images/blog/`

### File Naming Convention

Use the post slug + descriptive name:

```
assets/images/blog/oil-prices-housing-featured.png
assets/images/blog/oil-prices-housing-inflation-chart.png
assets/images/blog/oil-prices-housing-timeline.png
```

### Featured Image (Thumbnail / Social Sharing)

Set in front matter:

```yaml
image: "/assets/images/blog/oil-prices-housing-featured.png"
```

This image appears in:
- Open Graph previews (Facebook, LinkedIn)
- Twitter/X card previews
- Blog index cards on `/blog/` and the homepage
- Top of the post itself
- Google structured data

**Recommended size:** 1200x630px (standard OG image ratio)

If you don't have a custom featured image, you can fall back to your headshot:

```yaml
image: "/assets/images/blog/sixonefive-default.png"
```

### Inline Images (Within the Post Body)

Use standard markdown anywhere in your post content:

```markdown
![Description of the image](/assets/images/blog/oil-prices-inflation-chart.png)
```

**Tips:**
- The `![alt text]` part should describe the image — this helps SEO and accessibility
- Place images after the paragraph or heading they relate to, not before
- Napkin AI exports work great here — export, save to the images folder, reference in markdown

### Image Sizing Guidelines

| Type | Recommended Size | Max File Size |
|------|-----------------|---------------|
| Featured image | 1200x630px | 300KB |
| Inline infographic | 800-1200px wide | 500KB |
| Inline photo | 800-1200px wide | 400KB |

Use tinypng.com or squoosh.app to compress before adding to the repo.

---

## Writing the Post Body

After the front matter `---`, write in standard markdown:

```markdown
*Italicized subtitle or hook sentence*

---

## First Section Heading

Regular paragraph text. **Bold for emphasis.** Use [links](https://example.com) sparingly.

- Bullet point one
- Bullet point two
- Bullet point three

> Blockquote for emphasis or a key stat.

![Chart showing inflation trend](/assets/images/blog/post-slug-chart.png)

## Second Section Heading

More content here...

---

## Conclusion

Wrap-up paragraph.

---

*Sources: Source 1, Source 2, Source 3*
```

### Style Guidelines

- Use `##` for main sections, `###` for subsections — don't use `#` (that's the title)
- Use `---` horizontal rules to separate major sections
- Keep paragraphs to 2-4 sentences
- Use bold sparingly for key stats or takeaways
- End with a sources line in italics
- Add a Nashville/Middle Tennessee angle where it makes sense

---

## Internal Links to Other Posts

Link to your existing posts using this format:

```markdown
As I discussed in my post on [mortgage rate mechanics](/blog/understanding-mortgage-rates/), ...
```

The URL pattern is always: `/blog/slug-from-filename/`

### Your Current Posts (for cross-linking)

| Slug | Topic |
|------|-------|
| `/blog/understanding-mortgage-rates/` | How mortgage rates work |
| `/blog/tech-transforming-real-estate/` | Technology in real estate |
| `/blog/proposed-policies-housing-market/` | 2025 policy proposals |
| `/blog/tips-first-time-home-buyers/` | First-time buyer guide |
| `/blog/wealth-inequality-wage-stagnation-housing/` | Wages vs. home prices |
| `/blog/2024-real-estate-recap/` | 2024 year in review |
| `/blog/remote-work-revolution-real-estate/` | Remote work and housing |
| `/blog/landscaping-new-construction-homes/` | New construction landscaping |
| `/blog/spring-home-maintenance-tips/` | Spring maintenance checklist |
| `/blog/wrong-insulation-cost-more/` | Insulation pros/cons |
| `/blog/tariffs-rates-real-estate-ripple-effect/` | Tariffs and housing costs |
| `/blog/50-year-mortgage-miracle-or-mirage/` | 50-year mortgage analysis |
| `/blog/housing-affordability-policy-vs-reality/` | Policy vs. affordability |
| `/blog/oil-prices-mortgage-rates-housing-market/` | Oil prices and housing |

**Remember:** Add new posts to this table after publishing.

---

## FAQ Schema (Strongly Recommended)

Adding an `faq` block to front matter generates FAQ rich results in Google — those expandable Q&A boxes that appear in search results. This significantly boosts visibility.

```yaml
faq:
  - question: "How do oil prices affect mortgage rates?"
    answer: "Oil prices rise, transportation and manufacturing costs go up, inflation rises, bond investors demand higher yields, and mortgage rates climb."
  - question: "What should buyers watch during an oil crisis?"
    answer: "Monitor mortgage rates weekly, CPI inflation reports monthly, gas prices as a real-time indicator, and the 10-year Treasury yield."
```

**Tips:**
- Write 2-4 FAQ items per post
- Use natural question phrasing (how people actually search)
- Keep answers concise (2-3 sentences)
- Front-load the answer with the key fact

---

## Publishing Checklist

Before publishing, verify:

- [ ] File named correctly: `YYYY-MM-DD-slug.md`
- [ ] Date in front matter matches filename date
- [ ] Description is 150-160 characters
- [ ] Excerpt is 1-2 clear sentences
- [ ] Featured image exists at the path specified in `image:`
- [ ] All inline images saved to `assets/images/blog/` and referenced correctly
- [ ] `<!-- IMAGE: ... -->` markers all replaced with actual `![alt](/path)` references
- [ ] Internal links use `/blog/slug/` format (not Substack URLs)
- [ ] FAQ section included (2-4 questions)
- [ ] Proofread — especially any AI-drafted stats/claims
- [ ] Images compressed (under 500KB each)

### Publish Commands

```bash
cd ~/OneDrive/Desktop/615RealtyGuy
git add _posts/YYYY-MM-DD-slug.md assets/images/blog/
git commit -m "New post: Your Post Title"
git push
```

GitHub Pages builds automatically after push. The post will be live within 1-2 minutes at `615realtyguy.com/blog/slug/`.

---

## Example: Full Workflow Walk-Through

**Topic:** "Why Homeowners Insurance Is Getting More Expensive"

1. **Research:** Gather stats on insurance rate increases, climate risk data, Tennessee-specific info
2. **Prompt AI:** Paste the prompt template with your topic and research notes
3. **Review draft:** Edit for voice, verify stats, note the `<!-- IMAGE: ... -->` spots
4. **Create images:**
   - `insurance-costs-featured.png` — Napkin AI visual of rate increases (hero image)
   - `insurance-costs-claims-by-state.png` — chart of insurance claims by state
   - `insurance-costs-premium-timeline.png` — timeline of premium increases
5. **Save images** to `assets/images/blog/`
6. **Replace markers** in the post with `![alt text](/assets/images/blog/filename.png)`
7. **Add front matter** using the template (or ask AI to generate it)
8. **Save** as `_posts/2026-04-10-homeowners-insurance-getting-expensive.md`
9. **Run checklist**, then `git add`, `git commit`, `git push`
10. **Update** the cross-linking table with the new slug
