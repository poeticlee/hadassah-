import { useState } from 'react'
import { CATALOGUE_MESSAGE, waLink } from '../lib/whatsapp.js'
import WhatsAppIcon from './WhatsAppIcon.jsx'

/**
 * Persistent WhatsApp entry point. Positioned clear of the page content and
 * safe areas, and dismissible so it never gets in the way.
 */
export default function FloatingWhatsApp() {
  const [hidden, setHidden] = useState(false)

  if (hidden) {
    return (
      <button
        type="button"
        className="wa-fab wa-fab--mini"
        onClick={() => setHidden(false)}
        aria-label="Show WhatsApp contact button"
      >
        <WhatsAppIcon size={20} />
      </button>
    )
  }

  return (
    <div className="wa-fab">
      <a
        className="wa-fab__main"
        href={waLink(CATALOGUE_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon size={28} />
        <span className="wa-fab__text">Order on WhatsApp</span>
      </a>
      <button
        type="button"
        className="wa-fab__close"
        onClick={() => setHidden(true)}
        aria-label="Dismiss WhatsApp button"
      >
        ×
      </button>
    </div>
  )
}
