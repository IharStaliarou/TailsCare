'use client'

import { useUIStore } from '@/shared/model/use-ui-store'
import { AppButton } from '@/shared/ui'
import { HelpIcon, UserIcon } from '@/shared/ui/icons'

export const MobileTopBar = () => {
  const { openMobileMenu } = useUIStore()
  return (
    <nav className='flex h-full w-full justify-between'>
      <AppButton
        variant='icon'
        icon={<UserIcon className='h-10 w-10' />}
        className='md:hidden'
        onClick={openMobileMenu}
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
