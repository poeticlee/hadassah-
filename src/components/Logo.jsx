import { Link } from 'react-router-dom'

/**
 * Brand lockup. The mark is the single source of truth in /public/logo-mark.svg
 * so the favicon, share image and site header can never drift apart.
 * The purple tile is legible on both light and dark backgrounds.
 */
export default function Logo({ to = '/', size = 46, variant = 'dark', onClick }) {
  const light = variant === 'light'
  const Wrapper = to ? Link : 'div'
  const props = to ? { to, onClick } : { onClick }

  return (
    <Wrapper className="logo" {...props}>
      <img className="logo__mark" src="/logo-mark.svg" width={size} height={size} alt="" aria-hidden="true" />
      <span className="logo__text">
        <span className={`logo__name ${light ? 'is-light' : ''}`}>Hadassah Creations</span>
        <span className={`logo__sub ${light ? 'is-light' : ''}`}>Concept</span>
      </span>
    </Wrapper>
  )
}
