'use client'

import { AppButton } from '@/components/ui'
import { HelpIcon, UserIcon } from '@/components/ui/icons'
import { ROUTES } from '@/shared/config/routes'
import { useUIStore } from '@/shared/store/useUiStore'

export const MobileTopBar = () => {
  const { openMobileSidebar } = useUIStore()
  return (
    <nav className='flex h-full w-full justify-between md:hidden'>
      <AppButton
        variant='icon'
        icon={<UserIcon className='h-10 w-10' />}
        className='md:hidden'
        onClick={openMobileSidebar}
      />
      <AppButton
        variant='icon'
        icon={<HelpIcon className='str h-10 w-10' />}
        className='md:hidden'
        to={ROUTES.faq}
      />
    </nav>
  )
}
