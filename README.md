# Vadal — marketing website

The marketing site for **Vadal** — the engagement operating system for the whole
workforce, especially deskless/frontline teams. Built in the **Paraform** layout idiom
(centered bold hero, logo marquees, big stat callouts, mirrored audience sections, clean
cards, dark closing CTA band) rendered in Vadal's **Lumen + Aurora** brand system.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS v4** (CSS-first `@theme`), design tokens ported 1:1 from `design.md`
- **Plus Jakarta Sans** (warm humanist grotesk) via `next/font`
- No external UI deps — components, icons and product mockups are hand-built

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes prerender as static)
```

## Design law (enforced in `app/globals.css`)

- **Violet `#7C5CF8` = the user's actions** (primary buttons, links, active states).
- **The Aurora gradient = "this is intelligence."** Reserved for the hero moment, the
  SparkMark (AI logo) and data-insight highlights. The two meanings never mix.
- Type floor honoured: 16px body, 14px content minimum, 12px decorative tier only.
- Every animation has a `prefers-reduced-motion` fallback.

## Pages

`/` · `/platform` · `/solutions` + 6 solution pages (`/solutions/[slug]`) ·
`/customers` · `/demo` · `/about` · `/contact` · `/security` · `/resources` · `/login` ·
`/privacy` · `/terms` · `/gdpr` · custom 404.

## ⚠️ Content is illustrative — replace before launch

The requirement spreadsheets in `Docs/` were templated from Actimo's live site, so their
customers, metrics, addresses and legal text are **placeholders** (see `vadal.md` §3). All
copy here is rewritten in Vadal's voice, and **all proof data is clearly-marked illustrative
samples**:

- **Customers / testimonials** (Northwind Retail, Meridian Facilities, etc.) are fictional.
- **Metrics** (94% reach, 28% lower attrition, …) are sample figures.
- **Locations** (Bengaluru/Mumbai/London) and **contact emails** are samples.
- **Legal pages** (Privacy/Terms/GDPR) are templates pending counsel review.

Search the codebase for `ILLUSTRATIVE` and the “sample” notes, and swap in Vadal's verified
proof, real product screenshots, and final legal copy before shipping.

**Open brand question:** the wordmark is set lowercase (`vadal`) per the house style in the
source copy, while prose uses `Vadal`. Confirm the canonical wordmark case with Pradeep
(flagged in `design.md` §7).

## Structure

```
app/                # routes (App Router) + globals.css (design tokens)
components/          # Brand, Icon, ui primitives, SiteHeader/Footer, ProductMocks, sections
lib/content.ts      # single source of truth for crafted copy + sample data
assets/ · Docs/     # original brand assets + requirement spreadsheets (source of truth)
public/brand/       # brand SVGs served by the app
```
