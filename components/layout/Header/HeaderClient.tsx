'use client'

import { getLinks } from '@/constants/navigation'
import { IUser } from '@/interfaces/user'
import { useUIStore } from '@/store/use-ui-store'

import { DesktopNavigation } from './DesktopNavMenu'
import { MobileNavigation } from './MobileNavMenu'

interface IHeaderClientProps {
  user: IUser | null
}

export const HeaderClient = ({ user }: IHeaderClientProps) => {
  const { isMobileMenuOpen } = useUIStore()

  const isAuthenticated = !!user
  const links = getLinks(isAuthenticated)

  return (
    <header
      className={
        'fixed top-0 left-0 z-50 flex h-16 w-full flex-col border-b border-b-gray-400 bg-white shadow-sm transition-all md:h-20'
      }
    >
      <DesktopNavigation user={user} isAuthenticated={isAuthenticated} links={links} />

      <MobileNavigation
        user={user}
        isAuthenticated={isAuthenticated}
        links={links}
        isMobileMenuOpen={isMobileMenuOpen}
      />
    </header>
  )
}
