import type { ReactNode } from 'react'
import { PLACE } from '../config'
import { plan5500 } from '../assets'
import { Figure } from './ui/Figure'
import { Reveal } from './ui/Reveal'
import { SectionHead } from './ui/SectionHead'
import s from './Planning.module.css'

type Entry = {
  when: string
  title: string
  body: ReactNode
  state: 'done' | 'now' | 'next'
}

const ENTRIES: Entry[] = [
  {
    when: 'בתוקף',
    state: 'done',
    title: 'תמ״א 70 — המנוע התכנוני של המטרו',
    body: 'תכנית המתאר הארצית שמעגנת את תוואי המטרו ואת המרחב העירוני המוטה מטרו סביבו. הקרקע נכללת בתחומה.',
  },
  {
    when: 'תמ״א 65',
    state: 'done',
    title: 'מתח״ם צומת חולון',
    body: 'הכרה בצומת כמרכז תחבורה משולב — מפגש של מטרו, רכבת קלה, רכבת ישראל ו-BRT, עם מסוף אוטובוסים וחניון תת־קרקעי.',
  },
  {
    when: `${PLACE.planDeposited} · הופקדה`,
    state: 'now',
    title: `${PLACE.plan} — תכנית המתאר הכוללנית של תל אביב`,
    body: (
      <>
        המתחם מסומן כ<strong>אזור תעסוקה מטרופוליני ({PLACE.zone})</strong>,{' '}
        <strong>ללא מגבלת קומות</strong>, עם <strong>רח״ק מרבי 14.0</strong> למגרש של 1.5 דונם
        ומעלה, ומרכיב מגורים של לפחות 50% משטחי הבנייה.
      </>
    ),
  },
  {
    when: 'השלב הבא',
    state: 'next',
    title: 'אישור התכנית ותב״ע מפורטת',
    body: (
      <>
        מכאן ואילך: קידום תב״ע משביחה מול מוסדות התכנון, ומימוש הזכויות — בבנייה עצמית, בעסקת
        קומבינציה או במכירת הזכויות. <strong>זהו גם השלב שבו מרוכז הסיכון.</strong>
      </>
    ),
  },
]

export function Planning() {
  return (
    <section className={s.section} id="planning">
      <div className={s.wrap}>
        <SectionHead
          index="05"
          label="סטטוס תכנוני"
          split
          title={<>איפה התכנית עומדת היום — בלי ערפול.</>}
          lede={
            <>
              שקיפות היא תנאי. אלה השלבים שכבר קרו, והשלב שעוד לפנינו — הוא בדיוק זה שמייצר את
              ההשבחה, וגם זה שנושא את הסיכון.
            </>
          }
        />

        <ol className={s.list}>
          {ENTRIES.map((entry, i) => (
            <Reveal key={entry.title} i={i} as="li" className={`${s.entry} ${s[entry.state]}`}>
              <div className={s.when}>
                <span className={s.marker} aria-hidden="true" />
                {entry.when}
              </div>
              <div>
                <h3 className={s.title}>{entry.title}</h3>
                <p className={s.body}>{entry.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Figure
          muted
          img={plan5500}
          alt={`מפות ייעוד הקרקע ונספח הבינוי מתוך תכנית ${PLACE.plan}, עם סימון מתחם 707`}
          plate="לוח 06"
          caption={`${PLACE.plan} — ייעוד הקרקע (מימין) ונספח הבינוי (משמאל). מתחם 707 מסומן ללא מגבלת קומות.`}
        />
      </div>
    </section>
  )
}
