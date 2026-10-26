import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'
import SmartImage from '../components/SmartImage.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import { ORDER_MESSAGE } from '../lib/whatsapp.js'

const STEPS = [
  {
    n: '01',
    title: 'Choose Your Products',
    text: 'Explore the catalogue and select the amenities you need — bathroom toiletries, personal care kits, guest essentials or branded textiles.',
    image: 'customised-hotel-soaps',
    alt: 'Wrapped customised hotel soaps chosen from the product catalogue',
    link: { to: '/products', label: 'Browse the catalogue' },
  },
  {
    n: '02',
    title: 'Tell Us Your Requirements',
    text: 'Contact us on WhatsApp with your preferred products, quantities, branding requirements and delivery location.',
    image: 'customised-hotel-t-shirt',
    alt: 'Custom printed hotel T-shirt showing branding requirements',
    link: null,
  },
  {
    n: '03',
    title: 'Receive Your Quotation',
    text: 'Discuss available options, pricing, customisation and order arrangements directly with our team.',
    image: 'branded-hotel-towels',
    alt: 'Branded hotel towels ready for quotation and delivery',
    link: null,
  },
]

export default function HowToOrder() {
  return (
    <section className="section section--order" id="how-to-order" aria-labelledby="order-title">
      <div className="container">
        <SectionHeading
          eyebrow="Simple ordering"
          title="How to Order in Three Steps"
          intro="No account, no cart, no payment gateway. Just a conversation about what your property needs."
          id="order-title"
        />

        <ol className="steps">
          {STEPS.map((step, i) => (
            <li className="step" key={step.n} data-reveal style={{ '--i': i }}>
              <div className="step__media">
                <SmartImage slug={step.image} alt={step.alt} sizes="(max-width: 720px) 92vw, 30vw" />
                <span className="step__number">{step.n}</span>
              </div>
              <div className="step__body">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {step.link ? (
                  <Link className="link-arrow link-arrow--sm" to={step.link.to}>
                    {step.link.label} <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <div className="centered-cta" data-reveal>
          <WhatsAppButton message={ORDER_MESSAGE}>Start Your Order on WhatsApp</WhatsAppButton>
        </div>
      </div>
    </section>
  )
}
