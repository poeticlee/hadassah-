import { Link } from 'react-router-dom'
import { BUSINESS, NAV_LINKS, PHONES } from '../data/site.js'
import { CATEGORIES } from '../data/products.js'
import { CATALOGUE_MESSAGE, waLink } from '../lib/whatsapp.js'
import Logo from './Logo.jsx'
import WhatsAppIcon from './WhatsAppIcon.jsx'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo to="/" variant="light" size={52} />
          <p className="footer__desc">
            Customised hotel amenities for hotels, guest houses, resorts, serviced apartments and
            accommodation providers across Nigeria.
          </p>
          <a
            className="btn btn--wa btn--primary btn--sm"
            href={waLink(CATALOGUE_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <nav className="footer__col" aria-label="Product categories">
          <h2 className="footer__heading">Products</h2>
          <ul>
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link to={`/products#${cat.id}`}>{cat.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Quick links">
          <h2 className="footer__heading">Quick links</h2>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__heading">Contact</h2>
          <address className="footer__address">
            {BUSINESS.name}
            <br />
            {BUSINESS.streetAddress}
            <br />
            {BUSINESS.locality}, {BUSINESS.region}
            <br />
            {BUSINESS.country}
          </address>
          <ul className="footer__phones">
            {PHONES.map((phone) => (
              <li key={phone.local}>
                <a href={`tel:${phone.tel}`}>{phone.local}</a>
                <span className="footer__sep" aria-hidden="true"> · </span>
                <a
                  className="footer__wa"
                  href={waLink(CATALOGUE_MESSAGE, phone.wa)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <p>
            © {year} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="footer__bar-links">
            <Link to="/products">Hotel toiletries supplier in Nigeria</Link>
            <span aria-hidden="true"> · </span>
            <Link to="/faq">Hotel amenities supplier in Ibadan</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
