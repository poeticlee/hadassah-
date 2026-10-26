import { useEffect, useRef, useState } from 'react'
import { BUSINESS, MAP_EMBED, MAP_LINK } from '../data/site.js'

/**
 * Google Maps embed for the shop address. No coordinates are hard-coded: the
 * embed is a plain search for the street address, so whatever Google resolves
 * is what the visitor sees. If the embed fails to load, a direct link remains.
 */
export default function MapPanel() {
  const [state, setState] = useState('loading')
  const timer = useRef(null)

  useEffect(() => {
    timer.current = window.setTimeout(() => {
      setState((s) => (s === 'loading' ? 'loaded' : s))
    }, 6000)
    return () => window.clearTimeout(timer.current)
  }, [])

  return (
    <div className="map">
      <div className={`map__frame map__frame--${state}`}>
        {state !== 'error' ? (
          <iframe
            title={`Map showing ${BUSINESS.name} at ${BUSINESS.addressString}`}
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            onLoad={() => setState('loaded')}
            onError={() => setState('error')}
          />
        ) : null}

        {state === 'loading' ? (
          <div className="map__placeholder" aria-hidden="true">
            <span className="map__spinner" />
            <span>Loading map…</span>
          </div>
        ) : null}

        {state === 'error' ? (
          <div className="map__placeholder">
            <p>The map could not be loaded here.</p>
            <a className="link-arrow" href={MAP_LINK} target="_blank" rel="noopener noreferrer">
              Open in Google Maps <span aria-hidden="true">→</span>
            </a>
          </div>
        ) : null}
      </div>
      <p className="map__caption">
        {BUSINESS.addressString} —{' '}
        <a href={MAP_LINK} target="_blank" rel="noopener noreferrer">
          open in Google Maps
        </a>
      </p>
    </div>
  )
}
