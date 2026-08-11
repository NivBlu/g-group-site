import { animate, useInView, useMotionValue } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { num } from '../../lib/format'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Props = {
  to: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
}

/** Counts up once when scrolled into view. Falls back to the final value when motion is reduced. */
export function CountUp({ to, decimals = 0, prefix = '', suffix = '', duration = 1.5 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = usePrefersReducedMotion()
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState(() => (reduced ? to : 0))

  useEffect(() => {
    if (reduced) {
      setDisplay(to)
      return
    }
    if (!inView) return
    const controls = animate(mv, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, to, duration, mv, reduced])

  const body = decimals > 0 ? display.toFixed(decimals) : num(display)

  return (
    <span ref={ref}>
      {prefix}
      {body}
      {suffix}
    </span>
  )
}
