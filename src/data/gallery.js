import { PRODUCTS, EXTRA_AMENITIES } from './products.js'

const EXTRA_CAPTIONS = [
  'Guest sewing kits',
  'Compact sewing kit cards',
  'Branded hotel slippers',
  'Wrapped soap bars',
  'Pleated soap wrapping',
]

export const GALLERY = [
  ...PRODUCTS.map((p) => ({
    src: p.image,
    alt: p.alt,
    caption: p.shortName || p.name,
    category: p.category,
  })),
  ...EXTRA_AMENITIES.map((e, i) => ({
    src: e.image,
    alt: e.alt,
    caption: EXTRA_CAPTIONS[i] || 'Guest amenity',
    category: 'extras',
  })),
]

export const GALLERY_FILTERS = [
  { id: 'all', label: 'All images' },
  { id: 'toiletries', label: 'Hotel toiletries' },
  { id: 'care-kits', label: 'Personal care kits' },
  { id: 'guest-essentials', label: 'Guest essentials' },
  { id: 'textiles', label: 'Textiles & apparel' },
  { id: 'extras', label: 'Guest amenities' },
]

/** The home page teaser shows a curated cross-section. */
export const HOME_GALLERY = [
  'customised-hotel-soaps.webp',
  'mini-hotel-shampoo-bottles.webp',
  'branded-hotel-towels.webp',
  'customised-hotel-dental-kit.webp',
  'customised-hotel-sugar-sachets.webp',
  'hotel-duvet-bedding.webp',
  'customised-hotel-t-shirt.webp',
  'customised-hotel-shaving-kit.webp',
]
  .map((f) => GALLERY.find((g) => g.src === `/images/${f}`))
  .filter(Boolean)
