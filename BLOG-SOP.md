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

## 1. Drafting the Post

### Using AI (ChatGPT or Claude)

Start with a prompt like:

> Write a blog post for a real estate blog aimed at Middle Tennessee homebuyers and sellers. The topic is [TOPIC]. The tone should be professional but conversational — like explaining something complex to a smart friend over coffee. Include data and sources where possible. Use markdown formatting with ## headings, bold, bullet lists, and blockquotes. Keep it between 1,500–3,000 words.

**After the draft comes back:**
- Read it all the way through — edit for your voice and opinions
- Add personal Nashville/Middle Tennessee context
- Cross-reference any statistics cited (AI can hallucinate numbers)
- Add internal links to your existing posts where relevant (see Section 5 below)

### Creating Visuals with Napkin AI

1. Paste a section of your blog into Napkin AI
2. Pick an infographic, chart, or visual that reinforces your point
3. Export as PNG (recommended) or JPG
4. Save to `assets/images/blog/` using a descriptive name (see Section 3)

### Using Images You Find Online

- Only use images that are royalty-free, Creative Commons, or your own
- Good free sources: Unsplash, Pexels, Pixabay
- Save to `assets/images/blog/`
- Resize large images before adding — aim for under 500KB per image (GitHub Pages has a 1GB repo soft limit)

---

## 2. Front Matter Template

Every post starts with this YAML block. Copy and customize:

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
| `image` | Yes | Path to featured image (see Section 3). Used for social sharing, blog cards, and post hero. |
| `categories` | Yes | Pick 1-2: `market-trends`, `affordability`, `home-maintenance`, `guides`, `local-market` |
| `tags` | Yes | 3-8 specific keywords. Lowercase, hyphenated. |
| `faq` | Optional | 2-4 Q&A pairs. Generates FAQ rich results in Google search. Strongly recommended. |

---

## 3. Images

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
image: "/market_widget/Headshot.png"
```

### Inline Images (Within the Post Body)

Use standard markdown anywhere in your post content:

```markdown
![Description of the image](/assets/images/blog/oil-prices-inflation-chart.png)
```

**Tips:**
- The `![alt text]` part should describe the image — this helps SEO and accessibility
- Place images after the paragraph they relate to, not before
- Napkin AI exports work great here — export, save to the images folder, reference in markdown

### Image Sizing Guidelines

| Type | Recommended Size | Max File Size |
|------|-----------------|---------------|
| Featured image | 1200x630px | 300KB |
| Inline infographic | 800-1200px wide | 500KB |
| Inline photo | 800-1200px wide | 400KB |

Use tinypng.com or squoosh.app to compress before adding to the repo.

---

## 4. Writing the Post Body

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

## 5. Internal Links to Other Posts

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

---

## 6. FAQ Schema (Strongly Recommended)

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

## 7. Publishing Checklist

Before publishing, verify:

- [ ] File named correctly: `YYYY-MM-DD-slug.md`
- [ ] Date in front matter matches filename date
- [ ] Description is 150-160 characters
- [ ] Excerpt is 1-2 clear sentences
- [ ] Featured image exists at the path specified in `image:`
- [ ] All inline images saved to `assets/images/blog/` and referenced correctly
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

## 8. Updating the Internal Links Table

After publishing a new post, add its slug to the table in Section 5 above so you can easily cross-link in future posts.
