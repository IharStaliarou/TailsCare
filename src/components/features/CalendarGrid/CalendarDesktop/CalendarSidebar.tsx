'use client'

import { AppButton } from '@/components/ui'
import { useTranslations } from 'next-intl'

import { useCalendarViewModel } from '../../useCalendarViewModel'
import { CalendarNavButtons } from '../CalendarNavButtons'
import { DatePicker } from './DatePicker'

export const CalendarSidebar = () => {
  const t = useTranslations('calendar')

  const {
    petsLength,
    goToToday,
    handlePrevMonth,
    handleNextMonth,
    setIsCreateModalOpen,
    today,
    isTodaySelected,
  } = useCalendarViewModel()

  return (
    <aside className='flex flex-col gap-6'>
      <AppButton
        label={t('dayPage.addEvent')}
        variant='secondary'
        className='h-10 rounded-full'
        onClick={() => setIsCreateModalOpen(true)}
        disabled={petsLength === 0}
      />
      <CalendarNavButtons
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
        onToday={() => goToToday(today)}
        isTodaySelected={isTodaySelected}
      />

      <DatePicker />
    </aside>
  )
}
