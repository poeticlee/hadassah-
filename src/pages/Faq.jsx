import Breadcrumbs from '../components/Breadcrumbs.jsx'
import FaqSection from '../components/FaqSection.jsx'
import CtaBand from '../sections/CtaBand.jsx'
import { breadcrumbJsonLd } from '../data/site.js'
import usePageMeta from '../lib/seo.js'

const TRAIL = [
  { label: 'Home', to: '/' },
  { label: 'FAQ', to: '/faq' },
]

export default function Faq() {
  usePageMeta({
    title: 'FAQ — Customised Hotel Amenities, Bulk Orders & Quotations | Hadassah Creations',
    description:
      'Answers about our customised hotel amenities: products offered, logo customisation, bulk orders, quotations, combined orders, delivery and how to contact Hadassah Creations Concept.',
    path: '/faq',
    structuredData: breadcrumbJsonLd(TRAIL),
  })

  return (
    <div className="page page--faq">
      <header className="page__hero">
        <div className="container container--narrow">
          <Breadcrumbs trail={TRAIL} />
        </div>
      </header>

      <div className="container container--narrow">
        <FaqSection
          as="h1"
          itemAs="h2"
          jsonLd
          intro="Straight answers about products, customisation, bulk orders and quotations. Anything we cannot answer here, we will confirm on WhatsApp."
        />
      </div>

      <CtaBand
        title="Still have a question?"
        text="WhatsApp is the fastest way to reach us — ask about products, quantities, branding or delivery."
      />
    </div>
  )
}
