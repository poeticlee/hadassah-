# Hadassah Creations Concept — Website

A production-ready, mobile-responsive website for **Hadassah Creations Concept**, a producer and
supplier of customised hotel amenities for hotels, guest houses, resorts, serviced apartments and
other accommodation providers.

Built with **React + Vite + JavaScript** and a hand-organised CSS design system (no UI framework,
no database, no cart, no payment gateway). WhatsApp is the primary conversion channel.

---

## Quick start

```bash
npm install
npm run images     # process the photography in ./images into WebP + favicons + OG image
npm run dev        # http://localhost:5173
```

Production build:

```bash
npm run build      # runs the image + sitemap scripts automatically, then vite build
npm run preview    # serve ./dist locally
```

| Script             | What it does                                                            |
| ------------------ | ----------------------------------------------------------------------- |
| `npm run dev`      | Vite dev server                                                         |
| `npm run images`   | Re-encodes `./images` → `public/images/*.webp`, favicons, `og-image.jpg` |
| `npm run sitemap`  | Regenerates `public/sitemap.xml` from the product catalogue             |
| `npm run build`    | `prebuild` (images + sitemap) then `vite build`                          |
| `npm run preview`  | Serves the production build                                             |

---

## Project structure

```
images/                      ← original product photography (source of truth)
scripts/
  process-images.mjs         ← image pipeline (WebP, responsive -sm variants, favicons, OG image)
  generate-sitemap.mjs       ← sitemap.xml generated from the catalogue
public/
  images/                    ← generated, served at /images/…
  logo-mark.svg              ← the canonical logo mark
  robots.txt, sitemap.xml, 404.html, site.webmanifest, favicons, og-image.jpg
src/
  data/
    site.js                  ← verified business details, JSON-LD builders  ← EDIT THIS for contact info
    products.js              ← the product catalogue (one entry per product)  ← EDIT THIS to add products
    gallery.js, faqs.js
  lib/
    whatsapp.js              ← wa.me link builders + pre-filled messages
    seo.js                   ← per-route title/description/canonical/OG/JSON-LD
  components/                ← Logo, Header, Footer, ProductCard, FAQ, Lightbox, ContactForm, …
  sections/                  ← Hero, BrandingShowcase, WhyChooseUs, WhoWeServe, HowToOrder, …
  pages/                     ← Home, Products, ProductDetail, CustomBranding, Gallery, Faq,
                               Contact, Privacy, NotFound
  styles/                    ← tokens.css → base.css → components.css → sections.css
```

---

## Adding a product

Open `src/data/products.js` and append an object to `PRODUCTS`:

```js
{
  slug: 'customised-hotel-robes',
  name: 'Customised Hotel Robes',
  shortName: 'Hotel Robes',
  category: 'textiles',              // must match an id in CATEGORIES
  image: '/images/customised-hotel-robes.webp',
  alt: 'Descriptive, human-readable alt text for the photo',
  focus: 'center',
  shortDescription: 'One sentence shown on the card.',
  longDescription: 'A longer paragraph for the product page.',
  highlights: ['Bullet', 'Bullet', 'Bullet'],
  keywords: ['search term'],
}
```

Then drop the photo into `./images/`, add the rename entry in
`scripts/process-images.mjs → RENAME`, and run `npm run images`.

Everything else — the catalogue page, filters, product page, related products, breadcrumbs,
structured data, gallery and `sitemap.xml` — updates automatically.

---

## ⚠️ Things to update before launch

### 1. The domain name

`https://hadassahcreationsconcept.com` is a **placeholder**. Replace it everywhere:

| File | What to change |
| --- | --- |
| `index.html` | `link[rel=canonical]`, every `og:url` / `og:image`, both `twitter:image`, the `LocalBusiness` JSON-LD `url`/`@id`/`image`/`logo` |
| `public/robots.txt` | the `Sitemap:` line |
| `src/data/site.js` | `SITE_URL` default (or set `VITE_SITE_URL` at build time) |
| `scripts/generate-sitemap.mjs` | nothing — it reads `SITE_URL` from `site.js` |

```bash
# Vercel / Netlify environment variable
VITE_SITE_URL=https://www.yourdomain.com
```

After deploying, re-run `npm run build` so the sitemap and JSON-LD pick up the real URL.

### 2. The WhatsApp number in the brief

