import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { DEAL } from '../config'
import { shekel } from '../lib/format'
import { whatsappUrl } from '../lib/lead'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { ButtonLink } from './ui/Button'
import s from './StickyBar.module.css'

/**
 * Appears once the hero is behind the viewport, and steps aside over the
 * lead form so it never covers the thing it's asking you to do.
 */
export function StickyBar() {
  const [show, setShow] = useState(false)
  const [showWa, setShowWa] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.75
      const lead = document.getElementById('lead')
      let atLead = false
      if (lead) {
        const r = lead.getBoundingClientRect()
        atLead = r.top < window.innerHeight * 0.85 && r.bottom > 0
      }
      setShowWa(pastHero)
      setShow(pastHero && !atLead)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            className={s.bar}
            initial={reduced ? false : { y: '110%' }}
            animate={{ y: 0 }}
            exit={reduced ? { opacity: 0 } : { y: '110%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={s.price}>
              <b>{shekel(DEAL.pricePerUnit)}</b>
              <span>ליחידת קרקע בטאבו</span>
            </div>
            <ButtonLink href="#lead" variant="brass" size="sm" arrow={false}>
              השארת פרטים
            </ButtonLink>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWa && (
          <motion.a
            className={s.wa}
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="שיחת וואטסאפ"
            initial={reduced ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path d="M16 3a13 13 0 0 0-11.1 19.8L3 29l6.4-1.8A13 13 0 1 0 16 3Zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.8 1 1-3.7-.3-.4A10.6 10.6 0 1 1 16 26.6Z" />
              <path d="M12.2 9.9c-.3-.6-.5-.6-.8-.6h-.7c-.2 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.4 3.6 1.5 3.9c.2.2 2.6 4.2 6.5 5.7 3.2 1.3 3.9 1 4.6.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.7-.5l-2.5-1.2c-.3-.1-.6-.2-.8.2l-1.1 1.4c-.2.2-.4.3-.8.1a8.7 8.7 0 0 1-4.3-3.8c-.2-.4 0-.6.2-.8l.6-.7c.2-.2.2-.4.3-.6.1-.2 0-.5 0-.6l-1.1-2.6Z" />
            </svg>
          </motion.a>
        )}
      </AnimatePresence>
    </>
  )
}
