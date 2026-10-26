import WhatsAppButton from '../components/WhatsAppButton.jsx'
import { BUSINESS, PHONES } from '../data/site.js'
import { CATALOGUE_MESSAGE } from '../lib/whatsapp.js'

export default function CtaBand({ title, text }) {
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="container cta-band__inner" data-reveal>
        <div className="cta-band__copy">
          <h2 id="cta-band-title">{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-band__actions">
          <WhatsAppButton message={CATALOGUE_MESSAGE}>Get a Quote on WhatsApp</WhatsAppButton>
          <a className="cta-band__phone" href={`tel:${PHONES[0].tel}`}>
            or call {PHONES[0].local}
          </a>
        </div>
        <p className="cta-band__address">{BUSINESS.addressString}</p>
      </div>
    </section>
  )
}
