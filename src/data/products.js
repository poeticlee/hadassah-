/**
 * Central product catalogue.
 *
 * Adding a product later is a single edit here: give it a slug, a category,
 * a summary, an image slug (see src/data/images.gen.js) and the WhatsApp
 * enquiry text. Cards, filters, product pages, sitemap and structured data
 * all update automatically.
 */

export const CATEGORIES = [
  {
    id: 'toiletries',
    label: 'Customised Hotel Toiletries',
    blurb:
      'Miniature and full-size guest toiletries carrying your hotel name, logo and colours — the first thing a guest touches on arrival.',
  },
  {
    id: 'care-kits',
    label: 'Guest Personal Care Kits',
    blurb:
      'Sealed, hygienically packed personal care essentials that make a bathroom counter look considered and complete.',
  },
  {
    id: 'guest-essentials',
    label: 'Hotel Guest Essentials',
    blurb:
      'Small in-house consumables that finish the guest experience: breakfast service sachets, table essentials and in-room touches.',
  },
  {
    id: 'textiles',
    label: 'Branded Hotel Textiles and Apparel',
    blurb:
      'Soft goods that carry your identity across bedrooms, bathrooms, spa areas and staff — towels, duvets and apparel.',
  },
]

export const PRODUCTS = [
  {
    slug: 'customised-hotel-soaps',
    name: 'Customised Hotel Soaps',
    shortName: 'Hotel Soaps',
    category: 'toiletries',
    image: '/images/customised-hotel-soaps.webp',
    alt: 'Two round customised hotel soap bars wrapped in pleated paper with branded labels',
    focus: 'center',
    shortDescription:
      'Wrapped guest soaps printed or labelled with your hotel name, logo and colours for a branded bathroom presentation.',
    longDescription:
      'Guest soap is often the first amenity a guest picks up, so it is the simplest place to carry your hotel identity. We supply customised hotel soaps wrapped and labelled to your branding — your name, logo, palette and wording — so every bathroom reads the same way, whether it is a boutique room or a serviced apartment.',
    highlights: [
      'Wrapped and labelled with your hotel identity',
      'Suitable for en-suite bathrooms, spas and guest houses',
      'Ordered alongside matching shampoo and body lotion',
    ],
    keywords: ['custom hotel soap in Nigeria', 'hotel soap supplier Ibadan', 'branded guest soap'],
  },
  {
    slug: 'customised-hotel-shampoo',
    name: 'Customised Hotel Shampoo',
    shortName: 'Hotel Shampoo',
    category: 'toiletries',
    image: '/images/mini-hotel-shampoo-bottles.webp',
    alt: 'Set of miniature hotel toiletry bottles labelled shampoo, moisturiser and shower gel',
    focus: 'center',
    shortDescription:
      'Miniature guest shampoo bottles with coordinated labels that match the rest of your bathroom amenities.',
    longDescription:
      'Miniature shampoo bottles give a bathroom a finished, hotel-standard look. We supply customised hotel shampoo in guest sizes with coordinated labelling, so bottles, soaps and lotion sit together as one designed set rather than a collection of mismatched items.',
    highlights: [
      'Guest-size bottles ready for bathroom presentation',
      'Labels coordinated with soap, lotion and shower gel',
      'Customised hotel shampoo and body lotion supplied together',
    ],
    keywords: ['customised hotel shampoo and body lotion', 'miniature hotel toiletries Nigeria'],
  },
  {
    slug: 'customised-hotel-body-lotion',
    name: 'Customised Hotel Body Lotion',
    shortName: 'Hotel Body Lotion',
    category: 'toiletries',
    image: '/images/customised-hotel-body-lotion.webp',
    alt: 'Miniature hotel body lotion bottle from a coordinated guest toiletry set',
    focus: 'center',
    shortDescription:
      'Guest body lotion bottles completing a matched toiletry set with your hotel branding applied consistently.',
    longDescription:
      'Body lotion completes the guest toiletry set. Supplied in guest sizes with labelling designed to sit alongside your customised shampoo and soap, it keeps the whole bathroom counter on-brand — a small detail that guests notice when it is missing.',
    highlights: [
      'Completes a coordinated guest toiletry set',
      'Consistent label design across every bottle',
      'Suitable for hotels, resorts and serviced apartments',
    ],
    keywords: ['customised hotel body lotion', 'hotel body lotion supplier Nigeria'],
  },
  {
    slug: 'customised-hotel-dental-kits',
    name: 'Customised Hotel Dental Kits',
    shortName: 'Hotel Dental Kits',
    category: 'care-kits',
    image: '/images/customised-hotel-dental-kit.webp',
    alt: 'Hotel dental kit containing a wrapped toothbrush and toothpaste in a printed box',
    focus: 'center',
    shortDescription:
      'Individually packed toothbrush and toothpaste sets in printed packaging carrying your hotel branding.',
    longDescription:
      'A dental kit is one of the most appreciated guest essentials, especially for overnight and business stays. We supply customised hotel dental kits packed hygienically and presented in printed packaging that carries your hotel identity alongside the toiletries in the bathroom.',
    highlights: [
      'Individually sealed for guest hygiene',
      'Printed packaging with your hotel branding',
      'A practical upgrade for business and overnight stays',
    ],
    keywords: ['hotel dental kits supplier', 'customised dental kit Nigeria'],
  },
  {
    slug: 'customised-hotel-shaving-kits',
    name: 'Customised Hotel Shaving Kits',
    shortName: 'Hotel Shaving Kits',
    category: 'care-kits',
    image: '/images/customised-hotel-shaving-kit.webp',
    alt: 'Hotel shaving kit with razor and accessories packed in a branded pouch',
    focus: 'center',
    shortDescription:
      'Packed shaving kits for guests, presented in branded pouches or cartons that match your amenity range.',
    longDescription:
      'Shaving kits round out the personal care offering in a guest bathroom. Supplied in sealed pouch or carton packing that can be matched to the design of your dental kits, soap wraps and toiletry labels, so the whole care range looks deliberately put together.',
    highlights: [
      'Sealed pouch or carton packing',
      'Design matched to the rest of your care range',
      'Useful for business, wedding and event stays',
    ],
    keywords: ['hotel shaving kits and shower caps', 'customised shaving kit Nigeria'],
  },
  {
    slug: 'customised-hotel-shower-caps',
    name: 'Customised Hotel Shower Caps',
    shortName: 'Hotel Shower Caps',
    category: 'care-kits',
    image: '/images/customised-hotel-shower-cap.webp',
    alt: 'Disposable hotel shower cap sealed in printed packaging',
    focus: 'center',
    shortDescription:
      'Sealed guest shower caps in printed packs that keep the bathroom amenities visually consistent.',
    longDescription:
      'Shower caps are a small, inexpensive amenity that guests genuinely use. We supply them sealed and packed with printed branding, so even the simplest item in the bathroom carries your hotel identity and sits neatly with the rest of the range.',
    highlights: [
      'Sealed and packed for guest hygiene',
      'Printed packs matched to your amenity design',
      'Low-cost way to extend a branded bathroom set',
    ],
    keywords: ['hotel shower caps supplier Nigeria', 'customised shower cap'],
  },
  {
    slug: 'customised-hotel-cotton-buds',
    name: 'Customised Hotel Cotton Buds',
    shortName: 'Hotel Cotton Buds',
    category: 'care-kits',
    image: '/images/customised-hotel-cotton-buds.webp',
    alt: 'Box of hotel cotton buds with printed packaging label',
    focus: 'center',
    shortDescription:
      'Guest cotton buds in printed boxes that finish a coordinated bathroom amenity set.',
    longDescription:
      'Cotton buds are a standard part of a well-stocked guest bathroom. Supplied in printed boxes that follow your amenity design, they help the bathroom look complete and consistent rather than assembled from separate purchases.',
    highlights: [
      'Printed boxes aligned to your amenity design',
      'A standard part of a complete guest bathroom',
      'Supplied alongside the wider personal care range',
    ],
    keywords: ['hotel cotton buds supplier', 'customised cotton buds Nigeria'],
  },
  {
    slug: 'customised-hotel-sugar-sachets',
    name: 'Customised Hotel Sugar Sachets',
    shortName: 'Hotel Sugar Sachets',
    category: 'guest-essentials',
    image: '/images/customised-hotel-sugar-sachets.webp',
    alt: 'Row of individually branded single-serve sugar sachets printed with hotel logos',
    focus: 'center',
    shortDescription:
      'Single-serve sugar sachets printed with your hotel or restaurant identity for in-room and breakfast service.',
    longDescription:
      'Sugar sachets travel from the room to the breakfast table, so they carry your branding further than almost any other consumable. We supply customised single-serve sachets printed with your hotel identity for in-room coffee trays, conference service and breakfast settings.',
    highlights: [
      'Single-serve portions for coffee and tea trays',
      'Printed with your hotel or restaurant identity',
      'Suited to rooms, breakfast service and events',
    ],
    keywords: ['customised sugar sachets Nigeria', 'hotel sugar sachet printing'],
  },
  {
    slug: 'customised-hotel-toothpicks',
    name: 'Customised Hotel Toothpicks',
    shortName: 'Hotel Toothpicks',
    category: 'guest-essentials',
    image: '/images/customised-hotel-toothpicks.webp',
    alt: 'Printed hotel toothpick sleeves stacked beside a wooden table',
    focus: 'center',
    shortDescription:
      'Printed toothpick sleeves for restaurant, bar and in-room service, carrying your venue identity.',
    longDescription:
      'Toothpicks are a small finishing touch for dining and bar service. Supplied in printed sleeves bearing your venue identity, they keep the details of the dining experience consistent with the rest of your branding.',
    highlights: [
      'Printed sleeves with your venue identity',
      'Suited to restaurants, bars and room service',
      'A low-cost branded detail guests notice',
    ],
    keywords: ['customised hotel toothpicks', 'printed toothpick sleeves Nigeria'],
  },
  {
    slug: 'customised-hotel-t-shirts',
    name: 'Customised Hotel T-shirts',
    shortName: 'Hotel T-shirts',
    category: 'textiles',
    image: '/images/customised-hotel-t-shirt.webp',
    alt: 'Black T-shirt printed with a large custom design, shown beside the print artwork',
    focus: 'center',
    shortDescription:
      'Hotel-branded T-shirts for staff, events and guest retail, printed with your logo and design.',
    longDescription:
      'Branded apparel keeps your hotel identity visible outside the guest room. We supply customised hotel T-shirts printed with your logo, colours and wording — practical for housekeeping and front-of-house teams, useful for events, and a popular guest retail item.',
    highlights: [
      'Printed with your logo, colours and wording',
      'For staff uniforms, events and guest retail',
      'Pairs with branded towels and gift sets',
    ],
    keywords: ['hotel T-shirts and uniforms', 'customised hotel T-shirt Nigeria'],
  },
  {
    slug: 'customised-hotel-towels',
    name: 'Customised Hotel Towels',
    shortName: 'Hotel Towels',
    category: 'textiles',
    image: '/images/branded-hotel-towels.webp',
    alt: 'Stack of white hotel towels embroidered with a hotel crest',
    focus: 'center',
    shortDescription:
      'Hotel towels embroidered or labelled with your hotel crest for bathrooms, spas and pool areas.',
    longDescription:
      'Towels are the largest branding surface in any hotel bathroom or spa. We supply customised hotel towels that can be embroidered or labelled with your hotel crest, so folded linen presents your identity the moment a guest opens the bathroom door.',
    highlights: [
      'Embroidered or labelled with your hotel crest',
      'For bathrooms, spas, pools and guest suites',
      'Supplied with matching duvets and apparel',
    ],
    keywords: ['branded hotel towels', 'customised hotel towels Nigeria'],
  },
  {
    slug: 'hotel-duvets',
    name: 'Hotel Duvets',
    shortName: 'Hotel Duvets',
    category: 'textiles',
    image: '/images/hotel-duvet-bedding.webp',
    alt: 'Luxury hotel bed dressed with a crisp white duvet and layered pillows',
    focus: 'center',
    shortDescription:
      'Hotel duvets and bedding that finish a room with the clean, layered presentation guests expect.',
    longDescription:
      'The bed sets the tone for the whole room. We supply hotel duvets and matching bedding that give bedrooms the crisp, layered presentation associated with well-run hotels — the same standard of presentation our branded amenities are designed to support.',
    highlights: [
      'Crisp, layered bedroom presentation',
      'Suited to hotels, guest houses and serviced apartments',
      'Pairs with branded towels and apparel',
    ],
    keywords: ['hotel duvets and bedding', 'hotel bedding supplier Nigeria'],
  },
]

/** Extra amenities shown in the gallery only (not part of the main catalogue). */
export const EXTRA_AMENITIES = [
  {
    image: '/images/hotel-sewing-kit-envelope.webp',
    alt: 'Hotel sewing kit in a printed kraft envelope with thread cards and buttons',
  },
  {
    image: '/images/hotel-sewing-kit-card.webp',
    alt: 'Compact hotel sewing kit card with assorted threads, needle and safety pin',
  },
  {
    image: '/images/hotel-slippers.webp',
    alt: 'Pair of white hotel slippers embroidered with a hotel name',
  },
  {
    image: '/images/wrapped-hotel-soap-bars.webp',
    alt: 'Wrapped hotel soap bars with round printed labels on a marble surface',
  },
  {
    image: '/images/hotel-cleansing-soap.webp',
    alt: 'Single hotel cleansing soap in a pleated white wrapper with a printed label',
  },
]

export function productsByCategory(categoryId) {
  return PRODUCTS.filter((p) => p.category === categoryId)
}

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function relatedProducts(product, count = 3) {
  const same = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug)
  const rest = PRODUCTS.filter((p) => p.category !== product.category)
  return [...same, ...rest].slice(0, count)
}
