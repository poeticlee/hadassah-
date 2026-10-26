import { useCallback, useEffect, useRef } from 'react'

/**
 * Accessible image lightbox: focus-trapped, Escape-closable, arrow-key
 * navigable and scroll-locked while open.
 */
export default function Lightbox({ images, index, onClose, onNavigate }) {
  const closeRef = useRef(null)
  const panelRef = useRef(null)

  const prev = useCallback(
    () => onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate],
  )
  const next = useCallback(
    () => onNavigate((index + 1) % images.length),
    [index, images.length, onNavigate],
  )

  useEffect(() => {
    const previous = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Tab') {
        const focusables = panelRef.current?.querySelectorAll('button, a[href]')
        if (!focusables?.length) return
        const list = Array.from(focusables)
        const first = list[0]
        const last = list[list.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  const current = images[index]

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Image gallery, image ${index + 1} of ${images.length}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="lightbox__panel" ref={panelRef}>
        <button type="button" className="lightbox__close" onClick={onClose} ref={closeRef}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close gallery</span>
        </button>

        <button
          type="button"
          className="lightbox__nav lightbox__nav--prev"
          onClick={prev}
          aria-label="Previous image"
        >
          ‹
        </button>

        <figure className="lightbox__figure">
          <img src={current.src} alt={current.alt} />
          <figcaption>
            {current.caption} <span className="lightbox__count">({index + 1}/{images.length})</span>
          </figcaption>
        </figure>

        <button
          type="button"
          className="lightbox__nav lightbox__nav--next"
          onClick={next}
          aria-label="Next image"
        >
          ›
        </button>
      </div>
    </div>
  )
}
