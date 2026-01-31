'use client'

import { HelpIcon } from '@/components/icons/HelpIcon'
import { UserIcon } from '@/components/icons/UserIcon'
import { AppButton } from '@/components/ui/AppButton'
import { useUIStore } from '@/store/use-ui-store'

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
