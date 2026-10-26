import Breadcrumbs from '../components/Breadcrumbs.jsx'
import Icon from '../components/Icon.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import SmartImage from '../components/SmartImage.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import CtaBand from '../sections/CtaBand.jsx'
import { breadcrumbJsonLd } from '../data/site.js'
import usePageMeta from '../lib/seo.js'
import { BRANDING_MESSAGE } from '../lib/whatsapp.js'

const TRAIL = [
  { label: 'Home', to: '/' },
  { label: 'Custom Branding', to: '/custom-branding' },
]

const CAN_CUSTOMISE = [
  { icon: 'badge', title: 'Soap wrappers', text: 'Hotel name, logo and wording on every wrapped bar.' },
  { icon: 'box', title: 'Bottle labels', text: 'Coordinated shampoo, lotion and shower gel labels.' },
  { icon: 'sparkle', title: 'Kit packaging', text: 'Printed dental and shaving kit packs and pouches.' },
  { icon: 'gem', title: 'Towels', text: 'Embroidered or labelled with your hotel crest.' },
  { icon: 'people', title: 'Apparel', text: 'T-shirts printed with your logo, colours and wording.' },
  { icon: 'hotel', title: 'Bedding', text: 'Duvets and linen completing a coordinated room.' },
]

const PROCESS = [
  {
    n: '01',
    title: 'Send your identity',
    text: 'Share your hotel logo, brand colours and any wording you want applied, together with the products you need.',
  },
  {
    n: '02',
    title: 'Agree the treatment',
    text: 'We talk through which items can carry your identity and how, so you know exactly what will be produced before anything is made.',
  },
  {
    n: '03',
    title: 'Produce and supply',
    text: 'Your order is produced and supplied as agreed, ready to place in guest rooms, bathrooms and reception areas.',
  },
]

export default function CustomBranding() {
  usePageMeta({
    title: 'Custom Branded Hotel Amenities & Toiletries | Hadassah Creations Concept, Ibadan',
    description:
      'Put your hotel logo, colours and wording on soaps, shampoo bottles, dental kits, towels, T-shirts and duvets. Custom-branded hospitality products supplied across Nigeria.',
    path: '/custom-branding',
    structuredData: breadcrumbJsonLd(TRAIL),
  })

  return (
    <div className="page page--branding">
      <header className="page__hero page__hero--branding">
        <div className="container">
          <Breadcrumbs trail={TRAIL} />
          <div className="branding-hero">
            <div className="branding-hero__copy">
              <p className="eyebrow">Custom branding</p>
              <h1>Your Hotel Identity, On Every Detail.</h1>
              <p className="lead">
                Present your hotel's identity consistently with customised guest amenities designed
                to complement your brand — from the first wrapped soap a guest picks up to the
                towels, bedding and staff apparel they see throughout the property.
              </p>
              <div className="hero__actions">
                <WhatsAppButton message={BRANDING_MESSAGE}>
                  Discuss Your Custom Branding
                </WhatsAppButton>
              </div>
            </div>

            <div className="branding-hero__mock">
              <figure className="mock-card">
                <SmartImage
                  slug="customised-hotel-soaps"
                  alt="Wrapped guest soaps shown as an example of customised hotel soap packaging"
                  eager
                  sizes="(max-width: 900px) 92vw, 34vw"
                />
                <figcaption>
                  <span className="mock-card__chip">Your logo here</span>
                </figcaption>
              </figure>
              <ul className="swatches" aria-label="Example brand colour swatches">
                <li style={{ background: '#5B21B6', color: '#FFFFFF' }}>
                  <span>Royal purple</span>
                </li>
                <li style={{ background: '#14B8A6', color: '#04312C' }}>
                  <span>Turquoise</span>
                </li>
                <li style={{ background: '#FBBF24', color: '#3B2F00' }}>
                  <span>Golden yellow</span>
                </li>
                <li style={{ background: '#FFFBF2', color: '#3B2F00' }}>
                  <span>Soft cream</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <section className="section" aria-labelledby="customise-title">
        <div className="container">
          <SectionHeading
            eyebrow="Where your brand appears"
            title="What We Can Customise"
            intro="Amenities are the surfaces your guests touch most often. Each one can carry the same identity."
            id="customise-title"
          />
          <ul className="why-grid why-grid--six">
            {CAN_CUSTOMISE.map((item, i) => (
              <li className="why-card" key={item.title} data-reveal style={{ '--i': i }}>
                <span className="why-card__icon">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="branding-process-title">
        <div className="container">
          <SectionHeading
            eyebrow="How it works"
            title="From Logo to Guest Room"
            id="branding-process-title"
          />
          <ol className="process">
            {PROCESS.map((step, i) => (
              <li key={step.n} data-reveal style={{ '--i': i }}>
                <span className="process__n">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="disclaimer">
            Product images on this website illustrate the types of customisation available. They
            are not published client work, partnerships or endorsements.
          </p>
        </div>
      </section>

      <CtaBand
        title="Let's Brand Your Amenities"
        text="Send your logo and brand colours on WhatsApp and tell us which products you need — we will take it from there."
      />
    </div>
  )
}
