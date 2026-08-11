import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { DEAL, PLACE } from '../config'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { SectionHead } from './ui/SectionHead'
import s from './Faq.module.css'

type QA = { q: string; a: ReactNode }

const ITEMS: QA[] = [
  {
    q: 'מה זה בעצם רח״ק 14, ולמה זה משנה?',
    a: (
      <>
        רח״ק הוא היחס בין סך השטח הבנוי לבין שטח הקרקע. רח״ק 14 פירושו שעל כל מטר קרקע מותר
        לבנות עד 14 מ״ר. זהו המספר שקובע כמעט לבדו את שווי הקרקע: אותה חלקה בדיוק, עם רח״ק 2 או
        עם רח״ק 14, היא שני נכסים שונים לחלוטין. ב{PLACE.plan} שהופקדה ב־{PLACE.planDeposited}{' '}
        נקבע רח״ק מרבי של 14.0 למגרש בשטח 1.5 דונם ומעלה באזור התעסוקה המטרופוליני.
      </>
    ),
  },
  {
    q: 'הקרקע באמת נרשמת על שמי בטאבו?',
    a: (
      <>
        כן. מבנה העסקה הוא רכישת חלקים בלתי מסוימים בבעלות במקרקעין בגוש {PLACE.block}. לאחר
        השלמת ההתחייבויות לפי הסכם המכר, הרוכשים זכאים להירשם בלשכת רישום המקרקעין כבעלים
        משותפים (במושע), כל אחד לפי חלקו היחסי כמפורט בנספח להסכם. הכספים מנוהלים בנאמנות עד
        להשלמת התנאים.
      </>
    ),
  },
  {
    q: 'התכנית כבר אושרה? מה הסטטוס המדויק?',
    a: (
      <>
        <strong>לא — התכנית הופקדה, טרם אושרה.</strong> {PLACE.plan} הופקדה
        ב־{PLACE.planDeposited} והיא נמצאת בשלבי הליך תכנוני. תמ״א 70 ותמ״א 65 מהוות את המסגרת
        הארצית שמעגנת את המטרו ואת המתח״ם. חשוב שתדעו זאת במפורש: הפער בין המצב היום לבין
        התכנית המאושרת הוא בדיוק מקור ההשבחה הפוטנציאלית — וגם מקור הסיכון. אין ערובה שהתכנית
        תאושר, ואין ערובה ללוחות הזמנים.
      </>
    ),
  },
  {
    q: 'מה קורה אחרי הרכישה — מי מקדם את התכנון?',
    a: (
      <>
        השותפים חותמים על הסכם שיתוף פעולה להשבחה. האסיפה הכללית של השותפים היא הגוף המחליט,
        והיא בוחרת נציגות בת שלושה חברים. הנציגות מלווה את קידום התב״ע המשביחה מול מוסדות
        התכנון, מזמינה חוות דעת שמאית ובוחרת אדריכל. מנהלת הקבוצה מרכזת את הביצוע. החלטות
        מהותיות מתקבלות ברוב של 70% מקולות הנוכחים, לפי חלקו של כל שותף במקרקעין.
      </>
    ),
  },
  {
    q: 'כמה זמן זה ייקח?',
    a: (
      <>
        השקעה בקרקע בהליכי תכנון היא השקעה ארוכת טווח. מהפכת התחבורה שסביבה בנוי המתחם פרושה על
        פני העשור הקרוב — מ־2026 ועד 2037. אף גורם, כולל אנחנו, אינו יכול להתחייב למועד אישור
        התכנית או למועד מימוש הזכויות. <strong>מי שזקוק לנזילות בטווח הקצר — זו אינה ההשקעה
        המתאימה עבורו.</strong>
      </>
    ),
  },
  {
    q: 'מהם הסיכונים העיקריים?',
    a: (
      <>
        העיקריים שבהם: אי־אישור התכנית או אישורה בהיקף זכויות נמוך מהמוצע; התארכות לוחות זמנים;
        שינויי מדיניות תכנון; היטל השבחה, מיסים והוצאות פיתוח; והיעדר סחירות מהירה של קרקע
        בבעלות משותפת. לפני חתימה — קראו את מלוא מסמכי העסקה והיוועצו בעורך דין, בשמאי מקרקעין
        וביועץ מס מטעמכם. נשמח להעביר לכם את כל המסמכים לעיון.
      </>
    ),
  },
  {
    q: 'אפשר לרכוש יותר מיחידה אחת?',
    a: (
      <>
        כן. ניתן לרכוש מספר יחידות, וחלקו היחסי של כל שותף במקרקעין נקבע בהתאם. שימו לב שגם
        משקל ההצבעה באסיפה הכללית מחושב לפי החלק היחסי בקרקע. כל יחידה היא כ־{DEAL.landPerUnit}{' '}
        מ״ר קרקע — השתמשו במחשבון שבעמוד כדי לראות את התחשיב לכל כמות.
      </>
    ),
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const reduced = usePrefersReducedMotion()
  const baseId = useId()

  return (
    <section className={s.section} id="faq">
      <div className={s.wrap}>
        <SectionHead
          index="09"
          label="שאלות ותשובות"
          split
          title={<>מה שחשוב לדעת לפני שמחליטים.</>}
          lede={<>כולל מה שפחות נעים לומר — לוחות זמנים, סיכונים, ומה שעדיין לא אושר.</>}
        />

        <div className={s.list}>
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            const panelId = `${baseId}-panel-${i}`
            const btnId = `${baseId}-btn-${i}`
            return (
              <div key={item.q} className={`${s.item} ${isOpen ? s.open : ''}`}>
                <h3>
                  <button
                    id={btnId}
                    className={s.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className={s.no}>{String(i + 1).padStart(2, '0')}</span>
                    <span>{item.q}</span>
                    <span className={s.sign} aria-hidden="true" />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className={s.panel}
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className={s.answer}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
