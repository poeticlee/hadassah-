import { Link } from 'react-router-dom'
import GalleryGrid from '../components/GalleryGrid.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import { HOME_GALLERY } from '../data/gallery.js'
import { CATALOGUE_MESSAGE } from '../lib/whatsapp.js'

export default function GalleryPreview() {
  return (
    <section className="section section--gallery" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeading
          eyebrow="Gallery"
          title="Amenities, Presented Properly"
          intro="Hotel toiletries, soap packaging, branded bottles, folded towels, guest kits, apparel and luxury bedding."
          id="gallery-title"
          link={{ to: '/gallery', label: 'View the full gallery' }}
        />

        <GalleryGrid items={HOME_GALLERY} />

        <div className="centered-cta" data-reveal>
          <Link className="btn btn--outline btn--md" to="/gallery">
            See every image
          </Link>
          <WhatsAppButton message={CATALOGUE_MESSAGE}>Ask about a product you saw</WhatsAppButton>
        </div>
      </div>
    </section>
  )
}
