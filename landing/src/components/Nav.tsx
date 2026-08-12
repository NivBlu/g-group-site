import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { ButtonLink } from './ui/Button'
import s from './Nav.module.css'

export const NAV_ITEMS = [
  { href: '#value', label: 'היתרון', no: '01' },
  { href: '#calc', label: 'מחשבון', no: '03' },
  { href: '#location', label: 'המיקום', no: '04' },
  { href: '#planning', label: 'סטטוס תכנוני', no: '06' },
  { href: '#compare', label: 'השוואה', no: '07' },
  { href: '#trust', label: 'הביטחונות', no: '08' },
] as const

export function Nav() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock the page behind the sheet, and let Escape close it
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className={`${s.nav} ${stuck && !open ? s.stuck : ''}`}>
        <div className={s.inner}>
          <a href="#top" className={s.brand} aria-label="G-Group — לראש העמוד">
            <span className={s.mark}>
              G<i />GROUP
            </span>
            <span className={s.sub}>מע״ר בן צבי · תל אביב</span>
          </a>

          <nav className={s.links} aria-label="ניווט ראשי">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className={s.link}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={s.cta}>
            <ButtonLink href="#lead" variant={stuck ? 'solid' : 'brass'} size="sm">
              לתיאום שיחה
            </ButtonLink>
          </div>

          <button
            className={`${s.toggle} ${open ? s.open : ''}`}
            aria-label={open ? 'סגירת תפריט' : 'פתיחת תפריט'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className={s.sheet}
            initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={s.sheetLink}
                onClick={() => setOpen(false)}
              >
                <span className={s.sheetNo}>{item.no}</span>
                {item.label}
              </a>
            ))}
            <div className={s.sheetFoot}>
              <ButtonLink
                href="#lead"
                variant="brass"
                size="lg"
                block
                onClick={() => setOpen(false)}
              >
                השארת פרטים
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
