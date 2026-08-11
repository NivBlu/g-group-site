# G-Group — מע"ר בן צבי landing page

React + TypeScript + Vite. Builds to `../downtown/`, which is what the site serves.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + build into ../downtown/
```

`npm run build` empties and rewrites `../downtown/` — commit that output alongside
the source, since the site is served as static files with no CI build step.

## Where to change things

Every number and contact detail on the page comes from **`src/config.ts`**:

- `CONTACT.whatsapp` / `CONTACT.phone` — currently placeholders
- `CONTACT.formEndpoint` — leave empty and the lead form opens a prefilled
  WhatsApp message instead of posting; set it to a Formspree/Make/Zapier URL to
  POST JSON, with WhatsApp kept as the failure fallback
- `DEAL.pricePerUnit`, `landPerUnit`, `far`, `residentialShare` — drive the hero,
  the calculator, the pricing block and the form options
- `DEAL.unitsTotal` / `unitsLeft` — the availability bar

Imagery lives in `src/assets/` and is imported (not string-referenced) so Vite
hashes it. Each export carries its intrinsic width/height — keep those accurate
when swapping an image, or lazy loading will shift the layout.

## Design notes

Editorial/architectural rather than dark-glass-card: paper stock, hairline rules,
a numbered section system, and data set as printed tables. Type is Frank Ruhl
Libre (display), Heebo (text) and Bellefair (labels), all RTL-first.

All motion is gated behind `prefers-reduced-motion`.
