'use client'

import {
  LANGUAGES,
  LANGUAGES_LABELS,
  TLocale,
  usePathname,
  useRouter,
} from '@/shared/config/i18n'
import clsx from 'clsx'
import { useLocale } from 'next-intl'

import { useUIStore } from '../../shared/store/use-ui-store'

interface ILanguageSwitcherProps {
  className?: string
}

export const LanguageSwitcher = ({ className }: ILanguageSwitcherProps) => {
  const locale = useLocale() as TLocale
  const router = useRouter()
  const pathname = usePathname()
  const { closeMobileSidebar } = useUIStore()

  const handleLanguageChange = (newLocale: TLocale) => {
    router.replace(pathname, { locale: newLocale })
    closeMobileSidebar()
  }
  return (
    <div className={`flex gap-1 rounded-lg border-gray-600 bg-gray-600 p-1 ${className}`}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          className={clsx(
            'w-1/2 rounded-md p-2 text-xs font-medium uppercase transition-all duration-300',
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
