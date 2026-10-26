import Breadcrumbs from '../components/Breadcrumbs.jsx'
import ContactForm from '../components/ContactForm.jsx'
import MapPanel from '../components/MapPanel.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import { BUSINESS, PHONES, breadcrumbJsonLd } from '../data/site.js'
import usePageMeta from '../lib/seo.js'
import { CATALOGUE_MESSAGE, waLink } from '../lib/whatsapp.js'

const TRAIL = [
  { label: 'Home', to: '/' },
  { label: 'Contact', to: '/contact' },
]

export default function Contact() {
  usePageMeta({
    title: 'Contact Hadassah Creations Concept — Hotel Amenities Supplier in Ibadan, Nigeria',
    description:
      'Call 08065979500 or 07066457617, or message us on WhatsApp. Visit Suite 12A, Shobu Shopping Complex, Ojoo, Ibadan, Oyo State, Nigeria for customised hotel amenities.',
    path: '/contact',
    structuredData: breadcrumbJsonLd(TRAIL),
  })

  return (
    <div className="page page--contact">
      <header className="page__hero">
        <div className="container">
          <Breadcrumbs trail={TRAIL} />
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Let's Talk About Your Amenities"
            intro="WhatsApp is our main channel — it is the quickest way to get the catalogue, minimum order quantities and a quotation. You can also call or visit the shop."
            align="left"
          />
        </div>
      </header>

      <div className="container">
        <div className="contact-grid">
          <section className="contact-card" aria-labelledby="contact-direct-title" data-reveal>
            <h2 id="contact-direct-title" className="contact-card__title">
              Contact us directly
            </h2>

            <address className="contact-card__address">
              <strong>{BUSINESS.name}</strong>
              <br />
              {BUSINESS.streetAddress}
              <br />
              {BUSINESS.locality}, {BUSINESS.region}
              <br />
              {BUSINESS.country}
            </address>

            <ul className="contact-card__phones">
              {PHONES.map((phone, i) => (
                <li key={phone.local}>
                  <span className="contact-card__phone-label">
                    {i === 0 ? 'Primary line' : 'Second line'}
                  </span>
                  <a className="contact-card__number" href={`tel:${phone.tel}`}>
                    {phone.local}
                  </a>
                  <a
                    className="btn btn--wa btn--primary btn--sm"
                    href={waLink(CATALOGUE_MESSAGE, phone.wa)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon />
                    <span>WhatsApp this line</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="contact-card__actions">
              <WhatsAppButton block message={CATALOGUE_MESSAGE}>
                Message Hadassah Creations on WhatsApp
              </WhatsAppButton>
            </div>

            <p className="contact-card__note">
              Please note: minimum order quantities, prices, production timelines and delivery
              arrangements are confirmed per enquiry, so we do not publish them here.
            </p>
          </section>

          <section className="contact-card contact-card--map" aria-labelledby="contact-map-title" data-reveal>
            <h2 id="contact-map-title" className="contact-card__title">
              Find our shop
            </h2>
            <MapPanel />
          </section>
        </div>

        <section className="contact-form-section" aria-labelledby="contact-form-title">
          <SectionHeading
            eyebrow="Written enquiry"
            title="Send us the details"
            intro="Fill this in and we will hand it straight to WhatsApp with everything you have told us, ready for you to send."
            id="contact-form-title"
            align="left"
          />
          <ContactForm />
        </section>
      </div>
    </div>
  )
}
