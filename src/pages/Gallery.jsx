import { useMemo, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import GalleryGrid from '../components/GalleryGrid.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import CtaBand from '../sections/CtaBand.jsx'
import { GALLERY, GALLERY_FILTERS } from '../data/gallery.js'
import { breadcrumbJsonLd } from '../data/site.js'
import usePageMeta from '../lib/seo.js'
import { CATALOGUE_MESSAGE } from '../lib/whatsapp.js'

const TRAIL = [
  { label: 'Home', to: '/' },
  { label: 'Gallery', to: '/gallery' },
]

export default function Gallery() {
  const [filter, setFilter] = useState('all')

  usePageMeta({
    title: 'Gallery of Customised Hotel Amenities, Toiletries & Branded Textiles | Hadassah',
    description:
      'Photos of customised hotel soaps, shampoo bottles, dental kits, shaving kits, shower caps, sugar sachets, toothpicks, branded towels, T-shirts and hotel duvets.',
    path: '/gallery',
    structuredData: breadcrumbJsonLd(TRAIL),
  })

  const items = useMemo(
    () => (filter === 'all' ? GALLERY : GALLERY.filter((g) => g.category === filter)),
    [filter],
  )

  return (
    <div className="page page--gallery">
      <header className="page__hero">
        <div className="container">
          <Breadcrumbs trail={TRAIL} />
          <SectionHeading
            as="h1"
            eyebrow="Gallery"
            title="Amenities, Presented Properly"
            intro="Select any image to enlarge it. Every item shown can be customised with your hotel identity."
            align="left"
          />
        </div>
      </header>

      <div className="container">
        <div className="filters" role="group" aria-label="Filter gallery images">
          {GALLERY_FILTERS.map((f) => {
            const count = f.id === 'all' ? GALLERY.length : GALLERY.filter((g) => g.category === f.id).length
            return (
              <button
                key={f.id}
                type="button"
                className={`filter${filter === f.id ? ' is-active' : ''}`}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
              >
                {f.label} <span>{count}</span>
              </button>
            )
          })}
        </div>

        {items.length ? (
          <GalleryGrid
            items={items}
            sizes="(max-width: 640px) 46vw, (max-width: 1040px) 30vw, 22vw"
          />
        ) : (
          <p className="empty-state" role="status">
            No images in this category yet.
          </p>
        )}

        <div className="centered-cta" data-reveal>
          <WhatsAppButton message={CATALOGUE_MESSAGE}>Ask about a product you saw</WhatsAppButton>
        </div>
      </div>

      <CtaBand
        title="See something you like?"
        text="Tell us which amenity you are interested in and we will send the available options, minimum order quantities and pricing."
      />
    </div>
  )
}
