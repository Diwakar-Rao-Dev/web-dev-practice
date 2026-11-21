import './about.css'
import Image from './assets/WhatsApp Image 2026-10-17 at 12.53.26 AM (2).jpeg'

export default function About() {
  return (
    <section className="founder-section" id="about" aria-labelledby="founder-title">
      <div className="founder-section__portrait-wrap">
        <img
          className="founder-section__portrait"
          src={Image}
          alt="Illustrative portrait, not an actual photo of Diwakar Rao"
          loading="lazy"
        />
        <span className="founder-section__portrait-note">Illustrative portrait</span>
      </div>

      <div className="founder-section__copy">
        <span className="founder-section__eyebrow">A NOTE FROM OUR FOUNDER</span>
        <h2 id="founder-title">Meet Er. Diwakar Rao</h2>
        <p>
          For Diwakar Rao, solar energy is more than a way to power homes—it is
          a practical step toward cleaner, more independent living. He founded
          Solar with a simple goal: make the move to renewable energy feel
          clear, dependable, and accessible.
        </p>
        <p>
          From the first conversation through installation and ongoing care,
          his focus is on helping every customer find a solar solution that
          fits their needs and supports a brighter energy future.
        </p>
        <div className="founder-section__signature">
          <span aria-hidden="true">—</span> Er. Diwakar Rao
        </div>
      </div>
    </section>
  )
}
