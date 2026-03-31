'use client'

import { AppButton } from '@/components/ui'
import { useTranslations } from 'next-intl'

import { useCalendarViewModel } from '../../useCalendarViewModel'

export const EmptyCalendarState = () => {
  const t = useTranslations('calendar')

  const { setIsCreateModalOpen } = useCalendarViewModel()

  return (
    <div className='mt-25 flex min-h-160 flex-col items-center space-y-4'>
      <p className='text-center text-xl'>{t('noEvents')}</p>
      <AppButton
        label={t('dayPage.addEvent')}
        onClick={() => setIsCreateModalOpen(true)}
        className='h-12 text-white'
      />
    </div>
  )
}
