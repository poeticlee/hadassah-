import { CATALOGUE_MESSAGE, DEFAULT_WA, waLink } from '../lib/whatsapp.js'
import WhatsAppIcon from './WhatsAppIcon.jsx'

/**
 * The site's conversion button. Always a real anchor so it behaves correctly
 * with right-click, middle-click, screen readers and the back button.
 */
export default function WhatsAppButton({
  message = CATALOGUE_MESSAGE,
  number = DEFAULT_WA,
  label = 'Get a Quote on WhatsApp',
  variant = 'primary',
  size = 'md',
  block = false,
  className = '',
  children,
}) {
  return (
    <a
      className={`btn btn--wa btn--${variant} btn--${size} ${block ? 'btn--block' : ''} ${className}`}
      href={waLink(message, number)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon />
      <span>{children ?? label}</span>
    </a>
  )
}
