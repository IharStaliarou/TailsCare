'use client'

import { Fragment } from 'react'

import { CalendarEventForm } from '@/components/features/CalendarEventForm'
import { CalendarNavButtons } from '@/components/features/CalendarNavButtons'
import { useCalendarViewModel } from '@/components/features/useCalendarViewModel'
import { AppButton } from '@/components/ui'
import { Modal } from '@/components/ui/Modal'
import {
  CALENDAR_CONFIG,
  COLORS_CONFIG,
  DIMENSIONS,
  ROUNDING,
  UI_TEXTS,
} from '@/entities/calendar/calendar.constants'
import { ICalendarEvent } from '@/entities/calendar/calendar.types'
import {
  CalendarUtils,
  DateUtils,
  formatLocalDate,
  isWeekend,
} from '@/entities/calendar/calendar.utils'

export const CalendarDesktop = () => {
  const {
    t,
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
    todayLabel,
    isTodaySelected,
  } = useCalendarViewModel()

  const tCalendar = t
  const padHour = (hour: number) => hour.toString().padStart(2, '0')

  return (
    <div className='hidden min-h-160 gap-6 md:grid md:grid-cols-[280px_minmax(0,1fr)]'>
      {/* Left column */}
      <aside className='flex flex-col gap-6'>
        <CalendarNavButtons
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
          onToday={() => goToToday(today)}
          todayLabel={todayLabel}
          isTodaySelected={isTodaySelected}
        />
        <div className='text-center text-sm font-semibold text-gray-900 capitalize'>
          {monthLabel}
        </div>

        <div className='grid grid-cols-7 gap-1 pb-1'>
          {staticWeekdayLabels.map((day, index) => (
            <div
              key={day}
              className={`text-center text-[10px] font-semibold tracking-tight uppercase ${
                isWeekend(index) ? COLORS_CONFIG.RED[500] : COLORS_CONFIG.GRAY[400]
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className='grid grid-cols-7 gap-1'>
          {monthDays.map((day) => {
            const dateObj = DateUtils.createDateFromString(day.date)
            const isSelected = DateUtils.isSameDay(dateObj, selectedDate)
            const jsDay = dateObj.getDay()
            const isWeekendDay = isWeekend(jsDay)
            const outside = !day.inCurrentMonth

            if (outside) {
              return (
                <button
                  key={day.date}
                  type='button'
                  onClick={() => handleSelectDate(dateObj)}
                  className='flex items-center justify-center rounded-full p-1 text-xs font-medium'
                >
                  <div className='flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-gray-300'>
                    {day.dayNumber}
                  </div>
                </button>
              )
            }

            const buttonStyles = (() => {
              if (isSelected) {
                return `${COLORS_CONFIG.INDIGO[600]} ${COLORS_CONFIG.WHITE} shadow-sm`
              }
              if (day.isToday && isWeekendDay) {
                return `border ${COLORS_CONFIG.RED[500]} ${COLORS_CONFIG.RED[600]}`
              }
              if (day.isToday) {
                return `border ${COLORS_CONFIG.INDIGO[500]} ${COLORS_CONFIG.INDIGO[600]}`
              }
              if (isWeekendDay) {
                return `${COLORS_CONFIG.RED[500]} hover:${COLORS_CONFIG.RED[50]}`
              }
              return `${COLORS_CONFIG.GRAY[700]} hover:${COLORS_CONFIG.GRAY[100]}`
            })()

            return (
              <button
                key={day.date}
                type='button'
                onClick={() => handleSelectDate(dateObj)}
                className='flex items-center justify-center rounded-full p-1 text-xs font-medium'
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${buttonStyles}`}
                >
                  {day.dayNumber}
                </div>
              </button>
            )
          })}
        </div>
      </aside>

      {/* Right column */}
      <section className='flex min-h-160 flex-1 flex-col space-y-4'>
        <div className='flex items-center justify-between'>
          <AppButton
            label={tCalendar('dayPage.addEvent')}
            className={`${DIMENSIONS.BUTTON.LG} text-xs`}
            onClick={() => setIsCreateModalOpen(true)}
            disabled={petsLength === 0}
          />
        </div>

        <div
          className={`flex-1 overflow-hidden ${ROUNDING.XL2} ${COLORS_CONFIG.WHITE} shadow-sm ring-1 ring-gray-100`}
        >
          {/* Week header */}
          <div className='grid grid-cols-[56px_repeat(7,minmax(0,1fr))] border-b border-gray-100 bg-gray-50/80 text-[11px] font-semibold text-gray-500'>
            <div className='px-2 py-2 text-right text-[10px] text-gray-400'>
              {UI_TEXTS.TIMEZONE_LABEL}
            </div>
            {weekDates.map((date) => {
              const label = CalendarUtils.createWeekDayFormatter(locale).format(date)
              const dayNumber = date.getDate()
              const dateKey = formatLocalDate(date)
              const isToday = dateKey === formatLocalDate(today)
              const isSelected = dateKey === selectedDateString
              const jsDay = date.getDay()
              const isWeekendDay = isWeekend(jsDay)

              return (
                <button
                  key={date.toISOString()}
                  type='button'
                  onClick={() => handleSelectDate(date)}
                  className='flex flex-col items-center gap-0.5 px-2 py-2 text-xs'
                >
                  <span
                    className={`tracking-tight uppercase ${
                      isWeekendDay ? COLORS_CONFIG.RED[500] : COLORS_CONFIG.GRAY[500]
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                      isSelected
                        ? `${COLORS_CONFIG.INDIGO[600]} ${COLORS_CONFIG.WHITE}`
                        : isToday && isWeekendDay
                          ? `border ${COLORS_CONFIG.RED[500]} ${COLORS_CONFIG.RED[600]}`
                          : isToday
                            ? `border ${COLORS_CONFIG.INDIGO[500]} ${COLORS_CONFIG.INDIGO[600]}`
                            : isWeekendDay
                              ? COLORS_CONFIG.RED[500]
                              : COLORS_CONFIG.GRAY[800]
                    }`}
                  >
                    {dayNumber}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Timeline */}
          <div className='max-h-[calc(100vh-220px)] overflow-y-auto'>
            <div className='grid grid-cols-[56px_repeat(7,minmax(0,1fr))] text-[11px]'>
              {CALENDAR_CONFIG.HOURS.map((hour) => (
                <Fragment key={hour}>
                  <div className='border-t border-gray-100 px-1 py-2 text-right text-[10px] text-gray-400'>
                    {padHour(hour)}:00
                  </div>

                  {weekDates.map((date) => {
                    const dateKey = formatLocalDate(date)
                    const eventsForDay = eventsByDayAndHour.get(dateKey) || []
                    const eventsInSlot = eventsForDay.filter((event: ICalendarEvent) =>
                      event.time.startsWith(`${padHour(hour)}:`)
                    )

                    return (
                      <div
                        key={`${dateKey}-${hour}`}
                        className='relative border-t border-gray-100 px-1 py-1 align-top'
                      >
                        {eventsInSlot.map((event: ICalendarEvent) => (
                          <button
                            key={event.id}
                            type='button'
                            onClick={() => goToDay(event.date)}
                            className='mb-0.5 w-full rounded-md bg-indigo-50 px-1 py-0.5 text-left text-[10px] font-medium text-indigo-700 hover:bg-indigo-100'
                          >
                            <span className='block truncate'>{event.title}</span>
                          </button>
                        ))}
                      </div>
                    )
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title={tCalendar('dayPage.modals.addTitle')}
        >
          <CalendarEventForm
            initialValues={{ date: selectedDateString }}
            onSuccess={() => setIsCreateModalOpen(false)}
            submitLabel={tCalendar('dayPage.modals.addTitle')}
          />
        </Modal>
      </section>
    </div>
  )
}
