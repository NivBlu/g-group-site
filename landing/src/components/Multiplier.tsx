import { motion } from 'motion/react'
import { DEAL, PLACE } from '../config'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Reveal } from './ui/Reveal'
import { SectionHead } from './ui/SectionHead'
import s from './Multiplier.module.css'

const FLOORS = DEAL.far // 14
const FLOOR_H = 9
const GAP = 2.4
const PLOT_Y = 210
const PLOT_W = 92
const PLOT_X = 96

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
 * A measured section drawing: one square of land at grade, fourteen slabs
 * stacked above it, and a dimension line running the full height.
 * Drawn rather than decorated — the point is the ratio, so the ratio is
 * what the geometry encodes.
 */
function SectionDrawing() {
  const reduced = usePrefersReducedMotion()
  const stackH = FLOORS * FLOOR_H + (FLOORS - 1) * GAP
  const topY = PLOT_Y - 26 - stackH

  return (
    <svg
      className={s.drawing}
      viewBox="0 0 300 240"
      role="img"
      aria-label={`מטר קרקע אחד מול ${FLOORS} מטרים בנויים — יחס רח״ק של ${FLOORS}`}
    >
      {/* ground line */}
      <line className={s.hair} x1="14" y1={PLOT_Y} x2="286" y2={PLOT_Y} />
      {[...Array(11)].map((_, i) => (
        <line
          key={i}
          className={s.hairSoft}
          x1={18 + i * 25}
          y1={PLOT_Y}
          x2={12 + i * 25}
          y2={PLOT_Y + 7}
        />
      ))}

      {/* the land unit, at grade */}
      <rect
        className={s.ground}
        x={PLOT_X}
        y={PLOT_Y - 12}
        width={PLOT_W}
        height={12}
      />
      <rect
        className={s.hair}
        x={PLOT_X}
        y={PLOT_Y - 12}
        width={PLOT_W}
        height={12}
      />
      <text className={s.labelStrong} x={PLOT_X + PLOT_W / 2} y={PLOT_Y + 20} textAnchor="middle">
        1 מ״ר קרקע
      </text>

      {/* the slabs */}
      {[...Array(FLOORS)].map((_, i) => {
        const y = PLOT_Y - 26 - (i + 1) * FLOOR_H - i * GAP
        return (
          <motion.rect
            key={i}
            className={i === FLOORS - 1 ? s.slabTop : s.slab}
            x={PLOT_X}
            y={y}
            width={PLOT_W}
            height={FLOOR_H}
            initial={reduced ? false : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.25 + i * 0.075,
            }}
            style={{ transformOrigin: `${PLOT_X + PLOT_W / 2}px ${y + FLOOR_H / 2}px` }}
          />
        )
      })}

      {/* dimension line for the built height */}
      <motion.g
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 1.35 }}
      >
        <line className={s.dim} x1={PLOT_X - 22} y1={topY} x2={PLOT_X - 22} y2={PLOT_Y - 26} />
        <line className={s.dim} x1={PLOT_X - 27} y1={topY} x2={PLOT_X - 17} y2={topY} />
        <line
          className={s.dim}
          x1={PLOT_X - 27}
          y1={PLOT_Y - 26}
          x2={PLOT_X - 17}
          y2={PLOT_Y - 26}
        />
        <text
          className={s.labelBrass}
          x={PLOT_X - 32}
          y={topY + stackH / 2}
          textAnchor="end"
          dominantBaseline="middle"
        >
          {FLOORS} מ״ר בנויים
        </text>
      </motion.g>

      {/* leader to the top slab */}
      <line className={s.hairSoft} x1={PLOT_X + PLOT_W} y1={topY + 4} x2={PLOT_X + PLOT_W + 34} y2={topY + 4} />
      <text className={s.label} x={PLOT_X + PLOT_W + 38} y={topY + 6.5}>
        ללא מגבלת קומות
      </text>
    </svg>
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
