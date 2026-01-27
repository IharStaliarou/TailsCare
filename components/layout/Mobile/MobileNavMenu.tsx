'use client'

import { AuthActionsBlock } from '@/components/AuthActionsBlock'
import { Logo } from '@/components/Logo/Logo'
import { getLinks } from '@/constants/navigation'
import { Link, usePathname } from '@/i18n/routing'
import { IUser } from '@/interfaces/user'
import { useUIStore } from '@/store/use-ui-store'
import clsx from 'clsx'

interface IMobileNavMenuProps {
  user: IUser | null
  isAuthenticated: boolean
  links: ReturnType<typeof getLinks>
}

export const MobileNavigation = ({
  user,
  isAuthenticated,
  links,
}: IMobileNavMenuProps) => {
  const pathname = usePathname()
  const { closeMobileMenu } = useUIStore()

  return (
    <>
      {/*TODO: add mb for mobile menu*/}
      <nav
        className={clsx(
          'bg-secondary fixed bottom-0 left-0 z-40 flex h-10 min-w-screen md:hidden'
        )}
      >
        <ul className='flex w-full items-center justify-around'>
          {links.map(({ href, icon: IconComponent }) => {
            const isActive = href === pathname
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={closeMobileMenu}
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
