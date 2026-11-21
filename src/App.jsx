import Navbar from './Navbar.jsx';
import Hero from './Hero.jsx';
import DepthCarousel from './DepthCarousel.jsx';
import './App.css';
import Image from './assets/pexels-amirsaeiddehghan-14589344.jpg';
import Image2 from './assets/pexels-mouli-ghosh-615183603-17394324.jpg';
import Image3 from './assets/pexels-sri-raman168-509092768-17911622.jpg';
import Image4 from './assets/WhatsApp Image 2026-10-17 at 12.53.26 AM (2).jpeg';
import image5 from './assets/WhatsApp Image 2026-10-17 at 12.53.25 AM.jpeg';


const projects = [
  {
    image: Image,
    alt: 'Bright, modern creative studio with a long shared table',
  },
  {
    image: Image2,
    alt: 'Sunlit contemporary office interior',
  },
  {
    image: Image3,
    alt: 'Minimal workspace with a view of the city',
  },
  {
    image: Image4,
    alt: 'Open-plan office filled with natural light',
  },
  {
    image: image5,
    alt: 'Thoughtfully designed collaborative workspace',
  },
];

function App() {
  return (
    <div className="page-shell">
      <Navbar />
      <main>
        <Hero />

        <section className="content-section section-wrap" id="work">
          <p className="eyebrow">01 / Selected work</p>
          <h2>Small details. <span>Big feelings.</span></h2>
          <p>We bring strategy, design, and technology together to build brands people remember.</p>
          <div className="work-carousel">
            <DepthCarousel
              items={projects}
              depth={220}
              spread={90}
              tilt={22}
              tiltDirection="right"
              perspective={1400}
              visibleCards={4}
              falloff={0.2}
              blur={6}
              autoplay
              loop
            />
          </div>
        </section>

        <section className="content-section content-section--accent section-wrap" id="about">
          <p className="eyebrow">02 / About us</p>
          <h2>Curious minds, <span>working as one.</span></h2>
          <p>A close-knit creative team focused on thoughtful partnerships and meaningful outcomes.</p>
        </section>

        <section className="content-section section-wrap" id="contact">
          <p className="eyebrow">03 / Get in touch</p>
          <h2>Have a good one <span>in mind?</span></h2>
          <a className="hero__link" href="mailto:hello@northstar.studio">hello@northstar.studio <span aria-hidden="true">↗</span></a>
        </section>
      </main>
    </div>
  );
}

export default App;