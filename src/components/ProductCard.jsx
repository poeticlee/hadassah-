import { Link } from 'react-router-dom'
import SmartImage from './SmartImage.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import { productMessage } from '../lib/whatsapp.js'

export default function ProductCard({ product, categoryLabel, index = 0 }) {
  return (
    <article className="card product-card" data-reveal style={{ '--i': index }}>
      <div className="product-card__media">
        <SmartImage
          slug={product.image.replace('/images/', '').replace('.webp', '')}
          alt={product.alt}
          sizes="(max-width: 640px) 92vw, (max-width: 1040px) 46vw, 300px"
          className={`focus-${product.focus || 'center'}`}
        />
        {categoryLabel ? <span className="product-card__tag">{categoryLabel}</span> : null}
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="product-card__text">{product.shortDescription}</p>
        <div className="product-card__actions">
          <WhatsAppButton size="sm" variant="ghost" message={productMessage(product.name)}>
            Enquire
          </WhatsAppButton>
          <Link className="link-arrow link-arrow--sm" to={`/products/${product.slug}`}>
            Details <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
