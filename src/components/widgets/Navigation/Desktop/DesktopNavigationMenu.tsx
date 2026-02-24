'use client'

import { AuthActionsBlock, LanguageSwitcher } from '@/components/features'
import { Logo } from '@/components/features/Logo'
import { IUser } from '@/entities/user/types'
import { Link, usePathname } from '@/shared/config/i18n'
import { useUIStore } from '@/shared/store/useUiStore'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import { getLinks } from '../model'

export const DesktopNavigationMenu = ({
  user,
  isAuthenticated,
  links,
}: {
  user: IUser | null
  isAuthenticated: boolean
  links: ReturnType<typeof getLinks>
}) => {
  const pathname = usePathname()
  const { closeMobileSidebar } = useUIStore()
  const t = useTranslations('navigation')

  return (
    <nav className='hidden px-4 md:flex md:h-full md:justify-between md:px-6 2xl:mx-auto 2xl:w-360'>
      <Logo closeMobileMenu={closeMobileSidebar} />

      <ul className='flex items-center gap-8'>
        {links.map(({ label, href }) => {
          const isActive = href === pathname
          return (
            <li key={href}>
              <Link
                href={href}
                className={clsx(
                  'hover:text-primary-hover font-medium transition-colors',
                  isActive ? 'text-primary' : ''
                )}
              >
                {t(label)}
              </Link>
            </li>
          )
        })}
      </ul>

      <div className='relative flex items-center gap-2'>
        <AuthActionsBlock
          user={user}
          isAuthenticated={isAuthenticated}
          className='flex-row'
        />
        <LanguageSwitcher className='h-11.25' />
      </div>
    </nav>
  )
}
