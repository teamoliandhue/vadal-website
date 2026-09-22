# Real product screens

43 of the screens on this site are the product itself, captured from the running
app rather than drawn. `shots.mjs` is the list; `capture.mjs` takes them.

## Why

`scripts/screen-gen` exists because the content spec names 111 screens and most
of them had no design. That is no longer true for the sixteen modules that are
built: the product at `../Vadal.ai/apps/product` has the screen, and a faithful
mock of a screen that exists is a worse answer than the screen.

## How it works

Puppeteer drives the system Chrome at 1600×1000, `deviceScaleFactor: 2`:

1. Opens the product's own origin and seeds a demo session in `localStorage`
   (sessions in that product are client-side by design), plus the light theme.
2. Goes to the route, and clicks the named tab **the way a person would** — the
   tabs are React state, so there is no URL to deep-link to. A tab that carries
   a live count ("My requests · 2") matches on its prefix.
3. Hides the floating AI dock, its proactive card and any toast. They are live
   UI, not part of the screen.
4. Shoots the viewport and lets `cwebp` resample to 1600 wide — the same
   delivery size as the Figma exports and the generated mocks.

## Naming

`file` is the kebab-case of a screen name listed for that product in
`lib/products.ts`. `build-screen-manifest.mjs` places a file only when its name
matches a listed screen, so a capture that does not appear on the site is a
naming mismatch, not a missing file.

Where the spec's screen name described something the product does not have, the
spec was changed to what it does — "Workflow Builder" became "Automations &
Rules", "Configuration & Template Library" became "Value Against the Baseline".

## Running it

Build and start the product first — a dev server is too slow to screenshot
cleanly:

    cd ../Vadal.ai/apps/product && npm run build && npx next start -p 3005

Then, from this repo:

    node scripts/capture-product/capture.mjs            # everything
    node scripts/capture-product/capture.mjs alumni     # one slug or file

Needs Chrome at the standard macOS path and `cwebp` on PATH. Set `PRODUCT_URL`
to capture from somewhere other than `http://localhost:3005`.

Afterwards:

    node scripts/build-screen-manifest.mjs

## The guard

`scripts/screen-gen/render.mjs` skips every slug/file in `shots.mjs`, so
re-generating the mocks can never overwrite a real screen.
