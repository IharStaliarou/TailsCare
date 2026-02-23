'use client'

import { MouseEvent } from 'react'

import { AuthActionsBlock } from '@/components/features'
import { Logo } from '@/components/features/Logo'
import { GearIcon } from '@/components/icons'
import { AppButton } from '@/components/ui'
import { IUser } from '@/entities/user/types'
import { Link, usePathname } from '@/shared/config/i18n'
import { useUIStore } from '@/shared/store/use-ui-store'
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
