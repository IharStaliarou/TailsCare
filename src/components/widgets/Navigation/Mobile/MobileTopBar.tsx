'use client'

import { HelpIcon, UserIcon } from '@/components/icons'
import { AppButton } from '@/components/ui'
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
        to='/faq'
      />
    </nav>
  )
}
