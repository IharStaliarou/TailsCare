'use client'

import { AuthActionsBlock } from '@/components/AuthActionsBlock'
import { PlusIcon } from '@/components/icons/PlusIcon'
import { AppButton } from '@/components/ui/AppButton'
import { Divider } from '@/components/ui/Divider'
import { Link } from '@/i18n/routing'
import { MOCK_USER } from '@/interfaces/user'
import { useUIStore } from '@/store/use-ui-store'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export const MobileSidebar = () => {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore()
  const { name, avatarUrl, pets } = MOCK_USER
  const t = useTranslations('navigation')
  return (
    <aside
      id='mobile-sidebar'
      className={clsx(
        `fixed inset-0 z-100 flex h-full w-2/3 transform flex-col justify-between bg-white p-4 transition-transform duration-300 md:hidden`,
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      )}
      aria-hidden={!isMobileMenuOpen}
    >
      <AppButton
        variant='icon'
        onClick={closeMobileMenu}
        icon={<PlusIcon className='rotate-45' />}
        className='absolute top-5 right-2 h-8 w-8'
      />
      <div>
        <Link href={'/profile'} className='flex flex-col gap-2.5'>
          <div className='h-10 w-10 rounded-full border border-gray-600 p-0.75'>
            {avatarUrl && <Image src={avatarUrl} alt={name} fill />}
            {!avatarUrl && (
              <span className='block h-full content-center rounded-full bg-white text-center'>
                {name.split(' ')[0][0] + '.' + name.split(' ')[1][0] + '.'}
              </span>
            )}
          </div>
          <h2 className='text-xl font-bold'>{name}</h2>
          <p>You have {pets.length} pets</p>
        </Link>
        <Divider className='mt-2.5' />
      </div>
      <ul className='flex h-full flex-col gap-3 py-4'>
        <li>
          <Link
            href={'/user/settings'}
            onClick={closeMobileMenu}
            className='text-md font-semibold'
          >
            {t('settings')}
          </Link>
        </li>
      </ul>
      <div>
        <Divider className='mb-2.5' />
        <AuthActionsBlock
          user={MOCK_USER}
          closeMobileMenu={closeMobileMenu}
          isAuthenticated={true}
        />
      </div>
    </aside>
  )
}
