import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'
import SmartImage from '../components/SmartImage.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import { BRANDING_MESSAGE } from '../lib/whatsapp.js'

const TILES = [
  { slug: 'customised-hotel-soaps', label: 'Soap wrappers', note: 'Hotel name, logo and wording' },
  { slug: 'mini-hotel-shampoo-bottles', label: 'Toiletry bottles', note: 'Coordinated labels & palette' },
  { slug: 'branded-hotel-towels', label: 'Branded towels', note: 'Embroidered hotel crest' },
  { slug: 'customised-hotel-dental-kit', label: 'Personal care kits', note: 'Printed kit packaging' },
  { slug: 'customised-hotel-t-shirt', label: 'Hotel apparel', note: 'Printed logo & colours' },
  { slug: 'hotel-duvet-bedding', label: 'Luxury bedding', note: 'Crisp, coordinated bedrooms' },
]

const PALETTE = ['#5B21B6', '#14B8A6', '#FBBF24', '#FFFBF2']

export default function BrandingShowcase({ compact = false }) {
  return (
    <section className="section section--branding" id="branding" aria-labelledby="branding-title">
      <div className="container">
        <SectionHeading
          eyebrow="Custom branding"
          title="Your Hotel Identity, On Every Detail."
          intro="Present your hotel's identity consistently with customised guest amenities designed to complement your brand."
          id="branding-title"
        />

        <ul className="palette" aria-label="Example brand palette treatment">
          {PALETTE.map((c) => (
            <li key={c}>
              <span className="palette__chip" style={{ background: c }} />
              <span className="palette__code">{c}</span>
            </li>
          ))}
        </ul>

        <div className="branding-grid">
          {TILES.map((tile, i) => (
            <figure className="branding-tile" key={tile.slug} data-reveal style={{ '--i': i }}>
              <div className="branding-tile__media">
                <SmartImage slug={tile.slug} alt="" sizes="(max-width: 720px) 92vw, 30vw" />
                <span className="branding-tile__flag">Your logo here</span>
              </div>
              <figcaption>
                <strong>{tile.label}</strong>
                <span>{tile.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="disclaimer">
          Product images are illustrative of the types of customisation available. They are not
          endorsements, client work or published partnerships.
        </p>

        <div className="centered-cta" data-reveal>
          <WhatsAppButton message={BRANDING_MESSAGE}>Discuss Your Custom Branding</WhatsAppButton>
          <Link className="btn btn--outline btn--md" to="/custom-branding">
            See the branding guide
          </Link>
        </div>
      </div>
    </section>
  )
}
