import { HTMLAttributes } from 'react'

import { Link } from '@/i18n/routing'
import clsx from 'clsx'

type TVariant = 'primary' | 'secondary' | 'success' | 'outline' | 'icon'

export interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string
  className?: string
  variant?: TVariant
  disabled?: boolean
  to?: string
}
export const Button = ({
  label,
  className,
  variant = 'primary',
  disabled,
  to,
}: IButtonProps) => {
  const baseStyles = 'rounded-lg focus:outline-none flex justify-center items-center'
  const variantStyles = {
    primary: 'bg-black-950 text-black-00 hover:bg-black-900',
    secondary: 'bg-black-00 hover:bg-black-50 text-black-950',
    success: 'bg-secondary-500 text-black-00',
    outline: 'bg-transparent hover:bg-black-50 text-black-950 border border-black-950',
    icon: '',
  }
  const paddingStyles = variant === 'icon' ? '' : 'px-4'
  const buttonStyles = clsx(
    baseStyles,
    paddingStyles,
    className,
    disabled
      ? 'cursor-not-allowed bg-black-200 text-black-00'
      : ['cursor-pointer', variantStyles[variant]]
  )

  const LinkButton = (
    <Link href={to!} className={`${buttonStyles} ${className}`}>
      {label}
    </Link>
  )

  if (to) {
    return LinkButton
  }

  return <button className={`${buttonStyles} ${className}`}>{label}</button>
}
