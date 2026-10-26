import { images } from '../data/images.gen.js'

/**
 * Renders a processed WebP with responsive sources and explicit intrinsic
 * dimensions so nothing shifts while the page loads.
 *
 * `widths` in the generated manifest is always [smWidth, fullWidth].
 */
export default function SmartImage({
  slug,
  src,
  alt,
  sizes = '(max-width: 720px) 92vw, 420px',
  eager = false,
  className = '',
  rounded = false,
  width,
  height,
}) {
  const entry = slug ? images[slug] : null
  const file = src || entry?.src

  if (!entry || !file) {
    return (
      <div
        className={`smart-image smart-image--empty ${className}`}
        role="img"
        aria-label={alt}
      />
    )
  }

  const widths = entry.widths
  const srcset =
    widths.length > 1 ? `${entry.sm} ${widths[0]}w, ${file} ${widths[widths.length - 1]}w` : undefined

  return (
    <img
      className={`smart-image ${rounded ? 'smart-image--rounded' : ''} ${className}`}
      src={file}
      srcSet={srcset}
      sizes={sizes}
      width={width ?? entry.width}
      height={height ?? Math.round(entry.width * entry.ratio)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={eager ? 'high' : undefined}
    />
  )
}
