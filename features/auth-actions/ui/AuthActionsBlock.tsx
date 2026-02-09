'use client'

import { Activity, useRef } from 'react'

import { IUser } from '@/entities/user'
import { useClickOutside } from '@/shared/lib/hooks/useClickOutside'
import { useUIStore } from '@/shared/model/use-ui-store'
import { AppButton, LanguageSwitcher } from '@/shared/ui'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

interface IAuthActionBlockProps {
  user: IUser | null
  className?: string
  isVisible?: boolean
  isAuthenticated: boolean
}

export const AuthActionsBlock = ({
  user,
  className,
  isAuthenticated,
  isVisible,
}: IAuthActionBlockProps) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const { closeMobileSidebar, isDesktopActionsMenuOpen, closeDesktopActionsMenu } =
    useUIStore()
  useClickOutside(menuRef, closeDesktopActionsMenu)
  const t = useTranslations('navigation')
  isAuthenticated = false

  return (
    <div
      ref={menuRef}
      className={clsx(
        'flex origin-top-right transform flex-col gap-2 transition-all duration-300 ease-in-out md:rounded-tl-xl md:rounded-b-xl md:bg-gray-200 md:p-4',
        isVisible
          ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-x-2 -translate-y-2 scale-0 opacity-0',
        className
      )}
      aria-hidden={!isDesktopActionsMenuOpen}
    >
      <Activity mode={!isAuthenticated ? 'visible ' : 'hidden'}>
        <AppButton
          to='/sign-in'
          onClick={closeMobileSidebar}
          label={t('signIn')}
          variant='outline'
          className='md:border-white md:bg-white'
        />
        <AppButton to='/sign-up' onClick={closeMobileSidebar} label={t('signUp')} />
      </Activity>
      <Activity mode={isAuthenticated ? 'visible' : 'hidden'}>
        <AppButton to='/profile' onClick={closeMobileSidebar} label={user?.name} />
      </Activity>
      <Activity mode={isAuthenticated ? 'visible' : 'hidden'}>
        {/* 
        TODO: add desktop icon logout
        TODO: logout fn
         */}
        <AppButton onClick={() => {}} label={t('signOut')} />
      </Activity>
      <LanguageSwitcher />
    </div>
  )
}
