import './Pricing.css'

const PLANS = [
  {
    id: 'home',
    name: 'Home Solar',
    audience: 'For homes and families',
    description:
      'A rooftop solar setup planned around your home, roof space, and electricity use.',
    features: [
      'Personalized site assessment',
      'System design and panel selection',
      'Installation coordination',
      'Performance handover',
    ],
  },
  {
    id: 'home-storage',
    name: 'Solar + Storage',
    audience: 'For more energy flexibility',
    description:
      'Solar with an optional battery system to help make generated energy available after sunset.',
    features: [
      'Everything in Home Solar',
      'Battery sizing and compatibility',
      'Backup options discussion',
      'Energy use walkthrough',
    ],
    featured: true,
  },
  {
    id: 'business',
    name: 'Business Solar',
    audience: 'For commercial properties',
    description:
      'A scalable solar solution shaped around your site, operating hours, and energy requirements.',
    features: [
      'Commercial site assessment',
      'Usage-led system proposal',
      'Installation planning',
      'Monitoring and support options',
    ],
  },
]

export default function Pricing() {
  return (
    <section className="pricing-section" id="pricing" aria-labelledby="pricing-title">
      <div className="pricing-section__intro">
        <span className="pricing-section__eyebrow">SOLAR PLANS</span>
        <h2 id="pricing-title">A plan shaped around your energy needs</h2>
        <p>
          Every roof and energy bill is different. We’ll help you find the right
          system and provide a quote based on your property and requirements.
        </p>
      </div>

      <div className="pricing-plans">
        {PLANS.map((plan) => (
          <article
            className={`pricing-plan${plan.featured ? ' pricing-plan--featured' : ''}`}
            key={plan.id}
          >
            {plan.featured && (
              <span className="pricing-plan__badge">POPULAR OPTION</span>
            )}
            <span className="pricing-plan__audience">{plan.audience}</span>
            <h3>{plan.name}</h3>
            <p className="pricing-plan__description">{plan.description}</p>
            <div className="pricing-plan__price">
              <strong>Custom quote</strong>
              <span>Based on your site assessment</span>
            </div>
            <a className="pricing-plan__link" href="#services">
              Explore services <span aria-hidden="true">↗</span>
            </a>
            <ul className="pricing-plan__features">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="pricing-section__note">
        Final system design, equipment, and pricing depend on site conditions
        and your energy needs.
      </p>
    </section>
  )
}
