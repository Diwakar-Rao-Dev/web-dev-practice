import './Hero.css'

const IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=85',
    alt: 'Rows of solar panels collecting sunlight',
  },
  {
    src: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=900&q=85',
    alt: 'Solar panels beneath a bright open sky',
  },
  {
    src: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=85',
    alt: 'A large solar array powering a greener future',
  },
  {
    src: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=900&q=85',
    alt: 'Solar panels installed across a rooftop',
  },
  {
    src: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=85',
    alt: 'Renewable energy infrastructure in a sunlit landscape',
  },
]

function ImageStreamHero({ images, className = '', children }) {
  return (
    <section className={`image-stream-hero ${className}`}>
      <div className="image-stream-hero__gallery" aria-label="Featured artwork">
        {[0, 1, 2].map((row) => (
          <div
            className="image-stream-hero__track"
            key={row}
            data-row={row}
          >
            <div className="image-stream-hero__set">
              {images.map((image, index) => (
                <img
                  className="image-stream-hero__image"
                  key={`${image.src}-${index}`}
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  draggable="false"
                />
              ))}
            </div>
            <div className="image-stream-hero__set" aria-hidden="true">
              {images.map((image, index) => (
                <img
                  className="image-stream-hero__image"
                  key={`${image.src}-repeat-${index}`}
                  src={image.src}
                  alt=""
                  loading="lazy"
                  draggable="false"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="image-stream-hero__shade" aria-hidden="true" />
      <div className="image-stream-hero__content">{children}</div>
    </section>
  )
}

export default function Hero() {
  return (
    <main className="hero-page" id="gallery">
      <ImageStreamHero images={IMAGES} className="hero-demo">
        <div className="hero-demo__heading">
          <h1>
            Powering a
            <br />
            brighter future.
          </h1>
        </div>
        <p className="hero-demo__description">
          Clean energy starts with the sun. Discover how solar power is shaping
          a brighter, more sustainable future.
        </p>
      </ImageStreamHero>
    </main>
  )
}
