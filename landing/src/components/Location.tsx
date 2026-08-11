import { aerialSite, locationMap } from '../assets'
import { Figure } from './ui/Figure'
import { Reveal } from './ui/Reveal'
import { SectionHead } from './ui/SectionHead'
import s from './Location.module.css'

const PINS = [
  { x: '52%', y: '36%', alt: false },
  { x: '43%', y: '53%', alt: true },
  { x: '35%', y: '9%', alt: false },
  { x: '66%', y: '80%', alt: false },
]

const NEARBY = [
  { title: 'תחנת מטרו M1', body: 'קו המטרו המרכזי של המדינה, על גבול המגרש.' },
  { title: 'הקו הירוק', body: 'שתי תחנות של הרכבת הקלה משני צדי המתחם.' },
  { title: 'רכבת ישראל', body: 'תחנה קיימת ופעילה — ללא המתנה לתשתית עתידית.' },
  { title: 'BRT', body: 'הקו הכחול והקו הצהוב של המטרונית.' },
  { title: 'מסוף אוטובוסים', body: 'וחניון לילה תת־קרקעי במפלסי המתח״ם.' },
  { title: 'נתיבי איילון וכביש 44', body: 'חיבור מיידי לצירי הרוחב והאורך.' },
]

export function Location() {
  return (
    <section className={s.section} id="location">
      <div className={s.wrap}>
        <SectionHead
          index="04"
          label="המיקום"
          onDark
          split
          title={<>שער הכניסה הדרומי של מטרופולין תל אביב.</>}
          lede={
            <>
              מפגש דרך בן צבי וכביש 44 — נקודת המפגש שבין תל אביב-יפו לחולון, בתוך תחומי עיריית
              תל אביב. <strong>זו לא פריפריה של העיר; זו הכניסה אליה.</strong>
            </>
          }
        />

        <Figure
          className={s.aerial}
          onDark
          img={aerialSite}
          alt="צילום אוויר של מתחם מע״ר בן צבי עם סימון גבולות הקרקע, תחנת המטרו M1, תחנות הקו הירוק ותחנת רכבת ישראל"
          plate="לוח 01"
          caption="המצב הקיים בשטח — הקרקע מסומנת בקו הצהוב, בסמוך לתחנת המטרו M1."
        >
          <div className={s.pins} aria-hidden="true">
            {PINS.map((p, i) => (
              <span
                key={i}
                className={`${s.pin} ${p.alt ? s.pinAlt : ''}`}
                style={{ '--x': p.x, '--y': p.y } as React.CSSProperties}
              />
            ))}
          </div>
        </Figure>

        <div className={s.split}>
          <Figure
            onDark
            muted
            img={locationMap}
            alt="מפת רשת התחבורה המטרופולינית עם סימון מיקום פרויקט מע״ר בן צבי"
            plate="לוח 02"
            caption="מיקום הפרויקט על רשת המתע״ן המתוכננת."
          />

          <Reveal i={1}>
            <h3 className={s.listTitle}>מה יש כאן, במרחק הליכה</h3>
            <ul className={s.list}>
              {NEARBY.map((item) => (
                <li key={item.title}>
                  <span className={s.bullet} aria-hidden="true" />
                  <span>
                    <b>{item.title}</b> — {item.body}
                  </span>
                </li>
              ))}
            </ul>
            <p className={s.credits}>
              משרד תכנון ראשי: <b>HQ אדריכלים</b> · ניהול פרויקט: <b>ע.סלעי</b> · מתח״ם צומת
              חולון, תמ״א 65.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
