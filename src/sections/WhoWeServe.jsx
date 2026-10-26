import SectionHeading from '../components/SectionHeading.jsx'
import Icon from '../components/Icon.jsx'
import { CATALOGUE_MESSAGE, waLink } from '../lib/whatsapp.js'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'

const AUDIENCES = [
  { icon: 'hotel', title: 'Hotels and resorts', text: 'Full amenity programmes for guest rooms, bathrooms and shared spaces.' },
  { icon: 'house', title: 'Guest houses', text: 'Practical branded ranges sized for smaller, personal properties.' },
  { icon: 'key', title: 'Serviced apartments', text: 'Longer-stay essentials presented with the same hotel standard.' },
  { icon: 'gem', title: 'Boutique hotels', text: 'Distinctive branding that matches a carefully designed property.' },
  { icon: 'people', title: 'Hospitality groups', text: 'Consistent presentation across multiple properties and brands.' },
  { icon: 'calendar', title: 'Event and accommodation providers', text: 'Guest essentials for conferences, weddings and short stays.' },
]

export default function WhoWeServe() {
  return (
    <section className="section section--serve" aria-labelledby="serve-title">
      <div className="container">
        <SectionHeading
          eyebrow="Who we serve"
          title="Built for Every Kind of Stay"
          intro="From a single guest house to a group of properties, the same standard of presentation follows your guests from reception to bedroom."
          id="serve-title"
        />

        <ul className="serve-grid">
          {AUDIENCES.map((a, i) => (
            <li className="serve-card" key={a.title} data-reveal style={{ '--i': i }}>
              <span className="serve-card__icon">
                <Icon name={a.icon} size={28} />
              </span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </li>
          ))}
        </ul>

        <div className="serve-cta" data-reveal>
          <p>Not sure which range fits your property?</p>
          <a
            className="btn btn--wa btn--primary"
            href={waLink(CATALOGUE_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            <span>Ask us on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  )
}
