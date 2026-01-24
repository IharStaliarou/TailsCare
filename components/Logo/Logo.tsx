'use client'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

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
      className={`hover:text-primary-hover text-primary flex items-center gap-2.5 transition-colors duration-300 ${className}`}
    >
      {/* TODO: Create custom logo */}
      <Image src='/Logo.svg' alt='logo' width={46} height={46} />
      <span className='text-4xl font-bold'>{t('title')}</span>
    </Link>
  )
}
