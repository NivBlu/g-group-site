import { motion } from 'motion/react'
import { DEAL, derived } from '../config'
import { num } from '../lib/format'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { ButtonLink } from './ui/Button'
import { Reveal } from './ui/Reveal'
import { SectionHead } from './ui/SectionHead'
import s from './Pricing.module.css'

export function Pricing() {
  const reduced = usePrefersReducedMotion()
  const sold = (DEAL.unitsTotal - DEAL.unitsLeft) / DEAL.unitsTotal
  const [minSize, maxSize] = DEAL.apartmentRange

  const includes = [
    `חלק יחסי בקרקע בשטח של כ־${DEAL.landPerUnit} מ״ר`,
    `כ־${num(derived.rightsPerUnit)} מ״ר זכויות בנייה מוצעות (רח״ק ${DEAL.far})`,
    `מתוכן כ־${num(derived.residentialPerUnit)} מ״ר מגורים — דירה של ${minSize}–${maxSize} מ״ר`,
    'ליווי נאמן, עורכי דין ומנהלת קבוצה',
    'אפשרות לרכישת מספר יחידות',
  ]

  return (
    <section className={s.section}>
      <div className={s.wrap}>
        <SectionHead
          index="08"
          label="יחידת קרקע · מע״ר בן צבי"
          onDark
          title={<>מחיר אחד, שקוף, ליחידה.</>}
        />

        <Reveal className={s.card}>
          <div>
            <p className={s.label}>מחיר ליחידה</p>
            <div className={s.price}>
              <span className={s.amount}>{num(DEAL.pricePerUnit)}</span>
              <span className={s.currency}>₪</span>
            </div>
            <p className={s.sub}>בעלות רשומה בטאבו · לא כולל מיסים והוצאות נלוות</p>
          </div>

          <div>
            <ul className={s.list}>
              {includes.map((item) => (
                <li key={item}>
                  <span className={s.bullet} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className={s.avail}>
              <div className={s.availHead}>
                <span>יחידות שנותרו במקבץ הנוכחי</span>
                <b>
                  {DEAL.unitsLeft} / {DEAL.unitsTotal}
                </b>
              </div>
              <div className={s.availTrack}>
                <motion.span
                  className={s.availFill}
                  initial={reduced ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: sold }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ scaleX: sold }}
                />
              </div>
            </div>

            <ButtonLink href="#lead" variant="brass" size="lg" block>
              לשריון יחידה ולקבלת המצגת המלאה
            </ButtonLink>
            <p className={s.fine}>
              השארת הפרטים אינה מחייבת ואינה מהווה התחייבות לרכישה.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
