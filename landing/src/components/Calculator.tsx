import { useId, useMemo, useState } from 'react'
import { DEAL, PLACE } from '../config'
import { forUnits, shekel, sqm } from '../lib/format'
import { ButtonLink } from './ui/Button'
import { Reveal } from './ui/Reveal'
import { SectionHead } from './ui/SectionHead'
import s from './Calculator.module.css'

const MIN = 1
const MAX = 10

type Row = { label: string; value: string; highlight?: boolean }

export function Calculator() {
  const [units, setUnits] = useState(1)
  const id = useId()

  const figures = useMemo(() => {
    const price = units * DEAL.pricePerUnit
    const land = units * DEAL.landPerUnit
    const rights = land * DEAL.far
    const residential = rights * DEAL.residentialShare
    return { price, land, rights, residential, perSqm: price / residential }
  }, [units])

  const rows: Row[] = [
    { label: 'שטח קרקע', value: sqm(figures.land) },
    { label: `זכויות בנייה (×${DEAL.far})`, value: sqm(figures.rights) },
    { label: 'מתוכן מגורים (50%)', value: sqm(figures.residential) },
    { label: 'עלות למ״ר דירה', value: shekel(figures.perSqm), highlight: true },
  ]

  const fill = ((units - MIN) / (MAX - MIN)) * 100

  return (
    <section className={s.section} id="calc">
      <div className={s.wrap}>
        <SectionHead
          index="03"
          label="מחשבון"
          split
          title={<>כמה זכויות אתם קונים ב־690,000 ₪?</>}
          lede={
            <>
              הזיזו את הסמן וראו את התחשיב מתעדכן. כל יחידה היא חלק יחסי בקרקע בשטח של
              כ־{DEAL.landPerUnit} מ״ר.
            </>
          }
        />

        <Reveal className={s.sheet}>
          <div className={s.control}>
            <div className={s.controlHead}>
              <label className={s.controlLabel} htmlFor={id}>
                מספר יחידות
              </label>
              <output className={s.controlValue} htmlFor={id}>
                {units}
              </output>
            </div>

            <input
              className={s.range}
              id={id}
              type="range"
              min={MIN}
              max={MAX}
              step={1}
              value={units}
              onChange={(e) => setUnits(Number(e.target.value))}
              style={{ '--fill': `${fill}%` } as React.CSSProperties}
              aria-label="מספר יחידות קרקע"
            />

            <div className={s.ticks} aria-hidden="true">
              {Array.from({ length: MAX }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>

            <p className={s.hint}>
              ניתן לרכוש יותר מיחידה אחת. החלק היחסי בקרקע — וגם משקל ההצבעה באסיפה הכללית —
              נקבע לפי מספר היחידות.
            </p>
          </div>

          <div>
            <div className={s.total}>
              <span className={s.totalLabel}>השקעה כוללת</span>
              <span className={s.totalValue}>{shekel(figures.price)}</span>
            </div>

            <div className={s.rows}>
              {rows.map((row) => (
                <div
                  key={row.label}
                  className={`${s.row} ${row.highlight ? s.highlight : ''}`}
                >
                  <span className={s.rowLabel}>{row.label}</span>
                  <span className={s.leader} aria-hidden="true" />
                  <span className={s.rowValue}>{row.value}</span>
                </div>
              ))}
            </div>

            <p className={s.note}>
              נכון להיום, מחיר ממוצע למ״ר דירה חדשה בתל אביב נמדד בעשרות אלפי שקלים. הפער בין
              המספרים האלה הוא מה שנקרא <strong>השבחה</strong> — והוא מותנה באישור התכנית
              ובהתקדמותה.
            </p>

            <ButtonLink href="#lead" variant="solid" size="lg">
              לקבלת תחשיב מלא {forUnits(units)}
            </ButtonLink>
          </div>
        </Reveal>

        <p className={s.disclaimer}>
          * החישוב אריתמטי בלבד, ומבוסס על זכויות מוצעות בתכנית {PLACE.plan} שהופקדה
          ב־{PLACE.planDeposited} וטרם אושרה. אין בו משום הבטחת תשואה, הערכת שווי או ייעוץ.
          פירוט מלא בהסתייגות שבתחתית העמוד.
        </p>
      </div>
    </section>
  )
}
