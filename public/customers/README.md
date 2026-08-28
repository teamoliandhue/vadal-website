# Customer logos

Used on the homepage "trusted by" marquee and the demo page
(`lib/content.ts` → `customerLogos`).

These are the trademarks of their respective owners. They appear here to
identify Vadal.ai's customers — nominative use. They do not imply endorsement
beyond the customer relationship itself.

## Provenance

Every file was downloaded from that company's own website — no logo aggregators,
no search results.

| File | Source | Notes |
|---|---|---|
| `hiresense-ai.webp` | hiresense.ai (nav logo) | trimmed to content, 600px wide |
| `recotap.svg` | recotap.com `/assets/images/logos/recotap-1.svg` | light-background variant |
| `refyne.svg` | refyne.co.in (Webflow CDN) `refyne-dark-logo.svg` | dark-ink variant, for light backgrounds |
| `neointelli.webp` | neointelli.com `/images/neointelli.webp` | trimmed to content |
| `sami-sabinsa.webp` | sami-sabinsagroup.com `/wp-content/uploads/2026/05/` | only 120×100 exists; fine at 34px display |
| `aforv.webp` | aforv.com `/assets/img/logo.png` | trimmed to content, 600px wide |

Refyne and Recotap both publish light- and dark-background variants. The ones
here are the variants meant for a **light** background — swapping them in a dark
section would make them invisible.

## Verify before adding

Render the file and look at it before committing. Searching for a logo by name
returns confident, wrong results — see `public/logos/README.md` for four real
examples of that going wrong in this repo (ADP → Groupe ADP, and so on).

Also check two things a glance misses:

1. **Trim to the content box.** `hiresense-ai` arrived with uneven padding
   (30px left, 51px bottom); untrimmed it sits visibly off-centre in the row.
2. **Render in colour.** A greyscale filter was tried first and had to be
   dropped: Refyne and Aforv both sit their mark in a solid coloured tile, and
   desaturating turns those into black squares, while Sami-Sabinsa's stacked
   lockup goes to an unreadable blob. Half this set relies on colour to read.
3. **Set `h` by optical area, not a shared height.** These marks run from 5.7:1
   (HireSense.ai) to 1.2:1 (Sami-Sabinsa). One fixed height makes the wide
   wordmarks tower over the stacked lockup. `h` in `customerLogos` is tuned per
   mark, with the stacked one capped so it does not set the row height alone.

## Adding a customer

Drop the file here and add an entry to `customerLogos` in `lib/content.ts`.
Nothing else needs touching — the marquee and the demo page both read that list.
