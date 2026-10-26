import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import CtaBand from '../sections/CtaBand.jsx'
import { CATEGORIES, PRODUCTS, productsByCategory } from '../data/products.js'
import usePageMeta from '../lib/seo.js'
import { breadcrumbJsonLd } from '../data/site.js'
import { CATALOGUE_MESSAGE } from '../lib/whatsapp.js'

const TRAIL = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
]

export default function Products() {
  const location = useLocation()
  const hash = location.hash.replace('#', '')
  const [filter, setFilter] = useState('all')

  usePageMeta({
    title: 'Customised Hotel Amenities & Toiletries Supplier in Nigeria | Hadassah Creations Concept',
    description:
      'Browse customised hotel soaps, shampoo, body lotion, dental kits, shaving kits, shower caps, cotton buds, sugar sachets, toothpicks, T-shirts, towels and duvets for hotels across Nigeria.',
    path: '/products',
    structuredData: breadcrumbJsonLd(TRAIL),
  })

  useEffect(() => {
    if (!hash) return
    if (hash === 'all') {
      setFilter('all')
      return
    }
    if (CATEGORIES.some((c) => c.id === hash)) setFilter(hash)
  }, [hash])

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash, filter])

  const visible = useMemo(
    () => (filter === 'all' ? PRODUCTS : productsByCategory(filter)),
    [filter],
  )

  return (
    <div className="page page--products">
      <header className="page__hero">
        <div className="container">
          <Breadcrumbs trail={TRAIL} />
          <SectionHeading
            as="h1"
            eyebrow="Product catalogue"
            title="Customised Hotel Amenities"
            intro="Every line below can be produced with your hotel name, logo and colours. Tap a product for details, or enquire directly on WhatsApp."
            align="left"
          />
        </div>
      </header>

      <div className="container">
        <div className="catalogue__head">
          <h2 className="catalogue__title" id="catalogue-grid">
            Browse the full catalogue
          </h2>
          <p className="catalogue__count" aria-live="polite">
            Showing {visible.length} of {PRODUCTS.length} products
          </p>
        </div>

        <div className="filters" role="group" aria-label="Filter products by category">
          <button
            type="button"
            className={`filter${filter === 'all' ? ' is-active' : ''}`}
            onClick={() => setFilter('all')}
            aria-pressed={filter === 'all'}
          >
            All products <span>{PRODUCTS.length}</span>
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              id={cat.id}
              type="button"
              className={`filter${filter === cat.id ? ' is-active' : ''}`}
              onClick={() => setFilter(cat.id)}
              aria-pressed={filter === cat.id}
            >
              {cat.label} <span>{productsByCategory(cat.id).length}</span>
            </button>
          ))}
        </div>

        {filter !== 'all' ? (
          <p className="filter-note">
            {CATEGORIES.find((c) => c.id === filter)?.blurb}
          </p>
        ) : null}

        <div className="product-grid product-grid--full" aria-live="polite">
          {visible.map((product, i) => (
            <ProductCard
              key={product.slug}
              product={product}
              categoryLabel={CATEGORIES.find((c) => c.id === product.category)?.label}
              index={i}
            />
          ))}
        </div>

        <div className="centered-cta" data-reveal>
          <WhatsAppButton message={CATALOGUE_MESSAGE}>
            Request Catalogue &amp; Quotation
          </WhatsAppButton>
        </div>
      </div>

      <CtaBand
        title="Need a Combination of Products?"
        text="Most buyers order several lines together. Tell us the rooms you outfit and we will suggest a coordinated range."
      />
    </div>
  )
}
