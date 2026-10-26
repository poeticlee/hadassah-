/**
 * Single source of truth for every verified business detail.
 * Nothing in this file may be invented — only details supplied by the client.
 */

export const BUSINESS = {
  name: 'Hadassah Creations Concept',
  tagline: 'Your Hospitality Brand. Beautifully Presented.',
  description:
    'Production and supply of customised hotel amenities for hotels, guest houses, resorts, serviced apartments and accommodation providers across Nigeria.',
  streetAddress: 'Suite 12A, Shobu Shopping Complex',
  locality: 'Ojoo',
  region: 'Ibadan, Oyo State',
  country: 'Nigeria',
  countryCode: 'NG',
  addressString: 'Suite 12A, Shobu Shopping Complex, Ojoo, Ibadan, Oyo State, Nigeria',
  /** E-mail / social handles are deliberately absent — none were supplied. */
}

/**
 * Telephone numbers as written by the client (local format) plus the digits-only
 * international form used by the tel: and wa.me protocols.
 */
export const PHONE = {
  primary: {
    local: '08065979500',
    intl: '+2348065979500',
    tel: '+2348065979500',
    wa: '2348065979500',
  },
  secondary: {
    local: '07066457617',
    intl: '+2347066457617',
    tel: '+2347066457617',
    wa: '2347066457617',
  },
}

export const PHONES = [PHONE.primary, PHONE.secondary]

/**
 * The live website address. Replace every occurrence of this value with the
 * final domain (or set VITE_SITE_URL at build time) before launch.
 */
export const SITE_URL = (
  import.meta.env?.VITE_SITE_URL || 'https://hadassahcreationsconcept.com'
).replace(/\/+$/, '')

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Custom Branding', to: '/custom-branding' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

export const MAP_QUERY = 'Shobu Shopping Complex, Ojoo, Ibadan, Oyo State, Nigeria'
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  MAP_QUERY,
)}`
export const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(
  MAP_QUERY,
)}&t=&z=15&ie=UTF8&iwloc=&output=embed`

/** Address block reused in the footer, contact page and JSON-LD. */
export function addressJsonLd() {
  return {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.streetAddress,
    addressLocality: BUSINESS.locality,
    addressRegion: 'Oyo State',
    addressCountry: BUSINESS.countryCode,
  }
}

/** LocalBusiness / Organization structured data — verified details only. */
export function organizationJsonLd(productList = []) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    description: BUSINESS.description,
    url: SITE_URL,
    telephone: [PHONE.primary.intl, PHONE.secondary.intl],
    image: `${SITE_URL}/og-image.jpg`,
    logo: `${SITE_URL}/logo-mark.svg`,
    address: addressJsonLd(),
    areaServed: [
      { '@type': 'City', name: 'Ibadan' },
      { '@type': 'State', name: 'Oyo State' },
      { '@type': 'Country', name: 'Nigeria' },
    ],
    knowsAbout: [
      'Customised hotel amenities',
      'Hotel toiletries',
      'Branded hotel textiles',
      'Hospitality guest amenities',
    ],
  }

  if (productList.length) {
    data.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Customised hotel amenities catalogue',
      itemListElement: productList.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: p.name,
          description: p.shortDescription,
          category: p.categoryLabel,
          brand: { '@type': 'Organization', name: BUSINESS.name },
          image: p.image ? `${SITE_URL}${p.image}` : undefined,
          // No offers, prices, ratings or reviews are published: none were supplied.
        },
      })),
    }
  }
  return data
}

export function breadcrumbJsonLd(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.to}`,
    })),
  }
}

export function faqJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}
