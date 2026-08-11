import { siteAsset } from '../config'
import { Reveal } from './ui/Reveal'
import { SectionHead } from './ui/SectionHead'
import s from './Trust.module.css'

const CARDS = [
  {
    title: 'רישום בטאבו',
    body: 'לאחר השלמת ההתחייבויות, הרוכשים זכאים להירשם בלשכת רישום המקרקעין כבעלים משותפים (במושע) של המקרקעין, כל אחד לפי חלקו היחסי.',
  },
  {
    title: 'נאמן לכספים',
    body: 'ה.פ.נ חברה לנאמנות עסקאות נדל״ן בע״מ — נאמן ייעודי לעסקאות מקרקעין, שפועל לפי כתב הוראות לנאמן המצורף להסכם.',
  },
  {
    title: 'ליווי משפטי',
    body: (
      <>
        היועצים המשפטיים לעסקה: משרד עורכי הדין <b>הרצוג, פוקס, נאמן ושות׳</b> — יצחק שדה 6,
        תל אביב.
      </>
    ),
  },
  {
    title: 'הסכם שיתוף מסודר',
    body: 'הסכם שיתוף פעולה להשבחה שמגדיר את יחסי השותפים, האסיפה הכללית, הנציגות והחלטות — לרבות רוב נדרש של 70% בהחלטות מהותיות.',
  },
  {
    title: 'שמאי ואדריכל',
    body: 'הנציגות מזמינה חוות דעת שמאית לצורך הערכת שווי במועד סמוך למימוש, ובוחרת אדריכל לליווי התכנון.',
  },
  {
    title: 'מנהלת קבוצה מקצועית',
    body: 'לעסקה מנהלת קבוצה ייעודית, שמרכזת את ניהול העסקה, את קידום התב״ע המשביחה ואת הליווי מול גורמי התכנון — בכפוף להחלטות האסיפה הכללית והנציגות.',
  },
]

export function Trust() {
  return (
    <section className={s.section} id="trust">
      <div className={s.wrap}>
        <SectionHead
          index="07"
          label="הביטחונות"
          split
          title={<>איך העסקה בנויה — ומה מגן עליכם.</>}
          lede={
            <>
              מבנה העסקה מעוגן במסמכים חתומים, בנאמנות ובליווי משפטי. אלה המרכיבים המרכזיים
              שלו.
            </>
          }
        />

        <div className={s.grid}>
          {CARDS.map((card, i) => (
            <Reveal key={card.title} i={i % 3} as="article" className={s.card}>
              <h3 className={s.cardTitle}>{card.title}</h3>
              <p className={s.cardBody}>{card.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className={s.band}>
          <figure className={s.portrait}>
            <img
              src={siteAsset('images/projects/hi-tower-main.png')}
              alt="מגדל היי טאוור בגבעתיים — מפרויקטי G-Group"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div>
            <p className={s.bandLabel}>מי מלווה אתכם</p>
            <h3 className={s.bandTitle}>G-GROUP</h3>
            <p className={s.bandBody}>
              קבוצת <b>G-Group</b>, בהובלת <b>גיא בלושינסקי</b>, פועלת בייזום, בשיווק ובניהול
              פרויקטים רחבי היקף בנדל״ן הישראלי — ביניהם מגדל <b>היי טאוור</b> בגבעתיים,{' '}
              <b>WOW צומת הפיל</b> ו<b>דיזנגוף 77</b> בתל אביב.
            </p>
            <p className={s.bandBody}>
              הקבוצה מתמקדת בפרויקטים באזורי ביקוש, מתוך מחויבות לשקיפות, לאמינות ולקשר אישי
              וישיר עם הלקוחות לאורך כל הדרך.
            </p>
            <blockquote className={s.quote}>
              הערך האמיתי בנדל״ן הוא לא במה שכבר קרה, אלא במה שעומד לקרות.
            </blockquote>
            <a className={s.bandLink} href="../about.html">
              לאתר הקבוצה
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M14 5l-7 7 7 7" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
