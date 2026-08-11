import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import type { Img } from '../../assets'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import s from './Figure.module.css'

type Props = {
  img: Img
  alt: string
  caption?: ReactNode
  /** plate number shown before the caption, e.g. "לוח 03" */
  plate?: string
  onDark?: boolean
  muted?: boolean
  className?: string
  children?: ReactNode
}

/**
 * An image that arrives by uncovering rather than fading — a curtain wipe.
 * Reads as a print plate being revealed, and avoids the generic fade-in-up
 * that every scroll library ships with.
 */
export function Figure({ img, alt, caption, plate, onDark, muted, className, children }: Props) {
  const reduced = usePrefersReducedMotion()
  const cls = [s.figure, onDark ? s.onDark : '', muted ? s.muted : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <figure className={cls}>
      <motion.div
        className={s.frame}
        initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }}
        whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
        viewport={{ once: true, margin: '0px 0px -8% 0px' }}
        transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={img.src}
          alt={alt}
          width={img.width}
          height={img.height}
          loading="lazy"
          decoding="async"
        />
        {children}
      </motion.div>
      {caption ? (
        <figcaption className={s.caption}>
          {plate ? <span className={s.no}>{plate}</span> : null}
          <span>{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  )
}
