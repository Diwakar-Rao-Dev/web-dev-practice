import { useState } from 'react'
import './FAQ.css'

const FAQ_ITEMS = [
  {
    question: 'How does a solar power system work?',
    answer:
      'Solar panels convert sunlight into electricity for your property. An inverter makes that electricity usable by your home or business, and any additional energy may be exported or stored if your system supports it.',
  },
  {
    question: 'Will solar panels work on my roof?',
    answer:
      'It depends on factors such as roof condition, orientation, shading, available space, and local requirements. A site assessment can help determine whether your property is suitable.',
  },
  {
    question: 'Can I add a battery to my solar system?',
    answer:
      'In many cases, a compatible battery can be included in a new installation or added to an existing system. The right option depends on your inverter, usage patterns, and backup needs.',
  },
  {
    question: 'How much does solar installation cost?',
    answer:
      'Costs vary with system size, equipment, roof and site conditions, battery storage, and local installation requirements. We provide a tailored quote after understanding your property and energy needs.',
  },
  {
    question: 'How long does installation take?',
    answer:
      'The on-site work is often completed over a short installation period, but the full timeline can vary with system complexity, weather, permits, inspections, and utility approvals.',
  },
  {
    question: 'What maintenance do solar panels need?',
    answer:
      'Solar systems generally need periodic visual checks and performance monitoring. Maintenance needs depend on local weather, dust, nearby trees, and the equipment manufacturer’s guidance.',
  },
]

export default function FAQ() {
  const [openItem, setOpenItem] = useState(0)

  return (
    <>
      <section className="solar-faq" id="faq" aria-labelledby="solar-faq-title">
        <div className="solar-faq__intro">
          <span className="solar-faq__eyebrow">SOLAR FAQ</span>
          <h2 id="solar-faq-title">Questions about going solar?</h2>
          <p>Clear answers to help you plan your next step toward solar energy.</p>
        </div>

        <div className="solar-faq__list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openItem === index
            const answerId = `solar-faq-answer-${index}`
            const questionId = `solar-faq-question-${index}`

            return (
              <article className="solar-faq__item" key={item.question}>
                <h3>
                  <button
                    aria-controls={answerId}
                    aria-expanded={isOpen}
                    className="solar-faq__question"
                    id={questionId}
                    onClick={() => setOpenItem(isOpen ? null : index)}
                    type="button"
                  >
                    <span>{item.question}</span>
                    <span className="solar-faq__icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                </h3>
                <div
                  aria-labelledby={questionId}
                  className="solar-faq__answer"
                  hidden={!isOpen}
                  id={answerId}
                  role="region"
                >
                  <p>{item.answer}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="solar-contact" id="contact" aria-labelledby="solar-contact-title">
        <div>
          <span className="solar-contact__eyebrow">LET’S TALK SOLAR</span>
          <h2 id="solar-contact-title">Ready to explore your options?</h2>
          <p>
            Compare the available solar options and learn what information
            helps create a quote for your property.
          </p>
        </div>
        <a className="solar-contact__link" href="#pricing">
          Explore solar plans <span aria-hidden="true">↗</span>
        </a>
      </section>
    </>
  )
}
