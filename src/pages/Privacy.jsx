import Breadcrumbs from '../components/Breadcrumbs.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import CtaBand from '../sections/CtaBand.jsx'
import { BUSINESS, PHONES, breadcrumbJsonLd } from '../data/site.js'
import usePageMeta from '../lib/seo.js'
import { CATALOGUE_MESSAGE } from '../lib/whatsapp.js'

const TRAIL = [
  { label: 'Home', to: '/' },
  { label: 'Privacy Policy', to: '/privacy' },
]

export default function Privacy() {
  usePageMeta({
    title: `Privacy Policy | ${BUSINESS.name}`,
    description: `How ${BUSINESS.name} handles the information you share when you contact us by WhatsApp, telephone or enquiry form.`,
    path: '/privacy',
    noindex: false,
    structuredData: breadcrumbJsonLd(TRAIL),
  })

  return (
    <div className="page page--privacy">
      <header className="page__hero">
        <div className="container container--narrow">
          <Breadcrumbs trail={TRAIL} />
          <SectionHeading
            as="h1"
            eyebrow="Legal"
            title="Privacy Policy"
            intro="Last updated: October 2026"
            align="left"
          />
        </div>
      </header>

      <div className="container container--narrow prose">
        <h2>What this website is</h2>
        <p>
          This website is a product catalogue and enquiry channel for {BUSINESS.name}. It does not
          contain a shopping cart, a payment gateway or customer accounts.
        </p>

        <h2>Information you give us</h2>
        <p>
          If you use the enquiry form, you may provide your name, business name, phone number,
          product of interest, quantity and a message. Submitting that form composes your details
          into a WhatsApp message and hands it to the WhatsApp application on your device. The form
          itself does not store or send your details anywhere else — no database or inbox is
          connected to it.
        </p>
        <p>
          If you contact us by WhatsApp or telephone, WhatsApp Technologies and your mobile
          network process that conversation under their own privacy policies.
        </p>

        <h2>Information this website collects automatically</h2>
        <p>
          The site does not use advertising trackers or third-party analytics. Your hosting
          provider (for example Vercel or Netlify) may record standard technical logs such as IP
          address, browser type and requested pages for security and operational purposes.
        </p>

        <h2>Cookies</h2>
        <p>
          No marketing or profiling cookies are set by this website. Web fonts are requested from
          Google Fonts, which receives the technical request needed to serve the font files.
        </p>

        <h2>How we use your details</h2>
        <p>
          We use what you send us only to answer your enquiry, prepare a quotation and arrange an
          order. We do not sell your information and we do not share it beyond what is needed to
          supply your order.
        </p>

        <h2>How long we keep it</h2>
        <p>
          Enquiry details are kept only as long as needed to handle your request and any resulting
          order, then no longer than our normal business records require.
        </p>

        <h2>Your choices</h2>
        <p>
          You can ask what information we hold about you, ask us to correct it, or ask us to delete
          it, by contacting us on WhatsApp or by calling {PHONES[0].local}.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this page if the way the website works changes. The current version is
          always published here.
        </p>

        <h2>Contact</h2>
        <p>
          {BUSINESS.name}, {BUSINESS.addressString}. Telephone:{' '}
          {PHONES.map((p) => p.local).join(' or ')}.
        </p>

        <div className="centered-cta">
          <WhatsAppButton message={CATALOGUE_MESSAGE}>Contact us on WhatsApp</WhatsAppButton>
        </div>
      </div>

      <CtaBand
        title="Questions about your information?"
        text="Ask us directly on WhatsApp and we will answer plainly."
      />
    </div>
  )
}
