import { BENCHMARK, DEAL, PLACE } from '../config'
import { Reveal } from './ui/Reveal'
import { SectionHead } from './ui/SectionHead'
import s from './Pillars.module.css'

const ITEMS = [
  {
    no: 'I',
    title: 'קרקע בטאבו על שמך',
    tag: 'בעלות רשומה',
    body: 'לא אופציה, לא נייר, לא הבטחה. רישום זכויות בלשכת רישום המקרקעין כבעלים משותפים (במושע), בליווי נאמן ועורכי דין.',
  },
  {
    no: 'II',
    title: `רח״ק ${DEAL.far} — הגבוה בישראל`,
    tag: `×${DEAL.far} מכפיל`,
    body: `1400% זכויות בנייה למגרש של 1.5 דונם ומעלה. לשם השוואה: ${BENCHMARK.name} נבנה ברח״ק ${BENCHMARK.far} — כמעט חצי.`,
  },
  {
    no: 'III',
    title: 'מתח״ם — ארבעה קווים',
    tag: 'נגישות שיא',
    body: 'מטרו M1, הקו הירוק של הרכבת הקלה, רכבת ישראל ו-BRT — נפגשים במרכז תחבורה משולב אחד, ממש על הקרקע.',
  },
  {
    no: 'IV',
    title: 'ללא מגבלת קומות',
    tag: 'אופק בנייה פתוח',
    body: `בנספח הבינוי של ${PLACE.plan} סומן מתחם 707 כאזור ללא מגבלת קומות — התנאי שמאפשר לזכויות להתממש לגובה.`,
  },
]

export function Pillars() {
  return (
    <section className={s.section}>
      <div className={s.wrap}>
        <SectionHead
          index="03"
          label="מה מקבלים"
          title={<>ארבע סיבות שהופכות את המתחם הזה לחריג.</>}
        />

        <div className={s.grid}>
          {ITEMS.map((item, i) => (
            <Reveal key={item.no} i={i % 2} as="article" className={s.item}>
              <span className={s.no}>{item.no}</span>
              <div>
                <h3 className={s.title}>{item.title}</h3>
                <p className={s.body}>{item.body}</p>
                <span className={s.tag}>{item.tag}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
