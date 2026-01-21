import { AuthActionsBlock } from '@/components/AuthActionsBlock'
import { Logo } from '@/components/Logo/Logo'
import { getLinks } from '@/constants/navigation'
import { Link } from '@/i18n/routing'
import { IUser } from '@/interfaces/user'
import { useUIStore } from '@/store/use-ui-store'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import { BurgerButton } from './BurgerButton'

export const MobileNavigation = ({
  user,
  isAuthenticated,
  links,
  t,
  isMobileMenuOpen,
}: {
  user: IUser | null
  isAuthenticated: boolean
  links: ReturnType<typeof getLinks>
  t: ReturnType<typeof useTranslations<'navigation'>>
  isMobileMenuOpen: boolean
}) => {
  const { closeMobileMenu } = useUIStore()

  return (
    <>
      <nav
        className={clsx(
          'fixed inset-0 z-40 flex h-full flex-col justify-between bg-white p-6 pt-20 transition-transform duration-300 md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <Logo closeMobileMenu={closeMobileMenu} />

        <ul className='flex flex-col gap-6'>
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
      </nav>

      <BurgerButton
        className='absolute top-3 right-5 z-50 md:hidden'
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={useUIStore.getState().toggleMobileMenu}
      />
    </>
  )
}
