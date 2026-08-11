import { hubLayers, hubRender, transportNetwork } from '../assets'
import { CountUp } from './ui/CountUp'
import { Figure } from './ui/Figure'
import { Reveal } from './ui/Reveal'
import { SectionHead } from './ui/SectionHead'
import s from './Hub.module.css'

const MODES = [
  { mode: 'מטרו', to: 109, unit: 'תחנות · מהפכת הנגישות' },
  { mode: 'רכבת קלה', to: 139, unit: 'תחנות · הלב הפועם של הרחוב' },
  { mode: 'BRT', to: 130, suffix: ' ק״מ', unit: 'הגמישות המשלימה' },
  { mode: 'רכבת ישראל', to: 68, unit: 'תחנות · עמוד השדרה הלאומי' },
]

export function Hub() {
  return (
    <section className={s.section}>
      <div className={s.wrap}>
        <SectionHead
          index="04b"
          label="מרכז תחבורה משולב"
          onDark
          split
          title={<>ישראל בונה מהפכת תחבורה. הקרקע הזו יושבת על הצומת שלה.</>}
          lede={
            <>
              מתח״ם הוא נקודה שבה נפגשים מספר אמצעי תחבורה עתירי נוסעים. גורמי התכנון — מינהל
              התכנון, נת״ע, נתיבי איילון ומשרד התחבורה — מרכזים סביב נקודות כאלה את מירב זכויות
              הבנייה. <strong>זה בדיוק ההיגיון שמייצר את הרח״ק של 14.</strong>
            </>
          }
        />

        <div className={s.stats}>
          {MODES.map((m, i) => (
            <Reveal key={m.mode} i={i} className={s.stat}>
              <span className={s.mode}>{m.mode}</span>
              <span className={s.value}>
                <CountUp to={m.to} suffix={m.suffix ?? ''} />
              </span>
              <span className={s.unit}>{m.unit}</span>
            </Reveal>
          ))}
        </div>

        <div className={s.split}>
          <Figure
            onDark
            img={hubRender}
            alt="הדמיית מרכז התחבורה המשולב במע״ר בן צבי"
            plate="לוח 03"
            caption="הדמיית המתח״ם — להמחשה בלבד."
          />
          <Figure
            onDark
            muted
            img={hubLayers}
            alt="חתך מפלסי מרכז התחבורה: מפלס עליון, מפלס קרקע ושלושה מפלסים תת־קרקעיים עד מפלס המטרו"
            plate="לוח 04"
            caption="חתך המפלסים — מרציפי הרכבת ועד רציפי המטרו."
          />
        </div>

        <Figure
          onDark
          muted
          img={transportNetwork}
          alt="השוואת רשת התחבורה המטרופולינית בין 2026 ל-2037"
          plate="לוח 05"
          caption="רשת המתע״ן: 2026 מול 2037. הקרקע נרכשת היום — לתוך הרשת של מחר."
        />
      </div>
    </section>
  )
}
