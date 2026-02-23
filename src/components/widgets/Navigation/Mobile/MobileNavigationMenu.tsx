'use client'

import { IUser } from '@/entities/user/types'
import { Link, usePathname } from '@/shared/config/i18n'
import { useUIStore } from '@/shared/store/use-ui-store'
import clsx from 'clsx'

import { getLinks } from '../model'

interface IMobileNavigationMenuProps {
  user: IUser | null
  isAuthenticated: boolean
  links: ReturnType<typeof getLinks>
}

export const MobileNavigationMenu = ({ links }: IMobileNavigationMenuProps) => {
  const pathname = usePathname()
  const { closeMobileSidebar } = useUIStore()

  return (
    <>
      {/*TODO: add mb for mobile menu*/}
      <nav
        className={clsx(
          'bg-secondary fixed bottom-0 left-0 z-40 flex h-15 min-w-screen md:hidden'
        )}
      >
        <ul className='flex w-full justify-around pt-2.5'>
          {links.map(({ href, icon: IconComponent }) => {
            const isActive = href === pathname
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={closeMobileSidebar}
                  className={clsx(
                    'hover:text-primary-hover font-medium transition-colors',
                    isActive ? 'text-primary-active' : ''
                  )}
                >
                  <IconComponent className='h-6 w-6' />
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
