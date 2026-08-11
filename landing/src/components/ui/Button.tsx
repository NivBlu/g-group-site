import type { ButtonHTMLAttributes, ReactNode } from 'react'
import s from './Button.module.css'

type Variant = 'solid' | 'outline' | 'onDark' | 'brass'
type Size = 'sm' | 'md' | 'lg'

const classes = (variant: Variant, size: Size, block?: boolean, extra?: string) =>
  [s.btn, s[variant], size === 'lg' ? s.lg : size === 'sm' ? s.sm : '', block ? s.block : '', extra]
    .filter(Boolean)
    .join(' ')

const Arrow = () => (
  <svg className={s.arrow} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14 5l-7 7 7 7" />
  </svg>
)

type LinkProps = {
  href: string
  children: ReactNode
  variant?: Variant
  size?: Size
  block?: boolean
  arrow?: boolean
  className?: string
  target?: string
  rel?: string
  onClick?: () => void
}

export function ButtonLink({
  href,
  children,
  variant = 'solid',
  size = 'md',
  block,
  arrow = true,
  className,
  ...rest
}: LinkProps) {
  return (
    <a href={href} className={classes(variant, size, block, className)} {...rest}>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </a>
  )
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: Variant
  size?: Size
  block?: boolean
  arrow?: boolean
}

export function Button({
  children,
  variant = 'solid',
  size = 'md',
  block,
  arrow = true,
  className,
  ...rest
}: BtnProps) {
  return (
    <button className={classes(variant, size, block, className)} {...rest}>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </button>
  )
}
