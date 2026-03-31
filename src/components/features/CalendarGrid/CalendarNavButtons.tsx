'use client'

import { AppButton } from '@/components/ui'
import { useTranslations } from 'next-intl'

import { useCalendarViewModel } from '../useCalendarViewModel'

export const CalendarNavButtons = () => {
  const t = useTranslations('calendar')

  const {
    handlePrevMonth,
    handleNextMonth,
    goToToday,
    today,
    isTodaySelected,
    isCurrentMonthDisplayed,
  } = useCalendarViewModel()

  const variant = isTodaySelected && isCurrentMonthDisplayed ? 'secondary' : 'outline'

  return (
    <div className='flex gap-2'>
      <AppButton
        variant='outline'
        label='‹'
        onClick={handlePrevMonth}
        className='w-11.25 rounded-full'
      />
      <AppButton
        variant={variant}
        label={t('todayButton')}
        onClick={() => goToToday(today)}
        className={'flex-1 rounded-full'}
      />
      <AppButton
        variant='outline'
        label='›'
        onClick={handleNextMonth}
        className='w-11.25 rounded-full'
      />
    </div>
  )
}
