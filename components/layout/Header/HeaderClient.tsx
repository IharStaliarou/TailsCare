'use client'

import { AuthActionsBlock } from '@/components/AuthActionsBlock'
import { Logo } from '@/components/Logo/Logo'
import { getLinks } from '@/constants/navigation'
import { Link } from '@/i18n/routing'
import { IUser } from '@/interfaces/user'
import { useUIStore } from '@/store/use-ui-store'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import { BurgerButton } from './BurgerButton'

interface IHeaderClientProps {
  user: IUser | null
}

export const HeaderClient = ({ user }: IHeaderClientProps) => {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore()

  const isAuthenticated = !!user
  const links = getLinks(isAuthenticated)

  const t = useTranslations('navigation')

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 z-50 flex w-full flex-col border-b bg-white transition-all',
        isMobileMenuOpen ? 'h-full md:h-20' : 'h-16 md:h-20'
      )}
    >
      {/* TODO: add fast access links to pets and profile (refactoring!?) */}
      <nav
        className={clsx(
          'inset-0 z-40 flex h-full flex-col p-6 pt-10 transition-transform duration-300 ' +
            'justify-between md:static md:h-full md:max-w-360 md:flex-row md:px-4 md:py-0 2xl:mx-auto 2xl:w-360',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <Logo closeMobileMenu={closeMobileMenu} />

        <ul className='flex flex-col gap-6 md:flex-row md:items-center md:gap-8'>
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={closeMobileMenu}
                className='hover:text-primary-hover font-medium transition-colors'
              >
                {t(label.replace('navigation.', ''))}
              </Link>
            </li>
          ))}
        </ul>

        <AuthActionsBlock
          user={user}
          isAuthenticated={isAuthenticated}
          closeMobileMenu={closeMobileMenu}
        />
        {/* TODO: add language  */}
      </nav>

      <BurgerButton
        className='absolute top-3 right-5 z-50 md:hidden'
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
    </header>
  )
}
