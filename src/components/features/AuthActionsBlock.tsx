'use client'

import { Activity, useRef } from 'react'

import { AppButton } from '@/components/ui'
import { IUser } from '@/entities/user/types'
import { useClickOutside } from '@/shared/hooks/useClickOutside'
import { useUIStore } from '@/shared/store/useUiStore'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

interface IAuthActionBlockProps {
  user: IUser | null
  className?: string
  isAuthenticated: boolean
}

export const AuthActionsBlock = ({
  user,
  className,
  isAuthenticated,
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
        'flex origin-top-right transform flex-col gap-2 transition-all duration-300 ease-in-out',
        isDesktopActionsMenuOpen
          ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-x-2 -translate-y-2 scale-0 opacity-0',
        className
      )}
      aria-hidden={!isDesktopActionsMenuOpen}
    >
      {/* TODO: add active mode */}
      <AppButton
        to='/sign-in'
        onClick={closeMobileSidebar}
        label={t('signIn')}
        variant='outline'
        className='md:border-white md:bg-white'
      />
      <AppButton to='/sign-up' onClick={closeMobileSidebar} label={t('signUp')} />
      {/* 
        TODO: add desktop icon logout
        TODO: logout fn
         */}
      <Activity mode={isAuthenticated ? 'visible' : 'hidden'}>
        <AppButton to='/profile' onClick={closeMobileSidebar} label={user?.name} />
        <AppButton onClick={() => {}} label={t('signOut')} />
      </Activity>
    </div>
  )
}
