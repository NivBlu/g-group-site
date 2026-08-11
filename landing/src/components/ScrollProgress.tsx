import { motion, useScroll, useSpring } from 'motion/react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const bar: React.CSSProperties = {
  position: 'fixed',
  insetBlockStart: 0,
  insetInline: 0,
  height: 2,
  background: 'var(--brass-2)',
  transformOrigin: 'right center',
  zIndex: 70,
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduced = usePrefersReducedMotion()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })

  if (reduced) return null

  return <motion.div style={{ ...bar, scaleX }} aria-hidden="true" />
}
