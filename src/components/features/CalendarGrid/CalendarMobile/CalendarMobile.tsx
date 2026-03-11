'use client'

import { useCalendarViewModel } from '@/components/features/useCalendarViewModel'
import { useTranslations } from 'next-intl'

import { CalendarNavButtons } from '../CalendarNavButtons'
import { Month } from './Month'

export const CalendarMobile = () => {
  const t = useTranslations('calendar')
  const {
    monthLabel,
    handlePrevMonth,
    handleNextMonth,
    goToToday,
    today,
    isTodaySelected,
  } = useCalendarViewModel()

  return (
    <div className='mt-5 space-y-5 md:hidden'>
      <div className='mb-10'>
        <h2 className='text-2xl font-extrabold capitalize'>{monthLabel}</h2>
        <p className='text-xs'>{t('subtitle')}</p>
      </div>
      <CalendarNavButtons
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
        onToday={() => goToToday(today)}
        isTodaySelected={isTodaySelected}
      />

      <Month />
    </div>
  )
}
