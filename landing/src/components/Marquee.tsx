import { PLACE } from '../config'
import s from './Marquee.module.css'

const ITEMS = [
  `${PLACE.plan} — הופקדה ${PLACE.planDeposited}`,
  'תמ״א 70 — המנוע התכנוני של המטרו',
  'מטרו קו M1',
  'רכבת קלה — הקו הירוק',
  'רכבת ישראל',
  'BRT — קו כחול וקו צהוב',
  'אזור תעסוקה מטרופוליני — ללא מגבלת קומות',
  'רח״ק 14.0',
]

export function Marquee() {
  // duplicated so the -50% translate loops seamlessly
  const loop = [...ITEMS, ...ITEMS]

  return (
    <div className={s.strip} aria-hidden="true">
      <div className={s.track}>
        {loop.map((item, i) => (
          <span key={i} style={{ display: 'contents' }}>
            <span className={s.item}>{item}</span>
            <span className={s.dot} />
          </span>
        ))}
      </div>
    </div>
  )
}
