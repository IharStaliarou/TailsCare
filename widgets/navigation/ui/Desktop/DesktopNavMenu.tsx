'use client'

import { MouseEvent } from 'react'

import { IUser } from '@/entities/user'
import { AuthActionsBlock } from '@/features/auth-actions'
import { Link, usePathname } from '@/shared/config/i18n'
import { useUIStore } from '@/shared/model/use-ui-store'
import { AppButton } from '@/shared/ui'
import { GearIcon } from '@/shared/ui/icons/GearIcon'
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
  const { toggleDesktopActionsMenu, closeMobileSidebar, isDesktopActionsMenuOpen } =
    useUIStore()
  const t = useTranslations('navigation')

  const handleToggleActionsMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    toggleDesktopActionsMenu()
  }

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

      <div className='relative'>
        <AppButton
          variant='icon'
          icon={<GearIcon className='h-10 w-10' />}
          onClick={handleToggleActionsMenu}
        />
        <AuthActionsBlock
          user={user}
          className='absolute top-[80%] right-10'
          isVisible={isDesktopActionsMenuOpen}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </nav>
  )
}
