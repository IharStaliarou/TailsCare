'use client'

import { PlusIcon } from '@/components/icons/PlusIcon'
import { AppButton } from '@/components/ui/AppButton'
import { useUIStore } from '@/store/use-ui-store'
import clsx from 'clsx'

export const MobileSidebar = () => {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore()
  console.log(isMobileMenuOpen)
  return (
    <>
      <aside
        id='mobile-sidebar'
        className={clsx(
          `fixed inset-0 z-100 flex h-full w-2/3 transform flex-col bg-gray-300 transition-transform duration-300 md:hidden`,
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <AppButton
          variant='icon'
          onClick={closeMobileMenu}
          icon={<PlusIcon className='h-6 w-6 rotate-45' />}
        />
      </aside>
    </>
  )
}
