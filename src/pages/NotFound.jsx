import { Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import { CATALOGUE_MESSAGE } from '../lib/whatsapp.js'
import usePageMeta from '../lib/seo.js'

export default function NotFound() {
  usePageMeta({
    title: 'Page not found | Hadassah Creations Concept',
    description:
      'That page could not be found. Browse our customised hotel amenities catalogue or contact us on WhatsApp.',
    path: '/404',
    noindex: true,
  })

  return (
    <div className="page page--404">
      <div className="container notfound">
        <Logo to="/" size={72} />
        <p className="notfound__code" aria-hidden="true">
          404
        </p>
        <h1 className="notfound__title">This page has been tidied away.</h1>
        <p className="notfound__text">
          The link you followed does not point to anything on this site. The catalogue, gallery and
          contact details are all still here.
        </p>
        <div className="notfound__actions">
          <Link className="btn btn--outline btn--md" to="/products">
            Browse products
          </Link>
          <WhatsAppButton message={CATALOGUE_MESSAGE}>Get a Quote on WhatsApp</WhatsAppButton>
        </div>
        <p className="notfound__home">
          <Link className="link-arrow" to="/">
            Back to the homepage <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </div>
  )
}
