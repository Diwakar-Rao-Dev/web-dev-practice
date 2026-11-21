import { useState } from 'react'
import './Testminions.css'

const CASES = [
  {
    id: 'home',
    label: 'Rooftop solar',
    quote:
      'A rooftop solar system can turn unused roof space into clean electricity for everyday home needs, with a design planned around the property and its energy use.',
    author: 'Residential solar',
    detail: 'Home rooftop system',
    initials: 'R',
    tone: 'sage',
  },
  {
    id: 'business',
    label: 'Commercial solar',
    quote:
      'For a business, solar planning starts with understanding daytime electricity demand and available roof or site space, then sizing a system to suit operations.',
    author: 'Commercial solar',
    detail: 'Business energy planning',
    initials: 'C',
    tone: 'gold',
  },
  {
    id: 'storage',
    label: 'Solar + battery',
    quote:
      'Pairing solar panels with battery storage can help make daytime solar energy available later, supporting evening use and backup needs where the system allows.',
    author: 'Solar + storage',
    detail: 'Battery-backed solar system',
    initials: 'S',
    tone: 'blue',
  },
]

export default function Testminions() {
  const [activeCase, setActiveCase] = useState(CASES[0])

  function handleTabKeyDown(event, currentIndex) {
    let nextIndex

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % CASES.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + CASES.length) % CASES.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = CASES.length - 1
    } else {
      return
    }

    event.preventDefault()
    setActiveCase(CASES[nextIndex])
    document.getElementById(`case-tab-${CASES[nextIndex].id}`)?.focus()
  }

  return (
    <section className="solar-stories" id="stories" aria-labelledby="solar-stories-title">
      <div className="solar-stories__intro">
        <span className="solar-stories__eyebrow">SOLAR PROJECT SPOTLIGHTS</span>
        <h2 id="solar-stories-title">Solar solutions for real energy needs</h2>
        <p>
          See how rooftop panels, commercial solar, and battery storage can
          support cleaner electricity for homes and businesses.
        </p>
      </div>

      <div className="solar-stories__card">
        <div className="solar-stories__tabs" role="tablist" aria-label="Solar customer stories">
          {CASES.map((solarCase, index) => (
            <button
              aria-controls={`case-panel-${solarCase.id}`}
              aria-selected={activeCase.id === solarCase.id}
              className={`solar-stories__tab${activeCase.id === solarCase.id ? ' is-active' : ''}`}
              id={`case-tab-${solarCase.id}`}
              key={solarCase.id}
              onClick={() => setActiveCase(solarCase)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              role="tab"
              tabIndex={activeCase.id === solarCase.id ? 0 : -1}
              type="button"
            >
              {solarCase.label}
            </button>
          ))}
        </div>

        <article
          aria-labelledby={`case-tab-${activeCase.id}`}
          className="solar-stories__panel"
          id={`case-panel-${activeCase.id}`}
          role="tabpanel"
          tabIndex={0}
        >
          <span className="solar-stories__panel-label">PROJECT SNAPSHOT</span>
          <blockquote>{activeCase.quote}</blockquote>
          <div className="solar-stories__attribution">
            <span
              aria-hidden="true"
              className={`solar-stories__avatar solar-stories__avatar--${activeCase.tone}`}
            >
              {activeCase.initials}
            </span>
            <span>
              <strong>{activeCase.author}</strong>
              <span className="solar-stories__detail">{activeCase.detail}</span>
            </span>
          </div>
        </article>
        <p className="solar-stories__note">
          Illustrative examples, not customer testimonials. Replace with
          verified project details before presenting these as completed work.
        </p>
      </div>
    </section>
  )
}