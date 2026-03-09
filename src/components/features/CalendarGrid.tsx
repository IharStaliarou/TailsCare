'use client'

// TODO: refactor
import { Fragment, useMemo } from 'react'

import { CalendarEventForm } from '@/components/features/CalendarEventForm'
import { DayCard } from '@/components/features/DayCard'
import { AppButton } from '@/components/ui'
import { Modal } from '@/components/ui/Modal'
import {
  CALENDAR_CONFIG,
  COLORS_CONFIG,
  DIMENSIONS,
  ROUNDING,
  UI_TEXTS,
} from '@/entities/calendar/calendar.constants'
import { useCalendarStore } from '@/entities/calendar/calendar.store'
import { ICalendarEvent, IDayTile } from '@/entities/calendar/calendar.types'
import { useCalendarUIStore } from '@/entities/calendar/calendar.ui.store'
import {
  CalendarUtils,
  DateUtils,
  formatLocalDate,
  generateCalendarDays,
  isWeekend,
} from '@/entities/calendar/calendar.utils'
import { useCalendarEvents } from '@/entities/calendar/hooks/useCalendarEvents'
import { useWeekRange } from '@/entities/calendar/hooks/useWeekRange'
import { usePetStore } from '@/entities/pet/pet.store'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

const padHour = (hour: number) => hour.toString().padStart(2, '0')

export const CalendarGrid = () => {
  const router = useRouter()
  const locale = useLocale()
  const tCalendar = useTranslations('calendar')

  const events = useCalendarStore((state) => state.events)
  const pets = usePetStore((state) => state.pets)

  const today = useMemo(() => DateUtils.normalizeDate(new Date()), [])

  const {
    selectedDate,
    currentMonth,
    isCreateModalOpen,
    setSelectedDate,
    setCurrentMonth,
    setIsCreateModalOpen,
    goToToday,
  } = useCalendarUIStore()

  const selectedDateString = useMemo(() => formatLocalDate(selectedDate), [selectedDate])

  const monthDays = useMemo(
    () => generateCalendarDays(events, currentMonth),
    [events, currentMonth]
  )

  const monthLabel = useMemo(
    () => CalendarUtils.createMonthFormatter(locale).format(currentMonth),
    [currentMonth, locale]
  )

  const staticWeekdayLabels = useMemo(
    () => CalendarUtils.getStaticWeekdayLabels(locale),
    [locale]
  )

  const { weekDates, weekRangeLabel } = useWeekRange(selectedDate)
  const eventsByDayAndHour = useCalendarEvents(weekDates)

  const handlePrevMonth = () => {
    const d = new Date(currentMonth)
    d.setMonth(currentMonth.getMonth() - 1)
    setCurrentMonth(d)
  }

  const handleNextMonth = () => {
    const d = new Date(currentMonth)
    d.setMonth(currentMonth.getMonth() + 1)
    setCurrentMonth(d)
  }

  const handleSelectDate = (date: Date) => {
    const normalized = DateUtils.normalizeDate(date)
    setSelectedDate(normalized)
    setCurrentMonth(normalized)
  }

  const goToDay = (date: string) => {
    router.push(`/calendar/${date}`)
  }

  const getDayButtonStyles = (day: IDayTile, dateObj: Date, isSelected: boolean) => {
    const jsDay = dateObj.getDay()
    const isWeekendDay = isWeekend(jsDay)

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
  }

  return (
    <div className='py-6'>
      {/* Mobile version */}
      <div className='space-y-4 md:hidden'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-2xl font-extrabold tracking-tight text-gray-900 capitalize'>
              {monthLabel}
            </h2>
            <p className='text-xs text-gray-500'>{tCalendar('subtitle')}</p>
          </div>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={handlePrevMonth}
              className={`inline-flex ${DIMENSIONS.BUTTON.MD} items-center justify-center ${ROUNDING.FULL} border border-gray-200 text-gray-600 hover:bg-gray-50`}
            >
              ‹
            </button>
            <button
              type='button'
              onClick={() => goToToday(today)}
              className={`${ROUNDING.FULL} border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50`}
            >
              {UI_TEXTS.TODAY_BUTTON}
            </button>
            <button
              type='button'
              onClick={handleNextMonth}
              className={`inline-flex ${DIMENSIONS.BUTTON.MD} items-center justify-center ${ROUNDING.FULL} border border-gray-200 text-gray-600 hover:bg-gray-50`}
            >
              ›
            </button>
          </div>
        </div>

        <div className='flex justify-between px-2'>
          {staticWeekdayLabels.map((day, index) => (
            <span
              key={day}
              className={`text-[10px] font-semibold tracking-tight uppercase ${
                isWeekend(index) ? COLORS_CONFIG.RED[500] : COLORS_CONFIG.GRAY[400]
              }`}
            >
              {day}
            </span>
          ))}
        </div>

        <div className='flex flex-wrap gap-4'>
          {monthDays.map((day) => (
            <DayCard
              key={day.date}
              day={{ ...day, type: 'circle' }}
              onClick={() => goToDay(day.date)}
            />
          ))}
        </div>
      </div>

      {/* Desktop version */}
      <div className='hidden min-h-[640px] gap-6 md:grid md:grid-cols-[280px_minmax(0,1fr)]'>
        {/* Left column */}
        <aside className='flex flex-col gap-6'>
          <div className='space-y-1'>
            <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
              {tCalendar('title')}
            </h1>
            <p className='text-xs text-gray-500'>{tCalendar('subtitle')}</p>
          </div>

          <div
            className={`space-y-4 ${ROUNDING.XL2} ${COLORS_CONFIG.WHITE} p-4 shadow-sm ring-1 ring-gray-100`}
          >
            <div className='flex items-center justify-between'>
              <button
                type='button'
                onClick={handlePrevMonth}
                className={`inline-flex ${DIMENSIONS.BUTTON.SM} items-center justify-center ${ROUNDING.FULL} border border-gray-200 text-gray-600 hover:bg-gray-50`}
              >
                ‹
              </button>
              <div className='text-center'>
                <p className='text-sm font-semibold text-gray-900 capitalize'>
                  {monthLabel}
                </p>
              </div>
              <button
                type='button'
                onClick={handleNextMonth}
                className={`inline-flex ${DIMENSIONS.BUTTON.SM} items-center justify-center ${ROUNDING.FULL} border border-gray-200 text-gray-600 hover:bg-gray-50`}
              >
                ›
              </button>
            </div>

            <button
              type='button'
              onClick={() => goToToday(today)}
              className={`w-full ${ROUNDING.FULL} border border-gray-200 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50`}
            >
              {UI_TEXTS.TODAY_BUTTON}
            </button>

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
                const buttonStyles = getDayButtonStyles(day, dateObj, isSelected)

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
          </div>
        </aside>

        {/* Right column */}
        <section className='flex min-h-[640px] flex-1 flex-col space-y-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-semibold text-gray-900'>
                {tCalendar('title')}
              </h2>
              <p className='text-xs text-gray-500'>{weekRangeLabel}</p>
            </div>

            <AppButton
              label={tCalendar('dayPage.addEvent')}
              className={`${DIMENSIONS.BUTTON.LG} text-xs`}
              onClick={() => setIsCreateModalOpen(true)}
              disabled={pets.length === 0}
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
                const isWeekendDay = isWeekend(date.getDay())

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
    </div>
  )
}
