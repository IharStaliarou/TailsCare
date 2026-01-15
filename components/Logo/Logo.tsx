'use client'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

import { LogoIcon } from './LogoIcon'

interface ILogoProps {
  className?: string
  closeMobileMenu: () => void
}

export const Logo = ({ closeMobileMenu, className }: ILogoProps) => {
  const t = useTranslations('common')
  return (
    <Link
      href='/'
      onClick={closeMobileMenu}
      className={`flex items-center gap-2.5 ${className}`}
    >
      <LogoIcon className='h-8 w-8' />
      <span className='text-2xl text-white'>{t('title')}</span>
    </Link>
  )
}
