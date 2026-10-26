import { Link } from 'react-router-dom'
import SmartImage from '../components/SmartImage.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import { BUSINESS } from '../data/site.js'
import { CATALOGUE_MESSAGE } from '../lib/whatsapp.js'

const POINTS = [
  { label: 'Custom branding', note: 'Your logo, colours, wording' },
  { label: 'Wide amenity range', note: 'Toiletries, kits, textiles' },
  { label: 'Direct WhatsApp ordering', note: 'Talk to us in one tap' },
]

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__glow hero__glow--a" aria-hidden="true" />
      <div className="hero__glow hero__glow--b" aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="hero__dot" aria-hidden="true" />
            Customised hotel amenities · Ibadan, Nigeria
          </p>

          <h1 id="hero-title" className="hero__title">
            Premium Customised Hotel Amenities That Make{' '}
            <em>Every Stay Special.</em>
          </h1>

          <p className="hero__lead">
            From personalised hotel toiletries to branded towels, guest essentials and luxury
            bedding, Hadassah Creations Concept helps hospitality businesses create a memorable
            guest experience.
          </p>

          <div className="hero__actions">
            <WhatsAppButton message={CATALOGUE_MESSAGE}>Get a Quote on WhatsApp</WhatsAppButton>
            <Link className="btn btn--outline btn--md" to="/products">
              Explore Our Products
            </Link>
          </div>

          <p className="hero__signature">Your Hospitality Brand. Beautifully Presented.</p>

          <ul className="hero__points">
            {POINTS.map((p) => (
              <li key={p.label}>
                <span className="hero__point-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span>
                  <strong>{p.label}</strong>
                  <small>{p.note}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="collage">
            <figure className="collage__main">
              <SmartImage
                slug="mini-hotel-shampoo-bottles"
                alt=""
                eager
                sizes="(max-width: 900px) 92vw, 40vw"
              />
            </figure>

            <figure className="collage__tile collage__tile--1">
              <SmartImage slug="customised-hotel-soaps" alt="" eager sizes="26vw" />
            </figure>

            <figure className="collage__tile collage__tile--2">
              <SmartImage slug="branded-hotel-towels" alt="" eager sizes="26vw" />
            </figure>

            <figure className="collage__tile collage__tile--3">
              <SmartImage slug="customised-hotel-dental-kit" alt="" eager sizes="26vw" />
            </figure>

            <div className="collage__card collage__card--brand">
              <img src="/logo-mark.svg" width="34" height="34" alt="" />
              <span>
                <strong>Printed with your identity</strong>
                <small>Name · logo · colours</small>
              </span>
            </div>

            <div className="collage__card collage__card--wa">
              <WhatsAppIcon size={18} />
              <span>
                <strong>Quote in minutes</strong>
                <small>WhatsApp ordering</small>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__strip">
        <div className="container">
          <p>
            Trusted presentation for <strong>hotels</strong>, <strong>guest houses</strong>,{' '}
            <strong>resorts</strong>, <strong>serviced apartments</strong> and{' '}
            <strong>hospitality groups</strong> across Nigeria.
          </p>
        </div>
      </div>

      <p className="visually-hidden">
        Hadassah Creations Concept — {BUSINESS.addressString}
      </p>
    </section>
  )
}
