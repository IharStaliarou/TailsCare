'use client'

import { PlusIcon } from '@/components/icons/PlusIcon'
import { AppButton } from '@/components/ui/AppButton'
import { useUIStore } from '@/store/use-ui-store'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

export const MobileSidebar = () => {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore()

  const t = useTranslations('navigation')
  return (
    <>
      <aside
        id='mobile-sidebar'
        className={clsx(
          `fixed inset-0 z-100 flex h-full w-2/3 transform flex-col bg-gray-300 p-2.5 transition-transform duration-300 md:hidden`,
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <AppButton
          variant='icon'
          onClick={closeMobileMenu}
          icon={<PlusIcon className='h-6 w-6 rotate-45' />}
        />
        <div className='h-px bg-gray-900' />
        <AppButton
          to={'/user/settings'}
          onClick={closeMobileMenu}
          label={t('settings')}
          className='h-auto'
        />
      </aside>
    </>
  )
}
