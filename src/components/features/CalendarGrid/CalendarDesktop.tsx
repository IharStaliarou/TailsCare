'use client'

import { CalendarEventForm } from '@/components/features/CalendarEventForm'
import { useCalendarViewModel } from '@/components/features/useCalendarViewModel'
import { AppButton } from '@/components/ui'
import { Modal } from '@/components/ui/Modal'
import { DIMENSIONS, ROUNDING } from '@/entities/calendar/calendar.constants'
import { useTranslations } from 'next-intl'

import { CalendarSidebar } from './CalendarSidebar'
import { CalendarWeekGrid } from './CalendarWeekGrid'
import { CalendarWeekHeader } from './CalendarWeekHeader'

export const CalendarDesktop = () => {
  const t = useTranslations('calendar')

  const {
    locale,
    monthLabel,
    staticWeekdayLabels,
    monthDays,
    weekDates,
    eventsByDayAndHour,
    selectedDate,
    selectedDateString,
    petsLength,
    isCreateModalOpen,
    goToToday,
    handlePrevMonth,
    handleNextMonth,
    handleSelectDate,
    goToDay,
    setIsCreateModalOpen,
    today,
    isTodaySelected,
  } = useCalendarViewModel()

  return (
    <div className='hidden min-h-160 gap-6 md:grid md:grid-cols-[280px_minmax(0,1fr)]'>
      <CalendarSidebar
        monthLabel={monthLabel}
        staticWeekdayLabels={staticWeekdayLabels}
        monthDays={monthDays}
        selectedDate={selectedDate}
        handleSelectDate={handleSelectDate}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
        onToday={() => goToToday(today)}
        isTodaySelected={isTodaySelected}
      />

      {/* Right column */}
      <section className='flex min-h-160 flex-1 flex-col space-y-4'>
        <div className='flex items-center justify-between'>
          <AppButton
            label={t('dayPage.addEvent')}
            className={`${DIMENSIONS.BUTTON.LG} text-xs`}
            onClick={() => setIsCreateModalOpen(true)}
            disabled={petsLength === 0}
          />
        </div>

        <div
          className={`flex-1 overflow-hidden ${ROUNDING.XL2} bg-white shadow-sm ring-1 ring-gray-100`}
        >
          <CalendarWeekHeader
            weekDates={weekDates}
            locale={locale}
            selectedDateString={selectedDateString}
            today={today}
            goToDay={goToDay}
          />

          <CalendarWeekGrid
            weekDates={weekDates}
            eventsByDayAndHour={eventsByDayAndHour}
            goToDay={goToDay}
          />
        </div>

        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title={t('dayPage.modals.addTitle')}
        >
          <CalendarEventForm
            initialValues={{ date: selectedDateString }}
            onSuccess={() => setIsCreateModalOpen(false)}
            submitLabel={t('dayPage.modals.addTitle')}
          />
        </Modal>
      </section>
    </div>
  )
}
