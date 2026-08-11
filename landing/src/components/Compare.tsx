import { motion } from 'motion/react'
import { BENCHMARK, DEAL } from '../config'
import { gindiCompare } from '../assets'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Figure } from './ui/Figure'
import { Reveal } from './ui/Reveal'
import { SectionHead } from './ui/SectionHead'
import s from './Compare.module.css'

const SCALE_MAX = 16
const TICKS = [0, 4, 8, 12, 16]

const BARS = [
  {
    name: BENCHMARK.name,
    detail: BENCHMARK.detail,
    far: BENCHMARK.far,
    hero: false,
  },
  {
    name: 'מע״ר בן צבי — הקרקע שלנו',
    detail: 'אזור תעסוקה מטרופוליני · ללא מגבלת קומות',
    far: DEAL.far,
    hero: true,
  },
]

export function Compare() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className={s.section} id="compare">
      <div className={s.wrap}>
        <SectionHead
          index="06"
          label="פרופורציה"
          split
          title={<>כדי להבין מה זה רח״ק&nbsp;14 — צריך משהו להשוות אליו.</>}
          lede={
            <>
              אותו מטר קרקע, שני מכפילים. מתחם גינדי TLV בחשמונאים — אחד הפרויקטים הצפופים
              בתל אביב — נבנה ברח״ק {BENCHMARK.far}.
            </>
          }
        />

        <div className={s.split}>
          <Reveal className={s.chart}>
            {BARS.map((bar, i) => (
              <div key={bar.name} className={`${s.row} ${bar.hero ? s.hero : ''}`}>
                <div className={s.meta}>
                  <span className={s.name}>{bar.name}</span>
                  <span className={s.detail}>{bar.detail}</span>
                </div>
                <div className={s.track}>
                  <motion.div
                    className={s.fill}
                    initial={reduced ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 1.35,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.15 + i * 0.22,
                    }}
                    style={{ width: `${(bar.far / SCALE_MAX) * 100}%` }}
                  >
                    <span className={s.figure}>{bar.far.toFixed(1)}</span>
                  </motion.div>
                </div>
              </div>
            ))}

            <div className={s.scale} aria-hidden="true">
              {TICKS.map((t) => (
                <span key={t}>
                  <span className={s.tick} style={{ insetInlineStart: `${(t / SCALE_MAX) * 100}%` }} />
                  <span
                    className={s.tickLabel}
                    style={{ insetInlineStart: `${(t / SCALE_MAX) * 100}%` }}
                  >
                    {t}
                  </span>
                </span>
              ))}
            </div>

            <p className={s.legend}>רח״ק — יחס שטח בנוי לשטח קרקע</p>
          </Reveal>

          <Figure
            muted
            img={gindiCompare}
            alt="הדמיית מתחם גינדי TLV בחשמונאים לצורך המחשת רח״ק"
            plate="לוח 07"
            caption={`${BENCHMARK.name} — רח״ק ${BENCHMARK.far}. כמעט מחצית מהמכפיל שבמע״ר בן צבי.`}
          />
        </div>
      </div>
    </section>
  )
}
