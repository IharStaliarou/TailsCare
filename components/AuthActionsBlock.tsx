import { Link } from '@/i18n/routing'
import { IUser } from '@/interfaces/user'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import 'next-intl/server'

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
  return (
    <div
      className={clsx(
        'mt-auto flex flex-col gap-4 md:mt-0 md:flex-row md:items-center md:gap-4'
      )}
    >
      <div className='flex flex-col gap-4 md:flex-row md:items-center'>
        {isAuthenticated ? (
          <>
            <Link
              href='/profile'
              onClick={closeMobileMenu}
              className='flex items-center gap-2 rounded-xl bg-zinc-100 p-4 font-medium md:rounded-full md:p-0 md:px-3 md:py-1.5 dark:bg-zinc-900'
            >
              {user?.name}
            </Link>
            <button className='flex items-center justify-center gap-2 rounded-xl bg-red-50 p-4 font-bold text-red-600 md:bg-transparent md:p-2 md:text-zinc-500 md:hover:text-red-500'>
              <span className='md:hidden'>{t('signOut')}</span>{' '}
              {/* TODO: add desktop icon logout */}
            </button>
          </>
        ) : (
          <>
            <Link
              href='/sign-in'
              onClick={closeMobileMenu}
              className='flex h-14 items-center justify-center rounded-xl border bg-transparent font-bold text-white transition-colors hover:bg-orange-600 md:h-auto md:px-4 md:py-2 md:text-sm'
            >
              {t('signIn')}
            </Link>
            <Link
              href='/sign-up'
              onClick={closeMobileMenu}
              className='flex h-14 items-center justify-center rounded-xl border border-orange-600 bg-orange-500 font-bold text-white transition-colors hover:bg-orange-600 md:h-auto md:px-4 md:py-2 md:text-sm'
            >
              {t('signUp')}
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
