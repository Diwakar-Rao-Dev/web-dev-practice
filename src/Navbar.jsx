import { useState } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="site-header" id="home">
      <a className="site-brand" href="#home" onClick={closeMenu} aria-label="Solar home">
        <span className="site-brand__mark" aria-hidden="true">
          S
        </span>
        <span>solar</span>
      </a>

      <button
        className="site-menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <nav
        className={`site-navigation${menuOpen ? ' is-open' : ''}`}
        id="site-navigation"
        aria-label="Main navigation"
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a className="site-navigation__link" href={href} key={href} onClick={closeMenu}>
            {label}
          </a>
        ))}
      </nav>

      <a className="site-header__cta" href="#gallery">
        Explore gallery
        <span aria-hidden="true">↗</span>
      </a>
    </header>
  )
}
