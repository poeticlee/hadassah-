import { useEffect, useState } from 'react'
import { FAQS } from '../data/faqs.js'
import FaqItem from './FaqItem.jsx'
import SectionHeading from './SectionHeading.jsx'

/**
 * Renders the FAQ list plus matching FAQPage structured data, so the markup
 * Google sees always matches what a visitor can read on the page.
 */
export default function FaqSection({
  heading = 'Frequently Asked Questions',
  intro,
  withHeading = true,
  as = 'h2',
  itemAs = 'h3',
  jsonLd = false,
}) {
  const [openId, setOpenId] = useState(FAQS[0].id)

  useEffect(() => {
    if (!jsonLd) return undefined
    const id = 'faqpage-structured-data'
    let el = document.getElementById(id)
    if (!el) {
      el = document.createElement('script')
      el.type = 'application/ld+json'
      el.id = id
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    })
    return () => {
      const node = document.getElementById(id)
      if (node) node.remove()
    }
  }, [jsonLd])

  return (
    <div className="faq">
      {withHeading ? (
        <SectionHeading
          as={as}
          eyebrow="Good to know"
          title={heading}
          intro={intro}
        />
      ) : null}
      <div className="faq__list">
        {FAQS.map((item) => (
          <FaqItem
            key={item.id}
            as={itemAs}
            item={item}
            open={openId === item.id}
            onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
          />
        ))}
      </div>
    </div>
  )
}
