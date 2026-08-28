# Textures

## Product stages

Backdrops the product screenshots float on (`components/ProductStage.tsx`).

| File | Role | Source |
|---|---|---|
| `product-stage.webp` | deep — the lead shot on product pages and the homepage | Unsplash photo `IVUzTbbuenU` |
| `product-band.webp` | light — behind the screen-by-screen grid | Unsplash photo `nIlwOYUbQEA` |

Both are **Unsplash License**: free for commercial use, no attribution required,
no permission needed. Confirmed before download by resolving
`unsplash.com/photos/<id>/download`, which redirects to a CDN path — a free
photo resolves to `images.unsplash.com/photo-…`, whereas an Unsplash+ (paid,
restricted) photo resolves to `images.unsplash.com/premium_photo-…`. Only
`photo-` files were taken. Downscaled to 1800w and encoded at `cwebp -q 82`,
which puts both under 15KB.

Two images cover six moods: `ProductStage` lays the layer's stop on the aurora
ramp over the photograph as a CSS gradient, so a Listening page and an
Analytics page look like different places without a second download.

Candidates that were rejected after rendering them with a mock UI on top —
worth repeating that step before swapping either file:

- pink/red gradients (`NrAvSjyW3D4`) fight the teal→violet ramp
- pale gradients (`aE8Mx8-vQss`) leave a light product window with no edge
- a warm paper texture (`2vseuo54GvA`) reads as a different brand entirely

## Section washes

The rest of this directory (`stage-*`, `crowd-*`, `result-*`, `faq/*`,
`cta-office`, `analytics-stage`) are faint office/abstract washes used behind
copy sections, generated via Higgsfield with the house grade. They are NOT
usable as product stages — they are too pale for a light UI to sit on, and
`faq/digital-workplace.webp` has AI-garbled text baked into it, so keep it small
and blurred wherever it is used.
