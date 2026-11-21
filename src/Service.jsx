import './Service.css'

const SERVICES = [
  {
    code: '01',
    meta: 'Homes',
    title: 'Residential solar',
    description:
      'Make clean energy part of everyday life with a rooftop system designed around your home and energy use.',
    items: [
      'Custom rooftop system design',
      'Installation and grid connection',
      'Clear guidance on energy savings',
    ],
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=85',
    alt: 'Solar panels collecting sunlight',
  },
  {
    code: '02',
    meta: 'Businesses',
    title: 'Commercial solar',
    description:
      'Turn available roof and site space into dependable power for your operations, with a solution built to scale.',
    items: [
      'Site assessment and system planning',
      'Commercial-grade installation',
      'Performance monitoring setup',
    ],
    image:
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=85',
    alt: 'A large solar array in a sunlit landscape',
  },
  {
    code: '03',
    meta: 'Energy storage',
    title: 'Battery solutions',
    description:
      'Pair solar with battery storage to keep more of your generated energy available when the sun goes down.',
    items: [
      'Battery sizing and compatibility',
      'Backup power options',
      'Smart energy use planning',
    ],
    image:
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=85',
    alt: 'Renewable energy panels capturing sunlight',
  },
  {
    code: '04',
    meta: 'Ongoing care',
    title: 'Maintenance and support',
    description:
      'Keep your solar system working at its best with attentive care, performance checks, and practical support.',
    items: [
      'System health and performance checks',
      'Panel inspection and cleaning advice',
      'Responsive troubleshooting support',
    ],
    image:
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=85',
    alt: 'Solar panels as part of a clean energy system',
  },
]

export default function Service() {
  return (
    <section className="service-section" id="services" aria-labelledby="services-title">
      <div className="service-section__intro">
        <span className="service-section__eyebrow">SOLAR, MADE SIMPLE</span>
        <h2 id="services-title">Energy solutions for every day</h2>
        <p>
          From your first solar panels to long-term system care, we help make
          clean energy work for you.
        </p>
      </div>

      <div className="service-ledger">
        {SERVICES.map((service) => (
          <article className="service-ledger__entry" key={service.code}>
            <div className="service-ledger__number" aria-hidden="true">
              {service.code}
            </div>
            <div className="service-ledger__copy">
              <span className="service-ledger__meta">{service.meta}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <img
              className="service-ledger__image"
              src={service.image}
              alt={service.alt}
              loading="lazy"
            />
          </article>
        ))}
      </div>
    </section>
  )
}
