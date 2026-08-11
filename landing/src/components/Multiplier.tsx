import { motion } from 'motion/react'
import { DEAL, PLACE } from '../config'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Reveal } from './ui/Reveal'
import { SectionHead } from './ui/SectionHead'
import s from './Multiplier.module.css'

const FLOORS = DEAL.far // 14

const STEPS = [
  {
    no: '01',
    title: 'יחידת קרקע',
    body: (
      <>
        חלק יחסי בקרקע פרטית בגוש {PLACE.block}, שנרשם בטאבו על שמכם כבעלים משותפים.
      </>
    ),
  },
  {
    no: '02',
    title: `× רח״ק ${DEAL.far}`,
    body: (
      <>
        לפי {PLACE.plan}, כל מטר קרקע במתחם מזכה בעד {DEAL.far} מ״ר שטח בנוי — מעל ומתחת לקרקע.
      </>
    ),
  },
  {
    no: '03',
    title: '50% מגורים',
    body: (
      <>
        הוראות התכנית קובעות שמרכיב המגורים יעמוד על <strong>לפחות 50%</strong> משטחי הבנייה.
      </>
    ),
  },
  {
    no: '04',
    title: 'דירה בתל אביב',
    body: (
      <>
        המשמעות המעשית: קרקע שמקנה דירה של{' '}
        <strong>
          {DEAL.apartmentRange[0]}–{DEAL.apartmentRange[1]} מ״ר
        </strong>{' '}
        — בעיר היקרה בישראל.
      </>
    ),
  },
]

/**
 * A measured section: one square of land at grade, fourteen slabs stacked
 * above it, and a dimension bracket spanning the built height.
 *
 * Built from HTML rather than SVG on purpose. Hebrew inside <text> reverses
 * on some mobile browsers once the SVG carries its own direction, and
 * whileInView on SVG children never fires on iOS because IntersectionObserver
 * does not observe them — which left the stack invisible. Both problems
 * disappear when the diagram is ordinary elements.
 */
function SectionDrawing() {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.figure
      className={s.section2d}
      initial={reduced ? false : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, amount: 0.35 }}
      aria-label={`מטר קרקע אחד מול ${FLOORS} מטרים בנויים — יחס רח״ק של ${FLOORS}`}
    >
      <div className={s.column}>
        <div className={s.stackWrap}>
          <div className={s.bracket} aria-hidden="true">
            <span className={s.bracketLabel}>{FLOORS} מ״ר בנויים</span>
            <span className={s.bracketLine} />
          </div>

          <div className={s.stack}>
            {Array.from({ length: FLOORS }, (_, i) => (
              <motion.span
                key={i}
                className={i === 0 ? `${s.slab} ${s.slabTop}` : s.slab}
                variants={{
                  hidden: { scaleX: 0, opacity: 0 },
                  shown: {
                    scaleX: 1,
                    opacity: 1,
                    transition: {
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.2 + (FLOORS - 1 - i) * 0.06,
                    },
                  },
                }}
              />
            ))}
          </div>

          <p className={s.ceilingNote}>ללא מגבלת קומות</p>
        </div>

        <div className={s.plot}>
          <span className={s.plotFace} />
        </div>
      </div>

      <div className={s.grade} aria-hidden="true" />
      <p className={s.plotLabel}>1 מ״ר קרקע</p>
    </motion.figure>
  )
}

export function Multiplier() {
  return (
    <section className={s.section} id="value">
      <div className={s.wrap}>
        <SectionHead
          index="01"
          label="היתרון"
          split
          title={
            <>
              כל מטר קרקע כאן שווה <em>ארבעה־עשר</em> מטרים בנויים.
            </>
          }
          lede={
            <>
              רח״ק הוא היחס בין סך השטח הבנוי לשטח הקרקע — המספר שקובע כמעט לבדו את שווי הקרקע.
              בתכנית המתאר הכוללנית של תל אביב, {PLACE.plan}, מגרש של 1.5 דונם ומעלה באזור התעסוקה
              המטרופוליני זכאי ל<strong>רח״ק מרבי של 14.0</strong>. זהו המכפיל הגבוה בישראל.
            </>
          }
        />

        <Reveal className={s.plate}>
          <SectionDrawing />
          <div className={s.readout}>
            <span className={s.ratio}>×{DEAL.far}</span>
            <p className={s.ratioNote}>
              היחס בין מה שקונים לבין מה שהקרקע מייצרת. הציור מתאר את היחס בקנה מידה — לא המחשה
              אדריכלית של הפרויקט.
            </p>
          </div>
        </Reveal>

        <div className={s.flow}>
          {STEPS.map((step, i) => (
            <Reveal
              key={step.no}
              i={i}
              as="article"
              className={`${s.step} ${i === STEPS.length - 1 ? s.final : ''}`}
            >
              <span className={s.stepNo}>{step.no}</span>
              <h3 className={s.stepTitle}>{step.title}</h3>
              <p className={s.stepBody}>{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
