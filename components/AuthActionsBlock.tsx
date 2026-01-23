'use client'

import { Activity } from 'react'

import { IUser } from '@/interfaces/user'
import { useTranslations } from 'next-intl'

import { AppButton } from './ui/AppButton'
import { LanguageSwitcher } from './ui/LanguageSwitcher'

interface IAuthActionBlockProps {
  user: IUser | null
  isAuthenticated: boolean
  closeMobileMenu: () => void
}

export const AuthActionsBlock = ({
  user,
  isAuthenticated,
  closeMobileMenu,
}: IAuthActionBlockProps) => {
  const t = useTranslations('navigation')
  isAuthenticated = false
  return (
    <div className='flex flex-col gap-2 md:h-10 md:flex-row md:items-center md:self-center'>
      <Activity mode={!isAuthenticated ? 'visible' : 'hidden'}>
        <AppButton
          to='/sign-in'
          onClick={closeMobileMenu}
          label={t('signIn')}
          variant='outline'
        />
        <AppButton to='/sign-up' onClick={closeMobileMenu} label={t('signUp')} />
      </Activity>
      <Activity mode={isAuthenticated ? 'visible' : 'hidden'}>
        <AppButton to='/profile' onClick={closeMobileMenu} label={user?.name} />
      </Activity>
      <Activity mode={isAuthenticated ? 'visible' : 'hidden'}>
        {/* 
        TODO: add desktop icon logout
        TODO: logout fn
         */}
        <AppButton onClick={() => {}} label={t('signOut')} />
      </Activity>
      <LanguageSwitcher className='h-full' />
    </div>
  )
}
