import './Footer.css'

const FOOTER_COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Solar services', href: '#services' },
      { label: 'Solar plans', href: '#pricing' },
      { label: 'Project snapshots', href: '#stories' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'About our founder', href: '#about' },
      { label: 'Solar FAQs', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__brand-block">
          <a className="site-footer__brand" href="#home" aria-label="Solar home">
            <span className="site-footer__mark" aria-hidden="true">
              S
            </span>
            <span>solar</span>
          </a>
          <p>
            Helping homes and businesses explore practical solar energy
            solutions for a brighter future.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <nav
            aria-label={`${column.title} links`}
            className="site-footer__column"
            key={column.title}
          >
            <h2>{column.title}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="site-footer__contact">
          <h2>Start a conversation</h2>
          <p>Explore solar options for your property and energy needs.</p>
          <a href="#contact">
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} Solar. All rights reserved.</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  )
}