The brief asked for `23480659579500`, but that does not match the listed telephone number
`08065979500`. The website uses the number derived from the listed phone number:

| Listed number | WhatsApp / `tel:` used |
| --- | --- |
| `08065979500` | `2348065979500` / `+2348065979500` |
| `07066457617` | `2347066457617` / `+2347066457617` |

If `23480659579500` really is correct, change it in one place: `PHONE.primary` in `src/data/site.js`
— every button on the site reads from there.

### 3. The map pin

The map embed is a **search** for `Shobu Shopping Complex, Ojoo, Ibadan, Oyo State, Nigeria`
(`MAP_QUERY` in `src/data/site.js`), not hard-coded coordinates — so no location has been
invented. Verify it resolves to the correct shop, and if you have a Google Business Profile pin,
swap `MAP_QUERY` for the exact place name or `MAP_EMBED` for a place-ID embed.

### 4. Postal code

No postal code, coordinates, opening hours, prices, ratings or reviews are published anywhere,
because none were supplied. Add the real postcode to `BUSINESS` in `src/data/site.js` and to the
JSON-LD in `index.html` once you have it.

---

## Deployment

### Vercel

1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import it at <https://vercel.com/new> — Vite is auto-detected.
3. Build command `npm run build`, output directory `dist`.
4. Add the environment variable `VITE_SITE_URL`.
5. Set the domain in **Project → Settings → Domains**.

`vercel.json` is included: SPA rewrites (`/(.*) → /index.html`) plus immutable caching for images.

### Netlify

`netlify.toml` is included (`npm run build`, `publish = dist`, SPA rewrite `/* → /index.html`).

- Connect the repo, or run `npx netlify deploy --prod --dir=dist`.
- Set `VITE_SITE_URL` under **Site settings → Environment variables**.

HTTPS is automatic on both platforms on their provided domain.

---

## SEO checklist after the domain is live

1. **Replace the placeholder domain** (see above) and rebuild.
2. **Google Search Console** — add the property (domain or URL-prefix), verify via the DNS TXT
   record or the HTML tag, then submit
   `https://yourdomain.com/sitemap.xml`.
3. **Google Business Profile** — create/claim the listing for
   *Suite 12A, Shobu Shopping Complex, Ojoo, Ibadan, Oyo State* and use the **same** name,
   address and phone numbers as the site.
4. **Bing Webmaster Tools** — optional, same sitemap.
5. Run the URL Inspection tool on `/`, `/products` and one product page to confirm indexing.
6. Re-run `npm run sitemap` whenever products change (done automatically on every build).

### Structured data published

| Type | Where | Notes |
| --- | --- | --- |
| `LocalBusiness` | `index.html` | verified name, address, both phone numbers, area served — **no** postcode, hours, price or rating |
| `Product` inside `hasOfferCatalog` | homepage runtime | name/description/category/brand/image only — deliberately **no** `offers`, `price` or `aggregateRating`, because none are published |
| `BreadcrumbList` | every inner + product route | matches the visible breadcrumb |
| `FAQPage` | `/faq` | generated from the same array the page renders, so markup always matches the copy |

Validate with the [Rich Results Test](https://search.google.com/test/rich-results) and the
[Schema.org validator](https://validator.schema.org/) once the domain is live.

---

## Accessibility & motion

- Semantic landmarks (`header`, `nav`, `main`, `footer`, `address`, `figure`), one `h1` per route.
- Skip link, visible gold focus rings, keyboard-operable menu, filters, FAQ, lightbox and form.
- Lightbox is `role="dialog" aria-modal="true"` with focus trapping, `Escape` and arrow keys.
- Colour contrast meets WCAG AA on all body and button text.
- `prefers-reduced-motion: reduce` disables every transition, animation and smooth scroll.
- The floating WhatsApp button is dismissible and clears the safe-area inset on iOS.

---

## Content policy honoured by this build

- No invented testimonials, client logos, certifications, awards, prices, market-leadership
  claims, delivery guarantees or manufacturing capacities.
- Mockup imagery is explicitly labelled as illustrative, not client work.
- Unknowable details (MOQ, pricing, lead times, delivery) always route to WhatsApp.
- No email address or social handle is published — none were supplied.
- The contact form has real behaviour: it composes the enquiry and hands it to WhatsApp, with
  validation, sending, success and popup-blocked states. Nothing is faked and nothing is stored.
