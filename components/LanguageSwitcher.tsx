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
    <div
      className={`flex gap-1 rounded-lg border border-zinc-800 bg-zinc-900 p-1 ${className}`}
    >
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          className={clsx(
            'flex h-7 w-1/2 items-center justify-center rounded-md text-xs font-bold uppercase transition-all md:w-9.5',
            locale === lang
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
          )}
        >
          {LANGUAGES_LABELS[lang]}
        </button>
      ))}
    </div>
  )
}
