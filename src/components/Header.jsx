import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../data/site.js'
import { CATALOGUE_MESSAGE } from '../lib/whatsapp.js'
import Logo from './Logo.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const panelRef = useRef(null)

  // close the drawer whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname, location.hash])

  // lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const linkClass = ({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`

  return (
    <header className="header">
      <div className="container header__inner">
        <Logo />

        <nav className="nav" aria-label="Main navigation">
          <ul className="nav__list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <WhatsAppButton
            size="sm"
            label="Order on WhatsApp"
            className="header__cta"
            message={CATALOGUE_MESSAGE}
          />
          <button
            type="button"
            className={`burger${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-drawer"
        ref={panelRef}
        className={`drawer${open ? ' is-open' : ''}`}
        hidden={!open}
      >
        <nav aria-label="Mobile navigation">
          <ul className="drawer__list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <WhatsAppButton block label="Get a Quote on WhatsApp" />
        <p className="drawer__note">
          Suite 12A, Shobu Shopping Complex, Ojoo, Ibadan, Oyo State, Nigeria.
        </p>
      </div>

      {open ? (
        <button
          type="button"
          className="drawer__scrim"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </header>
  )
}
