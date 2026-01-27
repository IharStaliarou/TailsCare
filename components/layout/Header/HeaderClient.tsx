'use client'

import { UserIcon } from '@/components/icons/UserIcon'
import { AppButton } from '@/components/ui/AppButton'
import { getLinks } from '@/constants/navigation'
import { IUser } from '@/interfaces/user'
import { useUIStore } from '@/store/use-ui-store'

import { DesktopNavigation } from '../Desktop/DesktopNavMenu'
import { MobileNavigation } from '../Mobile/MobileNavMenu'
import { MobileSidebar } from '../Mobile/MobileSidebar'

interface IHeaderClientProps {
  user: IUser | null
}

export const HeaderClient = ({ user }: IHeaderClientProps) => {
  const isAuthenticated = !!user
  const links = getLinks(isAuthenticated)

  const { openMobileMenu } = useUIStore()
  return (
    <header
      className={
        'fixed top-0 left-0 z-50 flex h-16 w-full items-center border-b border-b-gray-400 bg-white px-4 shadow-sm transition-all md:h-20 md:px-0'
      }
    >
      <AppButton
        icon={<UserIcon className='stroke-2' />}
        className='h-12 w-12 md:hidden'
        onClick={openMobileMenu}
      />

      <DesktopNavigation user={user} isAuthenticated={isAuthenticated} links={links} />
      <MobileNavigation user={user} isAuthenticated={isAuthenticated} links={links} />
    </header>
  )
}
