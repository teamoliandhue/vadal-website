# Generated product screens

84 of the 111 screens in `public/product/screens/` are generated here. The other
27 are real designs exported from the "All Pages" board in Figma — those are the
reference these are built to match, and they are never overwritten by this
generator.

## Why generated

The content spec names 111 screens across the 25 product pages. Figma holds 27.
The rest had no design, and an empty dashed frame under a caption is a worse
answer on a marketing site than a faithful mock of a screen the product really
has.

## How they match

`tokens.mjs` is not eyeballed from a screenshot. Every colour, radius, spacing
step and type size is the resolved value from the Figma file's own variable
collections (Primitives / Color / Spacing / Radius / Sizing / Type, Light mode),
read through the Figma MCP.

Two numbers deliberately ignore the tokens: the sidebar is 293px and the top bar
71px, because the Sizing collection says 264/64 but every built screen in the
file measures 293 and 71. The shipped product wins over the token.

## Layout

`archetypes.mjs` holds ten layouts — dashboard, pair, rail, board, timeline,
chat, tiles and so on. Every screen is one of them filled with its own content.
That is what keeps 84 screens looking like one product rather than 84 separate
inventions.

## Running it

    node scripts/screen-gen/render.mjs <out-dir> [name-filter]

Headless Chrome at 1600x1000, `--force-device-scale-factor=2`, then cwebp down
to 1600 wide — the same delivery size as the Figma exports. Needs Chrome at the
standard macOS path and `cwebp` on PATH. Inter is fetched once into `fonts/`;
the product UI is Inter even though the marketing site is Plus Jakarta Sans.

Then regenerate the manifest:

    node scripts/build-screen-manifest.mjs

## The content is invented

The numbers, names and comments in these screens are plausible fiction written
to be consistent with the 27 real ones — the same org (oliandhue, 12,480
people), the same teams, the same themes. They are illustrative product mocks,
not screenshots of a running system, and nothing in them is a customer figure.
