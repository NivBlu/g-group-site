import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Props = {
  children: ReactNode
  /** stagger index — each step delays by 70ms */
  i?: number
  /** travel distance in px */
  y?: number
  className?: string
  as?: 'div' | 'li' | 'article' | 'section' | 'figure'
}

/**
 * Enters once, on scroll. Deliberately restrained: a short rise and a fade,
 * no scale or blur — the page should read as printed matter settling, not
 * as an interface animating.
 */
export function Reveal({ children, i = 0, y = 22, className, as = 'div' }: Props) {
  const reduced = usePrefersReducedMotion()
  const Tag = motion[as]

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
    >
      {children}
    </Tag>
  )
}
