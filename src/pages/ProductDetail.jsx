import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import SmartImage from '../components/SmartImage.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import CtaBand from '../sections/CtaBand.jsx'
import { CATEGORIES, getProduct, relatedProducts } from '../data/products.js'
import { breadcrumbJsonLd } from '../data/site.js'
import usePageMeta from '../lib/seo.js'
import { productMessage } from '../lib/whatsapp.js'
import NotFound from './NotFound.jsx'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)
  return product ? <ProductView product={product} /> : <NotFound />
}

function ProductView({ product }) {
  const category = CATEGORIES.find((c) => c.id === product.category)
  const related = relatedProducts(product, 3)
  const trail = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    ...(category ? [{ label: category.label, to: `/products#${category.id}` }] : []),
    { label: product.name, to: `/products/${product.slug}` },
  ]

  usePageMeta({
    title: `${product.name} in Nigeria | Hotel Toiletries Supplier | Hadassah Creations Concept`,
    description: `${product.shortDescription} Customised ${product.shortName.toLowerCase()} supplied to hotels, guest houses and serviced apartments across Nigeria. Request a quotation on WhatsApp.`,
    path: `/products/${product.slug}`,
    image: product.image,
    type: 'product',
    structuredData: breadcrumbJsonLd(trail),
  })

  const imageSlug = product.image.replace('/images/', '').replace('.webp', '')

  return (
    <div className="page page--product">
      <div className="container">
        <Breadcrumbs trail={trail} />

        <div className="product-detail">
          <figure className="product-detail__media" data-reveal>
            <SmartImage
              slug={imageSlug}
              alt={product.alt}
              eager
              sizes="(max-width: 900px) 92vw, 46vw"
            />
            {category ? <figcaption>{category.label}</figcaption> : null}
          </figure>

          <div className="product-detail__body" data-reveal>
            <p className="eyebrow">{category?.label}</p>
            <h1 className="product-detail__title">{product.name}</h1>
            <p className="product-detail__lead">{product.shortDescription}</p>
            <p className="product-detail__text">{product.longDescription}</p>

            <ul className="ticks">
              {product.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <div className="product-detail__actions">
              <WhatsAppButton message={productMessage(product.name)}>
                Enquire about {product.shortName}
              </WhatsAppButton>
              <Link className="btn btn--outline btn--md" to="/products">
                Back to catalogue
              </Link>
            </div>

            <dl className="meta-list">
              <div>
                <dt>Customisation</dt>
                <dd>Hotel name, logo, colours and wording</dd>
              </div>
              <div>
                <dt>Ordering</dt>
                <dd>WhatsApp — catalogue, MOQ and pricing</dd>
              </div>
              <div>
                <dt>Serving</dt>
                <dd>Ibadan and hospitality businesses across Nigeria</dd>
              </div>
            </dl>
          </div>
        </div>

        <section className="related" aria-labelledby="related-title">
          <SectionHeading
            eyebrow="Complete the set"
            title="You may also need"
            id="related-title"
            align="left"
          />
          <div className="product-grid">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      </div>

      <CtaBand
        title={`Talk to us about ${product.shortName.toLowerCase()}`}
        text="Ask for available options, minimum order quantities and pricing — we reply on WhatsApp."
      />
    </div>
  )
}
