import { useState } from 'react'
import { PRODUCTS } from '../data/products.js'
import { DEFAULT_WA, waLink } from '../lib/whatsapp.js'
import WhatsAppIcon from './WhatsAppIcon.jsx'

const EMPTY = {
  name: '',
  business: '',
  phone: '',
  product: '',
  quantity: '',
  message: '',
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please tell us your name.'
  if (!values.phone.trim()) errors.phone = 'Please add a phone number we can reach you on.'
  else if (!/^[+\d][\d\s()-]{6,}$/.test(values.phone.trim()))
    errors.phone = 'Please enter a valid phone number.'
  if (!values.message.trim()) errors.message = 'Please describe what you need.'
  return errors
}

function compose(values) {
  const lines = [
    'Hello Hadassah Creations Concept, I would like to request a quotation.',
    '',
    `Name: ${values.name.trim()}`,
  ]
  if (values.business.trim()) lines.push(`Business: ${values.business.trim()}`)
  lines.push(`Phone: ${values.phone.trim()}`)
  if (values.product) lines.push(`Product of interest: ${values.product}`)
  if (values.quantity.trim()) lines.push(`Quantity: ${values.quantity.trim()}`)
  lines.push('', values.message.trim())
  lines.push('', 'Please share the available options, minimum order quantity and pricing.')
  return lines.join('\n')
}

/**
 * The enquiry form. There is no server-side inbox to post to, so the form
 * composes the enquiry and hands it to WhatsApp — the client's real ordering
 * channel. Nothing is silently discarded and no fake success is shown.
 */
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | blocked | invalid
  const [fallback, setFallback] = useState(null)

  const update = (key) => (e) => {
    const { value } = e.target
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
    if (status === 'invalid') setStatus('idle')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    if (Object.values(found).some(Boolean)) {
      setErrors(found)
      setStatus('invalid')
      return
    }
    setStatus('sending')
    setFallback(null)
    const url = waLink(compose(values), DEFAULT_WA)

    // give the browser a frame so the "preparing" state actually paints
    window.setTimeout(() => {
      const win = window.open(url, '_blank', 'noopener,noreferrer')
      if (win) {
        setStatus('sent')
      } else {
        setStatus('blocked')
        setFallback(url)
      }
    }, 350)
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setStatus('idle')
    setFallback(null)
  }

  const field = (key) => ({
    id: `cf-${key}`,
    name: key,
    value: values[key],
    onChange: update(key),
    'aria-invalid': errors[key] ? 'true' : undefined,
    'aria-describedby': errors[key] ? `cf-${key}-error` : undefined,
  })

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__grid">
        <div className="form__field">
          <label htmlFor="cf-name">Your name *</label>
          <input type="text" autoComplete="name" placeholder="e.g. Adaeze Okafor" {...field('name')} />
          {errors.name ? (
            <p className="form__error" id="cf-name-error">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="form__field">
          <label htmlFor="cf-business">Business name</label>
          <input
            type="text"
            autoComplete="organization"
            placeholder="Hotel, guest house or company"
            {...field('business')}
          />
        </div>

        <div className="form__field">
          <label htmlFor="cf-phone">Phone number *</label>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0800 000 0000"
            {...field('phone')}
          />
          {errors.phone ? (
            <p className="form__error" id="cf-phone-error">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="form__field">
          <label htmlFor="cf-quantity">Quantity</label>
          <input type="text" inputMode="numeric" placeholder="e.g. 500 pieces" {...field('quantity')} />
        </div>

        <div className="form__field form__field--wide">
          <label htmlFor="cf-product">Product of interest</label>
          <select {...field('product')}>
            <option value="">Select a product (optional)</option>
            {PRODUCTS.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
            <option value="Several products / full catalogue">Several products / full catalogue</option>
          </select>
        </div>

        <div className="form__field form__field--wide">
          <label htmlFor="cf-message">What do you need? *</label>
          <textarea
            rows={5}
            placeholder="Products, branding requirements, delivery location…"
            {...field('message')}
          />
          {errors.message ? (
            <p className="form__error" id="cf-message-error">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <p className="form__hint">
        This form sends your enquiry through WhatsApp, our main ordering channel. Pressing “Send”
        opens WhatsApp with your message ready — nothing is stored on this website.
      </p>

      <div className="form__actions">
        <button
          type="submit"
          className="btn btn--wa btn--primary"
          disabled={status === 'sending'}
          aria-busy={status === 'sending'}
        >
          <WhatsAppIcon />
          <span>{status === 'sending' ? 'Preparing your enquiry…' : 'Send Enquiry on WhatsApp'}</span>
        </button>
        {values.name || values.message ? (
          <button type="button" className="btn btn--text" onClick={reset}>
            Clear form
          </button>
        ) : null}
      </div>

      {status === 'invalid' ? (
        <p className="form__status form__status--error" role="alert">
          Please check the highlighted fields and try again.
        </p>
      ) : null}

      {status === 'sent' ? (
        <p className="form__status form__status--ok" role="status">
          WhatsApp has been opened in a new tab with your enquiry ready to send. If it did not
          open, use the direct WhatsApp buttons on this page or call 08065979500.
        </p>
      ) : null}

      {status === 'blocked' && fallback ? (
        <div className="form__status form__status--warn" role="alert">
          <p>Your browser blocked the new tab. Open your enquiry manually:</p>
          <a className="btn btn--wa btn--primary btn--sm" href={fallback} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            <span>Open WhatsApp</span>
          </a>
        </div>
      ) : null}
    </form>
  )
}
