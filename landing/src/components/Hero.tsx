import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { DEAL, PLACE } from '../config'
import { heroRender } from '../assets'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { ButtonLink } from './ui/Button'
import { CountUp } from './ui/CountUp'
import s from './Hero.module.css'

const RISE = {
  hidden: { y: '108%' },
  show: (i: number) => ({
    y: '0%',
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] as const, delay: 0.12 + i * 0.11 },
  }),
}

const FADE = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 + i * 0.1 },
  }),
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '32%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0])

  const [minSize, maxSize] = DEAL.apartmentRange

  return (
    <section className={s.hero} id="top" ref={ref}>
      <motion.div className={s.media} style={reduced ? undefined : { y: mediaY }}>
        <img
          src={heroRender.src}
          width={heroRender.width}
          height={heroRender.height}
          alt="הדמיית מע״ר בן צבי — מגדלי מגורים ומסחר סביב מרכז התחבורה המשולב"
          fetchPriority="high"
          decoding="async"
        />
        <div className={s.scrim} />
        <div className={s.survey} aria-hidden="true" />
      </motion.div>

      <motion.div
        className={s.inner}
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className={s.standfirst}
          initial={reduced ? false : 'hidden'}
          animate="show"
          custom={0}
          variants={FADE}
        >
          <span className={s.tick} aria-hidden="true" />
          {PLACE.city} · גוש {PLACE.block} · מע״ר בן צבי
        </motion.p>

        <h1 className={s.title}>
          {['קרקע בטאבו', 'בתל אביב'].map((line, i) => (
            <span className={s.line} key={line}>
              <motion.span
                className={s.lineInner}
                initial={reduced ? false : 'hidden'}
                animate="show"
                custom={i}
                variants={RISE}
              >
                {line}
              </motion.span>
            </span>
          ))}
          <span className={s.line}>
            <motion.span
              className={s.lineInner}
              initial={reduced ? false : 'hidden'}
              animate="show"
              custom={2}
              variants={RISE}
            >
              <span className={s.price}>690,000 ₪</span>
              <span className={s.only}>בלבד</span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          className={s.deck}
          initial={reduced ? false : 'hidden'}
          animate="show"
          custom={1}
          variants={FADE}
        >
          יחידת קרקע <strong>רשומה בטאבו על שמך</strong>, במתחם שבו תכנית המתאר של תל אביב
          מציעה <strong>זכויות בנייה של 1400%</strong>. מכפיל של <strong>×{DEAL.far} לפחות</strong> על
          כל מטר קרקע — שמשמעותו קרקע לדירה של{' '}
          <strong>
            {minSize}–{maxSize} מ״ר
          </strong>
          .
        </motion.p>

        <motion.div
          className={s.actions}
          initial={reduced ? false : 'hidden'}
          animate="show"
          custom={2}
          variants={FADE}
        >
          <ButtonLink href="#lead" variant="brass" size="lg">
            אני רוצה לשמוע פרטים
          </ButtonLink>
          <ButtonLink href="#value" variant="onDark" size="lg" arrow={false}>
            איך ×{DEAL.far} עובד?
          </ButtonLink>
        </motion.div>

        <motion.div
          className={s.strip}
          initial={reduced ? false : 'hidden'}
          animate="show"
          custom={3}
          variants={FADE}
        >
          <div className={s.cell}>
            <span className={s.cellValue}>
              <CountUp to={DEAL.far} prefix="×" />
            </span>
            <span className={s.cellLabel}>רח״ק — מכפיל זכויות</span>
          </div>
          <div className={s.cell}>
            <span className={s.cellValue}>
              <CountUp to={4} />
            </span>
            <span className={s.cellLabel}>אמצעי תחבורה במתח״ם</span>
          </div>
          <div className={s.cell}>
            <span className={s.cellValue}>
              {minSize}–{maxSize}
            </span>
            <span className={s.cellLabel}>מ״ר דירה ליחידה</span>
          </div>
          <div className={s.cell}>
            <span className={s.cellValue}>
              <CountUp to={DEAL.pricePerUnit / 1000} suffix="K ₪" />
            </span>
            <span className={s.cellLabel}>מחיר ליחידת קרקע</span>
          </div>
        </motion.div>
      </motion.div>

      <a className={s.cue} href="#value">
        <span>גללו</span>
        <span className={s.cueRail} aria-hidden="true" />
      </a>
    </section>
  )
}
