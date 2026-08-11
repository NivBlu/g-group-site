import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import s from './SectionHead.module.css'

type Props = {
  index: string
  label: string
  title: ReactNode
  lede?: ReactNode
  /** put the lede beside the title instead of under it */
  split?: boolean
  onDark?: boolean
}

/**
 * The page's recurring masthead: an index mark, a rule that draws itself,
 * then the headline. Borrowed from print — a numbered section opener.
 */
export function SectionHead({ index, label, title, lede, split, onDark }: Props) {
  const reduced = usePrefersReducedMotion()
  const cls = [s.head, split ? s.split : '', onDark ? s.onDark : ''].filter(Boolean).join(' ')

  return (
    <header className={cls}>
      <div className={s.index}>
        <span className={s.no}>§ {index}</span>
        <span>{label}</span>
      </div>

      <motion.div
        className={s.rule}
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className={s.body}>
        <motion.h2
          className={s.title}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        >
          {title}
        </motion.h2>

        {lede ? (
          <motion.div
            className={s.lede}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          >
            {lede}
          </motion.div>
        ) : null}
      </div>
    </header>
  )
}
