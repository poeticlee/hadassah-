import SectionHeading from '../components/SectionHeading.jsx'
import Icon from '../components/Icon.jsx'

const REASONS = [
  {
    icon: 'badge',
    title: 'Customised Branding',
    text: 'Amenities produced with your hotel name, logo and colours, so guest rooms and bathrooms reflect your identity.',
  },
  {
    icon: 'box',
    title: 'One Convenient Supplier',
    text: 'Toiletries, personal care kits, guest essentials, textiles and apparel handled through one point of contact.',
  },
  {
    icon: 'sparkle',
    title: 'Professional Presentation',
    text: 'Consistently packed and labelled products that help rooms, bathrooms and reception areas look considered.',
  },
  {
    icon: 'briefcase',
    title: 'Business-Focused Service',
    text: 'Built around the way hospitality buyers actually purchase — by range, by quantity and by room count.',
  },
  {
    icon: 'chat',
    title: 'Convenient Enquiries',
    text: 'Discuss quantities, branding and delivery directly on WhatsApp, from any page of this website.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section section--why" aria-labelledby="why-title">
      <div className="container">
        <SectionHeading
          eyebrow="Why work with us"
          title="Why Choose Hadassah Creations Concept?"
          intro="Customised amenities do more than stock a bathroom — they carry your brand into every guest room."
          id="why-title"
        />

        <ul className="why-grid">
          {REASONS.map((r, i) => (
            <li className="why-card" key={r.title} data-reveal style={{ '--i': i }}>
              <span className="why-card__icon">
                <Icon name={r.icon} />
              </span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
