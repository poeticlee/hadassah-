import { Link } from 'react-router-dom'
import FaqSection from '../components/FaqSection.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import BrandingShowcase from '../sections/BrandingShowcase.jsx'
import CtaBand from '../sections/CtaBand.jsx'
import GalleryPreview from '../sections/GalleryPreview.jsx'
import Hero from '../sections/Hero.jsx'
import HowToOrder from '../sections/HowToOrder.jsx'
import WhyChooseUs from '../sections/WhyChooseUs.jsx'
import WhoWeServe from '../sections/WhoWeServe.jsx'
import { CATEGORIES, PRODUCTS, productsByCategory } from '../data/products.js'
import { CATALOGUE_MESSAGE } from '../lib/whatsapp.js'

export default function Home() {
  const featured = [
    'customised-hotel-soaps',
    'customised-hotel-shampoo',
    'customised-hotel-dental-kits',
    'customised-hotel-towels',
    'customised-hotel-sugar-sachets',
    'hotel-duvets',
  ]
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter(Boolean)

  return (
    <>
      <Hero />

      <section className="section section--products" id="products" aria-labelledby="products-title">
        <div className="container">
          <SectionHeading
            eyebrow="Our products"
            title="Customised Hotel Amenities, End to End"
            intro="Twelve product lines across toiletries, personal care kits, guest essentials and branded textiles — each one produced with your hotel identity applied."
            id="products-title"
            link={{ to: '/products', label: 'See the full catalogue' }}
          />

          <div className="product-grid">
            {featured.map((product, i) => (
              <ProductCard
                key={product.slug}
                product={product}
                categoryLabel={CATEGORIES.find((c) => c.id === product.category)?.label}
                index={i}
              />
            ))}
          </div>

          <div className="category-strip">
            {CATEGORIES.map((cat) => (
              <Link key={cat.id} className="category-chip" to={`/products#${cat.id}`}>
                <strong>{cat.label}</strong>
                <span>{productsByCategory(cat.id).length} products</span>
              </Link>
            ))}
          </div>

          <div className="centered-cta" data-reveal>
            <WhatsAppButton message={CATALOGUE_MESSAGE}>
              Request the Full Catalogue
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <BrandingShowcase compact />
      <WhyChooseUs />
      <WhoWeServe />
      <HowToOrder />
      <GalleryPreview />

      <section className="section section--faq" aria-label="Frequently asked questions">
        <div className="container container--narrow">
          <FaqSection intro="Straight answers about products, customisation, bulk orders and quotations." />
        </div>
      </section>

      <CtaBand
        title="Ready to Present Your Hotel Properly?"
        text="Send us your product list, quantities and branding requirements — we will come back to you with options and a quotation."
      />
    </>
  )
}
