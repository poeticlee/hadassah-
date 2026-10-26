import { useId } from 'react'

export default function FaqItem({ item, open, onToggle, as: Heading = 'h3' }) {
  const panelId = useId()
  const buttonId = useId()

  return (
    <div className={`faq__item${open ? ' is-open' : ''}`}>
      <Heading className="faq__q">
        <button
          type="button"
          id={buttonId}
          className="faq__trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{item.question}</span>
          <span className="faq__chevron" aria-hidden="true" />
        </button>
      </Heading>
      <div id={panelId} role="region" aria-labelledby={buttonId} className="faq__panel" hidden={!open}>
        <p>{item.answer}</p>
      </div>
    </div>
  )
}
