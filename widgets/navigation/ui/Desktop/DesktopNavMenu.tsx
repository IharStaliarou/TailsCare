'use client'

import { IUser } from '@/entities/user'
import { AuthActionsBlock } from '@/features/auth-actions'
import { Link, usePathname } from '@/shared/config/i18n'
import { useUIStore } from '@/shared/model/use-ui-store'
import { Logo } from '@/shared/ui/logo/Logo'
import { getLinks } from '@/widgets/navigation/model/links'
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
