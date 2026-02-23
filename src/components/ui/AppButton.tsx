import { ButtonHTMLAttributes, ReactNode } from 'react'

import { Link } from '@/shared/config/i18n'
import clsx from 'clsx'

type TVariant = 'primary' | 'secondary' | 'outline' | 'icon'

export interface IAppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  icon?: ReactNode
  variant?: TVariant
  to?: string
}
export const AppButton = ({
  children,
  label,
  icon,
  className,
  variant = 'primary',
  disabled,
  to,

  onClick,
}: IAppButtonProps) => {
  const baseStyles = `rounded-lg flex justify-center  items-center transition duration-300 gap-1.5 ${className?.includes('h-') ? '' : 'h-full'}`
  const variantStyles = {
    primary:
      'bg-primary hover:bg-primary-hover active:bg-primary-active active:text-primary',
    secondary:
      'bg-secondary hover:bg-secondary-hover active:bg-secondary-active active:text-secondary',
    outline:
      'hover:bg-gray-100 border border-gray-300 active:bg-gray-400 active:text-gray-100 active:border-gray-400',
    icon: '',
  }

  const paddingStyles = variant === 'icon' ? '' : 'p-3'

  const buttonStyles = clsx(
    baseStyles,
    paddingStyles,
    className,
    disabled
      ? 'cursor-not-allowed bg-disabled text-white '
      : ['cursor-pointer', variantStyles[variant]]
  )

  const LinkButton = (
    <Link href={to!} className={`${buttonStyles} ${className}`}>
      {icon} {label} {children}
    </Link>
  )

  if (to) {
    return LinkButton
  }

  return (
    <button onClick={onClick} className={`${buttonStyles} ${className}`}>
      {icon} {label} {children}
    </button>
  )
}
