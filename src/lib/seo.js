import { useEffect } from 'react'
import { SITE_URL } from '../data/site.js'

function upsertMeta(selector, attribute, value, createAttrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    Object.entries(createAttrs).forEach(([k, v]) => el.setAttribute(k, v))
    document.head.appendChild(el)
  }
  el.setAttribute(attribute, value)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = typeof data === 'string' ? data : JSON.stringify(data)
}

/**
 * Keeps title, description, canonical, Open Graph and structured data in step
 * with the current route. Values fall back to the defaults in index.html.
 */
export default function usePageMeta({
  title,
  description,
  path = '',
  image = '/og-image.jpg',
  type = 'website',
  noindex = false,
  structuredData,
}) {
  const url = `${SITE_URL}${path}`
  const fullTitle = title

  useEffect(() => {
    document.title = fullTitle
    upsertMeta('meta[name="description"]', 'content', description, { name: 'description' })
    upsertMeta('meta[name="robots"]', 'content', noindex ? 'noindex,nofollow' : 'index,follow', {
      name: 'robots',
    })
    upsertLink('canonical', url)

    const og = [
      ['og:title', fullTitle],
      ['og:description', description],
      ['og:url', url],
      ['og:image', `${SITE_URL}${image}`],
      ['og:type', type],
      ['og:site_name', 'Hadassah Creations Concept'],
    ]
    og.forEach(([p, v]) => upsertMeta(`meta[property="${p}"]`, 'content', v, { property: p }))

    upsertMeta('meta[name="twitter:card"]', 'content', 'summary_large_image', {
      name: 'twitter:card',
    })
    upsertMeta('meta[name="twitter:title"]', 'content', fullTitle, { name: 'twitter:title' })
    upsertMeta('meta[name="twitter:description"]', 'content', description, {
      name: 'twitter:description',
    })
    upsertMeta('meta[name="twitter:image"]', 'content', `${SITE_URL}${image}`, {
      name: 'twitter:image',
    })
  }, [fullTitle, description, url, image, type, noindex])

  const structuredDataJson = structuredData ? JSON.stringify(structuredData) : null

  useEffect(() => {
    if (!structuredDataJson) return undefined
    const id = 'route-structured-data'
    upsertLd(id, structuredDataJson)
    return () => {
      const el = document.getElementById(id)
      if (el) el.remove()
    }
  }, [structuredDataJson])
}

export { upsertLd }
