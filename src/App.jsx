import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Contact from './pages/Contact.jsx'
import CustomBranding from './pages/CustomBranding.jsx'
import Faq from './pages/Faq.jsx'
import Gallery from './pages/Gallery.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import Privacy from './pages/Privacy.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Products from './pages/Products.jsx'
import usePageMeta from './lib/seo.js'

/** Keeps browser history, focus and scroll position sensible across routes. */
function RouteEffects() {
  const { pathname, hash } = useLocation()

  usePageMeta({
    title: 'Hadassah Creations Concept — Customised Hotel Amenities Supplier in Nigeria',
    description:
      'Customised hotel amenities in Nigeria: toiletries, soaps, shampoo, dental kits, shower caps, branded towels, T-shirts and duvets for hotels, guest houses and serviced apartments.',
    path: '/',
  })

  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  useEffect(() => {
    if (!hash) return undefined
    const id = hash.replace('#', '')
    // wait one frame so section components have painted
    const raf = window.requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => window.cancelAnimationFrame(raf)
  }, [pathname, hash])

  return null
}

/** Reveals sections once as they enter the viewport. */
function useRevealOnScroll() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-reveal]')).filter(
      (n) => !n.dataset.revealObserved,
    )
    if (!nodes.length) return undefined

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-revealed'))
      return undefined
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    )

    nodes.forEach((n) => {
      n.dataset.revealObserved = 'true'
      io.observe(n)
    })
    return () => io.disconnect()
  })
}

export default function App() {
  useRevealOnScroll()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <RouteEffects />
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/custom-branding" element={<CustomBranding />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
