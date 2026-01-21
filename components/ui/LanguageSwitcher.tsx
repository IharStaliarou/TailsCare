'use client'

import { LANGUAGES, LANGUAGES_LABELS } from '@/i18n/constants'
import { usePathname, useRouter } from '@/i18n/routing'
import { TLocale } from '@/i18n/types'
import clsx from 'clsx'
import { useLocale } from 'next-intl'

interface ILanguageSwitcherProps {
  className?: string
}

export const LanguageSwitcher = ({ className }: ILanguageSwitcherProps) => {
  const locale = useLocale() as TLocale
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: TLocale) => {
    router.replace(pathname, { locale: newLocale })
  }
  return (
    <div className={`flex gap-1 rounded-lg border-gray-600 bg-gray-600 p-1 ${className}`}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          className={clsx(
            'flex h-7 w-1/2 items-center justify-center rounded-md text-xs font-medium uppercase transition-all duration-300 md:w-9.5',
            locale === lang
              ? 'bg-secondary hover:bg-secondary-hover text-white'
              : 'text-gray-400 hover:bg-gray-700 hover:text-white active:bg-gray-100'
          )}
        >
          {LANGUAGES_LABELS[lang]}
        </button>
      ))}
    </div>
  )
}
