'use client'

import { AuthActionsBlock } from '@/components/AuthActionsBlock'
import { Logo } from '@/components/Logo/Logo'
import { getLinks } from '@/constants/navigation'
import { Link, usePathname } from '@/i18n/routing'
import { IUser } from '@/interfaces/user'
import { useUIStore } from '@/store/use-ui-store'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

export const DesktopNavigation = ({
  user,
  isAuthenticated,
  links,
}: {
  user: IUser | null
  isAuthenticated: boolean
  links: ReturnType<typeof getLinks>
}) => {
  const pathname = usePathname()
  const { closeMobileMenu } = useUIStore()
  const t = useTranslations('navigation')

  return (
    <nav className='hidden px-4 md:flex md:h-full md:justify-between md:px-6 2xl:mx-auto 2xl:w-360'>
      <Logo closeMobileMenu={closeMobileMenu} />

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

      <AuthActionsBlock
        user={user}
        isAuthenticated={isAuthenticated}
        closeMobileMenu={closeMobileMenu}
      />
    </nav>
  )
}
