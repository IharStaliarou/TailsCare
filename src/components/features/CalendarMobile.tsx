'use client'

import { CalendarNavButtons } from '@/components/features/CalendarNavButtons'
import { useCalendarViewModel } from '@/components/features/useCalendarViewModel'
import { isWeekend } from '@/entities/calendar/calendar.utils'

export const CalendarMobile = () => {
  const {
    t: tCalendar,
    monthLabel,
    staticWeekdayLabels,
    monthDays,
    goToDay,
    handlePrevMonth,
    handleNextMonth,
    goToToday,
    today,
    isTodaySelected,
    todayLabel,
  } = useCalendarViewModel()

  return (
    <div className='space-y-4 md:hidden'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h2 className='text-2xl font-extrabold text-gray-900 capitalize'>
            {monthLabel}
          </h2>
          <p className='text-xs text-gray-600'>{tCalendar('subtitle')}</p>
        </div>

        <CalendarNavButtons
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
          onToday={() => goToToday(today)}
          todayLabel={todayLabel}
          isTodaySelected={isTodaySelected}
        />
      </div>

      <div className='grid grid-cols-7 px-2'>
        {staticWeekdayLabels.map((day, index) => (
          <span
            key={day}
            className={`text-[10px] font-semibold tracking-tight uppercase ${
              isWeekend(index) ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            {day}
          </span>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-1'>
        {monthDays.map((day) => {
          const outside = !day.inCurrentMonth
          return (
            <button
              key={day.date}
              type='button'
              onClick={() => goToDay(day.date)}
              className={
                `flex h-16 w-full items-center justify-center rounded-md text-xs font-medium ` +
                (outside
                  ? 'bg-transparent text-gray-300'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100')
              }
            >
              {day.dayNumber}
            </button>
          )
        })}
      </div>
    </div>
  )
}
