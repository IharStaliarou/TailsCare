import { HTMLAttributes } from 'react'

import { Link } from '@/i18n/routing'
import clsx from 'clsx'

type TVariant = 'primary' | 'secondary' | 'outline' | 'icon'

export interface IAppButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label?: string
  className?: string
  variant?: TVariant
  disabled?: boolean
  to?: string
}
export const AppButton = ({
  label,
  className,
  variant = 'primary',
  disabled,
  to,
}: IAppButtonProps) => {
  const baseStyles =
    'md:h-full px-3 md:py-0 py-3 rounded-lg flex justify-center items-center transition duration-300'
  const variantStyles = {
    primary:
      'bg-primary hover:bg-primary-hover active:bg-primary-active active:text-primary',
    secondary:
      'bg-secondary hover:bg-secondary-hover active:bg-secondary-active active:text-secondary',
    outline:
      'hover:bg-gray-100 border border-gray-300 active:bg-gray-400 active:text-gray-100 active:border-gray-400',
    icon: '',
  }
  const buttonStyles = clsx(
    baseStyles,
    className,
    disabled
      ? 'cursor-not-allowed bg-disabled text-white '
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
