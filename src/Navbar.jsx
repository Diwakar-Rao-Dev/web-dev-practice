import GooeyNav from './GooeyNav.jsx';
import './Navbar.css';

const items = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  return (
    <header className="site-header">
      <a className="site-brand" href="#home" aria-label="Northstar home">
        <span className="site-brand__mark" aria-hidden="true">N</span>
        <span>northstar</span>
      </a>
      <GooeyNav
        items={items}
        initialActiveIndex={0}
        theme="dark"
        size="md"
        frame
        particleCount={15}
        spread={56}
        animationTime={600}
        timeVariance={300}
        gooeyness={0.5}
        wobble={0.5}
        hoverEffect
      />
      <a className="site-header__cta" href="#contact">Let&apos;s talk <span aria-hidden="true">↗</span></a>
    </header>
  );
}

export default Navbar;