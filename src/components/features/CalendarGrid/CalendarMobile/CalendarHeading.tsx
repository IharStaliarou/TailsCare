'use client'

import { useTranslations } from 'next-intl'

import { useCalendarViewModel } from '../../useCalendarViewModel'

export const CalendarHeading = () => {
  const t = useTranslations('calendar')

  const { monthLabel } = useCalendarViewModel()

  return (
    <div className='mb-10'>
      <h2 className='text-2xl font-extrabold capitalize'>{monthLabel}</h2>
      <p className='text-xs'>{t('subtitle')}</p>
    </div>
  )
}
