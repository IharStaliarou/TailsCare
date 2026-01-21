'use client'

import { AuthActionsBlock } from '@/components/AuthActionsBlock'
import { Logo } from '@/components/Logo/Logo'
import { getLinks } from '@/constants/navigation'
import { Link } from '@/i18n/routing'
import { IUser } from '@/interfaces/user'
import { useUIStore } from '@/store/use-ui-store'
import { useTranslations } from 'next-intl'

export const DesktopNavigation = ({
  user,
  isAuthenticated,
  links,
  t,
}: {
  user: IUser | null
  isAuthenticated: boolean
  links: ReturnType<typeof getLinks>
  t: ReturnType<typeof useTranslations<'navigation'>>
}) => {
  const { closeMobileMenu } = useUIStore()

  return (
    <nav className='hidden px-4 md:flex md:h-full md:justify-between md:px-6 2xl:mx-auto 2xl:w-360'>
      <Logo closeMobileMenu={closeMobileMenu} />

      <ul className='flex items-center gap-8'>
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
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
  )
}
