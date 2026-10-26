import { useState } from 'react'
import Lightbox from './Lightbox.jsx'
import SmartImage from './SmartImage.jsx'

const slugFor = (src) => src.replace('/images/', '').replace(/\.webp$/, '')

/**
 * Responsive gallery grid with a keyboard-navigable lightbox.
 */
export default function GalleryGrid({ items, sizes = '(max-width: 640px) 46vw, (max-width: 1040px) 30vw, 22vw' }) {
  const [index, setIndex] = useState(null)

  return (
    <>
      <ul className="gallery-grid">
        {items.map((item, i) => (
          <li key={item.src} className="gallery-grid__item" data-reveal style={{ '--i': i % 4 }}>
            <button type="button" onClick={() => setIndex(i)} aria-label={`Enlarge: ${item.caption}`}>
              <SmartImage slug={slugFor(item.src)} alt={item.alt} sizes={sizes} />
              <span className="gallery-grid__caption">{item.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      {index !== null ? (
        <Lightbox
          images={items}
          index={index}
          onClose={() => setIndex(null)}
          onNavigate={setIndex}
        />
      ) : null}
    </>
  )
}
