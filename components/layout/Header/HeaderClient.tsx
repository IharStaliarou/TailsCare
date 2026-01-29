'use client'

import { getLinks } from '@/constants/navigation'
import { IUser } from '@/interfaces/user'

import { DesktopNavigation } from '../Desktop/DesktopNavMenu'
import { MobileNavigation } from '../Mobile/MobileNavMenu'
import { MobileTopBar } from '../Mobile/MobileTopBar'

interface IHeaderClientProps {
  user: IUser | null
}

export const HeaderClient = ({ user }: IHeaderClientProps) => {
  const isAuthenticated = !!user
  const links = getLinks(isAuthenticated)

  return (
    <header
      className={
        'fixed top-0 left-0 z-50 h-16 w-full items-center border-b border-b-gray-400 bg-white px-4 shadow-sm transition-all md:h-20 md:px-0'
      }
    >
      <DesktopNavigation user={user} isAuthenticated={isAuthenticated} links={links} />

      <MobileTopBar />
      <MobileNavigation user={user} isAuthenticated={isAuthenticated} links={links} />
    </header>
  )
}
