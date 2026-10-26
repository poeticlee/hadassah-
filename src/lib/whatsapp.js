import { PHONE } from '../data/site.js'

const BASE = 'https://wa.me'

export const WA_COLOUR = '#25D366'

/** Generic catalogue / quotation request. */
export const CATALOGUE_MESSAGE =
  'Hello Hadassah Creations Concept, I am interested in your customised hotel amenities. Please send me your product catalogue and quotation.'

/** Default number used for the site-wide buttons. */
export const DEFAULT_WA = PHONE.primary.wa

function build(number, message) {
  return `${BASE}/${number}?text=${encodeURIComponent(message)}`
}

/**
 * WhatsApp deep link.
 * @param {string} message pre-filled message
 * @param {string} [number] digits-only international number
 */
export function waLink(message = CATALOGUE_MESSAGE, number = DEFAULT_WA) {
  return build(number, message)
}

export function productMessage(productName) {
  return `Hello Hadassah Creations Concept, I would like to enquire about ${productName}. Please share the available options, minimum order quantity, and pricing.`
}

export function productLink(productName, number = DEFAULT_WA) {
  return waLink(productMessage(productName), number)
}

export const BRANDING_MESSAGE =
  "Hello Hadassah Creations Concept, I would like to discuss custom branding for my hotel's amenities. Please share the available options and how the process works."

export const ORDER_MESSAGE =
  'Hello Hadassah Creations Concept, I would like to place an order. Please let me know the next steps.'

export function telLink(number) {
  return `tel:${number}`
}
